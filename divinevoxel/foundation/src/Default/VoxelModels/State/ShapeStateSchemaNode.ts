import { ShapeStateSchemaNodeData } from "./State.types";

export class ShapeStateSchemaNode {
  id: string;
  index = 0;
  mask = 0;
  constructor(data: ShapeStateSchemaNodeData) {
    this.id = data.id;
    this.index = data.index;
    this.mask = data.mask << data.index;
  }

  getValue(shapeState: number) {
    return (shapeState & this.mask) >> this.index;
  }
}
