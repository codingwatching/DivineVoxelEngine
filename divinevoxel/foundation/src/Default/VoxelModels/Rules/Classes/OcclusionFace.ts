import { Vec3Array, Vector3Like } from "@amodx/math";
import { VoxelFaceNames } from "@divinevoxel/core/Math";

export abstract class OcclusionFace {
  public parentId: string;
  public nodeId: number;
  public vertexCount: number;
  public faceCount: number;
  points: Vec3Array[];
  normal: Vec3Array;
  offset: Vec3Array = [0, 0, 0];

  abstract setOffset(x: number, y: number, z: number): void;
  abstract updatePoints(): void;
  abstract clone(): OcclusionFace;
  abstract isPointInBounds(point: Vec3Array): boolean;
  abstract doesCoverFace(face: OcclusionFace): boolean;
}

export class OcclusionQuadFace extends OcclusionFace {
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
    super();
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
    return new OcclusionQuadFace(
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

  doesCoverFace(face: OcclusionFace): boolean {
    if (!(face instanceof OcclusionQuadFace)) return false;
    switch (this.direction) {
      case "up":
        if (face.direction === "down" && this.start.y === face.end.y) {
          return this.totallyCoversInXAndZ(face);
        }
        break;
      case "down":
        if (face.direction === "up" && this.end.y === face.start.y) {
          return this.totallyCoversInXAndZ(face);
        }
        break;
      case "north":
        if (face.direction === "south" && this.end.z === face.start.z) {
          return this.totallyCoversInXAndY(face);
        }
        break;
      case "south":
        if (face.direction === "north" && this.start.z === face.end.z) {
          return this.totallyCoversInXAndY(face);
        }
        break;
      case "east":
        if (face.direction === "west" && this.start.x === face.end.x) {
          return this.totallyCoversInYAndZ(face);
        }
        break;
      case "west":
        if (face.direction === "east" && this.end.x === face.start.x) {
          return this.totallyCoversInYAndZ(face);
        }
        break;
      default:
        return false;
    }
    return false;
  }

  private totallyCoversInXAndZ(plane: OcclusionQuadFace): boolean {
    return (
      this.start.x <= plane.start.x &&
      this.end.x >= plane.end.x &&
      this.start.z <= plane.start.z &&
      this.end.z >= plane.end.z
    );
  }

  private totallyCoversInXAndY(plane: OcclusionQuadFace): boolean {
    return (
      this.start.x <= plane.start.x &&
      this.end.x >= plane.end.x &&
      this.start.y <= plane.start.y &&
      this.end.y >= plane.end.y
    );
  }

  private totallyCoversInYAndZ(plane: OcclusionQuadFace): boolean {
    return (
      this.start.y <= plane.start.y &&
      this.end.y >= plane.end.y &&
      this.start.z <= plane.start.z &&
      this.end.z >= plane.end.z
    );
  }

  isPointOnFace(x: number, y: number, z: number): boolean {
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

export class OcclusionFaceContainer {
  faces: OcclusionFace[] = [];
  offset: Vec3Array = [0, 0, 0];

  constructor() {}
  setOffset(x: number, y: number, z: number) {
    this.offset[0] = x;
    this.offset[1] = y;
    this.offset[2] = z;
    for (const plane of this.faces) {
      plane.setOffset(x, y, z);
      plane.updatePoints();
    }
  }

  addFace(face: OcclusionFace) {
    this.faces[face.faceCount] = face;
  }
  clone() {
    const container = new OcclusionFaceContainer();

    for (const face of this.faces) {
      container.faces[face.faceCount] = face.clone();
    }
    return container;
  }
}
