import { PositionMatrix } from "Meta/Util.types";
import { ShapeHelperInterface } from "./ShapeHelper.interface";
/** # Voxel Shape Add DAta
---
* The chunk meshes positions
* @var positions
* The chunk mesh indices
* @var indices
* The chunk mesh full colors
* @var fullColors
* The chunk mesh linear space colors
* @var linearColors
* The chunk mesh uvs
* @var uvs
* ## Face
* The current face that is being added to the mesh.
* 0 -> top
* 1 -> bottom
* 2 -> west
* 3 -> east
* 4 -> north
* 5 -> south
* @var face
* The current indicie index of the mesh.
* @var indicieIndex: number;
* The calculated uv template.
* @var unTemplate: number[];
* The current index of the uv template
* @var uvTemplateIndex: number;
* The calcuated light values
* @var lightTemplate: number[];
* The current light template index.
* @var lightIndex: number[];
* The calculated AO values.
* @var  aoTemplate: number[];
* The current AO index.
* @var aoIndex: number[];
* The relative chunk position that the voxel is being added.
* @var position: PositionMatrix;
*/
export declare type VoxelShapeAddData = {
    positions: number[];
    indices: number[];
    RGBLightColors: number[];
    sunLightColors: number[];
    AOColors: number[];
    colors: number[];
    uvs: number[];
    face: number;
    indicieIndex: number;
    unTemplate: Uint16Array;
    uvTemplateIndex: number;
    colorTemplate: Float32Array;
    colorIndex: number;
    RGBLightTemplate: Float32Array;
    rgbLightIndex: number;
    sunLightTemplate: Int32Array;
    sunlightIndex: number;
    aoTemplate: Float32Array;
    aoIndex: number;
    position: PositionMatrix;
};
export declare type VoxelShapeAddReturnData = {
    newIndicieIndex: number;
    newUVTemplateIndex: number;
    newColorIndex: number;
    newRGBLightIndex: number;
    newSunLightIndex: number;
    newAOIndex: number;
};
/**# Voxel Shape
 * ---
 * Describes a basic voxel shape such as a box or half box.
 * Voxel shapes are used by the mesh bulder to generate the mush.
 * It checks with the voxel shape to build the proper mesh.
 */
export interface VoxelShapeInterface {
    id: string;
    shapeHelper: ShapeHelperInterface;
    /**# Add To Chunk Mesh
     * ---
     */
    addToChunkMesh(data: VoxelShapeAddData): VoxelShapeAddReturnData;
}