import { StringPalette } from "@divinevoxel/core/Interfaces/Data/StringPalette";
import {
  VoxelGeometrySyncData,
  VoxelModelSyncData,
} from "../../VoxelModelRules.types";
import { VoxelGeometryConstructor } from "./VoxelGeometryConstructor";
import { VoxelModelConstructor } from "./VoxelModelsConstructor";

export class VoxelModelConstructorRegister {
  static geometryPalette: StringPalette;
  static geometry: VoxelGeometryConstructor[] = [];

  static setGeometryPalette(palette: string[]) {
    this.geometryPalette = new StringPalette(palette);
  }
  static models = new Map<string, VoxelModelConstructor>();

  static registerModels(models: VoxelModelSyncData[]) {
    for (const model of models) {
      this.models.set(model.id, new VoxelModelConstructor(model));
    }
  }
  static registerGeometry(geometries: VoxelGeometrySyncData[]) {
    for (const geometry of geometries) {
      const paletteId = this.geometryPalette.getNumberId(geometry.id);
      this.geometry[paletteId] = new VoxelGeometryConstructor(
        paletteId,
        geometry
      );
    }
  }
}
