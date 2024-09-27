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
