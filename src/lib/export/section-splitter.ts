/**
 * Section Splitter - Split UITree into sections and generate multi-file exports
 *
 * This module takes a UITree and splits it into separate section components,
 * generating individual component files for each section and a main page
 * component that imports and renders them all.
 */

import type { UITree, UIElement } from '@json-render/core';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * Template section definition (from template modules).
 * When provided, sections are split by matching keys.
 */
export interface TemplateSection {
  key: string;
  name: string;
  description: string;
  aiPromptHint: string;
}

/**
 * Represents a single section file to be generated.
 */
export interface SectionFile {
  /** File name, e.g. "HeroSection.tsx" */
  fileName: string;
  /** Component name, e.g. "HeroSection" */
  componentName: string;
  /** Key of the section root element in the original tree */
  sectionKey: string;
  /** The extracted sub-tree for this section */
  tree: UITree;
  /** Component type imports required by this section */
  imports: string[];
  /** npm packages this section depends on */
  dependencies: string[];
}

/**
 * The main page file that imports and renders all sections.
 */
export interface PageFile {
  /** File name, e.g. "Page.tsx" */
  fileName: string;
  /** Component name, e.g. "Page" */
  componentName: string;
  /** Import statements for each section */
  sectionImports: string[];
  /** Props forwarded from the root element */
  rootProps: Record<string, unknown>;
}

/**
 * Complete result of splitting a tree into sections.
 */
export interface SplitResult {
  /** Individual section files */
  sections: SectionFile[];
  /** The main page file */
  pageFile: PageFile;
  /** Deduplicated list of all npm dependencies */
  packageDeps: string[];
}

// ---------------------------------------------------------------------------
// Common single-word names that should get "Section" appended
// ---------------------------------------------------------------------------

const COMMON_SINGLE_WORDS = new Set([
  'hero',
  'header',
  'footer',
  'nav',
  'navbar',
  'sidebar',
  'content',
  'main',
  'features',
  'pricing',
  'testimonials',
  'contact',
  'about',
  'faq',
  'cta',
  'banner',
  'gallery',
  'stats',
  'team',
  'blog',
  'newsletter',
]);

// ---------------------------------------------------------------------------
// Element type to JSX tag mapping (simplified export)
// ---------------------------------------------------------------------------

const ELEMENT_TAG_MAP: Record<string, string> = {
  Container: 'div',
  Row: 'div',
  Column: 'div',
  Grid: 'div',
  Heading: 'h',
  Text: 'p',
  Button: 'button',
  Image: 'img',
  Card: 'div',
};

const ELEMENT_CLASS_MAP: Record<string, string> = {
  Row: 'flex flex-row',
  Column: 'flex flex-col',
  Card: 'border rounded-lg p-4',
};

// ---------------------------------------------------------------------------
// Dependency mappings per component type (npm packages)
// ---------------------------------------------------------------------------

const COMPONENT_NPM_DEPS: Record<string, string[]> = {
  // No built-in HTML component needs npm deps in simplified mode.
  // This map is here so framework-specific deps can be added in the future.
};

// ---------------------------------------------------------------------------
// Public functions
// ---------------------------------------------------------------------------

/**
 * Convert a key string to a valid PascalCase React component name.
 *
 * - Splits on underscores, hyphens, and spaces.
 * - Capitalises each word.
 * - If the result is a common single word (e.g. "hero"), appends "Section".
 *
 * @example
 * toComponentName("hero_section") // "HeroSection"
 * toComponentName("header")       // "HeaderSection"
 * toComponentName("product_grid") // "ProductGrid"
 */
export function toComponentName(key: string): string {
  const parts = key
    .split(/[_\-\s]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());

  const name = parts.join('');

  // If it's a single common word, append "Section"
  if (parts.length === 1 && COMMON_SINGLE_WORDS.has(key.toLowerCase())) {
    return name + 'Section';
  }

  return name;
}

/**
 * Extract a complete subtree rooted at `sectionKey`.
 *
 * The returned UITree uses `sectionKey` as its root and contains the element
 * itself plus all of its descendants.
 */
export function extractSubtreeForSection(
  tree: UITree,
  sectionKey: string
): UITree {
  const elements: Record<string, UIElement> = {};

  function collect(key: string) {
    const el = tree.elements[key];
    if (!el) return;
    elements[key] = el;
    if (el.children) {
      for (const childKey of el.children) {
        collect(childKey);
      }
    }
  }

  collect(sectionKey);

  return { root: sectionKey, elements };
}

/**
 * Detect the unique component type names used inside a UITree.
 *
 * - Strips namespace prefixes (`core::Button` -> `Button`).
 * - Returns sorted alphabetically.
 */
