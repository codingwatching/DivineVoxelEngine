import { Vec3Array } from "@amodx/math";
import { VoxelGeometryData } from "../../VoxelModel.types";
import { GetOcclusionPlanes } from "../Functions/GetOcclusionPlanes";
import {
  OcclusionQuadContainer,
  OcclusionQuadResults,
} from "./OcclusionQuad";
import { VoxelFaceNames } from "@divinevoxel/core/Math";
import { BuildGeomtryInputs } from "../Functions/BuildGeomtryInputs";

export class VoxelRuleGeometry {
  outsideOcculedRules = new Map<
    string,
    Map<VoxelFaceNames, OcclusionQuadResults<boolean>>
  >();
  outsideAORules = new Map<
    string,
    Map<number, OcclusionQuadResults<boolean[]>>
  >();
  occlusionPlane: OcclusionQuadContainer;

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
    results: OcclusionQuadResults<boolean>
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
    results: OcclusionQuadResults<boolean[]>
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
