import { Observable } from "@amodx/core/Observers";
import { BoxVoxelGometryInputs } from "../../Input/Nodes/BoxVoxelGometryInputs";
import { VoxelRuleGeometry } from "../Classes/VoxelRulesGeometry";
import {
  VoxelFaceNameArray,
  VoxelFaceNameRecord,
} from "@divinevoxel/core/Math";
import { TextureManager } from "../../../../Textures/TextureManager";

/**
 Default Inputs
[voxel id]
   [state id]
      [geo id]:[args]
      [geo id]:[args]
     ...
 */

const isArgString = (data: any) => {
  if (typeof data !== "string") return;
  return data[0] == "@";
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

  const args: any[] = [];
  for (const node of geomtry.data.nodes) {
    if (node.type == "box") {
      const newArgs = BoxVoxelGometryInputs.CreateArgs();
      for (const face of VoxelFaceNameArray) {
        const faceData = node.faces[face];
        if (isArgString(faceData.enabled)) {
          getInputObserver(String(faceData.enabled!)).subscribe(
            (value) =>
              (newArgs[VoxelFaceNameRecord[face]][
                BoxVoxelGometryInputs.ArgIndexes.Enabled
              ] = value)
          );
        }
        if (isArgString(faceData.flip)) {
          getInputObserver(String(faceData.flip!)).subscribe(
            (value) =>
              (newArgs[VoxelFaceNameRecord[face]][
                BoxVoxelGometryInputs.ArgIndexes.Fliped
              ] = value)
          );
        }
        if (isArgString(faceData.rotation)) {
          getInputObserver(String(faceData.rotation!)).subscribe(
            (value) =>
              (newArgs[VoxelFaceNameRecord[face]][
                BoxVoxelGometryInputs.ArgIndexes.Rotation
              ] = value)
          );
        }
        if (isArgString(faceData.uv)) {
          getInputObserver(String(faceData.uv!)).subscribe(
            (value) =>
              (newArgs[VoxelFaceNameRecord[face]][
                BoxVoxelGometryInputs.ArgIndexes.UVs
              ] = value)
          );
        }
        if (isArgString(faceData.texture)) {
          getInputObserver(String(faceData.texture!)).subscribe(
            (value) =>
              (newArgs[VoxelFaceNameRecord[face]][
                BoxVoxelGometryInputs.ArgIndexes.Texture
              ] = value)
          );
        }
      }
      args.push(newArgs);
    }
  }

  const finalGeoInputs = {
    cloneArgs() {
      return structuredClone(args);
    },
  } as Record<string, any> & { cloneArgs(): any[] };

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
