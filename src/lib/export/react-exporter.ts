/**
 * React Code Export Utility
 * Converts UITree to working React component code
 */

import type { UITree, UIElement } from '@json-render/core';

export type ExportFramework = 'shadcn' | 'mui' | 'chakra' | 'tailwind';

export interface ExportOptions {
  framework?: ExportFramework;
  componentName?: string;
  includeTypes?: boolean;
}

/**
 * Import path mappings for each framework
 */
const IMPORT_PATHS: Record<ExportFramework, string> = {
  shadcn: '@/components/ui',
  mui: '@mui/material',
  chakra: '@chakra-ui/react',
  tailwind: '', // Tailwind uses inline styles, no component imports
};

/**
 * Component name mappings for different frameworks
 * Maps our base component names to framework-specific equivalents
 */
const COMPONENT_MAPPINGS: Record<ExportFramework, Record<string, string>> = {
  shadcn: {
    // Most shadcn components match our naming
    Container: 'Container',
    Row: 'Row',
    Column: 'Column',
    Grid: 'Grid',
    Stack: 'Stack',
    Card: 'Card',
    CardHeader: 'CardHeader',
    CardBody: 'CardContent',
    CardFooter: 'CardFooter',
    Button: 'Button',
    Input: 'Input',
    TextArea: 'Textarea',
    Select: 'Select',
    Checkbox: 'Checkbox',
    Switch: 'Switch',
    Badge: 'Badge',
    Avatar: 'Avatar',
    Alert: 'Alert',
    Progress: 'Progress',
    Tabs: 'Tabs',
    TabList: 'TabsList',
    Tab: 'TabsTrigger',
    TabPanel: 'TabsContent',
    Accordion: 'Accordion',
    AccordionItem: 'AccordionItem',
    Tooltip: 'Tooltip',
    Heading: 'Heading',
    Text: 'Text',
    Link: 'Link',
    Image: 'Image',
    Divider: 'Separator',
    Metric: 'Metric',
    Table: 'Table',
    TableHeader: 'TableHeader',
    TableBody: 'TableBody',
    TableRow: 'TableRow',
    TableCell: 'TableCell',
  },
  mui: {
    Container: 'Container',
    Row: 'Stack',
    Column: 'Stack',
    Grid: 'Grid',
    Stack: 'Stack',
    Card: 'Card',
    CardHeader: 'CardHeader',
    CardBody: 'CardContent',
    CardFooter: 'CardActions',
    Button: 'Button',
    Input: 'TextField',
    TextArea: 'TextField',
    Select: 'Select',
    Checkbox: 'Checkbox',
    Switch: 'Switch',
    Badge: 'Chip',
    Avatar: 'Avatar',
    Alert: 'Alert',
    Progress: 'LinearProgress',
    Tabs: 'Tabs',
    Tab: 'Tab',
    Accordion: 'Accordion',
    AccordionItem: 'AccordionDetails',
    Tooltip: 'Tooltip',
    Heading: 'Typography',
    Text: 'Typography',
    Link: 'Link',
    Image: 'Box',
    Divider: 'Divider',
    Table: 'Table',
    TableHeader: 'TableHead',
    TableBody: 'TableBody',
    TableRow: 'TableRow',
    TableCell: 'TableCell',
  },
  chakra: {
    Container: 'Container',
    Row: 'HStack',
    Column: 'VStack',
    Grid: 'Grid',
    Stack: 'Stack',
    Card: 'Card',
    CardHeader: 'CardHeader',
    CardBody: 'CardBody',
    CardFooter: 'CardFooter',
    Button: 'Button',
    Input: 'Input',
    TextArea: 'Textarea',
    Select: 'Select',
    Checkbox: 'Checkbox',
    Switch: 'Switch',
    Badge: 'Badge',
    Avatar: 'Avatar',
    Alert: 'Alert',
    Progress: 'Progress',
    Tabs: 'Tabs',
    TabList: 'TabList',
    Tab: 'Tab',
    TabPanel: 'TabPanel',
    Accordion: 'Accordion',
    AccordionItem: 'AccordionItem',
    Tooltip: 'Tooltip',
    Heading: 'Heading',
    Text: 'Text',
    Link: 'Link',
    Image: 'Image',
    Divider: 'Divider',
    Table: 'Table',
    TableHeader: 'Thead',
    TableBody: 'Tbody',
    TableRow: 'Tr',
    TableCell: 'Td',
  },
  tailwind: {
    // Tailwind maps to HTML elements with classes
    Container: 'div',
    Row: 'div',
    Column: 'div',
    Grid: 'div',
    Stack: 'div',
    Card: 'div',
    CardHeader: 'div',
    CardBody: 'div',
    CardFooter: 'div',
    Button: 'button',
    Input: 'input',
    TextArea: 'textarea',
    Select: 'select',
    Checkbox: 'input',
    Switch: 'input',
    Badge: 'span',
    Avatar: 'img',
    Alert: 'div',
    Progress: 'div',
    Tabs: 'div',
    TabList: 'div',
    Tab: 'button',
    TabPanel: 'div',
    Accordion: 'div',
    AccordionItem: 'div',
    Tooltip: 'div',
    Heading: 'h1',
    Text: 'p',
    Link: 'a',
    Image: 'img',
    Divider: 'hr',
    Table: 'table',
    TableHeader: 'thead',
    TableBody: 'tbody',
    TableRow: 'tr',
    TableCell: 'td',
  },
};

