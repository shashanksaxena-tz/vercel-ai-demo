/**
 * Data Extractor - Extract data structures from UITree
 *
 * This module analyzes UITree structures to identify repeated data patterns,
 * generates TypeScript interfaces for those patterns, and transforms hardcoded
 * data into proper React component props.
 */

import type { UITree, UIElement } from '@json-render/core';

/**
 * Represents a field in a data structure
 */
export interface DataField {
  /** Field name (e.g., "name", "email", "avatar") */
  name: string;
  /** TypeScript type (e.g., "string", "number", "boolean") */
  type: string;
  /** Whether the field is optional */
  optional: boolean;
  /** Sample values found in the tree */
  samples: unknown[];
}

/**
 * Represents an extracted data structure
 */
export interface DataStructure {
  /** Suggested interface name (e.g., "Person", "Product", "Task") */
  name: string;
  /** Fields in this structure */
  fields: DataField[];
  /** Whether this structure appears multiple times (array) */
  isArray: boolean;
  /** Element keys that use this structure */
  elementKeys: string[];
  /** Suggested prop name (e.g., "people", "products", "tasks") */
  propName: string;
}

/**
 * Prop value that can be extracted
 */
interface ExtractableValue {
  elementKey: string;
  propKey: string;
  value: unknown;
  path: string[]; // Path from root to this element
}

/**
 * Content type classification
 */
type ContentType = 'name' | 'email' | 'phone' | 'url' | 'image' | 'date' | 'number' | 'text' | 'boolean';

/**
 * Classify content type based on value
 */
function classifyContent(value: unknown): ContentType {
  if (typeof value === 'boolean') return 'boolean';
  if (typeof value === 'number') return 'number';
  if (typeof value !== 'string') return 'text';

  const str = value.toLowerCase();

  // Email pattern
  if (/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(str)) {
    return 'email';
  }

  // Phone pattern
  if (/^\+?\d{1,4}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(str)) {
    return 'phone';
  }

  // URL pattern (including Lorem Picsum)
  if (/(https?:\/\/|www\.)|picsum\.photos|placeholder|avatar|image/.test(str)) {
    return 'image';
  }

  // Date pattern
  if (/^\d{4}-\d{2}-\d{2}|^\d{1,2}\/\d{1,2}\/\d{2,4}/.test(str)) {
    return 'date';
  }

  // Name-like patterns (capitalized words, common name patterns)
  if (/^[A-Z][a-z]+ [A-Z][a-z]+/.test(value)) {
    return 'name';
  }

  return 'text';
}

/**
 * Get TypeScript type from content type
 */
function getTypeScriptType(contentType: ContentType): string {
  switch (contentType) {
    case 'boolean':
      return 'boolean';
    case 'number':
      return 'number';
    case 'date':
      return 'Date | string';
    default:
      return 'string';
  }
}

/**
 * Generate semantic field name from prop key and content type
 */
function generateFieldName(propKey: string, contentType: ContentType, value: unknown): string {
  // Direct mappings
  const directMappings: Record<string, string> = {
    text: 'text',
    content: 'content',
    label: 'label',
    title: 'title',
    description: 'description',
    message: 'message',
    src: 'image',
    href: 'url',
    value: 'value',
  };

  if (directMappings[propKey]) {
    return directMappings[propKey];
  }

  // Infer from content type
  switch (contentType) {
    case 'name':
      return 'name';
    case 'email':
      return 'email';
    case 'phone':
      return 'phone';
    case 'image':
      return 'avatar';
    case 'url':
      return 'url';
    case 'date':
      return 'date';
    default:
      // Check if value contains role-like text
      if (typeof value === 'string') {
        const lower = value.toLowerCase();
        if (lower.includes(' at ') || lower.includes('ceo') || lower.includes('manager') || lower.includes('developer')) {
          return 'role';
        }
        if (lower.includes('corp') || lower.includes('inc') || lower.includes('llc') || lower.includes('ltd')) {
          return 'company';
        }
      }
      return propKey;
  }
}

/**
 * Extract all meaningful values from the tree
 */
