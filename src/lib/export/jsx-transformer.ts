/**
 * JSX Transformer - Transform hardcoded data to prop-based JSX
 *
 * This module transforms UITree elements with hardcoded data into
 * JSX that uses props and .map() for repeated structures.
 */

import type { UITree, UIElement } from '@json-render/core';
import type { UIFramework } from '@/types';
import type { DataStructure } from './data-extractor';

/**
 * Transform result
 */
export interface TransformResult {
  /** Transformed JSX code */
  jsx: string;
  /** Component props interface code */
  propsInterface: string;
  /** Data interfaces code */
  dataInterfaces: string;
}

/**
 * Mapping of element keys to data structure and item variable
 */
interface ElementMapping {
  elementKey: string;
  structure: DataStructure;
  itemVar: string;
  indexVar: string;
}

/**
 * Get component name for framework
 */
function getComponentName(type: string, framework: UIFramework): string {
  const COMPONENT_MAPPINGS: Record<UIFramework, Record<string, string>> = {
    shadcn: {
      Avatar: 'Avatar',
      Heading: 'Heading',
      Text: 'Text',
      Card: 'Card',
      CardHeader: 'CardHeader',
      CardBody: 'CardContent',
      Button: 'Button',
    },
    tailwind: {
      Avatar: 'img',
      Heading: 'h1',
      Text: 'p',
      Card: 'div',
      CardHeader: 'div',
      CardBody: 'div',
      Button: 'button',
    },
    mui: {},
    chakra: {},
    flowbite: {},
    antd: {},
    'magic-ui': {},
    aceternity: {},
  };

  return COMPONENT_MAPPINGS[framework]?.[type] || type;
}

/**
 * Get field name from element props
 */
function getFieldNameFromProps(element: UIElement, structure: DataStructure): string | null {
  // Map prop keys to field names
  const propMappings: Record<string, string[]> = {
    text: ['name', 'title', 'text', 'label'],
    content: ['description', 'content', 'text', 'role'],
    label: ['label', 'text', 'name'],
    src: ['avatar', 'image', 'photo'],
    title: ['title', 'name'],
    message: ['message', 'text'],
  };

  for (const [propKey, possibleFields] of Object.entries(propMappings)) {
    if (element.props[propKey] !== undefined) {
      // Find matching field in structure
      for (const fieldName of possibleFields) {
        if (structure.fields.some(f => f.name === fieldName)) {
          return fieldName;
        }
      }
    }
  }

  return null;
}

/**
 * Generate prop access code
 */
function generatePropAccess(itemVar: string, fieldName: string): string {
  return `{${itemVar}.${fieldName}}`;
}

/**
 * Transform element props to use data from item variable
 */
function transformProps(
  element: UIElement,
  itemVar: string | null,
  structure: DataStructure | null,
  framework: UIFramework
): Record<string, unknown> {
  const transformed: Record<string, unknown> = { ...element.props };

  if (!itemVar || !structure) {
    return transformed;
  }

  // Map each prop to a field
  const propToField: Record<string, string> = {
    text: 'name',
    content: 'description',
    label: 'label',
    src: 'avatar',
    title: 'title',
  };

  for (const [propKey, fieldName] of Object.entries(propToField)) {
    if (transformed[propKey] && structure.fields.some(f => f.name === fieldName)) {
      transformed[propKey] = `__PROP_${itemVar}.${fieldName}__`;
    }
  }

  // Special handling for role + company
  if (transformed['content'] && typeof transformed['content'] === 'string') {
    const content = transformed['content'] as string;
    if (content.includes(' at ')) {
      // Check if we have role and company fields
      if (structure.fields.some(f => f.name === 'role') && structure.fields.some(f => f.name === 'company')) {
        transformed['content'] = `__PROP_${itemVar}.role__ at __PROP_${itemVar}.company__`;
      }
    }
  }

  return transformed;
}

/**
 * Format props for JSX
 */
function formatProps(props: Record<string, unknown>, framework: UIFramework): string {
  const propStrings: string[] = [];
  const skipProps = new Set(['children', 'key', 'text', 'content', 'label']);

  for (const [key, value] of Object.entries(props)) {
    if (skipProps.has(key)) continue;
    if (value === undefined || value === null) continue;

    if (typeof value === 'boolean') {
      if (value) {
        propStrings.push(key);
      }
    } else if (typeof value === 'string') {
      // Check for prop placeholder
      if (value.startsWith('__PROP_')) {
        const propCode = value.replace(/__PROP_/g, '').replace(/__/g, '');
        propStrings.push(`${key}={${propCode}}`);
      } else {
        propStrings.push(`${key}="${value}"`);
      }
    } else if (typeof value === 'number') {
      propStrings.push(`${key}={${value}}`);
    } else {
      propStrings.push(`${key}={${JSON.stringify(value)}}`);
    }
  }

  return propStrings.length > 0 ? ' ' + propStrings.join(' ') : '';
}

/**
 * Get text content from element
 */
function getTextContent(element: UIElement, itemVar: string | null, structure: DataStructure | null): string | null {
  if (!itemVar || !structure) {
    // Return original hardcoded text
    if (element.props.text) return String(element.props.text);
    if (element.props.content) return String(element.props.content);
    if (element.props.label) return String(element.props.label);
    return null;
  }

  // Transform to use props
  if (element.props.text) {
    const fieldName = getFieldNameFromProps(element, structure);
    if (fieldName) {
      return generatePropAccess(itemVar, fieldName);
    }
  }

  if (element.props.content) {
    const content = element.props.content as string;
    // Check for "X at Y" pattern
    if (content.includes(' at ') && structure.fields.some(f => f.name === 'role')) {
      return `{${itemVar}.role} at {${itemVar}.company}`;
    }

    const fieldName = getFieldNameFromProps(element, structure);
    if (fieldName) {
      return generatePropAccess(itemVar, fieldName);
    }
  }

  return null;
}

