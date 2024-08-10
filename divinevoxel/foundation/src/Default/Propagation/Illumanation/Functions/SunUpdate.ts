import type { LightTaskRequest } from "../../../Tasks/Constructor/Tasks/TasksRequest"
import { IlluminationManager as IM } from "../IlluminationManager.js";

export function SunUpdate(tasks: LightTaskRequest) {
 const {update} = tasks.queues.sun;
 while (update.length > 0) {
  const x = update.shift()!;
  const y = update.shift()!;
  const z = update.shift()!;
  if (!IM._sDataTool.loadInAt(x, y, z)) continue;
  const sl = IM._sDataTool.getLight();
  if (sl <= 0) continue;
  if (!IM.lightData.getS(sl)) continue;

  if (IM._nDataTool.loadInAt(x - 1, y, z)) {
   const nl = IM._nDataTool.getLight();
   if (nl > -1 && IM.lightData.isLessThanForSunAdd(nl, sl)) {
    update.push(x - 1, y, z);
    IM._nDataTool.setLight(IM.lightData.getMinusOneForSun(sl, nl)).commit();
   }
  }

  if (IM._nDataTool.loadInAt(x + 1, y, z)) {
   const nl = IM._nDataTool.getLight();
   if (nl > -1 && IM.lightData.isLessThanForSunAdd(nl, sl)) {
    update.push(x + 1, y, z);
    IM._nDataTool.setLight(IM.lightData.getMinusOneForSun(sl, nl)).commit();
   }
  }

  if (IM._nDataTool.loadInAt(x, y, z - 1)) {
   const nl = IM._nDataTool.getLight();
   if (nl > -1 && IM.lightData.isLessThanForSunAdd(nl, sl)) {
    update.push(x, y, z - 1);
    IM._nDataTool.setLight(IM.lightData.getMinusOneForSun(sl, nl)).commit();
   }
  }

  if (IM._nDataTool.loadInAt(x, y, z + 1)) {
   const nl = IM._nDataTool.getLight();
   if (nl > -1 && IM.lightData.isLessThanForSunAdd(nl, sl)) {
    update.push(x, y, z + 1);
    IM._nDataTool.setLight(IM.lightData.getMinusOneForSun(sl, nl)).commit();
   }
  }

  if (IM._nDataTool.loadInAt(x, y - 1, z)) {
   const nl = IM._nDataTool.getLight();
   if (nl > -1 && IM.lightData.isLessThanForSunAddDown(nl, sl)) {
    if (IM._nDataTool.isAir()) {
     update.push(x, y - 1, z);
     IM._nDataTool
      .setLight(IM.lightData.getSunLightForUnderVoxel(sl, nl))
      .commit();
    } else {
     const substance = IM._nDataTool.getSubstanceStringId();
     if (substance != "#dve_magma" && substance != "#dve_solid") {
      update.push(x, y - 1, z);
      IM._nDataTool.setLight(IM.lightData.getMinusOneForSun(sl, nl)).commit();
     }
    }
   }
  }

  if (IM._nDataTool.loadInAt(x, y + 1, z)) {
   const nl = IM._nDataTool.getLight();
   if (nl > -1 && IM.lightData.isLessThanForSunAdd(nl, sl)) {
    update.push(x, y + 1, z);
    IM._nDataTool.setLight(IM.lightData.getMinusOneForSun(sl, nl)).commit();
   }
  }

  tasks.addNeighborsToRebuildQueue(x, y, z);
 }
}

export function SunRemove(tasks: LightTaskRequest, clearUpdateMap = true) {
 const {remove,update,remvoeMap,updateMap} = tasks.queues.sun;

 while (remove.length != 0) {
  const x = remove.shift()!;
  const y = remove.shift()!;
  const z = remove.shift()!;
  if (remvoeMap.inMap(x, y, z)) continue;
  remvoeMap.add(x, y, z);

  if (!IM._sDataTool.loadInAt(x, y, z)) continue;
  const sl = IM._sDataTool.getLight();
  if (sl <= 0) continue;
  if (!IM.lightData.getS(sl)) continue;

  if (IM._nDataTool.loadInAt(x - 1, y, z)) {
   const nl = IM._nDataTool.getLight();
   if (nl > 0) {
    if (IM.lightData.isLessThanForSunRemove(nl, sl)) {
     remove.push(x - 1, y, z);
    } else {
     if (
      !updateMap.inMap(x - 1, y, z) &&
      IM.lightData.isGreaterOrEqualThanForSunRemove(nl, sl)
     ) {
      update.push(x - 1, y, z);
      updateMap.add(x - 1, y, z);
     }
    }
   }
  }
  if (IM._nDataTool.loadInAt(x + 1, y, z)) {
   const nl = IM._nDataTool.getLight();
   if (nl > 0) {
    if (IM.lightData.isLessThanForSunRemove(nl, sl)) {
     remove.push(x + 1, y, z);
    } else {
     if (
      !updateMap.inMap(x + 1, y, z) &&
      IM.lightData.isGreaterOrEqualThanForSunRemove(nl, sl)
     ) {
      update.push(x + 1, y, z);
      updateMap.add(x + 1, y, z);
     }
    }
   }
  }

  if (IM._nDataTool.loadInAt(x, y, z - 1)) {
   const nl = IM._nDataTool.getLight();
   if (nl > 0) {
    if (IM.lightData.isLessThanForSunRemove(nl, sl)) {
     remove.push(x, y, z - 1);
    } else {
     if (
      !updateMap.inMap(x, y, z - 1) &&
      IM.lightData.isGreaterOrEqualThanForSunRemove(nl, sl)
     ) {
      update.push(x, y, z - 1);
      updateMap.add(x, y, z - 1);
     }
    }
   }
  }

  if (IM._nDataTool.loadInAt(x, y, z + 1)) {
   const nl = IM._nDataTool.getLight();
   if (nl > 0) {
    if (IM.lightData.isLessThanForSunRemove(nl, sl)) {
     remove.push(x, y, z + 1);
    } else {
     if (
      !updateMap.inMap(x, y, z + 1) &&
      IM.lightData.isGreaterOrEqualThanForSunRemove(nl, sl)
     ) {
      update.push(x, y, z + 1);
      updateMap.add(x, y, z + 1);
     }
    }
   }
  }

  if (IM._nDataTool.loadInAt(x, y - 1, z)) {
   const nl = IM._nDataTool.getLight();
   if (nl > 0) {
    if (IM.lightData.sunLightCompareForDownSunRemove(nl, sl)) {
     remove.push(x, y - 1, z);
    } else {
     if (
      !updateMap.inMap(x, y - 1, z) &&
      IM.lightData.isGreaterOrEqualThanForSunRemove(nl, sl)
     ) {
      update.push(x, y - 1, z);
      updateMap.add(x, y - 1, z);
     }
    }
   }
  }

  if (IM._nDataTool.loadInAt(x, y + 1, z)) {
   const n6 = IM._nDataTool.getLight();
   if (n6 > 0) {
    if (IM.lightData.isLessThanForSunRemove(n6, sl)) {
     remove.push(x, y + 1, z);
    } else {
     if (
      !updateMap.inMap(x, y - 1, z) &&
      IM.lightData.isGreaterOrEqualThanForSunRemove(n6, sl)
     ) {
      update.push(x, y + 1, z);
      updateMap.add(x, y + 1, z);
     }
    }
   }
  }
  tasks.addNeighborsToRebuildQueue(x, y, z);
  IM._sDataTool.setLight(IM.lightData.removeSunLight(sl)).commit();
 }
 if(clearUpdateMap) updateMap.clear();
 remvoeMap.clear();
}
