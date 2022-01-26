export class WorldGen {
    DVEW;
    constructor(DVEW) {
        this.DVEW = DVEW;
    }
    chunkDepth = 16;
    chunkWidth = 16;
    chunkHeight = 256;
    renderDistance = 20;
    generateChunk(chunkX, chunkZ, type = "default") {
        let debugBox = this.DVEW.worldGeneration.getVoxelIdFromGlobalPalette("dve:debugbox:defualt");
        let dreamstone = this.DVEW.worldGeneration.getVoxelIdFromGlobalPalette("dve:dreamstone:defualt");
        let dreamStonePillar = this.DVEW.worldGeneration.getVoxelIdFromGlobalPalette("dve:dreamstonepillar:defualt");
        let dreamGrasss = this.DVEW.worldGeneration.getVoxelIdFromGlobalPalette("dve:dreamgrass:defualt");
        let liquidDreamEther = this.DVEW.worldGeneration.getVoxelIdFromGlobalPalette("dve:liquiddreamether:defualt");
        const liquidDreamEtherVoxel = [liquidDreamEther, 1, 0xFFFFFFFF];
        const dreamStoneVovxel = [dreamstone, 1, 0xFFFFFFFF];
        const returnChunk = [];
        if (type == "fluid") {
            let baseY = 0;
            let maxY = 31;
            for (let x = 0; x < +this.chunkWidth; x++) {
                for (let z = 0; z < this.chunkDepth; z++) {
                    for (let y = 0; y < this.chunkHeight; y++) {
                        if (y > baseY && y <= maxY) {
                            returnChunk[x] ??= [];
                            returnChunk[x][z] ??= [];
                            returnChunk[x][z][y] = liquidDreamEtherVoxel;
                        }
                        if (y == baseY) {
                            returnChunk[x] ??= [];
                            returnChunk[x][z] ??= [];
                            returnChunk[x][z][y] = dreamStoneVovxel;
                        }
                    }
                }
            }
        }
        if (type == "pond") {
            let pillarBlock = [dreamStonePillar, 1, 0xFFFFFFFF];
            let baseBlock = [dreamstone, 1, 0xFFFFFFFF];
            let baseY = 31;
            let topY = 50;
            let hole = false;
            for (let x = 0; x < +this.chunkWidth; x++) {
                for (let z = 0; z < this.chunkDepth; z++) {
                    for (let y = 0; y < this.chunkHeight; y++) {
                        if (y < baseY) {
                            returnChunk[x] ??= [];
                            returnChunk[x][z] ??= [];
                            returnChunk[x][z][y] = baseBlock;
                            continue;
                        }
                        if (y == baseY && x > 0 && x < 15 && z > 0 && z < 15) {
                            returnChunk[x] ??= [];
                            returnChunk[x][z] ??= [];
                            returnChunk[x][z][y] = liquidDreamEtherVoxel;
                        }
                        if (y == baseY && x == 0) {
                            returnChunk[x] ??= [];
                            returnChunk[x][z] ??= [];
                            returnChunk[x][z][y] = baseBlock;
                        }
                        if (y == baseY && x == 15) {
                            returnChunk[x] ??= [];
                            returnChunk[x][z] ??= [];
                            returnChunk[x][z][y] = baseBlock;
                        }
                        if (y == baseY && z == 0) {
                            returnChunk[x] ??= [];
                            returnChunk[x][z] ??= [];
                            returnChunk[x][z][y] = baseBlock;
                        }
                        if (y == baseY && z == 15) {
                            returnChunk[x] ??= [];
                            returnChunk[x][z] ??= [];
                            returnChunk[x][z][y] = baseBlock;
                        }
                    }
                }
            }
        }
        if (type == "pillar") {
            let pillarBlock = [dreamStonePillar, 1, 0xFFFFFFFF];
            let baseBlock = [dreamstone, 1, 0xFFFFFFFF];
            let baseY = 31;
            let topY = 50;
            let hole = false;
            for (let x = 0; x < +this.chunkWidth; x++) {
                for (let z = 0; z < this.chunkDepth; z++) {
                    for (let y = 0; y < this.chunkHeight; y++) {
                        if (y < baseY) {
                            returnChunk[x] ??= [];
                            returnChunk[x][z] ??= [];
                            returnChunk[x][z][y] = baseBlock;
                        }
                        if (y == topY) {
                            returnChunk[x] ??= [];
                            returnChunk[x][z] ??= [];
                            returnChunk[x][z][y] = pillarBlock;
                        }
                        if (y >= baseY && y < topY) {
                            if (x % 15 == 0 || z % 15 == 0) {
                                if (x > 0) {
                                    if (x % 2 == 0)
                                        continue;
                                }
                                if (z > 0) {
                                    if (z % 2 == 0)
                                        continue;
                                }
                                returnChunk[x] ??= [];
                                returnChunk[x][z] ??= [];
                                returnChunk[x][z][y] = pillarBlock;
                            }
                        }
                    }
                }
            }
        }
        if (type == "default") {
            let topBlock = [dreamstone, 1, 0xFFFFFFFF];
            let baseBlock = [dreamStonePillar, 1, 0xFFFFFFFF];
            let topY = 31;
            let groundY = 31;
            let hole = false;
            if (Math.abs(chunkX) == 16 && Math.abs(chunkZ) == 16) {
                topY = 42;
                hole = true;
            }
            for (let x = 0; x < +this.chunkWidth; x++) {
                for (let z = 0; z < this.chunkDepth; z++) {
                    for (let y = 0; y < this.chunkHeight; y++) {
                        if (hole) {
                            if (y > 30 && y <= topY - 4) {
                                if (x > 4 && x < 10) {
                                    continue;
                                }
                                if (z > 4 && z < 10) {
                                    continue;
                                }
                            }
                        }
                        if (y < groundY) {
                            returnChunk[x] ??= [];
                            returnChunk[x][z] ??= [];
                            returnChunk[x][z][y] = baseBlock;
                            continue;
                        }
                        if (hole) {
                            if (y < topY) {
                                returnChunk[x] ??= [];
                                returnChunk[x][z] ??= [];
                                returnChunk[x][z][y] = topBlock;
                            }
                        }
                    }
                }
            }
            returnChunk[3][3][topY] = liquidDreamEtherVoxel;
            returnChunk[5][5][topY] = [dreamGrasss, 1, 0xFFFFFFFF];
            returnChunk[7][7][topY] = [debugBox, 1, 0xFFFFFFFF];
            returnChunk[7][7][topY + 1] = [debugBox, 1, 0xFFFFFFFF];
            returnChunk[7][7][topY + 2] = [debugBox, 1, 0xFFFFFFFF];
            returnChunk[7][7][topY + 3] = [debugBox, 1, 0xFFFFFFFF];
            returnChunk[0][0][topY] = [dreamstone, 1, 0xFFFFFFFF];
            returnChunk[0][15][topY] = [dreamstone, 1, 0xFFFFFFFF];
            returnChunk[15][15][topY] = [dreamstone, 1, 0xFFFFFFFF];
            returnChunk[15][0][topY] = [dreamstone, 1, 0xFFFFFFFF];
        }
        return {
            voxels: returnChunk,
            maxMinHeight: [],
            isEmpty: false,
            heightMap: [],
        };
    }
}