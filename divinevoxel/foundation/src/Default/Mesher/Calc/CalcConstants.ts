import { QuadVerticies } from "@amodx/meshing/Geometry.types";
import { VoxelFaces, VoxelFacesArray } from "@divinevoxel/core/Math";
import { VoxelGeometryAOIndex } from "../../VoxelModels/Indexing/VoxelGeometryAOIndex";
import { LightData } from "../../../Data/LightData";
import { Vec4Array, Vector2Like } from "@amodx/math";

export const GradientCheckSets: Record<
  VoxelFaces,
  Record<QuadVerticies, number[]>
> = [] as any;

/* 

GradientCheckSets[VoxelFaces.Up] = [] as any;
GradientCheckSets[VoxelFaces.Up][QuadVerticies.TopRight] = [
  1, 1, 0, 
  0, 1, 1, 
  1, 1, 1,
];
GradientCheckSets[VoxelFaces.Up][QuadVerticies.TopLeft] = [
  -1, 1, 0, 0, 1, 1, -1, 1, 1,
];
GradientCheckSets[VoxelFaces.Up][QuadVerticies.BottomLeft] = [
  -1, 1, 0, 0, 1, -1, -1, 1, -1,
];
GradientCheckSets[VoxelFaces.Up][QuadVerticies.BottomRight] = [
  1, 1, 0, 0, 1, -1, 1, 1, -1,
];

GradientCheckSets[VoxelFaces.Down] = [] as any;
GradientCheckSets[VoxelFaces.Down][QuadVerticies.TopRight] = [
  1, -1, 0, 
  0, -1, 1, 
  1, -1, 1,
];
GradientCheckSets[VoxelFaces.Down][QuadVerticies.TopLeft] = [
  -1, -1, 0, 0, -1, 1, -1, -1, 1,
];
GradientCheckSets[VoxelFaces.Down][QuadVerticies.BottomLeft] = [
  -1, -1, 0, 0, -1, -1, -1, -1, -1,
];
GradientCheckSets[VoxelFaces.Down][QuadVerticies.BottomRight] = [
  1, -1, 0, 0, -1, -1, 1, -1, -1,
];

GradientCheckSets[VoxelFaces.East] = [] as any;
GradientCheckSets[VoxelFaces.East][QuadVerticies.TopRight] = [
  1, 0, 1, 1, 1, 0, 1, 1, 1,
];
GradientCheckSets[VoxelFaces.East][QuadVerticies.TopLeft] = [
  1, 0, -1, 1, 1, 0, 1, 1, -1,
];
GradientCheckSets[VoxelFaces.East][QuadVerticies.BottomLeft] = [
  1, 0, -1, 1, -1, 0, 1, -1, -1,
];
GradientCheckSets[VoxelFaces.East][QuadVerticies.BottomRight] = [
  1, 0, 1, 1, -1, 0, 1, -1, 1,
];

GradientCheckSets[VoxelFaces.West] = [] as any;
GradientCheckSets[VoxelFaces.West][QuadVerticies.TopRight] = [
  -1, 0, 1, -1, 1, 0, -1, 1, 1,
];
GradientCheckSets[VoxelFaces.West][QuadVerticies.TopLeft] = [
  -1, 0, -1, -1, 1, 0, -1, 1, -1,
];
GradientCheckSets[VoxelFaces.West][QuadVerticies.BottomLeft] = [
  -1, 0, -1, -1, -1, 0, -1, -1, -1,
];
GradientCheckSets[VoxelFaces.West][QuadVerticies.BottomRight] = [
  -1, 0, 1, -1, -1, 0, -1, -1, 1,
];

GradientCheckSets[VoxelFaces.South] = [] as any;
GradientCheckSets[VoxelFaces.South][QuadVerticies.TopRight] = [
  1, 0, -1, 0, 1, -1, 1, 1, -1,
];
GradientCheckSets[VoxelFaces.South][QuadVerticies.TopLeft] = [
  -1, 0, -1, 0, 1, -1, -1, 1, -1,
];
GradientCheckSets[VoxelFaces.South][QuadVerticies.BottomLeft] = [
  -1, 0, -1, 0, -1, -1, -1, -1, -1,
];
GradientCheckSets[VoxelFaces.South][QuadVerticies.BottomRight] = [
  1, 0, -1, 0, -1, -1, 1, -1, -1,
];

GradientCheckSets[VoxelFaces.North] = [] as any;
GradientCheckSets[VoxelFaces.North][QuadVerticies.TopRight] = [
  1, 0, 1, 
  0, 1, 1, 
  1, 1, 1,
];
GradientCheckSets[VoxelFaces.North][QuadVerticies.TopLeft] = [
  -1, 0, 1, 0, 1, 1, -1, 1, 1,
];
GradientCheckSets[VoxelFaces.North][QuadVerticies.BottomLeft] = [
  -1, 0, 1, 0, -1, 1, -1, -1, 1,
];
GradientCheckSets[VoxelFaces.North][QuadVerticies.BottomRight] = [
  1, 0, 1, 0, -1, 1, 1, -1, 1,
]; 

*/

