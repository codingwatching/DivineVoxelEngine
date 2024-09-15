import { SameVoxelRelationsConditionData } from "Default/VoxelModels/VoxelModel.types";
import { ShapeStateSchemaRelationsCondition } from "./ShapeStateSchemaRelationsCondition";
import { ShapeStateSchema } from "../ShapeStateSchema";
import { Vector3Like } from "@amodx/math";

export class SameVoxelCondition extends ShapeStateSchemaRelationsCondition {
  constructor(
    schema: ShapeStateSchema,
    public data: SameVoxelRelationsConditionData
  ) {
    super(schema);
  }

  evulate(): boolean {
    if (
      !this.schema.nVoxel.loadInAt(
        this.schema.voxel.x + this.data.direction[0],
        this.schema.voxel.y + this.data.direction[1],
        this.schema.voxel.z + this.data.direction[2]
      )
    )
      return false;
    return this.schema.voxel.getId() == this.schema.nVoxel.getId();
  }
}
