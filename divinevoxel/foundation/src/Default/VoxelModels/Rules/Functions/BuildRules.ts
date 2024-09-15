import { OcclusionQuad, OcclusionResults } from "../Classes/OcclusionQuad";
import { VoxelRuleGeometry } from "../Classes/VoxelRulesGeometry";
import { VoxelRelativeCubeIndex } from "../../Indexing/VoxelRelativeCubeIndex";
import { Vec3Array } from "@amodx/math";

class OcculsionBox {
  constructor(
    public p1: Vec3Array,
    public p2: Vec3Array,
    public p3: Vec3Array,
    public p4: Vec3Array
  ) {}
}
function createOcculsionBox(point: Vec3Array, normal: Vec3Array): OcculsionBox {
  const size = 0.1;

  // Calculate half the size of the box
  const halfSize = size / 2;

  // Normalize the normal vector
  const normalLength = Math.sqrt(
    normal[0] ** 2 + normal[1] ** 2 + normal[2] ** 2
  );
  const n = [
    normal[0] / normalLength,
    normal[1] / normalLength,
    normal[2] / normalLength,
  ];

  // Create a small offset to move the box forward
  const offset = 0.01;
  const offsetPoint = [
    point[0] + n[0] * offset,
    point[1] + n[1] * offset,
    point[2] + n[2] * offset,
  ];

  // Generate two perpendicular vectors to the normal (for constructing the plane)
  let tangent: Vec3Array;
  let bitangent: Vec3Array;

  if (Math.abs(n[0]) > Math.abs(n[2])) {
    tangent = [-n[1], n[0], 0]; // Arbitrary perpendicular vector
  } else {
    tangent = [0, -n[2], n[1]]; // Another perpendicular vector
  }

  // Normalize the tangent
  const tangentLength = Math.sqrt(
    tangent[0] ** 2 + tangent[1] ** 2 + tangent[2] ** 2
  );
  tangent = [
    tangent[0] / tangentLength,
    tangent[1] / tangentLength,
    tangent[2] / tangentLength,
  ];

  // Bitangent is the cross product of the normal and tangent
  bitangent = [
    n[1] * tangent[2] - n[2] * tangent[1],
    n[2] * tangent[0] - n[0] * tangent[2],
    n[0] * tangent[1] - n[1] * tangent[0],
  ];

  // Calculate the four corners of the box based on the tangent and bitangent vectors
  const p1: Vec3Array = [
    offsetPoint[0] - tangent[0] * halfSize - bitangent[0] * halfSize,
    offsetPoint[1] - tangent[1] * halfSize - bitangent[1] * halfSize,
    offsetPoint[2] - tangent[2] * halfSize - bitangent[2] * halfSize,
  ];

  const p2: Vec3Array = [
    offsetPoint[0] + tangent[0] * halfSize - bitangent[0] * halfSize,
    offsetPoint[1] + tangent[1] * halfSize - bitangent[1] * halfSize,
    offsetPoint[2] + tangent[2] * halfSize - bitangent[2] * halfSize,
  ];

  const p3: Vec3Array = [
    offsetPoint[0] + tangent[0] * halfSize + bitangent[0] * halfSize,
    offsetPoint[1] + tangent[1] * halfSize + bitangent[1] * halfSize,
    offsetPoint[2] + tangent[2] * halfSize + bitangent[2] * halfSize,
  ];

  const p4: Vec3Array = [
    offsetPoint[0] - tangent[0] * halfSize + bitangent[0] * halfSize,
    offsetPoint[1] - tangent[1] * halfSize + bitangent[1] * halfSize,
    offsetPoint[2] - tangent[2] * halfSize + bitangent[2] * halfSize,
  ];

  // Create the box
  return new OcculsionBox(p1, p2, p3, p4);
}
function doesBoxIntersectQuad(box: OcculsionBox, quad: OcclusionQuad): boolean {
  // Get the points of the quad
  const quadPoints = quad.getPoints();

  // Get the points of the box
  const boxPoints = [box.p1, box.p2, box.p3, box.p4];

  // Compute the normals for the quad and box
  const quadNormal = quad.getNormal();
  const boxNormals: Vec3Array[] = [
    [1, 0, 0], // X-axis normal
    [0, 1, 0], // Y-axis normal
    [0, 0, 1], // Z-axis normal
  ];

  // Function to project a point onto an axis
  const projectPointOntoAxis = (point: Vec3Array, axis: Vec3Array) => {
    return point[0] * axis[0] + point[1] * axis[1] + point[2] * axis[2];
  };

  // Function to check if projections overlap on an axis
  const projectionsOverlap = (
    axis: Vec3Array,
    shape1Points: Vec3Array[],
    shape2Points: Vec3Array[]
  ) => {
    let [min1, max1] = [Infinity, -Infinity];
    let [min2, max2] = [Infinity, -Infinity];

    for (const point of shape1Points) {
      const projection = projectPointOntoAxis(point, axis);
      min1 = Math.min(min1, projection);
      max1 = Math.max(max1, projection);
    }

    for (const point of shape2Points) {
      const projection = projectPointOntoAxis(point, axis);
      min2 = Math.min(min2, projection);
      max2 = Math.max(max2, projection);
    }

    return !(max1 < min2 || max2 < min1);
  };

  // Check the quad's normal as a separating axis
  if (!projectionsOverlap(quadNormal, quadPoints, boxPoints)) {
    return false;
  }

  // Check the box's face normals as separating axes
  for (const boxNormal of boxNormals) {
    if (!projectionsOverlap(boxNormal, quadPoints, boxPoints)) {
      return false;
    }
  }

  // Check cross-products of edges as separating axes (add edge vectors and cross products)

  // If no separating axis found, the shapes intersect
  return true;
}

