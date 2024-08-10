import { DataTool } from "../../Tools/Data/DataTool";
import { DVEDefaultMesher } from "../Mesher";

export class BuilderDataTool extends DataTool {
  getConstructor() {
    return DVEDefaultMesher.instance.constructors.get(this.getStringId());
  }
}
