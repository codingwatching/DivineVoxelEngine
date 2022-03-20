/**# Builder Manager Worker
 * ---
 * Handles communication with the mesh builders thread.
 */
export class BuilderManager {
    count = 0;
    numBuilders = 0;
    voxelBuildOrder = ["solid", "flora", "fluid", "magma"];
    voxelTypeMap = {
        solid: 0,
        flora: 1,
        fluid: 2,
        magma: 3,
        transparent: -1,
    };
    mainThreadCom;
    builders = [];
    fluidBuilder;
    fluidMeshHasBeenUpdated = false;
    setMainThreadCom(worker) {
        this.mainThreadCom = worker;
    }
    addFluidBuilder(port) {
        this.fluidBuilder = port;
    }
    addBuilder(port) {
        this.builders.push(port);
        this.numBuilders++;
    }
    requestFullChunkBeRemoved(chunkX, chunkZ) {
        this.mainThreadCom.postMessage(["remove-chunk", chunkX, chunkZ]);
        this.fluidBuilder.postMessage([2, chunkX, chunkZ]);
    }
    requestFluidMeshBeReBuilt() {
        if (this.fluidMeshHasBeenUpdated) {
            this.fluidMeshHasBeenUpdated = false;
            this.fluidBuilder.postMessage([1]);
        }
    }
    async requestFullChunkBeBuiltAsync(chunkX, chunkY, chunkZ, template) {
        let i = this.voxelBuildOrder.length;
        while (i--) {
            const type = this.voxelBuildOrder[i];
            const baseTemplate = template[type];
            if (baseTemplate.positionTemplate.length == 0)
                continue;
            if (type == "fluid") {
                this.fluidMeshHasBeenUpdated = true;
                const positions = new Uint16Array(baseTemplate.positionTemplate);
                const faces = new Uint8Array(baseTemplate.faceTemplate);
                const shapes = new Uint16Array(baseTemplate.shapeTemplate);
                const uvs = new Uint16Array(baseTemplate.uvTemplate);
                const colors = new Float32Array(baseTemplate.colorTemplate);
                const light = new Float32Array(baseTemplate.lightTemplate);
                this.fluidBuilder.postMessage([
                    0,
                    chunkX,
                    chunkY,
                    chunkZ,
                    positions.buffer,
                    faces.buffer,
                    shapes.buffer,
                    uvs.buffer,
                    colors.buffer,
                    light.buffer,
                ]),
                    [
                        positions.buffer,
                        faces.buffer,
                        shapes.buffer,
                        uvs.buffer,
                        colors.buffer,
                        light.buffer,
                    ];
            }
            else {
                const positions = new Uint16Array(baseTemplate.positionTemplate);
                const faces = new Uint8Array(baseTemplate.faceTemplate);
                const shapes = new Uint16Array(baseTemplate.shapeTemplate);
                const uvs = new Uint16Array(baseTemplate.uvTemplate);
                const colors = new Float32Array(baseTemplate.colorTemplate);
                const light = new Float32Array(baseTemplate.lightTemplate);
                const ambientOcclusion = new Float32Array(baseTemplate.aoTemplate);
                this.builders[this.count].postMessage([
                    this.voxelTypeMap[type],
                    chunkX,
                    chunkY,
                    chunkZ,
                    positions.buffer,
                    faces.buffer,
                    shapes.buffer,
                    uvs.buffer,
                    colors.buffer,
                    light.buffer,
                    ambientOcclusion.buffer,
                ]),
                    [
                        positions.buffer,
                        faces.buffer,
                        shapes.buffer,
                        uvs.buffer,
                        colors.buffer,
                        light.buffer,
                        ambientOcclusion.buffer,
                    ];
                this.count++;
                if (this.count >= this.numBuilders) {
                    this.count = 0;
                }
            }
        }
    }
    requestFullChunkBeBuilt(chunkX, chunkY, chunkZ, template) {
        let i = this.voxelBuildOrder.length;
        while (i--) {
            const type = this.voxelBuildOrder[i];
            const baseTemplate = template[type];
            if (baseTemplate.positionTemplate.length == 0)
                continue;
            if (type == "fluid") {
                this.fluidMeshHasBeenUpdated = true;
                const positions = new Uint16Array(baseTemplate.positionTemplate);
                const faces = new Uint8Array(baseTemplate.faceTemplate);
                const shapes = new Uint16Array(baseTemplate.shapeTemplate);
                const uvs = new Uint16Array(baseTemplate.uvTemplate);
                const colors = new Float32Array(baseTemplate.colorTemplate);
                const light = new Float32Array(baseTemplate.lightTemplate);
                this.fluidBuilder.postMessage([
                    0,
                    chunkX,
                    chunkY,
                    chunkZ,
                    positions.buffer,
                    faces.buffer,
                    shapes.buffer,
                    uvs.buffer,
                    colors.buffer,
                    light.buffer,
                ]),
                    [
                        positions.buffer,
                        faces.buffer,
                        shapes.buffer,
                        uvs.buffer,
                        colors.buffer,
                        light.buffer,
                    ];
            }
            else {
                const positions = new Uint16Array(baseTemplate.positionTemplate);
                const faces = new Uint8Array(baseTemplate.faceTemplate);
                const shapes = new Uint16Array(baseTemplate.shapeTemplate);
                const uvs = new Uint16Array(baseTemplate.uvTemplate);
                const colors = new Float32Array(baseTemplate.colorTemplate);
                const light = new Float32Array(baseTemplate.lightTemplate);
                const ambientOcclusion = new Float32Array(baseTemplate.aoTemplate);
                this.builders[this.count].postMessage([
                    this.voxelTypeMap[type],
                    chunkX,
                    chunkY,
                    chunkZ,
                    positions.buffer,
                    faces.buffer,
                    shapes.buffer,
                    uvs.buffer,
                    colors.buffer,
                    light.buffer,
                    ambientOcclusion.buffer,
                ]),
                    [
                        positions.buffer,
                        faces.buffer,
                        shapes.buffer,
                        uvs.buffer,
                        colors.buffer,
                        light.buffer,
                        ambientOcclusion.buffer,
                    ];
                this.count++;
                if (this.count >= this.numBuilders) {
                    this.count = 0;
                }
            }
        }
    }
}