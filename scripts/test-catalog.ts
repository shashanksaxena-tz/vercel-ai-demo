import { catalog } from '../src/lib/catalog';
import { generateCatalogPrompt } from '@json-render/core';

console.log("Components found:", Object.keys(catalog.components).length);
console.log(Object.keys(catalog.components).join(", "));
try {
  const prompt = generateCatalogPrompt(catalog);
  console.log("\nPrompt Preview successfully generated (length: " + prompt.length + ")");
  // console.log(prompt);
} catch (e) {
  console.error("Failed to generate prompt:", e);
}
