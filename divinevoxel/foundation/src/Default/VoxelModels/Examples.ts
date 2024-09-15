import { VoxelGeometryData, VoxelModelData } from "./VoxelModel.types";

export const cube: VoxelGeometryData = {
  id: "dve_cube",
  arguments: {
    upTex: {
      type: "texture",
    },
    upUvs: {
      type: "box-uv",
      default: [0, 0, 1, 1],
    },
    downTex: {
      type: "texture",
    },
    downUvs: {
      type: "box-uv",
      default: [0, 0, 1, 1],
    },
    northTex: {
      type: "texture",
    },
    northUvs: {
      type: "box-uv",
      default: [0, 0, 1, 1],
    },
    southTex: {
      type: "texture",
    },
    southUvs: {
      type: "box-uv",
      default: [0, 0, 1, 1],
    },
    eastTex: {
      type: "texture",
    },
    eastUvs: {
      type: "box-uv",
      default: [0, 0, 1, 1],
    },
    westTex: {
      type: "texture",
    },
    westUvs: {
      type: "box-uv",
      default: [0, 0, 1, 1],
    },
  },
  nodes: [
    {
      type: "box",
      points: [
        [0, 0, 0],
        [1, 1, 1],
      ],
      faces: {
        up: {
          texture: "@upTex",
          uv: "@upUvs",
        },
        down: {
          texture: "@downTex",
          uv: "@downUvs",
        },
        north: {
          texture: "@northTex",
          uv: "@northUvs",
        },
        south: {
          texture: "@southTex",
          uv: "@southUvs",
        },
        east: {
          texture: "@eastTex",
          uv: "@eastUvs",
        },
        west: {
          texture: "@westTex",
          uv: "@westUvs",
        },
      },
    },
  ],
};
export const halfCube: VoxelGeometryData = {
  id: "dve_half_cube",
  arguments: {
    upTex: {
      type: "texture",
    },
    upUvs: {
      type: "box-uv",
      default: [0, 0, 1, 1],
    },
    downTex: {
      type: "texture",
    },
    downUvs: {
      type: "box-uv",
      default: [0, 0, 1, 1],
    },
    northTex: {
      type: "texture",
    },
    northUvs: {
      type: "box-uv",
      default: [0, 0, 1, 1],
    },
    southTex: {
      type: "texture",
    },
    southUvs: {
      type: "box-uv",
      default: [0, 0, 1, 1],
    },
    eastTex: {
      type: "texture",
    },
    eastUvs: {
      type: "box-uv",
      default: [0, 0, 1, 1],
    },
    westTex: {
      type: "texture",
    },
    westUvs: {
      type: "box-uv",
      default: [0, 0, 1, 1],
    },
  },
  nodes: [
    {
      type: "box",
      points: [
        [0, 0, 0],
        [1, 0.5, 1],
      ],
      faces: {
        up: {
          texture: "@upTex",
          uv: "@upUvs",
        },
        down: {
          texture: "@downTex",
          uv: "@downUvs",
        },
        north: {
          texture: "@northTex",
          uv: "@northUvs",
        },
        south: {
          texture: "@southTex",
          uv: "@southUvs",
        },
        east: {
          texture: "@eastTex",
          uv: "@eastUvs",
        },
        west: {
          texture: "@westTex",
          uv: "@westUvs",
        },
      },
    },
  ],
};

