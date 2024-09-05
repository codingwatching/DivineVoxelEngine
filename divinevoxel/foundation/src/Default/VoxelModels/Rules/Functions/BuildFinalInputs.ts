import { VoxelModelConstructorData } from "../../VoxelModel.types";
import { VoxelRulesModoel } from "../Classes/VoxelRulesModel";
import { VoxelModelRuleBuilder } from "../VoxelModelManager";

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
  const voxelsInputs: VoxelStateRecords = {};

  for (const voxel of voxels) {
    const states: any[] = [];
    for (const state in model.data.shapeStatesNodes) {
      const geoNodes: any[] = [];
      const nodes = model.data.shapeStatesNodes[state];
      for (const node of nodes) {
        const geo = VoxelModelRuleBuilder.getGeomtryFromLink(node);
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

      states[model.stateData.shapeStateRecord[state]] = geoNodes;
    }

    voxelsInputs[voxel.id] = states;
  }

  console.warn(voxelsInputs);
  return voxelsInputs;
}
