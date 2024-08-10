import { Column } from "Data/World/Classes";
import { ArchivedAreaData, ArchivedColumnData } from "../Archive.types";

type RunData = {
  dimension: string;
  columns: ArchivedColumnData[];
  version?: number;
};
const charset = "0123456789ABCDEF";
function uint16To4CharString(value: number): string {
  if (value < 0 || value > 0xffff) {
    throw new RangeError("Value must be a 16-bit unsigned integer.");
  }
  const chars: string[] = [];

  for (let i = 0; i < 4; i++) {
    const charCode = (value >> (i * 4)) & 0x0f;
    chars.unshift(charset[charCode]);
  }
  return chars.join("");
}

let columnStructInstance: ReturnType<typeof Column.StateStruct.instantiate>;
export default function CreateArchiveArea(
  archiveData: RunData
): ArchivedAreaData {
  if (!columnStructInstance)
    columnStructInstance = Column.StateStruct.instantiate();
  const allRegistered = new Set<string>();
  archiveData.columns.forEach((_) => {
    _.idPalette.forEach((_) => {
      allRegistered.add(_);
    });
    _.secondaryIdPalette &&
      _.secondaryIdPalette.forEach((_) => {
        allRegistered.add(_);
      });
  });
  let count = 0;
  const idMap: Record<string, string> = {};
  for (const voxelId of allRegistered) {
    idMap[voxelId] = uint16To4CharString(count);
    count++;
  }
  archiveData.columns.forEach((_) => {
    _.idPalette.forEach((id, index) => {
      _.idPalette[index] = idMap[id];
    });
    _.secondaryIdPalette &&
      _.secondaryIdPalette.forEach((id, index) => {
        _.secondaryIdPalette![index] = idMap[id];
      });
  });
  const columnStateKeys = columnStructInstance.getKeys();
  return {
    dimension: archiveData.dimension,
    archiverVersion: 0,
    idMap,
    version: archiveData.version || 0,
    chunkStateKeys: archiveData.columns[0].chunkStateKeys,
    columnStateKeys,
    columns: archiveData.columns.map((column) => {
      const columnState: any[] = [];
      for (let i = 0; i < columnStateKeys.length; i++) {
        columnState[i] = column.columnState[columnStateKeys[i]];
      }
      return {
        position: [0, 0, 0],
        idPalette: column.idPalette,
        secondaryIdPalette: column.secondaryIdPalette,
        columnState,
        secondaryStatePalette: column.secondaryStatePalette,
        statePalette: column.statePalette,
        chunks: column.chunks,
      };
    }),
  };
}

export function CreateColumnsFromArea(
  area: ArchivedAreaData
): ArchivedColumnData[] {
  const columns: ArchivedColumnData[] = [];

  area.columns.forEach((column) => {
    const columnState: Record<string, any> = {};
    for (let i = 0; i < area.columnStateKeys.length; i++) {
      columnState[area.columnStateKeys[i]] = column.columnState[i];
    }
    columns.push({
      archiverVersion: area.archiverVersion,
      version: area.version,
      location: [area.dimension, ...column.position],
      idPalette: column.idPalette.map((_) => area.idMap[_]),
      lightPalette: column.lightPalette,
      secondaryIdPalette:
        column.secondaryIdPalette &&
        column.secondaryIdPalette.map((_) => area.idMap[_]),
      columnState,
      chunkStateKeys: area.chunkStateKeys,
      secondaryStatePalette: column.secondaryStatePalette,
      statePalette: column.statePalette,
      chunks: column.chunks,
    });
  });
  return columns;
}
