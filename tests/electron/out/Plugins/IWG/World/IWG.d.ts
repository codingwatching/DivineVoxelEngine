import type { IWGData } from "../Meta/IWG.types";
import { ColumnDataTool } from "../../../Tools/Data/ColumnDataTool.js";
import { BuilderTool } from "../../../Tools/Build/Builder.js";
/**# Infinite World Generator
 *
 */
export declare class IWG {
    data: IWGData;
    columnTool: ColumnDataTool;
    nColumnTool: ColumnDataTool;
    builder: BuilderTool;
    tasks: {
        _data: {
            dimension: string;
            queue: string;
        };
        _thread: string;
        setFocalPoint(x: number, y: number, z: number, dimension?: string): void;
        generate: {
            async: {
                _s: any;
                add(x: number, y: number, z: number, data?: any): void;
                run(onDone: Function): void;
                runAndAwait(): Promise<void>;
            };
            deferred: {
                _s: any;
                run(x: number, y: number, z: number, data: any, onDone: (data: any) => void): void;
            };
        };
        voxelUpdate: {
            erease: {
                _s: any;
                add(x: number, y: number, z: number): void;
                run(onDone: Function): void;
                runAndAwait(): Promise<void>;
            };
            paint: {
                _s: any;
                add(x: number, y: number, z: number, raw: number[]): void;
                run(onDone: Function): void;
                runAndAwait(): Promise<void>;
            };
        };
        build: {
            chunk: {
                _s: any;
                add(x: number, y: number, z: number): void;
                run(onDone: Function): void;
                runAndAwait(): Promise<void>;
            };
        };
        explosion: {
            run: {
                _s: any;
                add(x: number, y: number, z: number, radius: number): void;
                run(onDone: Function): void;
                runAndAwait(): Promise<void>;
            };
        };
        flow: {
            update: {
                _s: any;
                add(x: number, y: number, z: number): void;
                run(onDone: Function): void;
                runAndAwait(): Promise<void>;
            };
            remove: {
                _s: any;
                add(x: number, y: number, z: number): void;
                run(onDone: Function): void;
                runAndAwait(): Promise<void>;
            };
        };
        light: {
            rgb: {
                update: {
                    _s: any;
                    add(x: number, y: number, z: number, queue?: string | null): void;
                    run(onDone: Function): void;
                    runAndAwait(): Promise<void>;
                };
                remove: {
                    _s: any;
                    add(x: number, y: number, z: number, queue?: string | null): void;
                    run(onDone: Function): void;
                    runAndAwait(): Promise<void>;
                };
            };
            sun: {
                update: {
                    _s: any;
                    add(x: number, y: number, z: number): void;
                    run(onDone: Function): void;
                    runAndAwait(): Promise<void>;
                };
                remove: {
                    _s: any;
                    add(x: number, y: number, z: number): void;
                    run(onDone: Function): void;
                    runAndAwait(): Promise<void>;
                };
            };
            worldSun: {
                _s: any;
                deferred: {
                    _s: any;
                    run(x: number, y: number, z: number, onDone: (data: any) => void): void;
                };
                add(x: number, z: number, y?: number): void;
                run(onDone: Function): void;
                runAndAwait(): Promise<void>;
            };
        };
    };
    dimension: string;
    _cachedPosition: number[];
    _columnQueue: number[][];
    _generateQueue: number[][];
    _visitedMap: Map<string, boolean>;
    _activeColumns: Map<string, number[]>;
    _generateMap: Map<string, boolean>;
    _sunMap: Map<string, boolean>;
    constructor(data: IWGData);
    setDimension(id: string): void;
    update(): void;
}