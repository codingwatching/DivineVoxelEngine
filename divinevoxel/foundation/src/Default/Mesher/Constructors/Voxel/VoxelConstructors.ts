//types
import type { ConstructorTextureData } from "../../../../Textures/Constructor.types";

import type { DirectionNames } from "@divinevoxel/core/Types/Util.types.js";
//utils

//constructors
import { SimpleCubeVoxelConstructor } from "./Classes/Cube/SimpleCube.constructor.js";
import {
  PillarCubeVoxelConstructor,
  PillarCubeVoxelConstructorData,
} from "./Classes/Cube/PillarCube.constructor.js";
import { SimpleLiquidConstructor } from "./Classes/Liquid/SimpleLiquid.constructor.js";
import { SimplePanelVoxelConstructor } from "./Classes/Panel/SimplePanel.constructor.js";
import { SimpleStairVoxelConstructor } from "./Classes/Stair/SimpleStair.constructor.js";
import { VoxelConstructor } from "./Classes/VoxelConstructor.js";
import { SimpleCrossedPanelVoxelConstructor } from "./Classes/Panel/SimpleCrossedPanel.constructor.js";
import { UtilMap } from "../../../../Util/UtilMap";
import { ModCubeVoxelConstructor } from "./Classes/Cube/ModCube.constructor";
import { VoxelFaces } from "@divinevoxel/core/Math";
import { SimpleHalfCubeVoxelConstructor } from "./Classes/HalfCube/SimpleHalfCube.constructor";
import { ModHalfCubeVoxelConstructor } from "./Classes/HalfCube/ModHalfCube.constructor";
import { ModStairVoxelConstructor } from "./Classes/Stair/ModStair.constructor";

export class VoxelConstructors {
  static constructors = new UtilMap<string, VoxelConstructor>();
  static get(id: string): VoxelConstructor {
    return <VoxelConstructor>this.constructors.get(id);
  }
  static registerVoxel(voxel: VoxelConstructor | VoxelConstructor[]) {
    if (Array.isArray(voxel)) {
      for (const vox of voxel) {
        this.constructors.set(vox.id, vox);
      }
      return;
    }
    this.constructors.set(voxel.id, voxel);
  }

  static defaults = {
    cube: {
      mod(
        id: string,
        textures:
          | ConstructorTextureData[]
          | Record<VoxelFaces, ConstructorTextureData[]>
      ) {
        return new ModCubeVoxelConstructor(id, textures);
      },
      simple(
        id: string,
        textures:
          | ConstructorTextureData
          | Record<DirectionNames, ConstructorTextureData>
      ) {
        return new SimpleCubeVoxelConstructor(id, textures);
      },
      pillar(id: string, textures: PillarCubeVoxelConstructorData) {
        return new PillarCubeVoxelConstructor(id, textures);
      },
    },
    halfCube: {
      mod(id: string, textures: ConstructorTextureData[]) {
        return new ModHalfCubeVoxelConstructor(id, textures);
      },
      simple(
        id: string,
        textures: SimpleHalfCubeVoxelConstructor["textureData"]
      ) {
        return new SimpleHalfCubeVoxelConstructor(id, textures);
      },
    },
    stair: {
      mod(id: string, textures: ConstructorTextureData[]) {
        return new ModStairVoxelConstructor(id, textures);
      },
      simple(id: string, texture: ConstructorTextureData) {
        return new SimpleStairVoxelConstructor(id, texture);
      },
    },
    panel: {
      simple(id: string, texture: ConstructorTextureData) {
        return new SimplePanelVoxelConstructor(id, texture);
      },
    },
    crossedPanel: {
      simple(id: string, texture: ConstructorTextureData) {
        return new SimpleCrossedPanelVoxelConstructor(id, texture);
      },
    },
    liquid: {
      simple(
        id: string,
        textures: [ConstructorTextureData, ConstructorTextureData]
      ) {
        return new SimpleLiquidConstructor(id, textures);
      },
    },
  };
}
