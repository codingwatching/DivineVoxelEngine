/// <reference types="babylonjs" />
import type { EngineSettingsData } from "Meta/Global/EngineSettings.types";
import { MaterialCreateData } from "Meta/Render/Materials/Material.types.js";
export declare const FluidMaterial: {
    material: BABYLON.ShaderMaterial | null;
    doEffects: boolean;
    time: number;
    getMaterial(): BABYLON.ShaderMaterial | null;
    updateFogOptions(data: BABYLON.Vector4): void;
    updateEffects(doEffects: boolean): void;
    setSunLightLevel(level: number): void;
    setBaseLevel(level: number): void;
    updateMaterialSettings(settings: EngineSettingsData): void;
    createMaterial(data: MaterialCreateData): BABYLON.ShaderMaterial;
    runEffects(): void;
};