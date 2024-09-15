import { ShapeRelationsScehmaNodeData } from "../State.types";
import { SameVoxelCondition } from "./Conditions/SameVoxelConditions";
import { ShapeStateSchemaRelationsCondition } from "./Conditions/ShapeStateSchemaRelationsCondition";
import { ShapeStateSchema } from "./ShapeStateSchema";

export class ShapeStateRelationsNode {
  id: string;

  conditions: ShapeStateSchemaRelationsCondition[] = [];
  constructor(
    public schema: ShapeStateSchema,
    data: ShapeRelationsScehmaNodeData
  ) {
    this.id = data.id;
    for (const cond of data.conditions) {
      if (cond.type == "same-voxel") {
        this.conditions.push(new SameVoxelCondition(schema, cond));
      }
    }
  }

  getValue() {
    let value = 1;
    const conditionsLength = this.conditions.length;
    for (let i = 0; i < conditionsLength; i++) {

      if (!this.conditions[i].evulate()) {
        value = 0;
        break;
      }
    }
    
    return value;
  }
}
