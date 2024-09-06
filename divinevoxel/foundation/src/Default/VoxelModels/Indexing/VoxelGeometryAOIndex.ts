import { VoxelFaces } from "@divinevoxel/core/Math";
import { BinaryArrays } from "@amodx/binary/Util/BinaryArrays";
import { Flat3DIndex } from "@amodx/math";
export type VoxelGeometryAOIndexData = {
  buffer: SharedArrayBuffer;
  headerSize: number;
  resultsSize: number;
};

export class VoxelGeometryAOIndex {
  static flatIndex = Flat3DIndex.GetXYZOrder();
  static getIndex(x: number, y: number, z: number) {
    return this.flatIndex.getIndexXYZ(x + 1, y + 1, z + 1);
  }
  view: DataView;

  constructor(public data: VoxelGeometryAOIndexData) {
    this.view = new DataView(data.buffer);
  }

  getByteIndex(otherId: number, index: number, faceDirection: VoxelFaces) {
    return (
      this.data.headerSize +
      otherId * this.data.resultsSize * VoxelGeometryAOIndex.flatIndex.size +
      index * this.data.resultsSize +
      this.view.getUint16(faceDirection * 2)
    );
  }

  isShaded(
    otherId: number,
    index: number,
    faceDirection: VoxelFaces,
    vertexIndex: number
  ) {
    return BinaryArrays.getBitArrayIndex(
      this.view,
      this.getByteIndex(otherId, index, faceDirection),
      vertexIndex
    );
  }

  setIShaded(
    otherId: number,
    index: number,
    faceDirection: VoxelFaces,
    vertexIndex: number,
    value = 1
  ) {
    BinaryArrays.setBitArrayIndex(
      this.view,
      this.getByteIndex(otherId, index, faceDirection),
      vertexIndex,
      value
    );
  }
}
VoxelGeometryAOIndex.flatIndex.setBounds(3, 3, 3);
