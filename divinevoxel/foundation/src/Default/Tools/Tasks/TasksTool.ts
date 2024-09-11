import { Threads } from "@amodx/threads/";
import { WorldRegister } from "../../../Data/World/WorldRegister.js";
import {
  BuildTasks,
  ExplosionTasks,
  GenerateTasks,
  VoxelUpdateTasks,
  Priorities,
  PriorityTask,
  UpdateTasks,
  AnaylzerTask,
  WorldSunTask,
} from "../../../Types/Tasks.types.js";

import { WorldSpaces } from "@divinevoxel/core/Data/World/WorldSpaces.js";
import { LocationData } from "@divinevoxel/core/Math";
import type { RawVoxelData } from "../../../Data/Types/VoxelData.types.js"
import { ConstructorRemoteThreadTasks } from "../../../Contexts/Constructor/ConstructorRemoteThreadTasks.js";
import { ConstructorTasksIds } from "../../../Contexts/Constructor/ConstructorTasksIds.js";
import { DefaultConstructorTasksIds } from "../../Tasks/Constructor/Tasks/ConstructorTasksIds.js";
import { DVEConstructorTasksQueues } from "../../../Contexts/Constructor/DVEConstructorTasksQueues.js";

export type TaskRunModes = "async" | "sync";
export class TaskTool {
  _data = {
    dimension: "main",
    queue: "main",
  };

  _thread = "";
  _priority: Priorities = 0;
  constructor() {
    this._thread = Threads.threadName;
  }

  setPriority(priority: Priorities) {
    this._priority = priority;
    return this;
  }

  setFocalPoint(location: LocationData) {
    const [dimesnion, x, y, z] = location;
    const queueKey = `${dimesnion}-${WorldSpaces.region.getKeyXYZ(x, y, z)}`;
    DVEConstructorTasksQueues.instance.addQueue(queueKey);
    this._data.queue = queueKey;
    this._thread = Threads.threadName;
    return this;
  }

