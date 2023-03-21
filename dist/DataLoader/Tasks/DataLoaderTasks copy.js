import { DVEDL } from "../DivineVoxelEngineDataLoader.js";
import { ThreadComm } from "threadcomm";
import { DataHanlderWrapper } from "../../DataLoader/DataHandler/DataHandlerWrapper.js";
import { WorldRegister } from "../../Data/World/WorldRegister.js";
export const DataLoaderTasks = {
    saveRegion: ThreadComm.registerTasks("save-region", async (data, onDone) => {
        await DataHanlderWrapper.saveRegion(data);
        return onDone ? onDone() : false;
    }, "deferred"),
    loadRegion: ThreadComm.registerTasks("load-region", async (data, onDone) => {
        await DataHanlderWrapper.loadRegion(data);
        return onDone ? onDone() : false;
    }, "deferred"),
    loadRegionHeader: ThreadComm.registerTasks("load-region-header", async (data, onDone) => {
        const success = await DataHanlderWrapper.loadRegionHeader(data);
        return onDone ? onDone(success) : false;
    }, "deferred"),
    saveColumn: ThreadComm.registerTasks("save-column", async (data, onDone) => {
        await DataHanlderWrapper.saveColumn(data);
        return onDone ? onDone() : false;
    }, "deferred"),
    loadColumn: ThreadComm.registerTasks("load-column", async (data, onDone) => {
        if (WorldRegister.column.get(data)) {
            if (onDone) {
                onDone();
            }
            return;
        }
        await DataHanlderWrapper.loadColumn(data);
        const inte = setInterval(() => {
            if (WorldRegister.column.get(data)) {
                onDone ? onDone(true) : false;
                clearInterval(inte);
            }
        }, 1);
    }, "deferred"),
    unLoadColumn: ThreadComm.registerTasks("unload-column", async (data, onDone) => {
        if (!WorldRegister.column.get(data)) {
            if (onDone)
                onDone();
            return;
        }
        await DataHanlderWrapper.saveColumn(data);
        DVEDL.worldComm.runTasks("unload-column", data);
        const inte = setInterval(() => {
            if (!WorldRegister.column.get(data)) {
                if (onDone)
                    onDone();
                clearInterval(inte);
            }
        }, 1);
    }, "deferred"),
    setPath: ThreadComm.registerTasks("set-path", async (data, onDone) => {
        await DataHanlderWrapper.setPath(data[0]);
        return onDone ? onDone() : false;
    }, "deferred"),
    columnExists: ThreadComm.registerTasks("column-exists", async (data, onDone) => {
        if (WorldRegister.column.get(data)) {
            if (onDone) {
                onDone();
            }
            return;
        }
        const exists = await DataHanlderWrapper.columnExists(data);
        if (onDone) {
            onDone(exists);
        }
        return false;
    }, "deferred"),
    columnTimestamp: ThreadComm.registerTasks("column-timestamp", async (data, onDone) => {
        const time = await DataHanlderWrapper.columnTimestamp(data);
        if (onDone) {
            onDone(time);
        }
        return 0;
    }, "deferred"),
};