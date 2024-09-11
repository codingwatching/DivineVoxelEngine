import type { VoxelMesherDataTool } from "../../Tools/VoxelMesherDataTool.js";
import { LightData } from "../../../../Data/LightData.js";
import { QuadVerticies } from "@amodx/meshing/Geometry.types";
import { VoxelFaces, VoxelFaceDirections } from "@divinevoxel/core/Math";
import { GradientCheckSets, GradientCheckSetsArray } from "../CalcConstants.js";
import { VoxelGeometryLookUp } from "../../../VoxelModels/Constructor/VoxelGeometryLookUp.js";

type AllLight = [s: number, r: number, g: number, b: number];

const currentLightValues = new Uint16Array([0, 0, 0, 0]) as any as AllLight;
const loadedLightValues = new Uint16Array([0, 0, 0, 0]) as any as AllLight;
const faceLength = 9 * 4;
const emptyArray: number[] = [];
export const FaceDataCalc = {
  settings: {
    doAO: true,
    doLight: true,
  },
  calculate(face: VoxelFaces, tool: VoxelMesherDataTool) {
    let light = tool.voxel.getLight();

    const faceNormal = VoxelFaceDirections[face];
    tool.nVoxel.loadInAt(
      tool.voxel.x + faceNormal[0],
      tool.voxel.y + faceNormal[1],
      tool.voxel.z + faceNormal[2]
    );

    const otherLight = tool.nVoxel.getLight();
    light = otherLight >= 0 ? otherLight : light >= 0 ? light : 0;

    const baseIndex = face * faceLength;
    for (let vertex: QuadVerticies = <QuadVerticies>0; vertex < 4; vertex++) {
      const checkSetIndex = baseIndex + vertex * 9;
      //  const checkSet = GradientCheckSets[face][vertex];

      if (this.settings.doLight) {
        tool.lightData[face][vertex] = 0;
        LightData.getLightValuesToRef(light, currentLightValues);
      }

      let checkSetAOIndex = 0;
      for (let i = 0; i < 9; i += 3) {
        const didLoad = tool.nVoxel.loadInAt(
          GradientCheckSetsArray[checkSetIndex + i] + tool.voxel.x,
          GradientCheckSetsArray[checkSetIndex + i + 1] + tool.voxel.y,
          GradientCheckSetsArray[checkSetIndex + i + 2] + tool.voxel.z
        );

        /*   const didLoad = tool.nVoxel.loadInAt(
          checkSet[i] + tool.voxel.x,
          checkSet[i + 1] + tool.voxel.y,
          checkSet[i + 2] + tool.voxel.z
        ); */
        /*
      Do AO
      */
        if (this.settings.doAO) {
          const geo = VoxelGeometryLookUp.getConstructorGeometry(
            tool.nVoxel.x,
            tool.nVoxel.y,
            tool.nVoxel.z
          );
          tool.geometryData[face][vertex][checkSetAOIndex] = geo
            ? geo
            : emptyArray;
        }
        checkSetAOIndex++;

        if (!this.settings.doLight || !didLoad) continue;
        const nl = tool.nVoxel.getLight();
        if (nl <= 0) continue;
        /*
      Do Light
      */
        LightData.getLightValuesToRef(nl, loadedLightValues);

        currentLightValues[0] =
          currentLightValues[0] < loadedLightValues[0]
            ? loadedLightValues[0]
            : currentLightValues[0];

        currentLightValues[1] =
          currentLightValues[1] < loadedLightValues[1]
            ? loadedLightValues[1]
            : currentLightValues[1];

        currentLightValues[2] =
          currentLightValues[2] < loadedLightValues[2]
            ? loadedLightValues[2]
            : currentLightValues[2];

        currentLightValues[3] =
          currentLightValues[3] < loadedLightValues[3]
            ? loadedLightValues[3]
            : currentLightValues[3];
      }

      tool.lightData[face][vertex] =
        LightData.setLightValues(currentLightValues);
    }
  },
};
