import { VoxelPalette } from "@divinevoxel/core/Data/Voxel/VoxelPalette";
import {
  Chunk,
  ChunkData,
  Column,
  ColumnData,
} from "../../../Data/World/Classes";

import { ArchivedChunkData, ArchivedColumnData } from "../Archive.types";
import { VoxelStruct } from "@divinevoxel/core/Data/Voxel/VoxelStruct";
import { VoxelTagIDs } from "@divinevoxel/core/Data/Constants/VoxelTagIds";
import { BitArray } from "@amodx/binary/Arrays/BitArray";
import { HalfNibbleArray } from "@amodx/binary/Arrays/HalfNibbleArray";
import { NibbleArray } from "@amodx/binary/Arrays/NibbleArray";
import { NumberPalette } from "@divinevoxel/core/Interfaces/Data/NumberPalette";
import { StringPalette } from "@divinevoxel/core/Interfaces/Data/StringPalette";

let columnStructInstance: ReturnType<typeof Column.StateStruct.instantiate>;
let chunkStructInstance: ReturnType<typeof Chunk.StateStruct.instantiate<any>>;

type RunData = {
  version?: number;
  loadColumnState?: (data: Record<string, any>, column: ColumnData) => void;
  loadChunkState?: (keys: string[], data: any[], chunk: ChunkData) => void;
};

const getArray = (size: number, buffer: ArrayBufferLike) => {
  if (size == 2) return new BitArray(buffer);
  if (size > 2 && size <= 4) return new HalfNibbleArray(buffer);
  if (size > 4 && size <= 15) return new NibbleArray(buffer);
  return buffer;
};
const updateChunkBuffers = (
  column: ArchivedColumnData,
  chunk: ArchivedChunkData
) => {
  if (column.idPalette.length <= 15 && ArrayBuffer.isView(chunk.buffers.ids))
    chunk.buffers.ids = getArray(
      column.idPalette.length,
      chunk.buffers.ids
    ) as any;
  if (
    ((chunk.statePalette && chunk.statePalette.length <= 15) ||
      (column.statePalette && column.statePalette.length <= 15)) &&
    ArrayBuffer.isView(chunk.buffers.state)
  )
    chunk.buffers.state = getArray(
      column.idPalette.length,
      chunk.buffers.state
    ) as any;
  if (
    ((chunk.statePalette && chunk.statePalette.length <= 15) ||
      (column.statePalette && column.statePalette.length <= 15)) &&
    ArrayBuffer.isView(chunk.buffers.secondary)
  )
    if (
      ((chunk.secondaryStatePalette &&
        chunk.secondaryStatePalette.length <= 15) ||
        (column.secondaryStatePalette &&
          column.secondaryStatePalette.length <= 15)) &&
      ((chunk.secondaryIdPalette && chunk.secondaryIdPalette.length <= 15) ||
        (column.secondaryIdPalette &&
          column.secondaryIdPalette.length <= 15)) &&
      ArrayBuffer.isView(chunk.buffers.secondary)
    )
      chunk.buffers.secondary = getArray(
        Math.max(
          column.secondaryIdPalette?.length || 0,
          column.secondaryStatePalette?.length || 0
        ),
        chunk.buffers.secondary
      ) as any;
};
type ImportedColumnData = {
  column: ArchivedColumnData;
  idPalette: StringPalette;
  secondaryIdPalette?: StringPalette;
  lightPalette?: NumberPalette;
  statePalette?: NumberPalette;
  secondaryStatePalette?: NumberPalette;
};
type ImportedChunkData = {
  chunk: ArchivedChunkData;
  idPalette?: NumberPalette;
  lightPalette?: NumberPalette;
  statePalette?: NumberPalette;
  secondaryStatePalette?: NumberPalette;
  secondaryIdPalette?: NumberPalette;
};

const getImportedColumnData = (
  column: ArchivedColumnData
): ImportedColumnData => {
  return {
    column,
    idPalette: new StringPalette(column.idPalette),
    secondaryIdPalette: column.secondaryIdPalette
      ? new StringPalette(column.secondaryIdPalette)
      : undefined,
    lightPalette: column.lightPalette
      ? new NumberPalette(column.lightPalette)
      : undefined,
    statePalette: column.statePalette
      ? new NumberPalette(column.statePalette)
      : undefined,
    secondaryStatePalette: column.secondaryStatePalette
      ? new NumberPalette(column.secondaryStatePalette)
      : undefined,
  };
};
const getImportedChunkData = (chunk: ArchivedChunkData): ImportedChunkData => {
  return {
    chunk,
    idPalette: chunk.idPalette ? new NumberPalette(chunk.idPalette) : undefined,
    lightPalette: chunk.lightPalette
      ? new NumberPalette(chunk.lightPalette)
      : undefined,
    statePalette: chunk.statePalette
      ? new NumberPalette(chunk.statePalette)
      : undefined,
    secondaryStatePalette: chunk.secondaryStatePalette
      ? new NumberPalette(chunk.secondaryStatePalette)
      : undefined,
    secondaryIdPalette: chunk.secondaryIdPalette
      ? new NumberPalette(chunk.secondaryIdPalette)
      : undefined,
  };
};
const getId = (
  value: number,
  importedColumn: ImportedColumnData,
  importedChunk: ImportedChunkData
): number => {
  const { chunk } = importedChunk;
  const { column } = importedColumn;
  if (typeof chunk.buffers.ids == "number") {
    return VoxelPalette.ids.getNumberId(column.idPalette[chunk.buffers.ids]);
  }
  if (importedChunk.idPalette) {
    return VoxelPalette.ids.getNumberId(
      importedColumn.idPalette.getStringId(
        importedChunk.idPalette.getValue(value)
      )
    );
  }
  return VoxelPalette.ids.getNumberId(column.idPalette[value]);
};

