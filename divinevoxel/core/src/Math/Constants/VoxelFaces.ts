import { CompassDirections, Vec3Array } from "@amodx/math";

export type VoxelFaceNames =
  | "top"
  | "bottom"
  | "north"
  | "south"
  | "east"
  | "west";

export const VoxelFaceNameArray: VoxelFaceNames[] = [
  "top",
  "bottom",
  "north",
  "south",
  "east",
  "west",
];

export const VoxelFaceNameOppoisteRecord: Record<
  VoxelFaceNames,
  VoxelFaceNames
> = {
  top: "bottom",
  bottom: "top",
  north: "south",
  south: "north",
  east: "west",
  west: "east",
};

export const VoxelFaceNameDirectionsRecord: Record<VoxelFaceNames, Vec3Array> =
  {
    top: [0, 1, 0],
    bottom: [0, -1, 0],
    north: [0, 0, 1],
    south: [0, 0, -1],
    east: [1, 0, 0],
    west: [-1, 0, 0],
  };
export enum VoxelFaces {
  Top,
  Bottom,
  North,
  South,
  East,
  West,
}

export const VoxelFacesArray = Object.freeze([
  VoxelFaces.Top,
  VoxelFaces.Bottom,
  VoxelFaces.North,
  VoxelFaces.South,
  VoxelFaces.East,
  VoxelFaces.West,
]);

export const VoxelFaceDirections: Readonly<Record<VoxelFaces, Vec3Array>> =
  Object.freeze({
    [VoxelFaces.Top]: [0, 1, 0],
    [VoxelFaces.Bottom]: [0, -1, 0],
    [VoxelFaces.North]: [0, 0, 1],
    [VoxelFaces.South]: [0, 0, -1],
    [VoxelFaces.East]: [1, 0, 0],
    [VoxelFaces.West]: [-1, 0, 0],
  });

export const VoxelFaceOpositeDirectionMap: Record<VoxelFaces, VoxelFaces> = {
  [VoxelFaces.Top]: VoxelFaces.Bottom,
  [VoxelFaces.Bottom]: VoxelFaces.Top,
  [VoxelFaces.North]: VoxelFaces.South,
  [VoxelFaces.South]: VoxelFaces.North,
  [VoxelFaces.East]: VoxelFaces.West,
  [VoxelFaces.West]: VoxelFaces.East,
};

export const VoxelFaceCompassDirectionMap: Record<
  VoxelFaces,
  CompassDirections
> = {
  [VoxelFaces.Top]: CompassDirections.North,
  [VoxelFaces.Bottom]: CompassDirections.South,
  [VoxelFaces.North]: CompassDirections.North,
  [VoxelFaces.South]: CompassDirections.South,
  [VoxelFaces.East]: CompassDirections.East,
  [VoxelFaces.West]: CompassDirections.West,
};

export const CompassDirectionVoxelFaceMap: Record<
  CompassDirections,
  VoxelFaces
> = {
  [CompassDirections.North]: VoxelFaces.North,
  [CompassDirections.South]: VoxelFaces.South,
  [CompassDirections.West]: VoxelFaces.West,
  [CompassDirections.East]: VoxelFaces.East,
  [CompassDirections.NorthEast]: VoxelFaces.Top,
  [CompassDirections.NorthWest]: VoxelFaces.Top,
  [CompassDirections.SouthEast]: VoxelFaces.Top,
  [CompassDirections.SouthWest]: VoxelFaces.Top,
};

export const VoxelFaceNameRecord: Record<VoxelFaceNames, VoxelFaces> = {
  top: VoxelFaces.Top,
  bottom: VoxelFaces.Bottom,
  north: VoxelFaces.North,
  south: VoxelFaces.South,
  east: VoxelFaces.East,
  west: VoxelFaces.West,
};
export const VoxelFaceNameMap: Record<VoxelFaces, VoxelFaceNames> = {
  [VoxelFaces.Top]: "top",
  [VoxelFaces.Bottom]: "bottom",
  [VoxelFaces.North]: "north",
  [VoxelFaces.South]: "south",
  [VoxelFaces.East]: "east",
  [VoxelFaces.West]: "west",
};
