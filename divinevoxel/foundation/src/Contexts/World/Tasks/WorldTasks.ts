import type { LocationData } from "@divinevoxel/core/Math/index.js";

import { Threads } from "@amodx/threads/";
//data
import { WorldRegister } from "../../../Data/World/WorldRegister.js";
import { DVEFWorldCore } from "../DVEFWorldCore.js";
import {
  LoadRegionHeadertasks,
  WorldLockTasks,
  LoadColumnDataTasks,
} from "../../../Types/Tasks.types.js";
import { ColumnDataTool } from "../../../Default/Tools/Data/WorldData/ColumnDataTool.js";
import { RegionHeaderRegister } from "../../../Data/RegionHeaderRegister.js";
import { DataLoaderTool } from "../../../Default/DataLoader/World/Tools/DataLoaderTool.js";
import { WorldSpaces } from "@divinevoxel/core/Data/World/WorldSpaces.js";
import { WorldLock } from "../Lock/WorldLock.js";
import { DVEFDataSync } from "../DVEFDataSync.js";
import { Column, ColumnData } from "../../../Data/World/Classes/Column.js";

export class WorldTasks {
  private columnTool = new ColumnDataTool();
  constructor(public DVEW: DVEFWorldCore) {}

  getLocation(column: ColumnData) {
    return this.columnTool.setColumn(new Column(column)).getLocationData();
  }

  loadColumn(location: LocationData, column: ColumnData) {
    WorldRegister.instance.column.add(location, column);
    DVEFDataSync.instance.worldData.column.sync(location);
  }
  unLoadColumn(data: LocationData) {
    if (WorldLock.isLocked(data)) return false;

    this.DVEW.dataSync.worldData.column.unSync(data);
    WorldRegister.instance.column.remove(data);
    const region = WorldRegister.instance.region.get(data);
    if (region && region.columns.size == 0) {
      WorldRegister.instance.region.remove(data);
      this.DVEW.dataSync.worldData.region.unSync(data);
      return true;
    }
    return false;
  }

  loadRegionHeader(location: LocationData, data: SharedArrayBuffer) {
    RegionHeaderRegister.add(location, data);

    DVEFDataSync.instance.worldData.regionHeader.sync(location);
  }
}

export default function (DVEW: DVEFWorldCore) {
  const dataLoaderTool = new DataLoaderTool();
  const loadInMap: Map<string, boolean> = new Map();

  Threads.registerTasks("add-chunk", async (location: LocationData) => {
    const chunk = WorldRegister.instance.chunk.get(location);

    if (chunk) {
      DVEW.dataSync.worldData.chunk.sync(location);
      return;
    }
    if (dataLoaderTool.isEnabled()) {
      WorldSpaces.column.getPositionLocation(location);
      const columnLocation = <LocationData>[
        ...WorldSpaces.column.getLocation(),
      ];
      if (loadInMap.has(columnLocation.toString())) return;
      loadInMap.set(columnLocation.toString(), true);
      const success = await dataLoaderTool.loadIfExists(columnLocation);
      loadInMap.delete(columnLocation.toString());
      if (!success) {
        WorldRegister.instance.column.fill(columnLocation);
      }

      return;
    }

    if (!chunk) {
      WorldRegister.instance.column.fill(location);
    }
  });
  Threads.registerTasks<WorldLockTasks>(
    "world-alloc",
    async (data, onDone) => {
      await WorldLock.addLock(data);
      if (onDone) onDone();
    },
    "deferred"
  );
  Threads.registerTasks<WorldLockTasks>(
    "world-dealloc",
    async (data, onDone) => {
      await WorldLock.removeLock(data);
      if (onDone) onDone();
    },
    "deferred"
  );
  Threads.registerTasks<LocationData>(
    "unload-column",
    (data, onDone) => {
      const resutls = DVEW.tasks.unLoadColumn(data);
      return onDone ? onDone(resutls) : resutls;
    },
    "deferred"
  );

  Threads.registerTasks<LoadRegionHeadertasks>(
    "load-region-header",
    ([location, data], onDone) => {
      const resutls = DVEW.tasks.loadRegionHeader(location, data);
      return onDone ? onDone(resutls) : resutls;
    }
  );
  Threads.registerTasks<LoadColumnDataTasks>(
    "load-column",
    ([location, column], onDone) => {
      const resutls = DVEW.tasks.loadColumn(location, column);
      return onDone ? onDone(resutls) : resutls;
    }
  );

  Threads.registerTasks("clear-all", () => {
    WorldRegister.instance.clearAll();
  });
}