  voxelUpdate = {
    update: {
      run: (
        location: LocationData,
        raw: RawVoxelData,
        onDone: (data: any) => void,
        mode: TaskRunModes = "sync"
      ) => {
        DVEConstructorTasksQueues.instance.constructors.runPromiseTasks<VoxelUpdateTasks>(
          DefaultConstructorTasksIds.VoxelUpdate,
          [location, raw, this._data.queue, this._thread],
          [],
          onDone,
          mode == "sync" ? 0 : undefined
        );
      },
    },
    erase: {
      run: (
        location: LocationData,
        onDone: (data: any) => void,
        mode: TaskRunModes = "sync"
      ) => {
        DVEConstructorTasksQueues.instance.constructors.runPromiseTasks<UpdateTasks>(
          DefaultConstructorTasksIds.VoxelErease,
          [location, this._data.queue, this._thread],
          [],
          onDone,
          mode == "sync" ? 0 : undefined
        );
      },
    },
    paint: {
      run: (
        location: LocationData,
        raw: RawVoxelData,
        onDone: (data: any) => void,
        mode: TaskRunModes = "sync"
      ) => {
        DVEConstructorTasksQueues.instance.constructors.runPromiseTasks<VoxelUpdateTasks>(
          DefaultConstructorTasksIds.VoxelPaint,
          [location, raw, this._data.queue, this._thread],
          [],
          onDone,
          mode == "sync" ? 0 : undefined
        );
      },
    },
  };
  build = {
    chunk: {
      deferred: {
        run: (buildTasks: BuildTasks, onDone: (data: any) => void) => {
          DVEConstructorTasksQueues.instance.constructors.runPromiseTasks<
            PriorityTask<BuildTasks>
          >(
            ConstructorTasksIds.BuildChunk,
            {
              data: buildTasks,
              priority: this._priority,
            },
            [],
            onDone,
            undefined,
            0
          );
        },
      },
      queued: {
        add: (location: LocationData) => {
          DVEConstructorTasksQueues.instance.getTasks("build-chunk").add(
            {
              data: [location, 1],
              priority: this._priority,
            },
            this._data.queue
          );
        },
        run: (onDone: Function) => {
          DVEConstructorTasksQueues.instance
            .getTasks("build-chunk")
            .run(this._data.queue);
          DVEConstructorTasksQueues.instance
            .getTasks("build-chunk")
            .onDone(this._data.queue, onDone);
        },
        runAndAwait: async () => {
          await DVEConstructorTasksQueues.instance
            .getTasks("build-chunk")
            .runAndAwait(this._data.queue);
        },
      },
    },
    column: {
      queued: {},
      deferred: {
        run: (location: LocationData, onDone: (data: any) => void) => {
          DVEConstructorTasksQueues.instance.constructors.runPromiseTasks<BuildTasks>(
            ConstructorTasksIds.BuildColumn,
            [location, 1],
            [],
            onDone,
            undefined,
            0
          );
        },
      },
    },
  };
  explosion = {
    run: (
      location: LocationData,
      radius: number,
      onDone: (data: any) => void
    ) => {
      DVEConstructorTasksQueues.instance.constructors.runPromiseTasks<ExplosionTasks>(
        DefaultConstructorTasksIds.Explosion,
        [location, radius, "", ""],
        [],
        onDone,
        undefined,
        0
      );
    },
  };
  anaylzer = {
    update: {
      run: (location: LocationData, onDone: (data: any) => void) => {
        DVEConstructorTasksQueues.instance.constructors.runPromiseTasks<AnaylzerTask>(
          DefaultConstructorTasksIds.AnalyzerUpdate,
          [location, this._data.queue, this._thread],
          [],
          onDone,
          undefined,
          0
        );
      },
    },
  };
  propagation = {
    deferred: {
      run: (location: LocationData, onDone: (data: any) => void) => {
        DVEConstructorTasksQueues.instance.constructors.runPromiseTasks<AnaylzerTask>(
          DefaultConstructorTasksIds.AnalyzerPropagation,
          [location, this._data.queue, this._thread],
          [],
          onDone,
          undefined,
          0
        );
      },
    },
    queued: {
      add: (location: LocationData) => {
        DVEConstructorTasksQueues.instance
          .getTasks("propagation")
          .add([location, this._data.queue, this._thread], this._data.queue);
      },
      run: (onDone: Function) => {
        DVEConstructorTasksQueues.instance
          .getTasks("propagation")
          .run(this._data.queue);
        DVEConstructorTasksQueues.instance
          .getTasks("propagation")
          .onDone(this._data.queue, onDone);
      },
      runAndAwait: async () => {
        await DVEConstructorTasksQueues.instance
          .getTasks("propagation")
          .runAndAwait(this._data.queue);
      },
    },
  };
  generate = {
    deferred: {
      run(location: LocationData, data: any, onDone: (data: any) => void) {
        DVEConstructorTasksQueues.instance.constructors.runPromiseTasks<GenerateTasks>(
          DefaultConstructorTasksIds.Generate,
          [location, data],
          [],
          onDone,
          undefined,
          0
        );
      },
    },
    queued: {
      add: (data: GenerateTasks) => {
        DVEConstructorTasksQueues.instance
          .getTasks("generate")
          .add(data, this._data.queue);
      },
      run: (onDone: Function) => {
        DVEConstructorTasksQueues.instance
          .getTasks("generate")
          .run(this._data.queue);
        DVEConstructorTasksQueues.instance
          .getTasks("generate")
          .onDone(this._data.queue, onDone);
      },
      runAndAwait: async () => {
        await DVEConstructorTasksQueues.instance
          .getTasks("generate")
          .runAndAwait(this._data.queue);
      },
    },
  };
  decorate = {
    deferred: {
      run: (location: LocationData, data: any, onDone: (data: any) => void) => {
        DVEConstructorTasksQueues.instance.constructors.runPromiseTasks<GenerateTasks>(
          DefaultConstructorTasksIds.Decorate,
          [location, data],
          [],
          onDone,
          undefined,
          0
        );
      },
    },
    queued: {
      add: async (data: GenerateTasks) => {
        DVEConstructorTasksQueues.instance
          .getTasks("decorate")
          .add(data, this._data.queue);
      },
      run: (onDone: Function) => {
        DVEConstructorTasksQueues.instance
          .getTasks("decorate")
          .run(this._data.queue);
        DVEConstructorTasksQueues.instance
          .getTasks("decorate")
          .onDone(this._data.queue, onDone);
      },
      runAndAwait: async () => {
        await DVEConstructorTasksQueues.instance
          .getTasks("decorate")
          .runAndAwait(this._data.queue);
      },
    },
  };
  worldSun = {
    deferred: {
      run: (location: LocationData, onDone: (data: any) => void) => {
        DVEConstructorTasksQueues.instance.constructors.runPromiseTasks<WorldSunTask>(
          DefaultConstructorTasksIds.WorldSun,
          [location, this._thread],
          [],
          onDone,
          undefined,
          0
        );
      },
    },
    queued: {
      add: (location: LocationData) => {
        DVEConstructorTasksQueues.instance
          .getTasks("world-sun")
          .add([[...location], this._data.queue, this._thread], this._data.queue);
      },
      run: (onDone: Function) => {
        DVEConstructorTasksQueues.instance
          .getTasks("world-sun")
          .run(this._data.queue);
        DVEConstructorTasksQueues.instance
          .getTasks("world-sun")
          .onDone(this._data.queue, onDone);
      },
      runAndAwait: async () => {
        await DVEConstructorTasksQueues.instance
          .getTasks("world-sun")
          .runAndAwait(this._data.queue);
      },
    },
  };
}
DVEConstructorTasksQueues.onCreated.subscribe(TaskTool, () => {
  DVEConstructorTasksQueues.instance.registerTasks(
    "world-sun",
    DefaultConstructorTasksIds.WorldSun
  );
  DVEConstructorTasksQueues.instance.registerTasks(
    "decorate",
    DefaultConstructorTasksIds.Decorate
  );
  DVEConstructorTasksQueues.instance.registerTasks(
    "generate",
    DefaultConstructorTasksIds.Generate
  );
  DVEConstructorTasksQueues.instance.registerTasks(
    "propagation",
    DefaultConstructorTasksIds.AnalyzerPropagation
  );
  const tasks = new TaskTool();
  Threads.registerTasks<PriorityTask<BuildTasks>>(
    ConstructorRemoteThreadTasks.BuildChunk,
    (data) => {
      tasks.setPriority(data.priority);
      tasks.build.chunk.deferred.run(data.data, () => {});
    }
  );
});
