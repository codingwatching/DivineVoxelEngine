export class VoxelRulesModoel {
  shapeStates = new Map<string, string[]>();
  conditionalNodes = new Map<string, string[]>();

  registerShapeState(id: string, geomtryId: string) {
    let stateArray = this.shapeStates.get(id);
    if (!stateArray) {
      stateArray = [];
      this.shapeStates.set(id, stateArray);
    }

    if (!stateArray.find((_) => _ == geomtryId)) stateArray.push(geomtryId);
  }
  registerCondiotnalNode(id: string, geomtryId: string) {
    let stateArray = this.conditionalNodes.get(id);
    if (!stateArray) {
      stateArray = [];
      this.conditionalNodes.set(id, stateArray);
    }

    if (!stateArray.find((_) => _ == geomtryId)) stateArray.push(geomtryId);
  }
}
