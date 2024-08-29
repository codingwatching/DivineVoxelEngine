import { VoxelMesherDataTool } from "../../../../Tools/VoxelMesherDataTool.js";
import { CubeVoxelShape } from "../../../../Shapes/default/Cube/Cube.voxel.shape.js";
import { VoxelConstructor } from "../VoxelConstructor.js";
import { TextureRegister } from "../../../../../../Textures/TextureRegister.js";
import type { ConstructorTextureData } from "../../../../../../Textures/Constructor.types.js";
import { VoxelFaces, VoxelFacesArray } from "@divinevoxel/core/Math/index.js";

export class ModCubeVoxelConstructor extends VoxelConstructor {
  textures: Record<VoxelFaces, number[]> = {
    [VoxelFaces.Top]: [],
    [VoxelFaces.Bottom]: [],
    [VoxelFaces.North]: [],
    [VoxelFaces.South]: [],
    [VoxelFaces.East]: [],
    [VoxelFaces.West]: [],
  };
  constructor(
    public id: string,
    public textureData:
      | ConstructorTextureData[]
      | Record<VoxelFaces, ConstructorTextureData[]>
  ) {
    super();
  }
  process(tool: VoxelMesherDataTool) {
    tool.getOverlayTextures().setAll(0);

    const shapeState = tool.voxel.getMod();

    if (tool.isFaceExposed(VoxelFaces.Top)) {
      tool
        .setTexture(this.textures[VoxelFaces.Top][shapeState])
        .calculateLight(VoxelFaces.Top);
      CubeVoxelShape.add.top();
    }
    if (tool.isFaceExposed(VoxelFaces.Bottom)) {
      tool
        .setTexture(this.textures[VoxelFaces.Bottom][shapeState])
        .calculateLight(VoxelFaces.Bottom);
      CubeVoxelShape.add.bottom();
    }
    if (tool.isFaceExposed(VoxelFaces.East)) {
      tool
        .setTexture(this.textures[VoxelFaces.East][shapeState])
        .calculateLight(VoxelFaces.East);
      CubeVoxelShape.add.east();
    }
    if (tool.isFaceExposed(VoxelFaces.West)) {
      tool
        .setTexture(this.textures[VoxelFaces.West][shapeState])
        .calculateLight(VoxelFaces.West);
      CubeVoxelShape.add.west();
    }
    if (tool.isFaceExposed(VoxelFaces.South)) {
      tool
        .setTexture(this.textures[VoxelFaces.South][shapeState])
        .calculateLight(VoxelFaces.South);
      CubeVoxelShape.add.south();
    }
    if (tool.isFaceExposed(VoxelFaces.North)) {
      tool
        .setTexture(this.textures[VoxelFaces.North][shapeState])
        .calculateLight(VoxelFaces.North);
      CubeVoxelShape.add.north();
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

    for (const face of VoxelFacesArray) {
      push(face, ...textures[face].map((_) => textureManager.getTextureUV(_)));
    }
  }
}
