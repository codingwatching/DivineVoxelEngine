import {
  ShapeStateSchemaNodeData,
  ShapeRelationsScehmaNodeData,
  StateLogicStatement,
  StateCompareOperationsMap,
  StateLogicOperationsMap,
} from "../../State/State.types";
import { VoxelRulesModoel } from "../Classes/VoxelRulesModel";
import { StringPalette } from "@divinevoxel/core/Interfaces/Data/StringPalette";
import { VoxelModelManager } from "../VoxelModelManager";
import {
  VoxelConstructorBinarySchemaData,
  VoxelModelRelationsSchemaData,
} from "Default/VoxelModels/VoxelModel.types";
function bitsNeeded(n: number): number {
  if (n < 0) throw new Error("Input must be a non-negative integer.");

  let bits = 0;
  while (n > 0) {
    bits++;
    n >>= 1;
  }

  return bits;
}
export class StateTreeNode<Value> {
  children = new Map<string, StateTreeNode<Value>>();
  result?: Value;

  constructor(public id: string) {}

  addChild(value: string, node: StateTreeNode<Value>) {
    this.children.set(value, node);
  }

  getChild(value: string): StateTreeNode<Value> | undefined {
    return this.children.get(value);
  }

  toJSON(): any {
    const childrenObj: Record<string, any> = {};
    this.children.forEach((childNode, key) => {
      childrenObj[key] = childNode.toJSON();
    });
    if (this.result != undefined) return this.result;

    return childrenObj;
  }
}

function generateCombinations(length: number): number[][] {
  const values: number[] = [0, 1];
  function gen(
    currentCombination: number[],
    remainingLength: number
  ): number[][] {
    if (remainingLength === 0) {
      return [currentCombination];
    }

    let combinations: number[][] = [];
    for (let value of values) {
      combinations.push(
        ...gen([...currentCombination, value], remainingLength - 1)
      );
    }
    return combinations;
  }
  return gen([], length);
}

function generateNestedCombinations(length: number, values: number[]): any {
  let combinationIndex = 0;

  function createNestedArray(depth: number): any {
    if (depth === length) {
      return combinationIndex++;
    }

    const nestedArray: any[] = [];
    for (let i = 0; i < values.length; i++) {
      nestedArray.push(createNestedArray(depth + 1));
    }

    return nestedArray;
  }

  return createNestedArray(0);
}

function addPathToTree<Value>(
  root: StateTreeNode<Value>,
  path: string[],
  result: Value
) {
  let currentNode = root;

  for (let i = 0; i < path.length; i += 2) {
    const key = path[i];
    const value = path[i + 1];

    let childNode = currentNode.getChild(key);
    if (!childNode) {
      childNode = new StateTreeNode(key);
      currentNode.addChild(key, childNode);
    }

    let valueNode = childNode.getChild(value);
    if (!valueNode) {
      valueNode = new StateTreeNode(value);
      childNode.addChild(value, valueNode);
    }

    currentNode = valueNode;
  }
  currentNode.result = result;
}

function reMapTree(
  schemaIdPalette: StringPalette,
  schemaValuePalette: Map<string, StringPalette>,
  baseObj: any,
  newObj: any[]
) {
  for (const key in baseObj) {
    if (key == "*") continue;

    const propertyIndex = schemaIdPalette.getNumberId(key);
    const baseChild = baseObj[key];
    const reMapedChildren: any[] = [];
    const schemaValueIndex = schemaValuePalette.get(key);

    if (!schemaValueIndex) continue;
    for (const value in baseChild) {
      const propertyValue = baseChild[value];
      const valueIndex = schemaValueIndex.getNumberId(value);
      if (typeof propertyValue == "object") {
        reMapedChildren[valueIndex] = reMapTree(
          schemaIdPalette,
          schemaValuePalette,
          baseChild[value],
          []
        );
        continue;
      }
      reMapedChildren[valueIndex] = baseChild[value];
    }

    newObj[propertyIndex] = reMapedChildren;
  }

  return newObj;
}

