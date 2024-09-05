import type { LocationData } from "@divinevoxel/core/Math";
import type { Vec3Array } from "@amodx/math";

export class LocationBoundTool {
  location: LocationData = ["main", 0, 0, 0];

  get dimension() {
    return this.location[0];
  }
  set dimension(dimension: string) {
    this.location[0] = dimension;
  }

  get x() {
    return this.location[1];
  }
  set x(value: number) {
    this.location[1] = value;
  }

  get y() {
    return this.location[2];
  }
  set y(value: number) {
    this.location[2] = value;
  }

  get z() {
    return this.location[3];
  }
  set z(value: number) {
    this.location[3] = value;
  }

  setDimension(dimensionId: string) {
    this.location[0] = dimensionId;
    return this;
  }

  getLocation(): LocationData {
    return this.location;
  }

  getXYZAsArray(): Vec3Array {
    return [this.x, this.y, this.z];
  }
  getXYZ() {
    return {
      x: this.x,
      y: this.y,
      z: this.z,
    };
  }
  setXYZ(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }



  setLocation(location: LocationData) {
    this.dimension = location[0];
    this.x = location[1];
    this.y = location[2];
    this.z = location[3];
    return this;
  }
}
