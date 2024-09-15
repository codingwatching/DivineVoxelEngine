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
import { VoxelModelManager } from "./Rules/VoxelModelManager";
import { VoxelGeometryData, VoxelModelData } from "./VoxelModel.types";
import { VoxelData } from "@divinevoxel/core";
import { ThreadPool } from "@amodx/threads";

import { BuildRules } from "./Rules/Functions/BuildRules";
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
  const initTime = performance.now();
  VoxelModelManager.registerGeometry(
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
  VoxelModelManager.registerModels(
    simpleCube,
    pillarCube,
    fence,
    /* 
  
    ,
    stair,
    fence, */
    ...(data.models || [])
  );


  const syncData: ConstructorVoxelModelSyncData = {
    geometryPalette:   VoxelModelManager.geometryPalette._palette,
    geometry: [],
    models: [],
    voxels: [],
  };

  for (const voxel of data.voxels) {
    const data = voxel.tags.find((_) => _[0] == "#dve_model_data");
    if (!data) continue;
    VoxelModelManager.registerVoxel(voxel.id, data[1]);
  }
  const output: any = {};

  const startTime = performance.now();
  for (const [mainKey, mainGeo] of VoxelModelManager.geometry) {
    const output = BuildRules(mainGeo,   VoxelModelManager.geometryPalette);

    syncData.geometry.push({
      id: mainKey,
      nodes: mainGeo.data.nodes,
      ...output,
    });
  }
  console.log("done building rules", performance.now() - startTime);

  const inputStartTime = performance.now();
  for (const [mainKey, model] of VoxelModelManager.models) {
    const stateData = BuildStateData(model,   VoxelModelManager.geometryPalette);
    model.stateData = stateData;
    syncData.models.push({
      id: mainKey,
      schema: stateData.schema,
      geoLinkMap: stateData.geometryLinkStateMap,
      shapeStateMap: stateData.shapeStatePalette,
      shapeStateGeometryMap: stateData.shapeStatePalette.map((_) =>
        _.map((id) => stateData.geometryLinkStateMap[id])
      ),
      shapeStateDataOverrideTree: stateData.shapeStatDataOverrideeTree,
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
  for (const [mainKey, geometry] of VoxelModelManager.geometry) {
    BuildGeomtryInputs(geometry);
  }
  for (const [mainKey, voxels] of VoxelModelManager.voxels) {
    const {
      shapeStateVoxelInputs,
      conditionalShapeStateVoxelInputs,
      shapeStateDataOverridesVoxelInputs,
    } = BuildFinalInputs(VoxelModelManager.models.get(mainKey)!, voxels);

    for (const v of voxels) {
      syncData.voxels.push({
        id: v.id,
        modelId: mainKey,
        baseGeometryInputMap: shapeStateVoxelInputs[v.id],
        condiotnalGeometryInputMap: conditionalShapeStateVoxelInputs[v.id],
        shapeStateDataOverrideInputMap:
          shapeStateDataOverridesVoxelInputs[v.id],
      });
    }
  }
  data.constructors.runTasksForAll("sync-voxel-model-data", syncData);
  console.log("done building inputs", performance.now() - inputStartTime);

  console.log(
    "init voxel models done | totle time: ",
    performance.now() - initTime
  );
  console.log([VoxelModelManager.geometry, VoxelModelManager.models]);
  console.log(
    "BUILD RULES",
    VoxelModelManager.geometry,
    VoxelModelManager.models
  );

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
