import { ShapeRelationsScehmaNodeData } from "./State.types";

export class ShapeStateRelationsNode {
  id: string;

  constructor(data: ShapeRelationsScehmaNodeData) {
    this.id = data.id;
  }

  getValue() {
    return 0;
  }
}
