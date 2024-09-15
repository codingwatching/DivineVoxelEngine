import { ShapeStateSchema } from "./Schema/ShapeStateSchema";

export class StateTreeReader {
  startingIndex = 0;
  constructor(
    public schema: ShapeStateSchema,
    public defaultValue = 0,
    public tree: any[]
  ) {}

  getState(shapeState: number) {
    if (!this.tree.length) return this.defaultValue;
    let found = -1;
    let index = this.startingIndex;
    let curretNode = this.tree[this.startingIndex];

    while (found == -1) {
      curretNode = curretNode[this.schema.nodes[index].getValue(shapeState)];
      if (typeof curretNode == "number") {
        found = curretNode;
        break;
      }

      for (let i = 0; i < curretNode.length; i++) {
        if (curretNode[i]) {
          index = i;
          curretNode = curretNode[index];
        }
      }
    }

    return found;
  }
}
