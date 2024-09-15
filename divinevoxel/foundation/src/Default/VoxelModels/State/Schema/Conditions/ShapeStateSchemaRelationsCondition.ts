import { ShapeStateSchema } from "../ShapeStateSchema";

export abstract class ShapeStateSchemaRelationsCondition {

    constructor(public schema: ShapeStateSchema) {}

  abstract evulate(): boolean;
}
