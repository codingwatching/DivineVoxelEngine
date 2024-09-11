//types
import type { LocationData } from "@divinevoxel/core/Math/index.js";
import type { SetChunkMeshTask } from "@divinevoxel/core/Contexts/Render/Tasks/RenderTasks.types.js";
//objects
import { RenderedSubstances } from "../Rules/RenderedSubstances.js";
import { DivineVoxelEngineConstructor } from "@divinevoxel/core/Contexts/Constructor/DivineVoxelEngineConstructor.js";

//data
import { WorldSpaces } from "@divinevoxel/core/Data/World/WorldSpaces.js";

//tools
import { HeightMapTool } from "../../Tools/Data/WorldData/HeightMapTool.js";
import { BuilderDataTool } from "../Tools/BuilderDataTool.js";
import { ShapeTool } from "../Shapes/ShapeTool.js";
import { VoxelGeometryLookUp } from "../../VoxelModels/Constructor/VoxelGeometryLookUp.js";

export class ChunkProcessor {
  mDataTool = new BuilderDataTool();
  heightMapTool = new HeightMapTool();

  _process(x: number, y: number, z: number, doSecondCheck = false): boolean {
    if (!this.mDataTool.loadInAt(x, y, z)) return false;
    if (!this.mDataTool.isRenderable()) return false;

    let hasVoxel = false;
    this.mDataTool.setSecondary(doSecondCheck);
    if (!doSecondCheck) {
      if (this.mDataTool.hasSecondaryVoxel()) {
        hasVoxel = this._process(x, y, z, true);
      }
    }
    const constructor = this.mDataTool.getConstructor();

    const mesher = RenderedSubstances.meshers.get(
      this.mDataTool.getSubstnaceData().getRendered()
    );

    if (!mesher || !constructor) {
      throw new Error(
        `Could not find mesh or constructor ${this.mDataTool.getId()} | ${this.mDataTool.getName()} | ${
          this.mDataTool.getConstructor()?.id
        }`
      );
    }

    const voxelPOS = WorldSpaces.voxel.getPositionXYZ(x, y, z);
    ShapeTool.origin.x = voxelPOS.x;
    ShapeTool.origin.y = voxelPOS.y;
    ShapeTool.origin.z = voxelPOS.z;

    mesher.voxel.loadInAt(x, y, z);
    mesher.nVoxel.loadInAt(x, y, z);
    ShapeTool.setMesher(mesher);
    constructor.process(mesher);
    mesher.resetVars();
    return true;
  }

  build(location: LocationData, priority = 0) {
    this.heightMapTool.chunk.loadInAtLocation(location);
    this.mDataTool.setDimension(location[0]);
    RenderedSubstances.setDimension(location[0]);

    const [dimension, cx, cy, cz] = location;

    let [minY, maxY] = this.heightMapTool.chunk.getMinMax();

    if (Math.abs(minY) == Infinity && Math.abs(maxY) == Infinity) return;
    VoxelGeometryLookUp.start(dimension, location[1], location[2], location[3]);

    for (let y = minY; y <= maxY; y++) {
      let foundVoxels = false;
      for (let x = 0; x < WorldSpaces.chunk._bounds.x; x++) {
        for (let z = 0; z < WorldSpaces.chunk._bounds.z; z++) {
          if (this._process(x + cx, y + cy, z + cz)) {
            foundVoxels = true;
          }
        }
      }
      this.heightMapTool.chunk.setY(y).setHasVoxels(foundVoxels);
      this.heightMapTool.chunk.setY(y).setDirty(false);
    }
    VoxelGeometryLookUp.stop();

    const chunks = <SetChunkMeshTask>[location, [], priority];
    const trasnfers: any[] = [];
    for (const [substance, mesher] of RenderedSubstances.meshers) {
      if (mesher.getAttribute("position").length == 0) {
        chunks[1].push([substance, false]);
        mesher.resetAll();
        continue;
      }

      const [attributes, buffers] = mesher.getAllAttributes();

      trasnfers.push(...buffers);
      chunks[1].push([substance, [location, attributes]]);
      mesher.resetAll();
    }

    DivineVoxelEngineConstructor.instance.core.threads.parent.runTasks<SetChunkMeshTask>(
      "set-chunk",
      chunks,
      trasnfers
    );
  }
}