GradientCheckSets[VoxelFaces.Up] = [] as any;
GradientCheckSets[VoxelFaces.Up][QuadVerticies.TopRight] = [
  //1
  1, 1, 0,
  //2
  0, 1, 1,
  //3
  1, 1, 1,
];
GradientCheckSets[VoxelFaces.Up][QuadVerticies.TopLeft] = [
  //1
  -1, 1, 0,
  //2
  0, 1, 1,
  //3
  -1, 1, 1,
];
GradientCheckSets[VoxelFaces.Up][QuadVerticies.BottomLeft] = [
  //1
  -1, 1, 0,
  //2
  0, 1, -1,
  //3
  -1, 1, -1,
];
GradientCheckSets[VoxelFaces.Up][QuadVerticies.BottomRight] = [
  //1
  1, 1, 0,
  //2
  0, 1, -1,
  //3
  1, 1, -1,
];

GradientCheckSets[VoxelFaces.Down] = [] as any;
GradientCheckSets[VoxelFaces.Down][QuadVerticies.TopRight] = [
  //1
  -1, -1, 0,
  //2
  0, -1, 1,
  //3
  -1, -1, 1,
];
GradientCheckSets[VoxelFaces.Down][QuadVerticies.TopLeft] = [
  //1
  1, -1, 0,
  //2
  0, -1, 1,
  //3
  1, -1, 1,
];
GradientCheckSets[VoxelFaces.Down][QuadVerticies.BottomLeft] = [
  //1
  1, -1, 0,
  //2
  0, -1, -1,
  //3
  1, -1, -1,
];
GradientCheckSets[VoxelFaces.Down][QuadVerticies.BottomRight] = [
  //1
  -1, -1, 0,
  //2
  0, -1, -1,
  //3
  -1, -1, -1,
];

GradientCheckSets[VoxelFaces.East] = [] as any;
GradientCheckSets[VoxelFaces.East][QuadVerticies.TopRight] = [
  //1
  1, 0, 1,
  //2
  1, 1, 0,
  //3
  1, 1, 1,
];
GradientCheckSets[VoxelFaces.East][QuadVerticies.TopLeft] = [
  //1
  1, 0, -1,
  //2
  1, 1, 0,
  //3
  1, 1, -1,
];
GradientCheckSets[VoxelFaces.East][QuadVerticies.BottomLeft] = [
  //1
  1, 0, -1,
  //2
  1, -1, 0,
  //3
  1, -1, -1,
];
GradientCheckSets[VoxelFaces.East][QuadVerticies.BottomRight] = [
  //1
  1, 0, 1,
  //2
  1, -1, 0,
  //3
  1, -1, 1,
];

GradientCheckSets[VoxelFaces.West] = [] as any;
GradientCheckSets[VoxelFaces.West][QuadVerticies.TopRight] = [
  //1
  -1, 0, -1,
  //2
  -1, 1, 0,
  //3
  -1, 1, -1,
];
GradientCheckSets[VoxelFaces.West][QuadVerticies.TopLeft] = [
  //1
  -1, 0, 1,
  //2
  -1, 1, 0,
  //3
  -1, 1, 1,
];
GradientCheckSets[VoxelFaces.West][QuadVerticies.BottomLeft] = [
  //1
  -1, 0, 1,
  //2
  -1, -1, 0,
  //3
  -1, -1, 1,
];
GradientCheckSets[VoxelFaces.West][QuadVerticies.BottomRight] = [
  //1
  -1, 0, -1,
  //2
  -1, -1, 0,
  //3
  -1, -1, -1,
];

