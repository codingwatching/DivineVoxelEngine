//types
import type { DivineVoxelEngineConstructor } from "../../../out/Constructor/DivineVoxelEngineConstructor.js";
//voxels
import { DebugBoxVoxelBuilderThread } from "../Voxels/Solid/DebugBox/DebugBox.voxel.builder.js";
import { DreamGrassBlockVoxelBuilderThread } from "../Voxels/Solid/DreamGrass/DreamGrassBlock.voxel.builder.js";
import { DreamStoneVoxelBuilderThread } from "../Voxels/Solid/DreamStone/DreamStone.voxel.builder.js";
import { DreamStonePillarVoxelBuilderThread } from "../Voxels/Solid/DreamStonePillar/DreamStonePillar.voxel.builder.js";
import { DreamLampVoxelBuilderThread } from "../Voxels/Solid/DreamLamp/DreamLamp.voxel.builder.js";
import { LightDebugBoxVoxelBuilderThread } from "../Voxels/Solid/LightDebugBox/LightDebugBox.voxel.builder.js";
import { LiquidDreamEtherVoxelBuilderThread } from "../Voxels/Fluid/LiquidDreamEther/LiquidDreamEther.voxel.builder.js";
import { DreamGrassVoxelBuilderThread } from "../Voxels/Flora/DreamGrass/DreamGrass.voxel.builder.js";
import { DreamStoneSlabVoxelBuilderThread } from "../Voxels/Solid/DreamStoneSlab/DreamStoneSlab.voxel.builder.js";


export function RegisterVoxelsForConstructor(DVEC: DivineVoxelEngineConstructor) {
 //solid
 DVEC.voxelManager.registerVoxel(DebugBoxVoxelBuilderThread);
 DVEC.voxelManager.registerVoxel(DreamGrassBlockVoxelBuilderThread);
 DVEC.voxelManager.registerVoxel(DreamStonePillarVoxelBuilderThread);
 DVEC.voxelManager.registerVoxel(DreamStoneVoxelBuilderThread);
 DVEC.voxelManager.registerVoxel(LightDebugBoxVoxelBuilderThread);
 DVEC.voxelManager.registerVoxel(DreamLampVoxelBuilderThread);
 DVEC.voxelManager.registerVoxel(DreamStoneSlabVoxelBuilderThread);
 //flora
 DVEC.voxelManager.registerVoxel(DreamGrassVoxelBuilderThread);
 //fluid
 DVEC.voxelManager.registerVoxel(LiquidDreamEtherVoxelBuilderThread);
}