function extractValues(tree: UITree): ExtractableValue[] {
  const values: ExtractableValue[] = [];
  const visited = new Set<string>();

  function traverse(elementKey: string, path: string[] = []) {
    if (visited.has(elementKey)) return;
    visited.add(elementKey);

    const element = tree.elements[elementKey];
    if (!element) return;

    const currentPath = [...path, elementKey];

    // Extract meaningful props
    const meaningfulProps = ['text', 'content', 'label', 'title', 'description', 'message', 'src', 'href', 'value', 'name'];

    for (const propKey of meaningfulProps) {
      const value = element.props[propKey];
      if (value !== undefined && value !== null && value !== '') {
        values.push({
          elementKey,
          propKey,
          value,
          path: currentPath,
        });
      }
    }

    // Traverse children
    if (element.children) {
      for (const childKey of element.children) {
        traverse(childKey, currentPath);
      }
    }
  }

  traverse(tree.root);
  return values;
}

/**
 * Group values by common parent patterns
 */
function groupByPattern(values: ExtractableValue[]): Map<string, ExtractableValue[]> {
  const groups = new Map<string, ExtractableValue[]>();

  // Group by common parent depth pattern
  for (const value of values) {
    // Find repeating parent pattern (e.g., Card containers)
    const depth = value.path.length;
    let groupKey = `depth-${depth}`;

    // Try to find a more specific pattern
    if (depth >= 2) {
      const parentKey = value.path[value.path.length - 2];
      groupKey = `parent-${parentKey}`;
    }

    if (!groups.has(groupKey)) {
      groups.set(groupKey, []);
    }
    groups.get(groupKey)!.push(value);
  }

  return groups;
}

/**
 * Detect repeated structures (cards, list items, etc.)
 */
function detectRepeatedStructures(tree: UITree): Map<string, string[]> {
  const structuresByType = new Map<string, string[]>();

  // Common container types that indicate repeated data
  const containerTypes = ['Card', 'ListItem', 'TableRow', 'AccordionItem'];

  for (const [key, element] of Object.entries(tree.elements)) {
    if (containerTypes.includes(element.type)) {
      if (!structuresByType.has(element.type)) {
        structuresByType.set(element.type, []);
      }
      structuresByType.get(element.type)!.push(key);
    }
  }

  return structuresByType;
}

/**
 * Extract fields from a group of elements
 */
function extractFieldsFromGroup(
  elementKeys: string[],
  tree: UITree,
  values: ExtractableValue[]
): DataField[] {
  const fieldMap = new Map<string, DataField>();

  // For each element in the group, collect all its descendant values
  for (const elementKey of elementKeys) {
    const elementValues = values.filter(v => v.path.includes(elementKey));

    for (const val of elementValues) {
      const contentType = classifyContent(val.value);
      const fieldName = generateFieldName(val.propKey, contentType, val.value);
      const tsType = getTypeScriptType(contentType);

      if (!fieldMap.has(fieldName)) {
        fieldMap.set(fieldName, {
          name: fieldName,
          type: tsType,
          optional: false,
          samples: [],
        });
      }

      const field = fieldMap.get(fieldName)!;
      if (!field.samples.includes(val.value)) {
        field.samples.push(val.value);
      }
    }
  }

  // Mark fields as optional if they don't appear in all elements
  const totalElements = elementKeys.length;
  for (const field of fieldMap.values()) {
    if (field.samples.length < totalElements) {
      field.optional = true;
    }
  }

  return Array.from(fieldMap.values());
}

/**
 * Generate semantic name for a data structure
 */
function generateStructureName(elementType: string, fields: DataField[]): string {
  // Try to infer from field names
  if (fields.some(f => f.name === 'name' && fields.some(g => g.name === 'role' || g.name === 'company'))) {
    return 'Person';
  }

  if (fields.some(f => f.name === 'name' && fields.some(g => g.name === 'price'))) {
    return 'Product';
  }

  if (fields.some(f => f.name === 'title' && fields.some(g => g.name === 'description'))) {
    return 'Task';
  }

  // Default based on element type
  switch (elementType) {
    case 'Card':
      return 'CardData';
    case 'ListItem':
      return 'ListItemData';
    case 'TableRow':
      return 'RowData';
    case 'AccordionItem':
      return 'AccordionData';
    default:
      return 'Data';
  }
}

/**
 * Generate prop name from structure name
 */
function generatePropName(structureName: string, isArray: boolean): string {
  // Convert PascalCase to camelCase and pluralize if array
  const camelCase = structureName.charAt(0).toLowerCase() + structureName.slice(1);

  if (!isArray) {
    return camelCase;
  }

  // Simple pluralization
  if (camelCase.endsWith('Data')) {
    return camelCase;
  }

  if (camelCase.endsWith('s')) {
    return camelCase;
  }

  if (camelCase.endsWith('y')) {
    return camelCase.slice(0, -1) + 'ies';
  }

  return camelCase + 's';
}

