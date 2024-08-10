import { DVEMesher } from "../../Interfaces/Mesher/DVEMesher";
import { DVEConstructorCore } from "@divinevoxel/core/Interfaces/Constructor/DVEConstructorCore";
import { DVEFDataCore } from "../../Data/DVEFDataCore.js";
import { DVEFConstructorThreads } from "./DVEFConstructorThreads";
import { DVEAnaylzer } from "Interfaces/Anaylzer/DVEAnaylzer";
import ConstructorTasks from "./ConstructorTasks";

export type DVEFConstrucotrCoreInitData = {
  mesher: DVEMesher;
};

export class DVEFConstrucotrCore extends DVEConstructorCore {
  static instance: DVEFConstrucotrCore;
  threads = new DVEFConstructorThreads();
  data = new DVEFDataCore();
  mesher: DVEMesher;
  constructor(data: DVEFConstrucotrCoreInitData) {
    super();
    if (DVEFConstrucotrCore.instance) return DVEFConstrucotrCore.instance;
    DVEFConstrucotrCore.instance = this;
    this.mesher = data.mesher;
    ConstructorTasks(this);
  }
  async init(): Promise<void> {
    await this.mesher.init();
  }
}
