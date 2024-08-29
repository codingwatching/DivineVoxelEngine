import { VoxelMesherDataTool } from "../../../../Tools/VoxelMesherDataTool.js";
import { CubeVoxelShape } from "../../../../Shapes/default/Cube/Cube.voxel.shape.js";
import { VoxelConstructor } from "../VoxelConstructor.js";
import { TextureRegister } from "../../../../../../Textures/TextureRegister.js";
import type { ConstructorTextureData } from "../../../../../../Textures/Constructor.types.js";
import { VoxelFaces, VoxelFacesArray } from "@divinevoxel/core/Math/index.js";
import {
  HalfCubeStates,
  HalfCubeVoxelShape,
} from "../../../../Shapes/default/Cube/HalfCube.voxel.shape.js";
import { LightGradient } from "../../../../Calc/Light/LightGradient.js";

export class ModHalfCubeVoxelConstructor extends VoxelConstructor {
  textures: Record<VoxelFaces, number[]> = {
    [VoxelFaces.Top]: [],
    [VoxelFaces.Bottom]: [],
    [VoxelFaces.North]: [],
    [VoxelFaces.South]: [],
    [VoxelFaces.East]: [],
    [VoxelFaces.West]: [],
  };
  constructor(public id: string, public textureData: ConstructorTextureData[]) {
    super();
  }

  process(tool: VoxelMesherDataTool) {
    HalfCubeVoxelShape.start();
    tool.getOverlayTextures().setAll(0);

    const modState = tool.voxel.getMod();
    const shapeState = tool.voxel.getShapeState();

    if (tool.isFaceExposed(VoxelFaces.Top)) {
      if (shapeState == HalfCubeStates.Bottom) LightGradient.aoOffset.y = -1;
      tool
        .setTexture(this.textures[VoxelFaces.Top][modState])
        .calculateLight(VoxelFaces.Top);
      HalfCubeVoxelShape.add.top();
      LightGradient.aoOffset.y = 0;
    }
    if (tool.isFaceExposed(VoxelFaces.Bottom)) {
      tool
        .setTexture(this.textures[VoxelFaces.Bottom][modState])
        .calculateLight(VoxelFaces.Bottom);
      HalfCubeVoxelShape.add.bottom();
    }
    if (tool.isFaceExposed(VoxelFaces.East)) {
      tool
        .setTexture(this.textures[VoxelFaces.East][modState])
        .calculateLight(VoxelFaces.East);
      HalfCubeVoxelShape.add.east();
    }
    if (tool.isFaceExposed(VoxelFaces.West)) {
      tool
        .setTexture(this.textures[VoxelFaces.West][modState])
        .calculateLight(VoxelFaces.West);
      HalfCubeVoxelShape.add.west();
    }
    if (tool.isFaceExposed(VoxelFaces.South)) {
      tool
        .setTexture(this.textures[VoxelFaces.South][modState])
        .calculateLight(VoxelFaces.South);
      HalfCubeVoxelShape.add.south();
    }
    if (tool.isFaceExposed(VoxelFaces.North)) {
      tool
        .setTexture(this.textures[VoxelFaces.North][modState])
        .calculateLight(VoxelFaces.North);
      HalfCubeVoxelShape.add.north();
    }
  }

  onTexturesRegistered(textureManager: typeof TextureRegister): void {
    const textures = this.textureData;
    const push = (direction: VoxelFaces, ...textureIndex: number[]) => {
      this.textures[direction].push(...textureIndex);
    };

    if (Array.isArray(textures)) {
      for (const texture of textures) {
        for (const face of VoxelFacesArray) {
          push(face, textureManager.getTextureUV(texture));
        }
      }
      return;
    }
  }
}
