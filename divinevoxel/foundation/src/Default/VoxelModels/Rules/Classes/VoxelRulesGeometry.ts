import { Vec3Array } from "@amodx/math";
import { VoxelGeometryData } from "../../VoxelModel.types";
import { GetOcclusionPlanes } from "../Functions/GetOcclusionPlanes";
import { OcclusionQuadContainer, OcclusionResults } from "./OcclusionQuad";
import { BuildGeomtryInputs } from "../Functions/BuildGeomtryInputs";

export class VoxelRuleGeometry {
  cullRules = new Map<
    string,
    Map<number, OcclusionResults<boolean>>
  >();
  aoRules = new Map<string, Map<number, OcclusionResults<boolean>>>();
  occlusionPlane: OcclusionQuadContainer;
  faceCullMap: number[][] = [];
  vertexHitMap: number[][] = [];
  
  faceCount = 0;
  vertexCount = 0;
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
    this.occlusionPlane = GetOcclusionPlanes(this.id, this, data.nodes);
    this.inputs = BuildGeomtryInputs(this);
  }

  addCullResults(
    id: string,
    index: number,
    results: OcclusionResults<boolean>
  ) {
    let outsideResults = this.cullRules.get(id);
    if (!outsideResults) {
      outsideResults = new Map();
      this.cullRules.set(id, outsideResults);
    }
    outsideResults.set(index, results);
  }

  addAOResults(
    id: string,
    direction: number,
    results: OcclusionResults<boolean>
  ) {
    let outsideResults = this.aoRules.get(id);
    if (!outsideResults) {
      outsideResults = new Map();
      this.aoRules.set(id, outsideResults);
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
    newVoxel.vertexCount = this.vertexCount;
    newVoxel.faceCount = this.faceCount;
    newVoxel.faceCullMap = this.faceCullMap;
    newVoxel.vertexHitMap = this.vertexHitMap;
    newVoxel.occlusionPlane = this.occlusionPlane.clone();
    return newVoxel;
  }
}
