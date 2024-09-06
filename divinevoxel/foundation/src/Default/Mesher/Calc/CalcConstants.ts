import { QuadVerticies } from "@amodx/meshing/Geometry.types";
import { VoxelFaces, VoxelFacesArray } from "@divinevoxel/core/Math";
import { VoxelGeometryAOIndex } from "../../VoxelModels/Indexing/VoxelGeometryAOIndex";

export const GradientCheckSets: Record<
  VoxelFaces,
  Record<QuadVerticies, number[]>
> = [] as any;

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

export const GeometryCheckSetIndexes: Record<
  VoxelFaces,
  Record<QuadVerticies, [number, number, number]>
> = [] as any;

const verts: QuadVerticies[] = [
  QuadVerticies.TopRight,
  QuadVerticies.TopLeft,
  QuadVerticies.BottomLeft,
  QuadVerticies.BottomRight,
];
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

console.warn(GeometryCheckSetIndexes);

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