const getLight = (
  value: number,
  importedColumn: ImportedColumnData,
  importedChunk: ImportedChunkData
): number => {
  const { chunk } = importedChunk;
  const { column } = importedColumn;
  if (typeof chunk.buffers.light == "number") {
    return value;
  }
  if (importedChunk.lightPalette) {
    return importedChunk.lightPalette.getId(value);
  }
  if (importedColumn.lightPalette) {
    return importedColumn.lightPalette.getId(value);
  }
  return value;
};
const getState = (
  value: number,
  importedColumn: ImportedColumnData,
  importedChunk: ImportedChunkData
): number => {
  const { chunk } = importedChunk;
  const { column } = importedColumn;
  if (typeof chunk.buffers.state == "number") {
    return value;
  }
  if (importedChunk.statePalette) {
    return importedChunk.statePalette.getId(value);
  }
  if (importedColumn.statePalette) {
    return importedColumn.statePalette.getId(value);
  }
  return value;
};
const getSecondary = (
  voxelId: number,
  value: number,
  importedColumn: ImportedColumnData,
  importedChunk: ImportedChunkData
): number => {
  const { chunk } = importedChunk;
  const { column } = importedColumn;
  VoxelStruct.setVoxel(voxelId);
  if (VoxelStruct.instance[VoxelTagIDs.canHaveSecondary] == 1) {
    if (typeof chunk.buffers.secondary == "number") {
      return VoxelPalette.ids.getNumberId(
        column.secondaryIdPalette![chunk.buffers.secondary]
      );
    }
    if (importedChunk.secondaryIdPalette) {
      return VoxelPalette.ids.getNumberId(
        importedColumn.secondaryIdPalette!.getStringId(
          importedChunk.secondaryIdPalette.getValue(value)
        )
      );
    }
    return VoxelPalette.ids.getNumberId(column.secondaryIdPalette![value]);
  }

  if (typeof chunk.buffers.secondary == "number") {
    return value;
  }
  if (importedChunk.secondaryStatePalette) {
    return importedChunk.secondaryStatePalette.getId(value);
  }
  if (importedColumn.secondaryStatePalette) {
    return importedColumn.secondaryStatePalette.getId(value);
  }
  return value;
};

export default function ImportColumn(
  column: ArchivedColumnData,
  archiveData: RunData
): ColumnData {
  if (!columnStructInstance)
    columnStructInstance = Column.StateStruct.instantiate();
  if (!chunkStructInstance)
    chunkStructInstance = Chunk.StateStruct.instantiate();

  const newColumn = Column.CreateNew({});
  if (!archiveData.loadColumnState) {
    columnStructInstance.setBuffer(newColumn.stateBuffer);
    const columnStateKeys = Object.keys(column.columnState);
    for (let i = 0; i < columnStateKeys.length; i++) {
      chunkStructInstance[columnStateKeys[i]] =
        column.columnState[columnStateKeys[i]];
    }
  } else {
    archiveData.loadColumnState(column.columnState, newColumn);
  }

  const importedColumn = getImportedColumnData(column);

  for (const chunk of column.chunks) {
    const importedChunk = getImportedChunkData(chunk);
    const newChunk = Chunk.CreateNew();
    chunkStructInstance.setBuffer(newChunk.stateBuffer);

    updateChunkBuffers(column, chunk);
    if (!archiveData.loadChunkState) {
      for (let i = 0; i < column.chunkStateKeys.length; i++) {
        chunkStructInstance[column.chunkStateKeys[i]] = chunk.state[i];
      }
    } else {
      archiveData.loadChunkState(column.chunkStateKeys, chunk.state, newChunk);
    }

    for (let i = 0; i < newChunk.ids.length; i++) {
      newChunk.ids[i] = getId(
        typeof chunk.buffers.ids == "number"
          ? chunk.buffers.ids
          : chunk.buffers.ids[i],
        importedColumn,
        importedChunk
      );
      newChunk.state[i] = getState(
        typeof chunk.buffers.state == "number"
          ? chunk.buffers.state
          : chunk.buffers.state[i],
        importedColumn,
        importedChunk
      );
      newChunk.light[i] = getLight(
        typeof chunk.buffers.light == "number"
          ? chunk.buffers.light
          : chunk.buffers.light[i],
        importedColumn,
        importedChunk
      );
      newChunk.secondary[i] = getSecondary(
        newChunk.ids[i],
        typeof chunk.buffers.secondary == "number"
          ? chunk.buffers.secondary
          : chunk.buffers.secondary[i],
        importedColumn,
        importedChunk
      );
    }
  }

  return newColumn;
}
