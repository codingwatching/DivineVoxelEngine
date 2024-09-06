import type { ConstructorTextureData } from "../../../../../../Textures/Constructor.types.js";

import { VoxelMesherDataTool } from "../../../../Tools/VoxelMesherDataTool.js";
import { CubeVoxelShape } from "../../../../Shapes/default/Cube/Cube.voxel.shape.js";
import { VoxelConstructor } from "../VoxelConstructor.js";
import { TextureRegister } from "../../../../../../Textures/TextureRegister.js";
import { VoxelFaces } from "@divinevoxel/core/Math";

export type PillarCubeVoxelConstructorData = {
  up: ConstructorTextureData;
  down: ConstructorTextureData;
  sideMiddle: ConstructorTextureData;
  sideDown: ConstructorTextureData;
  sideUp: ConstructorTextureData;
  sideFloat: ConstructorTextureData;
};
export class PillarCubeVoxelConstructor extends VoxelConstructor {
  textures: [
    up: number,
    down: number,
    sideMiddle: number,
    sideDown: number,
    sideUp: number,
    sideFloat: number
  ];
  constructor(
    public id: string,
    public textureData: PillarCubeVoxelConstructorData
  ) {
    super();
  }
  process(tool: VoxelMesherDataTool) {
    const upCheck =
      tool.nVoxel.loadInAt(tool.voxel.x, tool.voxel.y + 1, tool.voxel.z) &&
      tool.voxel.isSameVoxel(tool.nVoxel);

    const downCheck =
      tool.nVoxel.loadInAt(tool.voxel.x, tool.voxel.y - 1, tool.voxel.z) &&
      tool.voxel.isSameVoxel(tool.nVoxel);

    let side = -1;
    determineText: if (side) {
      if (upCheck && downCheck) {
        side = this.textures[2];
        break determineText;
      }
      if (upCheck && !downCheck) {
        side = this.textures[3];
        break determineText;
      }
      if (!upCheck && downCheck) {
        side = this.textures[4];
        break determineText;
      }
      if (!upCheck && !downCheck) {
        side = this.textures[5];
        break determineText;
      }
      side = 0;
    }
    tool.getOverlayTextures().setAll(0);
    if (tool.isFaceExposed(VoxelFaces.Up)) {
      tool.setTexture(this.textures[0]).calculateLight(VoxelFaces.Up);
      CubeVoxelShape.add.up();
    }
    if (tool.isFaceExposed(VoxelFaces.Down)) {
      tool.setTexture(this.textures[1]).calculateLight(VoxelFaces.Down);
      CubeVoxelShape.add.down();
    }
    if (tool.isFaceExposed(VoxelFaces.East)) {
      tool.setTexture(side).calculateLight(VoxelFaces.East);
      CubeVoxelShape.add.east();
    }
    if (tool.isFaceExposed(VoxelFaces.West)) {
      tool.setTexture(side).calculateLight(VoxelFaces.West);
      CubeVoxelShape.add.west();
    }
    if (tool.isFaceExposed(VoxelFaces.South)) {
      tool.setTexture(side).calculateLight(VoxelFaces.South);
      CubeVoxelShape.add.south();
    }
    if (tool.isFaceExposed(VoxelFaces.North)) {
      tool.setTexture(side).calculateLight(VoxelFaces.North);
      CubeVoxelShape.add.north();
    }
  }
  onTexturesRegistered(textureManager: typeof TextureRegister): void {
    this.textures = [
      textureManager.getTextureUV(this.textureData.up),
      textureManager.getTextureUV(this.textureData.down),
      textureManager.getTextureUV(this.textureData.sideMiddle),
      textureManager.getTextureUV(this.textureData.sideDown),
      textureManager.getTextureUV(this.textureData.sideUp),
      textureManager.getTextureUV(this.textureData.sideFloat),
    ];
    (this as any).textureData = null;
  }
}
