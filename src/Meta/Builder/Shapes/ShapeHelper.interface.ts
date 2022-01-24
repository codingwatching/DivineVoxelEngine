import type { Util } from "Global/Util.helper";

export interface ShapeHelperInterface {
 util : Util;
 toLinearSpace(r: number, g: number, b: number, a: number): number[];
 calculateAOColor(
  colors: number[],
  chunkAmbientOcculusion: Float32Array,
  startIndex: number
 ): void;

 
 calculateRGBLightColor(
    fullColors: number[],
    fullColorTemplate: Float32Array,
    startIndex: number
   ): void;

   calculateSunightColor(
      sunLight: number[],
      sunLightTemplate: Int32Array,
      sunLightIndex: number
     ) : void;
}