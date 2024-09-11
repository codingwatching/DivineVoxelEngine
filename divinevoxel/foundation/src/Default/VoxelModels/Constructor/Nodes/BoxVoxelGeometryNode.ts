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
import {
  GeometryCheckSetIndexes,
  getInterpolationValue,
  getVertexWeights,
  shouldCauseFlip,
} from "../../../Mesher/Calc/CalcConstants";
import {
  QuadVerticies,
  QuadVerticiesArray,
} from "@amodx/meshing/Geometry.types";
import { LightData } from "../../../../Data/LightData";

const mapUvs = (uvs: Vec4Array, quad: Quad) => {
  //1
  quad.uvs.vertices[0].x = uvs[2];
  quad.uvs.vertices[0].y = uvs[3];
  //2
  quad.uvs.vertices[1].x = uvs[0];
  quad.uvs.vertices[1].y = uvs[3];
  //3
  quad.uvs.vertices[2].x = uvs[0];
  quad.uvs.vertices[2].y = uvs[1];
  //4
  quad.uvs.vertices[3].x = uvs[2];
  quad.uvs.vertices[3].y = uvs[1];
};

const ArgIndexes = BoxVoxelGometryInputs.ArgIndexes;

type QuadVertexWeights = [Vec4Array, Vec4Array, Vec4Array, Vec4Array];

const addQuadWeights = (
  quad: Quad,
  direction: VoxelFaces
): QuadVertexWeights => {
  const returnArray: QuadVertexWeights = [] as any;
  for (const vertex of QuadVerticiesArray) {
    const { x, y, z } = quad.positions.vertices[vertex];
    returnArray[vertex] = getVertexWeights(direction, x, y, z);
  }

  return returnArray;
};

