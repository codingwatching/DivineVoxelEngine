//types
//objects
import { WorldBounds } from "@divinevoxel/core/Data/World/WorldBounds.js";
import { WorldGenRegister } from "./WorldGenRegister.js";
//tools
import { WorldGenBrush } from "./WorldGenBrush.js";
import { SafeInterval } from "@amodx/core/Intervals/SafeInterval.js";
import { WorldGenInterface } from "../../Interfaces/WorldGen/WorldGen.types.js";
import { GenerateTasks } from "../../Types/Tasks.types.js";
import { Threads } from "@amodx/threads";
import { DefaultConstructorTasksIds } from "../Tasks/Constructor/Tasks/ConstructorTasksIds.js";

export class WorldGeneration {
  static worldGen: WorldGenInterface | null = null;

  static register = WorldGenRegister;
  static worldBounds = WorldBounds;

  static _brushes: any[] = [];

  static setWorldGen(worldGen: WorldGenInterface) {
    this.worldGen = worldGen;
  }

  static async generate(
    data: GenerateTasks,
    mode: "generate" | "decorate",
    onDone: Function
  ) {
    if (!this.worldGen) {
      throw new Error(`A World Generator must be set.`);
    }

    const requestsId = WorldGenRegister.registerRequest(data[0]);
    for (const brush of this._brushes) {
      brush.requestsId = requestsId;
    }

    if (mode == "generate") {
      await this.worldGen.generate(data);
    }
    if (mode == "decorate") {
      await this.worldGen.decorate(data);
    }

    const inte = new SafeInterval().setInterval(100).setOnRun(() => {
      if (WorldGenRegister.attemptRequestFullFill(requestsId)) {
        onDone();
        inte.stop();
      }
    });
    inte.start();
  }

  static getBrush() {
    const brush = new WorldGenBrush();
    return brush;
  }
}

Threads.registerTasks<GenerateTasks>(
  DefaultConstructorTasksIds.Generate,
  (data, onDone) => {
    if (!onDone) return;
    WorldGeneration.generate(data, "generate", onDone);
  },
  "deferred"
);
Threads.registerTasks<GenerateTasks>(
  DefaultConstructorTasksIds.Decorate,
  (data, onDone) => {
    if (!onDone) return;
    WorldGeneration.generate(data, "decorate", onDone);
  },
  "deferred"
);
