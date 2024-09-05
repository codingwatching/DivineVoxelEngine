import { VoxelGeometrySyncData } from "../../VoxelModelRules.types";
import { BoxVoxelGometryNode } from "../Nodes/BoxVoxelGeometryNode";

export class VoxelGeometryConstructor {
  nodes: BoxVoxelGometryNode[] = [];

  constructor(public data: VoxelGeometrySyncData) {
    for (const node of data.nodes) {
      if (node.type == "box") {
        this.nodes.push(new BoxVoxelGometryNode(node));
      }
    }
  }
}
