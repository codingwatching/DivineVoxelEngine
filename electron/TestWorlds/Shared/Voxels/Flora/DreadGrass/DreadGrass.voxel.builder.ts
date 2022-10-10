import type { VoxelConstructorObject } from "out/Meta/index.js";
let uv = 0;
export const DreadGrassVoxelBuilderThread: VoxelConstructorObject = {
 id: "dve:dreadgrass",

 hooks: {
  texturesRegistered: (DVEB) => {
   uv = DVEB.textureManager.getTextureUV("flora", "dreadgrass");
  },
 },
 process: function (data, DVEB) {
  data.uvTemplate.push(uv, uv);
  data.overlayUVTemplate.push(0, 0, 0, 0);
  const lightValue = DVEB.processor.worldMatrix.getLight(
   data.x,
   data.y,
   data.z
  );
  data.aoTemplate.push(1, 1);
  data.lightTemplate.push(lightValue, lightValue);
 },
};