import { Vector3Like } from "@amodx/math";
import {
  OcclusionPlane,
  OcclusionPlaneContainer,
} from "../Classes/OcclusionPlane";
import { VoxelGeometryNodes } from "../../VoxelModel.types";

export function GetOcclusionPlanes(data: VoxelGeometryNodes[]) {
  const planes = new OcclusionPlaneContainer();

  for (const node of data) {
    if (node.type == "box") {
      if (node.rotation) continue;
      const [start, end] = node.points.map((_) => Vector3Like.Create(..._));

      if (node.faces.bottom) {
        planes.addPlane(
          new OcclusionPlane(
            "bottom",
            [start.x, start.y, start.z],
            [end.x, start.y, end.z]
          )
        );
      }
      if (node.faces.top) {
        planes.addPlane(
          new OcclusionPlane(
            "top",
            [start.x, end.y, start.z],
            [end.x, end.y, end.z]
          )
        );
      }

      if (node.faces.south) {
        planes.addPlane(
          new OcclusionPlane(
            "south",
            [start.x, start.y, start.z],
            [end.x, end.y, start.z]
          )
        );
      }

      if (node.faces.north) {
        planes.addPlane(
          new OcclusionPlane(
            "north",
            [start.x, start.y, end.z],
            [end.x, end.y, end.z]
          )
        );
      }

      if (node.faces.west) {
        planes.addPlane(
          new OcclusionPlane(
            "west",
            [start.x, start.y, start.z],
            [start.x, end.y, end.z]
          )
        );
      }

      if (node.faces.east) {
        planes.addPlane(
          new OcclusionPlane(
            "east",
            [end.x, start.y, start.z],
            [end.x, end.y, end.z]
          )
        );
      }
    }

    if (node.type == "plane") {
      if (node.rotation) continue;
      const [start, end] = node.points;

      planes.addPlane(new OcclusionPlane(node.direction, start, end));
    }
  }

  return planes;
}
