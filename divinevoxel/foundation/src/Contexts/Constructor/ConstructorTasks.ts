import { ConstructorTasksIds } from "./ConstructorTasksIds.js";
import { Threads } from "@amodx/threads/";

import type { BuildTasks, PriorityTask } from "../../Types/Tasks.types.js";

import { WorldRegister } from "../../Data/World/WorldRegister.js";

import { ChunkDataTool } from "../../Default/Tools/Data/WorldData/ChunkDataTool.js";
import { DVEFConstrucotrCore } from "./DVEFConstructorCore.js";

export default function (DVEC: DVEFConstrucotrCore) {
  const chunkTool = new ChunkDataTool();

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
      for (const chunk of column.chunks) {
        chunkTool.setChunk(chunk);
        const chunkPOS = chunkTool.getPositionData();
        location[1] = chunkPOS.x;
        location[2] = chunkPOS.y;
        location[3] = chunkPOS.z;
        DVEC.mesher.meshChunk([...location], 1, 100);
      }
      if (onDone) onDone();
      WorldRegister.instance.cache.disable();
    },
    "deferred"
  );
}
