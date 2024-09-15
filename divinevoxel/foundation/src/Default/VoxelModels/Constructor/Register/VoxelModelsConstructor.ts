import { ShapeStateSchema } from "../../State/Schema/ShapeStateSchema";
import { CondtionalTreeReader } from "../../State/CondiotnalTreeReader";

import { StateTreeReader } from "../../State/StateTreeReader";
import { VoxelModelSyncData } from "../../VoxelModelRules.types";

export class VoxelModelConstructor {
  schema: ShapeStateSchema;
  shapeStateTree: StateTreeReader;
  shapeStateDataOverrideTree: StateTreeReader;
  condtioanlShapeStateTree: CondtionalTreeReader;
  constructor(public data: VoxelModelSyncData) {
    this.schema = new ShapeStateSchema(data.schema);
    this.shapeStateTree = new StateTreeReader(
      this.schema,
      0,
      data.shapeStateTree
    );
    this.shapeStateDataOverrideTree = new StateTreeReader(
      this.schema,
      -1,
      data.shapeStateDataOverrideTree
    );

    this.condtioanlShapeStateTree = new CondtionalTreeReader(
      this.schema,
      data.condiotnalStatements,
      data.condiotnalStateTree
    );
  }


}