export const quaterCubeWestEast: VoxelGeometryData = {
  id: "dve_quater_cube_west_east",
  arguments: {
    upTex: {
      type: "texture",
    },
    upUvs: {
      type: "box-uv",
      default: [0, 0, 1, 1],
    },
    downTex: {
      type: "texture",
    },
    downUvs: {
      type: "box-uv",
      default: [0, 0, 1, 1],
    },
    northTex: {
      type: "texture",
    },
    northUvs: {
      type: "box-uv",
      default: [0, 0, 1, 1],
    },
    southTex: {
      type: "texture",
    },
    southUvs: {
      type: "box-uv",
      default: [0, 0, 1, 1],
    },
    eastTex: {
      type: "texture",
    },
    eastUvs: {
      type: "box-uv",
      default: [0, 0, 1, 1],
    },
    westTex: {
      type: "texture",
    },
    westUvs: {
      type: "box-uv",
      default: [0, 0, 1, 1],
    },
  },
  nodes: [
    {
      type: "box",
      points: [
        [0, 0, 0],
        [1, 0.5, 0.5],
      ],
      faces: {
        up: {
          texture: "@upTex",
          uv: "@upUvs",
        },
        down: {
          texture: "@downTex",
          uv: "@downUvs",
        },
        north: {
          texture: "@northTex",
          uv: "@northUvs",
        },
        south: {
          texture: "@southTex",
          uv: "@southUvs",
        },
        east: {
          texture: "@eastTex",
          uv: "@eastUvs",
        },
        west: {
          texture: "@westTex",
          uv: "@westUvs",
        },
      },
    },
  ],
};
export const quaterCubeSouthNorth: VoxelGeometryData = {
  id: "dve_quater_cube_south_north",
  arguments: {
    upTex: {
      type: "texture",
    },
    upUvs: {
      type: "box-uv",
      default: [0, 0, 1, 1],
    },
    downTex: {
      type: "texture",
    },
    downUvs: {
      type: "box-uv",
      default: [0, 0, 1, 1],
    },
    northTex: {
      type: "texture",
    },
    northUvs: {
      type: "box-uv",
      default: [0, 0, 1, 1],
    },
    southTex: {
      type: "texture",
    },
    southUvs: {
      type: "box-uv",
      default: [0, 0, 1, 1],
    },
    eastTex: {
      type: "texture",
    },
    eastUvs: {
      type: "box-uv",
      default: [0, 0, 1, 1],
    },
    westTex: {
      type: "texture",
    },
    westUvs: {
      type: "box-uv",
      default: [0, 0, 1, 1],
    },
  },
  nodes: [
    {
      type: "box",
      points: [
        [0, 0, 0],
        [0.5, 0.5, 1],
      ],
      faces: {
        up: {
          texture: "@upTex",
          uv: "@upUvs",
        },
        down: {
          texture: "@downTex",
          uv: "@downUvs",
        },
        north: {
          texture: "@northTex",
          uv: "@northUvs",
        },
        south: {
          texture: "@southTex",
          uv: "@southUvs",
        },
        east: {
          texture: "@eastTex",
          uv: "@eastUvs",
        },
        west: {
          texture: "@westTex",
          uv: "@westUvs",
        },
      },
    },
  ],
};

export const quaterCubeUpDown: VoxelGeometryData = {
  id: "dve_quater_cube_up_down",
  arguments: {
    upTex: {
      type: "texture",
    },
    upUvs: {
      type: "box-uv",
      default: [0, 0, 1, 1],
    },
    downTex: {
      type: "texture",
    },
    downUvs: {
      type: "box-uv",
      default: [0, 0, 1, 1],
    },
    northTex: {
      type: "texture",
    },
    northUvs: {
      type: "box-uv",
      default: [0, 0, 1, 1],
    },
    southTex: {
      type: "texture",
    },
    southUvs: {
      type: "box-uv",
      default: [0, 0, 1, 1],
    },
    eastTex: {
      type: "texture",
    },
    eastUvs: {
      type: "box-uv",
      default: [0, 0, 1, 1],
    },
    westTex: {
      type: "texture",
    },
    westUvs: {
      type: "box-uv",
      default: [0, 0, 1, 1],
    },
  },
  nodes: [
    {
      type: "box",
      points: [
        [0, 0, 0],
        [0.5, 1, 0.5],
      ],
      faces: {
        up: {
          texture: "@upTex",
          uv: "@upUvs",
        },
        down: {
          texture: "@downTex",
          uv: "@downUvs",
        },
        north: {
          texture: "@northTex",
          uv: "@northUvs",
        },
        south: {
          texture: "@southTex",
          uv: "@southUvs",
        },
        east: {
          texture: "@eastTex",
          uv: "@eastUvs",
        },
        west: {
          texture: "@westTex",
          uv: "@westUvs",
        },
      },
    },
  ],
};

