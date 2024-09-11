import { VoxelConstructorsRegister } from "../../Mesher/Constructors/Voxel/VoxelConstructorsRegister";
import { DataTool } from "../../Tools/Data/DataTool";
import { VoxelModelVoxelConstructor } from "./VoxelModelVoxelConstructor";
import { Vec3Array, Vector3Like } from "@amodx/math";

const dup = new Map<number, Vec3Array>();
export class VoxelGeometryLookUp {
  static dataTool: DataTool;

  static stateCache: number[] = [];
  static geometryCache: number[][] = [];

  static offset: Vec3Array = [0, 0, 0];

  static init() {
    this.dataTool = new DataTool();
  }

  static start(dimension: string, x: number, y: number, z: number) {
    this.dataTool.setDimension(dimension);
    this.offset[0] = x;
    this.offset[1] = y;
    this.offset[2] = z;
  }

  static stop() {
    this.stateCache.length = 0;
    this.geometryCache.length = 0;
  }

  static getConstructorGeometry(x: number, y: number, z: number) {
    const hashed = Vector3Like.HashXYZ(
      x - this.offset[0],
      y - this.offset[1],
      z - this.offset[2]
    );
    if (this.geometryCache[hashed]) return this.geometryCache[hashed];
    this.getConstructorState(x, y, z);
    if (this.stateCache[hashed] == -1) return false;
    return this.geometryCache[hashed];
  }

  static getConstructorState(x: number, y: number, z: number) {
    const hashed = Vector3Like.HashXYZ(
      x - this.offset[0],
      y - this.offset[1],
      z - this.offset[2]
    );
    if (this.stateCache[hashed] !== undefined) return this.stateCache[hashed];

    if (!this.dataTool.loadInAt(x, y, z)) {
      this.stateCache[hashed] = -1;
      return -1;
    }
    if (!this.dataTool.isRenderable()) {
      this.stateCache[hashed] = -1;
      return -1;
    }

    const voxelConstructor = VoxelConstructorsRegister.constructorsPaltte[
      this.dataTool.getId()
    ] as VoxelModelVoxelConstructor;

    if (!voxelConstructor.isModel) {
      this.stateCache[hashed] = -1;
      return -1;
    }

    const state = voxelConstructor.getState(this.dataTool.getShapeState());
    this.stateCache[hashed] = state;

    if (this.geometryCache[hashed]) {
      console.error(x, y, z);
      throw new Error(`Duplicate hash!`);
    }

    this.geometryCache[hashed] =
      voxelConstructor.model.getShapeStateGeometry(state);

    return state;
  }
}
