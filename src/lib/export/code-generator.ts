/**
 * Code Generator - Core logic for generating React/Next.js code from UITree
 *
 * This module takes a UITree and converts it to clean, production-ready
 * React component code with proper imports, TypeScript types, and comments.
 */

import type { UITree, UIElement } from '@json-render/core';
import type { UIFramework } from '@/types';

// Supported export frameworks
export type ExportTarget = 'react' | 'nextjs';

// Code generation options
export interface CodeGenerationOptions {
  /** Target framework (React or Next.js) */
  target: ExportTarget;
  /** UI component library to use */
  framework: UIFramework;
  /** Component name to generate */
  componentName?: string;
  /** Include TypeScript types */
  includeTypes?: boolean;
  /** Include comments for API integration */
  includeApiComments?: boolean;
  /** Use client directive for Next.js */
  useClientDirective?: boolean;
}

// Import path mappings for each framework
const FRAMEWORK_IMPORTS: Record<UIFramework, { path: string; isNamedExport: boolean }> = {
  shadcn: { path: '@/components/ui', isNamedExport: true },
  mui: { path: '@mui/material', isNamedExport: true },
  chakra: { path: '@chakra-ui/react', isNamedExport: true },
  tailwind: { path: '', isNamedExport: false }, // Tailwind uses inline styles
  flowbite: { path: 'flowbite-react', isNamedExport: true },
  antd: { path: 'antd', isNamedExport: true },
  'magic-ui': { path: '@/components/magicui', isNamedExport: true },
  aceternity: { path: '@/components/ui/aceternity', isNamedExport: true },
};

// Component name mappings for different frameworks
const COMPONENT_MAPPINGS: Record<UIFramework, Record<string, string>> = {
  shadcn: {
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
    Spacer: 'Spacer',
    List: 'List',
    ListItem: 'ListItem',
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
    List: 'List',
    ListItem: 'ListItem',
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
    List: 'List',
    ListItem: 'ListItem',
  },
  tailwind: {
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
    Spacer: 'div',
    List: 'ul',
    ListItem: 'li',
  },
  flowbite: {
    Container: 'Container',
    Row: 'Flex',
    Column: 'Flex',
    Grid: 'Grid',
    Stack: 'Stack',
    Card: 'Card',
    CardHeader: 'CardHeader',
    CardBody: 'CardBody',
    CardFooter: 'CardFooter',
    Button: 'Button',
    Input: 'TextInput',
    TextArea: 'Textarea',
    Select: 'Select',
    Checkbox: 'Checkbox',
    Switch: 'ToggleSwitch',
    Badge: 'Badge',
    Avatar: 'Avatar',
    Alert: 'Alert',
    Progress: 'Progress',
    Tabs: 'Tabs',
    Tab: 'Tabs.Item',
    Accordion: 'Accordion',
    AccordionItem: 'Accordion.Panel',
    Tooltip: 'Tooltip',
    Heading: 'Heading',
    Text: 'Text',
    Link: 'Link',
    Image: 'Image',
    Divider: 'Divider',
    Table: 'Table',
    TableHeader: 'Table.Head',
    TableBody: 'Table.Body',
    TableRow: 'Table.Row',
    TableCell: 'Table.Cell',
    List: 'List',
    ListItem: 'List.Item',
  },
  antd: {
    Container: 'Layout',
    Row: 'Row',
    Column: 'Col',
    Grid: 'Row',
    Stack: 'Space',
    Card: 'Card',
    CardHeader: 'Card.Meta',
    CardBody: 'Card',
    CardFooter: 'Card',
    Button: 'Button',
    Input: 'Input',
    TextArea: 'Input.TextArea',
    Select: 'Select',
    Checkbox: 'Checkbox',
    Switch: 'Switch',
    Badge: 'Tag',
    Avatar: 'Avatar',
    Alert: 'Alert',
    Progress: 'Progress',
    Tabs: 'Tabs',
    Tab: 'Tabs.TabPane',
    Accordion: 'Collapse',
    AccordionItem: 'Collapse.Panel',
    Tooltip: 'Tooltip',
    Heading: 'Typography.Title',
    Text: 'Typography.Text',
    Link: 'Typography.Link',
    Image: 'Image',
    Divider: 'Divider',
    Table: 'Table',
    TableHeader: 'Table',
    TableBody: 'Table',
    TableRow: 'Table',
    TableCell: 'Table',
    List: 'List',
    ListItem: 'List.Item',
  },
  'magic-ui': {
    // Magic UI - animated/interactive components
    Container: 'Container',
    Row: 'Row',
    Column: 'Column',
    Grid: 'Grid',
    Stack: 'Stack',
    Card: 'MagicCard',
    CardHeader: 'CardHeader',
    CardBody: 'CardBody',
    CardFooter: 'CardFooter',
    Button: 'ShimmerButton',
    Input: 'Input',
    TextArea: 'Textarea',
    Select: 'Select',
    Checkbox: 'Checkbox',
    Switch: 'Switch',
    Badge: 'Badge',
    Avatar: 'Avatar',
    Alert: 'Alert',
    Progress: 'AnimatedProgress',
    Tabs: 'Tabs',
    TabList: 'TabsList',
    Tab: 'TabsTrigger',
    TabPanel: 'TabsContent',
    Accordion: 'Accordion',
    AccordionItem: 'AccordionItem',
    Tooltip: 'Tooltip',
    Heading: 'AnimatedHeading',
    Text: 'AnimatedText',
    Link: 'Link',
    Image: 'Image',
    Divider: 'Separator',
    Spacer: 'Spacer',
    List: 'List',
    ListItem: 'ListItem',
  },
  aceternity: {
    // Aceternity UI - modern animated components
    Container: 'Container',
    Row: 'Row',
    Column: 'Column',
    Grid: 'Grid',
    Stack: 'Stack',
    Card: 'HoverCard',
    CardHeader: 'CardHeader',
    CardBody: 'CardBody',
    CardFooter: 'CardFooter',
    Button: 'MovingBorderButton',
    Input: 'FloatingInput',
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
    Heading: 'TextReveal',
    Text: 'TypewriterEffect',
    Link: 'Link',
    Image: 'Image',
    Divider: 'Separator',
    Spacer: 'Spacer',
    List: 'List',
    ListItem: 'ListItem',
  },
};

