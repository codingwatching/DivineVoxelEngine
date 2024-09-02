import { Vec3Array, Vector3Like } from "@amodx/math";
import { DirectionNames } from "@divinevoxel/core";

export class OcclusionPlane {
  constructor(
    public direction: DirectionNames,
    public start: Vec3Array,
    public end: Vec3Array
  ) {}

  doesCover(plane: OcclusionPlane): boolean {
    switch (this.direction) {
      case "top":
        if (plane.direction === "bottom" && this.start[1] === plane.end[1]) {
          return this.isOverlappingInXAndZ(plane);
        }
        break;
      case "bottom":
        if (plane.direction === "top" && this.end[1] === plane.start[1]) {
          return this.isOverlappingInXAndZ(plane);
        }
        break;
      case "north":
        if (plane.direction === "south" && this.end[2] === plane.start[2]) {
          return this.isOverlappingInXAndY(plane);
        }
        break;
      case "south":
        if (plane.direction === "north" && this.start[2] === plane.end[2]) {
          return this.isOverlappingInXAndY(plane);
        }
        break;
      case "east":
        if (plane.direction === "west" && this.start[0] === plane.end[0]) {
          return this.isOverlappingInYAndZ(plane);
        }
        break;
      case "west":
        if (plane.direction === "east" && this.end[0] === plane.start[0]) {
          return this.isOverlappingInYAndZ(plane);
        }
        break;
      default:
        return false;
    }

    return false;
  }

  private isOverlappingInXAndZ(plane: OcclusionPlane): boolean {
    return (
      this.start[0] <= plane.end[0] &&
      this.end[0] >= plane.start[0] && // Check overlap in x
      this.start[2] <= plane.end[2] &&
      this.end[2] >= plane.start[2] // Check overlap in z
    );
  }

  private isOverlappingInXAndY(plane: OcclusionPlane): boolean {
    return (
      this.start[0] <= plane.end[0] &&
      this.end[0] >= plane.start[0] && // Check overlap in x
      this.start[1] <= plane.end[1] &&
      this.end[1] >= plane.start[1] // Check overlap in y
    );
  }

  private isOverlappingInYAndZ(plane: OcclusionPlane): boolean {
    return (
      this.start[1] <= plane.end[1] &&
      this.end[1] >= plane.start[1] && // Check overlap in y
      this.start[2] <= plane.end[2] &&
      this.end[2] >= plane.start[2] // Check overlap in z
    );
  }
}

export class OcclusionPlaneContainer {
  planes: Record<DirectionNames, OcclusionPlane[]> = {
    top: [],
    bottom: [],
    south: [],
    east: [],
    west: [],
    north: [],
  };

  constructor() {}

  addPlane(plane: OcclusionPlane) {
    this.planes[plane.direction].push(plane);
  }
}

export class OcclusionPlaneResults {
  planes: Record<DirectionNames, boolean[]> = {
    top: [],
    bottom: [],
    south: [],
    east: [],
    west: [],
    north: [],
  };

  constructor() {}

  setRule(direction: DirectionNames, index: number, value: boolean) {
    this.planes[direction][index] = value;
  }
}