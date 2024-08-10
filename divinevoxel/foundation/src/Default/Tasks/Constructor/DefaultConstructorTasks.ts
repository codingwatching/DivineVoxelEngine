import { Threads } from "@amodx/threads/";

import type {
  ExplosionTasks,
  VoxelUpdateTasks as VoxelUpdateTasks,
  AnaylzerTask,
  WorldSunTask,
} from "../../../Types/Tasks.types.js";

import {
  EreaseAndUpdate,
  PaintAndUpdate,
  VoxelUpdate,
} from "./Tasks/VoxelUpdate.js";

import { TasksRequest } from "./Tasks/TasksRequest.js";
import { Propagation } from "../../Propagation";
import { Analyzer } from "../../Analyzer/Analyzer";
import { DefaultConstructorTasksIds } from "./Tasks/ConstructorTasksIds";

export default function () {
  const propagation = new Propagation();
  const analyzer = new Analyzer();

  Threads.registerTasks<VoxelUpdateTasks>(
    DefaultConstructorTasksIds.VoxelUpdate,
    async (data, onDone) => {
      await VoxelUpdate(data);
      if (onDone) onDone();
    },
    "deferred"
  );

  Threads.registerTasks<AnaylzerTask>(
    DefaultConstructorTasksIds.VoxelErease,
    async (data, onDone) => {
      await EreaseAndUpdate(data);
      if (onDone) onDone();
    },
    "deferred"
  );

  Threads.registerTasks<VoxelUpdateTasks>(
    DefaultConstructorTasksIds.VoxelPaint,
    async (data, onDone) => {
      await PaintAndUpdate(data);
      if (onDone) onDone();
    },
    "deferred"
  );

  Threads.registerTasks<ExplosionTasks>(
    DefaultConstructorTasksIds.Explosion,
    async (data) => {
      await propagation.explosion(
        TasksRequest.getExplosionRequests(data[0], data[1], data[2], data[3])
      );
    }
  );

  Threads.registerTasks<WorldSunTask>(
    DefaultConstructorTasksIds.WorldSun,
    (data, onDone) => {
      propagation.worldSun(TasksRequest.getWorldSunRequests(data[0], data[1]));
      if (onDone) onDone();
    },
    "deferred"
  );

  Threads.registerTasks<AnaylzerTask>(
    DefaultConstructorTasksIds.AnalyzerPropagation,
    async (data, onDone) => {
      await analyzer.runPropagation(data);
      if (onDone) onDone();
    },
    "deferred"
  );

  Threads.registerTasks<AnaylzerTask>(
    DefaultConstructorTasksIds.AnalyzerUpdate,
    async (data, onDone) => {
      await analyzer.runUpdate(data);
      if (onDone) onDone();
    },
    "deferred"
  );
}
