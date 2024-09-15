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
  constructor(
    public id: string,
    public model: VoxelModelConstructor,
    public baseInputMap: VoxelInputsSyncData["baseGeometryInputMap"],
    public conditonalInputMap: VoxelInputsSyncData["condiotnalGeometryInputMap"]
  ) {
    super();
  }

  getState(shapeState: number) {
    return this.model.shapeStateTree.getState(shapeState);
  }
  getCondtionalState(shapeState: number) {
    return this.model.condtioanlShapeStateTree.getState(shapeState);
  }

  getGeometryNodes() {}
  process(tool: VoxelMesherDataTool) {
    const hashed = VoxelGeometryLookUp.getHash(
      tool.voxel.x,
      tool.voxel.y,
      tool.voxel.z
    );

    {
      const treeState = VoxelGeometryLookUp.stateCache[hashed];

      if (treeState !== undefined && treeState > -1) {
        const geometries = this.model.getShapeStateLocalGeometry(treeState);
        const geometriesLength = geometries.length;

        const inputs = this.baseInputMap[treeState];

        for (let i = 0; i < geometriesLength; i++) {
          const geoInputs = inputs[geometries[i]];
          const geomtry =
            VoxelModelConstructorRegister.geometry[
              this.model.data.geoLinkMap[geometries[i]]
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
          this.model.getCondtionalShapeStateLocalGeometry(treeState);
        const condiotnalNodesLength = condiotnalNodes.length;
   
        for (let i = 0; i < condiotnalNodesLength; i++) {
          const geometries = condiotnalNodes[i];
          const geometriesLength = geometries.length;
          const inputs = this.conditonalInputMap[i];
          for (let k = 0; k < geometriesLength; k++) {
            const geoInputs = inputs[k];
            const geomtry =
              VoxelModelConstructorRegister.geometry[
                this.model.data.geoLinkMap[geometries[k]]
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
