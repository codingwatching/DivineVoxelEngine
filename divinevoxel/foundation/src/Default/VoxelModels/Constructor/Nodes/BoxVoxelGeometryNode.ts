import { VoxelFaceDirections, VoxelFaces } from "@divinevoxel/core/Math";
import { VoxelBoxGeometryNode } from "../../VoxelModel.types";
import { Vec4Array, Vector3Like } from "@amodx/math";
import { Quad } from "@amodx/meshing/Classes/Quad";
import { VoxelMesherDataTool } from "../../../Mesher/Tools/VoxelMesherDataTool";
import { VoxelGeometry } from "../../../Mesher/Geometry/VoxelGeometry";
import {
  BoxVoxelGometryArgs,
  BoxVoxelGometryInputs,
} from "../../Input/Nodes/BoxVoxelGometryInputs";
import { VoxelGeometryLookUp } from "../VoxelGeometryLookUp";
import { GeoemtryNode } from "./GeometryNode";
import { VoxelGeometryConstructor } from "../Register/VoxelGeometryConstructor";
import { GeometryCheckSetIndexes } from "../../../Mesher/Calc/CalcConstants";
import {
  QuadVerticies,
  QuadVerticiesArray,
} from "@amodx/meshing/Geometry.types";

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

export class BoxVoxelGometryNode extends GeoemtryNode {
  quads: Quad[] = [];
  constructor(
    geometry: VoxelGeometryConstructor,
    public data: VoxelBoxGeometryNode
  ) {
    super(geometry);
    const [start, end] = data.points.map((_) => Vector3Like.Create(..._));

    this.faceCount = 6;
    this.vertexIndex = this.faceCount * 4;

    this.quads[VoxelFaces.Top] = Quad.Create(
      [
        [start.x, end.y, start.z],
        [end.x, end.y, end.z],
      ],
      undefined,
      false,
      0
    );

    this.quads[VoxelFaces.Bottom] = Quad.Create(
      [
        [start.x, start.y, start.z],
        [end.x, start.y, end.z],
      ],
      undefined,
      false,
      1
    );

    this.quads[VoxelFaces.North] = Quad.Create(
      [
        [start.x, start.y, end.z],
        [end.x, end.y, end.z],
      ],
      undefined,
      false,
      1
    );

    this.quads[VoxelFaces.South] = Quad.Create(
      [
        [start.x, start.y, start.z],
        [end.x, end.y, start.z],
      ],
      undefined,
      false,
      0
    );

    this.quads[VoxelFaces.East] = Quad.Create(
      [
        [end.x, start.y, start.z],
        [end.x, end.y, end.z],
      ],
      undefined,
      false,
      0
    );

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

  isExposed(face: VoxelFaces, origin: Vector3Like) {
    const direction = VoxelFaceDirections[face];
    const geometry = VoxelGeometryLookUp.getConstructorGeometry(
      origin.x + direction[0],
      origin.y + direction[1],
      origin.z + direction[2]
    );

    if (!geometry) return true;

    if (geometry.length == 1) {
      return (
        this.geomtry.cullIndex.isExposed(
          geometry[0],
          face,
          face,
          this.faceIndex
        ) == 1
      );
    }

    let exposed = 1;
    let gIndex = geometry.length;
    while (gIndex--) {
      exposed = this.geomtry.cullIndex.isExposed(
        geometry[gIndex],
        face,
        face,
        this.faceIndex
      );
      if (!exposed) return false;
    }

    return true;
  }

  determineShading(tool: VoxelMesherDataTool, face: VoxelFaces) {
    const indexes = GeometryCheckSetIndexes[face];
    const geometry = tool.geometryData[face];

    const worldAO = tool.getWorldAO();
    for (let v = 0; v < 4; v++) {
      const vert = QuadVerticiesArray[v];
      for (let set = 0; set < 3; set++) {
        const vertGeo = geometry[vert];
        let i = vertGeo[set].length;
        while (i--) {
          worldAO.vertices[vert] += this.geomtry.aoIndex.isShaded(
            vertGeo[set][i],
            indexes[vert][set],
            face,
            set
          );
          if (worldAO.vertices[vert] >= 3) break;
        }
      }
      worldAO.vertices[vert] = Math.ceil((worldAO.vertices[vert] / 3) * 15);
    }
  }

  add(
    tool: VoxelMesherDataTool,
    origin: Vector3Like,
    args: BoxVoxelGometryArgs
  ) {
    if (
      args[VoxelFaces.Top][ArgIndexes.Enabled] &&
      this.isExposed(VoxelFaces.Top, origin)
    ) {
      tool.calculateFaceData(VoxelFaces.Top);
      this.determineShading(tool, VoxelFaces.Top);
      const faceArgs = args[VoxelFaces.Top];
      const quad = this.quads[VoxelFaces.Top];
      quad.flip = faceArgs[ArgIndexes.Fliped];
      tool.setTexture(faceArgs[ArgIndexes.Texture]);
      mapUvs(faceArgs[ArgIndexes.UVs], quad);
      VoxelGeometry.addQuad(tool, origin, quad);
    }

    if (
      args[VoxelFaces.Bottom][ArgIndexes.Enabled] &&
      this.isExposed(VoxelFaces.Bottom, origin)
    ) {
      tool.calculateFaceData(VoxelFaces.Bottom);
      this.determineShading(tool, VoxelFaces.Bottom);
      const faceArgs = args[VoxelFaces.Bottom];
      const quad = this.quads[VoxelFaces.Bottom];
      quad.flip = faceArgs[ArgIndexes.Fliped];
      tool.setTexture(faceArgs[ArgIndexes.Texture]);
      mapUvs(faceArgs[ArgIndexes.UVs], quad);
      VoxelGeometry.addQuad(tool, origin, quad);
    }

    if (
      args[VoxelFaces.North][ArgIndexes.Enabled] &&
      this.isExposed(VoxelFaces.North, origin)
    ) {
      tool.calculateFaceData(VoxelFaces.North);
      this.determineShading(tool, VoxelFaces.North);
      const faceArgs = args[VoxelFaces.North];
      const quad = this.quads[VoxelFaces.North];
      quad.flip = faceArgs[ArgIndexes.Fliped];
      tool.setTexture(faceArgs[ArgIndexes.Texture]);
      mapUvs(faceArgs[ArgIndexes.UVs], quad);
      VoxelGeometry.addQuad(tool, origin, quad);
    }

    if (
      args[VoxelFaces.South][ArgIndexes.Enabled] &&
      this.isExposed(VoxelFaces.South, origin)
    ) {
      tool.calculateFaceData(VoxelFaces.South);
      this.determineShading(tool, VoxelFaces.South);
      const faceArgs = args[VoxelFaces.South];
      const quad = this.quads[VoxelFaces.South];
      quad.flip = faceArgs[ArgIndexes.Fliped];
      tool.setTexture(faceArgs[ArgIndexes.Texture]);
      mapUvs(faceArgs[ArgIndexes.UVs], quad);
      VoxelGeometry.addQuad(tool, origin, quad);
    }

    if (
      args[VoxelFaces.East][ArgIndexes.Enabled] &&
      this.isExposed(VoxelFaces.East, origin)
    ) {
      tool.calculateFaceData(VoxelFaces.East);
      this.determineShading(tool, VoxelFaces.East);
      const faceArgs = args[VoxelFaces.East];
      const quad = this.quads[VoxelFaces.East];
      quad.flip = faceArgs[ArgIndexes.Fliped];
      tool.setTexture(faceArgs[ArgIndexes.Texture]);
      mapUvs(faceArgs[ArgIndexes.UVs], quad);
      VoxelGeometry.addQuad(tool, origin, quad);
    }

    if (
      args[VoxelFaces.West][ArgIndexes.Enabled] &&
      this.isExposed(VoxelFaces.West, origin)
    ) {
      tool.calculateFaceData(VoxelFaces.West);
      this.determineShading(tool, VoxelFaces.West);
      const faceArgs = args[VoxelFaces.West];
      const quad = this.quads[VoxelFaces.West];
      quad.flip = faceArgs[ArgIndexes.Fliped];
      tool.setTexture(faceArgs[ArgIndexes.Texture]);
      mapUvs(faceArgs[ArgIndexes.UVs], quad);
      VoxelGeometry.addQuad(tool, origin, quad);
    }

    const worldAO = tool.getWorldAO();

    worldAO.setAll(0);
  }
}