/**
 * Generate JSX for an element
 */
function elementToJSX(
  elementKey: string,
  tree: UITree,
  framework: UIFramework,
  mappings: Map<string, ElementMapping>,
  indent: number = 2
): string {
  const element = tree.elements[elementKey];
  if (!element) return '';

  const mapping = mappings.get(elementKey);
  const itemVar = mapping?.itemVar || null;
  const structure = mapping?.structure || null;

  const componentName = getComponentName(element.type, framework);
  const indentStr = '  '.repeat(indent);

  // Transform props
  const transformedProps = transformProps(element, itemVar, structure, framework);
  const propsStr = formatProps(transformedProps, framework);

  // Get text content
  const textContent = getTextContent(element, itemVar, structure);

  // Check if this element should be wrapped in .map()
  const isMapRoot = Array.from(mappings.values()).some(m => m.elementKey === elementKey);

  if (isMapRoot && mapping) {
    // This is the root of a mapped structure
    const { structure, itemVar, indexVar } = mapping;

    // Generate the mapped JSX
    const childJSX = generateMappedChildren(elementKey, tree, framework, mappings, indent + 1, itemVar, structure);

    return `${indentStr}{${structure.propName}.map((${itemVar}, ${indexVar}) => (
${indentStr}  <${componentName}${propsStr} key={${itemVar}.id}>
${childJSX}
${indentStr}  </${componentName}>
${indentStr}))}`;
  }

  // Regular element (not mapped)
  if ((!element.children || element.children.length === 0) && !textContent) {
    return `${indentStr}<${componentName}${propsStr} />`;
  }

  if ((!element.children || element.children.length === 0) && textContent) {
    return `${indentStr}<${componentName}${propsStr}>${textContent}</${componentName}>`;
  }

  // Has children
  const childrenJSX = element.children
    ?.map((childKey) => elementToJSX(childKey, tree, framework, mappings, indent + 1))
    .filter(Boolean)
    .join('\n');

  const lines = [
    `${indentStr}<${componentName}${propsStr}>`,
    textContent ? `${'  '.repeat(indent + 1)}${textContent}` : '',
    childrenJSX,
    `${indentStr}</${componentName}>`,
  ].filter(Boolean);

  return lines.join('\n');
}

/**
 * Generate JSX for children inside a mapped element
 */
function generateMappedChildren(
  parentKey: string,
  tree: UITree,
  framework: UIFramework,
  mappings: Map<string, ElementMapping>,
  indent: number,
  itemVar: string,
  structure: DataStructure
): string {
  const parent = tree.elements[parentKey];
  if (!parent || !parent.children) return '';

  // Create mappings for all descendants
  const descendantMappings = new Map<string, ElementMapping>();

  function addDescendantMappings(key: string) {
    const element = tree.elements[key];
    if (!element) return;

    descendantMappings.set(key, {
      elementKey: key,
      structure,
      itemVar,
      indexVar: 'index',
    });

    if (element.children) {
      for (const childKey of element.children) {
        addDescendantMappings(childKey);
      }
    }
  }

  for (const childKey of parent.children) {
    addDescendantMappings(childKey);
  }

  // Generate JSX for each child
  return parent.children
    .map((childKey) => elementToJSX(childKey, tree, framework, descendantMappings, indent))
    .filter(Boolean)
    .join('\n');
}

/**
 * Transform UITree to prop-based JSX
 *
 * @param tree - The UITree to transform
 * @param structures - Extracted data structures
 * @param framework - UI framework being used
 * @returns Transformed JSX and interface code
 */
export function transformToPropsBasedJSX(
  tree: UITree,
  structures: DataStructure[],
  framework: UIFramework,
  componentName: string = 'GeneratedComponent'
): TransformResult {
  // Build element mappings
  const mappings = new Map<string, ElementMapping>();

  for (const structure of structures) {
    for (let i = 0; i < structure.elementKeys.length; i++) {
      const elementKey = structure.elementKeys[i];
      mappings.set(elementKey, {
        elementKey,
        structure,
        itemVar: structure.propName.slice(0, -1), // Remove 's' for singular
        indexVar: 'index',
      });
    }
  }

  // Generate JSX
  const jsx = elementToJSX(tree.root, tree, framework, mappings, 1);

  // Generate props interface
  const propsLines: string[] = [];
  propsLines.push(`interface ${componentName}Props {`);
  propsLines.push('  className?: string;');

  for (const structure of structures) {
    propsLines.push(`  ${structure.propName}: ${structure.name}[];`);
  }

  propsLines.push('}');

  // Generate data interfaces
  const dataLines: string[] = [];

  for (const structure of structures) {
    dataLines.push(`interface ${structure.name} {`);

    for (const field of structure.fields) {
      const optional = field.optional ? '?' : '';
      dataLines.push(`  ${field.name}${optional}: ${field.type};`);
    }

    dataLines.push('}');
    dataLines.push('');
  }

  return {
    jsx,
    propsInterface: propsLines.join('\n'),
    dataInterfaces: dataLines.join('\n').trim(),
  };
}
