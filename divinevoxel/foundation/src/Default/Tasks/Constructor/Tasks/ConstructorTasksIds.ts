import { ConstructorTasksIds } from "../../../../Contexts/Constructor/ConstructorTasksIds";

export enum DefaultConstructorTasksIds {
  Generate = ConstructorTasksIds.BuildColumn + 1,
  Decorate,
  RGBlightUpdate,
  RGBlightRemove,
  WorldSun,
  SunLightUpdate,
  SunLightRemove,
  AnalyzerPropagation,
  AnalyzerUpdate,
  FlowUpdate,
  FlowRemove,
  ConstructEntity,
  ConstructItem,
  Explosion,
  VoxelErease,
  VoxelPaint,
  VoxelUpdate,
}
