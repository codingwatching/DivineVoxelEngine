import { VoxelResultsIndex } from "../../Indexing/VoxelResultsIndex";
import { VoxelGeometrySyncData } from "../../VoxelModelRules.types";
import { BoxVoxelGometryNode } from "../Nodes/BoxVoxelGeometryNode";

export class VoxelGeometryConstructor {
  nodes: BoxVoxelGometryNode[] = [];

  cullIndex: VoxelResultsIndex;
  aoIndex: VoxelResultsIndex;
  constructor(
    public geometryPaletteId: number,
    public data: VoxelGeometrySyncData
  ) {
    this.cullIndex = new VoxelResultsIndex(data.cullIndex);
    this.aoIndex = new VoxelResultsIndex(data.aoIndex);

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
