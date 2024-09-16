import { Vec3Array, Vector3Like } from "@amodx/math";
import { VoxelFaceNames } from "@divinevoxel/core/Math";

export class OcclusionQuad {
  offset: Vec3Array = [0, 0, 0];

  start = Vector3Like.Create();
  end = Vector3Like.Create();

  normal: Vec3Array;

  points: [Vec3Array, Vec3Array, Vec3Array, Vec3Array];

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

    Vector3Like.CopyFromArray(this.start, _start);
    Vector3Like.CopyFromArray(this.end, _end);

    this.points = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];

    this.updatePoints();

    switch (this.direction) {
      case "up":
        this.normal = [0, 1, 0];
        break;
      case "down":
        this.normal = [0, -1, 0];
        break;
      case "north":
        this.normal = [0, 0, 1];
        break;
      case "south":
        this.normal = [0, 0, -1];
        break;
      case "east":
        this.normal = [1, 0, 0];
        break;
      case "west":
        this.normal = [-1, 0, 0];
        break;
      default:
        this.normal = [0, 0, 0];
        break;
    }
  }

  setOffset(x: number, y: number, z: number) {
    this.offset[0] = x;
    this.offset[1] = y;
    this.offset[2] = z;
    this.start.x = this._start[0] + x;
    this.start.y = this._start[1] + y;
    this.start.z = this._start[2] + z;
    this.end.x = this._end[0] + x;
    this.end.y = this._end[1] + y;
    this.end.z = this._end[2] + z;
  }

  updatePoints() {
    const { start, end } = this;

    switch (this.direction) {
      case "up":
        this.points[0][0] = end.x;
        this.points[0][1] = end.y;
        this.points[0][2] = end.z;

        this.points[1][0] = start.x;
        this.points[1][1] = end.y;
        this.points[1][2] = end.z;

        this.points[2][0] = start.x;
        this.points[2][1] = end.y;
        this.points[2][2] = start.z;

        this.points[3][0] = end.x;
        this.points[3][1] = end.y;
        this.points[3][2] = start.z;
        break;

      case "down":
        this.points[0][0] = start.x;
        this.points[0][1] = start.y;
        this.points[0][2] = end.z;

        this.points[1][0] = end.x;
        this.points[1][1] = start.y;
        this.points[1][2] = end.z;

        this.points[2][0] = end.x;
        this.points[2][1] = start.y;
        this.points[2][2] = start.z;

        this.points[3][0] = start.x;
        this.points[3][1] = start.y;
        this.points[3][2] = start.z;
        break;

      case "north":
        this.points[0][0] = start.x;
        this.points[0][1] = end.y;
        this.points[0][2] = end.z;

        this.points[1][0] = end.x;
        this.points[1][1] = end.y;
        this.points[1][2] = end.z;

        this.points[2][0] = end.x;
        this.points[2][1] = start.y;
        this.points[2][2] = end.z;

        this.points[3][0] = start.x;
        this.points[3][1] = start.y;
        this.points[3][2] = end.z;
        break;

      case "south":
        this.points[0][0] = end.x;
        this.points[0][1] = end.y;
        this.points[0][2] = start.z;

        this.points[1][0] = start.x;
        this.points[1][1] = end.y;
        this.points[1][2] = start.z;

        this.points[2][0] = start.x;
        this.points[2][1] = start.y;
        this.points[2][2] = start.z;

        this.points[3][0] = end.x;
        this.points[3][1] = start.y;
        this.points[3][2] = start.z;
        break;

      case "east":
        this.points[0][0] = end.x;
        this.points[0][1] = end.y;
        this.points[0][2] = end.z;

        this.points[1][0] = end.x;
        this.points[1][1] = end.y;
        this.points[1][2] = start.z;

        this.points[2][0] = end.x;
        this.points[2][1] = start.y;
        this.points[2][2] = start.z;

        this.points[3][0] = end.x;
        this.points[3][1] = start.y;
        this.points[3][2] = end.z;
        break;

      case "west":
        this.points[0][0] = start.x;
        this.points[0][1] = end.y;
        this.points[0][2] = start.z;

        this.points[1][0] = start.x;
        this.points[1][1] = end.y;
        this.points[1][2] = end.z;

        this.points[2][0] = start.x;
        this.points[2][1] = start.y;
        this.points[2][2] = end.z;

        this.points[3][0] = start.x;
        this.points[3][1] = start.y;
        this.points[3][2] = start.z;
        break;

      default:
        break;
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
  planes: OcclusionQuad[] = [];
  offset: Vec3Array = [0, 0, 0];

  constructor() {}
  setOffset(x: number, y: number, z: number) {
    this.offset[0] = x;
    this.offset[1] = y;
    this.offset[2] = z;
    for (const plane of this.planes) {
      plane.setOffset(x, y, z);
      plane.updatePoints();
    }
  }

  addPlane(plane: OcclusionQuad) {
    this.planes[plane.faceCount] = plane;
  }
  clone() {
    const container = new OcclusionQuadContainer();

    for (const plane of this.planes) {
      container.planes[plane.faceCount] = plane.clone();
    }
    return container;
  }
}
