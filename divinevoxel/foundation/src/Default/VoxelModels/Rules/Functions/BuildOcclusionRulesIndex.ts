import {
  VoxelFaceNameArray,
  VoxelFaceNames,
  VoxelFaceNameRecord,
  VoxelFaces,
} from "@divinevoxel/core/Math";
import { VoxelRuleGeometry } from "../Classes/VoxelRulesGeometry";

import { VoxelGeometryCulledIndex } from "../../Indexing/VoxelGeometryCulledIndex";
import { StringPalette } from "@divinevoxel/core/Interfaces/Data/StringPalette";

export function BuildOcclusionRulesIndex(
  geo: VoxelRuleGeometry,
  geoPalette: StringPalette
) {
  //12 byte header for all direction indexes
  const headerSize = 2 * 6;
  const faceIndexes: Record<VoxelFaceNames, number> = {
    up: 0,
    down: 0,
    north: 0,
    south: 0,
    east: 0,
    west: 0,
  };
  let resultsSize = 0;
  let byteCount = headerSize;
  for (const dir of VoxelFaceNameArray) {
    faceIndexes[dir] = byteCount;
    const size = Math.max(1, geo.occlusionPlane.planes[dir].length / 8);
    byteCount += size;
    resultsSize += size;
  }

  const totalReusltsSize = resultsSize * VoxelFaceNameArray.length;
  const rulesBuffer = new SharedArrayBuffer(
    headerSize + totalReusltsSize * (geoPalette.size + 1)
  );

  const view = new DataView(rulesBuffer);
  view.setUint16(VoxelFaces.Up * 2, faceIndexes.up);
  view.setUint16(VoxelFaces.Down * 2, faceIndexes.down);
  view.setUint16(VoxelFaces.North * 2, faceIndexes.north);
  view.setUint16(VoxelFaces.South * 2, faceIndexes.south);
  view.setUint16(VoxelFaces.East * 2, faceIndexes.east);
  view.setUint16(VoxelFaces.West * 2, faceIndexes.west);

  const index = new VoxelGeometryCulledIndex({
    buffer: rulesBuffer,
    resultsSize,
    headerSize,
  });

  for (let otherId = 0; otherId < geoPalette.size; otherId++) {
    const rules = geo.outsideOcculedRules.get(geoPalette._palette[otherId])!;
    for (const [otherDir, results] of rules) {
      for (const planeDir of VoxelFaceNameArray) {
        const planes = results.planes[planeDir];
        for (let f = 0; f < planes.length; f++) {
          index.setIsExposed(
            otherId,
            VoxelFaceNameRecord[otherDir],
            VoxelFaceNameRecord[planeDir],
            f,
            planes[f] ? 0 : 1
          );
        }
      }
    }
  }

  return index;
}