GradientCheckSets[VoxelFaces.South] = [] as any;
GradientCheckSets[VoxelFaces.South][QuadVerticies.TopRight] = [
  //1
  1, 0, -1,
  //2
  0, 1, -1,
  //3
  1, 1, -1,
];
GradientCheckSets[VoxelFaces.South][QuadVerticies.TopLeft] = [
  //1
  -1, 0, -1,
  //2
  0, 1, -1,
  //3
  -1, 1, -1,
];
GradientCheckSets[VoxelFaces.South][QuadVerticies.BottomLeft] = [
  //1
  -1, 0, -1,
  //2
  0, -1, -1,
  //3
  -1, -1, -1,
];
GradientCheckSets[VoxelFaces.South][QuadVerticies.BottomRight] = [
  //1
  1, 0, -1,
  //2
  0, -1, -1,
  //3
  1, -1, -1,
];

GradientCheckSets[VoxelFaces.North] = [] as any;
GradientCheckSets[VoxelFaces.North][QuadVerticies.TopRight] = [
  //1
  -1, 0, 1,
  //2
  0, 1, 1,
  //3
  -1, 1, 1,
];
GradientCheckSets[VoxelFaces.North][QuadVerticies.TopLeft] = [
  //1
  1, 0, 1,
  //2
  0, 1, 1,
  //3
  1, 1, 1,
];
GradientCheckSets[VoxelFaces.North][QuadVerticies.BottomLeft] = [
  //1
  1, 0, 1,
  //2
  0, -1, 1,
  //3
  1, -1, 1,
];
GradientCheckSets[VoxelFaces.North][QuadVerticies.BottomRight] = [
  //1
  -1, 0, 1,
  //2
  0, -1, 1,
  //3
  -1, -1, 1,
];

export const GradientCheckSetsArray = new Int8Array(6 * 4 * 9);
const verts: QuadVerticies[] = [
  QuadVerticies.TopRight,
  QuadVerticies.TopLeft,
  QuadVerticies.BottomLeft,
  QuadVerticies.BottomRight,
];

const faceLength = 9 * 4;
for (const face of VoxelFacesArray) {
  for (let v = 0; v < verts.length; v++) {
    for (let i = 0; i < 9; i++) {
      GradientCheckSetsArray[face * faceLength + verts[v] * 9 + i] =
        GradientCheckSets[face][verts[v]][i];
    }
  }
}

export const GeometryCheckSetIndexes: Record<
  VoxelFaces,
  Record<QuadVerticies, [number, number, number]>
> = [] as any;

for (const face of VoxelFacesArray) {
  GeometryCheckSetIndexes[face] ??= [] as any;
  for (let v = 0; v < verts.length; v++) {
    GeometryCheckSetIndexes[face][verts[v]] ??= [] as any;
    let checkSetIndex = 0;
    for (let i = 0; i < 9; i += 3) {
      const x = GradientCheckSets[face][verts[v]][i];
      const y = GradientCheckSets[face][verts[v]][i + 1];
      const z = GradientCheckSets[face][verts[v]][i + 2];

      GeometryCheckSetIndexes[face][verts[v]][checkSetIndex] =
        VoxelGeometryAOIndex.getIndex(x, y, z);
      checkSetIndex++;
    }
  }
}

function isMax3(num: number, v1: number, v2: number, v3: number) {
  return num > v1 && num > v2 && num > v3;
}
function isAllEqual(num: number, v1: number, v2: number, v3: number) {
  return num == v1 && v1 == v2 && v2 == v3;
}

/**
2       1
|    /  |
|   /   |
|  /    |
| /     |
3       4
*/
export function shouldCauseFlip(
  topRight: number,
  topLeft: number,
  bottomLeft: number,
  bottomRight: number
) {
  if (isAllEqual(topRight, topLeft, bottomRight, bottomLeft)) return false;
  const t1 = isMax3(bottomRight, topLeft, bottomLeft, topRight);
  const t2 = isMax3(topLeft, bottomLeft, bottomRight, topRight);
  if (t1 || t2) return false;
  const t3 = isMax3(topRight, topLeft, bottomLeft, bottomRight);
  const t4 = isMax3(bottomLeft, topLeft, bottomRight, topRight);
  if (t3 || t4) return true;
  const diagonal1 = (topRight + bottomLeft) / 2;
  const diagonal2 = (topLeft + bottomRight) / 2;
  return diagonal1 > diagonal2;
}

const area = (v: Vector2Like, w: Vector2Like, z: Vector2Like): number =>
  Math.abs((v.x * (w.y - z.y) + w.x * (z.y - v.y) + z.x * (v.y - w.y)) / 2);

