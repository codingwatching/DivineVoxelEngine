import { EngineSettings } from "../Global/EngineSettings.js";
import type { DVENInitData } from "Meta/Nexus/DVEN.js";
import { MatrixHub } from "../Matrix/MatrixHub.js";
import { WorldMatrix } from "../Matrix/WorldMatrix.js";
import { EngineSettingsData } from "Meta/index.js";
declare class DivineVoxelEngineNexusClass {
    engineSettings: EngineSettings;
    worldMatrix: WorldMatrix;
    matrixHub: MatrixHub;
    worldComm: any;
    $INIT(data: DVENInitData): Promise<void>;
    syncSettings(data: EngineSettingsData): void;
    /**# Load chunk into Nexus
     * Load a chunk into the shared nexus thread.
     */
    loadChunkIntoNexus(chunkX: number, chunkY: number, chunkZ: number): void;
    /**# Release Chunk From Nexus
     * Remve a chunk in the shared nexus thread.
     */
    releaseChunkFromNexus(chunkX: number, chunkY: number, chunkZ: number): void;
}
export declare type DivineVoxelEngineNexus = DivineVoxelEngineNexusClass;
export declare const DVEN: DivineVoxelEngineNexusClass;
export {};