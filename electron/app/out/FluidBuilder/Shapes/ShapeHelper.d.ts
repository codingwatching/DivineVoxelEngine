import type { ShapeHelperInterface } from "Meta/Builder/Shapes/ShapeHelper.interface";
import type { Util } from "Global/Util.helper";
import { InfoByte } from "Global/Util/InfoByte";
import { LightByte } from "Global/Util/LightByte";
/**# Shape Helper
 * ---
 * A class that holds needed function shared betweeen different voxel shapes.
 */
export declare class ShapeHelper implements ShapeHelperInterface {
    util: Util;
    infoByte: InfoByte;
    lightByte: LightByte;
    constructor(util: Util);
    toLinearSpace(r: number, g: number, b: number, a: number): number[];
    lightMap: number[];
    calculateLightColor(RGBlightColors: number[], sunlightColors: number[], lightTemplate: Float32Array, startIndex: number): void;
    calculateSunightColor(sunLight: number[], sunLightTemplate: Int32Array, sunLightIndex: number): void;
    calculateAOColor(colors: number[], chunkAmbientOcculusion: Float32Array, startIndex: number): void;
}