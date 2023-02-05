import { DVEShaderBuilder } from "../../../Libs/Shaders/DVEShaderBuilder.js";
import type {
 ShaderCodeBody,
 ShaderDataTypes,
} from "Libs/Shaders/Types/ShaderData.types";
import type { DVEShader } from "Libs/Shaders/Classes/DVEShader.js";
import { RegisterFragFunctions } from "./Code/Functions/FragmentFunctions.js";
import { RegisterVertexFunctions } from "./Code/Functions/VertexFunctions.js";
import { RegisterVertexSnippets } from "./Code/Snippets/VertexSnippets.js";
import { RegisterFragmentSnippets } from "./Code/Snippets/FragmentSnippets.js";
import { RegisterFogShaders } from "./Code/Functions/FogShaders.js";
import { RegisterNoiseFunctions } from "./Code/Functions/UtilShaders.js";
import { RegisterVoxelSnippets } from "./Code/Snippets/VoxelSnippets.js";
export const DVEShaders = {
 builder: DVEShaderBuilder,
 voxelAttributes: <[id: string, type: ShaderDataTypes][]>[
  ["position", "vec3"],
  ["normal", "vec3"],
  ["indices", "float"],
  ["faceData", "float"],
  ["ocuv3", "vec4"],
  ["cuv3", "vec3"],
  ["colors", "vec4"],
  ["aoColors", "float"],
  ["lightColors", "vec4"],
 ],
 voxelSharedUniforms: <[id: string, type: ShaderDataTypes][]>[
  ["time", "float"],
  ["fogOptions", "vec4"],
  ["vFogColor", "vec3"],
  ["sunLightLevel", "float"],
  ["baseLevel", "float"],
  ["doAO", "float"],
  ["doSun", "float"],
  ["doRGB", "float"],
  ["doColor", "float"],
 ],
 voxelVertexUniforms: <[id: string, type: ShaderDataTypes][]>[
  ["world", "mat4"],
  ["viewProjection", "mat4"],

  ["worldOrigin", "vec3"],
  ["cameraPosition", "vec3"],

  ["doEffects", "float"],
 ],

 voxelVarying: <[id: string, type: ShaderDataTypes, set: ShaderCodeBody][]>[
  [
   "cameraPOS",
   "vec3",
   {
    GLSL: "cameraPOS = cameraPosition;\n",
   },
  ],
  [
   "worldPOS",
   "vec3",
   {
    GLSL: `
    vec4 worldPOSTemp =  world * vec4(position, 1.0);
    worldPOS = vec3(worldPOSTemp.x,worldPOSTemp.y,worldPOSTemp.z);
    `,
   },
  ],
  [
   "worldPOSNoOrigin",
   "vec3",
   {
    GLSL: `mat4 a;
a[0] = world[0];
a[1] = world[1];
a[2] = world[2];
a[3] = vec4(world[3].xyz - worldOrigin.xyz, 1.);
vec4 temp =  a * vec4(position , 1.0);
worldPOSNoOrigin =  vec3(temp.x,temp.y,temp.z);`,
   },
  ],
  [
   "vDistance",
   "float",
   {
    GLSL: " vDistance = distance(cameraPOS , worldPOS );\n",
   },
  ],
  [
   "mipMapLevel",
   "float",
   {
    GLSL: `
    mipMapLevel = 0.;
    if(vDistance <= 30.) {
     mipMapLevel = 0.;
    }
    if(vDistance > 50. &&  vDistance <= 70.) {
     mipMapLevel = 1.;
    }
    if(vDistance > 70. && vDistance < 90.) {
      mipMapLevel = 2.;
    }
    if(vDistance >= 90.) {
     mipMapLevel = 3.;
     }
    `,
   },
  ],
  [
   "vAnimation",
   "float",
   {
    GLSL: " vAnimation = float(getAnimationType());\n",
   },
  ],
  [
   "animIndex",
   "float",
   {
    GLSL: " animIndex = getUVFace(cuv3.z);\n",
   },
  ],
  [
   "vUV",
   "vec3",
   {
    GLSL: "vUV = cuv3;;\n",
   },
  ],
  [
   "vOVUV",
   "vec4",
   {
    GLSL: `vOVUV.x = getOverlayUVFace(ocuv3.x);
vOVUV.y = getOverlayUVFace(ocuv3.y);
vOVUV.z = getOverlayUVFace(ocuv3.z);
vOVUV.w = getOverlayUVFace(ocuv3.w);`,
   },
  ],
  [
   "vNormal",
   "vec3",
   {
    GLSL: "vNormal = normal;\n",
   },
  ],
  [
   "vNColor",
   "float",
   {
    GLSL: `if(normal.y == 1.) {
     vNColor = 1.2;
}
if(normal.y == -1.) {
     vNColor = .4;
}
if(abs(normal.x) == 1. || abs(normal.z)  == 1. ) {
     vNColor = 1.;
}`,
   },
  ],
  [
   "rgbLColor",
   "vec4",
   {
    GLSL: `if(doRGB == 1.0){
     rgbLColor = vec4(lightColors.rgb,1.);
} else {
     rgbLColor = vec4(1.,1.,1.,1.);
}`,
   },
  ],
  [
   "sunLColor",
   "vec4",
   {
    GLSL: `   if(doSun == 1.0){
     float s = lightColors.a;
     sunLColor = vec4(s,s,s,1.);
  } else {
     sunLColor = vec4(1.,1.,1.,1.);
  }`,
   },
  ],
  [
   "aoColor",
   "vec4",
   {
    GLSL: `if(doAO == 1.0){
aoColor = vec4(aoColors,aoColors,aoColors,1.);
} else {
aoColor = vec4(1.0,1.0,1.0,1.0); 
}`,
   },
  ],
  [
   "vColors",
   "vec4",
   {
    GLSL: `if(doColor == 1.0){
     vColors = vec4(1.0,1.0,1.0,1.0); 
} else {
     vColors = vec4(1.0,1.0,1.0,1.0); 
}`,
   },
  ],
  [
   "vFlow",
   "float",
   {
    GLSL: `
vFlow = 0.;
if(vAnimation == 1.) {
vFlow = 1.;
}
if(vAnimation == 2.) {
vFlow = -1.;
}`,
   },
  ],
 ],
 voxelFragFunctions: <string[]>[],
 voxelVertexFunctions: <string[]>[],

 _defaultShader: <DVEShader>{},

 $INIT() {
  RegisterVoxelSnippets(DVEShaderBuilder);
  RegisterVertexSnippets(DVEShaderBuilder);
  RegisterFragmentSnippets(DVEShaderBuilder);
  RegisterNoiseFunctions(DVEShaderBuilder);
  RegisterFogShaders(DVEShaderBuilder);
  RegisterVertexFunctions(DVEShaderBuilder);
  RegisterFragFunctions(DVEShaderBuilder);
  this.voxelFragFunctions = ["#dve_fmb2", "#dve_fmb3", "#dve_fog", "#dve_frag"];
  this.voxelVertexFunctions = ["#dve_fmb2", "#dve_fmb3", "#dve_vertex"];

  const shader = DVEShaderBuilder.shaders.create("default");
  shader.addAttributes(this.voxelAttributes);
  shader.addUniform(this.voxelSharedUniforms, "shared");
  shader.addUniform(this.voxelVertexUniforms, "vertex");
  shader.addVarying(this.voxelVarying);
  shader.loadInFunctions(this.voxelFragFunctions, "frag");
  shader.loadInFunctions(this.voxelVertexFunctions, "vertex");
  shader.addTextures([
   ["voxelTexture", { type: "sampler2DArray", isArray: true, arrayLength: 4 }],
   [
    "voxelOverlayTexture",
    { type: "sampler2DArray", isArray: true, arrayLength: 4 },
   ],
  ]);
  shader.setCodeBody("vertex", `@standard_position`);
  shader.setCodeBody("frag", `@standard_color`);
  this._defaultShader = shader;
 },
 createVoxelShader(id: string) {
  const shader = this._defaultShader.clone(id);
  return shader;
 },
 createSkyBoxShader(id: string) {
  const shader = DVEShaderBuilder.shaders.create(id);
  shader.addAttributes([
   ["position", "vec3"],
   ["normal", "vec3"],
  ]);
  shader.loadInFunctions(["#dve_fmb2", "#dve_fmb3", "#dve_fog", "doFog"]);
  shader.addUniform(
   [
    ["fogOptions", "vec4"],
    ["vFogInfos", "vec4"],
    ["vFogColor", "vec3"],
    ["time", "float"],
    ["cameraPosition", "vec3"],
    ["cameraDirection", "vec3"],
   ],
   "shared"
  );
  shader.addVarying([
   [
    "cameraPOS",
    "vec3",
    {
     GLSL: "cameraPOS = cameraPosition;\n",
    },
   ],
   [
    "worldPOS",
    "vec3",
    {
     GLSL: `vec4 worldPOSTemp =  world * vec4(position, 1.0);
worldPOS = vec3(worldPOSTemp.x,worldPOSTemp.y,worldPOSTemp.z);`,
    },
   ],
   [
    "vDistance",
    "float",
    {
     GLSL: " vDistance = distance(cameraPOS , worldPOS );\n",
    },
   ],
  ]);
  shader.addUniform(
   [
    ["world", "mat4"],
    ["viewProjection", "mat4"],
   ],
   "vertex"
  );
  shader.setCodeBody("vertex", `@standard_position`);
  shader.setCodeBody(
   "frag",
   `vec3 c = vFogColor.rgb;
c.r -= .2;
c.g -= .2;
c.b -= .2;
vec4 skyboxColor = vec4(c.rgb,1);
vec3 finalColor = doFog(skyboxColor);
gl_FragColor = vec4(finalColor.rgb,1);`
  );
  return shader;
 },
};

DVEShaders.$INIT();