/**
 * Main function to extract data structures from UITree
 *
 * @param tree - The UITree to analyze
 * @returns Array of extracted data structures
 *
 * @example
 * const structures = extractDataStructures(tree);
 * // Returns: [
 * //   {
 * //     name: 'Person',
 * //     fields: [
 * //       { name: 'name', type: 'string', optional: false, samples: ['Alice Johnson'] },
 * //       { name: 'role', type: 'string', optional: false, samples: ['Head of Sales'] },
 * //     ],
 * //     isArray: true,
 * //     elementKeys: ['card-1', 'card-2'],
 * //     propName: 'people'
 * //   }
 * // ]
 */
export function extractDataStructures(tree: UITree): DataStructure[] {
  const structures: DataStructure[] = [];

  // Step 1: Extract all values from the tree
  const values = extractValues(tree);

  if (values.length === 0) {
    return structures; // No extractable data
  }

  // Step 2: Detect repeated structures
  const repeatedStructures = detectRepeatedStructures(tree);

  // Step 3: For each repeated structure type, create a data structure
  for (const [elementType, elementKeys] of repeatedStructures.entries()) {
    if (elementKeys.length < 2) {
      continue; // Only extract if there are at least 2 instances
    }

    const fields = extractFieldsFromGroup(elementKeys, tree, values);

    if (fields.length === 0) {
      continue; // No fields to extract
    }

    // Add unique ID field
    fields.unshift({
      name: 'id',
      type: 'string',
      optional: false,
      samples: ['1', '2', '3'],
    });

    const structureName = generateStructureName(elementType, fields);
    const propName = generatePropName(structureName, true);

    structures.push({
      name: structureName,
      fields,
      isArray: true,
      elementKeys,
      propName,
    });
  }

  return structures;
}

/**
 * Generate TypeScript interface code from data structure
 *
 * @param structure - The data structure
 * @returns TypeScript interface code
 *
 * @example
 * const code = generateInterface({
 *   name: 'Person',
 *   fields: [
 *     { name: 'id', type: 'string', optional: false },
 *     { name: 'name', type: 'string', optional: false },
 *   ],
 * });
 * // Returns:
 * // interface Person {
 * //   id: string;
 * //   name: string;
 * // }
 */
export function generateInterface(structure: DataStructure): string {
  const lines: string[] = [];

  lines.push(`interface ${structure.name} {`);

  for (const field of structure.fields) {
    const optional = field.optional ? '?' : '';
    lines.push(`  ${field.name}${optional}: ${field.type};`);
  }

  lines.push('}');

  return lines.join('\n');
}

/**
 * Generate sample data for a structure
 *
 * @param structure - The data structure
 * @returns Sample data as TypeScript code
 */
export function generateSampleData(structure: DataStructure): string {
  const lines: string[] = [];

  lines.push(`const mock${structure.name}: ${structure.name}[] = [`);

  // Generate 2-3 sample items
  const sampleCount = Math.min(3, structure.elementKeys.length);

  for (let i = 0; i < sampleCount; i++) {
    lines.push('  {');

    for (const field of structure.fields) {
      const sample = field.samples[i % field.samples.length];
      let value: string;

      if (field.type === 'string') {
        value = `'${sample}'`;
      } else if (field.type === 'number') {
        value = String(sample);
      } else if (field.type === 'boolean') {
        value = String(sample);
      } else {
        value = `'${sample}'`;
      }

      const comma = i < sampleCount - 1 || field !== structure.fields[structure.fields.length - 1] ? ',' : '';
      lines.push(`    ${field.name}: ${value}${comma}`);
    }

    const comma = i < sampleCount - 1 ? ',' : '';
    lines.push(`  }${comma}`);
  }

  lines.push('];');

  return lines.join('\n');
}

/**
 * Check if tree has extractable data
 */
export function hasExtractableData(tree: UITree): boolean {
  const structures = extractDataStructures(tree);
  return structures.length > 0;
}

/**
 * Get summary of extractable data
 */
export function getDataSummary(tree: UITree): string {
  const structures = extractDataStructures(tree);

  if (structures.length === 0) {
    return 'No extractable data patterns found.';
  }

  const summaries = structures.map(s => {
    const fieldCount = s.fields.length;
    const instanceCount = s.elementKeys.length;
    return `- ${s.name}: ${fieldCount} fields, ${instanceCount} instances`;
  });

  return `Found ${structures.length} data structure(s):\n${summaries.join('\n')}`;
}