export const eighthCube: VoxelGeometryData = {
  id: "dve_eighth_cube",
  arguments: {
    upTex: {
      type: "texture",
    },
    downTex: {
      type: "texture",
    },
    northTex: {
      type: "texture",
    },
    southTex: {
      type: "texture",
    },
    eastTex: {
      type: "texture",
    },
    westTex: {
      type: "texture",
    },
  },
  nodes: [
    {
      type: "box",
      points: [
        [0, 0, 0],
        [0.5, 0.5, 0.5],
      ],
      faces: {
        up: {
          texture: "@upTex",
          uv: [0, 0, 1, 1],
        },
        down: {
          texture: "@downTex",
          uv: [0, 0, 1, 1],
        },
        north: {
          texture: "@northTex",
          uv: [0, 0, 1, 0.5],
        },
        south: {
          texture: "@southTex",
          uv: [0, 0, 1, 0.5],
        },
        east: {
          texture: "@eastTex",
          uv: [0, 0, 1, 0.5],
        },
        west: {
          texture: "@westTex",
          uv: [0, 0, 1, 0.5],
        },
      },
    },
  ],
};

export const fencePost: VoxelGeometryData = {
  id: "dve_fence_post",
  arguments: {
    upTex: {
      type: "texture",
    },
    downTex: {
      type: "texture",
    },
    northTex: {
      type: "texture",
    },
    southTex: {
      type: "texture",
    },
    eastTex: {
      type: "texture",
    },
    westTex: {
      type: "texture",
    },
  },
  nodes: [
    {
      type: "box",
      points: [
        [6 / 16, 0, 6 / 16],
        [10 / 16, 1, 10 / 16],
      ],
      faces: {
        up: {
          texture: "@upTex",
          uv: [6 / 16, 6 / 16, 10 / 16, 10 / 16],
        },
        down: {
          texture: "@downTex",
          uv: [6 / 16, 6 / 16, 10 / 16, 10 / 16],
        },
        north: {
          texture: "@northTex",
          uv: [6 / 16, 0, 10 / 16, 1],
        },
        south: {
          texture: "@southTex",
          uv: [6 / 16, 0, 10 / 16, 1],
        },
        east: {
          texture: "@eastTex",
          uv: [6 / 16, 0, 10 / 16, 1],
        },
        west: {
          texture: "@westTex",
          uv: [6 / 16, 0, 10 / 16, 1],
        },
      },
    },
  ],
};

export const fenceEastWest: VoxelGeometryData = {
  id: "dve_fence_east_west",
  arguments: {
    upTex: {
      type: "texture",
    },
    downTex: {
      type: "texture",
    },
    northTex: {
      type: "texture",
    },
    southTex: {
      type: "texture",
    },
    eastTex: {
      type: "texture",
    },
    westTex: {
      type: "texture",
    },
  },
  nodes: [
    {
      type: "box",
      points: [
        [0, 12 / 16, 7 / 16],
        [6 / 16, 15 / 16, 9 / 16],
      ],
      faces: {
        up: {
          texture: "@upTex",
          uv: [7 / 16, 7 / 16, 9 / 16, 9 / 16],
        },
        down: {
          texture: "@downTex",
          uv: [7 / 16, 7 / 16, 9 / 16, 9 / 16],
        },
        north: {
          texture: "@northTex",
          uv: [0, 7 / 16, 6 / 16, 9 / 16],
        },
        south: {
          texture: "@southTex",
          uv: [0, 7 / 16, 6 / 16, 9 / 16],
        },
        east: {
          texture: "@eastTex",
          uv: [0, 7 / 16, 6 / 16, 9 / 16],
        },
        west: {
          texture: "@westTex",
          uv: [0, 7 / 16, 6 / 16, 9 / 16],
        },
      },
    },
    {
      type: "box",
      points: [
        [0, 6 / 16, 7 / 16],
        [6 / 16, 9 / 16, 9 / 16],
      ],
      faces: {
        up: {
          texture: "@upTex",
          uv: [0, 0, 1, 1],
        },
        down: {
          texture: "@downTex",
          uv: [0, 0, 1, 1],
        },
        north: {
          texture: "@northTex",
          uv: [0, 0, 0.5, 0.5],
        },
        south: {
          texture: "@southTex",
          uv: [0, 0, 0.5, 0.5],
        },
        east: {
          texture: "@eastTex",
          uv: [0, 0, 0.5, 0.5],
        },
        west: {
          texture: "@westTex",
          uv: [0, 0, 0.5, 0.5],
        },
      },
    },
  ],
};

