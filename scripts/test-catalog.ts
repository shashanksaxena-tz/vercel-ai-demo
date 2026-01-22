import { catalog } from '../src/lib/catalog';
import { generateCatalogPrompt } from '@json-render/core';

try {
  console.log("Catalog Components:", catalog.componentNames);
  console.log("Prompt preview:");
  console.log(generateCatalogPrompt(catalog));
} catch (e) {
  console.error("Error verifying catalog:", e);
}
