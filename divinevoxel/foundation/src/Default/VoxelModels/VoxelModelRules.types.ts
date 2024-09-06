import { VoxelGeometryAOIndexData } from "./Indexing/VoxelGeometryAOIndex";
import { VoxelGeometryCulledIndexData } from "./Indexing/VoxelGeometryCulledIndex";
import {  ShapeStateSchemaData } from "./State/State.types";
import { VoxelGeometryNodes } from "./VoxelModel.types";

export interface VoxelGeometrySyncData {
  id: string;
  nodes: VoxelGeometryNodes[];
  indexes: {
    ao: VoxelGeometryAOIndexData;
    culling: VoxelGeometryCulledIndexData;
  };
}

export interface VoxelModelSyncData {
  id: string;
  schema: (ShapeStateSchemaData)[];
  geoLinkMap: number[];
  shapeStateTree: any[];
  shapeStateMap: number[][];
  shapeStateGeometryMap: number[][];
}

export interface VoxelInputsSyncData {
  id: string;
  modelId: string;
  voxelInputMap: any[][];
}

export interface ConstructorVoxelModelSyncData {
  geometryPalette: string[];
  geometry: VoxelGeometrySyncData[];
  models: VoxelModelSyncData[];
  voxels: VoxelInputsSyncData[];
}
