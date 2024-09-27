import { VoxelAOResultsIndexData } from "./Indexing/VoxelAOResultsIndex";
import { VoxelFaceCullResultsIndexData } from "./Indexing/VoxelFaceCullResultsIndex";
import { VoxelFaceTransparentResultsIndexData } from "./Indexing/VoxelFaceTransparentResultsIndex";
import {
  VoxelModelStateSchemaData,
  StateLogicStatement,
} from "./State/State.types";
import { VoxelGeometryNodes } from "./VoxelModel.types";

export interface VoxelGeometrySyncData {
  id: string;
  nodes: VoxelGeometryNodes[];
  faceCullMap: number[][];
  vertexHitMap: number[][];
  aoIndex: VoxelAOResultsIndexData;
  cullIndex: VoxelFaceCullResultsIndexData;
}

export interface VoxelModelSyncData {
  id: string;
  schema: VoxelModelStateSchemaData[];
  geoLinkMap: number[];
  shapeStateTree: any[];
  shapeStateMap: number[][];
  shapeStateGeometryMap: number[][];
  //maps each shape state geometry nodes to their relative index
  shapeStateRelativeGeometryMap: number[][];
  //maps each shape state & condtional geometry relative ids to their starting byte index for the transparent index
  relativeGeometryByteIndexMap: number[];

  condiotnalStatements: StateLogicStatement[];
  condiotnalStateMap: number[][];
  //maps condiotnal states to their local geometry links
  condiotnalShapeStateMap: number[][][];
  //maps condiotnal states to their actual geometry ids
  condiotnalShapeStateGeometryMap: number[][][];
  //maps each condiotnal shape state geometry nodes to their relative index
  condiotnalShapeStateRelativeGeometryMap: number[][];
  condiotnalStateTree: any[];
}

export interface VoxelInputsSyncData {
  id: string;
  modelId: string;

  transparentFaceIndex: VoxelFaceTransparentResultsIndexData;
  modSchema: VoxelModelStateSchemaData[];
  modStateTree: any[];
  baseGeometryInputMap: any[][];
  condiotnalGeometryInputMap: any[][];
}

export interface ConstructorVoxelModelSyncData {
  geometryPalette: string[];
  geometry: VoxelGeometrySyncData[];
  models: VoxelModelSyncData[];
  voxels: VoxelInputsSyncData[];
}
