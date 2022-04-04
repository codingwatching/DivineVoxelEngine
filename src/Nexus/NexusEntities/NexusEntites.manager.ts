import type { DivineVoxelEngineNexus } from "index";
import type { EntityTypes } from "Meta/Entity/Entity.types";
import type {
 NexusEntity,
 NexusEntityData,
 NexusEntityInterface,
} from "Meta/Entity/NexusEntity.types";
import { PositionMatrix } from "Meta/Util.types";

export class NexusEntites {
 entityTemplate: Record<
  string,
  { template: NexusEntity; data: NexusEntityData }
 > = {};
 loaedEntities: Record<EntityTypes, Record<string, NexusEntityInterface>> = {
  player: {},
  being: {},
  item: {},
  npc: {},
  util: {},
 };

 constructor(private DVEN: DivineVoxelEngineNexus) {}

 registerEntity(
  id: string,
  entityData: NexusEntityData,
  renderedEntity: NexusEntity
 ) {
  if (this.entityTemplate[id]) {
   throw new Error(`The entity with the ${id} already exists.`);
  }
  this.entityTemplate[id] = {
   template: renderedEntity,
   data: entityData,
  };
 }

 _getID() {
  return `${this._unqiueId()}-${this._unqiueId()}`;
 }
 _unqiueId() {
  return Math.floor((1 + Math.random()) * 0x1000000).toString(16);
 }
 _generateUUI() {
  return this._getID();
 }

 spawnEntity(
  entityId: string,
  position: PositionMatrix,
  otherData?: any,
  identiferId?: string
 ) {
  const entity = this.entityTemplate[entityId];
  const newEntity = new entity.template();
  const positionArray = new SharedArrayBuffer(4 * 3);
  const statesArray = new Float32Array(entity.data.numStates * 4);
  newEntity.position = new Float32Array(positionArray);
  newEntity.states = new Float32Array(statesArray);
  newEntity.position[0] = position.x;
  newEntity.position[1] = position.y;
  newEntity.position[2] = position.z;
  newEntity.$INIT(entity.data, otherData);
  let uuid = "";
  if (identiferId) {
   uuid = identiferId;
  } else {
   uuid = this._generateUUI();
  }
  this.loaedEntities[entity.data.type][uuid] = newEntity;
  newEntity.onSpawn();
 }

 dSepawnEntity(entityId: string, identiferId: string) {
  const entity = this.entityTemplate[entityId];
  const despawningEntity = this.loaedEntities[entity.data.type][identiferId];
  despawningEntity.onDeSpawn();
  delete this.loaedEntities[entity.data.type][identiferId];
 }
}