import { Observable } from "@amodx/core/Observers";
import { BoxVoxelGometryInputs } from "../../Input/Nodes/BoxVoxelGometryInputs";
import { VoxelRuleGeometry } from "../Classes/VoxelRulesGeometry";
import {
  VoxelFaceNameArray,
  VoxelFaceNameRecord,
} from "@divinevoxel/core/Math";
import { TextureManager } from "../../../../Textures/TextureManager";
import { Matrix2x2Like, Mat2Array, Vec4Array, AMath } from "@amodx/math";
import { QuadUVData } from "@amodx/meshing/Geometry.types";

const isArgString = (data: any) => {
  if (typeof data !== "string") return;
  return data[0] == "@";
};

const rotationMatrix = new Map<number, Mat2Array>();

const mapQuadUvs = (uvs: Vec4Array, rotation: number = 0): QuadUVData => {
  let rotM = rotationMatrix.get(rotation);

  if (!rotM) {
    rotM = Matrix2x2Like.Rotation(AMath.DegreesToRadians(rotation));
    rotationMatrix.set(rotation, rotM);
  }

  return [
    Matrix2x2Like.ApplyMatrixArray(rotM, [uvs[2], uvs[3]]),
    Matrix2x2Like.ApplyMatrixArray(rotM, [uvs[0], uvs[3]]),
    Matrix2x2Like.ApplyMatrixArray(rotM, [uvs[0], uvs[1]]),
    Matrix2x2Like.ApplyMatrixArray(rotM, [uvs[2], uvs[1]]),
  ];
};

export function BuildGeomtryInputs(geomtry: VoxelRuleGeometry) {
  const inputObservers = new Map<string, Observable<any>>();

  const getInputObserver = (id: string) => {
    let obs = inputObservers.get(id);
    if (!obs) {
      obs = new Observable<any>();
      inputObservers.set(id, obs);
    }
    return obs;
  };

  let faceTransparentIndex: boolean[] = [];
  let faceCount = 0;
  let args: any[] = [];
  for (const node of geomtry.data.nodes) {
    if (node.type == "box") {
      const newArgs = BoxVoxelGometryInputs.CreateArgs();
      args.push(newArgs);
      const argsIndex = args.length - 1;

      for (const face of VoxelFaceNameArray) {
        const relativeFaceCount = faceCount;
        const faceIndex = VoxelFaceNameRecord[face];

        const faceData = node.faces[face];
        let defaultUvs: Vec4Array = [0, 0, 1, 1];
        if (isArgString(faceData.enabled)) {
          getInputObserver(String(faceData.enabled!)).subscribe(
            (value) =>
              (args[argsIndex][VoxelFaceNameRecord[face]][
                BoxVoxelGometryInputs.ArgIndexes.Enabled
              ] = value)
          );
        }
        if (isArgString(faceData.flip)) {
          getInputObserver(String(faceData.flip!)).subscribe(
            (value) =>
              (args[argsIndex][VoxelFaceNameRecord[face]][
                BoxVoxelGometryInputs.ArgIndexes.Fliped
              ] = value)
          );
        }
        if (isArgString(faceData.transparent)) {
          getInputObserver(String(faceData.transparent!)).subscribe((value) => {
            args[argsIndex][VoxelFaceNameRecord[face]][
              BoxVoxelGometryInputs.ArgIndexes.Transparent
            ] = value;

            faceTransparentIndex[relativeFaceCount + faceIndex] =
              Boolean(value);
          });
        } else {
          args[argsIndex][VoxelFaceNameRecord[face]][
            BoxVoxelGometryInputs.ArgIndexes.Transparent
          ] = Boolean(faceData.transparent);
          faceTransparentIndex[relativeFaceCount + faceIndex] = Boolean(
            faceData.transparent
          );
        }
        if (isArgString(faceData.rotation)) {
          getInputObserver(String(faceData.rotation!)).subscribe((value) => {
            args[argsIndex][VoxelFaceNameRecord[face]][
              BoxVoxelGometryInputs.ArgIndexes.Rotation
            ] = value;

            args[argsIndex][VoxelFaceNameRecord[face]][
              BoxVoxelGometryInputs.ArgIndexes.UVs
            ] = mapQuadUvs(defaultUvs, value);
          });
        } else {
          faceData.rotation &&
            (args[argsIndex][VoxelFaceNameRecord[face]][
              BoxVoxelGometryInputs.ArgIndexes.Rotation
            ] = faceData.rotation as number);
        }
        if (isArgString(faceData.uv)) {
          const defaultInput =
            geomtry.data.arguments[(faceData.uv as string).substring(1)];

          if (defaultInput.type == "box-uv" && defaultInput.default) {
            args[argsIndex][VoxelFaceNameRecord[face]][
              BoxVoxelGometryInputs.ArgIndexes.UVs
            ] = mapQuadUvs(
              defaultInput.default,
              args[argsIndex][VoxelFaceNameRecord[face]][
                BoxVoxelGometryInputs.ArgIndexes.Rotation
              ]
            );
            defaultUvs = defaultInput.default;
          }

          getInputObserver(String(faceData.uv!)).subscribe((value) => {
            args[argsIndex][VoxelFaceNameRecord[face]][
              BoxVoxelGometryInputs.ArgIndexes.UVs
            ] = mapQuadUvs(
              value,
              args[argsIndex][VoxelFaceNameRecord[face]][
                BoxVoxelGometryInputs.ArgIndexes.Rotation
              ]
            );
          });
        } else {
          args[argsIndex][VoxelFaceNameRecord[face]][
            BoxVoxelGometryInputs.ArgIndexes.UVs
          ] = mapQuadUvs(
            faceData.uv as Vec4Array,
            args[argsIndex][VoxelFaceNameRecord[face]][
              BoxVoxelGometryInputs.ArgIndexes.Rotation
            ]
          );
          defaultUvs = faceData.uv as Vec4Array;
        }
        if (isArgString(faceData.texture)) {
          getInputObserver(String(faceData.texture!)).subscribe(
            (value) =>
              (args[argsIndex][VoxelFaceNameRecord[face]][
                BoxVoxelGometryInputs.ArgIndexes.Texture
              ] = value)
          );
        }
      }
      faceCount += 6;
    }
  }

  const originalTransparentIndex = structuredClone(faceTransparentIndex);
  const orginalArgs = structuredClone(args);

  const finalGeoInputs = {
    faceTransparentIndex,
    cloneArgs() {
      return structuredClone(args);
    },
    resetDefaults() {
      args = structuredClone(orginalArgs);
      faceTransparentIndex = structuredClone(originalTransparentIndex);
      this.faceTransparentIndex = faceTransparentIndex;
    },
  } as Record<string, any> & {
    faceTransparentIndex: boolean[];
    cloneArgs(): any[];
    resetDefaults(): void;
  };

  for (const arg in geomtry.data.arguments) {
    const argKey = `@${arg}`;
    if (!inputObservers.has(argKey)) continue;
    const obs = inputObservers.get(argKey)!;
    const data = geomtry.data.arguments[arg];
    Object.defineProperty(finalGeoInputs, argKey, {
      set(value) {
        if (data.type == "texture") {
          value = TextureManager.getTextureIndex(value);
        }
        obs.notify(value);
      },
    });
  }

  return finalGeoInputs;
}
