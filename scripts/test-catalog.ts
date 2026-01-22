import { catalog } from '../src/lib/catalog';
import { z } from 'zod';

console.log('Catalog Keys:', Object.keys(catalog));

Object.keys(catalog).forEach((key) => {
  const comp = catalog[key as keyof typeof catalog];
  if (comp && comp.props instanceof z.ZodType) {
    console.log(`✅ ${key} schema is valid`);
  } else {
    console.error(`❌ ${key} schema is INVALID or missing props`);
  }
});

console.log('Catalog verification complete.');