export function detectComponentImports(tree: UITree): string[] {
  const types = new Set<string>();

  for (const el of Object.values(tree.elements)) {
    const stripped = stripNamespace(el.type);
    types.add(stripped);
  }

  return Array.from(types).sort();
}

/**
 * Split a UITree into individual section files.
 *
 * @param tree      The full UITree.
 * @param sections  Optional template section definitions. When provided, only
 *                  matching keys are used as section boundaries. When omitted,
 *                  top-level children of the root element are used.
 */
export function splitTreeIntoSections(
  tree: UITree,
  sections?: TemplateSection[]
): SplitResult {
  const rootElement = tree.elements[tree.root];
  if (!rootElement) {
    return {
      sections: [],
      pageFile: {
        fileName: 'Page.tsx',
        componentName: 'Page',
        sectionImports: [],
        rootProps: {},
      },
      packageDeps: [],
    };
  }

  // Determine which keys act as section boundaries
  let sectionKeys: string[];

  if (sections && sections.length > 0) {
    // Use only section keys that actually exist in the tree
    sectionKeys = sections
      .map((s) => s.key)
      .filter((key) => tree.elements[key] !== undefined);
  } else {
    // Auto-detect: top-level children of root
    sectionKeys = rootElement.children ?? [];
  }

  // Build SectionFile for each key
  const allDeps = new Set<string>();
  const sectionFiles: SectionFile[] = sectionKeys.map((key) => {
    const subtree = extractSubtreeForSection(tree, key);
    const imports = detectComponentImports(subtree);
    const deps = collectDependencies(subtree);
    deps.forEach((d) => allDeps.add(d));

    const componentName = toComponentName(key);

    return {
      fileName: `${componentName}.tsx`,
      componentName,
      sectionKey: key,
      tree: subtree,
      imports,
      dependencies: deps,
    };
  });

  // Build PageFile
  const sectionImports = sectionFiles.map(
    (s) => `import { ${s.componentName} } from './${s.componentName}';`
  );

  const pageFile: PageFile = {
    fileName: 'Page.tsx',
    componentName: 'Page',
    sectionImports,
    rootProps: { ...rootElement.props },
  };

  return {
    sections: sectionFiles,
    pageFile,
    packageDeps: Array.from(allDeps).sort(),
  };
}

/**
 * Generate simplified React component code for a single section.
 *
 * Each element type is mapped to a basic HTML/JSX tag with Tailwind classes.
 * The `framework` parameter is accepted for future use but the current
 * implementation always produces Tailwind-based simplified output.
 */
export function generateSectionComponentCode(
  section: SectionFile,
  _framework: string = 'tailwind'
): string {
  const lines: string[] = [];

  lines.push('// Auto-generated by UI Builder');
  lines.push("import React from 'react';");
  lines.push('');
  lines.push(`export function ${section.componentName}() {`);
  lines.push('  return (');

  const jsx = renderElementToJSX(section.tree.root, section.tree, 2);
  lines.push(jsx);

  lines.push('  );');
  lines.push('}');
  lines.push('');

  return lines.join('\n');
}

/**
 * Generate the main page component that imports and renders all sections.
 */
