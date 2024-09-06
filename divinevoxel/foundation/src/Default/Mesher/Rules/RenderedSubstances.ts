import { VoxelMesherDataTool } from "../Tools/VoxelMesherDataTool.js";

export const RenderedSubstances = {
  meshers: new Map<string, VoxelMesherDataTool>(),

  add(id: string) {
    this.meshers.set(id, new VoxelMesherDataTool());
  },
};
