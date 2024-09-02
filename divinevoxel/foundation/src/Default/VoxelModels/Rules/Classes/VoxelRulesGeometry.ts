import { Vec3Array } from "@amodx/math";
import { VoxelGeometryData } from "../../VoxelModel.types";
import { GetOcclusionPlanes } from "../Functions/GetOcclusionPlanes";
import { OcclusionPlaneContainer } from "./OcclusionPlane";

export class VoxelRuleGeometry {
  occlusionPlane: OcclusionPlaneContainer;
  constructor(
    public data: VoxelGeometryData,
    public position?: Vec3Array,
    public scale?: Vec3Array,
    public rotation?: Vec3Array
  ) {
    this.init(data);
  }

  private init(data: VoxelGeometryData) {
    this.occlusionPlane = GetOcclusionPlanes(data.nodes);
  }
}
