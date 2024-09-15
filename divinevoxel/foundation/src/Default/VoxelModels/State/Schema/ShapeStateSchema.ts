import { ShapeStateRelationsNode } from "./ShapeStateRelationsNode";
import { ShapeStateSchemaNode } from "./ShapeStateSchemaNode";
import { ShapeStateSchemaData } from "../State.types";
import { DataTool } from "../../../Tools/Data/DataTool";

export class ShapeStateSchema {
  voxel = new DataTool();
  nVoxel = new DataTool();
  nodes: (ShapeStateSchemaNode | ShapeStateRelationsNode)[] = [];
  constructor(schema: ShapeStateSchemaData[]) {
    for (const node of schema) {
      if (node.type == "shape-state") {
        this.nodes.push(new ShapeStateSchemaNode(node));
      }

      if (node.type == "relation") {
        this.nodes.push(new ShapeStateRelationsNode(this,node));
      }
    }
  }
}
