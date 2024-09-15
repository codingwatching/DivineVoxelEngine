import { Vec3Array, Vector3Like } from "@amodx/math";
import {
  VoxelFaceNameArray,
  VoxelFaceNames,
  VoxelFacesArray,
} from "@divinevoxel/core/Math";

export class OcclusionQuad {
  offset: Vec3Array = [0, 0, 0];

  start: Vector3Like;
  end: Vector3Like;

  constructor(
    public parentId: string,
    public nodeId: number,
    public direction: VoxelFaceNames,
    public vertexCount: number,
    public faceCount: number,
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
      case "up":
        return [
          [end.x, end.y, end.z],
          [start.x, end.y, end.z],
          [start.x, end.y, start.z],
          [end.x, end.y, start.z],
        ];
      case "down":
        return [
          [start.x, start.y, end.z],
          [end.x, start.y, end.z],
          [end.x, start.y, start.z],
          [start.x, start.y, start.z],
        ];
      case "north":
        return [
          [start.x, end.y, end.z],
          [end.x, end.y, end.z],
          [end.x, start.y, end.z],
          [start.x, start.y, end.z],
        ];
      case "south":
        return [
          [end.x, end.y, start.z],
          [start.x, end.y, start.z],
          [start.x, start.y, start.z],
          [end.x, start.y, start.z],
        ];
      case "east":
        return [
          [end.x, end.y, end.z],
          [end.x, end.y, start.z],
          [end.x, start.y, start.z],
          [end.x, start.y, end.z],
        ];
      case "west":
        return [
          [start.x, end.y, start.z],
          [start.x, end.y, end.z],
          [start.x, start.y, end.z],
          [start.x, start.y, start.z],
        ];
      default:
        return [];
    }
  }
  clone() {
    return new OcclusionQuad(
      this.parentId,
      this.nodeId,
      this.direction,
      this.vertexCount,
      this.faceCount,
      [...this._start],
      [...this._end]
    );
  }

  isPointInBounds(point: Vec3Array): boolean {
    const [x, y, z] = point;

    switch (this.direction) {
      case "up":
      case "down":
        // For the up and down faces, check X and Z bounds since Y is constant
        return (
          x >= this.start.x &&
          x <= this.end.x &&
          z >= this.start.z &&
          z <= this.end.z
        );
      case "north":
      case "south":
        // For north and south faces, check X and Y bounds since Z is constant
        return (
          x >= this.start.x &&
          x <= this.end.x &&
          y >= this.start.y &&
          y <= this.end.y
        );
      case "east":
      case "west":
        // For east and west faces, check Y and Z bounds since X is constant
        return (
          y >= this.start.y &&
          y <= this.end.y &&
          z >= this.start.z &&
          z <= this.end.z
        );
      default:
        return false;
    }
  }
  
  // Get the normal vector for this quad based on its direction
   getNormal(): Vec3Array {
    switch (this.direction) {
      case "up":
        return [0, 1, 0];
      case "down":
        return [0, -1, 0];
      case "north":
        return [0, 0, 1];
      case "south":
        return [0, 0, -1];
      case "east":
        return [1, 0, 0];
      case "west":
        return [-1, 0, 0];
      default:
        return [0, 0, 0];
    }
  }
  doesCover(plane: OcclusionQuad): boolean {
    switch (this.direction) {
      case "up":
        if (plane.direction === "down" && this.start.y === plane.end.y) {
          return this.totallyCoversInXAndZ(plane);
        }
        break;
      case "down":
        if (plane.direction === "up" && this.end.y === plane.start.y) {
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

  private totallyCoversInXAndZ(plane: OcclusionQuad): boolean {
    return (
      this.start.x <= plane.start.x &&
      this.end.x >= plane.end.x &&
      this.start.z <= plane.start.z &&
      this.end.z >= plane.end.z
    );
  }

  private totallyCoversInXAndY(plane: OcclusionQuad): boolean {
    return (
      this.start.x <= plane.start.x &&
      this.end.x >= plane.end.x &&
      this.start.y <= plane.start.y &&
      this.end.y >= plane.end.y
    );
  }

  private totallyCoversInYAndZ(plane: OcclusionQuad): boolean {
    return (
      this.start.y <= plane.start.y &&
      this.end.y >= plane.end.y &&
      this.start.z <= plane.start.z &&
      this.end.z >= plane.end.z
    );
  }

  isPointOnPlane(x: number, y: number, z: number): boolean {
    switch (this.direction) {
      case "up":
      case "down":
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

export class OcclusionQuadContainer {
  planes = new Map<number, OcclusionQuad>();
  offset: Vec3Array = [0, 0, 0];

  constructor() {}
  setOffset(x: number, y: number, z: number) {
    this.offset[0] = x;
    this.offset[1] = y;
    this.offset[2] = z;
    for (const [index, plane] of this.planes) {
      plane.setOffset(x, y, z);
    }
  }

  addPlane(plane: OcclusionQuad) {
    this.planes.set(plane.faceCount, plane);
  }
  clone() {
    const container = new OcclusionQuadContainer();
    for (const [index, plane] of this.planes) {
      container.planes.set(index, plane.clone());
    }
    return container;
  }
}

export class OcclusionResults<T> {
  results = new Map<number, T>();

  constructor() {}

  setResult(faceIndex: number, value: T) {
    this.results.set(faceIndex, value);
  }
}
