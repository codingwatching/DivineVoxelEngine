import { ShapeStateRelationsNode } from "./ShapeStateRelationsNode";
import { ShapeStateSchemaNode } from "./ShapeStateSchemaNode";
import { ShapeStateSchemaData } from "./State.types";

export class ShapeStateSchema {
  nodes: (ShapeStateSchemaNode | ShapeStateRelationsNode)[] = [];
  constructor(schema: ShapeStateSchemaData[]) {
    for (const node of schema) {
      if (node.type == "shape-state") {
        this.nodes.push(new ShapeStateSchemaNode(node));
      }

      if (node.type == "relation") {
        this.nodes.push(new ShapeStateRelationsNode(node));
      }
    }
  }
}
