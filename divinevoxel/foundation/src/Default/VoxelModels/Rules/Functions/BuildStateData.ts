import {
  ShapeStateSchemaNodeData,
  ShapeRelationsScehmaNodeData,
} from "../../State/State.types";
import { VoxelRulesModoel } from "../Classes/VoxelRulesModel";
import { StringPalette } from "@divinevoxel/core/Interfaces/Data/StringPalette";
import { VoxelModelRuleBuilder } from "../VoxelModelManager";
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

const addPath = <Value>(
  root: StateTreeNode<Value>,
  path: string[],
  result: Value
) => {
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
};

/**
[geo state index]

[state id]
    [geo-link-id][]
    

 */

export function BuildStateData(
  model: VoxelRulesModoel,
  geoPalette: StringPalette
) {
  const data = model.data;

  const schema: (ShapeStateSchemaNodeData | ShapeRelationsScehmaNodeData)[] =
    [];

  const schemaIdPalette = new StringPalette();
  const schemaValuePalette = new Map<string, StringPalette>();
  {
    let bitIndex = 0;
    for (const schemaNode of data.shapeStateSchema) {
      schemaIdPalette.register(schemaNode.name);

      const maxBits = bitsNeeded(
        Object.keys(schemaNode.values)
          .map((_) => Number(_))
          .sort((a, b) => a - b)
          .pop()!
      );

      schema.push({
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
    for (const schemaNode of data.relationsScehma) {
      schemaIdPalette.register(schemaNode.name);

      schema.push({
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
        VoxelModelRuleBuilder.getGeometryLinkId(node)
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
        VoxelModelRuleBuilder.getGeometryLinkId(node)
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
    addPath(
      shapeStateTree,
      key
        .split(",")
        .map((pair) => pair.split("="))
        .flat(),
      shapeStatePalette.length - 1
    );
  }

  const condiotnalNodeTrees: StateTreeNode<any>[] = [];
  for (const key in data.shapeStatesConditonalNodes) {
    const tree = new StateTreeNode("root");
    addPath(
      tree,
      key
        .split(",")
        .map((pair) => pair.split("="))
        .flat(),
      data.shapeStatesConditonalNodes[key].map((_) =>
        geometryLinkPalette.getNumberId(_.id)
      )
    );
    condiotnalNodeTrees.push(tree);
  }

  const dataOverrideTree = new StateTreeNode("root");
  for (const key in data.shapeStatesOverrides) {
    addPath(
      dataOverrideTree,
      key
        .split(",")
        .map((pair) => pair.split("="))
        .flat(),
      data.shapeStatesOverrides[key].map((_) =>
        geometryLinkPalette.getNumberId(_.id)
      )
    );
  }

  const shapeStateTreeData = shapeStateTree.toJSON();
  const newShapeStateTree: any[] = [];
  const reMap = (baseObj: any, newObj: any[]) => {
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
          reMapedChildren[valueIndex] = reMap(baseChild[value], []);
          continue;
        }
        reMapedChildren[valueIndex] = baseChild[value];
      }

      newObj[propertyIndex] = reMapedChildren;
    }

    return newObj;
  };
  reMap(shapeStateTreeData, newShapeStateTree);

  const finalData = {
    schema,
    shapeStateTree: newShapeStateTree,
    geometryLinkIdMap: geometryLinkPalette._map,
    geometryLinkStateMap,
    shapeStatePalette,
    shapeStateRecord,
    // dataOverrideTree: dataOverrideTree.toJSON(),
    //condiotnalNodeTrees: condiotnalNodeTrees.map((_) => _.toJSON()),
  };

  model.stateData = finalData;
  return finalData;
}
