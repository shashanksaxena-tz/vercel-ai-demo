import { catalog } from '../src/lib/catalog';

console.log('--------------------------------------------------');
console.log('Testing Catalog Definition');
console.log('--------------------------------------------------');

try {
  const components = Object.keys(catalog);
  console.log(`Found ${components.length} components:`);

  components.forEach(key => {
    // @ts-expect-error - iterating keys
    const comp = catalog[key];
    console.log(`- ${key}: ${comp.props ? 'Has props schema' : 'No props schema'}`);
  });

  console.log('--------------------------------------------------');
  console.log('✅ Catalog validation successful.');
} catch (error) {
  console.error('❌ Catalog validation failed:', error);
  process.exit(1);
}
