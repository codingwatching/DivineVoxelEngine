import { VoxelGeometryData, VoxelModelData } from "./VoxelModel.types";

const cube: VoxelGeometryData = {
  id: "dve_cube",
  arguments: {
    topTex: {
      type: "texture",
    },
    topUvs: {
      type: "box-uv",
      defualt: [0, 0, 1, 1],
    },
    bottomTex: {
      type: "texture",
    },
    bottomUvs: {
      type: "box-uv",
      defualt: [0, 0, 1, 1],
    },
    northTex: {
      type: "texture",
    },
    northUvs: {
      type: "box-uv",
      defualt: [0, 0, 1, 1],
    },
    southTex: {
      type: "texture",
    },
    southUvs: {
      type: "box-uv",
      defualt: [0, 0, 1, 1],
    },
    eastTex: {
      type: "texture",
    },
    eastUvs: {
      type: "box-uv",
      defualt: [0, 0, 1, 1],
    },
    westTex: {
      type: "texture",
    },
    westUvs: {
      type: "box-uv",
      defualt: [0, 0, 1, 1],
    },
  },
  nodes: [
    {
      id: "cube",
      type: "box",
      points: [
        [0, 0, 0],
        [1, 1, 1],
      ],
      faces: {
        top: {
          texture: "@topTex",
          uv: "@topUvs",
        },
        bottom: {
          texture: "@bottomTex",
          uv: "@bottomUvs",
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
const halfCube: VoxelGeometryData = {
  id: "dve_half_cube",
  arguments: {
    topTex: {
      type: "texture",
    },
    topUvs: {
      type: "box-uv",
      defualt: [0, 0, 1, 1],
    },
    bottomTex: {
      type: "texture",
    },
    bottomUvs: {
      type: "box-uv",
      defualt: [0, 0, 1, 1],
    },
    northTex: {
      type: "texture",
    },
    northUvs: {
      type: "box-uv",
      defualt: [0, 0, 1, 1],
    },
    southTex: {
      type: "texture",
    },
    southUvs: {
      type: "box-uv",
      defualt: [0, 0, 1, 1],
    },
    eastTex: {
      type: "texture",
    },
    eastUvs: {
      type: "box-uv",
      defualt: [0, 0, 1, 1],
    },
    westTex: {
      type: "texture",
    },
    westUvs: {
      type: "box-uv",
      defualt: [0, 0, 1, 1],
    },
  },
  nodes: [
    {
      id: "cube",
      type: "box",
      points: [
        [0, 0, 0],
        [0.5, 0.5, 0.5],
      ],
      faces: {
        top: {
          texture: "@topTex",
          uv: "@topUvs",
        },
        bottom: {
          texture: "@bottomTex",
          uv: "@bottomUvs",
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
const quaterCubeWestEast: VoxelGeometryData = {
  id: "dve_quater_cube_west_east",
  arguments: {
    topTex: {
      type: "texture",
    },
    topUvs: {
      type: "box-uv",
      defualt: [0, 0, 1, 1],
    },
    bottomTex: {
      type: "texture",
    },
    bottomUvs: {
      type: "box-uv",
      defualt: [0, 0, 1, 1],
    },
    northTex: {
      type: "texture",
    },
    northUvs: {
      type: "box-uv",
      defualt: [0, 0, 1, 1],
    },
    southTex: {
      type: "texture",
    },
    southUvs: {
      type: "box-uv",
      defualt: [0, 0, 1, 1],
    },
    eastTex: {
      type: "texture",
    },
    eastUvs: {
      type: "box-uv",
      defualt: [0, 0, 1, 1],
    },
    westTex: {
      type: "texture",
    },
    westUvs: {
      type: "box-uv",
      defualt: [0, 0, 1, 1],
    },
  },
  nodes: [
    {
      id: "cube",
      type: "box",
      points: [
        [0, 0, 0],
        [1, 0.5, 0.5],
      ],
      faces: {
        top: {
          texture: "@topTex",
          uv: "@topUvs",
        },
        bottom: {
          texture: "@bottomTex",
          uv: "@bottomUvs",
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
const quaterCubeSouthNorth: VoxelGeometryData = {
  id: "dve_quater_cube_south_north",
  arguments: {
    topTex: {
      type: "texture",
    },
    topUvs: {
      type: "box-uv",
      defualt: [0, 0, 1, 1],
    },
    bottomTex: {
      type: "texture",
    },
    bottomUvs: {
      type: "box-uv",
      defualt: [0, 0, 1, 1],
    },
    northTex: {
      type: "texture",
    },
    northUvs: {
      type: "box-uv",
      defualt: [0, 0, 1, 1],
    },
    southTex: {
      type: "texture",
    },
    southUvs: {
      type: "box-uv",
      defualt: [0, 0, 1, 1],
    },
    eastTex: {
      type: "texture",
    },
    eastUvs: {
      type: "box-uv",
      defualt: [0, 0, 1, 1],
    },
    westTex: {
      type: "texture",
    },
    westUvs: {
      type: "box-uv",
      defualt: [0, 0, 1, 1],
    },
  },
  nodes: [
    {
      id: "cube",
      type: "box",
      points: [
        [0, 0, 0],
        [0.5, 0.5, 1],
      ],
      faces: {
        top: {
          texture: "@topTex",
          uv: "@topUvs",
        },
        bottom: {
          texture: "@bottomTex",
          uv: "@bottomUvs",
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
const quaterCubeTopBottom: VoxelGeometryData = {
  id: "dve_quater_cube_top_bottom",
  arguments: {
    topTex: {
      type: "texture",
    },
    topUvs: {
      type: "box-uv",
      defualt: [0, 0, 1, 1],
    },
    bottomTex: {
      type: "texture",
    },
    bottomUvs: {
      type: "box-uv",
      defualt: [0, 0, 1, 1],
    },
    northTex: {
      type: "texture",
    },
    northUvs: {
      type: "box-uv",
      defualt: [0, 0, 1, 1],
    },
    southTex: {
      type: "texture",
    },
    southUvs: {
      type: "box-uv",
      defualt: [0, 0, 1, 1],
    },
    eastTex: {
      type: "texture",
    },
    eastUvs: {
      type: "box-uv",
      defualt: [0, 0, 1, 1],
    },
    westTex: {
      type: "texture",
    },
    westUvs: {
      type: "box-uv",
      defualt: [0, 0, 1, 1],
    },
  },
  nodes: [
    {
      id: "cube",
      type: "box",
      points: [
        [0, 0, 0],
        [0.5, 1, 0.5],
      ],
      faces: {
        top: {
          texture: "@topTex",
          uv: "@topUvs",
        },
        bottom: {
          texture: "@bottomTex",
          uv: "@bottomUvs",
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
const eighthCube: VoxelGeometryData = {
  id: "dve_eighth_cube",
  arguments: {
    topTex: {
      type: "texture",
    },
    bottomTex: {
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
      id: "cube",
      type: "box",
      points: [
        [0, 0, 0],
        [0.25, 0.25, 0.25],
      ],
      faces: {
        top: {
          texture: "@topTex",
          uv: [0, 0, 1, 1],
        },
        bottom: {
          texture: "@bottomTex",
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

const fencePost: VoxelGeometryData = {
  id: "dve_fence_post",
  arguments: {
    topTex: {
      type: "texture",
    },
    bottomTex: {
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
      id: "box-1",
      type: "box",
      points: [
        [0.5, 0, 0.5],
        [0.5625, 1, 0.5625],
      ],
      faces: {
        top: {
          texture: "@tex",
          uv: [0, 0, 1, 1],
        },
        bottom: {
          texture: "@tex",
          uv: [0, 0, 1, 1],
        },
        north: {
          texture: "@tex",
          uv: [0, 0, 0.5, 0.5],
        },
        south: {
          texture: "@tex",
          uv: [0, 0, 0.5, 0.5],
        },
        east: {
          texture: "@tex",
          uv: [0, 0, 0.5, 0.5],
        },
        west: {
          texture: "@tex",
          uv: [0, 0, 0.5, 0.5],
        },
      },
    },
  ],
};
const fenceEastWest: VoxelGeometryData = {
  id: "dve_fence_east_west",
  arguments: {
    topTex: {
      type: "texture",
    },
    bottomTex: {
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
      id: "box-1",
      type: "box",
      points: [
        [0.5, 0, 0.5],
        [0.5625, 1, 0.5625],
      ],
      faces: {
        top: {
          texture: "@tex",
          uv: [0, 0, 1, 1],
        },
        bottom: {
          texture: "@tex",
          uv: [0, 0, 1, 1],
        },
        north: {
          texture: "@tex",
          uv: [0, 0, 0.5, 0.5],
        },
        south: {
          texture: "@tex",
          uv: [0, 0, 0.5, 0.5],
        },
        east: {
          texture: "@tex",
          uv: [0, 0, 0.5, 0.5],
        },
        west: {
          texture: "@tex",
          uv: [0, 0, 0.5, 0.5],
        },
      },
    },
  ],
};
const fenceNorthsouth: VoxelGeometryData = {
  id: "dve_fence_north_south",
  arguments: {
    topTex: {
      type: "texture",
    },
    bottomTex: {
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
      id: "box-1",
      type: "box",
      points: [
        [0.5, 0, 0.5],
        [0.5625, 1, 0.5625],
      ],
      faces: {
        top: {
          texture: "@tex",
          uv: [0, 0, 1, 1],
        },
        bottom: {
          texture: "@tex",
          uv: [0, 0, 1, 1],
        },
        north: {
          texture: "@tex",
          uv: [0, 0, 0.5, 0.5],
        },
        south: {
          texture: "@tex",
          uv: [0, 0, 0.5, 0.5],
        },
        east: {
          texture: "@tex",
          uv: [0, 0, 0.5, 0.5],
        },
        west: {
          texture: "@tex",
          uv: [0, 0, 0.5, 0.5],
        },
      },
    },
  ],
};
const pillarBox: VoxelModelData = {
  id: "dve_stair",
  relationsScehma: [
    {
      name: "same-bottom",
      conditions: [
        {
          type: "same-voxel",
          direction: [0, -1, 0],
        },
      ],
    },
    {
      name: "same-top",
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
  stateSchema: [
    {
      name: "direction",
      values: {
        0: "bottom-top",
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
    sideTopTex: {
      type: "texture",
    },
    sideBottomTex: {
      type: "texture",
    },
    topTex: {
      type: "texture",
    },
    bottomTex: {
      type: "texture",
    },
  },
  shapeStatesConditonalNodes: {},
  shapeStatesOverrides: {
    "direction=bottom-top,same-bottom=false,same-top=false": [
      {
        id: "cube",
        data: {
          inputs: {
            "@topTex": "@topTex",
            "@topUvs": [0, 0, 0.5, 0.5],
            "@bottomTex": "@bottomTex",
            "@northTex": "@sideDisconnectedTex",
            "@southTex": "@sideDisconnectedTex",
            "@eastTex": "@sideDisconnectedTex",
            "@westTex": "@sideDisconnectedTex",
          },
        },
      },
    ],
    "direction=bottom-top,same-bottom=true,same-top=false": [
      {
        id: "cube",
        data: {
          inputs: {
            "@topTex": "@topTex",
            "@bottomTex": "@bottomTex",
            "@northTex": "@sideDisconnectedTex",
            "@southTex": "@sideDisconnectedTex",
            "@eastTex": "@sideDisconnectedTex",
            "@westTex": "@sideDisconnectedTex",
          },
        },
      },
    ],
    "direction=bottom-top,same-bottom=false,same-top=true": [
      {
        id: "cube",
        data: {
          inputs: {
            "@topTex": "@topTex",
            "@bottomTex": "@bottomTex",
            "@northTex": "@sideDisconnectedTex",
            "@southTex": "@sideDisconnectedTex",
            "@eastTex": "@sideDisconnectedTex",
            "@westTex": "@sideDisconnectedTex",
          },
        },
      },
    ],
    "direction=bottom-top,same-bottom=true,same-top=true": [
      {
        id: "cube",
        data: {
          inputs: {
            "@topTex": "@topTex",
            "@bottomTex": "@bottomTex",
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

const stair: VoxelModelData = {
  id: "dve_stair",
  relationsScehma: [],
  stateSchema: [
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
    topTex: {
      type: "texture",
    },
    bottomTex: {
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
          "@topTex": "@topTex",
          "@bottomTex": "@bottomTex",
          "@northTex": "@northTex",
          "@southTex": "@southTex",
          "@eastTex": "@eastTex",
          "@westTex": "@westTex",
        },
      },
      {
        id: "top",
        geometryId: "dve_quater_cube_west_east",
        position: [0.5, 0.5, 0.5],
        inputs: {
          "@topTex": "@topTex",
          "@bottomTex": "@bottomTex",
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
          "@topTex": "@topTex",
          "@bottomTex": "@bottomTex",
          "@northTex": "@northTex",
          "@southTex": "@southTex",
          "@eastTex": "@eastTex",
          "@westTex": "@westTex",
        },
      },
      {
        id: "top",
        geometryId: "dve_quater_cube_west_east",
        position: [0.5, 0.5, 0],
        inputs: {
          "@topTex": "@topTex",
          "@bottomTex": "@bottomTex",
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
          "@topTex": "@topTex",
          "@bottomTex": "@bottomTex",
          "@northTex": "@northTex",
          "@southTex": "@southTex",
          "@eastTex": "@eastTex",
          "@westTex": "@westTex",
        },
      },
      {
        id: "top",
        geometryId: "dve_quater_cube_south_north",
        position: [0, 0.5, 0],
        inputs: {
          "@topTex": "@topTex",
          "@bottomTex": "@bottomTex",
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
          "@topTex": "@topTex",
          "@bottomTex": "@bottomTex",
          "@northTex": "@northTex",
          "@southTex": "@southTex",
          "@eastTex": "@eastTex",
          "@westTex": "@westTex",
        },
      },
      {
        id: "top",
        geometryId: "dve_quater_cube_south_north",
        position: [0.5, 0.5, 0],
        inputs: {
          "@topTex": "@topTex",
          "@bottomTex": "@bottomTex",
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
          "@topTex": "@topTex",
          "@bottomTex": "@bottomTex",
          "@northTex": "@northTex",
          "@southTex": "@southTex",
          "@eastTex": "@eastTex",
          "@westTex": "@westTex",
        },
      },
      {
        id: "top",
        geometryId: "dve_quater_cube_west_east",
        inputs: {
          "@topTex": "@topTex",
          "@bottomTex": "@bottomTex",
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
          "@topTex": "@topTex",
          "@bottomTex": "@bottomTex",
          "@northTex": "@northTex",
          "@southTex": "@southTex",
          "@eastTex": "@eastTex",
          "@westTex": "@westTex",
        },
      },
      {
        id: "top",
        geometryId: "dve_quater_cube_west_east",
        position: [0, 0, 0.5],
        inputs: {
          "@topTex": "@topTex",
          "@bottomTex": "@bottomTex",
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
          "@topTex": "@topTex",
          "@bottomTex": "@bottomTex",
          "@northTex": "@northTex",
          "@southTex": "@southTex",
          "@eastTex": "@eastTex",
          "@westTex": "@westTex",
        },
      },
      {
        id: "top",
        geometryId: "dve_quater_cube_south_north",
        position: [0.5, 0, 0],
        inputs: {
          "@topTex": "@topTex",
          "@bottomTex": "@bottomTex",
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
          "@topTex": "@topTex",
          "@bottomTex": "@bottomTex",
          "@northTex": "@northTex",
          "@southTex": "@southTex",
          "@eastTex": "@eastTex",
          "@westTex": "@westTex",
        },
      },
      {
        id: "top",
        geometryId: "dve_quater_cube_south_north",
        position: [0.5, 0, 0],
        inputs: {
          "@topTex": "@topTex",
          "@bottomTex": "@bottomTex",
          "@northTex": "@northTex",
          "@southTex": "@southTex",
          "@eastTex": "@eastTex",
          "@westTex": "@westTex",
        },
      },
    ],
  },
};

const fence: VoxelModelData = {
  id: "dve_fence",

  relationsScehma: [
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
  stateSchema: [],
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
    topTex: {
      type: "texture",
    },
    bottomTex: {
      type: "texture",
    },
  },
  shapeStatesConditonalNodes: {
    "state=*,same-south=true": [
      {
        id: "fence_post",
        geometryId: "dve_fence_north_south",
        inputs: {
          "@topTex": "@topTex",
          "@bottomTex": "@bottomTex",
          "@northTex": "@northTex",
          "@southTex": "@southTex",
          "@eastTex": "@eastTex",
          "@westTex": "@westTex",
        },
      },
    ],
    "state=*,same-north=true": [
      {
        id: "fence_post",
        geometryId: "dve_fence_north_south",
        position: [0, 0, 0.5],
        inputs: {
          "@topTex": "@topTex",
          "@bottomTex": "@bottomTex",
          "@northTex": "@northTex",
          "@southTex": "@southTex",
          "@eastTex": "@eastTex",
          "@westTex": "@westTex",
        },
      },
    ],
    "state=*,same-east=true": [
      {
        id: "fence_post",
        geometryId: "dve_fence_east_west",
        inputs: {
          "@topTex": "@topTex",
          "@bottomTex": "@bottomTex",
          "@northTex": "@northTex",
          "@southTex": "@southTex",
          "@eastTex": "@eastTex",
          "@westTex": "@westTex",
        },
      },
    ],
    "state=*,same-west=true": [
      {
        id: "fence_post",
        geometryId: "dve_fence_east_west",
        position: [0.5, 0, 0],
        inputs: {
          "@topTex": "@topTex",
          "@bottomTex": "@bottomTex",
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
    "": [
      {
        id: "fence_post",
        geometryId: "dve_fence_post",
        inputs: {},
      },
    ],
  },
};
