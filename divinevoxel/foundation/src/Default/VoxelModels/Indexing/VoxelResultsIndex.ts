import { BinaryArrays } from "@amodx/binary/Util/BinaryArrays";
import { VoxelRelativeCubeIndex } from "./VoxelRelativeCubeIndex";
import { Vec3Array } from "@amodx/math";
export type VoxelResultsIndexData = {
  buffer: SharedArrayBuffer;
  resultsSize: number;
};

export class VoxelResultsIndex {
  view: DataView;

  constructor(public data: VoxelResultsIndexData) {
    this.view = new DataView(data.buffer);
  }

  getByteIndex(otherId: number, directionIndex: number) {
    return (
      otherId * this.data.resultsSize * VoxelRelativeCubeIndex.flatIndex.size +
      directionIndex * this.data.resultsSize
    );
  }

  getValue(otherId: number, directionIndex: number, vertexIndex: number) {
    return BinaryArrays.getBitArrayIndex(
      this.view,
      this.getByteIndex(otherId, directionIndex),
      vertexIndex
    );
  }

  setValue(
    otherId: number,
    directionIndex: number,
    vertexIndex: number,
    value = 1
  ) {
    BinaryArrays.setBitArrayIndex(
      this.view,
      this.getByteIndex(otherId, directionIndex),
      vertexIndex,
      value
    );
  }
}



