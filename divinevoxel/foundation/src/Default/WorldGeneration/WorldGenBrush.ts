import type { Vec3Array } from "@amodx/math";

import { WorldGenRegister } from "./WorldGenRegister.js";

import { WorldLockTasks } from "../../Types/Tasks.types.js";

import { RichDataTool } from "../Tools/Data/RichDataTool.js";
import { BrushTool } from "../../Default/Tools/Brush/Brush.js";
import { LightData } from "../../Data/LightData.js";
import { DVEFConstrucotrCore } from "../../Contexts/Constructor/DVEFConstructorCore.js";
import { TasksRequest } from "../Tasks/Constructor/Tasks/TasksRequest.js";
import { WorldGeneration } from "./WorldGeneration.js";
import { SafePromise } from "@amodx/core/Promises/SafePromise.js";
import { Propagation } from "../Propagation/Propagation.js";

export class WorldGenBrush extends BrushTool {
  constructor() {
    super();
    WorldGeneration._brushes.push(this);
  }
  requestsId: "";

  tasks = TasksRequest.getVoxelUpdateRequests(this.location);

  richData = new RichDataTool();

  setDimension(dimensionId: string) {
    this.location[0] = dimensionId;
    this.tasks.origin[0] = dimensionId;
    this._dt.setDimension(dimensionId);
    return this;
  }

  get keepTrackOfChunksToBuild() {
    return this.tasks.keepTrackOfChunks;
  }
  set keepTrackOfChunksToBuild(value: boolean) {
    this.tasks.keepTrackOfChunks = value;
  }
  paint() {
    if (!this._dt.loadInAtLocation(this.location)) {
      if (this.requestsId != "") {
        WorldGenRegister.addToRequest(this.requestsId, this.location, [
          ...this.getRaw(),
        ] as any);
      }
      throw new Error(
        `Tried painting in an unloaded location ${this.location.toString()}`
      );
      return this;
    }
    if (this._dt.isRenderable()) {
      this.erase();
      this._dt.loadInAtLocation(this.location);
    }

    const sl = this._dt.getLight();

    if (LightData.hasRGBLight(sl)) {
      this.tasks.queues.rgb.remove.push(this.x, this.y, this.z);
      Propagation.instance.rgbRemove(this.tasks);
    }

    if (LightData.hasSunLight(sl)) {
      this.tasks.queues.sun.remove.push(this.x, this.y, this.z);
      Propagation.instance.sunRemove(this.tasks);
    }

    this._worldPainter.paintVoxel(this.location, this.data);

    if (this.keepTrackOfChunksToBuild) {
      this.tasks.addNeighborsToRebuildQueue(this.x, this.y, this.z);
    }

    return this;
  }

  getUpdatedChunks() {
    const queue: Vec3Array[] = [];
    if (this.keepTrackOfChunksToBuild) {
      for (const [key, position] of this.tasks.trackedChunks) {
        queue.push(position);
      }
      this.tasks.trackedChunks.clear();
    }
    this.tasks.clearBuildQueue();
    return queue;
  }

  update() {
    if (!this._dt.loadInAtLocation(this.location) && this.requestsId != "")
      return false;

    const sl = this._dt.getLight();

    if (LightData.hasRGBLight(sl)) {
      this.tasks.queues.rgb.update.push(this.x, this.y, this.z);
      Propagation.instance.rgbUpdate(this.tasks);
    }

    if (LightData.hasSunLight(sl)) {
      this.tasks.queues.sun.update.push(this.x, this.y, this.z);
      Propagation.instance.sunUpdate(this.tasks);
    }
    if (this.keepTrackOfChunksToBuild) {
      this.tasks.addNeighborsToRebuildQueue(this.x, this.y, this.z);
    }
  }

  erase() {
    if (!this._dt.loadInAtLocation(this.location) && this.requestsId != "")
      return this;
    const sl = this._dt.getLight();
    this._worldPainter.eraseVoxel(this.location);
    this._dt
      .setAir()
      .setLight(sl > 0 ? sl : 0)
      .commit();

    if (LightData.hasRGBLight(sl)) {
      this.tasks.queues.rgb.remove.push(this.x, this.y, this.z);
      Propagation.instance.rgbRemove(this.tasks);
    }

    if (LightData.hasSunLight(sl)) {
      console.log("add to sun update erase");
      this.tasks.queues.sun.remove.push(this.x, this.y, this.z);

      Propagation.instance.sunRemove(this.tasks);
    }

    if (this.keepTrackOfChunksToBuild) {
      this.tasks.addNeighborsToRebuildQueue(this.x, this.y, this.z);
    }

    return this;
  }

  runUpdates() {
    Propagation.instance.rgbUpdate(this.tasks);
    Propagation.instance.sunUpdate(this.tasks);

    this.tasks.queues.rgb.map.clear();
    this.tasks.queues.sun.updateMap.clear();
  }

  worldAlloc(start: Vec3Array, end: Vec3Array) {
    return new SafePromise<boolean>("worldAlloc", (resolve) => {
      DVEFConstrucotrCore.instance.threads.world.runPromiseTasks<WorldLockTasks>(
        "world-alloc",
        [this.dimension, start, end],
        [],
        () => {
          resolve(true);
        }
      );
    }).run();
  }

  worldDealloc(start: Vec3Array, end: Vec3Array) {
    return new SafePromise<boolean>("worldDealloc", (resolve) => {
      DVEFConstrucotrCore.instance.threads.world.runPromiseTasks<WorldLockTasks>(
        "world-dealloc",
        [this.dimension, start, end],
        [],
        () => {
          resolve(true);
        }
      );
    }).run();
  }
}
