import { VoxelModelConstructorData } from "../../VoxelModel.types";
import { VoxelRulesModoel } from "../Classes/VoxelRulesModel";
import { VoxelModelManager } from "../VoxelModelManager";

type VoxelStateRecords = Record<string, any[]>;
const isArgString = (data: any) => {
  if (typeof data !== "string") return;
  return data[0] == "@";
};

export function BuildFinalInputs(model: VoxelRulesModoel) {
  const shapeStateVoxelInputs: VoxelStateRecords = {};
  const conditionalShapeStateVoxelInputs: VoxelStateRecords = {};
  const shapeStateDataOverridesVoxelInputs: VoxelStateRecords = {};

  for (const [voxelId, voxel] of model.voxels) {
    const voxelModData = model.voxelModData.get(voxelId)!;

    for (const modVoxelInputKey in voxel.inputs) {
      const modVoxelInput = voxel.inputs[modVoxelInputKey];

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
              geo.inputs[geoArg] = modVoxelInput[constructorArg];
              continue;
            }
            geo.inputs[geoArg] = constructorArg;
          }

          geoNodes[model.stateData.geometryLinkIdMap[node.id]] =
            geo.inputs.cloneArgs();
        }

        baseStates[model.stateData.shapeStateRecord[state]] = geoNodes;
      }
      shapeStateVoxelInputs[voxelId] ??= [];
      shapeStateVoxelInputs[voxelId][voxelModData.modRecord[modVoxelInputKey]] =
        baseStates;

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
              geo.inputs[geoArg] = modVoxelInput[constructorArg];
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
      shapeStateDataOverridesVoxelInputs[voxelId] ??= [];
      shapeStateDataOverridesVoxelInputs[voxelId][
        voxelModData.modRecord[modVoxelInputKey]
      ] = overridesStates;

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
              geo.inputs[geoArg] = modVoxelInput[constructorArg];
              continue;
            }
            geo.inputs[geoArg] = constructorArg;
          }

          geoNodes[i] = geo.inputs.cloneArgs();
        }

        optionalStates[model.stateData.condiotnalShapeStateRecord[state]] =
          geoNodes;
      }
      conditionalShapeStateVoxelInputs[voxelId] ??= [];
      conditionalShapeStateVoxelInputs[voxelId][
        voxelModData.modRecord[modVoxelInputKey]
      ] = optionalStates;
    }
  }

  return {
    shapeStateVoxelInputs,
    conditionalShapeStateVoxelInputs,
    shapeStateDataOverridesVoxelInputs,
  };
}