/**
 * Tailwind CSS class mappings for common props
 */
const TAILWIND_CLASSES: Record<string, Record<string, string>> = {
  maxWidth: {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-full',
  },
  gap: {
    xs: 'gap-1',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
  },
  spacing: {
    xs: 'space-y-1',
    sm: 'space-y-2',
    md: 'space-y-4',
    lg: 'space-y-6',
    xl: 'space-y-8',
  },
  padding: {
    none: 'p-0',
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
  },
  align: {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
    baseline: 'items-baseline',
  },
  justify: {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  },
  direction: {
    horizontal: 'flex-row',
    vertical: 'flex-col',
  },
  variant: {
    solid: 'bg-primary text-primary-foreground',
    outline: 'border border-input bg-background',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    soft: 'bg-secondary text-secondary-foreground',
    elevated: 'shadow-lg',
    outlined: 'border border-border',
    filled: 'bg-muted',
  },
  size: {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  },
  color: {
    default: '',
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    error: 'text-red-600',
    info: 'text-blue-600',
    muted: 'text-muted-foreground',
  },
};

/**
 * Format a prop value for JSX output
 */
function formatPropValue(value: unknown): string {
  if (typeof value === 'string') {
    return `"${value}"`;
  }
  if (typeof value === 'boolean') {
    return value ? '' : ''; // Will be handled separately
  }
  if (typeof value === 'number') {
    return `{${value}}`;
  }
  if (Array.isArray(value) || typeof value === 'object') {
    return `{${JSON.stringify(value)}}`;
  }
  return `"${String(value)}"`;
}

/**
 * Format props as JSX attributes
 */
function formatProps(
  props: Record<string, unknown>,
  framework: ExportFramework,
  componentType: string
): string {
  const propStrings: string[] = [];

  // For Tailwind, generate className from props
  if (framework === 'tailwind') {
    const classes = generateTailwindClasses(props, componentType);
    if (classes) {
      propStrings.push(`className="${classes}"`);
    }
  }

  for (const [key, value] of Object.entries(props)) {
    // Skip internal props or props handled by Tailwind classes
    if (key === 'children' || key === 'key') continue;

    // Skip internal metadata props
    if (key === 'type' || key === 'value') continue;

    // For Tailwind, skip props that are converted to classes
    if (framework === 'tailwind' && TAILWIND_CLASSES[key]) continue;

    if (typeof value === 'boolean') {
      if (value) {
        propStrings.push(key);
      }
      // Omit false boolean props
    } else if (value !== undefined && value !== null) {
      const formattedValue = formatPropValue(value);
      propStrings.push(`${key}=${formattedValue}`);
    }
  }

  return propStrings.length > 0 ? ' ' + propStrings.join(' ') : '';
}

/**
 * Generate Tailwind CSS classes from props
 */
