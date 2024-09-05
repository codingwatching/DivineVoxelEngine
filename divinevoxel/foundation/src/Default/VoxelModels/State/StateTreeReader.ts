import { ShapeStateSchema } from "./ShapeStateSchema";

export class StateTreeReader {
  startingIndex = 0;
  constructor(public schema: ShapeStateSchema, public tree: any[]) {}

  getState(shapeState: number) {
    let found = -1;
    this.tree[this.startingIndex];

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
