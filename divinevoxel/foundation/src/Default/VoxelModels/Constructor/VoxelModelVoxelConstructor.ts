import { VoxelConstructor } from "../../Mesher/Constructors/Voxel/Classes/VoxelConstructor";
import { TextureRegister } from "../../../Textures/TextureRegister";
import { VoxelMesherDataTool } from "../../Mesher/Tools/VoxelMesherDataTool";
import { VoxelModelConstructor } from "./Register/VoxelModelsConstructor";
import { VoxelInputsSyncData } from "../VoxelModelRules.types";
import { VoxelModelConstructorRegister } from "./Register/VoxelModelConstructorRegister";
import { ShapeTool } from "../../Mesher/Shapes/ShapeTool";
import { VoxelGeometryLookUp } from "./VoxelGeometryLookUp";
import { ShapeStateSchema } from "../State/Schema/ShapeStateSchema";
import { StateTreeReader } from "../State/StateTreeReader";

export class VoxelModelVoxelConstructor extends VoxelConstructor {
  isModel: true = true;

  geometries: number[][] = [];

  modSchema: ShapeStateSchema;
  modTree: StateTreeReader;

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

    this.modSchema = new ShapeStateSchema(voxleData.modSchema);

    this.modTree = new StateTreeReader(
      this.modSchema,
      0,
      voxleData.modStateTree
    );
  }

  process(tool: VoxelMesherDataTool) {
    const modState = this.modTree.getState(tool.voxel.getMod());

    const hashed = VoxelGeometryLookUp.getHash(
      tool.voxel.x,
      tool.voxel.y,
      tool.voxel.z
    );
    const dataOverrideState =
      this.dataOverrideInputMap[modState][
        VoxelGeometryLookUp.stateDataOverrideCache[hashed]
      ];

    const treeState = VoxelGeometryLookUp.stateCache[hashed];

    if (treeState !== undefined && treeState > -1) {
      const geometries = this.model.data.shapeStateMap[treeState];
      const geometriesLength = geometries.length;

      const inputs = this.baseInputMap[modState][treeState];

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

    const conditonalTreeState =
      VoxelGeometryLookUp.conditonalStateCache[hashed];

    if (conditonalTreeState !== undefined && conditonalTreeState > -1) {
      const condiotnalNodes =
        this.model.data.condiotnalShapeStateMap[conditonalTreeState];
      const condiotnalNodesLength = condiotnalNodes.length;

      for (let i = 0; i < condiotnalNodesLength; i++) {
        const geometries = condiotnalNodes[i];
        const geometriesLength = geometries.length;
        const inputs = this.conditonalInputMap[modState][i];
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
            geomtry.nodes[g].add(tool, hashed, ShapeTool.origin, geoInputs[g]);
          }
        }
      }
    }

    tool.clearCalculatedData();
  }

  onTexturesRegistered(textureManager: typeof TextureRegister): void {}
}
