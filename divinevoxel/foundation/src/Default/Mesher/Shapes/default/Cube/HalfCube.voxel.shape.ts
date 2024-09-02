import { VoxelFaces } from "@divinevoxel/core/Math/index.js";
import { OverrideManager } from "../../../Rules/Overrides/OverridesManager.js";
import { ShapeTool } from "../../ShapeTool.js";
import { QuadScalarVertexData } from "@amodx/meshing/Classes/QuadVertexData";
import { VoxelShapeBase } from "../../VoxelShapeBase.js";
import { VoxelShapeManager } from "../../VoxelShapeManager.js";
import { Quad } from "@amodx/meshing/Classes/Quad.js";
import { DirectionNames } from "@divinevoxel/core";
import { QuadUVData } from "@amodx/meshing/Geometry.types.js";
import { VoxelShaderData } from "../../../../../Data/VoxelShaderData.js";
import { VoxelGeometry } from "../../../Geometry/VoxelGeometry.js";
const animationState = new QuadScalarVertexData();

export enum HalfCubeStates {
  Bottom = 0,
  Top = 1,
  North = 2,
  Sourth = 3,
  East = 4,
  West = 5,
}

const fullUvs: QuadUVData = [
  [1, 1],
  [0, 1],
  [0, 0],
  [1, 0],
];
const halfUvs: QuadUVData = [
  [1, 0.5],
  [0, 0.5],
  [0, 0],
  [1, 0],
];

const Quads: Record<DirectionNames, Quad> = {
  top: Quad.Create(
    [
      [0, 0.5, 0],
      [1, 0.5, 1],
    ],
    fullUvs,
    false,
    0
  ),
  bottom: Quad.Create(
    [
      [0, 0, 0],
      [1, 0, 1],
    ],
    fullUvs,
    false,
    1
  ),
  north: Quad.Create(
    [
      [0, 0, 1],
      [1, 0.5, 1],
    ],
    halfUvs,
    false,
    1
  ),
  south: Quad.Create(
    [
      [0, 0, 0],
      [1, 0.5, 0],
    ],
    halfUvs,
    false,
    0
  ),
  east: Quad.Create(
    [
      [1, 0, 0],
      [1, 0.5, 1],
    ],
    halfUvs,
    false,
    0
  ),
  west: Quad.Create(
    [
      [0, 0, 0],
      [0, 0.5, 1],
    ],
    halfUvs,
    false,
    1
  ),
};

class HalfCubeVoxelShapeClass extends VoxelShapeBase {
  id = "#dve_half_cube";
  init(): void {
    //cullface
    OverrideManager.FaceExposedShapeCheck.register(
      this.numberId,
      VoxelShapeManager.getMappedId("#dve_flat_panel"),
      (data) => {
        return false;
      }
    );
    OverrideManager.FaceExposedShapeCheck.register(
      this.numberId,
      VoxelShapeManager.getMappedId("#dve_cube"),
      (data) => {
        if (data.currentVoxel.getShapeState() == HalfCubeStates.Top) {
          if (data.face == VoxelFaces.Top) {
            return false;
          }
          if (data.face == VoxelFaces.Bottom) {
            return true;
          }
          return true;
        }

        if (data.currentVoxel.getShapeState() == HalfCubeStates.Bottom) {
          if (data.face == VoxelFaces.Top) {
            return true;
          }
          if (data.face == VoxelFaces.Bottom) {
            return false;
          }
          return true;
        }

        return true;
      }
    );
    OverrideManager.FaceExposedShapeCheck.register(
      this.numberId,
      this.numberId,
      (data) => {
        if (
          data.currentVoxel.getShapeState() == HalfCubeStates.Top &&
          data.neighborVoxel.getShapeState() == HalfCubeStates.Top
        ) {
          if (data.face == VoxelFaces.Top) {
            return true;
          }
          if (data.face == VoxelFaces.Bottom) {
            return true;
          }
          return false;
        }

        if (
          data.currentVoxel.getShapeState() == HalfCubeStates.Bottom &&
          data.neighborVoxel.getShapeState() == HalfCubeStates.Bottom
        ) {
          if (data.face == VoxelFaces.Top) {
            return true;
          }
          if (data.face == VoxelFaces.Bottom) {
            return true;
          }
          return false;
        }
        if (
          data.currentVoxel.getShapeState() == HalfCubeStates.Top &&
          data.neighborVoxel.getShapeState() == HalfCubeStates.Bottom
        ) {
          if (data.face == VoxelFaces.Top) {
            return false;
          }
          if (data.face == VoxelFaces.Bottom) {
            return true;
          }
          return true;
        }
        if (
          data.currentVoxel.getShapeState() == HalfCubeStates.Bottom &&
          data.neighborVoxel.getShapeState() == HalfCubeStates.Top
        ) {
          if (data.face == VoxelFaces.Top) {
            return true;
          }
          if (data.face == VoxelFaces.Bottom) {
            return false;
          }
          return true;
        }
        return true;
      }
    );
    OverrideManager.FaceExposedShapeCheck.register(
      this.numberId,
      VoxelShapeManager.getMappedId("#dve_stair"),
      (data) => {
        return true;
      }
    );
    //AO
    OverrideManager.AO.register(
      this.numberId,
      VoxelShapeManager.getMappedId("#dve_flat_panel"),
      (data) => {
        return false;
      }
    );
    OverrideManager.AO.register(this.numberId, this.numberId, (data) => {
      if (
        data.currentVoxel.getShapeState() == HalfCubeStates.Top &&
        data.neighborVoxel.getShapeState() == HalfCubeStates.Top
      ) {
        return false;
      }

      if (
        data.currentVoxel.getShapeState() == HalfCubeStates.Bottom &&
        data.neighborVoxel.getShapeState() == HalfCubeStates.Bottom
      ) {
        return false;
      }
      if (
        data.currentVoxel.getShapeState() == HalfCubeStates.Top &&
        data.neighborVoxel.getShapeState() == HalfCubeStates.Bottom
      ) {
        return true;
      }
      if (
        data.currentVoxel.getShapeState() == HalfCubeStates.Bottom &&
        data.neighborVoxel.getShapeState() == HalfCubeStates.Top
      ) {
        return true;
      }
      return false;
    });

    OverrideManager.AO.register(
      this.numberId,
      VoxelShapeManager.getMappedId("#dve_cube"),
      (data) => {
        if (data.currentVoxel.getShapeState() == HalfCubeStates.Top) {
          if(data.neighborVoxel.y == data.currentVoxel.y - 1) return false;
          return data.default;
        }

        if (
          data.currentVoxel.getShapeState() == HalfCubeStates.Bottom &&
          data.currentVoxel.y < data.neighborVoxel.y
        ) {
          return false;
        }

        return data.default;
      }
    );
  }

