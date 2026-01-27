import { catalog, getOutputSchema } from '../src/lib/catalog';
console.log('Catalog Schema:', Object.keys(catalog.getSchema()));

try {
    const outputSchema = getOutputSchema();
    console.log('Output Schema generated successfully');
    // We don't print it because it's huge and recursive
} catch (e) {
    console.error('Error generating output schema:', e);
}
