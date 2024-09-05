import { DivineVoxelEngineConstructor } from "@divinevoxel/core/Contexts/Constructor";

import { DVEFConstrucotrCore } from "../../Contexts/Constructor/DVEFConstructorCore.js";

import {
  DVEDefaultMesher,
  DVEDefaultMesherInitData,
} from "../Mesher/Mesher.js";
import RegisterDefaultTasks from "../Tasks/Constructor/DefaultConstructorTasks.js";
import InitVoxelModels from "../VoxelModels/Constructor/InitVoxelModelsConstructor.js";
export async function StartContrusctor(props: {
  mesher: DVEDefaultMesherInitData;
}) {
  const DVEC = new DivineVoxelEngineConstructor();

  const core = new DVEFConstrucotrCore({
    mesher: new DVEDefaultMesher(props.mesher),
  });
  InitVoxelModels(DVEC);
  RegisterDefaultTasks();
  await DVEC.init({
    core,
  });

  return {
    DVEC,
    core,
  };
}
