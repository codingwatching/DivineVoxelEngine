import {
  VoxelFaceNameArray,
  VoxelFaceNames,
  VoxelFaceNameRecord,
  VoxelFaces,
} from "@divinevoxel/core/Math";
import { VoxelRuleGeometry } from "../Classes/VoxelRulesGeometry";
import { VoxelGeometryAOIndex } from "../../Indexing/VoxelGeometryAOIndex";
import { StringPalette } from "@divinevoxel/core/Interfaces/Data/StringPalette";

export function BuildAORulesIndex(
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
  const vertexCounts: Record<VoxelFaceNames, number> = {
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
    vertexCounts[dir] += geo.occlusionPlane.planes[dir].length * 4;
    const size = Math.max(1, (geo.occlusionPlane.planes[dir].length * 4) / 8);
    byteCount += size;
    resultsSize += size;
  }
  const maxIndex = VoxelGeometryAOIndex.flatIndex.size;

  const totalReusltsSize = resultsSize * maxIndex;
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

  const index = new VoxelGeometryAOIndex({
    buffer: rulesBuffer,
    resultsSize,
    headerSize,
  });

  for (let otherId = 0; otherId < geoPalette.size; otherId++) {
    const id = geoPalette._palette[otherId];

    const rules = geo.outsideAORules.get(id)!;

    for (let i = 0; i < maxIndex; i++) {
      const aoResults = rules.get(i)!;
      for (const planeDir of VoxelFaceNameArray) {
        const faceVerticies = aoResults.planes[planeDir];

        for (const face of faceVerticies) {
    
          if ((i == 21 || i == 19 || i == 18) && planeDir == "north") {
            console.warn(i, planeDir,face,faceVerticies.length);
            face[3]= true;
          }
          for (let v = 0; v < face.length; v++) {
            index.setIShaded(
              otherId,
              i,
              VoxelFaceNameRecord[planeDir],
              v,
              face[v] ? 1 : 0
            );
          }
        }
      }
    }
  }

  return index;
}