export function generatePageCode(result: SplitResult): string {
  const lines: string[] = [];

  lines.push("import React from 'react';");

  for (const imp of result.pageFile.sectionImports) {
    lines.push(imp);
  }

  lines.push('');
  lines.push(`export function ${result.pageFile.componentName}() {`);
  lines.push('  return (');
  lines.push('    <div className="max-w-7xl mx-auto">');

  for (const section of result.sections) {
    lines.push(`      <${section.componentName} />`);
  }

  lines.push('    </div>');
  lines.push('  );');
  lines.push('}');
  lines.push('');

  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Strip namespace prefix from a component type.
 * e.g. "core::Button" -> "Button"
 */
function stripNamespace(type: string): string {
  if (type.includes('::')) {
    const parts = type.split('::');
    return parts[parts.length - 1];
  }
  return type;
}

/**
 * Collect npm dependencies for all elements in a subtree.
 */
function collectDependencies(tree: UITree): string[] {
  const deps = new Set<string>();

  for (const el of Object.values(tree.elements)) {
    const stripped = stripNamespace(el.type);
    const npmDeps = COMPONENT_NPM_DEPS[stripped];
    if (npmDeps) {
      npmDeps.forEach((d) => deps.add(d));
    }
  }

  return Array.from(deps).sort();
}

/**
 * Recursively render an element and its children to simplified JSX.
 */
function renderElementToJSX(
  key: string,
  tree: UITree,
  indent: number
): string {
  const element = tree.elements[key];
  if (!element) return '';

  const pad = '  '.repeat(indent);
  const strippedType = stripNamespace(element.type);

  // Determine tag and extra classes
  const { tag, className } = resolveTagAndClasses(strippedType, element.props);

  // Build the className attribute
  const classAttr = className ? ` className="${className}"` : '';

  // Build extra attributes for certain element types
  const extraAttrs = resolveExtraAttributes(strippedType, element.props);

  // Text content
  const textContent = getTextContent(strippedType, element.props);

  const hasChildren = element.children && element.children.length > 0;

  // Self-closing tags (no children, no text)
  if (!hasChildren && !textContent) {
    return `${pad}<${tag}${classAttr}${extraAttrs} />`;
  }

  // Text only
  if (!hasChildren && textContent) {
    return `${pad}<${tag}${classAttr}${extraAttrs}>${textContent}</${tag}>`;
  }

  // Has children
  const childrenJSX = (element.children ?? [])
    .map((childKey) => renderElementToJSX(childKey, tree, indent + 1))
    .filter(Boolean)
    .join('\n');

  const openParts: string[] = [`${pad}<${tag}${classAttr}${extraAttrs}>`];

  if (textContent) {
    openParts.push(`${'  '.repeat(indent + 1)}${textContent}`);
  }

  openParts.push(childrenJSX);
  openParts.push(`${pad}</${tag}>`);

  return openParts.filter(Boolean).join('\n');
}

/**
 * Resolve an element type + props to the JSX tag and Tailwind class name.
 */
function resolveTagAndClasses(
  type: string,
  props: Record<string, unknown>
): { tag: string; className: string } {
  let tag: string;
  const classes: string[] = [];

  switch (type) {
    case 'Container':
      tag = 'div';
      break;

    case 'Row':
      tag = 'div';
      classes.push('flex flex-row');
      break;

    case 'Column':
      tag = 'div';
      classes.push('flex flex-col');
      break;

    case 'Grid': {
      tag = 'div';
      const cols = props.cols ?? props.columns ?? 3;
      classes.push(`grid grid-cols-${cols}`);
      break;
    }

    case 'Heading': {
      const level = String(props.level ?? '1');
      tag = `h${level}`;
      break;
    }

    case 'Text':
      tag = 'p';
      break;

    case 'Button':
      tag = 'button';
      break;

    case 'Image':
      tag = 'img';
      break;

    case 'Card':
      tag = 'div';
      classes.push('border rounded-lg p-4');
      break;

    default:
      tag = 'div';
      classes.push(`data-component="${type}"`);
      // We put the data-component as an attribute, not a class — handle below
      break;
  }

  // For the "Other" case we smuggled the data attr into classes. Fix that:
  const dataAttrIdx = classes.findIndex((c) => c.startsWith('data-component='));
  let className = '';
  if (dataAttrIdx === -1) {
    className = classes.join(' ');
  } else {
    // Remove the data attr from classes, it'll be handled as an attribute
    classes.splice(dataAttrIdx, 1);
    className = classes.join(' ');
  }

  // Add gap utility if present
  if (props.gap) {
    const gapMap: Record<string, string> = {
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
    };
    const gapClass = gapMap[String(props.gap)] ?? `gap-${props.gap}`;
    className = className ? `${className} ${gapClass}` : gapClass;
  }

  // Add align utility if present
  if (props.align) {
    const alignMap: Record<string, string> = {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
    };
    const alignClass = alignMap[String(props.align)];
    if (alignClass) {
      className = className ? `${className} ${alignClass}` : alignClass;
    }
  }

  return { tag, className };
}

/**
 * Resolve extra JSX attributes for certain element types.
 */
function resolveExtraAttributes(
  type: string,
  props: Record<string, unknown>
): string {
  const attrs: string[] = [];

  // Unknown component types get a data-component attribute
  if (!ELEMENT_TAG_MAP[type] && type !== 'Footer') {
    attrs.push(`data-component="${type}"`);
  }

  if (type === 'Image' && props.src) {
    attrs.push(`src="${props.src}"`);
    if (props.alt) {
      attrs.push(`alt="${props.alt}"`);
    }
  }

  if (type === 'Button' && props.variant) {
    attrs.push(`data-variant="${props.variant}"`);
  }

  return attrs.length > 0 ? ' ' + attrs.join(' ') : '';
}

/**
 * Extract text content from element props.
 */
function getTextContent(
  type: string,
  props: Record<string, unknown>
): string | null {
  if (type === 'Heading' && props.text) return String(props.text);
  if (type === 'Text' && props.content) return String(props.content);
  if (type === 'Button' && props.label) return String(props.label);
  if (type === 'Footer' && props.copyright) return String(props.copyright);
  return null;
}
