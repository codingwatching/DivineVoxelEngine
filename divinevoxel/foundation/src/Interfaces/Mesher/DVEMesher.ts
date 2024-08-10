import { Observable } from "@amodx/core/Observers";
import { LocationData } from "@divinevoxel/core/Math";
import { TextureRegister } from "../../Textures/TextureRegister";

export abstract class DVEMesher {
  static observers = {
    texturesRegistered: new Observable<typeof TextureRegister>(),
  };
  abstract init(): void;
  abstract meshChunk(
    location: LocationData,
    LOD: number,
    priority: number
  ): void;
}
