import { VoxelMesherDataTool } from "../../../../Tools/VoxelMesherDataTool.js";
import { VoxelConstructor } from "../VoxelConstructor.js";
import { TextureRegister } from "../../../../../../Textures/TextureRegister.js";
import type { ConstructorTextureData } from "../../../../../../Textures/Constructor.types.js";
import { VoxelFaces } from "@divinevoxel/core/Math/index.js";
import {
  HalfCubeStates,
  HalfCubeVoxelShape,
} from "../../../../Shapes/default/Cube/HalfCube.voxel.shape.js";
import { LightGradient } from "../../../../Calc/Light/LightGradient.js";

export type SimpleHalfCubeVoxelConstructorData =
  | ConstructorTextureData
  | { sides: ConstructorTextureData; bottomAndTop: ConstructorTextureData };
export class SimpleHalfCubeVoxelConstructor extends VoxelConstructor {
  textures: number[] = [];
  constructor(
    public id: string,
    public textureData: SimpleHalfCubeVoxelConstructorData
  ) {
    super();
  }
  process(tool: VoxelMesherDataTool) {
    HalfCubeVoxelShape.start();
    tool.getOverlayTextures().setAll(0);
    const shapeState = tool.voxel.getShapeState();

    if (tool.isFaceExposed(VoxelFaces.Top)) {
      if (shapeState == HalfCubeStates.Bottom) LightGradient.aoOffset.y = -1;
      tool.setTexture(this.textures[1]).calculateLight(VoxelFaces.Top);
      LightGradient.aoOffset.y = 0;
      HalfCubeVoxelShape.add.top();
    }
    if (tool.isFaceExposed(VoxelFaces.Bottom)) {
      tool.setTexture(this.textures[1]).calculateLight(VoxelFaces.Bottom);
      HalfCubeVoxelShape.add.bottom();
    }
    if (tool.isFaceExposed(VoxelFaces.East)) {
      tool.setTexture(this.textures[0]).calculateLight(VoxelFaces.East);
      HalfCubeVoxelShape.add.east();
    }
    if (tool.isFaceExposed(VoxelFaces.West)) {
      tool.setTexture(this.textures[0]).calculateLight(VoxelFaces.West);
      HalfCubeVoxelShape.add.west();
    }
    if (tool.isFaceExposed(VoxelFaces.South)) {
      tool.setTexture(this.textures[0]).calculateLight(VoxelFaces.South);
      HalfCubeVoxelShape.add.south();
    }
    if (tool.isFaceExposed(VoxelFaces.North)) {
      tool.setTexture(this.textures[0]).calculateLight(VoxelFaces.North);
      HalfCubeVoxelShape.add.north();
    }
  }

  onTexturesRegistered(textureManager: typeof TextureRegister): void {
    const textures = this.textureData;

    if (Array.isArray(textures)) {
      let i = 2;
      while (i--) {
        this.textures.push(textureManager.getTextureUV(textures));
      }
      return;
    }

    this.textures.push(textureManager.getTextureUV(textures.sides));
    this.textures.push(textureManager.getTextureUV(textures.bottomAndTop));
  }
}
