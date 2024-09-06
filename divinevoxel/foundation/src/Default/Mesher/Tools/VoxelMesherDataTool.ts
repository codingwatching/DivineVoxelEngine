import type { FaceDataOverride } from "../Types/Override.types";
//objects
import { LightGradient } from "../Calc/Light/LightGradient.js";
import { FlowGradient } from "../Calc/Flow/FlowGradient.js";
import { OverrideManager } from "../Rules/Overrides/OverridesManager.js";
import { SubstanceRules } from "../Rules/SubstanceRules.js";

//tools
import { BuilderDataTool } from "./BuilderDataTool.js";
import { MesherDataTool } from "@amodx/meshing/Tools/MesherDataTools";

//data
import {
  QuadScalarVertexData,
  QuadVector3VertexData,
} from "@amodx/meshing/Classes/QuadVertexData";
import { VoxelTemplateDataTool } from "./VoxelTemplateDataTool.js";
import { BinaryNumberTypes } from "@amodx/binary";
import {
  VoxelFaces,
  VoxelFaceDirections,
  VoxelFacesArray,
} from "@divinevoxel/core/Math";
import { QuadVerticies } from "@amodx/meshing/Geometry.types";
import { FaceDataCalc } from "../Calc/Light/FaceDataCalc";

export class VoxelMesherDataTool extends MesherDataTool {
  template = new VoxelTemplateDataTool();
  voxel = new BuilderDataTool();
  nVoxel = new BuilderDataTool();

  dataCalculated: Record<VoxelFaces, boolean>;
  geometryData: Record<VoxelFaces, Record<QuadVerticies, ([number[],number[],number[]])>>;
  lightData: Record<VoxelFaces, Record<QuadVerticies, number>>;

  faceDataOverride = <FaceDataOverride>{
    face: VoxelFaces.South,
    default: false,
    currentVoxel: <BuilderDataTool>{},
    neighborVoxel: <BuilderDataTool>{},
  };
  constructor() {
    super();
    this.faceDataOverride.currentVoxel = this.voxel;
    this.faceDataOverride.neighborVoxel = this.nVoxel;

    this.dataCalculated = [] as any;
    for (const face of VoxelFacesArray) {
      this.dataCalculated[face] = false;
    }

    this.geometryData = [] as any;
    for (const face of VoxelFacesArray) {
      this.geometryData[face] = [] as any;
      this.geometryData[face][QuadVerticies.TopRight] = [[],[],[]];
      this.geometryData[face][QuadVerticies.TopLeft] = [[],[],[]];
      this.geometryData[face][QuadVerticies.BottomLeft] = [[],[],[]];
      this.geometryData[face][QuadVerticies.BottomRight] = [[],[],[]];
    }

    this.lightData = [] as any;
    for (const face of VoxelFacesArray) {
      this.lightData[face] = [] as any;
      this.lightData[face][QuadVerticies.TopRight] = 0;
      this.lightData[face][QuadVerticies.TopLeft] = 0;
      this.lightData[face][QuadVerticies.BottomLeft] = 0;
      this.lightData[face][QuadVerticies.BottomRight] = 0;
    }

    (
      [
        ["voxelData", [[], 1, BinaryNumberTypes.Float32]],
        ["uv", [[], 2, BinaryNumberTypes.Float32]],
        ["textureIndex", [[], 3, BinaryNumberTypes.Float32]],
        ["colors", [[], 3, BinaryNumberTypes.Float32]],
      ] as const
    ).forEach(([key, data]) => this.attributes.set(key, data as any));

    (
      [
        ["light", new QuadScalarVertexData()],
        ["ao", new QuadScalarVertexData()],
        ["animation", new QuadScalarVertexData()],
        ["level", new QuadScalarVertexData()],
        ["overlay-uvs", new QuadScalarVertexData()],
      ] as const
    ).forEach(([key, data]) => this.quadVertexData.set(key, data as any));

    (
      [
        ["face-flipped", 0],
        ["texture-index", 0],
      ] as const
    ).forEach(([key, data]) => this.vars.set(key, data as any));
  }

