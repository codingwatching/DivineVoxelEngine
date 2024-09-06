import { VoxelConstructorsRegister } from "../../Mesher/Constructors/Voxel/VoxelConstructorsRegister";
import { DataTool } from "../../Tools/Data/DataTool";
import { VoxelModelVoxelConstructor } from "./VoxelModelVoxelConstructor";
import { Vec3Array, Vector3Like } from "@amodx/math";

const dup = new Map<number, Vec3Array>();
export class VoxelGeometryLookUp {
  static dataTool: DataTool;

  static stateCache: number[] = [];
  static geometryCache: number[][] = [];

  static init() {
    this.dataTool = new DataTool();
  }

  static start(dimension: string) {
    this.dataTool.setDimension(dimension);
  }

  static stop() {
    this.stateCache.length = 0;
    this.geometryCache.length = 0;
  }

  static getConstructorGeometry(x: number, y: number, z: number) {
    const hashed = Vector3Like.HashXYZ(x, y, z);
    if (this.geometryCache[hashed]) return this.geometryCache[hashed];
    this.getConstructorState(x, y, z);
    if (this.stateCache[hashed] == -1) return false;
    return this.geometryCache[hashed];
  }

  static getConstructorState(x: number, y: number, z: number) {
    const hashed = Vector3Like.HashXYZ(x, y, z);
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

    this.geometryCache[hashed] =
      voxelConstructor.model.getShapeStateGeometry(state);

    return state;
  }
}