export class BoxVoxelGometryNode extends GeoemtryNode {
  quads: Quad[] = [];
  vertexWeights: [Vec4Array, Vec4Array, Vec4Array, Vec4Array][] = [];
  constructor(
    geometry: VoxelGeometryConstructor,
    public data: VoxelBoxGeometryNode
  ) {
    super(geometry);
    const [start, end] = data.points.map((_) => Vector3Like.Create(..._));

    this.faceCount = 6;
    this.vertexIndex = this.faceCount * 4;

    this.quads[VoxelFaces.Up] = Quad.Create(
      [
        [end.x, end.y, end.z],
        [start.x, end.y, end.z],
        [start.x, end.y, start.z],
        [end.x, end.y, start.z],
      ],
      undefined,
      false,
      0
    );

    this.vertexWeights[VoxelFaces.Up] = addQuadWeights(
      this.quads[VoxelFaces.Up],
      VoxelFaces.Up
    );

    this.quads[VoxelFaces.Down] = Quad.Create(
      [
        [start.x, start.y, end.z],
        [end.x, start.y, end.z],
        [end.x, start.y, start.z],
        [start.x, start.y, start.z],
      ],
      undefined,
      false,
      0
    );

    this.vertexWeights[VoxelFaces.Down] = addQuadWeights(
      this.quads[VoxelFaces.Down],
      VoxelFaces.Down
    );

    this.quads[VoxelFaces.North] = Quad.Create(
      [
        [start.x, end.y, end.z],
        [end.x, end.y, end.z],
        [end.x, start.y, end.z],
        [start.x, start.y, end.z],
      ],
      undefined,
      false,
      0
    );

    this.vertexWeights[VoxelFaces.North] = addQuadWeights(
      this.quads[VoxelFaces.North],
      VoxelFaces.North
    );

    this.quads[VoxelFaces.South] = Quad.Create(
      [
        [end.x, end.y, start.z],
        [start.x, end.y, start.z],
        [start.x, start.y, start.z],
        [end.x, start.y, start.z],
      ],
      undefined,
      false,
      0
    );

    this.vertexWeights[VoxelFaces.South] = addQuadWeights(
      this.quads[VoxelFaces.South],
      VoxelFaces.South
    );

    this.quads[VoxelFaces.East] = Quad.Create(
      [
        [end.x, end.y, end.z],
        [end.x, end.y, start.z],
        [end.x, start.y, start.z],
        [end.x, start.y, end.z],
      ],
      undefined,
      false,
      0
    );

    this.vertexWeights[VoxelFaces.East] = addQuadWeights(
      this.quads[VoxelFaces.East],
      VoxelFaces.East
    );

    this.quads[VoxelFaces.West] = Quad.Create(
      [
        [start.x, end.y, start.z],
        [start.x, end.y, end.z],
        [start.x, start.y, end.z],
        [start.x, start.y, start.z],
      ],
      undefined,
      false,
      0
    );

    this.vertexWeights[VoxelFaces.West] = addQuadWeights(
      this.quads[VoxelFaces.West],
      VoxelFaces.West
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
    const lightData = tool.lightData[face];

    const worldLight = tool.getWorldLight();
    const worldAO = tool.getWorldAO();
    for (let v = 0 as QuadVerticies; v < 4; v++) {
      worldAO.vertices[v] = 0;

      worldLight.vertices[v] = getInterpolationValue(
        lightData as Vec4Array,
        this.vertexWeights[face][v]
      );
      const vertGeo = geometry[v];
      const aoIndex = indexes[v];
      for (let set = 0; set < 3; set++) {
        const length = vertGeo[set].length;
        for (let i = 0; i < length; i++) {
          if (
            this.geomtry.aoIndex.isShaded(
              vertGeo[set][i],
              aoIndex[set],
              face,
              v
            )
          ) {
            worldAO.vertices[v] = 1;
            break;
          }
        }
      }
    }
  }

  add(
    tool: VoxelMesherDataTool,
    origin: Vector3Like,
    args: BoxVoxelGometryArgs
  ) {
    const worldAO = tool.getWorldAO();
    const worldLight = tool.getWorldLight();

    if (
      args[VoxelFaces.Up][ArgIndexes.Enabled] &&
      this.isExposed(VoxelFaces.Up, tool.voxel)
    ) {
      tool.calculateFaceData(VoxelFaces.Up);
      this.determineShading(tool, VoxelFaces.Up);
      const faceArgs = args[VoxelFaces.Up];
      const quad = this.quads[VoxelFaces.Up];
      let faceFlip =
        shouldCauseFlip(
          worldAO.vertices[0],
          worldAO.vertices[1],
          worldAO.vertices[2],
          worldAO.vertices[3]
        ) ||
        shouldCauseFlip(
          LightData.getS(worldLight.vertices[0]),
          LightData.getS(worldLight.vertices[1]),
          LightData.getS(worldLight.vertices[2]),
          LightData.getS(worldLight.vertices[3])
        );
      quad.flip = faceFlip || faceArgs[ArgIndexes.Fliped];
      tool.setTexture(faceArgs[ArgIndexes.Texture]);
      mapUvs(faceArgs[ArgIndexes.UVs], quad);
      VoxelGeometry.addQuad(tool, origin, quad);
    }

    if (
      args[VoxelFaces.Down][ArgIndexes.Enabled] &&
      this.isExposed(VoxelFaces.Down, tool.voxel)
    ) {
      tool.calculateFaceData(VoxelFaces.Down);
      this.determineShading(tool, VoxelFaces.Down);
      const faceArgs = args[VoxelFaces.Down];
      const quad = this.quads[VoxelFaces.Down];
      let faceFlip =
        shouldCauseFlip(
          worldAO.vertices[0],
          worldAO.vertices[1],
          worldAO.vertices[2],
          worldAO.vertices[3]
        ) ||
        shouldCauseFlip(
          LightData.getS(worldLight.vertices[0]),
          LightData.getS(worldLight.vertices[1]),
          LightData.getS(worldLight.vertices[2]),
          LightData.getS(worldLight.vertices[3])
        );
      quad.flip = faceFlip || faceArgs[ArgIndexes.Fliped];
      tool.setTexture(faceArgs[ArgIndexes.Texture]);
      mapUvs(faceArgs[ArgIndexes.UVs], quad);
      VoxelGeometry.addQuad(tool, origin, quad);
    }

    if (
      args[VoxelFaces.North][ArgIndexes.Enabled] &&
      this.isExposed(VoxelFaces.North, tool.voxel)
    ) {
      tool.calculateFaceData(VoxelFaces.North);
      this.determineShading(tool, VoxelFaces.North);
      const faceArgs = args[VoxelFaces.North];
      const quad = this.quads[VoxelFaces.North];
      let faceFlip =
        shouldCauseFlip(
          worldAO.vertices[0],
          worldAO.vertices[1],
          worldAO.vertices[2],
          worldAO.vertices[3]
        ) ||
        shouldCauseFlip(
          LightData.getS(worldLight.vertices[0]),
          LightData.getS(worldLight.vertices[1]),
          LightData.getS(worldLight.vertices[2]),
          LightData.getS(worldLight.vertices[3])
        );
      quad.flip = faceFlip || faceArgs[ArgIndexes.Fliped];
      tool.setTexture(faceArgs[ArgIndexes.Texture]);
      mapUvs(faceArgs[ArgIndexes.UVs], quad);
      VoxelGeometry.addQuad(tool, origin, quad);
    }

    if (
      args[VoxelFaces.South][ArgIndexes.Enabled] &&
      this.isExposed(VoxelFaces.South, tool.voxel)
    ) {
      tool.calculateFaceData(VoxelFaces.South);
      this.determineShading(tool, VoxelFaces.South);
      const faceArgs = args[VoxelFaces.South];
      const quad = this.quads[VoxelFaces.South];
      let faceFlip =
        shouldCauseFlip(
          worldAO.vertices[0],
          worldAO.vertices[1],
          worldAO.vertices[2],
          worldAO.vertices[3]
        ) ||
        shouldCauseFlip(
          LightData.getS(worldLight.vertices[0]),
          LightData.getS(worldLight.vertices[1]),
          LightData.getS(worldLight.vertices[2]),
          LightData.getS(worldLight.vertices[3])
        );
      quad.flip = faceFlip || faceArgs[ArgIndexes.Fliped];
      tool.setTexture(faceArgs[ArgIndexes.Texture]);
      mapUvs(faceArgs[ArgIndexes.UVs], quad);
      VoxelGeometry.addQuad(tool, origin, quad);
    }

    if (
      args[VoxelFaces.East][ArgIndexes.Enabled] &&
      this.isExposed(VoxelFaces.East, tool.voxel)
    ) {
      tool.calculateFaceData(VoxelFaces.East);
      this.determineShading(tool, VoxelFaces.East);
      const faceArgs = args[VoxelFaces.East];
      const quad = this.quads[VoxelFaces.East];
      let faceFlip =
        shouldCauseFlip(
          worldAO.vertices[0],
          worldAO.vertices[1],
          worldAO.vertices[2],
          worldAO.vertices[3]
        ) ||
        shouldCauseFlip(
          LightData.getS(worldLight.vertices[0]),
          LightData.getS(worldLight.vertices[1]),
          LightData.getS(worldLight.vertices[2]),
          LightData.getS(worldLight.vertices[3])
        );
      quad.flip = faceFlip || faceArgs[ArgIndexes.Fliped];
      tool.setTexture(faceArgs[ArgIndexes.Texture]);
      mapUvs(faceArgs[ArgIndexes.UVs], quad);
      VoxelGeometry.addQuad(tool, origin, quad);
    }

    if (
      args[VoxelFaces.West][ArgIndexes.Enabled] &&
      this.isExposed(VoxelFaces.West, tool.voxel)
    ) {
      tool.calculateFaceData(VoxelFaces.West);
      this.determineShading(tool, VoxelFaces.West);
      const faceArgs = args[VoxelFaces.West];
      const quad = this.quads[VoxelFaces.West];
      let faceFlip =
        shouldCauseFlip(
          worldAO.vertices[0],
          worldAO.vertices[1],
          worldAO.vertices[2],
          worldAO.vertices[3]
        ) ||
        shouldCauseFlip(
          LightData.getS(worldLight.vertices[0]),
          LightData.getS(worldLight.vertices[1]),
          LightData.getS(worldLight.vertices[2]),
          LightData.getS(worldLight.vertices[3])
        );
      quad.flip = faceFlip || faceArgs[ArgIndexes.Fliped];
      tool.setTexture(faceArgs[ArgIndexes.Texture]);
      mapUvs(faceArgs[ArgIndexes.UVs], quad);
      VoxelGeometry.addQuad(tool, origin, quad);
    }

    worldLight.setAll(0);
    worldAO.setAll(0);
  }
}
