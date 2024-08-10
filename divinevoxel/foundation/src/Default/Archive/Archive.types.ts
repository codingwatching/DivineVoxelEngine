import { Vec3Array } from "@amodx/math";
import { LocationData } from "@divinevoxel/core/Math";

export enum ArchiveTasksIds {
  ArchiveColumn = "archive-column",
  ImportColumn = "import-column",
}

export interface ArchivedColumnData {
  archiverVersion: number;
  version: number;
  location: LocationData;
  idPalette: string[];
  secondaryIdPalette?: string[];
  statePalette?: Uint16Array;
  lightPalette?: Uint16Array;
  secondaryStatePalette?: Uint16Array;
  columnState: Record<string, any>;
  chunkStateKeys: string[];
  chunks: ArchivedChunkData[];
}

export interface ArchivedChunkData {
  state: any[];
  idPalette?: Uint16Array;
  lightPalette?: Uint16Array;
  secondaryIdPalette?: Uint16Array;
  statePalette?: Uint16Array;
  secondaryStatePalette?: Uint16Array;
  buffers: ArchivedChunkBuffers;
}

export interface ArchivedChunkBuffers {
  ids: Uint16Array | Uint8Array | number;
  light: Uint16Array | Uint8Array | number;
  state: Uint16Array | Uint8Array | number;
  secondary: Uint16Array | Uint8Array | number;
}

export interface ArchivedAreaData {
  archiverVersion: number;
  version: number;
  dimension: string;
  idMap: Record<string, string>;
  columnStateKeys: string[];
  chunkStateKeys: string[];
  columns: ArchivedAreaColumnData[];
}

export interface ArchivedAreaColumnData {
  position: Vec3Array;
  columnState: any[];
  idPalette: string[];
  secondaryIdPalette?: string[];
  lightPalette?: Uint16Array;
  statePalette?: Uint16Array;
  secondaryStatePalette?: Uint16Array;
  chunks: ArchivedChunkData[];
}
