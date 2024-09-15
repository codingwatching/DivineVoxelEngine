import { ShapeStateSchema } from "./Schema/ShapeStateSchema";

export class StateTreeReader {
  startingIndex = 0;
  constructor(public schema: ShapeStateSchema, public tree: any[]) {}

  getState(shapeState: number) {
    if (!this.tree.length) return 0;
    let found = -1;
    let index = this.startingIndex;
    let curretNode = this.tree[this.startingIndex];
    while (found == -1) {
      curretNode = curretNode[this.schema.nodes[index].getValue(shapeState)];

      if (typeof curretNode == "number") {
        found = curretNode;
        break;
      }

      index++;

      curretNode = curretNode[index];
    }

    return found;
  }
}
