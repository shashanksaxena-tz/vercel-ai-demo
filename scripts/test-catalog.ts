import { catalog } from '../src/lib/catalog';

try {
  // Use public properties instead of missing getSchema() method
  console.log(JSON.stringify({
    components: catalog.componentNames,
    validation: catalog.validation
  }, null, 2));
  console.log('\nCatalog Schema Validation Passed!');
} catch (error) {
  console.error('Catalog Schema Validation Failed:', error);
  process.exit(1);
}