// Tailwind CSS class mappings for common props
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
    '1': 'gap-1',
    '2': 'gap-2',
    '3': 'gap-3',
    '4': 'gap-4',
    '6': 'gap-6',
    '8': 'gap-8',
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
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    destructive: 'bg-red-600 text-white hover:bg-red-700',
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
 * Get the component name for a specific framework
 */
function getComponentName(type: string, framework: UIFramework): string {
  const mapping = COMPONENT_MAPPINGS[framework];
  return mapping?.[type] || type;
}

/**
 * Collect unique component types used in the tree
 */
function collectComponentTypes(tree: UITree, framework: UIFramework): Set<string> {
  const types = new Set<string>();

  function traverse(elementKey: string) {
    const element = tree.elements[elementKey];
    if (!element) return;

    const componentName = getComponentName(element.type, framework);
    // For Tailwind, we don't need to import HTML elements
    if (componentName && framework !== 'tailwind') {
      // Handle compound components (e.g., "Tabs.Item")
      const baseName = componentName.split('.')[0];
      types.add(baseName);
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
 * Generate Tailwind CSS classes from props
 */
function generateTailwindClasses(props: Record<string, unknown>, componentType: string): string {
  const classes: string[] = [];

  // Base classes by component type
  switch (componentType) {
    case 'Container':
      classes.push('mx-auto px-4');
      break;
    case 'Row':
      classes.push('flex flex-row');
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
      classes.push('rounded-lg border bg-card text-card-foreground shadow-sm p-6');
      break;
    case 'CardHeader':
      classes.push('pb-4');
      break;
    case 'CardBody':
      classes.push('py-4');
      break;
    case 'CardFooter':
      classes.push('pt-4 flex items-center');
      break;
    case 'Button':
      classes.push(
        'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'
      );
      break;
    case 'Input':
      classes.push(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
      );
      break;
    case 'Badge':
      classes.push('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold');
      break;
    case 'Alert':
      classes.push('relative w-full rounded-lg border p-4');
      break;
    case 'Heading': {
      const level = props.level || '1';
      const headingSizes: Record<string, string> = {
        '1': 'text-4xl font-bold tracking-tight',
        '2': 'text-3xl font-semibold tracking-tight',
        '3': 'text-2xl font-semibold tracking-tight',
        '4': 'text-xl font-semibold',
        '5': 'text-lg font-medium',
        '6': 'text-base font-medium',
      };
      classes.push(headingSizes[String(level)] || headingSizes['1']);
      break;
    }
    case 'Text':
      classes.push('text-base leading-7');
      break;
    case 'Link':
      classes.push('text-primary underline-offset-4 hover:underline');
      break;
    case 'Divider':
      classes.push('shrink-0 bg-border h-[1px] w-full my-4');
      break;
    case 'Spacer':
      classes.push('flex-1');
      break;
    case 'List':
      classes.push('list-disc list-inside space-y-2');
      break;
    case 'ListItem':
      classes.push('');
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
    classes.push('mx-auto text-center');
  }

  // Handle fullWidth prop
  if (props.fullWidth) {
    classes.push('w-full');
  }

  return classes.filter(Boolean).join(' ');
}

/**
 * Format a prop value for JSX output
 */
function formatPropValue(value: unknown): string {
  if (typeof value === 'string') {
    // Escape special characters in strings
    const escaped = value.replace(/"/g, '\\"');
    return `"${escaped}"`;
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
  framework: UIFramework,
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

  // Props that should be skipped (handled elsewhere or internal)
  const skipProps = new Set([
    'children',
    'key',
    'text',
    'content',
    'label',
    // Non-DOM props that AI might generate
    'wrap',
    'maxWidth',
    'maxHeight'
  ]);
  // For Tailwind, skip props that are converted to classes
  const tailwindClassProps = new Set(Object.keys(TAILWIND_CLASSES));

  for (const [key, value] of Object.entries(props)) {
    // Skip internal props
    if (skipProps.has(key)) continue;

    // For Tailwind, skip props that are converted to classes
    if (framework === 'tailwind' && tailwindClassProps.has(key)) continue;

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
 * Get text content from element props
 */
function getTextContent(element: UIElement): string | null {
  if (element.type === 'Heading' && element.props.text) {
    return String(element.props.text);
  }
  if (element.type === 'Text' && element.props.content) {
    return String(element.props.content);
  }
  if (element.type === 'Button' && element.props.label) {
    return String(element.props.label);
  }
  if (element.type === 'Link' && element.props.text) {
    return String(element.props.text);
  }
  if (element.type === 'Badge' && element.props.text) {
    return String(element.props.text);
  }
  if (element.type === 'Alert' && element.props.message) {
    return String(element.props.message);
  }
  if (element.type === 'ListItem' && element.props.text) {
    return String(element.props.text);
  }
  return null;
}

/**
 * Convert an element to JSX code
 */
function elementToJSX(
  elementKey: string,
  tree: UITree,
  framework: UIFramework,
  indent: number = 2
): string {
  const element = tree.elements[elementKey];
  if (!element) return '';

  const componentName = getComponentName(element.type, framework);
  const indentStr = '  '.repeat(indent);

  // Handle special Tailwind heading elements
  let actualComponentName = componentName;
  if (framework === 'tailwind' && element.type === 'Heading') {
    const level = element.props.level || '1';
    actualComponentName = `h${level}`;
  }

  const propsStr = formatProps(element.props, framework, element.type);

  // Get text content
  const textContent = getTextContent(element);

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
 * Generate import statements based on framework and components used
 */
function generateImports(componentTypes: Set<string>, framework: UIFramework): string {
  const lines: string[] = [];

  // React is always needed for TSX
  if (framework === 'tailwind') {
    // For tailwind, we just need React
    lines.push("import * as React from 'react';");
  } else {
    const importInfo = FRAMEWORK_IMPORTS[framework];
    const sortedTypes = Array.from(componentTypes).sort();

    if (importInfo.isNamedExport && sortedTypes.length > 0) {
      lines.push(`import { ${sortedTypes.join(', ')} } from '${importInfo.path}';`);
    }
  }

  return lines.join('\n');
}

/**
 * Generate the full React component code
 */
export function generateReactCode(tree: UITree, options: CodeGenerationOptions): string {
  const {
    framework,
    componentName = 'GeneratedComponent',
    includeTypes = true,
    includeApiComments = true,
    useClientDirective = false,
  } = options;

  const lines: string[] = [];

  // Add 'use client' directive if requested
  if (useClientDirective) {
    lines.push("'use client';");
    lines.push('');
  }

  // Collect component types
  const componentTypes = collectComponentTypes(tree, framework);

  // Generate imports
  const imports = generateImports(componentTypes, framework);
  if (imports) {
    lines.push(imports);
    lines.push('');
  }

  // Add type definition for props (if TypeScript)
  if (includeTypes) {
    lines.push(`interface ${componentName}Props {`);
    lines.push('  className?: string;');
    lines.push('}');
    lines.push('');
  }

  // Add API comment placeholder
  if (includeApiComments) {
    lines.push('/**');
    lines.push(` * ${componentName}`);
    lines.push(' * Generated by Generative UI Builder');
    lines.push(' */');
  }

  // Component function
  const propsType = includeTypes ? `{ className }: ${componentName}Props` : '{ className }';
  lines.push(`export function ${componentName}(${propsType}) {`);

  // Add API integration placeholder
  if (includeApiComments) {
    lines.push('  // TODO: Add your data fetching logic here');
    lines.push('  // const { data, isLoading, error } = useQuery(...);');
    lines.push('');
  }

  // Add return statement with JSX
  lines.push('  return (');
  const jsxContent = elementToJSX(tree.root, tree, framework, 2);
  lines.push(jsxContent);
  lines.push('  );');
  lines.push('}');
  lines.push('');

  // Default export
  lines.push(`export default ${componentName};`);
  lines.push('');

  return lines.join('\n');
}

/**
 * Generate Next.js page component code
 */
export function generateNextJSCode(tree: UITree, options: CodeGenerationOptions): string {
  const { framework, componentName = 'Page', includeTypes = true } = options;

  const lines: string[] = [];

  // 'use client' directive
  lines.push("'use client';");
  lines.push('');

  // Collect component types
  const componentTypes = collectComponentTypes(tree, framework);

  // Generate imports
  const imports = generateImports(componentTypes, framework);
  if (imports) {
    lines.push(imports);
    lines.push('');
  }

  // Add type definition
  if (includeTypes) {
    lines.push('interface PageProps {');
    lines.push('  params: Record<string, string>;');
    lines.push('  searchParams: Record<string, string | string[] | undefined>;');
    lines.push('}');
    lines.push('');
  }

  // Page component
  lines.push('/**');
  lines.push(` * ${componentName}`);
  lines.push(' * Generated by Generative UI Builder');
  lines.push(' *');
  lines.push(' * Next.js App Router Page Component');
  lines.push(' */');

  const propsType = includeTypes ? '{ params, searchParams }: PageProps' : '{ params, searchParams }';
  lines.push(`export default function ${componentName}(${propsType}) {`);

  // Data fetching placeholder
  lines.push('  // TODO: Add your data fetching logic');
  lines.push('  // You can use Server Actions or Client-side fetching');
  lines.push('  // const data = await fetchData(params.id);');
  lines.push('');

  // Return JSX
  lines.push('  return (');
  const jsxContent = elementToJSX(tree.root, tree, framework, 2);
  lines.push(jsxContent);
  lines.push('  );');
  lines.push('}');
  lines.push('');

  return lines.join('\n');
}

/**
 * Main code generation function
 */
export function generateCode(tree: UITree, options: CodeGenerationOptions): string {
  if (options.target === 'nextjs') {
    return generateNextJSCode(tree, options);
  }
  return generateReactCode(tree, {
    ...options,
    useClientDirective: options.useClientDirective ?? true,
  });
}

/**
 * Get installation instructions for a framework
 */
export function getInstallationInstructions(framework: UIFramework): string {
  const instructions: Record<UIFramework, string> = {
    shadcn: `# Install shadcn/ui components
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card input tabs badge alert progress avatar

# Or install specific components as needed`,
    mui: `# Install Material UI
npm install @mui/material @emotion/react @emotion/styled

# For icons (optional)
npm install @mui/icons-material`,
    chakra: `# Install Chakra UI
npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion

# Wrap your app with ChakraProvider`,
    tailwind: `# Install Tailwind CSS (if not already installed)
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Configure tailwind.config.js`,
    flowbite: `# Install Flowbite React
npm install flowbite flowbite-react

# Add Flowbite plugin to tailwind.config.js`,
    antd: `# Install Ant Design
npm install antd @ant-design/icons

# Import styles in your app
import 'antd/dist/reset.css';`,
    'magic-ui': `# Install Magic UI components
# Magic UI is typically installed via CLI similar to shadcn/ui
npx magicui-cli@latest init
npx magicui-cli@latest add shimmer-button magic-card

# Requires Tailwind CSS and Framer Motion
npm install framer-motion`,
    aceternity: `# Install Aceternity UI components
# Copy components from the Aceternity UI library
# https://ui.aceternity.com

# Required dependencies
npm install framer-motion clsx tailwind-merge

# Components are typically copied to @/components/ui/aceternity`,
  };

  return instructions[framework] || '# No installation instructions available';
}

/**
 * Get the file extension for generated code
 */
export function getFileExtension(includeTypes: boolean): string {
  return includeTypes ? '.tsx' : '.jsx';
}

/**
 * Get suggested filename for the component
 */
export function getSuggestedFilename(
  componentName: string,
  target: ExportTarget,
  includeTypes: boolean
): string {
  const ext = getFileExtension(includeTypes);

  if (target === 'nextjs') {
    return `page${ext}`;
  }

  // Convert PascalCase to kebab-case
  const kebabName = componentName
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase();

  return `${kebabName}${ext}`;
}
