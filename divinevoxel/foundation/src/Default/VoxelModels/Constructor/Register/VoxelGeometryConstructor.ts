import { VoxelGeometryCulledIndex } from "../../Indexing/VoxelGeometryCulledIndex";
import { VoxelGeometryAOIndex } from "../../Indexing/VoxelGeometryAOIndex";
import { VoxelGeometrySyncData } from "../../VoxelModelRules.types";
import { BoxVoxelGometryNode } from "../Nodes/BoxVoxelGeometryNode";

export class VoxelGeometryConstructor {
  nodes: BoxVoxelGometryNode[] = [];

  cullIndex: VoxelGeometryCulledIndex;
  aoIndex: VoxelGeometryAOIndex;
  constructor(public data: VoxelGeometrySyncData) {
    this.cullIndex = new VoxelGeometryCulledIndex(data.indexes.culling);
    this.aoIndex = new VoxelGeometryAOIndex(data.indexes.ao);

    for (const node of data.nodes) {
      if (node.type == "box") {
        this.nodes.push(new BoxVoxelGometryNode(this, node));
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
