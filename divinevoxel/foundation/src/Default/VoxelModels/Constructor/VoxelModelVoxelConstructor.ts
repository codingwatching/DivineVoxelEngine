import { VoxelConstructor } from "../../Mesher/Constructors/Voxel/Classes/VoxelConstructor";
import { TextureRegister } from "../../../Textures/TextureRegister";
import { VoxelMesherDataTool } from "../../Mesher/Tools/VoxelMesherDataTool";
import { VoxelModelConstructor } from "./Register/VoxelModelsConstructor";
import { VoxelInputsSyncData } from "../VoxelModelRules.types";
import { VoxelModelConstructorRegister } from "./Register/VoxelModelConstructorRegister";
import { ShapeTool } from "../../Mesher/Shapes/ShapeTool";
import { VoxelGeometryLookUp } from "./VoxelGeometryLookUp";

export class VoxelModelVoxelConstructor extends VoxelConstructor {
  isModel: true = true;

  geometries: number[][] = [];
  baseInputMap: any[];
  conditonalInputMap: any[];

  dataOverrideInputMap: any[];

  constructor(
    public id: string,
    public model: VoxelModelConstructor,
    voxleData: VoxelInputsSyncData
  ) {
    super();
    this.baseInputMap = voxleData.baseGeometryInputMap;
    this.conditonalInputMap = voxleData.condiotnalGeometryInputMap;
    this.dataOverrideInputMap = voxleData.shapeStateDataOverrideInputMap;
  }

  getGeometryNodes() {}
  process(tool: VoxelMesherDataTool) {
    const hashed = VoxelGeometryLookUp.getHash(
      tool.voxel.x,
      tool.voxel.y,
      tool.voxel.z
    );
    const dataOverrideState =
      this.dataOverrideInputMap[
        VoxelGeometryLookUp.stateDataOverrideCache[hashed]
      ];
    {
      const treeState = VoxelGeometryLookUp.stateCache[hashed];

      if (treeState !== undefined && treeState > -1) {
        const geometries = this.model.data.shapeStateMap[treeState];
        const geometriesLength = geometries.length;

        const inputs = this.baseInputMap[treeState];

        for (let i = 0; i < geometriesLength; i++) {
          const nodeId = geometries[i];
          let geoInputs = inputs[nodeId];
          if (dataOverrideState) {
            if (dataOverrideState[nodeId]) {
              geoInputs = dataOverrideState[nodeId];
            }
          }

          const geomtry =
            VoxelModelConstructorRegister.geometry[
              this.model.data.geoLinkMap[nodeId]
            ];

          const nodesLength = geomtry.nodes.length;
          for (let k = 0; k < nodesLength; k++) {
            geomtry.nodes[k].add(tool, hashed, ShapeTool.origin, geoInputs[k]);
          }
        }
      }
    }

    {
      const treeState = VoxelGeometryLookUp.conditonalStateCache[hashed];

      if (treeState !== undefined && treeState > -1) {
        const condiotnalNodes =
          this.model.data.condiotnalShapeStateMap[treeState];
        const condiotnalNodesLength = condiotnalNodes.length;

        for (let i = 0; i < condiotnalNodesLength; i++) {
          const geometries = condiotnalNodes[i];
          const geometriesLength = geometries.length;
          const inputs = this.conditonalInputMap[i];
          for (let k = 0; k < geometriesLength; k++) {
            const nodeId = geometries[k];
            let geoInputs = inputs[k];
            if (dataOverrideState) {
              if (dataOverrideState[nodeId])
                geoInputs = dataOverrideState[nodeId];
            }

            const geomtry =
              VoxelModelConstructorRegister.geometry[
                this.model.data.geoLinkMap[nodeId]
              ];

            const nodesLength = geomtry.nodes.length;
            for (let g = 0; g < nodesLength; g++) {
              geomtry.nodes[g].add(
                tool,
                hashed,
                ShapeTool.origin,
                geoInputs[g]
              );
            }
          }
        }
      }
    }

    tool.clearCalculatedData();
  }

  onTexturesRegistered(textureManager: typeof TextureRegister): void {}
}