function buildSchemas(
  binaryNodes: VoxelConstructorBinarySchemaData[],
  relationNodes: VoxelModelRelationsSchemaData[]
) {
  const baseSchema: (
    | ShapeStateSchemaNodeData
    | ShapeRelationsScehmaNodeData
  )[] = [];

  const schemaIdPalette = new StringPalette();
  const schemaValuePalette = new Map<string, StringPalette>();
  {
    let bitIndex = 0;
    for (const schemaNode of binaryNodes) {
      schemaIdPalette.register(schemaNode.name);

      const maxBits = bitsNeeded(
        Object.keys(schemaNode.values)
          .map((_) => Number(_))
          .sort((a, b) => a - b)
          .pop()!
      );

      baseSchema.push({
        id: schemaNode.name,
        type: "shape-state",
        index: bitIndex,
        mask: (1 << maxBits) - 1,
      });

      bitIndex += maxBits;

      const valuePalette = new StringPalette();

      for (const vIndex in schemaNode.values) {
        const vValue = schemaNode.values[vIndex];
        valuePalette.register(vValue);
      }

      schemaValuePalette.set(schemaNode.name, valuePalette);
    }
  }

  {
    for (const schemaNode of relationNodes) {
      schemaIdPalette.register(schemaNode.name);

      baseSchema.push({
        id: schemaNode.name,
        type: "relation",
        conditions: schemaNode.conditions,
      });
      const valuePalette = new StringPalette();
      valuePalette.register("false");
      valuePalette.register("true");
      schemaValuePalette.set(schemaNode.name, valuePalette);
    }
  }

  return {
    baseSchema,
    schemaIdPalette,
    schemaValuePalette,
  };
}

