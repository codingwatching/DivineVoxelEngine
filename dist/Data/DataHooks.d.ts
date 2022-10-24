import { LocationData } from "Meta/Data/CommonTypes.js";
export declare const DataHooks: {
    chunk: {
        onGetAsync: import("../Libs/Hooks/Classes/AsyncHook.js").AsyncHook<LocationData, SharedArrayBuffer>;
        onGetSync: import("../Libs/Hooks/Classes/SyncHook.js").SyncHook<LocationData, SharedArrayBuffer>;
        onNew: import("../Libs/Hooks/Classes/AsyncHook.js").AsyncHook<LocationData, void>;
    };
    paint: {
        addToRGBUpdate: import("../Libs/Hooks/Classes/SyncHook.js").SyncHook<LocationData, void>;
        onNuild: import("../Libs/Hooks/Classes/SyncHook.js").SyncHook<LocationData, void>;
    };
};