const v3 = { x: 0, y: 0 };
const v2 = { x: 1, y: 0 };
const v1 = { x: 0, y: 1 };
const v0 = { x: 1, y: 1 };
function getInterpolationWeights(
  x: number,
  y: number,
  flip = false
): Vec4Array {
  x = Math.max(0, Math.min(1, x));
  y = Math.max(0, Math.min(1, y));

  let w1 = (1 - x) * (1 - y); // Weight for v1 = (0, 0)
  let w2 = x * (1 - y); // Weight for v2 = (1, 0)
  let w3 = x * y; // Weight for v3 = (1, 1)
  let w4 = (1 - x) * y; // Weight for v4 = (0, 1)

  return flip ? [w4, w3, w2, w1] : [w3, w4, w1, w2];
}

export function getVertexWeights(
  face: VoxelFaces,
  x: number,
  y: number,
  z: number
): Vec4Array {
  let flip = false;
  let u: number, v: number;
  switch (face) {
    case VoxelFaces.Up:
      u = x;
      v = z;
      break;
    case VoxelFaces.Down:
      u = x;
      v = z;
      flip = true;
      break;
    case VoxelFaces.North:
      u = x;
      v = z;
      break;
    case VoxelFaces.South:
      u = x;
      v = z;
      flip = true;
      break;
    case VoxelFaces.East:
      u = y;
      v = z;
      break;
    case VoxelFaces.West:
      u = y;
      v = z;
      flip = true;
      break;
  }

  return getInterpolationWeights(u, v, flip);
}

export function getInterpolationValue(value: Vec4Array, weights: Vec4Array) {
  return (
    weights[0] * value[0] +
    weights[1] * value[1] +
    weights[2] * value[2] +
    weights[3] * value[3]
  );
}

/* const t = {
  [VoxelFaces.Up]: {
    [QuadVerticies.TopRight]: [1, 1, 0, 0, 1, 1, 1, 1, 1],
    [QuadVerticies.TopLeft]: [-1, 1, 0, 0, 1, 1, -1, 1, 1],
    [QuadVerticies.BottomLeft]: [-1, 1, 0, 0, 1, -1, -1, 1, -1],
    [QuadVerticies.BottomRight]: [1, 1, 0, 0, 1, -1, 1, 1, -1],
  },
  [VoxelFaces.Down]: {
    [QuadVerticies.TopRight]: [1, -1, 0, 0, -1, 1, 1, -1, 1],
    [QuadVerticies.TopLeft]: [-1, -1, 0, 0, -1, 1, -1, -1, 1],
    [QuadVerticies.BottomLeft]: [-1, -1, 0, 0, -1, -1, -1, -1, -1],
    [QuadVerticies.BottomRight]: [1, -1, 0, 0, -1, -1, 1, -1, -1],
  },
  [VoxelFaces.East]: {
    [QuadVerticies.TopRight]: [1, 0, 1, 1, 1, 0, 1, 1, 1],
    [QuadVerticies.TopLeft]: [1, 0, -1, 1, 1, 0, 1, 1, -1],
    [QuadVerticies.BottomLeft]: [1, 0, -1, 1, -1, 0, 1, -1, -1],
    [QuadVerticies.BottomRight]: [1, 0, 1, 1, -1, 0, 1, -1, 1],
  },
  [VoxelFaces.West]: {
    [QuadVerticies.TopRight]: [-1, 0, 1, -1, 1, 0, -1, 1, 1],
    [QuadVerticies.TopLeft]: [-1, 0, -1, -1, 1, 0, -1, 1, -1],
    [QuadVerticies.BottomLeft]: [-1, 0, -1, -1, -1, 0, -1, -1, -1],
    [QuadVerticies.BottomRight]: [-1, 0, 1, -1, -1, 0, -1, -1, 1],
  },
  [VoxelFaces.South]: {
    [QuadVerticies.TopRight]: [1, 0, -1, 0, 1, -1, 1, 1, -1],
    [QuadVerticies.TopLeft]: [-1, 0, -1, 0, 1, -1, -1, 1, -1],
    [QuadVerticies.BottomLeft]: [-1, 0, -1, 0, -1, -1, -1, -1, -1],
    [QuadVerticies.BottomRight]: [1, 0, -1, 0, -1, -1, 1, -1, -1],
  },
  [VoxelFaces.North]: {
    [QuadVerticies.TopRight]: [1, 0, 1, 0, 1, 1, 1, 1, 1],
    [QuadVerticies.TopLeft]: [-1, 0, 1, 0, 1, 1, -1, 1, 1],
    [QuadVerticies.BottomLeft]: [-1, 0, 1, 0, -1, 1, -1, -1, 1],
    [QuadVerticies.BottomRight]: [1, 0, 1, 0, -1, 1, 1, -1, 1],
  },
};
 */
