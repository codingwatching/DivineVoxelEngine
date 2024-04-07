import type { Vec3Array } from "Math";
import type { DivineShader } from "@divinestar/shaders";
import type { TypedArrays } from "@divinestar/binary/DBO/Types/DBO.types";

export type DVENodeMeshAttributes = [
  id: string,
  data: TypedArrays,
  stride: number,
  componentTypes?: number,
  noramlizer?: number
][];

export type NodeMaterialData = {
 id: string;
 textureTypeId?: string;
 shaderId: string;
} & NodeMaterialOptions;

export type NodeMaterialOptions = {
 alphaTesting: boolean;
 alphaBlending: boolean;
 mipMapBias?:number;
 hasEffects?: boolean;
 backFaceCulling?: boolean;
};

export type NodeMeshData = {
 id: string;
 materialId: string;
 boundingBoxMaxSize: Vec3Array;
 type?: string;
} & NodeMeshOptions;

export type NodeMeshOptions = {
 materialId: string;
 boundingBoxMaxSize: Vec3Array;
 type?: string;
};

export type NodeSubstanceData = {
 id: string;
 shader: DivineShader;
// texture: TextureType;
 material: NodeMaterialOptions;
 mesh: NodeMeshOptions;
};