export function BuildStateData(
  model: VoxelRulesModoel,
  geoPalette: StringPalette
) {
  const data = model.data;

  const { baseSchema, schemaIdPalette, schemaValuePalette } = buildSchemas(
    data.shapeStateSchema,
    data.relationsSchema
  );
  const geometryLinkPalette = new StringPalette();
  //maps geo link ids to geomtry ids
  const geometryLinkStateMap: number[] = [];

  //add geomtry from main shape states
  for (const key in data.shapeStatesNodes) {
    const nodeData = data.shapeStatesNodes[key];

    for (const node of nodeData) {
      if (geometryLinkPalette.isRegistered(node.id)) continue;
      const linkId = geometryLinkPalette.register(node.id);
      geometryLinkStateMap[linkId] = geoPalette.getNumberId(
        VoxelModelManager.getGeometryLinkId(node)
      );
    }
  }

  //add geomtry from condiotnal  shape states
  for (const key in data.shapeStatesConditonalNodes) {
    const nodeData = data.shapeStatesConditonalNodes[key];

    for (const node of nodeData) {
      if (geometryLinkPalette.isRegistered(node.id)) continue;
      const linkId = geometryLinkPalette.register(node.id);
      geometryLinkStateMap[linkId] = geoPalette.getNumberId(
        VoxelModelManager.getGeometryLinkId(node)
      );
    }
  }

  //build state trees
  const shapeStateTree = new StateTreeNode("root");
  const shapeStatePalette: number[][] = [];
  const shapeStateRecord: Record<string, number> = {};
  for (const key in data.shapeStatesNodes) {
    shapeStatePalette.push(
      data.shapeStatesNodes[key].map((_) =>
        geometryLinkPalette.getNumberId(_.id)
      )
    );

    shapeStateRecord[key] = shapeStatePalette.length - 1;
    addPathToTree(
      shapeStateTree,
      key
        .split(",")
        .map((pair) => pair.split("="))
        .flat(),
      shapeStatePalette.length - 1
    );
  }

  const condiotnalShapeStateNodePalette: number[][] = [];
  const condiotnalShapeStateNodeRecord: Record<string, number> = {};
  const condiotnalStatements: StateLogicStatement[] = [];
  const compareOperations = Object.keys(StateCompareOperationsMap);
  for (const key in data.shapeStatesConditonalNodes) {
    condiotnalShapeStateNodePalette.push(
      data.shapeStatesConditonalNodes[key].map((_) =>
        geometryLinkPalette.getNumberId(_.id)
      )
    );
    condiotnalShapeStateNodeRecord[key] =
      condiotnalShapeStateNodePalette.length - 1;

    const statement: StateLogicStatement = [];
    const nodes = key.split(" ");
    let mode: "operation" | "node" = "node";

    for (const node of nodes) {
      if (!node) continue;
      if (mode == "node") {
        mode = "operation";
        for (const op of compareOperations) {
          if (node.includes(op)) {
            const [schemaId, value] = node.split(op);

            statement.push([
              schemaIdPalette.getNumberId(schemaId),
              StateCompareOperationsMap[op],
              schemaValuePalette.get(schemaId)!.getNumberId(value),
            ]);
            break;
          }
        }
        continue;
      }

      if (mode == "operation") {
        mode = "node";
        statement.push(StateLogicOperationsMap[node]);
      }
    }

    condiotnalStatements.push(statement);
  }

  const condiotnalNodeStateTree = generateNestedCombinations(
    condiotnalStatements.length,
    [0, 1]
  );
  const allCombinations = generateCombinations(
    condiotnalStatements.length
  ) as any[];
  const condiotanlStatePalette: number[][][] = [];

  for (const combo of allCombinations) {
    let k = 0;
    const newCombo: number[][] = [];
    for (let i = 0; i < combo.length; i++) {
      if (combo[i] == 0) continue;
      newCombo[k] = condiotnalShapeStateNodePalette[i];
      k++;
    }
    condiotanlStatePalette.push(newCombo);
  }

  const shapeStateDataOverrideRecord: Record<string, number> = {};
  const shapeStateDataOverridePalette: number[][] = [];
  const dataOverrideTree = new StateTreeNode("root");
  for (const key in data.shapeStatesOverrides) {
    shapeStateDataOverridePalette.push(
      data.shapeStatesOverrides[key].map((_) =>
        geometryLinkPalette.getNumberId(_.id)
      )
    );
    addPathToTree(
      dataOverrideTree,
      key
        .split(",")
        .map((pair) => pair.split("="))
        .flat(),
      shapeStateDataOverridePalette.length - 1
    );
    shapeStateDataOverrideRecord[key] =
      shapeStateDataOverridePalette.length - 1;
  }

  const shapeStateTreeData = shapeStateTree.toJSON();
  const newShapeStateTree: any[] = [];

  reMapTree(
    schemaIdPalette,
    schemaValuePalette,
    shapeStateTreeData,
    newShapeStateTree
  );

  const shapeStatDataOverrideeTreeData = dataOverrideTree.toJSON();
  const newshapeStatDataOverrideeTree: any[] = [];

  reMapTree(
    schemaIdPalette,
    schemaValuePalette,
    shapeStatDataOverrideeTreeData,
    newshapeStatDataOverrideeTree
  );

  for (const [voxelId, voxelData] of model.voxels) {
    const modeStateTree = new StateTreeNode("root");
    const modStatePalette: any[] = [];
    const modStateRecord: Record<string, number> = {};

    const { baseSchema, schemaIdPalette, schemaValuePalette } = buildSchemas(
      voxelData.modSchema || [],
      voxelData.modRelationSchema || []
    );
    for (const key in voxelData.inputs) {
      modStatePalette.push(voxelData.inputs[key]);

      modStateRecord[key] = modStatePalette.length - 1;
      addPathToTree(
        modeStateTree,
        key
          .split(",")
          .map((pair) => pair.split("="))
          .flat(),
        modStatePalette.length - 1
      );
    }
    const modTreeData = modeStateTree.toJSON();
    const newModTree: any[] = [];
    reMapTree(schemaIdPalette, schemaValuePalette, modTreeData, newModTree);
    model.voxelModData.set(voxelId, {
      modSchema: baseSchema,
      modPalette: modStatePalette,
      modRecord: modStateRecord,
      modStateTree: newModTree,
    });
  }

  const finalData = {
    schema: baseSchema,
    shapeStatDataOverrideeTree: newshapeStatDataOverrideeTree,
    shapeStateDataOverridePalette,
    shapeStateDataOverrideRecord,
    shapeStateTree: newShapeStateTree,
    geometryLinkIdMap: geometryLinkPalette._map,
    geometryLinkStateMap,
    shapeStatePalette,
    shapeStateRecord,
    condiotnalNodeStateTree,
    condiotnalStatements,
    condiotnalShapeStatePalette: condiotnalShapeStateNodePalette,
    condiotnalShapeStateRecord: condiotnalShapeStateNodeRecord,
    condiotanlStatePalette,
  };

  model.stateData = finalData;
  return finalData;
}
