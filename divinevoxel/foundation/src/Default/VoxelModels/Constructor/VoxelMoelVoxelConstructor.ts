import { VoxelConstructor } from "../../Mesher/Constructors/Voxel/Classes/VoxelConstructor";
import { TextureRegister } from "../../../Textures/TextureRegister";
import { VoxelMesherDataTool } from "../../Mesher/Tools/VoxelMesherDataTool";
import { VoxelModelConstructor } from "./Register/VoxelModelsConstructor";
import { VoxelInputsSyncData } from "../VoxelModelRules.types";
import { VoxelModelConstructorRegister } from "./Register/VoxelModelConstructorRegister";
import { ShapeTool } from "../../../Default/Mesher/Shapes/ShapeTool";

export class VoxelMoelVoxelConstructor extends VoxelConstructor {
  constructor(
    public id: string,
    public model: VoxelModelConstructor,
    public inputMap: VoxelInputsSyncData["voxelInputMap"]
  ) {
    super();
  }

  process(tool: VoxelMesherDataTool) {
    console.warn("BUILDING VOXEL MODEL", this.id);
    const shapeState = tool.voxel.getShapeState();
    const treeState = this.model.shapeStateTree.getState(shapeState);

    const geometries = this.model.getShapeStateGeometry(treeState);
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
  }

  onTexturesRegistered(textureManager: typeof TextureRegister): void {}
}
