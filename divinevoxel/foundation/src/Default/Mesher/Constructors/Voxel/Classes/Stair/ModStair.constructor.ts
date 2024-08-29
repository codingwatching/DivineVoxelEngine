import { VoxelMesherDataTool } from "../../../../Tools/VoxelMesherDataTool.js";
import { VoxelConstructor } from "../VoxelConstructor.js";
import { TextureRegister } from "../../../../../../Textures/TextureRegister.js";
import type { ConstructorTextureData } from "../../../../../../Textures/Constructor.types.js";
import { VoxelFaces } from "@divinevoxel/core/Math/index.js";
import { StairVoxelShape } from "../../../../Shapes/default/Stairs/Stair.voxel.shape.js";
export class ModStairVoxelConstructor extends VoxelConstructor {
  textures: number[] = [];
  constructor(public id: string, public textureData: ConstructorTextureData[]) {
    super();
  }
  process(tool: VoxelMesherDataTool) {
    tool.getOverlayTextures().setAll(0);

    tool.setTexture(this.textures[tool.voxel.getMod()]);
    tool.getOverlayTextures().setAll(0);
    if (tool.isFaceExposed(VoxelFaces.Top)) {
      tool.calculateLight(VoxelFaces.Top);
      StairVoxelShape.add.top();
    }
    if (tool.isFaceExposed(VoxelFaces.Bottom)) {
      tool.calculateLight(VoxelFaces.Bottom);
      StairVoxelShape.add.bottom();
    }
    if (tool.isFaceExposed(VoxelFaces.East)) {
      tool.calculateLight(VoxelFaces.East);
      StairVoxelShape.add.east();
    }
    if (tool.isFaceExposed(VoxelFaces.West)) {
      tool.calculateLight(VoxelFaces.West);
      StairVoxelShape.add.west();
    }
    if (tool.isFaceExposed(VoxelFaces.South)) {
      tool.calculateLight(VoxelFaces.South);
      StairVoxelShape.add.south();
    }
    if (tool.isFaceExposed(VoxelFaces.North)) {
      tool.calculateLight(VoxelFaces.North);
      StairVoxelShape.add.north();
    }
  }

  onTexturesRegistered(textureManager: typeof TextureRegister): void {
    if (Array.isArray(this.textureData)) {
      for (const texture of this.textureData) {
        this.textures.push(textureManager.getTextureUV(texture));
      }

      return;
    }
  }
}
