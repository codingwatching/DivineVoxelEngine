import { VoxelModelData } from "../VoxelModel.types";

export const simpleCube: VoxelModelData = {
  id: "dve_simple_cube",
  relationsSchema: [],
  shapeStateSchema: [],
  arguments: {
    texture: {
      type: "texture",
    },
  },
  shapeStatesConditonalNodes: {},
  shapeStatesNodes: {
    "*": [
      {
        id: "cube",
        geometryId: "dve_cube",
        inputs: {
          "@upTex": "@texture",
          "@downTex": "@texture",
          "@northTex": "@texture",
          "@southTex": "@texture",
          "@eastTex": "@texture",
          "@westTex": "@texture",
        },
      },
    ],
  },
};

export const simpleHalfCube: VoxelModelData = {
  id: "dve_simple_half_cube",
  relationsSchema: [],
  shapeStateSchema: [
    {
      name: "placement",
      type: "string",
      values: {
        0: "down",
        1: "up",
        2: "north",
        3: "south",
        4: "east",
        5: "west",
      },
    },
  ],
  arguments: {
    upDownTextures: {
      type: "texture",
    },
    sideTextures: {
      type: "texture",
    },
  },
  shapeStatesConditonalNodes: {},
  shapeStatesNodes: {
    "placement=down": [
      {
        id: "half_cube",
        geometryId: "dve_half_cube_down_half",
        inputs: {
          "@upTex": "@upDownTextures",
          "@downTex": "@upDownTextures",
          "@northTex": "@sideTextures",
          "@southTex": "@sideTextures",
          "@eastTex": "@sideTextures",
          "@westTex": "@sideTextures",
        },
      },
    ],
    "placement=up": [
      {
        id: "half_cube",
        position: [0, 0.5, 0],
        geometryId: "dve_half_cube_down_half",
        inputs: {
          "@upTex": "@upDownTextures",
          "@downTex": "@upDownTextures",
          "@northTex": "@sideTextures",
          "@southTex": "@sideTextures",
          "@eastTex": "@sideTextures",
          "@westTex": "@sideTextures",
        },
      },
    ],
    "placement=south": [
      {
        id: "half_cube",
        geometryId: "dve_half_cube_south_half",
        inputs: {
          "@upTex": "@sideTextures",
          "@downTex": "@sideTextures",
          "@northTex": "@upDownTextures",
          "@southTex": "@upDownTextures",
          "@eastTex": "@sideTextures",
          "@westTex": "@sideTextures",
        },
      },
    ],
    "placement=north": [
      {
        id: "half_cube",
        position: [0, 0, 0.5],
        geometryId: "dve_half_cube_south_half",
        inputs: {
          "@upTex": "@sideTextures",
          "@downTex": "@sideTextures",
          "@northTex": "@upDownTextures",
          "@southTex": "@upDownTextures",
          "@eastTex": "@sideTextures",
          "@westTex": "@sideTextures",
        },
      },
    ],

    "placement=west": [
      {
        id: "half_cube",
        geometryId: "dve_half_cube_west_half",
        inputs: {
          "@upTex": "@sideTextures",
          "@downTex": "@sideTextures",
          "@northTex": "@sideTextures",
          "@southTex": "@sideTextures",
          "@eastTex": "@upDownTextures",
          "@westTex": "@upDownTextures",
        },
      },
    ],
    "placement=east": [
      {
        id: "half_cube",
        position: [0.5, 0, 0],
        geometryId: "dve_half_cube_west_half",
        inputs: {
          "@upTex": "@sideTextures",
          "@downTex": "@sideTextures",
          "@northTex": "@sideTextures",
          "@southTex": "@sideTextures",
          "@eastTex": "@upDownTextures",
          "@westTex": "@upDownTextures",
        },
      },
    ],
  },
};

export const pillarCube: VoxelModelData = {
  id: "dve_pillar_cube",
  relationsSchema: [
    {
      name: "same-down",
      conditions: [
        {
          type: "same-voxel",
          direction: [0, -1, 0],
        },
      ],
    },
    {
      name: "same-up",
      conditions: [
        {
          type: "same-voxel",
          direction: [0, 1, 0],
        },
      ],
    },
    {
      name: "same-east",
      conditions: [
        {
          type: "same-voxel",
          direction: [1, 0, 0],
        },
      ],
    },
    {
      name: "same-west",
      conditions: [
        {
          type: "same-voxel",
          direction: [-1, 0, 0],
        },
      ],
    },
    {
      name: "same-north",
      conditions: [
        {
          type: "same-voxel",
          direction: [0, 0, 1],
        },
      ],
    },
    {
      name: "same-south",
      conditions: [
        {
          type: "same-voxel",
          direction: [0, 0, -1],
        },
      ],
    },
  ],
  shapeStateSchema: [
    {
      name: "direction",
      type: "string",
      values: {
        0: "down-up",
        1: "south-north",
        2: "west-east",
      },
    },
  ],
  arguments: {
    sideConnectedTex: {
      type: "texture",
    },
    sideDisconnectedTex: {
      type: "texture",
    },
    sideUpTex: {
      type: "texture",
    },
    sideDownTex: {
      type: "texture",
    },
    upTex: {
      type: "texture",
    },
    downTex: {
      type: "texture",
    },
  },
  shapeStatesConditonalNodes: {},

  shapeStatesNodes: {
    "direction=down-up,same-down=false,same-up=false": [
      {
        id: "cube",
        geometryId: "dve_cube",
        inputs: {
          "@upTex": "@upTex",
          "@downTex": "@downTex",
          "@northTex": "@sideDisconnectedTex",
          "@southTex": "@sideDisconnectedTex",
          "@eastTex": "@sideDisconnectedTex",
          "@westTex": "@sideDisconnectedTex",
        },
      },
    ],
    "direction=down-up,same-down=true,same-up=false": [
      {
        id: "cube",
        geometryId: "dve_cube",
        inputs: {
          "@upTex": "@upTex",
          "@downTex": "@downTex",
          "@northTex": "@sideUpTex",
          "@southTex": "@sideUpTex",
          "@eastTex": "@sideUpTex",
          "@westTex": "@sideUpTex",
        },
      },
    ],
    "direction=down-up,same-down=false,same-up=true": [
      {
        id: "cube",
        geometryId: "dve_cube",
        inputs: {
          "@upTex": "@upTex",
          "@downTex": "@downTex",
          "@northTex": "@sideDownTex",
          "@southTex": "@sideDownTex",
          "@eastTex": "@sideDownTex",
          "@westTex": "@sideDownTex",
        },
      },
    ],
    "direction=down-up,same-down=true,same-up=true": [
      {
        id: "cube",
        geometryId: "dve_cube",
        inputs: {
          "@upTex": "@upTex",
          "@downTex": "@downTex",
          "@northTex": "@sideConnectedTex",
          "@southTex": "@sideConnectedTex",
          "@eastTex": "@sideConnectedTex",
          "@westTex": "@sideConnectedTex",
        },
      },
    ],

    "direction=south-north,same-south=false,same-north=false": [],
    "direction=south-north,same-south=true,same-north=false": [],
    "direction=south-north,same-south=false,same-north=true": [],
    "direction=south-north,same-south=true,same-north=true": [],
    "direction=west-east,same-west=false,same-east=false": [],
    "direction=west-east,same-west=true,same-east=false": [],
    "direction=west-east,same-west=false,same-east=true": [],
    "direction=west-east,same-west=true,same-east=true": [],
  },
};
