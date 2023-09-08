import { MetadataStorage } from "./metadata-storage";

declare global {
  // eslint-disable-next-line vars-on-top, no-var
  var TypeGraphQLMetadataStorage: MetadataStorage;
}

const cachedStorage = new MetadataStorage();

export function getMetadataStorage(): MetadataStorage {
  if (typeof global !== "undefined") {
    if (!global.TypeGraphQLMetadataStorage) {
      global.TypeGraphQLMetadataStorage = new MetadataStorage();
    }

    return global.TypeGraphQLMetadataStorage;
  }

  return cachedStorage;
}
