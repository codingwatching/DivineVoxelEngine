import {
  VoxelGeometryLinkData,
  VoxelModelConstructorData,
} from "../../VoxelModel.types";
import { VoxelRulesModoel } from "../Classes/VoxelRulesModel";
import { VoxelModelManager } from "../VoxelModelManager";

/**
 Default Inputs
[voxel id]
   [state id]
      [geo id]:[args]
      [geo id]:[args]
     ...
 */

type VoxelStateRecords = Record<string, any[]>;
const isArgString = (data: any) => {
  if (typeof data !== "string") return;
  return data[0] == "@";
};

export function BuildFinalInputs(
  model: VoxelRulesModoel,
  voxels: { id: string; data: VoxelModelConstructorData }[]
) {
  const shapeStateVoxelInputs: VoxelStateRecords = {};
  const conditionalShapeStateVoxelInputs: VoxelStateRecords = {};
  const shapeStateDataOverridesVoxelInputs: VoxelStateRecords = {};

  for (const voxel of voxels) {
    const baseStates: any[] = [];
    for (const state in model.data.shapeStatesNodes) {
      const geoNodes: any[] = [];
      const shapeStateNodes = model.data.shapeStatesNodes[state];
      for (const node of shapeStateNodes) {
        const geo = VoxelModelManager.getGeomtryFromLink(node);
        if (!geo) throw new Error(`Geometry does not exist`);

        for (const geoArg in node.inputs) {
          const constructorArg = node.inputs[geoArg];
          if (isArgString(constructorArg)) {
            geo.inputs[geoArg] = voxel.data.inputs[constructorArg];
            continue;
          }
          geo.inputs[geoArg] = constructorArg;
        }

        geoNodes[model.stateData.geometryLinkIdMap[node.id]] =
          geo.inputs.cloneArgs();
      }

      baseStates[model.stateData.shapeStateRecord[state]] = geoNodes;
    }
    shapeStateVoxelInputs[voxel.id] = baseStates;

    const overridesStates: any[] = [];
    for (const state in model.data.shapeStatesOverrides) {
      const geoNodes: any[] = [];
      const shapeStateNodes = model.data.shapeStatesOverrides[state];
      for (const node of shapeStateNodes) {
        const geo = VoxelModelManager.geometry.get(
          VoxelModelManager.geometryPalette.getStringId(
            model.stateData.geometryLinkIdMap[node.id]
          )
        );
        if (!geo) throw new Error(`Geometry does not exist`);

        for (const geoArg in node.inputs) {
          const constructorArg = node.inputs[geoArg];
          if (isArgString(constructorArg)) {
            geo.inputs[geoArg] = voxel.data.inputs[constructorArg];
            continue;
          }
          geo.inputs[geoArg] = constructorArg;
        }

        geoNodes[model.stateData.geometryLinkIdMap[node.id]] =
          geo.inputs.cloneArgs();
      }

      overridesStates[model.stateData.shapeStateDataOverrideRecord[state]] =
        geoNodes;
    }
    shapeStateDataOverridesVoxelInputs[voxel.id] = overridesStates;

    const optionalStates: any[] = [];
    for (const state in model.data.shapeStatesConditonalNodes) {
      const geoNodes: any[] = [];
      const shapeStateNodes = model.data.shapeStatesConditonalNodes[state];
      for (let i = 0; i < shapeStateNodes.length; i++) {
        const node = shapeStateNodes[i];
        const geo = VoxelModelManager.getGeomtryFromLink(node);
        if (!geo) throw new Error(`Geometry does not exist`);

        for (const geoArg in node.inputs) {
          const constructorArg = node.inputs[geoArg];
          if (isArgString(constructorArg)) {
            geo.inputs[geoArg] = voxel.data.inputs[constructorArg];
            continue;
          }
          geo.inputs[geoArg] = constructorArg;
        }

        geoNodes[i] = geo.inputs.cloneArgs();
      }

      optionalStates[model.stateData.condiotnalShapeStateRecord[state]] =
        geoNodes;
    }

    conditionalShapeStateVoxelInputs[voxel.id] = optionalStates;
  }

  return {
    shapeStateVoxelInputs,
    conditionalShapeStateVoxelInputs,
    shapeStateDataOverridesVoxelInputs,
  };
}
