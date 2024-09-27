import { Vector3Like } from "@amodx/math";
import {
  OcclusionQuadFace,
  OcclusionFaceContainer,
} from "../Classes/OcclusionFace";
import { VoxelGeometryNodes } from "../../VoxelModel.types";
import { VoxelRuleGeometry } from "../Classes/VoxelRulesGeometry";
import { VoxelFaces } from "@divinevoxel/core/Math";

export function GetOcclusionFaces(
  parentId: string,
  geometry: VoxelRuleGeometry,
  data: VoxelGeometryNodes[]
) {
  const faceContainer = new OcclusionFaceContainer();

  let vertexCount = 0;
  let faceCount = 0;

  let nodeId = 0;
  for (const node of data) {
    if (node.type == "box") {
      if (node.rotation) continue;
      const [start, end] = node.points.map((_) => Vector3Like.Create(..._));

      faceContainer.addFace(
        new OcclusionQuadFace(
          parentId,
          nodeId,
          "up",
          vertexCount + VoxelFaces.Up * 4,
          VoxelFaces.Up + faceCount,
          [start.x, end.y, start.z],
          [end.x, end.y, end.z]
        )
      );

      faceContainer.addFace(
        new OcclusionQuadFace(
          parentId,
          nodeId,
          "down",
          vertexCount + VoxelFaces.Down * 4,
          VoxelFaces.Down + faceCount,
          [start.x, start.y, start.z],
          [end.x, start.y, end.z]
        )
      );

      faceContainer.addFace(
        new OcclusionQuadFace(
          parentId,
          nodeId,
          "north",
          vertexCount + VoxelFaces.North * 4,
          VoxelFaces.North + faceCount,
          [start.x, start.y, end.z],
          [end.x, end.y, end.z]
        )
      );

      faceContainer.addFace(
        new OcclusionQuadFace(
          parentId,
          nodeId,
          "south",
          vertexCount + VoxelFaces.South * 4,
          VoxelFaces.South + faceCount,
          [start.x, start.y, start.z],
          [end.x, end.y, start.z]
        )
      );

      faceContainer.addFace(
        new OcclusionQuadFace(
          parentId,
          nodeId,
          "east",
          vertexCount + VoxelFaces.East * 4,
          VoxelFaces.East + faceCount,
          [end.x, start.y, start.z],
          [end.x, end.y, end.z]
        )
      );

      faceContainer.addFace(
        new OcclusionQuadFace(
          parentId,
          nodeId,
          "west",
          vertexCount + VoxelFaces.West * 4,
          VoxelFaces.West + faceCount,
          [start.x, start.y, start.z],
          [start.x, end.y, end.z]
        )
      );
      faceCount += 6;
      vertexCount += 6 * 4;
    }
    nodeId++;
    /*     if (node.type == "plane") {
      if (node.rotation) continue;
      const [start, end] = node.points;

      planes.addPlane(new OcclusionQuad(node.direction, start, end));
    } */
  }
  geometry.vertexCount = vertexCount;
  geometry.faceCount = faceCount;
  return faceContainer;
}
