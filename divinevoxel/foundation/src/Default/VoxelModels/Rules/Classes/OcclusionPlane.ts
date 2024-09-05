import { Vec3Array, Vector3Like } from "@amodx/math";
import { VoxelFaceNameArray, VoxelFaceNames } from "@divinevoxel/core/Math";

export class OcclusionPlane {
  offset: Vec3Array = [0, 0, 0];

  start: Vector3Like;
  end: Vector3Like;

  constructor(
    public direction: VoxelFaceNames,
    private _start: Vec3Array,
    private _end: Vec3Array
  ) {
    const self = this;
    this.start = {
      get x() {
        return _start[0] + self.offset[0];
      },
      set x(value: number) {},
      get y() {
        return _start[1] + self.offset[1];
      },
      set y(value: number) {},
      get z() {
        return _start[2] + self.offset[2];
      },
      set z(value: number) {},
    };
    this.end = {
      get x() {
        return _end[0] + self.offset[0];
      },
      set x(value: number) {},
      get y() {
        return _end[1] + self.offset[1];
      },
      set y(value: number) {},
      get z() {
        return _end[2] + self.offset[2];
      },
      set z(value: number) {},
    };
  }

  setOffset(x: number, y: number, z: number) {
    this.offset[0] = x;
    this.offset[1] = y;
    this.offset[2] = z;
  }

  getPoints(): Vec3Array[] {
    const { start, end } = this;
    switch (this.direction) {
      case "top":
      case "bottom":
        return [
          [start.x, start.y, start.z],
          [end.x, start.y, start.z],
          [end.x, start.y, end.z],
          [start.x, start.y, end.z],
        ];
      case "north":
      case "south":
        return [
          [start.x, start.y, start.z],
          [end.x, start.y, start.z],
          [end.x, end.y, start.z],
          [start.x, end.y, start.z],
        ];
      case "east":
      case "west":
        return [
          [start.x, start.y, start.z],
          [start.x, end.y, start.z],
          [start.x, end.y, end.z],
          [start.x, start.y, end.z],
        ];
      default:
        return [];
    }
  }
  clone() {
    return new OcclusionPlane(this.direction, [...this._start], [...this._end]);
  }

  doesCover(plane: OcclusionPlane): boolean {
    switch (this.direction) {
      case "top":
        if (plane.direction === "bottom" && this.start.y === plane.end.y) {
          return this.totallyCoversInXAndZ(plane);
        }
        break;
      case "bottom":
        if (plane.direction === "top" && this.end.y === plane.start.y) {
          return this.totallyCoversInXAndZ(plane);
        }
        break;
      case "north":
        if (plane.direction === "south" && this.end.z === plane.start.z) {
          return this.totallyCoversInXAndY(plane);
        }
        break;
      case "south":
        if (plane.direction === "north" && this.start.z === plane.end.z) {
          return this.totallyCoversInXAndY(plane);
        }
        break;
      case "east":
        if (plane.direction === "west" && this.start.x === plane.end.x) {
          return this.totallyCoversInYAndZ(plane);
        }
        break;
      case "west":
        if (plane.direction === "east" && this.end.x === plane.start.x) {
          return this.totallyCoversInYAndZ(plane);
        }
        break;
      default:
        return false;
    }
    return false;
  }

  private totallyCoversInXAndZ(plane: OcclusionPlane): boolean {
    return (
      this.start.x <= plane.start.x &&
      this.end.x >= plane.end.x &&
      this.start.z <= plane.start.z &&
      this.end.z >= plane.end.z
    );
  }

  private totallyCoversInXAndY(plane: OcclusionPlane): boolean {
    return (
      this.start.x <= plane.start.x &&
      this.end.x >= plane.end.x &&
      this.start.y <= plane.start.y &&
      this.end.y >= plane.end.y
    );
  }

  private totallyCoversInYAndZ(plane: OcclusionPlane): boolean {
    return (
      this.start.y <= plane.start.y &&
      this.end.y >= plane.end.y &&
      this.start.z <= plane.start.z &&
      this.end.z >= plane.end.z
    );
  }

  isPointOnPlane(x: number, y: number, z: number): boolean {
    switch (this.direction) {
      case "top":
      case "bottom":
        return (
          y === this.start.y &&
          x >= this.start.x &&
          x <= this.end.x &&
          z >= this.start.z &&
          z <= this.end.z
        );
      case "north":
      case "south":
        return (
          z === this.start.z &&
          x >= this.start.x &&
          x <= this.end.x &&
          y >= this.start.y &&
          y <= this.end.y
        );
      case "east":
      case "west":
        return (
          x === this.start.x &&
          y >= this.start.y &&
          y <= this.end.y &&
          z >= this.start.z &&
          z <= this.end.z
        );
      default:
        return false;
    }
  }
}

export class OcclusionPlaneContainer {
  planes: Record<VoxelFaceNames, OcclusionPlane[]> = {
    top: [],
    bottom: [],
    south: [],
    east: [],
    west: [],
    north: [],
  };
  offset: Vec3Array = [0, 0, 0];

  constructor() {}
  setOffset(x: number, y: number, z: number) {
    this.offset[0] = x;
    this.offset[1] = y;
    this.offset[2] = z;
    VoxelFaceNameArray.forEach((_) =>
      this.planes[_].forEach((_) => _.setOffset(x, y, z))
    );
  }

  addPlane(plane: OcclusionPlane) {
    this.planes[plane.direction].push(plane);
  }
  clone() {
    const container = new OcclusionPlaneContainer();
    VoxelFaceNameArray.forEach((_) => {
      container.planes[_] = this.planes[_].map((_) => _.clone());
    });
    return container;
  }
}

export class OcclusionPlaneResults<T> {
  planes: Record<VoxelFaceNames, T[]> = {
    top: [],
    bottom: [],
    south: [],
    east: [],
    west: [],
    north: [],
  };

  constructor() {}

  setResult(direction: VoxelFaceNames, index: number, value: T) {
    this.planes[direction][index] = value;
  }
}
