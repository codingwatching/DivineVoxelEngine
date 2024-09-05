import { Vec3Array } from "@amodx/math";
import { VoxelGeometryData } from "../../VoxelModel.types";
import { GetOcclusionPlanes } from "../Functions/GetOcclusionPlanes";
import {
  OcclusionPlaneContainer,
  OcclusionPlaneResults,
} from "./OcclusionPlane";
import { VoxelFaceNames } from "@divinevoxel/core/Math";
import { BuildGeomtryInputs } from "../Functions/BuildGeomtryInputs";

export class VoxelRuleGeometry {
  outsideOcculedRules = new Map<
    string,
    Map<VoxelFaceNames, OcclusionPlaneResults<boolean>>
  >();
  outsideAORules = new Map<
    string,
    Map<number, OcclusionPlaneResults<boolean[]>>
  >();
  occlusionPlane: OcclusionPlaneContainer;

  inputs: ReturnType<typeof BuildGeomtryInputs>;
  constructor(
    public id: string,
    public data: VoxelGeometryData,
    public position?: Vec3Array,
    public scale?: Vec3Array,
    public rotation?: Vec3Array
  ) {
    this.init(data);
  }

  private init(data: VoxelGeometryData) {
    this.occlusionPlane = GetOcclusionPlanes(data.nodes);
    this.inputs = BuildGeomtryInputs(this);
  }

  addOutsideOcculedResult(
    id: string,
    direction: VoxelFaceNames,
    results: OcclusionPlaneResults<boolean>
  ) {
    let outsideResults = this.outsideOcculedRules.get(id);
    if (!outsideResults) {
      outsideResults = new Map();
      this.outsideOcculedRules.set(id, outsideResults);
    }
    outsideResults.set(direction, results);
  }

  addOutsideAOResult(
    id: string,
    direction: number,
    results: OcclusionPlaneResults<boolean[]>
  ) {
    let outsideResults = this.outsideAORules.get(id);
    if (!outsideResults) {
      outsideResults = new Map();
      this.outsideAORules.set(id, outsideResults);
    }
    outsideResults.set(direction, results);
  }

  clone() {
    const newVoxel = new VoxelRuleGeometry(
      this.id,
      this.data,
      this.position,
      this.scale,
      this.rotation
    );

    newVoxel.occlusionPlane = this.occlusionPlane.clone();
    return newVoxel;
  }
}
