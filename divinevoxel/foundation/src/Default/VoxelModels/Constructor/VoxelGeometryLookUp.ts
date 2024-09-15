import { VoxelConstructorsRegister } from "../../Mesher/Constructors/Voxel/VoxelConstructorsRegister";
import { DataTool } from "../../Tools/Data/DataTool";
import { VoxelModelVoxelConstructor } from "./VoxelModelVoxelConstructor";
import { Vec3Array, Vector3Like } from "@amodx/math";

export class VoxelGeometryLookUp {
  static dataTool: DataTool;

  static stateCache: number[] = [];
  static conditonalStateCache: number[] = [];
  static geometryCache: number[][] = [];
  static conditionalGeometryCache: number[][][] = [];
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
    this.conditionalGeometryCache.length = 0;
    this.conditonalStateCache.length = 0;
  }

  static getHash(x: number, y: number, z: number) {
    const hashed = Vector3Like.HashXYZ(
      x - this.offset[0],
      y - this.offset[1],
      z - this.offset[2]
    );
    if (!this.stateCache[hashed]) this.hashState(hashed, x, y, z);
    return hashed;
  }

  private static hashState(hashed: number, x: number, y: number, z: number) {
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
    voxelConstructor.model.schema.voxel.setDimension(this.dataTool.dimension);
    voxelConstructor.model.schema.voxel.loadInAt(x, y, z);
    const shapeState = this.dataTool.getShapeState();
    const state = voxelConstructor.getState(shapeState);

    const conditonalState = voxelConstructor.getCondtionalState(shapeState);
    this.stateCache[hashed] = state;
    this.conditonalStateCache[hashed] = conditonalState;

    if (this.geometryCache[hashed]) {
      console.error(x, y, z);
      throw new Error(`Duplicate hash!`);
    }

    this.geometryCache[hashed] =
      voxelConstructor.model.getShapeStateGeometry(state);
    this.conditionalGeometryCache[hashed] =
      voxelConstructor.model.getCondtionalShapeStateGeometry(conditonalState);

    return state;
  }
}
