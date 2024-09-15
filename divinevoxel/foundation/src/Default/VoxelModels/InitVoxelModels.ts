import {
  cube,
  eighthCube,
  fence,
  fenceEastWest,
  fenceNorthsouth,
  fencePost,
  halfCube,
  pillarCube,
  quaterCubeSouthNorth,
  quaterCubeUpDown,
  quaterCubeWestEast,
  simpleCube,
  stair,
} from "./Examples";
import { VoxelModelRuleBuilder } from "./Rules/VoxelModelManager";
import { VoxelGeometryData, VoxelModelData } from "./VoxelModel.types";
import { VoxelData } from "@divinevoxel/core";
import { ThreadPool } from "@amodx/threads";

import { BuildRules } from "./Rules/Functions/BuildRules";
import { BuildRulesIndexes } from "./Rules/Functions/BuildRulesIndexes";
import { BuildStateData } from "./Rules/Functions/BuildStateData";
import { BuildGeomtryInputs } from "./Rules/Functions/BuildGeomtryInputs";
import { BuildFinalInputs } from "./Rules/Functions/BuildFinalInputs";
import { StringPalette } from "@divinevoxel/core/Interfaces/Data/StringPalette";
import { ConstructorVoxelModelSyncData } from "./VoxelModelRules.types";

export function InitVoxelModels(data: {
  constructors: ThreadPool;
  geometry?: VoxelGeometryData[];
  models?: VoxelModelData[];
  voxels: VoxelData[];
}) {
  const t1 = performance.now();
  VoxelModelRuleBuilder.registerGeometry(
    cube,
    fencePost,
    fenceEastWest,
    fenceNorthsouth,
    /*  

  halfCube,
    quaterCubeSouthNorth,
    quaterCubeUpDown,
    quaterCubeWestEast,
    eighthCube,
    fencePost,
    fenceEastWest,
    fenceNorthsouth, */
    ...(data.geometry || [])
  );
  VoxelModelRuleBuilder.registerModels(
    simpleCube,
    fence,
    /*     pillarCube,
    stair,
    fence, */
    ...(data.models || [])
  );
  const geoPalette = new StringPalette();

  const syncData: ConstructorVoxelModelSyncData = {
    geometryPalette: geoPalette._palette,
    geometry: [],
    models: [],
    voxels: [],
  };

  for (const voxel of data.voxels) {
    const data = voxel.tags.find((_) => _[0] == "#dve_model_data");
    if (!data) continue;
    VoxelModelRuleBuilder.registerVoxel(voxel.id, data[1]);
  }
  const output: any = {};
  for (const [mainKey, mainGeo] of VoxelModelRuleBuilder.geometry) {
    geoPalette.register(mainKey);

    for (let [otherKey, otherGeo] of VoxelModelRuleBuilder.geometry) {
      otherGeo = mainKey == otherKey ? mainGeo.clone() : otherGeo;
      BuildRules(mainGeo, otherGeo);
    }
  }

  for (const [mainKey, mainGeo] of VoxelModelRuleBuilder.geometry) {
    const { aoIndex, cullIndex } = BuildRulesIndexes(mainGeo, geoPalette);

    syncData.geometry.push({
      id: mainKey,
      nodes: mainGeo.data.nodes,
      faceCullMap: mainGeo.faceCullMap,
      vertexHitMap: mainGeo.vertexHitMap,
      aoIndex: aoIndex.data,
      cullIndex: cullIndex.data,
    });
  }

  for (const [mainKey, model] of VoxelModelRuleBuilder.models) {
    const stateData = BuildStateData(model, geoPalette);
    syncData.models.push({
      id: mainKey,
      schema: stateData.schema,
      geoLinkMap: stateData.geometryLinkStateMap,
      shapeStateMap: stateData.shapeStatePalette,
      shapeStateGeometryMap: stateData.shapeStatePalette.map((_) =>
        _.map((id) => stateData.geometryLinkStateMap[id])
      ),
      shapeStateTree: stateData.shapeStateTree,
      condiotnalStateTree: stateData.condiotnalNodeStateTree,
      condiotnalStatements: stateData.condiotnalStatements,
      condiotnalStateMap: stateData.condiotnalShapeStatePalette,
      condiotnalShapeStateMap: stateData.condiotanlStatePalette,
      condiotnalShapeStateGeometryMap: stateData.condiotanlStatePalette.map(
        (state) =>
          state.map((nodes: number[]) =>
            nodes.map((id) => stateData.geometryLinkStateMap[id])
          )
      ),
    });
  }
  for (const [mainKey, geometry] of VoxelModelRuleBuilder.geometry) {
    BuildGeomtryInputs(geometry);
  }
  for (const [mainKey, voxels] of VoxelModelRuleBuilder.voxels) {
    const { shapeStateVoxelInputs, conditionalShapeStateVoxelInputs } =
      BuildFinalInputs(VoxelModelRuleBuilder.models.get(mainKey)!, voxels);

    for (const v of voxels) {
      syncData.voxels.push({
        id: v.id,
        modelId: mainKey,
        baseGeometryInputMap: shapeStateVoxelInputs[v.id],
        condiotnalGeometryInputMap: conditionalShapeStateVoxelInputs[v.id],
      });
    }
  }
  data.constructors.runTasksForAll("sync-voxel-model-data", syncData);

  console.log(
    "BUILD RULES",
    VoxelModelRuleBuilder.geometry,
    VoxelModelRuleBuilder.models
  );

  console.log("done building rules", performance.now() - t1);
  console.log([VoxelModelRuleBuilder.geometry, VoxelModelRuleBuilder.models]);

  /* 
  const blob = new Blob([JSON.stringify(output, null, 1)], {});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "rules.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
 */
}
