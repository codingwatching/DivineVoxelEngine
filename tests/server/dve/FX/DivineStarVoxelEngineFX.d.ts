import type { EngineSettingsData } from "Meta/index.js";
export declare const DVEFX: {
    environment: "node" | "browser";
    __settingsHaveBeenSynced: boolean;
    UTIL: {
        createPromiseCheck: (data: {
            check: () => boolean;
            onReady?: (() => any) | undefined;
            checkInterval: number;
            failTimeOut?: number | undefined;
            onFail?: (() => any) | undefined;
        }) => Promise<boolean>;
        getEnviorment(): "node" | "browser";
        getAQueue<T>(): import("../Global/Util/Queue.js").Queue<T>;
        merge<T_1, K>(target: T_1, newObject: K): T_1 & K;
        degtoRad(degrees: number): number;
        radToDeg(radians: number): number;
    };
    settings: {
        settings: {
            nexus: {
                enabled: boolean;
                autoSyncChunks: boolean;
                autoSyncVoxelPalette: boolean;
            };
            data: {
                enabled: boolean;
                autoSyncChunks: boolean;
            };
            fx: {
                enabled: boolean;
                autoSyncChunks: boolean;
                autoSyncVoxelPalette: boolean;
            };
            server: {
                enabled: boolean;
            };
            richWorld: {
                enabled: boolean;
                autoSyncChunks: boolean;
                autoSyncVoxelPalette: boolean;
            };
            textureOptions: {
                animationTime: number;
                width: number;
                height: number;
            };
            updating: {
                autoRebuild: boolean;
            };
            world: {
                maxX: number;
                minX: number;
                maxZ: number;
                minZ: number;
                maxY: number;
                minY: number;
            };
            regions: {
                regionXPow2: number;
                regionYPow2: number;
                regionZPow2: number;
            };
            chunks: {
                autoHeightMap: boolean;
                chunkXPow2: number;
                chunkYPow2: number;
                chunkZPow2: number;
            };
            voxels: {
                doColors: boolean;
            };
            lighting: {
                doAO: boolean;
                doSunLight: boolean;
                doRGBLight: boolean;
                autoRGBLight: boolean;
                autoSunLight: boolean;
            };
            meshes: {
                clearChachedGeometry: boolean;
                checkMagmaCollisions: boolean;
                checkFluidCollisions: boolean;
                checkFloraCollisions: boolean;
                checkSolidCollisions: boolean;
                seralize: boolean;
                pickable: boolean;
            };
            materials: {
                mode: string;
                doAO: boolean;
                doSunLight: boolean;
                doRGBLight: boolean;
                disableFloraShaderEffects: boolean;
                disableFluidShaderEffects: boolean;
            };
        };
        getSettings(): EngineSettingsData;
        syncSettings(data: EngineSettingsData): void;
        __syncWithObjects(): void;
        syncWithWorldBounds(worldBounds: {
            __maxChunkYSize: number;
            bounds: {
                MinZ: number;
                MaxZ: number;
                MinX: number;
                MaxX: number;
                MinY: number;
                MaxY: number;
            };
            chunkXPow2: number;
            chunkYPow2: number;
            chunkZPow2: number;
            chunkXSize: number;
            chunkYSize: number;
            chunkZSize: number;
            chunkTotalVoxels: number;
            chunkArea: number;
            regionXPow2: number;
            regionYPow2: number;
            regionZPow2: number;
            regionXSize: number;
            regionYSize: number;
            regionZSize: number;
            __regionPosition: {
                x: number;
                y: number;
                z: number;
            };
            __worldColumnPosition: {
                x: number;
                z: number;
                y: number;
            };
            __chunkPosition: {
                x: number;
                y: number;
                z: number;
            };
            __voxelPosition: {
                x: number;
                y: number;
                z: number;
            };
            syncBoundsWithArrays(): void;
            setWorldBounds(minX: number, maxX: number, minZ: number, maxZ: number, minY: number, maxY: number): void;
            isPositonOutsideOfBounds(x: number, y: number, z: number): boolean;
            isPositonInBounds(x: number, y: number, z: number): boolean;
            setChunkBounds(pow2X: number, pow2Y: number, pow2Z: number): void;
            setRegionBounds(pow2X: number, pow2Y: number, pow2Z: number): void;
            getRegionPosition(x: number, y: number, z: number): {
                x: number;
                y: number;
                z: number;
            };
            getChunkPosition(x: number, y: number, z: number): {
                x: number;
                y: number;
                z: number;
            };
            getChunkKey(chunkPOS: import("Meta/index.js").Position3Matrix): string;
            getChunkKeyFromPosition(x: number, y: number, z: number): string;
            getRegionKey(regionPOS: import("Meta/index.js").Position3Matrix): string;
            getRegionKeyFromPosition(x: number, y: number, z: number): string;
            getVoxelPositionFromChunkPosition(x: number, y: number, z: number, chunkPOS: import("Meta/index.js").Position3Matrix): {
                x: number;
                y: number;
                z: number;
            };
            getRichPositionKey(x: number, y: number, z: number): string;
            getVoxelPosition(x: number, y: number, z: number): {
                x: number;
                y: number;
                z: number;
            };
            getColumnKey(x: number, z: number, y?: number): string;
            getColumnPosition(x: number, z: number, y?: number): {
                x: number;
                z: number;
                y: number;
            };
        }): void;
        getSettingsCopy(): any;
        syncChunkInRichWorldThread(): boolean;
        richDataEnabled(): boolean;
        syncChunkInFXThread(): boolean;
        syncChunkInDataThread(): boolean;
        syncChunksInNexusThread(): boolean;
        doSunPropagation(): boolean;
        doRGBPropagation(): boolean;
        doLight(): boolean;
    };
    dataSyncNode: {
        chunk: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<import("../Meta/Data/DataSync.types.js").ChunkSyncData, import("../Meta/Data/DataSync.types.js").ChunkUnSyncData>;
        voxelPalette: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<import("../Meta/Data/DataSync.types.js").VoxelPaletteSyncData, any>;
        voxelData: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<import("../Meta/Data/DataSync.types.js").VoxelDataSync, any>;
    };
    data: {
        dimensions: {
            dimensionRecord: Record<string, number>;
            dimensionMap: Record<number, string>;
            __defaultDimensionOptions: import("../Meta/Data/DimensionData.types.js").DimensionOptions;
            _dimensions: Record<string, import("../Meta/Data/DimensionData.types.js").DimensionData>;
            addDimension(id: string, option: import("../Meta/Data/DimensionData.types.js").DimensionOptions): void;
            getDimension(id: string): import("../Meta/Data/DimensionData.types.js").DimensionData;
            getDimensionStringId(id: string | number): string;
            getDimensionNumericId(id: string | number): number;
        };
        voxel: {
            byteLength: {
                substance: number;
                shapeId: number;
                hardness: number;
                material: number;
                checkCollision: number;
                colliderId: number;
                lightSource: number;
                lightValue: number;
                totalLength: number;
            };
            indexes: {
                substance: number;
                shapeId: number;
                hardness: number;
                material: number;
                checkCollision: number;
                colliderId: number;
                lightSource: number;
                lightValue: number;
            };
            substanceRecord: Record<number, import("Meta/index.js").VoxelSubstanceType>;
            voxelData: {
                substance: import("Meta/index.js").VoxelSubstanceType;
                shapeId: number;
                hardness: number;
                material: number;
                checkCollision: number;
                colliderId: number;
                lightSource: number;
                lightValue: number;
            };
            voxelDataView: DataView;
            voxelMap: Uint16Array;
            syncData(voxelBuffer: SharedArrayBuffer, voxelMapBuffer: SharedArrayBuffer): void;
            getVoxelData(id: number): {
                substance: import("Meta/index.js").VoxelSubstanceType;
                shapeId: number;
                hardness: number;
                material: number;
                checkCollision: number;
                colliderId: number;
                lightSource: number;
                lightValue: number;
            };
            getSubstance(id: number): number;
            getTrueSubstance(id: number): import("Meta/index.js").VoxelSubstanceType;
            getShapeId(id: number): number;
            getHardness(id: number): number;
            getCheckCollisions(id: number): number;
            getColliderId(id: number): number;
            isLightSource(id: number): boolean;
            getLightValue(id: number): number;
        };
        world: {
            _currentionDimension: string;
            voxelPalette: import("../Meta/Data/WorldData.types.js").VoxelPalette;
            voxelPaletteMap: import("../Meta/Data/WorldData.types.js").VoxelPaletteMap;
            setCurrentDimension(id: string | number): void;
            setVoxelPalette(voxelPalette: import("../Meta/Data/WorldData.types.js").VoxelPalette, voxelPaletteMap: import("../Meta/Data/WorldData.types.js").VoxelPaletteMap): void;
            rawData: {
                get(dimensionId: string | number, x: number, y: number, z: number, secondary?: boolean): number;
                set(dimensionId: string | number, x: number, y: number, z: number, data: number, secondary?: boolean): number;
            };
            util: {
                isSameVoxel(dimensionId: string | number, x: number, y: number, z: number, x2: number, y2: number, z2: number, secondary?: boolean): boolean;
            };
            voxel: {
                _air: [string, number];
                _barrier: [string, number];
                air: {
                    isAt(dimensionId: string | number, x: number, y: number, z: number, secondary?: boolean): true | undefined;
                    set(dimensionId: string | number, x: number, y: number, z: number, light?: number, secondary?: boolean): void;
                };
                barrier: {
                    isAt(dimensionId: string | number, x: number, y: number, z: number, secondary?: boolean): true | undefined;
                    set(dimensionId: string | number, x: number, y: number, z: number, secondary?: boolean): void;
                };
                get(dimensionId: string | number, x: number, y: number, z: number, secondary?: boolean): false | [string, number];
                getData(dimensionId: string | number, x: number, y: number, z: number, secondary?: boolean): false | {
                    substance: import("Meta/index.js").VoxelSubstanceType;
                    shapeId: number;
                    hardness: number;
                    material: number;
                    checkCollision: number;
                    colliderId: number;
                    lightSource: number;
                    lightValue: number;
                };
                id: {
                    string(dimensionId: string | number, x: number, y: number, z: number, secondary?: boolean): string | -1;
                    stateNumeric(dimensionId: string | number, x: number, y: number, z: number, secondary?: boolean): number;
                    baseNumeric(id: number): number;
                    baseNumericAt(dimensionId: string | number, x: number, y: number, z: number, secondary?: boolean): number;
                    stringFromNumber(id: number): string;
                    numberFromString(id: string): number;
                    getPaletteId(voxelId: string, voxelState: number): number;
                };
                data: {
                    shapeId: {
                        getAt(dimensionId: string | number, x: number, y: number, z: number, secondary?: boolean): number;
                        get(id: number): number;
                    };
                    substance: {
                        getAt(dimensionId: string | number, x: number, y: number, z: number, secondary?: boolean): import("Meta/index.js").VoxelSubstanceType;
                        get(id: number): import("Meta/index.js").VoxelSubstanceType;
                    };
                    shapeState: {
                        getAt(dimensionId: string | number, x: number, y: number, z: number): number;
                        get(data: number): number;
                        set(data: number, state: number): number;
                        setAt(dimensionId: string | number, x: number, y: number, z: number, state: number): void;
                    };
                    state: {
                        getAt(dimensionId: string | number, x: number, y: number, z: number): number;
                        get(data: number): number;
                        set(data: number, state: number): number;
                        setAt(dimensionId: string | number, x: number, y: number, z: number, state: number): void;
                    };
                    lightSource: {
                        trueAt(dimensionId: string | number, x: number, y: number, z: number, secondary?: boolean): boolean;
                        true(voxelId: number): boolean;
                    };
                    level: {
                        getAt(dimensionId: string | number, x: number, y: number, z: number): number;
                        get(data: number): number;
                        set(data: number, level: number): number;
                        setAt(dimensionId: string | number, x: number, y: number, z: number, level: number): void;
                        state: {
                            getAt(dimensionId: string | number, x: number, y: number, z: number): number;
                            get(data: number): number;
                            set(data: number, level: number): number;
                            setAt(dimensionId: string | number, x: number, y: number, z: number, state: number): void;
                        };
                    };
                };
            };
            heightMap: {
                update: {
                    add(dimensionId: string | number, substance: import("Meta/index.js").VoxelSubstanceType, x: number, y: number, z: number): void;
                    remove(dimensionId: string | number, substance: import("Meta/index.js").VoxelSubstanceType, x: number, y: number, z: number): void;
                };
            };
            paint: {
                getVoxelBrush(): void;
                voxel(data: import("../Meta/Data/WorldData.types.js").AddVoxelData, update?: boolean): void;
                voxelAsync(data: import("../Meta/Data/WorldData.types.js").AddVoxelData): Promise<void>;
                __paint(dimension: string | number, data: import("../Meta/Data/WorldData.types.js").AddVoxelData, chunk: import("../Meta/Data/WorldData.types.js").ChunkData, update?: boolean): false | undefined;
                erease(dimensionId: string | number, x: number, y: number, z: number): void;
                _worldGen: {
                    getPaletteId(voxelId: string, voxelState: number): number;
                };
            };
            light: {
                get(dimesnionId: string | number, x: number, y: number, z: number): number;
                set(dimesnionId: string | number, x: number, y: number, z: number, lightValue: number): -1 | undefined;
                red: {
                    get(dimesnionId: string | number, x: number, y: number, z: number): number;
                    set(dimesnionId: string | number, x: number, y: number, z: number, value: number): 0 | undefined;
                };
                green: {
                    get(dimesnionId: string | number, x: number, y: number, z: number): number;
                    set(dimesnionId: string | number, x: number, y: number, z: number, value: number): 0 | undefined;
                };
                blue: {
                    get(dimesnionId: string | number, x: number, y: number, z: number): number;
                    set(dimesnionId: string | number, x: number, y: number, z: number, value: number): 0 | undefined;
                };
                sun: {
                    get(dimesnionId: string | number, x: number, y: number, z: number): number;
                    set(dimesnionId: string | number, x: number, y: number, z: number, value: number): 0 | undefined;
                };
            };
        };
        worldRegister: {
            dimensionRecord: Record<string, number>;
            dimensionMap: Record<number, string>;
            _dimensions: import("../Meta/Data/WorldData.types.js").WorldDimensions;
            _cacheOn: boolean;
            _cache: Record<string, import("../Meta/Data/WorldData.types.js").ChunkData>;
            cache: {
                enable(): void;
                disable(): void;
                _add(key: string, data: import("../Meta/Data/WorldData.types.js").ChunkData): void;
                _get(key: string): import("../Meta/Data/WorldData.types.js").ChunkData;
            };
            dimensions: {
                add(id: string | number): {};
                get(id: string | number): Record<string, import("../Meta/Data/WorldData.types.js").Region>;
            };
            region: {
                add(dimensionId: string | number, x: number, y: number, z: number): import("../Meta/Data/WorldData.types.js").Region;
                get(dimensionId: string | number, x: number, y: number, z: number): false | import("../Meta/Data/WorldData.types.js").Region;
            };
            column: {
                add(dimensionId: string | number, x: number, z: number, y?: number): import("../Meta/Data/WorldData.types.js").Column;
                get(dimensionId: string | number, x: number, z: number, y?: number): false | import("../Meta/Data/WorldData.types.js").Column;
                fill(dimensionId: string | number, x: number, z: number, y?: number): void;
                height: {
                    getRelative(dimensionId: string | number, x: number, z: number, y?: number): number;
                    getAbsolute(dimensionId: string | number, x: number, z: number, y?: number): number;
                };
            };
            chunk: {
                add(dimensionId: string | number, x: number, y: number, z: number, sab: SharedArrayBuffer): import("../Meta/Data/WorldData.types.js").ChunkData;
                get(dimensionId: string | number, x: number, y: number, z: number): false | import("../Meta/Data/WorldData.types.js").ChunkData;
            };
        };
        worldColumn: {};
        worldBounds: {
            __maxChunkYSize: number;
            bounds: {
                MinZ: number;
                MaxZ: number;
                MinX: number;
                MaxX: number;
                MinY: number;
                MaxY: number;
            };
            chunkXPow2: number;
            chunkYPow2: number;
            chunkZPow2: number;
            chunkXSize: number;
            chunkYSize: number;
            chunkZSize: number;
            chunkTotalVoxels: number;
            chunkArea: number;
            regionXPow2: number;
            regionYPow2: number;
            regionZPow2: number;
            regionXSize: number;
            regionYSize: number;
            regionZSize: number;
            __regionPosition: {
                x: number;
                y: number;
                z: number;
            };
            __worldColumnPosition: {
                x: number;
                z: number;
                y: number;
            };
            __chunkPosition: {
                x: number;
                y: number;
                z: number;
            };
            __voxelPosition: {
                x: number;
                y: number;
                z: number;
            };
            syncBoundsWithArrays(): void;
            setWorldBounds(minX: number, maxX: number, minZ: number, maxZ: number, minY: number, maxY: number): void;
            isPositonOutsideOfBounds(x: number, y: number, z: number): boolean;
            isPositonInBounds(x: number, y: number, z: number): boolean;
            setChunkBounds(pow2X: number, pow2Y: number, pow2Z: number): void;
            setRegionBounds(pow2X: number, pow2Y: number, pow2Z: number): void;
            getRegionPosition(x: number, y: number, z: number): {
                x: number;
                y: number;
                z: number;
            };
            getChunkPosition(x: number, y: number, z: number): {
                x: number;
                y: number;
                z: number;
            };
            getChunkKey(chunkPOS: import("Meta/index.js").Position3Matrix): string;
            getChunkKeyFromPosition(x: number, y: number, z: number): string;
            getRegionKey(regionPOS: import("Meta/index.js").Position3Matrix): string;
            getRegionKeyFromPosition(x: number, y: number, z: number): string;
            getVoxelPositionFromChunkPosition(x: number, y: number, z: number, chunkPOS: import("Meta/index.js").Position3Matrix): {
                x: number;
                y: number;
                z: number;
            };
            getRichPositionKey(x: number, y: number, z: number): string;
            getVoxelPosition(x: number, y: number, z: number): {
                x: number;
                y: number;
                z: number;
            };
            getColumnKey(x: number, z: number, y?: number): string;
            getColumnPosition(x: number, z: number, y?: number): {
                x: number;
                z: number;
                y: number;
            };
        };
        maps: {
            voxels: {
                substanceMap: Record<import("Meta/index.js").VoxelSubstanceType, number>;
                substanceRecord: Record<number, import("Meta/index.js").VoxelSubstanceType>;
                byteLengths: {
                    substance: number;
                    shapeId: number;
                    hardness: number;
                    material: number;
                    checkCollision: number;
                    colliderId: number;
                    lightSource: number;
                    lightValue: number;
                    totalLength: number;
                };
                dataIndexes: {
                    substance: number;
                    shapeId: number;
                    hardness: number;
                    material: number;
                    checkCollision: number;
                    colliderId: number;
                    lightSource: number;
                    lightValue: number;
                };
            };
        };
        chunks: {
            reader: {
                chunkByteSize: number;
                indexSizes: {
                    header: number;
                    states: number;
                    position: number;
                    minMax: number;
                    heightMap: number;
                    voxelData: number;
                    voxelStateData: number;
                };
                indexes: {
                    header: number;
                    states: number;
                    position: number;
                    minMax: number;
                    heightMap: number;
                    voxelData: number;
                    voxelStateData: number;
                };
                byteLengths: {
                    heightMapData: number;
                    voxelData: number;
                    voxelStateData: number;
                };
                syncSettings(): void;
                _getVoxelDataIndex(x: number, y: number, z: number): number;
                _getVoxelStateDataIndex(x: number, y: number, z: number): number;
                _chunkPositon: {
                    x: number;
                    y: number;
                    z: number;
                };
                getChunkPosition(chunk: DataView): {
                    x: number;
                    y: number;
                    z: number;
                };
                setChunkPosition(chunk: DataView, position: import("Meta/index.js").Position3Matrix): void;
                getVoxelChunkDataIndex(x: number, y: number, z: number, secondary?: boolean): number;
                hmBounds: {
                    x: number;
                    y: number;
                    z: number;
                };
                _getHeightMapIndex(x: number, y: number, z: number): number;
                getHeightMapIndex(x: number, y: number, z: number): number;
                getVoxelData(chunkData: import("../Meta/Data/WorldData.types.js").ChunkData, x: number, y: number, z: number, secondary?: boolean): number;
                setVoxelData(chunkData: import("../Meta/Data/WorldData.types.js").ChunkData, x: number, y: number, z: number, data: number, secondary?: boolean): number;
                getVoxelDataUseObj(chunkData: import("../Meta/Data/WorldData.types.js").ChunkData, position: import("Meta/index.js").Position3Matrix, secondary?: boolean): number;
                setVoxelDataUseObj(chunkData: import("../Meta/Data/WorldData.types.js").ChunkData, position: import("Meta/index.js").Position3Matrix, data: number, secondary?: boolean): number;
                getHeightMapData(chunkData: DataView, x: number, y: number, z: number): number;
                setHeightMapData(chunkData: DataView, x: number, y: number, z: number, data: number): void;
                getChunkMinData(chunkData: DataView): number;
                setChunkMinData(chunkData: DataView, data: number): void;
                getChunkMaxData(chunkData: DataView): number;
                setChunkMaxData(chunkData: DataView, data: number): void;
            };
            heightMap: {
                _getHeightMapData: Record<import("Meta/index.js").VoxelTemplateSubstanceType, (byteData: number) => number>;
                _setHeightMapData: Record<import("Meta/index.js").VoxelTemplateSubstanceType, (height: number, byteData: number) => number>;
                _markSubstanceAsNotExposed: Record<import("Meta/index.js").VoxelTemplateSubstanceType, (data: number) => number>;
                _markSubstanceAsExposed: Record<import("Meta/index.js").VoxelTemplateSubstanceType, (data: number) => number>;
                _isSubstanceExposed: Record<import("Meta/index.js").VoxelTemplateSubstanceType, (data: number) => boolean>;
                getStartingHeightMapValue(): number;
                initalizeChunk(chunkData: DataView): void;
                updateChunkMinMax(voxelPOS: import("Meta/index.js").Position3Matrix, chunkData: DataView): void;
                getChunkMin(chunkData: DataView): number;
                getChunkMax(chunkData: DataView): number;
                calculateHeightRemoveDataForSubstance(height: number, substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: DataView): boolean | undefined;
                calculateHeightAddDataForSubstance(height: number, substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
                getLowestExposedVoxel(x: number, z: number, chunk: DataView): number;
                getHighestExposedVoxel(x: number, z: number, chunk: DataView): number;
                isSubstanceExposed(substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): boolean;
                markSubstanceAsExposed(substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
                markSubstanceAsNotExposed(substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
                setMinYForSubstance(height: number, substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
                getMinYForSubstance(substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): number;
                setMaxYForSubstance(height: number, substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
                getMaxYForSubstance(substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): number;
            };
            state: {
                positionByte: {
                    _poisiton: {
                        x: number;
                        y: number;
                        z: number;
                    };
                    _positionMasks: {
                        x: number;
                        z: number;
                        y: number;
                    };
                    getY(byteData: number): number;
                    getPosition(byteData: number): {
                        x: number;
                        y: number;
                        z: number;
                    };
                    setPosition(x: number, y: number, z: number): number;
                    setPositionUseObj(positionObj: import("Meta/index.js").Position3Matrix): number;
                };
                indexes: {
                    states: number;
                    minHeight: number;
                    maxHeight: number;
                    voxelCount1: number;
                    voxelCount2: number;
                    voxelCount3: number;
                };
                _chunkStates: {
                    empty: boolean;
                    worldGenDone: boolean;
                    sunLightDone: boolean;
                    RGBLightDone: boolean;
                    fluidDone: boolean;
                    magmaDone: boolean;
                };
                _chunkStateMask: {
                    empty: number;
                    emptyIndex: number;
                    worldGenDone: number;
                    worldGenIndex: number;
                    sunLightDone: number;
                    sunLightIndex: number;
                    RGBLightDone: number;
                    RGBLightIndex: number;
                    fluidDone: number;
                    fluidIndex: number;
                    magmaDone: number;
                    magmaIndex: number;
                };
                updateChunkMinMax(voxelPOS: import("Meta/index.js").Position3Matrix, chunkStatesData: Uint32Array): void;
                getChunkMin(chunkStatesData: Uint32Array): number;
                getChunkMax(chunkStatesData: Uint32Array): number;
                isEmpty(chunkStatesData: Uint32Array): boolean;
                isWorldGenDone(chunkStatesData: Uint32Array): boolean;
                isSunLightUpdatesDone(chunkStatesData: Uint32Array): boolean;
                isRGBLightUpdatesDone(chunkStatesData: Uint32Array): boolean;
                isFluidFlowDone(chunkStatesData: Uint32Array): boolean;
                isMagmaFlowDone(chunkStatesData: Uint32Array): boolean;
                getFullChunkStates(chunkStatesData: Uint32Array): {
                    empty: boolean;
                    worldGenDone: boolean;
                    sunLightDone: boolean;
                    RGBLightDone: boolean;
                    fluidDone: boolean;
                    magmaDone: boolean;
                };
                addToVoxelCount(voxelSubstance: import("Meta/index.js").VoxelSubstanceType, chunkStatesData: Uint32Array): void;
                subtractFromVoxelCount(voxelSubstance: import("Meta/index.js").VoxelSubstanceType, chunkStatesData: Uint32Array): void;
                getTotalVoxels(chunkStatesData: Uint32Array): void;
                getTotalVoxelsOfASubstance(voxelSubstance: import("Meta/index.js").VoxelSubstanceType, chunkStatesData: Uint32Array): void;
            };
        };
    };
    worldComm: import("../Libs/ThreadComm/Comm/Comm.js").CommBase;
    parentComm: import("../Libs/ThreadComm/Comm/Comm.js").CommBase;
    syncSettings(data: EngineSettingsData): void;
    reStart(): void;
    isReady(): boolean;
    $INIT(): Promise<void>;
};
export declare type DivineVoxelEngineFX = typeof DVEFX;