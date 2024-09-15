import { VoxelRuleGeometry } from "../Classes/VoxelRulesGeometry";
import { VoxelResultsIndex } from "../../Indexing/VoxelResultsIndex";
import { StringPalette } from "@divinevoxel/core/Interfaces/Data/StringPalette";
import { VoxelRelativeCubeIndex } from "../../Indexing/VoxelRelativeCubeIndex";

export function BuildRulesIndexes(
  geo: VoxelRuleGeometry,
  geoPalette: StringPalette
) {
  //12 byte header for all direction indexes

  const maxIndex = VoxelRelativeCubeIndex.flatIndex.size;

  const totalAOReusltsSize = geo.vertexCount * maxIndex;
  const aoRulesBuffer = new SharedArrayBuffer(
    totalAOReusltsSize * (geoPalette.size + 1)
  );

  const aoIndex = new VoxelResultsIndex({
    buffer: aoRulesBuffer,
    resultsSize: geo.vertexCount,
  });

  const totalCullReusltsSize = geo.faceCount * maxIndex;
  const cullRulesBuffer = new SharedArrayBuffer(
    totalCullReusltsSize * (geoPalette.size + 1)
  );

  const cullIndex = new VoxelResultsIndex({
    buffer: cullRulesBuffer,
    resultsSize: geo.faceCount,
  });

  for (let otherId = 0; otherId < geoPalette.size; otherId++) {
    const id = geoPalette._palette[otherId];
    const aoRules = geo.aoRules.get(id)!;
    const cullRules = geo.cullRules.get(id)!;

    for (let directionIndex = 0; directionIndex < maxIndex; directionIndex++) {
      const aoResults = aoRules.get(directionIndex)!;
      for (const [vertexIndex, result] of aoResults.results) {
        aoIndex.setValue(otherId, directionIndex, vertexIndex, result ? 1 : 0);
      }
      const cullResults = cullRules.get(directionIndex)!;
      for (const [faceIndex, result] of cullResults.results) {
        cullIndex.setValue(otherId, directionIndex, faceIndex, result ? 1 : 0);
      }
    }
  }

  return { aoIndex, cullIndex };
}
