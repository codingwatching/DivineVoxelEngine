import { OcclusionPlaneResults } from "../Classes/OcclusionPlane";
import {
  VoxelFaceNameArray,
  VoxelFaceNameDirectionsRecord,
  VoxelFaceNameOppoisteRecord,
} from "@divinevoxel/core/Math";
import { VoxelRuleGeometry } from "../Classes/VoxelRulesGeometry";

export function BuildOcclusionRules(
  main: VoxelRuleGeometry,
  other: VoxelRuleGeometry
) {
  main.occlusionPlane.setOffset(0, 0, 0);

  //build outside rules
  for (const offsetDirection of VoxelFaceNameArray) {
    const results = new OcclusionPlaneResults<boolean>();
    other.occlusionPlane.setOffset(
      ...VoxelFaceNameDirectionsRecord[offsetDirection]
    );
    for (const planeDirection of VoxelFaceNameArray) {
      const mainPlanes = main.occlusionPlane.planes[planeDirection];
      const otherPlanes =
        other.occlusionPlane.planes[
          VoxelFaceNameOppoisteRecord[planeDirection]
        ];
      for (let i = 0; i < mainPlanes.length; i++) {
        const currentPlane = mainPlanes[i];
        let occuled = false;
        
        for (const otherPlane of otherPlanes) {
          if (otherPlane.doesCover(currentPlane)) occuled = true;
          if (occuled) break;
        }
        results.planes[planeDirection][i] = occuled;
      }
    }

    main.addOutsideOcculedResult(other.id, offsetDirection, results);
  }

  
}
