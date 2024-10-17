import { VoxelGeometryData, VoxelModelData } from "./VoxelModel.types";

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
          uv: [0, 7 / 16, 7 / 16, 9 / 16],
        },
        down: {
          texture: "@downTex",
          uv: [0, 7 / 16, 7 / 16, 9 / 16],
        },
        north: {
          texture: "@northTex",
          uv: [0, 7 / 16, 6 / 16, 10 / 16],
        },
        south: {
          texture: "@southTex",
          uv: [0, 7 / 16, 6 / 16, 10 / 16],
        },
        east: {
          texture: "@eastTex",
          uv: [0, 7 / 16, 6 / 16, 10 / 16],
        },
        west: {
          texture: "@westTex",
          uv: [0, 7 / 16, 6 / 16, 10 / 16],
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
          uv: [0, 7 / 16, 7 / 16, 9 / 16],
        },
        down: {
          texture: "@downTex",
          uv: [0, 7 / 16, 7 / 16, 9 / 16],
        },
        north: {
          texture: "@northTex",
          uv: [0, 7 / 16, 6 / 16, 10 / 16],
        },
        south: {
          texture: "@southTex",
          uv: [0, 7 / 16, 6 / 16, 10 / 16],
        },
        east: {
          texture: "@eastTex",
          uv: [0, 7 / 16, 6 / 16, 10 / 16],
        },
        west: {
          texture: "@westTex",
          uv: [0, 7 / 16, 6 / 16, 10 / 16],
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
          uv: [7 / 16, 0, 9 / 16, 7 / 16],
        },
        down: {
          texture: "@downTex",
          uv: [7 / 16, 0, 9 / 16, 7 / 16],
        },
        north: {
          texture: "@northTex",
          uv: [0, 7 / 16, 6 / 16, 10 / 16],
        },
        south: {
          texture: "@southTex",
          uv: [0, 7 / 16, 6 / 16, 10 / 16],
        },
        east: {
          texture: "@eastTex",
          uv: [0, 7 / 16, 6 / 16, 10 / 16],
        },
        west: {
          texture: "@westTex",
          uv: [0, 7 / 16, 6 / 16, 10 / 16],
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
          uv: [7 / 16, 0, 9 / 16, 7 / 16],
        },
        down: {
          texture: "@downTex",
          uv: [7 / 16, 0, 9 / 16, 7 / 16],
        },
        north: {
          texture: "@northTex",
          uv: [0, 7 / 16, 6 / 16, 10 / 16],
        },
        south: {
          texture: "@southTex",
          uv: [0, 7 / 16, 6 / 16, 10 / 16],
        },
        east: {
          texture: "@eastTex",
          uv: [0, 7 / 16, 6 / 16, 10 / 16],
        },
        west: {
          texture: "@westTex",
          uv: [0, 7 / 16, 6 / 16, 10 / 16],
        },
      },
    },
  ],
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

  shapeStatesNodes: {
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

export const candlesGeometry1: VoxelGeometryData = {
  id: "dve_candle_state_1",
  doNotBuildRules: true,
  arguments: {
    candleTexture: {
      type: "texture",
    },
    wickTexture: {
      type: "texture",
    },
  },
  nodes: [
    {
      type: "box",
      points: [
        [7 / 16, 0, 7 / 16],
        [8 / 16, 6 / 16, 8 / 16],
      ],
      faces: {
        up: {
          texture: "@candleTexture",
          uv: [7 / 16, 0 / 16, 9 / 16, 6 / 16],
        },
        down: {
          texture: "@candleTexture",
          uv: [7 / 16, 0 / 16, 9 / 16, 6 / 16],
        },
        north: {
          texture: "@candleTexture",
          uv: [7 / 16, 0 / 16, 9 / 16, 6 / 16],
        },
        south: {
          texture: "@candleTexture",
          uv: [7 / 16, 0 / 16, 9 / 16, 6 / 16],
        },
        east: {
          texture: "@candleTexture",
          uv: [7 / 16, 0 / 16, 9 / 16, 6 / 16],
        },
        west: {
          texture: "@candleTexture",
          uv: [7 / 16, 0 / 16, 9 / 16, 6 / 16],
        },
      },
    },
    {
      type: "quad",
      points: [
        [7 / 16, 7 / 16, 8 / 16],
        [8 / 16, 7 / 16, 7 / 16],
        [8 / 16, 6 / 16, 7 / 16],
        [7 / 16, 6 / 16, 8 / 16],
      ],
      uv: [0, 0, 1 / 16, 1 / 16],
      texture: "@wickTexture",
      doubleSided: true,
    },
    {
      type: "quad",
      points: [
        [8 / 16, 7 / 16, 8 / 16],
        [7 / 16, 7 / 16, 7 / 16],
        [7 / 16, 6 / 16, 7 / 16],
        [8 / 16, 6 / 16, 8 / 16],
      ],
      uv: [0, 0, 1 / 16, 1 / 16],
      texture: "@wickTexture",
      doubleSided: true,
    },
  ],
};
export const candlesGeometry2: VoxelGeometryData = {
  id: "dve_candle_state_2",
  doNotBuildRules: true,
  arguments: {
    candleTexture: {
      type: "texture",
    },
    wickTexture: {
      type: "texture",
    },
  },
  nodes: [
    {
      type: "box",
      points: [
        [7 / 16, 0, 7 / 16],
        [8 / 16, 5 / 16, 8 / 16],
      ],
      faces: {
        up: {
          texture: "@candleTexture",
          uv: [7 / 16, 0 / 16, 9 / 16, 5 / 16],
        },
        down: {
          texture: "@candleTexture",
          uv: [7 / 16, 0 / 16, 9 / 16, 5 / 16],
        },
        north: {
          texture: "@candleTexture",
          uv: [7 / 16, 0 / 16, 9 / 16, 5 / 16],
        },
        south: {
          texture: "@candleTexture",
          uv: [7 / 16, 0 / 16, 9 / 16, 5 / 16],
        },
        east: {
          texture: "@candleTexture",
          uv: [7 / 16, 0 / 16, 9 / 16, 5 / 16],
        },
        west: {
          texture: "@candleTexture",
          uv: [7 / 16, 0 / 16, 9 / 16, 5 / 16],
        },
      },
    },
    {
      type: "quad",
      points: [
        [7 / 16, 6 / 16, 8 / 16],
        [8 / 16, 6 / 16, 7 / 16],
        [8 / 16, 5 / 16, 7 / 16],
        [7 / 16, 5 / 16, 8 / 16],
      ],
      uv: [0, 0, 1 / 16, 1 / 16],
      texture: "@wickTexture",
      doubleSided: true,
    },
    {
      type: "quad",
      points: [
        [8 / 16, 6 / 16, 8 / 16],
        [7 / 16, 6 / 16, 7 / 16],
        [7 / 16, 5 / 16, 7 / 16],
        [8 / 16, 5 / 16, 8 / 16],
      ],
      uv: [0, 0, 1 / 16, 1 / 16],
      texture: "@wickTexture",
      doubleSided: true,
    },
  ],
};
export const candlesGeometry3: VoxelGeometryData = {
  id: "dve_candle_state_3",
  doNotBuildRules: true,
  arguments: {
    candleTexture: {
      type: "texture",
    },
    wickTexture: {
      type: "texture",
    },
  },
  nodes: [
    {
      type: "box",
      points: [
        [7 / 16, 0, 7 / 16],
        [8 / 16, 4 / 16, 8 / 16],
      ],
      faces: {
        up: {
          texture: "@candleTexture",
          uv: [7 / 16, 0 / 16, 9 / 16, 4 / 16],
        },
        down: {
          texture: "@candleTexture",
          uv: [7 / 16, 0 / 16, 9 / 16, 4 / 16],
        },
        north: {
          texture: "@candleTexture",
          uv: [7 / 16, 0 / 16, 9 / 16, 4 / 16],
        },
        south: {
          texture: "@candleTexture",
          uv: [7 / 16, 0 / 16, 9 / 16, 4 / 16],
        },
        east: {
          texture: "@candleTexture",
          uv: [7 / 16, 0 / 16, 9 / 16, 4 / 16],
        },
        west: {
          texture: "@candleTexture",
          uv: [7 / 16, 0 / 16, 9 / 16, 4 / 16],
        },
      },
    },
    {
      type: "quad",
      points: [
        [7 / 16, 5 / 16, 8 / 16],
        [8 / 16, 5 / 16, 7 / 16],
        [8 / 16, 4 / 16, 7 / 16],
        [7 / 16, 4 / 16, 8 / 16],
      ],
      uv: [0, 0, 1 / 16, 1 / 16],
      texture: "@wickTexture",
      doubleSided: true,
    },
    {
      type: "quad",
      points: [
        [8 / 16, 5 / 16, 8 / 16],
        [7 / 16, 5 / 16, 7 / 16],
        [7 / 16, 4 / 16, 7 / 16],
        [8 / 16, 4 / 16, 8 / 16],
      ],
      uv: [0, 0, 1 / 16, 1 / 16],
      texture: "@wickTexture",
      doubleSided: true,
    },
  ],
};
export const candlesGeometry4: VoxelGeometryData = {
  id: "dve_candle_state_4",
  doNotBuildRules: true,
  arguments: {
    candleTexture: {
      type: "texture",
    },
    wickTexture: {
      type: "texture",
    },
  },
  nodes: [
    {
      type: "box",
      points: [
        [7 / 16, 0, 7 / 16],
        [8 / 16, 3 / 16, 8 / 16],
      ],
      faces: {
        up: {
          texture: "@candleTexture",
          uv: [7 / 16, 0 / 16, 9 / 16, 3 / 16],
        },
        down: {
          texture: "@candleTexture",
          uv: [7 / 16, 0 / 16, 9 / 16, 3 / 16],
        },
        north: {
          texture: "@candleTexture",
          uv: [7 / 16, 0 / 16, 9 / 16, 3 / 16],
        },
        south: {
          texture: "@candleTexture",
          uv: [7 / 16, 0 / 16, 9 / 16, 3 / 16],
        },
        east: {
          texture: "@candleTexture",
          uv: [7 / 16, 0 / 16, 9 / 16, 3 / 16],
        },
        west: {
          texture: "@candleTexture",
          uv: [7 / 16, 0 / 16, 9 / 16, 3 / 16],
        },
      },
    },
    {
      type: "quad",
      points: [
        [7 / 16, 4 / 16, 8 / 16],
        [8 / 16, 4 / 16, 7 / 16],
        [8 / 16, 3 / 16, 7 / 16],
        [7 / 16, 3 / 16, 8 / 16],
      ],
      uv: [0, 0, 1 / 16, 1 / 16],
      texture: "@wickTexture",
      doubleSided: true,
    },
    {
      type: "quad",
      points: [
        [8 / 16, 4 / 16, 8 / 16],
        [7 / 16, 4 / 16, 7 / 16],
        [7 / 16, 3 / 16, 7 / 16],
        [8 / 16, 3 / 16, 8 / 16],
      ],
      uv: [0, 0, 1 / 16, 1 / 16],
      texture: "@wickTexture",
      doubleSided: true,
    },
  ],
};
export const candlesModel: VoxelModelData = {
  id: "dve_candle",
  arguments: {
    candleTexture: {
      type: "texture",
    },
    wickTexture: {
      type: "texture",
    },
  },
  relationsSchema: [],
  shapeStateSchema: [
    {
      name: "num_candles",
      type: "number",
      maxValue: 3,
    },
  ],
  shapeStatesConditonalNodes: {},
  shapeStatesNodes: {
    "num_candles=0": [
      {
        id: "candel_1",
        geometryId: "dve_candle_state_1",
        rotation: [45, 0, 0],
        flip: [0, 0, 1],
        inputs: {
          "@candleTexture": "@candleTexture",
          "@wickTexture": "@wickTexture",
        },
      },
    ],
    "num_candles=1": [
      {
        id: "candel_1",
        geometryId: "dve_candle_state_1",
        position: [-2 / 16, 0, 0],
        inputs: {
          "@candleTexture": "@candleTexture",
          "@wickTexture": "@wickTexture",
        },
      },
      {
        id: "candel_2",
        geometryId: "dve_candle_state_2",
        position: [2 / 16, 0, 0],
        inputs: {
          "@candleTexture": "@candleTexture",
          "@wickTexture": "@wickTexture",
        },
      },
    ],
    "num_candles=2": [
      {
        id: "candel_1",
        geometryId: "dve_candle_state_1",
        position: [-2 / 16, 0, 2 / 16],
        inputs: {
          "@candleTexture": "@candleTexture",
          "@wickTexture": "@wickTexture",
        },
      },
      {
        id: "candel_2",
        geometryId: "dve_candle_state_2",
        position: [2 / 16, 0, 2 / 16],
        inputs: {
          "@candleTexture": "@candleTexture",
          "@wickTexture": "@wickTexture",
        },
      },
      {
        id: "candel_3",
        geometryId: "dve_candle_state_3",
        position: [2 / 16, 0, -2 / 16],
        inputs: {
          "@candleTexture": "@candleTexture",
          "@wickTexture": "@wickTexture",
        },
      },
    ],
    "num_candles=3": [
      {
        id: "candel_1",
        geometryId: "dve_candle_state_1",
        position: [-2 / 16, 0, 2 / 16],
        inputs: {
          "@candleTexture": "@candleTexture",
          "@wickTexture": "@wickTexture",
        },
      },
      {
        id: "candel_2",
        geometryId: "dve_candle_state_2",
        position: [2 / 16, 0, 2 / 16],
        inputs: {
          "@candleTexture": "@candleTexture",
          "@wickTexture": "@wickTexture",
        },
      },
      {
        id: "candel_3",
        geometryId: "dve_candle_state_3",
        position: [2 / 16, 0, -2 / 16],
        inputs: {
          "@candleTexture": "@candleTexture",
          "@wickTexture": "@wickTexture",
        },
      },
      {
        id: "candel_4",
        geometryId: "dve_candle_state_4",
        position: [-2 / 16, 0, -2 / 16],
        inputs: {
          "@candleTexture": "@candleTexture",
          "@wickTexture": "@wickTexture",
        },
      },
    ],
  },
};

export const leverModelBaseDownSouthNorth: VoxelGeometryData = {
  id: "dve_lever_model_base_down_south_north",
  arguments: {
    texture: {
      type: "texture",
    },
  },
  nodes: [
    {
      type: "box",
      points: [
        [5 / 16, 0, 4 / 16],
        [10 / 16, 3 / 16, 12 / 16],
      ],
      faces: {
        up: {
          texture: "@texture",
          uv: [5 / 16, 4 / 16, 10 / 16, 12 / 16],
        },
        down: {
          texture: "@texture",
          uv: [5 / 16, 4 / 16, 10 / 16, 12 / 16],
        },
        north: {
          texture: "@texture",
          uv: [5 / 16, 0 / 16, 10 / 16, 3 / 16],
        },
        south: {
          texture: "@texture",
          uv: [5 / 16, 0 / 16, 10 / 16, 3 / 16],
        },
        east: {
          texture: "@texture",
          uv: [4 / 16, 0 / 16, 12 / 16, 3 / 16],
        },
        west: {
          texture: "@texture",
          uv: [4 / 16, 0 / 16, 12 / 16, 3 / 16],
        },
      },
    },
  ],
};
export const leverModelBaseDownWestEast: VoxelGeometryData = {
  id: "dve_lever_model_base_down_west_east",
  arguments: {
    texture: {
      type: "texture",
    },
  },
  nodes: [
    {
      type: "box",
      points: [
        [4 / 16, 0, 5 / 16],
        [12 / 16, 3 / 16, 10 / 16],
      ],
      faces: {
        up: {
          texture: "@texture",
          uv: [5 / 16, 4 / 16, 10 / 16, 12 / 16],
        },
        down: {
          texture: "@texture",
          uv: [5 / 16, 4 / 16, 10 / 16, 12 / 16],
        },
        north: {
          texture: "@texture",
          uv: [5 / 16, 0 / 16, 10 / 16, 3 / 16],
        },
        south: {
          texture: "@texture",

          uv: [4 / 16, 0 / 16, 12 / 16, 3 / 16],
        },
        east: {
          texture: "@texture",

          uv: [5 / 16, 0 / 16, 10 / 16, 3 / 16],
        },
        west: {
          texture: "@texture",
          uv: [4 / 16, 0 / 16, 12 / 16, 3 / 16],
        },
      },
    },
  ],
};
export const leverModelBaseWestSouthNorth: VoxelGeometryData = {
  id: "dve_lever_model_base_side_west_south_north",
  arguments: {
    texture: {
      type: "texture",
    },
  },
  nodes: [
    {
      type: "box",
      points: [
        [5 / 16, 4 / 16, 0],
        [10 / 16, 12 / 16, 3 / 16],
      ],
      faces: {
        up: {
          texture: "@texture",
          uv: [4 / 16, 0 / 16, 12 / 16, 3 / 16],
        },
        down: {
          texture: "@texture",
          uv: [5 / 16, 0 / 16, 10 / 16, 3 / 16],
        },
        north: {
          texture: "@texture",
          uv: [0 / 16, 4 / 16, 3 / 16, 12 / 16],
        },
        south: {
          texture: "@texture",
          uv: [0 / 16, 4 / 16, 3 / 16, 12 / 16],
        },
        east: {
          texture: "@texture",
          uv: [5 / 16, 4 / 16, 10 / 16, 12 / 16],
        },
        west: {
          texture: "@texture",
          uv: [5 / 16, 4 / 16, 10 / 16, 12 / 16],
        },
      },
    },
  ],
};
export const leverModelBaseWestEastWest: VoxelGeometryData = {
  id: "dve_lever_model_base_side_west_east_west",
  arguments: {
    texture: {
      type: "texture",
    },
  },
  nodes: [
    {
      type: "box",
      points: [
        [4 / 16, 5 / 16, 0],
        [12 / 16, 10 / 16, 3 / 16],
      ],
      faces: {
        up: {
          texture: "@texture",
          uv: [4 / 16, 0 / 16, 12 / 16, 3 / 16],
        },
        down: {
          texture: "@texture",
          uv: [5 / 16, 0 / 16, 10 / 16, 3 / 16],
        },
        north: {
          texture: "@texture",
          uv: [0 / 16, 5 / 16, 3 / 16, 10 / 16],
        },
        south: {
          texture: "@texture",
          uv: [0 / 16, 5 / 16, 3 / 16, 10 / 16],
        },
        east: {
          texture: "@texture",
          uv: [5 / 16, 4 / 16, 10 / 16, 12 / 16],
        },
        west: {
          texture: "@texture",
          uv: [5 / 16, 4 / 16, 10 / 16, 12 / 16],
        },
      },
    },
  ],
};
export const leverModelBaseSouthSouthNorth: VoxelGeometryData = {
  id: "dve_lever_model_base_side_south_south_north",
  arguments: {
    texture: {
      type: "texture",
    },
  },
  nodes: [
    {
      type: "box",
      points: [
        [0, 5 / 16, 4 / 16],
        [3 / 16, 10 / 16, 12 / 16],
      ],
      faces: {
        up: {
          texture: "@texture",
          uv: [4 / 16, 0 / 16, 12 / 16, 3 / 16],
        },
        down: {
          texture: "@texture",
          uv: [5 / 16, 0 / 16, 10 / 16, 3 / 16],
        },
        north: {
          texture: "@texture",
          uv: [0 / 16, 4 / 16, 3 / 16, 12 / 16],
        },
        south: {
          texture: "@texture",
          uv: [0 / 16, 4 / 16, 3 / 16, 12 / 16],
        },
        east: {
          texture: "@texture",
          uv: [5 / 16, 4 / 16, 10 / 16, 12 / 16],
        },
        west: {
          texture: "@texture",
          uv: [5 / 16, 4 / 16, 10 / 16, 12 / 16],
        },
      },
    },
  ],
};
export const leverModelBaseSouthEastWest: VoxelGeometryData = {
  id: "dve_lever_model_base_side_south_east_west",
  arguments: {
    texture: {
      type: "texture",
    },
  },
  nodes: [
    {
      type: "box",
      points: [
        [0, 4 / 16, 5 / 16],
        [3 / 16, 12 / 16, 10 / 16],
      ],
      faces: {
        up: {
          texture: "@texture",
          uv: [4 / 16, 0 / 16, 12 / 16, 3 / 16],
        },
        down: {
          texture: "@texture",
          uv: [5 / 16, 0 / 16, 10 / 16, 3 / 16],
        },
        north: {
          texture: "@texture",
          uv: [0 / 16, 5 / 16, 3 / 16, 10 / 16],
        },
        south: {
          texture: "@texture",
          uv: [0 / 16, 5 / 16, 3 / 16, 10 / 16],
        },
        east: {
          texture: "@texture",
          uv: [5 / 16, 4 / 16, 10 / 16, 12 / 16],
        },
        west: {
          texture: "@texture",
          uv: [5 / 16, 4 / 16, 10 / 16, 12 / 16],
        },
      },
    },
  ],
};

export const leverModelDown: VoxelGeometryData = {
  id: "dve_lever_model_down",
  doNotBuildRules: true,
  arguments: {
    texture: {
      type: "texture",
    },
  },
  nodes: [
    {
      type: "box",
      points: [
        [7 / 16, 0, 7 / 16],
        [8 / 16, 15 / 16, 8 / 16],
      ],
      faces: {
        up: {
          texture: "@candleTexture",
          uv: [7 / 16, 0 / 16, 9 / 16, 15 / 16],
        },
        down: {
          texture: "@candleTexture",
          uv: [7 / 16, 0 / 16, 9 / 16, 15 / 16],
        },
        north: {
          texture: "@candleTexture",
          uv: [7 / 16, 0 / 16, 9 / 16, 15 / 16],
        },
        south: {
          texture: "@candleTexture",
          uv: [7 / 16, 0 / 16, 9 / 16, 15 / 16],
        },
        east: {
          texture: "@candleTexture",
          uv: [7 / 16, 0 / 16, 9 / 16, 15 / 16],
        },
        west: {
          texture: "@candleTexture",
          uv: [7 / 16, 0 / 16, 9 / 16, 15 / 16],
        },
      },
    },
  ],
};
export const leverModelWest: VoxelGeometryData = {
  id: "dve_lever_model_west",
  doNotBuildRules: true,
  arguments: {
    texture: {
      type: "texture",
    },
  },
  nodes: [
    {
      type: "box",
      points: [
        [0, 7 / 16, 7 / 16],
        [15 / 16, 8 / 16, 8 / 16],
      ],
      faces: {
        up: {
          texture: "@candleTexture",
          uv: [7 / 16, 0 / 16, 9 / 16, 15 / 16],
        },
        down: {
          texture: "@candleTexture",
          uv: [7 / 16, 0 / 16, 9 / 16, 15 / 16],
        },
        north: {
          texture: "@candleTexture",
          uv: [7 / 16, 0 / 16, 9 / 16, 15 / 16],
        },
        south: {
          texture: "@candleTexture",
          uv: [7 / 16, 0 / 16, 9 / 16, 15 / 16],
        },
        east: {
          texture: "@candleTexture",
          uv: [7 / 16, 0 / 16, 9 / 16, 15 / 16],
        },
        west: {
          texture: "@candleTexture",
          uv: [7 / 16, 0 / 16, 9 / 16, 15 / 16],
        },
      },
    },
  ],
};
export const leverModelSouth: VoxelGeometryData = {
  id: "dve_lever_model_south",
  doNotBuildRules: true,
  arguments: {
    texture: {
      type: "texture",
    },
  },
  nodes: [
    {
      type: "box",
      points: [
        [7 / 16, 7 / 16, 0],
        [8 / 16, 8 / 16, 15 / 16],
      ],
      faces: {
        up: {
          texture: "@candleTexture",
          uv: [7 / 16, 0 / 16, 9 / 16, 15 / 16],
        },
        down: {
          texture: "@candleTexture",
          uv: [7 / 16, 0 / 16, 9 / 16, 15 / 16],
        },
        north: {
          texture: "@candleTexture",
          uv: [7 / 16, 0 / 16, 9 / 16, 15 / 16],
        },
        south: {
          texture: "@candleTexture",
          uv: [7 / 16, 0 / 16, 9 / 16, 15 / 16],
        },
        east: {
          texture: "@candleTexture",
          uv: [7 / 16, 0 / 16, 9 / 16, 15 / 16],
        },
        west: {
          texture: "@candleTexture",
          uv: [7 / 16, 0 / 16, 9 / 16, 15 / 16],
        },
      },
    },
  ],
};

export const leverModel: VoxelModelData = {
  id: "dve_candle",
  arguments: {
    baseTexture: {
      type: "texture",
    },
    leverTexture: {
      type: "texture",
    },
  },
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
    {
      name: "direction",
      type: "string",
      values: {
        0: "north",
        1: "south",
        2: "east",
        3: "west",
      },
    },
    {
      name: "state",
      type: "string",
      values: {
        0: "off",
        1: "on",
      },
    },
  ],
  shapeStatesConditonalNodes: {},
  shapeStatesNodes: {
    "placement=down,direction=north,state=off": [],
    "placement=down,direction=north,state=on": [],
    "placement=down,direction=south,state=off": [],
    "placement=down,direction=south,state=on": [],
    "placement=down,direction=east,state=off": [],
    "placement=down,direction=east,state=on": [],
    "placement=down,direction=west,state=off": [],
    "placement=down,direction=west,state=on": [],

    "placement=up,direction=north,state=off": [],
    "placement=up,direction=north,state=on": [],
    "placement=up,direction=south,state=off": [],
    "placement=up,direction=south,state=on": [],
    "placement=up,direction=east,state=off": [],
    "placement=up,direction=east,state=on": [],
    "placement=up,direction=west,state=off": [],
    "placement=up,direction=west,state=on": [],

    "placement=north,direction=north,state=off": [],
    "placement=north,direction=north,state=on": [],
    "placement=north,direction=south,state=off": [],
    "placement=north,direction=south,state=on": [],
    "placement=north,direction=east,state=off": [],
    "placement=north,direction=east,state=on": [],
    "placement=north,direction=west,state=off": [],
    "placement=north,direction=west,state=on": [],

    "placement=south,direction=north,state=off": [],
    "placement=south,direction=north,state=on": [],
    "placement=south,direction=south,state=off": [],
    "placement=south,direction=south,state=on": [],
    "placement=south,direction=east,state=off": [],
    "placement=south,direction=east,state=on": [],
    "placement=south,direction=west,state=off": [],
    "placement=south,direction=west,state=on": [],

    "placement=east,direction=north,state=off": [],
    "placement=east,direction=north,state=on": [],
    "placement=east,direction=south,state=off": [],
    "placement=east,direction=south,state=on": [],
    "placement=east,direction=east,state=off": [],
    "placement=east,direction=east,state=on": [],
    "placement=east,direction=west,state=off": [],
    "placement=east,direction=west,state=on": [],

    "placement=west,direction=north,state=off": [],
    "placement=west,direction=north,state=on": [],
    "placement=west,direction=south,state=off": [],
    "placement=west,direction=south,state=on": [],
    "placement=west,direction=east,state=off": [],
    "placement=west,direction=east,state=on": [],
    "placement=west,direction=west,state=off": [],
    "placement=west,direction=west,state=on": [],
  },
};
