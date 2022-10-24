import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";

import { WorldGen } from "./WorldGen/WorldGen.js";
import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";
import { DVEM } from "../../../out/Libs/Math/DivineVoxelEngineMath.js";
import { VoxelData } from "../../../out/Meta/index.js";
import { RegisterItemData } from "../../Shared/Functions/RegisterItemData.js";

RegisterVoxels(DVEW);
RegisterItemData(DVEW);

(self as any).DVEW = DVEW;
let startX = -16;
let startZ = -16;
let endX = 16;
let endZ = 16;
const builder = DVEW.getBuilder();
const load = () => {
 for (let x = startX; x <= endX; x += 16) {
  for (let z = startZ; z <= endZ; z += 16) {
   builder.setXZ(x, z).buildColumn();
  }
 }
};

const generate = () => {
 for (let x = startX; x <= endX; x += 16) {
  for (let z = startZ; z <= endZ; z += 16) {
   WorldGen.generateChunk(x, z);
  }
 }
};

let ready = false;
let cameraDirection = new Float32Array();
let cameraPosition = new Float32Array();
let pickerCubePosition = new Float32Array();
DVEW.parentComm.listenForMessage("connect-camera", (data) => {
 cameraDirection = new Float32Array(data[1]);
 cameraPosition = new Float32Array(data[2]);
 pickerCubePosition = new Float32Array(data[3]);
 ready = true;
});

await DVEW.$INIT();

generate();
const brush = DVEW.getBrush();
for (let i = 13; i > -2; i -= 2) {
 brush.setId("dve:dataholder").setXYZ(i, 31, 31).paint();
}


load();

await DVEW.UTIL.createPromiseCheck({
 check: () => ready,
 checkInterval: 1,
});

const positionVector = DVEM.getVector3(0, 0, 0);

const pickedVector = DVEM.getVector3(0, 0, 0);

DVEW.parentComm.listenForMessage("pick-voxel", (data) => {
 const voxel = DVEW.data.world.voxel.get(
  0,
  pickedVector.x,
  pickedVector.y,
  pickedVector.z
 );
 if (voxel && voxel[0] != "dve:air") {
  const data = DVEW.voxelManager.getVoxelData(voxel[0]);
  if (!data) return;
  const voxelData = data;
  if (voxelData.isRich) {
   DVEW.richWorldComm.sendMessage("pick-voxel", [
    pickedVector.x,
    pickedVector.y,
    pickedVector.z,
   ]);
  }
 }
});

setInterval(() => {
 positionVector.updateFromArray(cameraPosition);

 const pickVector = {
  x: cameraDirection[0] * 8 + cameraPosition[0],
  y: cameraDirection[1] * 8 + cameraPosition[1],
  z: cameraDirection[2] * 8 + cameraPosition[2],
 };
 const voxels = DVEM.visitAll(positionVector, pickVector);

 for (let i = 0; i < voxels.length; i += 3) {
  const x = voxels[i];
  const y = voxels[i + 1];
  const z = voxels[i + 2];

  const voxel = DVEW.data.world.voxel.get(0, x, y, z);
  if (voxel && voxel[0] != "dve:air") {
   pickedVector.updateVector(x, y, z);
   pickerCubePosition[0] = x;
   pickerCubePosition[1] = y;
   pickerCubePosition[2] = z;
   break;
  }
 }
}, 20);

DVEW.createItem("dve:debug-item", 3, 35, 0);
DVEW.createItem("dve:dreamvine-item", 3, 35, 5);
/* DVEW.entityConstructor.begin(3, 3, 3);
DVEW.entityConstructor.fillLight(15, 15, 15, 15);
DVEW.entityConstructor.addVoxel("dve:dreamstone-stair", 0, 0, 1, 1, 1);
DVEW.entityConstructor.build(8, 33, 0);



 */