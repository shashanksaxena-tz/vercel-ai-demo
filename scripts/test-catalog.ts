import { catalog } from '../src/lib/catalog';

console.log("Catalog initialized successfully.");
console.log("Components:", catalog.componentNames.join(", "));

const sample = {
  type: 'Button',
  props: { label: 'Click me' }
};

const result = catalog.validateElement(sample);
console.log("Validation result for sample Button:", result.success);

if (!result.success) {
    console.error(result.error);
}
