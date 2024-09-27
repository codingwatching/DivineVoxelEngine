import { VoxelFaceCullResultsIndex } from "../../Indexing/VoxelFaceCullResultsIndex";
import { VoxelAOResultsIndex } from "../../Indexing/VoxelAOResultsIndex";
import { VoxelGeometrySyncData } from "../../VoxelModelRules.types";
import { BoxVoxelGometryNode } from "../Nodes/BoxVoxelGeometryNode";

export class VoxelGeometryConstructor {
  nodes: BoxVoxelGometryNode[] = [];

  cullIndex: VoxelFaceCullResultsIndex;
  aoIndex: VoxelAOResultsIndex;
  constructor(
    public geometryPaletteId: number,
    public data: VoxelGeometrySyncData
  ) {
    this.cullIndex = new VoxelFaceCullResultsIndex(data.cullIndex);
    this.aoIndex = new VoxelAOResultsIndex(data.aoIndex);

    for (const node of data.nodes) {
      if (node.type == "box") {
        this.nodes.push(new BoxVoxelGometryNode(geometryPaletteId, this, node));
      }
    }
    let faceCount = 0;
    let vertexCount = 0;
    for (const node of this.nodes) {
      node.faceIndex = faceCount;
      node.vertexIndex = vertexCount;
      faceCount += node.faceCount;
      vertexCount += node.vertexCount;
    }
  }
}
