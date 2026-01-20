import { catalog } from '../src/lib/catalog';

try {
  console.log("Catalog loaded successfully.");
  console.log("Components:", JSON.stringify(catalog.componentNames, null, 2));
  // console.log("Schema:", JSON.stringify(catalog.elementSchema, null, 2)); // This might be circular or huge
} catch (e) {
  console.error("Error loading catalog:", e);
  process.exit(1);
}
