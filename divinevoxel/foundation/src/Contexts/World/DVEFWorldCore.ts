import { DVEWorldCore } from "@divinevoxel/core/Interfaces/World/DVEWorldCore";
import { DVEFWorldThreads } from "./DVEFWorldThreads";
import { DVEFDataSync } from "./DVEFDataSync";
import { DVEConstructorTasksQueues } from "../Constructor/DVEConstructorTasksQueues";
import { DataLoaderTool } from "../../Default/DataLoader/World/Tools/DataLoaderTool";
import { WorldLock } from "./Lock/WorldLock";
import RegisterDataHooks from "./WorldDataHooks";
import { DVEFDataReigster } from "./Data/DVEFDataRegister";
import { DVEFDataStructs } from "./Data/DVEFDataStructs";
import InitWorldTasks, { WorldTasks } from "./Tasks/WorldTasks";
import { Distance3D, Vector3Like } from "@amodx/math";
import { LocationData } from "@divinevoxel/core/Math";
import { WorldRegister } from "../../Data/World/WorldRegister";
import { WorldSpaces } from "@divinevoxel/core/Data/World/WorldSpaces";
export type DVEFWorldCoreProps = {
  nexusEnabled?: boolean;
  richWorldEnabled?: boolean;
  dataLoaderEnabled?: boolean;
};
export class DVEFWorldCore extends DVEWorldCore {
  static instance: DVEFWorldCore;
  threads: DVEFWorldThreads;
  dataSync: DVEFDataSync;
  queues: DVEConstructorTasksQueues;
  dataRegiser: DVEFDataReigster;
  dataTagBulders: DVEFDataStructs;
  tasks = new WorldTasks(this);

  constructor(public props: DVEFWorldCoreProps = {}) {
    super();

    DVEFWorldCore.instance = this;
    this.threads = new DVEFWorldThreads(this);

    this.dataSync = new DVEFDataSync();
    this.queues = new DVEConstructorTasksQueues(this.threads.constructors);
    this.dataRegiser = new DVEFDataReigster();
    this.dataTagBulders = new DVEFDataStructs();
    InitWorldTasks(this);
  }

  async init() {
    RegisterDataHooks();
    WorldLock.init(new DataLoaderTool());
  }

  removeColumnsOutsideRadius(origion: LocationData, radius: number) {
    const [dimesnionId, x, y, z] = origion;
    const dimension = WorldRegister.instance.dimensions.get(dimesnionId);
    if (!dimension) return;
    dimension.regions.forEach((region) => {
      region.columns.forEach((column, index) => {
        WorldRegister.instance.columnTool.setColumn(column);
        const location = region.getColumnPosition(index);
        const distnace = Distance3D(location[0], 0, location[2], x, 0, z);
        if (distnace > radius) {
          this.dataSync.worldData.column.unSync([origion[0], ...location]);
          WorldRegister.instance.setDimension(origion[0]);
          WorldRegister.instance.column.remove(
            location[0],
            location[1],
            location[2]
          );
        }
      });
    });
  }
}
