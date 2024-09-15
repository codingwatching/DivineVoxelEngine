import { Vec2Array, Vec3Array } from "@amodx/math";
import { VoxelFaceNames } from "@divinevoxel/core/Math";

export interface VoxelShadeData {
  interpolate?: boolean;
  vector?: 1 | 2 | 3 | 4;
  direction?: VoxelFaceNames;
  value?: number;
}

interface ShadedInterface {
  noShade?: boolean;
  lightShade?: (string | number)[];
  aoShade?: (string | number)[];
}

export interface VoxelModelConstructorData {
  id: string;
  inputs: Record<string, any>;
}

//box
export interface VoxelBoxGeometryNode {
  type: "box";
  noShade?: boolean;
  points: [start: Vec3Array, end: Vec3Array];
  rotation?: Vec3Array;
  faces: Record<VoxelFaceNames, VoxelBoxFaceData>;
}

export interface VoxelBoxFaceData extends ShadedInterface {
  enabled?: boolean;
  flip?: boolean;
  texture: string;
  uv: [x1: number, y1: number, x2: number, y2: number] | string;
  rotation?: number | string;
}

//plane
export interface VoxelPlaneGeometryNode extends ShadedInterface {
  type: "plane";
  points: [start: Vec3Array, end: Vec3Array];
  direction: VoxelFaceNames;
  doubleSided?: boolean;
  rotation?: Vec3Array;
  texture: string;
  uv: [p1: Vec2Array, p2: Vec2Array, p3: Vec2Array, p4: Vec2Array];
}

//triangle
export interface VoxelTriangleGeometryNode extends ShadedInterface {
  type: "triangle";
  points: [p1: Vec3Array, p2: Vec3Array, p3: Vec3Array];
  orientation?: 0 | 1;
  doubleSided?: boolean;
  rotation?: Vec3Array;
  texture: string;
  uv: [p1: Vec2Array, p2: Vec2Array, p3: Vec2Array];
}

//quad
export interface VoxelQuadGeometryNode extends ShadedInterface {
  type: "quad";
  orientation?: 0 | 1;
  doubleSided?: boolean;
  points: [p1: Vec3Array, p2: Vec3Array, p3: Vec3Array, p4: Vec3Array];
  rotation?: Vec3Array;
  texture: string;
  uv: [p1: Vec2Array, p2: Vec2Array, p3: Vec2Array, p4: Vec2Array];
}

//geometry
export interface VoxelRawGeometryGeometryNode extends ShadedInterface {
  type: "raw-geometry";
  positions: number[];
  normals: number[];
  indices: number[];
  uvs: number[];
  texture: string;
}

//arguments
export interface VoxelGeometryTextureArgument {
  type: "texture";
}

export interface VoxelGeometryBoxUVArgument {
  type: "box-uv";
  default?: [x1: number, y1: number, x2: number, y2: number];
}

export interface VoxelGeometryVector3Argument {
  type: "vector3";
  default?: Vec3Array;
  min?: Vec3Array;
  max?: Vec3Array;
}

export interface VoxelConstructorBinarySchemaData {
  name: string;
  values: Record<number, string>;
}

export interface SameVoxelRelationsConditionData {
  type: "same-voxel";
  direction: Vec3Array;
}

export interface AnyVoxelRelationsConditionData {
  type: "any-voxel";
  direction: Vec3Array;
}

export type VoxelModelRelationsConditionData =
  | SameVoxelRelationsConditionData
  | AnyVoxelRelationsConditionData;

export interface VoxelModelRelationsSchemaData {
  name: string;
  conditions: VoxelModelRelationsConditionData[];
}

export type VoxelGeometryNodes =
  | VoxelBoxGeometryNode
  | VoxelPlaneGeometryNode
  | VoxelTriangleGeometryNode
  | VoxelQuadGeometryNode
  | VoxelRawGeometryGeometryNode;

export interface VoxelGeometryData {
  id: string;
  nodes: VoxelGeometryNodes[];
  arguments: Record<
    string,
    | VoxelGeometryTextureArgument
    | VoxelGeometryBoxUVArgument
    | VoxelGeometryVector3Argument
  >;
}

export interface VoxelGeometryBaseLinkData {
  inputs: Record<string, any>;
  scale?: Vec3Array;
  position?: Vec3Array;
  rotation?: Vec3Array;
}

export interface VoxelGeometryLinkData extends VoxelGeometryBaseLinkData {
  id: string;
  geometryId: string;
}

export interface VoxelModelData {
  id: string;
  arguments: Record<
    string,
    | VoxelGeometryTextureArgument
    | VoxelGeometryBoxUVArgument
    | VoxelGeometryVector3Argument
  >;
  shapeStateSchema: VoxelConstructorBinarySchemaData[];
  relationsSchema: VoxelModelRelationsSchemaData[];
  shapeStatesOverrides: Record<
    string,
    {
      id: string;
      willChangeGeometry?: boolean;
      data: VoxelGeometryBaseLinkData;
    }[]
  >;
  shapeStatesNodes: Record<string, VoxelGeometryLinkData[]>;
  shapeStatesConditonalNodes: Record<string, VoxelGeometryLinkData[]>;
}