export const fenceNorthsouth: VoxelGeometryData = {
  id: "dve_fence_north_south",
  arguments: {
    upTex: {
      type: "texture",
    },
    downTex: {
      type: "texture",
    },
    northTex: {
      type: "texture",
    },
    southTex: {
      type: "texture",
    },
    eastTex: {
      type: "texture",
    },
    westTex: {
      type: "texture",
    },
  },
  nodes: [
    {
      type: "box",
      points: [
        [7 / 16, 12 / 16, 0],
        [9 / 16, 15 / 16, 6 / 16],
      ],
      faces: {
        up: {
          texture: "@upTex",
          uv: [7 / 16, 7 / 16, 9 / 16, 9 / 16],
        },
        down: {
          texture: "@downTex",
          uv: [7 / 16, 7 / 16, 9 / 16, 9 / 16],
        },
        north: {
          texture: "@northTex",
          uv: [0, 7 / 16, 6 / 16, 9 / 16],
        },
        south: {
          texture: "@southTex",
          uv: [0, 7 / 16, 6 / 16, 9 / 16],
        },
        east: {
          texture: "@eastTex",
          uv: [0, 7 / 16, 6 / 16, 9 / 16],
        },
        west: {
          texture: "@westTex",
          uv: [0, 7 / 16, 6 / 16, 9 / 16],
        },
      },
    },
    {
      type: "box",
      points: [
        [7 / 16, 6 / 16, 0],
        [9 / 16, 9 / 16, 6 / 16],
      ],
      faces: {
        up: {
          texture: "@upTex",
          uv: [7 / 16, 7 / 16, 9 / 16, 9 / 16],
        },
        down: {
          texture: "@downTex",
          uv: [7 / 16, 7 / 16, 9 / 16, 9 / 16],
        },
        north: {
          texture: "@northTex",
          uv: [0, 7 / 16, 6 / 16, 9 / 16],
        },
        south: {
          texture: "@southTex",
          uv: [0, 7 / 16, 6 / 16, 9 / 16],
        },
        east: {
          texture: "@eastTex",
          uv: [0, 7 / 16, 6 / 16, 9 / 16],
        },
        west: {
          texture: "@westTex",
          uv: [0, 7 / 16, 6 / 16, 9 / 16],
        },
      },
    },
  ],
};

