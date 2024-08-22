import { StringPalette } from "@divinevoxel/core/Interfaces/Data/StringPalette";
import { NumberPalette } from "@divinevoxel/core/Interfaces/Data/NumberPalette";
import { LocationData } from "@divinevoxel/core/Math";
import { WorldRegister } from "../../../Data/World/WorldRegister";
import { VoxelPalette } from "@divinevoxel/core/Data/Voxel/VoxelPalette";
import { VoxelStruct } from "@divinevoxel/core/Data/Voxel/VoxelStruct";
import { VoxelTagIDs } from "@divinevoxel/core/Data/Constants/VoxelTagIds";
import { Chunk, ChunkData, Column } from "../../../Data/World/Classes";
import { ArchivedChunkData, ArchivedColumnData } from "../Archive.types";
import { convertToPaletteBuffer } from "./Palettes";
import { Flat3DIndex } from "@amodx/math";

type ArchiveChunkState = {
  ids: Uint16Array;
  rempaedIds: boolean;
  idPalette: NumberPalette;

  light: Uint16Array;
  isLightPaletted: boolean;
  rempaedLight: boolean;
  lightPalette: NumberPalette;
  chunk: ChunkData;

  state: Uint16Array;
  isStatePaletted: boolean;
  rempaedState: boolean;
  statePalette: NumberPalette;
  secondary: Uint16Array;
  isSecondaryPaletted: boolean;
  rempaedSecondary: boolean;
  secondaryPalette: NumberPalette;
  secondaryStatePalette: NumberPalette
  idsAllTheSame: boolean;
  stateAllTheSame: boolean;
  lightAllTheSame: boolean;
  secondaryAllTheSame: boolean;
  hasSecondaryVoxels: boolean;
};

const getArchiveChunkState = (chunk: ChunkData): ArchiveChunkState => {
  return {
    chunk,
    ids: new Uint16Array(chunk.ids.length),
    light: new Uint16Array(chunk.ids.length),
    state: new Uint16Array(chunk.state.length),
    secondary: new Uint16Array(chunk.secondary.length),
    idPalette: new NumberPalette(),
    lightPalette: new NumberPalette(),
    statePalette: new NumberPalette(),
    secondaryPalette: new NumberPalette(),
    secondaryStatePalette: new NumberPalette(),
    isLightPaletted: false,
    isSecondaryPaletted: false,
    isStatePaletted: false,
    rempaedLight: false,
    rempaedIds: false,
    rempaedState: false,
    rempaedSecondary: false,
    idsAllTheSame: true,
    stateAllTheSame: true,
    lightAllTheSame: true,
    secondaryAllTheSame: true,
    hasSecondaryVoxels: false,
  };
};

let columnStructInstance: ReturnType<typeof Column.StateStruct.instantiate>;
let chunkStructInstance: ReturnType<typeof Chunk.StateStruct.instantiate>;

type ArchiveColumnData = {
  version?: number;
  location: LocationData;
};


