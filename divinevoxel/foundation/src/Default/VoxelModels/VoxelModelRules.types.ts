import { VoxelResultsIndexData } from "./Indexing/VoxelResultsIndex";
import { ShapeStateSchemaData, StateLogicStatement } from "./State/State.types";
import { VoxelGeometryNodes } from "./VoxelModel.types";

export interface VoxelGeometrySyncData {
  id: string;
  nodes: VoxelGeometryNodes[];
  faceCullMap: number[][];
  vertexHitMap: number[][];
  aoIndex: VoxelResultsIndexData;
  cullIndex: VoxelResultsIndexData;
}

export interface VoxelModelSyncData {
  id: string;
  schema: ShapeStateSchemaData[];
  geoLinkMap: number[];
  shapeStateDataOverrideTree: any[];
  shapeStateTree: any[];
  shapeStateMap: number[][];
  shapeStateGeometryMap: number[][];
  condiotnalStatements: StateLogicStatement[];
  condiotnalStateMap: number[][];
  //maps states to their local geometry links
  condiotnalShapeStateMap: number[][][];
  //maps states to their actual geometry ids
  condiotnalShapeStateGeometryMap: number[][][];
  condiotnalStateTree: any[];
}

export interface VoxelInputsSyncData {
  id: string;
  modelId: string;
  baseGeometryInputMap: any[][];
  condiotnalGeometryInputMap: any[][];
  shapeStateDataOverrideInputMap: any[][];
}

export interface ConstructorVoxelModelSyncData {
  geometryPalette: string[];
  geometry: VoxelGeometrySyncData[];
  models: VoxelModelSyncData[];
  voxels: VoxelInputsSyncData[];
}
