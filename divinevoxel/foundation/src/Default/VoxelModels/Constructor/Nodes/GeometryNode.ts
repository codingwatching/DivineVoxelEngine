import { VoxelMesherDataTool } from "../../../Mesher/Tools/VoxelMesherDataTool";
import { BoxVoxelGometryArgs } from "../../Input/Nodes/BoxVoxelGometryInputs";
import { Vector3Like } from "@amodx/math";
import { VoxelGeometryConstructor } from "../Register/VoxelGeometryConstructor";

export abstract class GeoemtryNode {
  faceIndex = -1;
  vertexIndex = -1;

  faceCount = -1;
  vertexCount = -1;

  constructor(public geomtry: VoxelGeometryConstructor) {}

  abstract add(
    tool: VoxelMesherDataTool,
    origin: Vector3Like,
    args: BoxVoxelGometryArgs
  ): void;
}
