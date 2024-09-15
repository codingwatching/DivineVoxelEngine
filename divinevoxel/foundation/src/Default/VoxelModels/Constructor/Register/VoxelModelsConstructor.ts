import { ShapeStateSchema } from "../../State/Schema/ShapeStateSchema";
import { CondtionalTreeReader } from "../../State/CondiotnalTreeReader";

import { StateTreeReader } from "../../State/StateTreeReader";
import { VoxelModelSyncData } from "../../VoxelModelRules.types";

export class VoxelModelConstructor {
  schema: ShapeStateSchema;
  shapeStateTree: StateTreeReader;
  condtioanlShapeStateTree: CondtionalTreeReader;
  constructor(public data: VoxelModelSyncData) {
    this.schema = new ShapeStateSchema(data.schema);
    this.shapeStateTree = new StateTreeReader(this.schema, data.shapeStateTree);
    this.condtioanlShapeStateTree = new CondtionalTreeReader(
      this.schema,
      data.condiotnalStatements,
      data.condiotnalStateTree
    );
  }

  hasCondiotnalGeometry() {
    this.shapeStateTree;
  }

  getShapeStateLocalGeometry(treeState: number) {
    return this.data.shapeStateMap[treeState];
  }
  getShapeStateGeometry(treeState: number) {
    return this.data.shapeStateGeometryMap[treeState];
  }
  getCondtionalShapeStateLocalGeometry(treeState: number) {
    return this.data.condiotnalShapeStateMap[treeState];
  }
  getCondtionalShapeStateGeometry(treeState: number) {
    return this.data.condiotnalShapeStateGeometryMap[treeState];
  }
}
