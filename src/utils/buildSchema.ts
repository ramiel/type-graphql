import { type GraphQLSchema } from "graphql";
import { SchemaGenerator, type SchemaGeneratorOptions } from "@/schema/schema-generator";
import { type NonEmptyArray } from "@/typings";

function loadResolvers(options: BuildSchemaOptions): Function[] {
  // Additional runtime check as it should be covered by the `NonEmptyArray` type guard
  if (options.resolvers.length === 0) {
    throw new Error("Empty `resolvers` array property found in `buildSchema` options!");
  }

  return options.resolvers as Function[];
}

export type BuildSchemaOptions = {
  /** Array of resolvers classes to resolver files */
  resolvers: NonEmptyArray<Function>;
} & Omit<SchemaGeneratorOptions, "resolvers">;

export async function buildSchema(options: BuildSchemaOptions): Promise<GraphQLSchema> {
  const resolvers = loadResolvers(options);
  const schema = SchemaGenerator.generateFromMetadata({ ...options, resolvers });
  return schema;
}

export function buildSchemaSync(options: BuildSchemaOptions): GraphQLSchema {
  const resolvers = loadResolvers(options);
  const schema = SchemaGenerator.generateFromMetadata({ ...options, resolvers });

  return schema;
}
