import { catalog } from '../src/lib/catalog';
import { generateCatalogPrompt } from '@json-render/core';

console.log('Catalog loaded successfully.');
console.log('Component Names:', catalog.componentNames);
try {
  const prompt = generateCatalogPrompt(catalog);
  console.log('Catalog Prompt Generated Successfully. Length:', prompt.length);
} catch (e) {
  console.error('Error generating prompt:', e);
}
