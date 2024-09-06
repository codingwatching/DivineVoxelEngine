import type { VoxelMesherDataTool } from "../../Tools/VoxelMesherDataTool.js";
import { LightData } from "../../../../Data/LightData.js";
import { QuadVerticies } from "@amodx/meshing/Geometry.types";
import {
  VoxelFaces,
  VoxelFaceDirections,
  VoxelFacesArray,
} from "@divinevoxel/core/Math";
import { Vector3Like } from "@amodx/math";
import { GradientCheckSets } from "../CalcConstants.js";
import { VoxelGeometryLookUp } from "../../../VoxelModels/Constructor/VoxelGeometryLookUp.js";

const GeometryValues: Record<
  VoxelFaces,
  Record<QuadVerticies, number[]>
> = [] as any;
for (const face of VoxelFacesArray) {
  GeometryValues[face] = [] as any;
  GeometryValues[face][QuadVerticies.TopRight] = [];
  GeometryValues[face][QuadVerticies.TopLeft] = [];
  GeometryValues[face][QuadVerticies.BottomLeft] = [];
  GeometryValues[face][QuadVerticies.BottomRight] = [];
}

/**
 * 
2       1
|    /  |
|   /   |
|  /    |
| /     |
3       4


 */

const newRGBValues = new Uint16Array([0, 0, 0, 0]);
const RGBValues = { r: 0, g: 0, b: 0 };
const sunValues = { s: 0 };
const nlValues = { s: 0, r: 0, g: 0, b: 0 };

const emptyArray: number[] = [];
export const FaceDataCalc = {
  settings: {
    doAO: true,
    doRGB: true,
    doSun: true,
  },
  aoOffset: Vector3Like.Create(),
  calculate(face: VoxelFaces, tool: VoxelMesherDataTool) {
    let light = tool.voxel.getLight();

    const faceNormal = VoxelFaceDirections[face];
    tool.nVoxel.loadInAt(
      tool.voxel.x + faceNormal[0],
      tool.voxel.y + faceNormal[1],
      tool.voxel.z + faceNormal[2]
    );

    light = tool.nVoxel.getLight();
    if (light < 0) {
      if (tool.voxel.getLight() >= 0) {
        light = tool.voxel.getLight();
      } else {
        light = 0;
      }
    }

    for (let vertex: QuadVerticies = <QuadVerticies>1; vertex <= 4; vertex++) {
      const checkSet = GradientCheckSets[face][vertex];

      if (this.settings.doRGB || this.settings.doSun) {
        const values = LightData.getLightValues(light);
        if (this.settings.doSun) {
          sunValues.s = values[0];
        }
        if (this.settings.doRGB) {
          RGBValues.r = values[1];
          RGBValues.g = values[2];
          RGBValues.b = values[3];
        }
      }

      let checkSetIndex = 0;
      for (let i = 0; i < 9; i += 3) {
        if (this.settings.doRGB || this.settings.doSun) {
          if (
            !tool.nVoxel.loadInAt(
              checkSet[i] + tool.voxel.x,
              checkSet[i + 1] + tool.voxel.y,
              checkSet[i + 2] + tool.voxel.z
            )
          )
            continue;

          const nl = tool.nVoxel.getLight();
          if (nl >= 0) {
            const values = LightData.getLightValues(nl);
            nlValues.s = values[0];
            nlValues.r = values[1];
            nlValues.g = values[2];
            nlValues.b = values[3];

            if (this.settings.doRGB) {
              if (LightData.removeS(nl)) {
                if (nlValues.r > RGBValues.r && RGBValues.r < 15) {
                  RGBValues.r = nlValues.r;
                }

                if (nlValues.g > RGBValues.g && RGBValues.g < 15) {
                  RGBValues.g = nlValues.g;
                }

                if (nlValues.b > RGBValues.b && RGBValues.b < 15) {
                  RGBValues.b = nlValues.b;
                }
              }
            }
            if (this.settings.doSun) {
              if (LightData.getS(nl)) {
                if (sunValues.s < nlValues.s && sunValues.s < 15) {
                  sunValues.s = nlValues.s;
                }
              }
            }
          }
        }
        /*
    Do AO
    */

        if (this.settings.doAO) {
          const geo = VoxelGeometryLookUp.getConstructorGeometry(
            tool.nVoxel.x,
            tool.nVoxel.y,
            tool.nVoxel.z
          );
          if (!geo) {
            tool.geometryData[face][vertex][checkSetIndex] = emptyArray;
          } else {
            tool.geometryData[face][vertex][checkSetIndex] = geo;
          }
        }
        checkSetIndex++;
      }


      if (this.settings.doSun || this.settings.doRGB) {
        newRGBValues[0] = sunValues.s;
        newRGBValues[1] = RGBValues.r;
        newRGBValues[2] = RGBValues.g;
        newRGBValues[3] = RGBValues.b;
        tool.lightData[face][vertex] = LightData.setLightValues(newRGBValues);
      }

    }
  },
};