function generateTailwindClasses(
  props: Record<string, unknown>,
  componentType: string
): string {
  const classes: string[] = [];

  // Base classes by component type
  switch (componentType) {
    case 'Container':
      classes.push('mx-auto px-4');
      break;
    case 'Row':
      classes.push('flex');
      break;
    case 'Column':
      classes.push('flex flex-col');
      break;
    case 'Grid':
      classes.push('grid');
      if (props.columns) {
        classes.push(`grid-cols-${props.columns}`);
      }
      break;
    case 'Stack':
      classes.push('flex');
      if (props.direction === 'horizontal') {
        classes.push('flex-row');
      } else {
        classes.push('flex-col');
      }
      break;
    case 'Card':
      classes.push('rounded-lg border bg-card text-card-foreground shadow-sm');
      break;
    case 'Button':
      classes.push(
        'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors'
      );
      break;
    case 'Input':
      classes.push(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
      );
      break;
    case 'Badge':
      classes.push(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold'
      );
      break;
    case 'Alert':
      classes.push('relative w-full rounded-lg border p-4');
      break;
    case 'Heading':
      const level = props.level || '1';
      const headingSizes: Record<string, string> = {
        '1': 'text-4xl font-bold',
        '2': 'text-3xl font-semibold',
        '3': 'text-2xl font-semibold',
        '4': 'text-xl font-semibold',
        '5': 'text-lg font-medium',
        '6': 'text-base font-medium',
      };
      classes.push(headingSizes[String(level)] || headingSizes['1']);
      break;
    case 'Text':
      classes.push('text-base');
      break;
    case 'Link':
      classes.push('text-primary underline-offset-4 hover:underline');
      break;
    case 'Divider':
      classes.push('shrink-0 bg-border h-[1px] w-full');
      break;
  }

  // Add classes from props
  for (const [key, value] of Object.entries(props)) {
    const classMap = TAILWIND_CLASSES[key];
    if (classMap && typeof value === 'string' && classMap[value]) {
      classes.push(classMap[value]);
    }
  }

  // Handle centered prop
  if (props.centered) {
    classes.push('mx-auto');
  }

  // Handle fullWidth prop
  if (props.fullWidth) {
    classes.push('w-full');
  }

  return classes.filter(Boolean).join(' ');
}

/**
 * Strip namespace prefix from component type (e.g., "core::Avatar" -> "Avatar")
 */
function stripNamespace(type: string): string {
  if (type.includes('::')) {
    const parts = type.split('::');
    return parts[parts.length - 1]; // Return the last part after ::
  }
  return type;
}

/**
 * Get the component name for a specific framework
 */
function getComponentName(type: string, framework: ExportFramework): string {
  // Strip namespace prefix first (e.g., "core::Avatar" -> "Avatar")
  const baseType = stripNamespace(type);
  const mapping = COMPONENT_MAPPINGS[framework];
  return mapping[baseType] || baseType;
}

/**
 * Collect unique component types used in the tree
 */
function collectComponentTypes(
  tree: UITree,
  framework: ExportFramework
): Set<string> {
  const types = new Set<string>();

  function traverse(elementKey: string) {
    const element = tree.elements[elementKey];
    if (!element) return;

    const componentName = getComponentName(element.type, framework);
    if (componentName && framework !== 'tailwind') {
      types.add(componentName);
    }

    if (element.children) {
      for (const childKey of element.children) {
        traverse(childKey);
      }
    }
  }

  traverse(tree.root);
  return types;
}

/**
 * Generate import statements
 */
function generateImports(
  componentTypes: Set<string>,
  framework: ExportFramework
): string {
  if (framework === 'tailwind' || componentTypes.size === 0) {
    return "import React from 'react';\n";
  }

  const importPath = IMPORT_PATHS[framework];
  const sortedTypes = Array.from(componentTypes).sort();

  let imports = "import React from 'react';\n";
  imports += `import { ${sortedTypes.join(', ')} } from '${importPath}';\n`;

  return imports;
}

/**
 * Convert an element to JSX code
 */
function elementToJSX(
  elementKey: string,
  tree: UITree,
  framework: ExportFramework,
  indent: number = 2
): string {
  const element = tree.elements[elementKey];
  if (!element) return '';

  const componentName = getComponentName(element.type, framework);
  const baseType = stripNamespace(element.type);
  const indentStr = '  '.repeat(indent);

  // Handle special Tailwind heading elements
  let actualComponentName = componentName;
  if (framework === 'tailwind' && baseType === 'Heading') {
    const level = element.props.level || '1';
    actualComponentName = `h${level}`;
  }

  const propsStr = formatProps(element.props, framework, baseType);

  // Handle text content for certain components
  let textContent = '';
  if (baseType === 'Heading' && element.props.text) {
    textContent = String(element.props.text);
  } else if (baseType === 'Text' && element.props.content) {
    textContent = String(element.props.content);
  } else if (baseType === 'Button' && element.props.label) {
    textContent = String(element.props.label);
  } else if (baseType === 'Link' && element.props.text) {
    textContent = String(element.props.text);
  } else if (baseType === 'Badge' && element.props.text) {
    textContent = String(element.props.text);
  }

  // No children and no text content - self-closing tag
  if ((!element.children || element.children.length === 0) && !textContent) {
    return `${indentStr}<${actualComponentName}${propsStr} />`;
  }

  // Text content only
  if ((!element.children || element.children.length === 0) && textContent) {
    return `${indentStr}<${actualComponentName}${propsStr}>${textContent}</${actualComponentName}>`;
  }

  // Has children
  const childrenJSX = element.children
    ?.map((childKey) => elementToJSX(childKey, tree, framework, indent + 1))
    .filter(Boolean)
    .join('\n');

  const lines = [
    `${indentStr}<${actualComponentName}${propsStr}>`,
    textContent ? `${'  '.repeat(indent + 1)}${textContent}` : '',
    childrenJSX,
    `${indentStr}</${actualComponentName}>`,
  ].filter(Boolean);

  return lines.join('\n');
}

