import { VoxelFaces } from "@divinevoxel/core/Math";
import { VoxelBoxGeometryNode } from "../../VoxelModel.types";
import { Vec4Array, Vector3Like } from "@amodx/math";
import { Quad } from "@amodx/meshing/Classes/Quad";
import { VoxelMesherDataTool } from "../../../Mesher/Tools/VoxelMesherDataTool";
import { VoxelGeometry } from "../../../Mesher/Geometry/VoxelGeometry";
import { BoxVoxelGometryArgs, BoxVoxelGometryInputs } from "../../Input/Nodes/BoxVoxelGometryInputs";


const mapUvs = (uvs: Vec4Array, quad: Quad) => {
  quad.uvs.vertices[1].x = uvs[2];
  quad.uvs.vertices[1].y = uvs[3];
  quad.uvs.vertices[2].x = uvs[0];
  quad.uvs.vertices[2].y = uvs[3];
  quad.uvs.vertices[3].x = uvs[0];
  quad.uvs.vertices[3].y = uvs[1];
  quad.uvs.vertices[4].x = uvs[2];
  quad.uvs.vertices[4].y = uvs[1];
};


const ArgIndexes = BoxVoxelGometryInputs.ArgIndexes;

export class BoxVoxelGometryNode {

  quads: Quad[] = [];
  constructor(public data: VoxelBoxGeometryNode) {
    const [start, end] = data.points.map((_) => Vector3Like.Create(..._));

    if (data.faces.top) {
      this.quads[VoxelFaces.Top] = Quad.Create(
        [
          [start.x, end.y, start.z],
          [end.x, end.y, end.z],
        ],
        undefined,
        false,
        0
      );
    }

    if (data.faces.bottom) {
      this.quads[VoxelFaces.Bottom] = Quad.Create(
        [
          [start.x, start.y, start.z],
          [end.x, start.y, end.z],
        ],
        undefined,
        false,
        1
      );
    }

    if (data.faces.north) {
      this.quads[VoxelFaces.North] = Quad.Create(
        [
          [start.x, start.y, start.z],
          [end.x, end.y, start.z],
        ],
        undefined,
        false,
        0
      );
    }

    if (data.faces.south) {
      this.quads[VoxelFaces.South] = Quad.Create(
        [
          [start.x, start.y, end.z],
          [end.x, end.y, end.z],
        ],
        undefined,
        false,
        1
      );
    }

    if (data.faces.east) {
      this.quads[VoxelFaces.East] = Quad.Create(
        [
          [end.x, start.y, start.z],
          [end.x, end.y, end.z],
        ],
        undefined,
        false,
        0
      );
    }

    if (data.faces.west) {
      this.quads[VoxelFaces.West] = Quad.Create(
        [
          [start.x, start.y, start.z],
          [start.x, end.y, end.z],
        ],
        undefined,
        false,
        1
      );
    }
  }

  add(tool: VoxelMesherDataTool, origin: Vector3Like, args: BoxVoxelGometryArgs) {
    if (args[VoxelFaces.Top][ArgIndexes.Enabled]) {
      const faceArgs = args[VoxelFaces.Top];
      const quad = this.quads[VoxelFaces.Top];
      quad.flip = faceArgs[ArgIndexes.Fliped];
      tool.setTexture(faceArgs[ArgIndexes.Texture]);
      mapUvs(faceArgs[ArgIndexes.UVs], quad);
      VoxelGeometry.addQuad(tool, origin, quad);
    }

    if (args[VoxelFaces.Bottom][ArgIndexes.Enabled]) {
      const faceArgs = args[VoxelFaces.Bottom];
      const quad = this.quads[VoxelFaces.Bottom];
      quad.flip = faceArgs[ArgIndexes.Fliped];
      tool.setTexture(faceArgs[ArgIndexes.Texture]);
      mapUvs(faceArgs[ArgIndexes.UVs], quad);
      VoxelGeometry.addQuad(tool, origin, quad);
    }

    if (args[VoxelFaces.North][ArgIndexes.Enabled]) {
      const faceArgs = args[VoxelFaces.North];
      const quad = this.quads[VoxelFaces.North];
      quad.flip = faceArgs[ArgIndexes.Fliped];
      tool.setTexture(faceArgs[ArgIndexes.Texture]);
      mapUvs(faceArgs[ArgIndexes.UVs], quad);
      VoxelGeometry.addQuad(tool, origin, quad);
    }

    if (args[VoxelFaces.South][ArgIndexes.Enabled]) {
      const faceArgs = args[VoxelFaces.South];
      const quad = this.quads[VoxelFaces.South];
      quad.flip = faceArgs[ArgIndexes.Fliped];
      tool.setTexture(faceArgs[ArgIndexes.Texture]);
      mapUvs(faceArgs[ArgIndexes.UVs], quad);
      VoxelGeometry.addQuad(tool, origin, quad);
    }

    if (args[VoxelFaces.East][ArgIndexes.Enabled]) {
      const faceArgs = args[VoxelFaces.East];
      const quad = this.quads[VoxelFaces.East];
      quad.flip = faceArgs[ArgIndexes.Fliped];
      tool.setTexture(faceArgs[ArgIndexes.Texture]);
      mapUvs(faceArgs[ArgIndexes.UVs], quad);
      VoxelGeometry.addQuad(tool, origin, quad);
    }

    if (args[VoxelFaces.West][ArgIndexes.Enabled]) {
      const faceArgs = args[VoxelFaces.West];
      const quad = this.quads[VoxelFaces.West];
      quad.flip = faceArgs[ArgIndexes.Fliped];
      tool.setTexture(faceArgs[ArgIndexes.Texture]);
      mapUvs(faceArgs[ArgIndexes.UVs], quad);
      VoxelGeometry.addQuad(tool, origin, quad);
    }
  }
}
