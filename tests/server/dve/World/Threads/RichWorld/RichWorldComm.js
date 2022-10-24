import { WorldToRichWorldMessages } from "../../../Data/Constants/InterComms/WorldToRichWorld.js";
import { ThreadComm } from "../../../Libs/ThreadComm/ThreadComm.js";
const richWorldCommBase = ThreadComm.createComm("rich-world");
const richWorldComm = Object.assign(richWorldCommBase, {
    setInitalData(voxelId, x, y, z) {
        richWorldComm.sendMessage(WorldToRichWorldMessages.setInitalData, [
            voxelId,
            x,
            y,
            z,
        ]);
    },
    removeRichData(x, y, z) {
        richWorldComm.sendMessage(WorldToRichWorldMessages.removeRichData, [x, y, z]);
    },
});
export const RichWorldComm = richWorldComm;