  calculateFaceData(direction: VoxelFaces) {
    if (this.dataCalculated[direction]) return true;
    FaceDataCalc.calculate(direction, this);
  }

  clearCalculatedData() {
    this.dataCalculated[VoxelFaces.Top] = false;
    this.dataCalculated[VoxelFaces.Bottom] = false;
    this.dataCalculated[VoxelFaces.North] = false;
    this.dataCalculated[VoxelFaces.South] = false;
    this.dataCalculated[VoxelFaces.East] = false;
    this.dataCalculated[VoxelFaces.West] = false;
  }

  calculateLight(direction: VoxelFaces, ignoreAO = false) {
    /*     if (this.template.isAcive()) {
      this.template._light = this.template._lights[direction];
      this.template._ao = this.template._aos[direction];
      return;
    } */
    LightGradient.calculate(direction, this, ignoreAO);
  }

  calculateFlow() {
    if (this.template.isAcive()) {
      return;
    }
    FlowGradient.calculate(this);
  }

  getAnimationData() {
    return this.quadVertexData.get("animation")!;
  }

  getWorldLight() {
    if (this.template.isAcive()) {
      return this.template._light;
    }
    return this.quadVertexData.get("light")!;
  }


  getWorldAO() {
    if (this.template.isAcive()) {
      return this.template._ao;
    }
    return this.quadVertexData.get("ao")!;
  }

  getWorldLevel() {
    if (this.template.isAcive()) {
      return this.template._level;
    }
    return this.quadVertexData.get("level")!;
  }

  getOverlayTextures() {
    return this.quadVertexData.get("overlay-uvs")!;
  }

  setTexture(uv: number) {
    this.vars.set("texture-index", uv)!;
    return this;
  }

  getTexture() {
    return this.vars.get("texture-index")!;
  }

  setFaceFlipped(value: boolean) {
    this.vars.set("face-flipped", value ? 1 : 0);
    return this;
  }

  isFaceFlipped() {
    return this.vars.get("face-flipped")! == 1;
  }

  isFaceExposed(face: VoxelFaces) {
    /*     if (this.template.isAcive()) {
      return this.template.isFaceExposed(face);
    } */
    const voxelExists = this.nVoxel.loadInAt(
      VoxelFaceDirections[face][0] + this.voxel.x,
      VoxelFaceDirections[face][1] + this.voxel.y,
      VoxelFaceDirections[face][2] + this.voxel.z
    );

    if (!voxelExists || !this.nVoxel.isRenderable()) return true;
    let finalResult = false;
    let substanceRuleResult = SubstanceRules.exposedCheck(
      this.voxel.getSubstance(),
      this.nVoxel.getSubstance()
    );

    this.faceDataOverride.face = face;
    this.faceDataOverride.default = substanceRuleResult;
    finalResult = substanceRuleResult;
    this.faceDataOverride.default = finalResult;
    finalResult = OverrideManager.FaceExposedShapeCheck.run(
      this.voxel.getShapeId(),
      OverrideManager.ANY,
      this.faceDataOverride
    );
    this.faceDataOverride.default = finalResult;
    finalResult = OverrideManager.FaceExposedShapeCheck.run(
      this.voxel.getShapeId(),
      this.nVoxel.getShapeId(),
      this.faceDataOverride
    );
    this.faceDataOverride.default = finalResult;
    finalResult = OverrideManager.FaceExposedVoxelCheck.run(
      this.voxel.getId(true),
      OverrideManager.ANY,
      this.faceDataOverride
    );
    finalResult = OverrideManager.FaceExposedVoxelCheck.run(
      this.voxel.getId(true),
      this.nVoxel.getId(true),
      this.faceDataOverride
    );
    return finalResult;
  }
}
