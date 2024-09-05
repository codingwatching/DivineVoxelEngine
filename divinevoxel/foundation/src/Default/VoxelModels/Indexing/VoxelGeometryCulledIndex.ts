import { VoxelFaces } from "@divinevoxel/core/Math";
import { BinaryArrays } from "@amodx/binary/Util/BinaryArrays";
export type VoxelGeometryCulledIndexData = {
  buffer: SharedArrayBuffer;
  headerSize: number;
  resultsSize: number;
};

export class VoxelGeometryCulledIndex {
  view: DataView;
  constructor(public data: VoxelGeometryCulledIndexData) {
    this.view = new DataView(data.buffer);
  }

  getByteIndex(
    otherId: number,
    otherDirection: VoxelFaces,
    faceDirection: VoxelFaces
  ) {
    return (
      this.data.headerSize +
      otherId * this.data.resultsSize * 6 +
      otherDirection * this.data.resultsSize +
      this.view.getUint16(faceDirection * 2)
    );
  }

  isExposed(
    otherId: number,
    otherDirection: VoxelFaces,
    faceDirection: VoxelFaces,
    faceIndex: number
  ) {
    return BinaryArrays.getBitArrayIndex(
      this.view,
      this.getByteIndex(otherId, otherDirection, faceDirection),
      faceIndex
    );
  }

  setIsExposed(
    otherId: number,
    otherDirection: VoxelFaces,
    faceDirection: VoxelFaces,
    faceIndex: number,
    value = 1
  ) {
    BinaryArrays.setBitArrayIndex(
      this.view,
      this.getByteIndex(otherId, otherDirection, faceDirection),
      faceIndex,
      value
    );
  }
}
