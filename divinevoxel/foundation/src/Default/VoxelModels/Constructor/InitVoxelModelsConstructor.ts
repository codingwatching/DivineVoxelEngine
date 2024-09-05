import { DivineVoxelEngineConstructor } from "@divinevoxel/core/Contexts/Constructor";
import { VoxelConstructors } from "../../Mesher/Constructors/Voxel/VoxelConstructors";

import { VoxelMoelVoxelConstructor } from "./VoxelMoelVoxelConstructor";
import { ConstructorVoxelModelSyncData } from "../VoxelModelRules.types";
import { VoxelModelConstructorRegister } from "./Register/VoxelModelConstructorRegister";

export default function (DVEC: DivineVoxelEngineConstructor) {
  DVEC.TC.registerTasks<ConstructorVoxelModelSyncData>(
    "sync-voxel-model-data",
    (data) => {
      console.log("got the data!!!", data);

      VoxelModelConstructorRegister.setGeometryPalette(data.geometryPalette);

      VoxelModelConstructorRegister.registerGeometry(data.geometry);
      VoxelModelConstructorRegister.registerModels(data.models);

      for (const voxel of data.voxels) {
        VoxelConstructors.registerVoxel(
          new VoxelMoelVoxelConstructor(
            voxel.id,
            VoxelModelConstructorRegister.models.get(voxel.modelId)!,
            voxel.voxelInputMap
          )
        );
      }
    }
  );
}
