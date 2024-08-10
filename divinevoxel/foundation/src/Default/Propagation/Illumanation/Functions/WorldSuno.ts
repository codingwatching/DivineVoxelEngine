//types
import type { WorldSunTaskRequest } from "../../../Tasks/Constructor/Tasks/TasksRequest"
//data
import { WorldBounds } from "@divinevoxel/core/Data/World/WorldBounds.js";
import { WorldRegister } from "../../../../Data/World/WorldRegister.js";
import { $3dCardinalNeighbors } from "@divinevoxel/core/Math/Constants/CardinalNeighbors.js";
import { WorldSpaces } from "@divinevoxel/core/Data/World/WorldSpaces.js";

import { IlluminationManager as IM } from "../IlluminationManager.js";
import { HeightMapTool } from "../../../Tools/Data/WorldData/HeightMapTool.js";
const inColumnBounds = (cx: number, cz: number, x: number, z: number) => {
  if (
    x >= cx &&
    x <= cx + WorldSpaces.chunk._bounds.x &&
    z >= cz &&
    z <= cz + WorldSpaces.chunk._bounds.z
  )
    return true;
  return false;
};

const heightMapTool = new HeightMapTool();

export function RunWorldSun(tasks: WorldSunTaskRequest) {
  IM.setDimension(tasks.origin[0]);
  tasks.start();
  if (!WorldRegister.instance.column.get(tasks.origin)) return false;
  const [dimension, cx, cy, cz] = tasks.origin;

  const queue = tasks.queues.sun;
  IM._sDataTool.setDimension(dimension);
  const RmaxY = heightMapTool.column.getRelative(tasks.origin);
  const AmaxY = heightMapTool.column.getAbsolute(tasks.origin);

  //fill
  for (let iy = AmaxY; iy < WorldBounds.bounds.MaxY; iy++) {
    for (let iz = cz; iz < cz + WorldSpaces.chunk._bounds.z; iz++) {
      for (let ix = cx; ix < cx + WorldSpaces.chunk._bounds.x; ix++) {
        if (!IM._sDataTool.loadInAt(ix, iy, iz)) continue;
        const l = IM._sDataTool.getLight();
        if (l < 0) continue;
        IM._sDataTool.setLight(IM.lightData.setS(0xf, l)).commit();
      }
    }
  }

  //accumulate
  for (let iy = AmaxY; iy <= RmaxY; iy++) {
    for (let iz = cz; iz < cz + WorldSpaces.chunk._bounds.z; iz++) {
      for (let ix = cx; ix < cx + WorldSpaces.chunk._bounds.x; ix++) {
        if (!IM._sDataTool.loadInAt(ix, iy, iz)) continue;
        const l = IM._sDataTool.getLight();
        if (l < 0 && IM.lightData.getS(l) != 0xf) continue;
        let add = false;
        for (const n of $3dCardinalNeighbors) {
          const nx = ix + n[0];
          const ny = iy + n[1];
          const nz = iz + n[2];
          if (IM._nDataTool.loadInAt(nx, ny, nz)) {
            const nl = IM._nDataTool.getLight();
            if (nl >= 0 && IM.lightData.getS(nl) < 0xf) {
              add = true;
              break;
            }
          }
        }
        if (add) {
          queue.push(ix, iy, iz);
        }
      }
    }
  }

  //flood
  while (queue.length) {
    const x = queue.shift()!;
    const y = queue.shift()!;
    const z = queue.shift()!;
    if (!IM._sDataTool.loadInAt(x, y, z)) continue;
    const sl = IM._sDataTool.getLight();
    if (sl <= 0) continue;
    const sunL = IM.lightData.getS(sl);
    if (sunL >= 0xf && !inColumnBounds(cx, cz, x, z)) continue;

    if (IM._nDataTool.loadInAt(x - 1, y, z)) {
      const nl = IM._nDataTool.getLight();
      if (nl > -1 && IM.lightData.isLessThanForSunAdd(nl, sl)) {
        queue.push(x - 1, y, z);
        IM._nDataTool.setLight(IM.lightData.getMinusOneForSun(sl, nl)).commit();
      }
    }

    if (IM._nDataTool.loadInAt(x + 1, y, z)) {
      const nl = IM._nDataTool.getLight();
      if (nl > -1 && IM.lightData.isLessThanForSunAdd(nl, sl)) {
        queue.push(x + 1, y, z);
        IM._nDataTool.setLight(IM.lightData.getMinusOneForSun(sl, nl)).commit();
      }
    }

    if (IM._nDataTool.loadInAt(x, y, z - 1)) {
      const nl = IM._nDataTool.getLight();
      if (nl > -1 && IM.lightData.isLessThanForSunAdd(nl, sl)) {
        queue.push(x, y, z - 1);
        IM._nDataTool.setLight(IM.lightData.getMinusOneForSun(sl, nl)).commit();
      }
    }

    if (IM._nDataTool.loadInAt(x, y, z + 1)) {
      const nl = IM._nDataTool.getLight();
      if (nl > -1 && IM.lightData.isLessThanForSunAdd(nl, sl)) {
        queue.push(x, y, z + 1);
        IM._nDataTool.setLight(IM.lightData.getMinusOneForSun(sl, nl)).commit();
      }
    }

    if (IM._nDataTool.loadInAt(x, y - 1, z)) {
      const nl = IM._nDataTool.getLight();

      if (nl > -1 && IM.lightData.isLessThanForSunAddDown(nl, sl)) {
        if (IM._nDataTool.isAir()) {
          queue.push(x, y - 1, z);
          IM._nDataTool
            .setLight(IM.lightData.getSunLightForUnderVoxel(sl, nl))
            .commit();
        } else {
          if (IM._nDataTool.getSubstnaceData().allowLight()) {
            queue.push(x, y - 1, z);
            IM._nDataTool
              .setLight(IM.lightData.getMinusOneForSun(sl, nl))
              .commit();
          }
        }
      }
    }

    if (IM._nDataTool.loadInAt(x, y + 1, z)) {
      const nl = IM._nDataTool.getLight();
      if (nl > -1 && IM.lightData.isLessThanForSunAdd(nl, sl)) {
        queue.push(x, y + 1, z);
        IM._nDataTool.setLight(IM.lightData.getMinusOneForSun(sl, nl)).commit();
      }
    }
  }

  tasks.stop();
}