export default function ArchiveColumn(
  archiveData: ArchiveColumnData
): ArchivedColumnData {
  const column = WorldRegister.instance.column.get(archiveData.location);

  if (!column)
    throw new Error(
      `Column at location ${location} does not exist when trying to arhicve it.`
    );

  if (!columnStructInstance)
    columnStructInstance = Column.StateStruct.instantiate();
  if (!chunkStructInstance)
    chunkStructInstance = Chunk.StateStruct.instantiate();

  const idsPalette = new StringPalette();
  const lightPalette = new NumberPalette();
  const secondaryPalette = new StringPalette();
  const statePalette = new NumberPalette();
  const secondaryStatePalette = new NumberPalette();

  columnStructInstance.setBuffer(column.columnState.buffer);
  const columnState = columnStructInstance.serialize() as any;

  const states: ArchiveChunkState[] = [];
  for (const chunk of column.chunks) {
    const length = chunk.ids.length;
    let firstId = -1;
    let firstState = -1;
    let firtLight = -1;
    let firstSecondary = -1;

    const archivedChunk = getArchiveChunkState(chunk);

    for (let i = 0; i < length; i++) {
      const stringId = VoxelPalette.ids.getStringId(chunk.ids[i]);
      VoxelStruct.setStringVoxel(stringId);
      const voxelId = !idsPalette.isRegistered(stringId)
        ? idsPalette.register(stringId)
        : idsPalette.getNumberId(stringId);

      if (!archivedChunk.idPalette.isRegistered(voxelId))
        archivedChunk.idPalette.register(voxelId);
      if (firstId == -1) firstId = voxelId;
      const voxelState = !statePalette.isRegistered(chunk.state[i])
        ? statePalette.register(chunk.state[i])
        : statePalette.getId(chunk.state[i]);
      if (!archivedChunk.statePalette.isRegistered(voxelState))
        archivedChunk.statePalette.register(voxelState);
      if (firstState == -1) firstState = voxelState;

      const voxelLight = !lightPalette.isRegistered(chunk.light[i])
        ? lightPalette.register(chunk.light[i])
        : lightPalette.getId(chunk.light[i]);
      if (!archivedChunk.lightPalette.isRegistered(voxelLight))
        archivedChunk.lightPalette.register(voxelLight);
      if (firtLight == -1) firtLight = voxelLight;

      const secondaryId =
        VoxelStruct.instance[VoxelTagIDs.canHaveSecondary] == 1 &&
        VoxelPalette.ids.getStringId(chunk.secondary[i]);
      if (secondaryId) archivedChunk.hasSecondaryVoxels = true;

      const voxelSecondary = secondaryId
        ? !secondaryPalette.isRegistered(secondaryId)
          ? secondaryPalette.register(secondaryId)
          : secondaryPalette.getNumberId(secondaryId)
        : !secondaryStatePalette.isRegistered(chunk.secondary[i])
        ? secondaryStatePalette.register(chunk.secondary[i])
        : secondaryStatePalette.getId(chunk.secondary[i]);

      secondaryId
        ? !archivedChunk.secondaryPalette.isRegistered(voxelSecondary) &&
          archivedChunk.secondaryPalette.register(voxelSecondary)
        : !archivedChunk.secondaryStatePalette.isRegistered(voxelSecondary) &&
          archivedChunk.secondaryStatePalette.register(voxelSecondary);

      if (firstSecondary == -1) firstSecondary = voxelSecondary;

      if (voxelId != firstId) archivedChunk.idsAllTheSame = false;
      if (voxelState != firstState) archivedChunk.stateAllTheSame = false;
      if (voxelLight != firtLight) archivedChunk.lightAllTheSame = false;
      if (voxelSecondary != firstSecondary)
        archivedChunk.secondaryAllTheSame = false;

      archivedChunk.ids[i] = voxelId;
      archivedChunk.state[i] = voxelState;
      archivedChunk.secondary[i] = voxelSecondary;
      archivedChunk.light[i] = voxelLight;
    }

    states.push(archivedChunk);
  }

  for (const chunk of states) {
    const reMapIds =
      chunk.idPalette.size < idsPalette.size &&
      chunk.idPalette.size <= 255 &&
      !chunk.idsAllTheSame;
    const reMapState =
      chunk.statePalette.size < statePalette.size &&
      chunk.statePalette.size <= 255 &&
      !chunk.stateAllTheSame;
    const reMapLight =
      chunk.lightPalette.size < lightPalette.size &&
      chunk.lightPalette.size <= 255 &&
      !chunk.lightAllTheSame;
    const reMapSecondary =
      Math.max(chunk.secondaryPalette.size, chunk.secondaryStatePalette.size) <
        Math.max(secondaryStatePalette.size, secondaryPalette.size) &&
      Math.max(chunk.secondaryPalette.size, chunk.secondaryStatePalette.size) <=
        255 &&
      !chunk.secondaryAllTheSame;

    chunk.isLightPaletted =
      lightPalette.size < 65_535 && chunk.lightPalette.size < 255;
    chunk.isStatePaletted =
      statePalette.size < 65_535 && chunk.statePalette.size < 255;
    chunk.isSecondaryPaletted =
      secondaryStatePalette.size < 65_535 &&
      chunk.secondaryStatePalette.size < 255 &&
      chunk.secondaryPalette.size < 255;
    chunk.rempaedIds = reMapIds;
    chunk.rempaedLight = reMapLight && chunk.isLightPaletted;
    chunk.rempaedState = reMapState && chunk.isStatePaletted;
    chunk.rempaedSecondary = reMapSecondary && chunk.isSecondaryPaletted;
    if (!reMapIds && !reMapLight && !reMapSecondary && !reMapState) continue;
    const length = chunk.chunk.ids.length;
    for (let i = 0; i < length; i++) {
      VoxelStruct.setStringVoxel(idsPalette.getStringId(chunk.ids[i]));
      if (reMapIds) chunk.ids[i] = chunk.idPalette.getId(chunk.ids[i]);
      if (reMapState) chunk.state[i] = chunk.statePalette.getId(chunk.state[i]);
      if (reMapLight) chunk.light[i] = chunk.lightPalette.getId(chunk.light[i]);
      if (reMapSecondary)
        chunk.ids[i] =
          VoxelStruct.instance[VoxelTagIDs.canHaveSecondary] == 1
            ? chunk.secondaryPalette.getId(chunk.secondary[i])
            : chunk.secondaryStatePalette.getId(chunk.secondary[i]);
    }
  }

  return {
    archiverVersion: 0,
    version: archiveData.version || 0,
    location: [...archiveData.location],
    columnState,
    buffers: {},
    keys: {
      chunkState: [...chunkStructInstance.getKeys()],
    },
    palettes: {
      id: idsPalette._palette,
      ...(secondaryPalette.size > 0
        ? {
            secondaryId: secondaryPalette._palette,
          }
        : {}),
      ...(lightPalette.size <= 255
        ? {
            light: new Uint16Array(lightPalette._palette),
          }
        : {}),
      ...(statePalette.size <= 255
        ? {
            state: new Uint16Array(statePalette._palette),
          }
        : {}),
      ...(secondaryStatePalette.size <= 255
        ? {
            secondaryState: new Uint16Array(secondaryStatePalette._palette),
          }
        : {}),
    },

    chunks: states.map((archiveChunk): ArchivedChunkData => {
      chunkStructInstance.setBuffer(archiveChunk.chunk.stateBuffer);

      const serializeChunkState = chunkStructInstance.serialize() as Record<
        string,
        any
      >;

      return {
        palettes: {
          ...(archiveChunk.rempaedIds
            ? {
                id: Uint16Array.from(archiveChunk.idPalette._palette),
              }
            : {}),
          ...(archiveChunk.rempaedState
            ? {
                state: Uint16Array.from(archiveChunk.statePalette._palette),
              }
            : {}),
          ...(archiveChunk.rempaedLight
            ? {
                light: Uint16Array.from(archiveChunk.lightPalette._palette),
              }
            : {}),
          ...(archiveChunk.rempaedSecondary
            ? {
                secondaryId: Uint16Array.from(
                  archiveChunk.secondaryPalette._palette
                ),
                secondaryState: Uint16Array.from(
                  archiveChunk.secondaryStatePalette._palette
                ),
              }
            : {}),
        },

        buffers: {
          id: archiveChunk.idsAllTheSame
            ? archiveChunk.ids[0]
            : convertToPaletteBuffer(
                archiveChunk.rempaedIds
                  ? archiveChunk.idPalette.size
                  : idsPalette.size,
                archiveChunk.ids
              ),
          light: archiveChunk.lightAllTheSame
            ? archiveChunk.chunk.light[0]
            : archiveChunk.isLightPaletted
            ? convertToPaletteBuffer(
                archiveChunk.rempaedLight
                  ? archiveChunk.lightPalette.size
                  : lightPalette.size,
                archiveChunk.light
              )
            : new Uint16Array(archiveChunk.chunk.light.slice()),
          state: archiveChunk.stateAllTheSame
            ? archiveChunk.state[0]
            : archiveChunk.isStatePaletted
            ? convertToPaletteBuffer(
                archiveChunk.rempaedState
                  ? archiveChunk.statePalette.size
                  : statePalette.size,
                archiveChunk.state
              )
            : new Uint16Array(archiveChunk.chunk.state.slice()),
          secondary: archiveChunk.secondaryAllTheSame
            ? archiveChunk.secondary[0]
            : archiveChunk.isSecondaryPaletted
            ? convertToPaletteBuffer(
                archiveChunk.rempaedSecondary
                  ? Math.max(
                      archiveChunk.secondaryStatePalette.size,
                      archiveChunk.secondaryPalette.size
                    )
                  : Math.max(secondaryStatePalette.size, secondaryPalette.size),
                archiveChunk.state
              )
            : new Uint16Array(archiveChunk.secondary),
        },
        state: Object.entries(serializeChunkState).map((_) => _[1]),
      };
    }),
  };
}
