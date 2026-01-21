import { catalog } from '../src/lib/catalog';
import { generateCatalogPrompt } from '@json-render/core';

console.log('Catalog Validation Script');
console.log('-------------------------');
console.log('Components defined:', catalog.componentNames.length);
console.log('Component list:', catalog.componentNames.join(', '));
console.log('\nGenerating Catalog Prompt for AI...');
try {
  const prompt = generateCatalogPrompt(catalog);
  console.log('Prompt generated successfully (length: ' + prompt.length + ')');
  // console.log(prompt); // Uncomment to see full prompt
} catch (e) {
  console.error('Error generating prompt:', e);
  process.exit(1);
}
console.log('\nValidation Passed!');