export function BuildRules(main: VoxelRuleGeometry, other: VoxelRuleGeometry) {
  main.occlusionPlane.setOffset(0, 0, 0);
  const faceCullMap = main.faceCullMap;
  const vertexHitMap = main.vertexHitMap;

  for (let y = -1; y < 2; y++) {
    for (let nx = -1; nx < 2; nx++) {
      for (let nz = -1; nz < 2; nz++) {
        const cullResults = new OcclusionResults<boolean>();
        const aoResults = new OcclusionResults<boolean>();
        const directionIndex = VoxelRelativeCubeIndex.getIndex(nx, y, nz);
        other.occlusionPlane.setOffset(nx, y, nz);
        for (const [mainFaceIndex, currentPlane] of main.occlusionPlane
          .planes) {
          let occuled = false;
          for (const [otherFaceIndex, otherPlane] of other.occlusionPlane
            .planes) {
            if (
              otherPlane.parentId == currentPlane.parentId &&
              currentPlane.nodeId == otherPlane.nodeId &&
              nx == 0 &&
              y == 0 &&
              nz == 0
            )
              continue;

            if (otherPlane.doesCover(currentPlane)) occuled = true;
            if (occuled) break;
          }
          faceCullMap[currentPlane.faceCount] ??= [];
          if (occuled) {
            if (
              !faceCullMap[currentPlane.faceCount].find(
                (_) => _ == directionIndex
              )
            )
              faceCullMap[currentPlane.faceCount].push(directionIndex);
          }
          cullResults.results.set(currentPlane.faceCount, occuled);
        }
        for (const [mainFaceIndex, currentPlane] of main.occlusionPlane
          .planes) {
          const points = currentPlane.getPoints();
          const normal = currentPlane.getNormal();
          for (let v = 0; v < points.length; v++) {
            const occulsionBox = createOcculsionBox(points[v], normal);

            let touching = false;
            const trueVertexIndex = currentPlane.vertexCount + v;
            for (const [otherFaceIndex, otherPlane] of other.occlusionPlane
              .planes) {
              if (otherPlane.direction == currentPlane.direction) continue;
              if (
                otherPlane.parentId == currentPlane.parentId &&
                currentPlane.nodeId == otherPlane.nodeId &&
                nx == 0 &&
                y == 0 &&
                nz == 0
              )
                continue;
              if (doesBoxIntersectQuad(occulsionBox, otherPlane)) {
                touching = true;
              }
              if (touching) break;
            }

            aoResults.results.set(trueVertexIndex, touching);
            vertexHitMap[trueVertexIndex] ??= [];
            if (touching) {
              if (
                !vertexHitMap[trueVertexIndex].find((_) => _ == directionIndex)
              )
                vertexHitMap[trueVertexIndex].push(directionIndex);
            }
          }
        }
        main.addCullResults(other.id, directionIndex, cullResults);
        main.addAOResults(other.id, directionIndex, aoResults);
      }
    }
  }
}
