import { Vec2Array, Vec3Array, Vec4Array } from "@amodx/math";
import { DirectionNames, RecursivePartial } from "@divinevoxel/core";


export interface VoxelShadeData {
  interpolate?: boolean;
  vector?: 1 | 2 | 3 | 4;
  direction?: DirectionNames;
  value?: number;
}
function parseStringToVoxelShadeData(str: string): VoxelShadeData {
  const voxelShadeData: VoxelShadeData = {};

  if (str.startsWith(":")) {
    // Interpolation
    voxelShadeData.interpolate = true;
    voxelShadeData.direction = str.slice(1) as DirectionNames;
    return voxelShadeData;
  }

  if (str.includes(".v")) {
    // Vector
    const [direction, vectorPart] = str.split(".v");
    voxelShadeData.direction = direction as DirectionNames;
    voxelShadeData.vector = parseInt(vectorPart, 10) as 1 | 2 | 3 | 4;
    return voxelShadeData;
  }

  // Numeric value
  voxelShadeData.value = parseInt(str, 10);
  return voxelShadeData;
}

{
  const light = [":south", ":south", "south.v3", "south.v4"];
  const ao = ["0", "0", ":south", ":south"];
}
{
  const light = ["south.v1", "south.v2", ":south", ":south"];
  const ao = ["0", "0", "2", "2"];
}

interface ShadedInterface {
  noShade?: boolean;
  lightShade?: (string | number)[];
  aoShade?: (string | number)[];
}

//box
export interface VoxelBoxGeometryNode {
  id: string;
  type: "box";
  noShade?: boolean;
  points: [start: Vec3Array, end: Vec3Array];
  rotation?: Vec3Array;
  faces: Partial<Record<DirectionNames, VoxelBoxFaceData>>;
}

export interface VoxelBoxFaceData extends ShadedInterface {
  texture: string;
  uv: [x1: number, y1: number, x2: number, y2: number] | string;
  rotation?: number | string;
}

//plane
export interface VoxelPlaneGeometryNode extends ShadedInterface {
  id: string;

  type: "plane";
  points: [start: Vec3Array, end: Vec3Array];
  direction: DirectionNames;
  doublueSided?: boolean;
  rotation?: Vec3Array;
  texture: string;
  uv: [p1: Vec2Array, p2: Vec2Array, p3: Vec2Array, p4: Vec2Array];
}

//triangle
export interface VoxelTriangleGeometryNode extends ShadedInterface {
  id: string;

  type: "triangle";
  points: [p1: Vec3Array, p2: Vec3Array, p3: Vec3Array];
  orientation?: 0 | 1;
  doublueSided?: boolean;
  rotation?: Vec3Array;
  texture: string;
  uv: [p1: Vec2Array, p2: Vec2Array, p3: Vec2Array];
}

//quad
export interface VoxelQuadGeometryNode extends ShadedInterface {
  id: string;

  type: "quad";
  orientation?: 0 | 1;
  doublueSided?: boolean;
  points: [p1: Vec3Array, p2: Vec3Array, p3: Vec3Array, p4: Vec3Array];
  rotation?: Vec3Array;
  texture: string;
  uv: [p1: Vec2Array, p2: Vec2Array, p3: Vec2Array, p4: Vec2Array];
}

//geometry
export interface VoxelRawGeometryGeometryNode extends ShadedInterface {
  id: string;
  type: "raw-geometry";
  positions: number[];
  normals: number[];
  indicies: number[];
  uvs: number[];
  texture: string;
}

//arguments
export interface VoxelGeometryTextureArgument {
  type: "texture";
}

export interface VoxelGeometryBoxUVArgument {
  type: "box-uv";
  defualt?: [x1: number, y1: number, x2: number, y2: number];
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

export interface VoxelConstructorRelationsConditionData {
  type: "same-voxel";
  direction: Vec3Array;
}

export interface VoxelConstructorRelationsSchemaData {
  name: string;
  conditions: VoxelConstructorRelationsConditionData[];
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
  stateSchema: VoxelConstructorBinarySchemaData[];
  relationsScehma: VoxelConstructorRelationsSchemaData[];
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
