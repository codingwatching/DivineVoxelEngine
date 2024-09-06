import { ShapeStateSchema } from "../../State/ShapeStateSchema";
import { StateTreeReader } from "../../State/StateTreeReader";
import { VoxelModelSyncData } from "../../VoxelModelRules.types";

export class VoxelModelConstructor {
  schema: ShapeStateSchema;
  shapeStateTree: StateTreeReader;
  constructor(public data: VoxelModelSyncData) {
    this.schema = new ShapeStateSchema(data.schema);
    this.shapeStateTree = new StateTreeReader(this.schema, data.shapeStateTree);
  }

  getShapeStateLocalGeometry(treeState: number) {
    return this.data.shapeStateMap[treeState];
  }
  getShapeStateGeometry(treeState: number) {
    return this.data.shapeStateGeometryMap[treeState];
  }
}
