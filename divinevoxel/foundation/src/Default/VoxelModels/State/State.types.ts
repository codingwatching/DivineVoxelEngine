import { VoxelModelRelationsConditionData } from "../VoxelModel.types";

export type ShapeStateSchemaNodeData = {
  id: string;
  type: "shape-state";
  index: number;
  mask: number;
};
export type ShapeRelationsScehmaNodeData = {
  id: string;
  type: "relation";
  conditions: VoxelModelRelationsConditionData[];
};

export type ShapeStateSchemaData =
  | ShapeStateSchemaNodeData
  | ShapeRelationsScehmaNodeData;
