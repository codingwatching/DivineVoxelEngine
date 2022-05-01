export class VoxelManager {
    DVEW;
    voxels = {};
    shapeMap = {};
    shapeMapHasBeenSet = false;
    fluidShapeMap = {};
    fluidShapeMapHasBeenSet = false;
    constructor(DVEW) {
        this.DVEW = DVEW;
    }
    setShapeMap(shapeMap) {
        this.shapeMap = shapeMap;
        this.shapeMapHasBeenSet = true;
        for (const voxelId of Object.keys(this.voxels)) {
            const voxel = this.voxels[voxelId];
            if (voxel.data.substance !== "fluid") {
                voxel.trueShapeId = this.shapeMap[voxel.data.shapeId];
            }
        }
    }
    setFluidShapeMap(shapeMap) {
        this.fluidShapeMap = shapeMap;
        this.fluidShapeMapHasBeenSet = true;
        for (const voxelId of Object.keys(this.voxels)) {
            const voxel = this.voxels[voxelId];
            if (voxel.data.substance === "fluid") {
                voxel.trueShapeId = this.fluidShapeMap[voxel.data.shapeId];
            }
        }
    }
    shapMapIsSet() {
        return this.shapeMapHasBeenSet;
    }
    fluidShapMapIsSet() {
        return this.fluidShapeMapHasBeenSet;
    }
    getVoxel(id) {
        return this.voxels[id];
    }
    registerVoxelData(voxel) {
        this.voxels[voxel.data.id] = voxel;
        if (this.DVEW.engineSettings.settings.world?.voxelPaletteMode == "global") {
            this.DVEW.worldGeneration.voxelPalette.registerVoxelForGlobalPalette(voxel);
        }
        if (this.DVEW.engineSettings.settings.world?.voxelPaletteMode == "per-region") {
            this.DVEW.worldGeneration.voxelPalette.registerVoxelForPerRegionVoxelPalette(voxel);
        }
    }
    runVoxelHookForAll(hook) {
        for (const voxelID of Object.keys(this.voxels)) {
            const voxel = this.voxels[voxelID];
            if (!voxel.hooks[hook])
                continue;
            voxel.hooks[hook]();
        }
    }
}