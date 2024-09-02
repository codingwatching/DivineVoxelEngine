import {
  OcclusionPlaneContainer,
  OcclusionPlaneResults,
} from "../Classes/OcclusionPlane";
import { DirectionNames } from "@divinevoxel/core";

const directions: DirectionNames[] = [
  "top",
  "bottom",
  "east",
  "west",
  "north",
  "south",
];
export function BuildOcclusionRules(
  main: OcclusionPlaneContainer,
  other: OcclusionPlaneContainer
) {
  const results = new OcclusionPlaneResults();
  for (const direction of directions) {
    const mainPlanes = main.planes[direction];
    const otherPlanes = other.planes[direction];
    for (let i = 0; i < mainPlanes.length; i++) {
      const currentPlane = mainPlanes[i];
      let occuled = false;
      for (const otherPlane of otherPlanes) {
        if (currentPlane.doesCover(otherPlane)) occuled = true;

        if (occuled) break;
      }

      results.planes[direction][i] = occuled;
    }
  }
}
