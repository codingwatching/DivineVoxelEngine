import { VoxelConstructor } from "../../Mesher/Constructors/Voxel/Classes/VoxelConstructor";
import { TextureRegister } from "../../../Textures/TextureRegister";
import { VoxelMesherDataTool } from "../../Mesher/Tools/VoxelMesherDataTool";
import { VoxelModelConstructor } from "./Register/VoxelModelsConstructor";
import { VoxelInputsSyncData } from "../VoxelModelRules.types";
import { VoxelModelConstructorRegister } from "./Register/VoxelModelConstructorRegister";
import { ShapeTool } from "../../Mesher/Shapes/ShapeTool";
import { VoxelGeometryLookUp } from "./VoxelGeometryLookUp";
import { VoxelFaces } from "@divinevoxel/core/Math";

export class VoxelModelVoxelConstructor extends VoxelConstructor {
  isModel: true = true;

  geometries: number[][] = [

  ]
  constructor(
    public id: string,
    public model: VoxelModelConstructor,
    public inputMap: VoxelInputsSyncData["voxelInputMap"]
  ) {
    super();



  }

  getState(shapeState: number) {
    return this.model.shapeStateTree.getState(shapeState);
  }


  getGeometryNodes() {
    
  }
  process(tool: VoxelMesherDataTool) {
 
    const treeState = VoxelGeometryLookUp.getConstructorState(
      tool.voxel.x,
      tool.voxel.y,
      tool.voxel.z
    );

    const geometries = this.model.getShapeStateLocalGeometry(treeState);
    const geometriesLength = geometries.length;

    const inputs = this.inputMap[treeState];

    for (let i = 0; i < geometriesLength; i++) {
      const geoInputs = inputs[geometries[i]];
      const geomtry =
        VoxelModelConstructorRegister.geometry[
          this.model.data.geoLinkMap[geometries[i]]
        ];
      const nodesLength = geomtry.nodes.length;
      for (let k = 0; k < nodesLength; k++) {
        geomtry.nodes[k].add(tool, ShapeTool.origin, geoInputs[k]);
      }
    }

    tool.clearCalculatedData();
  }

  onTexturesRegistered(textureManager: typeof TextureRegister): void {}
}
