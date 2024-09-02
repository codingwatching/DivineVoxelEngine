import {
  VoxelGeometryData,
  VoxelGeometryLinkData,
  VoxelModelData,
} from "../VoxelModel.types";
import { VoxelRuleGeometry } from "./Classes/VoxelRulesGeometry";
import { VoxelRulesModoel } from "./Classes/VoxelRulesModel";

const getGeometryLinkId = (node: VoxelGeometryLinkData) => {
  return `${node.id}${node.position ? `-${node.position.toString()}` : ""}${
    node.rotation ? `-${node.rotation.toString()}` : ""
  }${node.scale ? `-${node.scale.toString()}` : ""}`;
};

export class VoxelModelRuleBuilder {
  static geometry = new Map<string, VoxelRuleGeometry>();
  static models = new Map<string, VoxelRulesModoel>();
  static registerGeometry(...geometry: VoxelGeometryData[]) {
    geometry.forEach((_) => this.geometry.set(_.id, new VoxelRuleGeometry(_)));
  }
  static registerModels(...models: VoxelModelData[]) {
    const addGeo = (
      modelId: string,
      stateId: string,
      nodes: VoxelGeometryLinkData[]
    ) => {
      const registred: [string, string][] = [];

      for (const node of nodes) {
        const geo = this.geometry.get(node.id);
        if (!geo) throw new Error(`Geometry ${node.id} is not registered.`);
        registred.push([stateId, getGeometryLinkId(node)]);

        this.geometry.set(
          getGeometryLinkId(node),
          new VoxelRuleGeometry(geo.data, geo.position, geo.scale, geo.rotation)
        );
        continue;
      }

      return registred;
    };
    for (const model of models) {
      const rulesModel = new VoxelRulesModoel();

      for (const stateId in model.shapeStatesNodes) {
        const nodes = model.shapeStatesNodes[stateId];
        addGeo(model.id, stateId, nodes).forEach((_) =>
          rulesModel.registerShapeState(..._)
        );
      }
      for (const stateId in model.shapeStatesConditonalNodes) {
        const nodes = model.shapeStatesConditonalNodes[stateId];
        addGeo(model.id, stateId, nodes).forEach((_) =>
          rulesModel.registerCondiotnalNode(..._)
        );
      }
    }
  }

  static buildRules() {}
}
