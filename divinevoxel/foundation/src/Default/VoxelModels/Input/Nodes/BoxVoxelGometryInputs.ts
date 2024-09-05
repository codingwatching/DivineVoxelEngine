import { VoxelFacesArray } from "@divinevoxel/core/Math";
import { Vec4Array } from "@amodx/math";

export type BoxFaceArags = [
  //topp
  enabled: boolean,
  Fliped: boolean,
  texture: number,
  rotation: number,
  uvs: Vec4Array
];

enum ArgIndexes {
  Enabled,
  Fliped,
  Texture,
  Rotation,
  UVs,
}

const getArgs = (): BoxFaceArags => {
  const args: BoxFaceArags = [] as any;
  args[ArgIndexes.Enabled] = true;
  args[ArgIndexes.Fliped] = false;
  args[ArgIndexes.Texture] = 0;
  args[ArgIndexes.Rotation] = 0;
  args[ArgIndexes.UVs] = [0, 0, 1, 1];
  return args;
};

export type BoxVoxelGometryArgs = BoxFaceArags[];

export class BoxVoxelGometryInputs {
  static ArgIndexes = ArgIndexes;
  static CreateArgs(): BoxVoxelGometryArgs {
    const base: BoxVoxelGometryArgs = [] as any;
    VoxelFacesArray.forEach((_) => (base[_] = getArgs()));
    return base;
  }
}
