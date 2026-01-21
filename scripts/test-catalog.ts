import { catalog } from '../src/lib/catalog';

try {
  console.log('Successfully loaded catalog.');
  console.log('Component Count:', catalog.componentNames.length);
  console.log('Components:', catalog.componentNames);

  // Verify a few keys
  if (!catalog.hasComponent('button')) {
    throw new Error('Missing button component');
  }

  console.log('Catalog validation passed.');
} catch (error) {
  console.error('Error validating catalog:', error);
  process.exit(1);
}
