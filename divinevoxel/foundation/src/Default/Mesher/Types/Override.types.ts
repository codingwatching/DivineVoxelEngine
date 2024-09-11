import { BuilderDataTool } from "../Tools/BuilderDataTool";
import { VoxelFaces } from "@divinevoxel/core/Math";

export type FaceDataOverride = {
 face: VoxelFaces;
 default: boolean;
 currentVoxel: BuilderDataTool;
 neighborVoxel: BuilderDataTool;
};