/**
 * Export UITree to React component code
 */
export function exportToReact(tree: UITree, options?: ExportOptions): string {
  const framework = options?.framework || 'shadcn';
  const componentName = options?.componentName || 'GeneratedUI';
  const includeTypes = options?.includeTypes !== false;

  // Collect component types for imports
  const componentTypes = collectComponentTypes(tree, framework);

  // Generate imports
  const imports = generateImports(componentTypes, framework);

  // Generate component body
  const jsxContent = elementToJSX(tree.root, tree, framework, 2);

  // Build the component
  const typeAnnotation = includeTypes ? ': React.FC' : '';

  const code = `${imports}
export default function ${componentName}()${typeAnnotation} {
  return (
${jsxContent}
  );
}
`;

  return code;
}

/**
 * Export UITree as JSON string
 */
export function exportToJSON(tree: UITree): string {
  return JSON.stringify(tree, null, 2);
}

/**
 * Export UITree as HTML (for Tailwind/static use)
 */
export function exportToHTML(tree: UITree): string {
  function elementToHTML(elementKey: string, indent: number = 0): string {
    const element = tree.elements[elementKey];
    if (!element) return '';

    const baseType = stripNamespace(element.type);
    const indentStr = '  '.repeat(indent);
    const tagName = COMPONENT_MAPPINGS.tailwind[baseType] || 'div';
    const classes = generateTailwindClasses(element.props, baseType);

    // Build attributes
    const attrs: string[] = [];
    if (classes) {
      attrs.push(`class="${classes}"`);
    }

    // Add other relevant HTML attributes
    if (element.props.href) {
      attrs.push(`href="${element.props.href}"`);
    }
    if (element.props.src) {
      attrs.push(`src="${element.props.src}"`);
    }
    if (element.props.alt) {
      attrs.push(`alt="${element.props.alt}"`);
    }
    if (element.props.type && tagName === 'input') {
      attrs.push(`type="${element.props.type}"`);
    }
    if (element.props.placeholder) {
      attrs.push(`placeholder="${element.props.placeholder}"`);
    }
    if (element.props.disabled) {
      attrs.push('disabled');
    }

    const attrStr = attrs.length > 0 ? ' ' + attrs.join(' ') : '';

    // Get text content
    let textContent = '';
    if (baseType === 'Heading' && element.props.text) {
      textContent = String(element.props.text);
    } else if (baseType === 'Text' && element.props.content) {
      textContent = String(element.props.content);
    } else if (baseType === 'Button' && element.props.label) {
      textContent = String(element.props.label);
    } else if (baseType === 'Link' && element.props.text) {
      textContent = String(element.props.text);
    } else if (baseType === 'Badge' && element.props.text) {
      textContent = String(element.props.text);
    }

    // Handle heading level
    let actualTagName = tagName;
    if (baseType === 'Heading') {
      const level = element.props.level || '1';
      actualTagName = `h${level}`;
    }

    // Self-closing tags
    const selfClosingTags = ['input', 'img', 'br', 'hr'];
    if (
      selfClosingTags.includes(actualTagName) &&
      (!element.children || element.children.length === 0)
    ) {
      return `${indentStr}<${actualTagName}${attrStr} />`;
    }

    // No children and no text - self-closing or empty
    if ((!element.children || element.children.length === 0) && !textContent) {
      return `${indentStr}<${actualTagName}${attrStr}></${actualTagName}>`;
    }

    // Text content only
    if ((!element.children || element.children.length === 0) && textContent) {
      return `${indentStr}<${actualTagName}${attrStr}>${textContent}</${actualTagName}>`;
    }

    // Has children
    const childrenHTML = element.children
      ?.map((childKey) => elementToHTML(childKey, indent + 1))
      .filter(Boolean)
      .join('\n');

    return `${indentStr}<${actualTagName}${attrStr}>
${textContent ? `${'  '.repeat(indent + 1)}${textContent}\n` : ''}${childrenHTML}
${indentStr}</${actualTagName}>`;
  }

  const htmlContent = elementToHTML(tree.root);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generated UI</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="p-4">
${htmlContent}
</body>
</html>`;
}