export const simpleCube: VoxelModelData = {
  id: "dve_simple_cube",
  relationsSchema: [],
  shapeStateSchema: [
    {
      name: "direction",
      values: {
        0: "south",
        1: "north",
        2: "east",
        3: "west",
      },
    },
    {
      name: "upsidedown",
      values: {
        0: "false",
        1: "true",
      },
    },
  ],
  arguments: {
    texture: {
      type: "texture",
    },
  },
  shapeStatesConditonalNodes: {},
  shapeStatesOverrides: {},

  shapeStatesNodes: {
    "direction=south,upsidedown=false": [
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
  shapeStatesOverrides: {
    "direction=down-up,same-down=false,same-up=false": [
      {
        id: "cube",
        data: {
          inputs: {
            "@upTex": "@upTex",
            "@upUvs": [0, 0, 0.5, 0.5],
            "@downTex": "@downTex",
            "@northTex": "@sideDisconnectedTex",
            "@southTex": "@sideDisconnectedTex",
            "@eastTex": "@sideDisconnectedTex",
            "@westTex": "@sideDisconnectedTex",
          },
        },
      },
    ],
    "direction=down-up,same-down=true,same-up=false": [
      {
        id: "cube",
        data: {
          inputs: {
            "@upTex": "@upTex",
            "@downTex": "@downTex",
            "@northTex": "@sideDisconnectedTex",
            "@southTex": "@sideDisconnectedTex",
            "@eastTex": "@sideDisconnectedTex",
            "@westTex": "@sideDisconnectedTex",
          },
        },
      },
    ],
    "direction=down-up,same-down=false,same-up=true": [
      {
        id: "cube",
        data: {
          inputs: {
            "@upTex": "@upTex",
            "@downTex": "@downTex",
            "@northTex": "@sideDisconnectedTex",
            "@southTex": "@sideDisconnectedTex",
            "@eastTex": "@sideDisconnectedTex",
            "@westTex": "@sideDisconnectedTex",
          },
        },
      },
    ],
    "direction=down-up,same-down=true,same-up=true": [
      {
        id: "cube",
        data: {
          inputs: {
            "@upTex": "@upTex",
            "@downTex": "@downTex",
            "@northTex": "@sideDisconnectedTex",
            "@southTex": "@sideDisconnectedTex",
            "@eastTex": "@sideDisconnectedTex",
            "@westTex": "@sideDisconnectedTex",
          },
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

  shapeStatesNodes: {
    "*": [
      {
        id: "cube",
        geometryId: "dve_cube",
        inputs: {},
      },
    ],
  },
};

export const stair: VoxelModelData = {
  id: "dve_stair",
  relationsSchema: [],
  shapeStateSchema: [
    {
      name: "direction",
      values: {
        0: "south",
        1: "north",
        2: "east",
        3: "west",
      },
    },
    {
      name: "connected",
      values: {
        0: "false",
        1: "true",
      },
    },
    {
      name: "upsidedown",
      values: {
        0: "false",
        1: "true",
      },
    },
  ],
  arguments: {
    southTex: {
      type: "texture",
    },
    northTex: {
      type: "texture",
    },
    eastTex: {
      type: "texture",
    },
    westTex: {
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
  shapeStatesOverrides: {},
  shapeStatesNodes: {
    "direction=south,connected=false,upsidedown=false": [
      {
        id: "base",
        geometryId: "dve_half_cube",
        inputs: {
          "@upTex": "@upTex",
          "@downTex": "@downTex",
          "@northTex": "@northTex",
          "@southTex": "@southTex",
          "@eastTex": "@eastTex",
          "@westTex": "@westTex",
        },
      },
      {
        id: "up",
        geometryId: "dve_quater_cube_west_east",
        position: [0, 0.5, 0.5],
        inputs: {
          "@upTex": "@upTex",
          "@downTex": "@downTex",
          "@northTex": "@northTex",
          "@southTex": "@southTex",
          "@eastTex": "@eastTex",
          "@westTex": "@westTex",
        },
      },
    ],
    "direction=north,connected=false,upsidedown=false": [
      {
        id: "base",
        geometryId: "dve_half_cube",
        inputs: {
          "@upTex": "@upTex",
          "@downTex": "@downTex",
          "@northTex": "@northTex",
          "@southTex": "@southTex",
          "@eastTex": "@eastTex",
          "@westTex": "@westTex",
        },
      },
      {
        id: "up",
        geometryId: "dve_quater_cube_west_east",
        position: [0.5, 0.5, 0],
        inputs: {
          "@upTex": "@upTex",
          "@downTex": "@downTex",
          "@northTex": "@northTex",
          "@southTex": "@southTex",
          "@eastTex": "@eastTex",
          "@westTex": "@westTex",
        },
      },
    ],
    "direction=east,connected=false,upsidedown=false": [
      {
        id: "base",
        geometryId: "dve_half_cube",
        inputs: {
          "@upTex": "@upTex",
          "@downTex": "@downTex",
          "@northTex": "@northTex",
          "@southTex": "@southTex",
          "@eastTex": "@eastTex",
          "@westTex": "@westTex",
        },
      },
      {
        id: "up",
        geometryId: "dve_quater_cube_south_north",
        position: [0, 0.5, 0],
        inputs: {
          "@upTex": "@upTex",
          "@downTex": "@downTex",
          "@northTex": "@northTex",
          "@southTex": "@southTex",
          "@eastTex": "@eastTex",
          "@westTex": "@westTex",
        },
      },
    ],
    "direction=west,connected=false,upsidedown=false": [
      {
        id: "base",
        geometryId: "dve_half_cube",
        inputs: {
          "@upTex": "@upTex",
          "@downTex": "@downTex",
          "@northTex": "@northTex",
          "@southTex": "@southTex",
          "@eastTex": "@eastTex",
          "@westTex": "@westTex",
        },
      },
      {
        id: "up",
        geometryId: "dve_quater_cube_south_north",
        position: [0.5, 0.5, 0],
        inputs: {
          "@upTex": "@upTex",
          "@downTex": "@downTex",
          "@northTex": "@northTex",
          "@southTex": "@southTex",
          "@eastTex": "@eastTex",
          "@westTex": "@westTex",
        },
      },
    ],
    "direction=south,connected=false,upsidedown=true": [
      {
        id: "base",
        geometryId: "dve_half_cube",
        position: [0, 0.5, 0],
        inputs: {
          "@upTex": "@upTex",
          "@downTex": "@downTex",
          "@northTex": "@northTex",
          "@southTex": "@southTex",
          "@eastTex": "@eastTex",
          "@westTex": "@westTex",
        },
      },
      {
        id: "up",
        geometryId: "dve_quater_cube_west_east",
        inputs: {
          "@upTex": "@upTex",
          "@downTex": "@downTex",
          "@northTex": "@northTex",
          "@southTex": "@southTex",
          "@eastTex": "@eastTex",
          "@westTex": "@westTex",
        },
      },
    ],
    "direction=north,connected=false,upsidedown=true": [
      {
        id: "base",
        geometryId: "dve_half_cube",
        position: [0, 0.5, 0],
        inputs: {
          "@upTex": "@upTex",
          "@downTex": "@downTex",
          "@northTex": "@northTex",
          "@southTex": "@southTex",
          "@eastTex": "@eastTex",
          "@westTex": "@westTex",
        },
      },
      {
        id: "up",
        geometryId: "dve_quater_cube_west_east",
        position: [0, 0, 0.5],
        inputs: {
          "@upTex": "@upTex",
          "@downTex": "@downTex",
          "@northTex": "@northTex",
          "@southTex": "@southTex",
          "@eastTex": "@eastTex",
          "@westTex": "@westTex",
        },
      },
    ],
    "direction=east,connected=false,upsidedown=true": [
      {
        id: "base",
        geometryId: "dve_half_cube",
        position: [0, 0.5, 0],
        inputs: {
          "@upTex": "@upTex",
          "@downTex": "@downTex",
          "@northTex": "@northTex",
          "@southTex": "@southTex",
          "@eastTex": "@eastTex",
          "@westTex": "@westTex",
        },
      },
      {
        id: "up",
        geometryId: "dve_quater_cube_south_north",
        position: [0.5, 0, 0],
        inputs: {
          "@upTex": "@upTex",
          "@downTex": "@downTex",
          "@northTex": "@northTex",
          "@southTex": "@southTex",
          "@eastTex": "@eastTex",
          "@westTex": "@westTex",
        },
      },
    ],
    "direction=west,connected=false,upsidedown=true": [
      {
        id: "base",
        geometryId: "dve_half_cube",
        position: [0, 0.5, 0],
        inputs: {
          "@upTex": "@upTex",
          "@downTex": "@downTex",
          "@northTex": "@northTex",
          "@southTex": "@southTex",
          "@eastTex": "@eastTex",
          "@westTex": "@westTex",
        },
      },
      {
        id: "up",
        geometryId: "dve_quater_cube_south_north",
        position: [0.5, 0, 0],
        inputs: {
          "@upTex": "@upTex",
          "@downTex": "@downTex",
          "@northTex": "@northTex",
          "@southTex": "@southTex",
          "@eastTex": "@eastTex",
          "@westTex": "@westTex",
        },
      },
    ],
  },
};

export const fence: VoxelModelData = {
  id: "dve_fence",

  relationsSchema: [
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
  shapeStateSchema: [],
  arguments: {
    southTex: {
      type: "texture",
    },
    northTex: {
      type: "texture",
    },
    eastTex: {
      type: "texture",
    },
    westTex: {
      type: "texture",
    },
    upTex: {
      type: "texture",
    },
    downTex: {
      type: "texture",
    },
  },
  //  shapeStatesConditonalNodes: {},
  shapeStatesConditonalNodes: {
    "same-south=true": [
      {
        id: "fence_connection_south",
        geometryId: "dve_fence_north_south",
        inputs: {
          "@upTex": "@upTex",
          "@downTex": "@downTex",
          "@northTex": "@northTex",
          "@southTex": "@southTex",
          "@eastTex": "@eastTex",
          "@westTex": "@westTex",
        },
      },
    ],
    "same-north=true": [
      {
        id: "fence_connection_north",
        geometryId: "dve_fence_north_south",
        position: [0, 0, 10 / 16],
        inputs: {
          "@upTex": "@upTex",
          "@downTex": "@downTex",
          "@northTex": "@northTex",
          "@southTex": "@southTex",
          "@eastTex": "@eastTex",
          "@westTex": "@westTex",
        },
      },
    ],
    "same-east=true": [
      {
        id: "fence_connection_east",
        position: [10 / 16, 0, 0],
        geometryId: "dve_fence_east_west",
        inputs: {
          "@upTex": "@upTex",
          "@downTex": "@downTex",
          "@northTex": "@northTex",
          "@southTex": "@southTex",
          "@eastTex": "@eastTex",
          "@westTex": "@westTex",
        },
      },
    ],
    "same-west=true": [
      {
        id: "fence_connection_west",
        geometryId: "dve_fence_east_west",
        inputs: {
          "@upTex": "@upTex",
          "@downTex": "@downTex",
          "@northTex": "@northTex",
          "@southTex": "@southTex",
          "@eastTex": "@eastTex",
          "@westTex": "@westTex",
        },
      },
    ],
  },
  shapeStatesOverrides: {},
  shapeStatesNodes: {
    /*     "*": [
      {
        id: "fence_post",
        geometryId: "dve_fence_east_west",
        inputs: {
          "@upTex": "@upTex",
          "@downTex": "@downTex",
          "@northTex": "@northTex",
          "@southTex": "@southTex",
          "@eastTex": "@eastTex",
          "@westTex": "@westTex",
        },
      },
    ], */
    "*": [
      {
        id: "fence_post",
        geometryId: "dve_fence_post",
        inputs: {
          "@upTex": "@upTex",
          "@downTex": "@downTex",
          "@northTex": "@northTex",
          "@southTex": "@southTex",
          "@eastTex": "@eastTex",
          "@westTex": "@westTex",
        },
      },
    ],
  },
};
