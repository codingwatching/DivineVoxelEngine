import { StringPalette } from "@divinevoxel/core/Interfaces/Data/StringPalette";
import {
  VoxelGeometryData,
  VoxelGeometryLinkData,
  VoxelModelConstructorData,
  VoxelModelData,
} from "../VoxelModel.types";
import { VoxelRuleGeometry } from "./Classes/VoxelRulesGeometry";
import { VoxelRulesModoel } from "./Classes/VoxelRulesModel";

const getGeometryLinkId = (node: VoxelGeometryLinkData) => {
  return `${node.geometryId}${
    node.position ? `-p${node.position.toString()}` : ""
  }${node.rotation ? `-r${node.rotation.toString()}` : ""}${
    node.scale ? `-s${node.scale.toString()}` : ""
  }`.trim();
};

export class VoxelModelManager {
  static geometryPalette = new StringPalette();
  static getGeometryLinkId = getGeometryLinkId;
  static voxels = new Map<
    string,
    { id: string; data: VoxelModelConstructorData }[]
  >();
  static geometry = new Map<string, VoxelRuleGeometry>();
  static models = new Map<string, VoxelRulesModoel>();

  static registerGeometry(...geometry: VoxelGeometryData[]) {
    for (const geo of geometry) {
      if (!this.geometryPalette.isRegistered(geo.id))
        this.geometryPalette.register(geo.id);
      this.geometry.set(geo.id, new VoxelRuleGeometry(geo.id, geo));
    }
  }

  static getGeomtryFromLink(link: VoxelGeometryLinkData) {
    const geoId = getGeometryLinkId(link);
    return this.geometry.get(geoId);
  }

  static registerModels(...models: VoxelModelData[]) {
    const addGeo = (
      modelId: string,
      stateId: string,
      nodes: VoxelGeometryLinkData[]
    ) => {
      const registred: [string, string][] = [];

      for (const geoLinkNode of nodes) {
        const geo = this.geometry.get(geoLinkNode.geometryId);
        if (!geo)
          throw new Error(
            `Geometry ${geoLinkNode.geometryId} is not registered.`
          );
        const newId = getGeometryLinkId(geoLinkNode);

        if (this.geometry.has(newId)) continue;
        registred.push([stateId, newId]);
        if (!this.geometryPalette.isRegistered(newId))
          this.geometryPalette.register(newId);
        const newData = structuredClone(geo.data);
        if (geoLinkNode.position) {
          for (const node of newData.nodes) {
            if (node.type == "box") {
              node.points[0][0] += geoLinkNode.position[0];
              node.points[0][1] += geoLinkNode.position[1];
              node.points[0][2] += geoLinkNode.position[2];
              node.points[1][0] += geoLinkNode.position[0];
              node.points[1][1] += geoLinkNode.position[1];
              node.points[1][2] += geoLinkNode.position[2];
            }
          }
        }

        this.geometry.set(
          newId,
          new VoxelRuleGeometry(
            newId,
            newData,
            structuredClone(geoLinkNode.position),
            structuredClone(geoLinkNode.scale),
            structuredClone(geoLinkNode.rotation)
          )
        );
        continue;
      }

      return registred;
    };
    for (const model of models) {
      const rulesModel = new VoxelRulesModoel(model);

      this.models.set(model.id, rulesModel);
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

  static registerVoxel(id: string, data: VoxelModelConstructorData) {
    let voxelModels = this.voxels.get(data.id);
    if (!voxelModels) {
      voxelModels = [];
      this.voxels.set(data.id, voxelModels);
    }
    voxelModels.push({ id, data });
  }
}
