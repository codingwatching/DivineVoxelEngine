import { WorldTasks } from "../../Data/Constants/InterComms/WorldTasks.js";
import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";
export async function InitWorker(DVEC) {
    await ThreadComm.$INIT("constructor");
    DVEC.DVEB.$INIT();
    DVEC.DVEP.$INIT();
    await DVEC.UTIL.createPromiseCheck({
        check: () => {
            return DVEC.isReady();
        },
        onReady() {
            if (DVEC.environment == "browser") {
                if (DVEC.TC.threadNumber == 1) {
                    DVEC.worldComm.sendMessage(WorldTasks.syncShapeMap, [
                        DVEC.DVEB.shapeManager.shapeMap,
                    ]);
                }
            }
        },
        checkInterval: 1,
    });
}