  start() {
    const state = ShapeTool.data.voxel.getShapeState();
    if (state == HalfCubeStates.Top) {
      ShapeTool.origin.y += 0.5;
    }
  }
  add = {
    top() {
      Quads.top.flip = ShapeTool.data.isFaceFlipped();
      if (ShapeTool.data.voxel.getSubstnaceData().isWindAffected()) {
        ShapeTool.data
          .getAnimationData()
          .setAll(VoxelShaderData.AnimationStates.WindAffected.Box);
      }

      VoxelGeometry.addQuad(ShapeTool.data, ShapeTool.origin, Quads.top);
    },
    bottom() {
      Quads.bottom.flip = ShapeTool.data.isFaceFlipped();
      if (ShapeTool.data.voxel.getSubstnaceData().isWindAffected()) {
        ShapeTool.data
          .getAnimationData()
          .setAll(VoxelShaderData.AnimationStates.WindAffected.Box);
      }
      VoxelGeometry.addQuad(ShapeTool.data, ShapeTool.origin, Quads.bottom);
    },
    north() {
      Quads.north.flip = ShapeTool.data.isFaceFlipped();
      if (ShapeTool.data.voxel.getSubstnaceData().isWindAffected()) {
        ShapeTool.data
          .getAnimationData()
          .setAll(VoxelShaderData.AnimationStates.WindAffected.Box);
      }
      VoxelGeometry.addQuad(ShapeTool.data, ShapeTool.origin, Quads.north);
    },
    south() {
      Quads.south.flip = ShapeTool.data.isFaceFlipped();
      if (ShapeTool.data.voxel.getSubstnaceData().isWindAffected()) {
        ShapeTool.data
          .getAnimationData()
          .setAll(VoxelShaderData.AnimationStates.WindAffected.Box);
      }
      VoxelGeometry.addQuad(ShapeTool.data, ShapeTool.origin, Quads.south);
    },
    east() {
      Quads.east.flip = ShapeTool.data.isFaceFlipped();
      if (ShapeTool.data.voxel.getSubstnaceData().isWindAffected()) {
        ShapeTool.data
          .getAnimationData()
          .setAll(VoxelShaderData.AnimationStates.WindAffected.Box);
      }
      VoxelGeometry.addQuad(ShapeTool.data, ShapeTool.origin, Quads.east);
    },
    west() {
      Quads.west.flip = ShapeTool.data.isFaceFlipped();
      if (ShapeTool.data.voxel.getSubstnaceData().isWindAffected()) {
        ShapeTool.data
          .getAnimationData()
          .setAll(VoxelShaderData.AnimationStates.WindAffected.Box);
      }
      VoxelGeometry.addQuad(ShapeTool.data, ShapeTool.origin, Quads.west);
    },
  };
}

export const HalfCubeVoxelShape = new HalfCubeVoxelShapeClass();
