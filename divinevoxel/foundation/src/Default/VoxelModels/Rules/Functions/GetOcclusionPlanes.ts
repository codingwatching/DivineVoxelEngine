import { Vector3Like } from "@amodx/math";
import {
  OcclusionQuad,
  OcclusionQuadContainer,
} from "../Classes/OcclusionQuad";
import { VoxelGeometryNodes } from "../../VoxelModel.types";

export function GetOcclusionPlanes(data: VoxelGeometryNodes[]) {
  const planes = new OcclusionQuadContainer();

  for (const node of data) {
    if (node.type == "box") {
      if (node.rotation) continue;
      const [start, end] = node.points.map((_) => Vector3Like.Create(..._));

      if (node.faces.down) {
        planes.addPlane(
          new OcclusionQuad(
            "down",
            [start.x, start.y, start.z],
            [end.x, start.y, end.z]
          )
        );
      }
      if (node.faces.up) {
        planes.addPlane(
          new OcclusionQuad(
            "up",
            [start.x, end.y, start.z],
            [end.x, end.y, end.z]
          )
        );
      }

      if (node.faces.south) {
        planes.addPlane(
          new OcclusionQuad(
            "south",
            [start.x, start.y, start.z],
            [end.x, end.y, start.z]
          )
        );
      }

      if (node.faces.north) {
        planes.addPlane(
          new OcclusionQuad(
            "north",
            [start.x, start.y, end.z],
            [end.x, end.y, end.z]
          )
        );
      }

      if (node.faces.west) {
        planes.addPlane(
          new OcclusionQuad(
            "west",
            [start.x, start.y, start.z],
            [start.x, end.y, end.z]
          )
        );
      }

      if (node.faces.east) {
        planes.addPlane(
          new OcclusionQuad(
            "east",
            [end.x, start.y, start.z],
            [end.x, end.y, end.z]
          )
        );
      }
    }

/*     if (node.type == "plane") {
      if (node.rotation) continue;
      const [start, end] = node.points;

      planes.addPlane(new OcclusionQuad(node.direction, start, end));
    } */
  }

  return planes;
}
