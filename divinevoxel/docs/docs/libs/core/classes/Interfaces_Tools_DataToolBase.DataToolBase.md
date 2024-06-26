---
id: "Interfaces_Tools_DataToolBase.DataToolBase"
title: "Class: DataToolBase"
sidebar_label: "DataToolBase"
custom_edit_url: null
---

[Interfaces/Tools/DataToolBase](../modules/Interfaces_Tools_DataToolBase.md).DataToolBase

## Hierarchy

- [`LocationBoundToolBase`](Interfaces_Data_LocationBoundToolBase.LocationBoundToolBase.md)

  ↳ **`DataToolBase`**

## Constructors

### constructor

• **new DataToolBase**(): [`DataToolBase`](Interfaces_Tools_DataToolBase.DataToolBase.md)

#### Returns

[`DataToolBase`](Interfaces_Tools_DataToolBase.DataToolBase.md)

#### Inherited from

[LocationBoundToolBase](Interfaces_Data_LocationBoundToolBase.LocationBoundToolBase.md).[constructor](Interfaces_Data_LocationBoundToolBase.LocationBoundToolBase.md#constructor)

## Properties

### location

• **location**: [`LocationData`](../modules/Math_Spaces_VoxelSpaces_types.md#locationdata)

#### Inherited from

[LocationBoundToolBase](Interfaces_Data_LocationBoundToolBase.LocationBoundToolBase.md).[location](Interfaces_Data_LocationBoundToolBase.LocationBoundToolBase.md#location)

#### Defined in

[divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts:4](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts#L4)

## Accessors

### dimension

• `get` **dimension**(): `string`

#### Returns

`string`

#### Inherited from

LocationBoundToolBase.dimension

#### Defined in

[divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts:6](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts#L6)

• `set` **dimension**(`dimension`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dimension` | `string` |

#### Returns

`void`

#### Inherited from

LocationBoundToolBase.dimension

#### Defined in

[divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts:9](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts#L9)

___

### x

• `get` **x**(): `number`

#### Returns

`number`

#### Inherited from

LocationBoundToolBase.x

#### Defined in

[divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts:13](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts#L13)

• `set` **x**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Inherited from

LocationBoundToolBase.x

#### Defined in

[divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts:16](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts#L16)

___

### y

• `get` **y**(): `number`

#### Returns

`number`

#### Inherited from

LocationBoundToolBase.y

#### Defined in

[divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts:20](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts#L20)

• `set` **y**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Inherited from

LocationBoundToolBase.y

#### Defined in

[divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts:23](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts#L23)

___

### z

• `get` **z**(): `number`

#### Returns

`number`

#### Inherited from

LocationBoundToolBase.z

#### Defined in

[divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts:27](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts#L27)

• `set` **z**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Inherited from

LocationBoundToolBase.z

#### Defined in

[divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts:30](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts#L30)

## Methods

### clear

▸ **clear**(): `void`

#### Returns

`void`

#### Defined in

[divinevoxel/core/src/Interfaces/Tools/DataToolBase.ts:9](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Tools/DataToolBase.ts#L9)

___

### commit

▸ **commit**(`...args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any` |

#### Returns

`void`

#### Defined in

[divinevoxel/core/src/Interfaces/Tools/DataToolBase.ts:10](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Tools/DataToolBase.ts#L10)

___

### getId

▸ **getId**(): `any`

#### Returns

`any`

#### Defined in

[divinevoxel/core/src/Interfaces/Tools/DataToolBase.ts:6](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Tools/DataToolBase.ts#L6)

___

### getLocation

▸ **getLocation**(): [`LocationData`](../modules/Math_Spaces_VoxelSpaces_types.md#locationdata)

#### Returns

[`LocationData`](../modules/Math_Spaces_VoxelSpaces_types.md#locationdata)

#### Inherited from

[LocationBoundToolBase](Interfaces_Data_LocationBoundToolBase.LocationBoundToolBase.md).[getLocation](Interfaces_Data_LocationBoundToolBase.LocationBoundToolBase.md#getlocation)

#### Defined in

[divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts:39](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts#L39)

___

### getXYZ

▸ **getXYZ**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

#### Inherited from

[LocationBoundToolBase](Interfaces_Data_LocationBoundToolBase.LocationBoundToolBase.md).[getXYZ](Interfaces_Data_LocationBoundToolBase.LocationBoundToolBase.md#getxyz)

#### Defined in

[divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts:46](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts#L46)

___

### getXYZAsArray

▸ **getXYZAsArray**(): [`Vec3Array`](../modules/Math_Types_Math_types.md#vec3array)

#### Returns

[`Vec3Array`](../modules/Math_Types_Math_types.md#vec3array)

#### Inherited from

[LocationBoundToolBase](Interfaces_Data_LocationBoundToolBase.LocationBoundToolBase.md).[getXYZAsArray](Interfaces_Data_LocationBoundToolBase.LocationBoundToolBase.md#getxyzasarray)

#### Defined in

[divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts:43](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts#L43)

___

### loadIn

▸ **loadIn**(): `boolean`

#### Returns

`boolean`

#### Defined in

[divinevoxel/core/src/Interfaces/Tools/DataToolBase.ts:7](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Tools/DataToolBase.ts#L7)

___

### loadInAt

▸ **loadInAt**(`location`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `location` | [`LocationData`](../modules/Math_Spaces_VoxelSpaces_types.md#locationdata) |

#### Returns

`boolean`

#### Defined in

[divinevoxel/core/src/Interfaces/Tools/DataToolBase.ts:8](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Tools/DataToolBase.ts#L8)

___

### setDimension

▸ **setDimension**(`dimensionId`): [`DataToolBase`](Interfaces_Tools_DataToolBase.DataToolBase.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dimensionId` | `string` |

#### Returns

[`DataToolBase`](Interfaces_Tools_DataToolBase.DataToolBase.md)

#### Inherited from

[LocationBoundToolBase](Interfaces_Data_LocationBoundToolBase.LocationBoundToolBase.md).[setDimension](Interfaces_Data_LocationBoundToolBase.LocationBoundToolBase.md#setdimension)

#### Defined in

[divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts:34](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts#L34)

___

### setId

▸ **setId**(`...args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any` |

#### Returns

`void`

#### Defined in

[divinevoxel/core/src/Interfaces/Tools/DataToolBase.ts:5](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Tools/DataToolBase.ts#L5)

___

### setLocation

▸ **setLocation**(`location`): [`DataToolBase`](Interfaces_Tools_DataToolBase.DataToolBase.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `location` | [`LocationData`](../modules/Math_Spaces_VoxelSpaces_types.md#locationdata) |

#### Returns

[`DataToolBase`](Interfaces_Tools_DataToolBase.DataToolBase.md)

#### Inherited from

[LocationBoundToolBase](Interfaces_Data_LocationBoundToolBase.LocationBoundToolBase.md).[setLocation](Interfaces_Data_LocationBoundToolBase.LocationBoundToolBase.md#setlocation)

#### Defined in

[divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts:65](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts#L65)

___

### setXYZ

▸ **setXYZ**(`x`, `y`, `z`): [`DataToolBase`](Interfaces_Tools_DataToolBase.DataToolBase.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

#### Returns

[`DataToolBase`](Interfaces_Tools_DataToolBase.DataToolBase.md)

#### Inherited from

[LocationBoundToolBase](Interfaces_Data_LocationBoundToolBase.LocationBoundToolBase.md).[setXYZ](Interfaces_Data_LocationBoundToolBase.LocationBoundToolBase.md#setxyz)

#### Defined in

[divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts:53](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts#L53)

___

### setXZ

▸ **setXZ**(`x`, `z`): [`DataToolBase`](Interfaces_Tools_DataToolBase.DataToolBase.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `z` | `number` |

#### Returns

[`DataToolBase`](Interfaces_Tools_DataToolBase.DataToolBase.md)

#### Inherited from

[LocationBoundToolBase](Interfaces_Data_LocationBoundToolBase.LocationBoundToolBase.md).[setXZ](Interfaces_Data_LocationBoundToolBase.LocationBoundToolBase.md#setxz)

#### Defined in

[divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts:60](https://github.com/lucasdamianjohnson/DivineVoxelEngine/blob/596fa7391478620ed460dfb4856ff0a763b91c49/divinevoxel/core/src/Interfaces/Data/LocationBoundToolBase.ts#L60)
