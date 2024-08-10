import { ConstructorTasksIds } from "./ConstructorTasksIds.js";
import { Threads } from "@amodx/threads/";

import type { BuildTasks, PriorityTask } from "../../Types/Tasks.types.js";

import { WorldRegister } from "../../Data/World/WorldRegister.js";

import { DVEFConstrucotrCore } from "./DVEFConstructorCore.js";
import { WorldSpaces } from "@divinevoxel/core/Data/World/WorldSpaces.js";

export default function (DVEC: DVEFConstrucotrCore) {
  Threads.registerTasks("clear-all", () => {
    WorldRegister.instance.clearAll();
  });

  Threads.registerTasks<PriorityTask<BuildTasks>>(
    ConstructorTasksIds.BuildChunk,
    async (buildData, onDone) => {
      WorldRegister.instance.cache.enable();
      const location = buildData.data[0];
      await DVEC.mesher.meshChunk(location, buildData.data[1], 0);
      if (onDone) onDone();
      WorldRegister.instance.cache.disable();
    }
  );

  Threads.registerTasks<BuildTasks>(
    ConstructorTasksIds.BuildColumn,
    async (data, onDone) => {

      WorldRegister.instance.cache.enable();
      const column = WorldRegister.instance.column.get(data[0]);
      if (!column) {
        console.warn("Tried building a column that does not exists.", data);
        return false;
      }
      if (column.chunks.length == 0) return false;
      const location = data[0];
      for (let i = 0; i < column.chunks.length; i++) {
        const chunk = column.chunks[i];
        if (!chunk) continue;
  
        DVEC.mesher.meshChunk(
          [
            location[0],
            location[1],
            location[2] + i * WorldSpaces.chunk.getHeight(),
            location[3],
          ],
          1,
          100
        );
      }

      if (onDone) onDone();
      WorldRegister.instance.cache.disable();
    },
    "deferred"
  );
}
