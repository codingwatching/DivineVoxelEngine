export class Dreamestone {
    voxelHelper;
    topUV;
    bottomUV;
    sideUV;
    data = {
        name: "Dream Stone",
        shapeId: "Box",
        id: "dve:dreamstone",
        substance: "solid",
        defaultState: ["dve:dreamstone", 0],
    };
    hooks = {};
    trueShapeId = 0;
    constructor(voxelHelper) {
        this.voxelHelper = voxelHelper;
        this.topUV = this.voxelHelper.textureManager.getTextureUV("solid", "dreamstone", "grassy-top");
        this.bottomUV = this.voxelHelper.textureManager.getTextureUV("solid", "dreamstone");
        this.sideUV = this.voxelHelper.textureManager.getTextureUV("solid", "dreamstone", "grassy-side");
    }
    getShapeId(voxelData) {
        return this.trueShapeId;
    }
    getUVs(uvs, chunkX, chunkZ, voxelExposedFaceEncodedBit, voxelData) {
        // return;
        let topUV = this.voxelHelper.textureManager.getTextureUV("solid", "dreamstone", "grassy-top");
        let bottomUV = this.voxelHelper.textureManager.getTextureUV("solid", "dreamstone");
        let sideUV = this.voxelHelper.textureManager.getTextureUV("solid", "dreamstone", "grassy-side");
        if (this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "top")) {
            uvs.push(topUV);
        }
        else {
            sideUV = bottomUV;
        }
        if (this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "bottom")) {
            uvs.push(bottomUV);
        }
        if (this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "north")) {
            uvs.push(sideUV);
        }
        if (this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "south")) {
            uvs.push(sideUV);
        }
        if (this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "east")) {
            uvs.push(sideUV);
        }
        if (this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "west")) {
            uvs.push(sideUV);
        }
    }
    getAO(data) {
        // return;
        this.voxelHelper.calculateVoxelAO(data, this);
    }
    getLight(data) {
        // return;
        this.voxelHelper.calculateVoxelLight(data, this);
    }
    process(data) {
        if (data.exposedFaces[0]) {
            data.sunLightTemplate.push(0b1111, 0b1111, 0b1111, 0b1111);
        }
        if (data.exposedFaces[1]) {
            data.sunLightTemplate.push(0b1111, 0b1111, 0b1111, 0b1111);
        }
        if (data.exposedFaces[2]) {
            data.sunLightTemplate.push(0b1111, 0b1111, 0b1111, 0b1111);
        }
        if (data.exposedFaces[3]) {
            data.sunLightTemplate.push(0b1111, 0b1111, 0b1111, 0b1111);
        }
        if (data.exposedFaces[4]) {
            data.sunLightTemplate.push(0b1111, 0b1111, 0b1111, 0b1111);
        }
        if (data.exposedFaces[5]) {
            data.sunLightTemplate.push(0b1111, 0b1111, 0b1111, 0b1111);
        }
        return;
        let topUV = this.topUV;
        let sideUV = this.sideUV;
        let bottomUV = this.bottomUV;
        if (data.exposedFaces[0]) {
            data.uvTemplate.push(topUV);
        }
        else {
            sideUV = bottomUV;
        }
        if (data.exposedFaces[1]) {
            data.uvTemplate.push(bottomUV);
        }
        if (data.exposedFaces[2]) {
            data.uvTemplate.push(sideUV);
        }
        if (data.exposedFaces[3]) {
            data.uvTemplate.push(sideUV);
        }
        if (data.exposedFaces[4]) {
            data.uvTemplate.push(sideUV);
        }
        if (data.exposedFaces[5]) {
            data.uvTemplate.push(sideUV);
        }
        this.voxelHelper.processVoxelLight(data, this);
    }
}