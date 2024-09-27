import { Vec2Array, Vec3Array } from "@amodx/math";
import { VoxelFaceNames } from "@divinevoxel/core/Math";

export interface VoxelModelConstructorData {
  id: string;
  modRelationSchema?: VoxelModelRelationsSchemaData[];
  modSchema?: VoxelBinaryStringSchemaData[];
  inputs: Record<string, Record<string, any>>;
}

//box
export interface VoxelBoxGeometryNode {
  type: "box";
  noShade?: boolean;
  points: [start: Vec3Array, end: Vec3Array];
  rotation?: Vec3Array;
  faces: Record<VoxelFaceNames, VoxelBoxFaceData>;
}

export interface VoxelBoxFaceData {
  enabled?: boolean;
  flip?: boolean;
  texture: string;
  transparent?: boolean | string;
  uv: [x1: number, y1: number, x2: number, y2: number] | string;
  rotation?: number | string;
}

//plane
export interface VoxelPlaneGeometryNode {
  type: "plane";
  points: [start: Vec3Array, end: Vec3Array];
  direction: VoxelFaceNames;
  doubleSided?: boolean;
  rotation?: Vec3Array;
  texture: string;
  uv: [p1: Vec2Array, p2: Vec2Array, p3: Vec2Array, p4: Vec2Array];
}

//triangle
export interface VoxelTriangleGeometryNode {
  type: "triangle";
  points: [p1: Vec3Array, p2: Vec3Array, p3: Vec3Array];
  orientation?: 0 | 1;
  doubleSided?: boolean;
  rotation?: Vec3Array;
  texture: string;
  uv: [p1: Vec2Array, p2: Vec2Array, p3: Vec2Array];
}

//quad
export interface VoxelQuadGeometryNode {
  type: "quad";
  orientation?: 0 | 1;
  doubleSided?: boolean;
  points: [p1: Vec3Array, p2: Vec3Array, p3: Vec3Array, p4: Vec3Array];
  rotation?: Vec3Array;
  texture: string;
  uv: [p1: Vec2Array, p2: Vec2Array, p3: Vec2Array, p4: Vec2Array];
}

//geometry
export interface VoxelRawGeometryGeometryNode {
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
export interface VoxelGeometryBooleanArgument {
  type: "boolean";
  default: boolean;
}
export interface VoxelGeometryIntArgument {
  type: "int";
  default: number;
}
export interface VoxelGeometryFloatArgument {
  type: "float";
  default: number;
}
export interface VoxelGeometryBoxUVArgument {
  type: "box-uv";
  default: [x1: number, y1: number, x2: number, y2: number];
}

export interface VoxelGeometryVector3Argument {
  type: "vector3";
  default?: Vec3Array;
  min?: Vec3Array;
  max?: Vec3Array;
}

export interface VoxelBinaryStringSchemaData {
  name: string;
  type: "string";
  values: Record<number, string>;
}
export interface VoxelBinaryNumberSchemaData {
  name: string;
  type: "number";
  maxValue: number;
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
    | VoxelGeometryIntArgument
    | VoxelGeometryBooleanArgument
    | VoxelGeometryFloatArgument
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
    | VoxelGeometryIntArgument
    | VoxelGeometryBooleanArgument
    | VoxelGeometryFloatArgument
  >;
  shapeStateSchema: (
    | VoxelBinaryStringSchemaData
    | VoxelBinaryNumberSchemaData
  )[];
  relationsSchema: VoxelModelRelationsSchemaData[];
  shapeStatesNodes: Record<string, VoxelGeometryLinkData[]>;
  shapeStatesConditonalNodes: Record<string, VoxelGeometryLinkData[]>;
}
