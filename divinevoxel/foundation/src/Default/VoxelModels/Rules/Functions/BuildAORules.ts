import { OcclusionQuadResults } from "../Classes/OcclusionQuad";
import { VoxelRuleGeometry } from "../Classes/VoxelRulesGeometry";
import { VoxelFaceNameArray } from "@divinevoxel/core/Math";
import { VoxelGeometryAOIndex } from "../../Indexing/VoxelGeometryAOIndex";

export function BuildAORules(
  main: VoxelRuleGeometry,
  other: VoxelRuleGeometry
) {
  main.occlusionPlane.setOffset(0, 0, 0);

  for (let y = -1; y < 2; y++) {
    for (let nx = -1; nx < 2; nx++) {
      for (let nz = -1; nz < 2; nz++) {
        const results = new OcclusionQuadResults<boolean[]>();
        other.occlusionPlane.setOffset(nx, y, nz);
        for (const planeDirection of VoxelFaceNameArray) {
          const mainPlanes = main.occlusionPlane.planes[planeDirection];

          for (let i = 0; i < mainPlanes.length; i++) {
            const currentPlane = mainPlanes[i];
            const result: boolean[] = [];

            const points = currentPlane.getPoints();
            for (let v = 0; v < points.length; v++) {
              let touching = false;
              for (const dir of VoxelFaceNameArray) {
                const otherPlanes = other.occlusionPlane.planes[dir];
                
                for (const otherPlane of otherPlanes) {
                  if (otherPlane.direction == currentPlane.direction) continue;
                  if (otherPlane.isPointOnPlane(...points[v])) touching = true;
                  if (touching) break;
                }
              }

              result[v] = touching;
            }

            results.planes[planeDirection][i] = result;
          }
        }

        main.addOutsideAOResult(
          other.id,
          VoxelGeometryAOIndex.getIndex(nx, y, nz),
          results
        );
      }
    }
  }
}
