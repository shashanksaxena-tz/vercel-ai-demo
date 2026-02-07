/**
 * Tests for section-splitter module
 */

import { describe, it, expect, beforeAll } from 'vitest';
import type { UITree } from '@json-render/core';
import {
  splitTreeIntoSections,
  extractSubtreeForSection,
  detectComponentImports,
  generateSectionComponentCode,
  generatePageCode,
  toComponentName,
  type TemplateSection,
  type SplitResult,
} from '../section-splitter';

// ---------------------------------------------------------------------------
// Shared test tree
// ---------------------------------------------------------------------------

const testTree: UITree = {
  root: 'page',
  elements: {
    page: {
      key: 'page',
      type: 'Container',
      props: { maxWidth: 'lg' },
      children: ['hero', 'features', 'footer'],
    },
    hero: {
      key: 'hero',
      type: 'Column',
      props: { gap: 'lg', align: 'center' },
      children: ['hero_title', 'hero_subtitle', 'hero_btn'],
    },
    hero_title: {
      key: 'hero_title',
      type: 'Heading',
      props: { level: '1', text: 'Welcome' },
    },
    hero_subtitle: {
      key: 'hero_subtitle',
      type: 'Text',
      props: { content: 'Build something amazing' },
    },
    hero_btn: {
      key: 'hero_btn',
      type: 'Button',
      props: { label: 'Get Started', variant: 'primary' },
    },
    features: {
      key: 'features',
      type: 'Grid',
      props: { cols: 3, gap: 'md' },
      children: ['f1', 'f2', 'f3'],
    },
    f1: {
      key: 'f1',
      type: 'FeatureCard',
      props: {
        icon: 'zap',
        title: 'Fast',
        description: 'Lightning fast performance',
      },
    },
    f2: {
      key: 'f2',
      type: 'FeatureCard',
      props: {
        icon: 'shield',
        title: 'Secure',
        description: 'Enterprise security',
      },
    },
    f3: {
      key: 'f3',
      type: 'FeatureCard',
      props: {
        icon: 'code',
        title: 'Developer',
        description: 'Great DX',
      },
    },
    footer: {
      key: 'footer',
      type: 'Footer',
      props: { copyright: '© 2026 MyApp' },
    },
  },
};

// ---------------------------------------------------------------------------
// toComponentName
// ---------------------------------------------------------------------------

describe('toComponentName', () => {
  it('converts underscore-separated keys to PascalCase', () => {
    expect(toComponentName('hero_section')).toBe('HeroSection');
    expect(toComponentName('product_grid')).toBe('ProductGrid');
  });

  it('appends "Section" for single common words', () => {
    expect(toComponentName('hero')).toBe('HeroSection');
    expect(toComponentName('header')).toBe('HeaderSection');
    expect(toComponentName('footer')).toBe('FooterSection');
    expect(toComponentName('features')).toBe('FeaturesSection');
  });

  it('does not append "Section" for non-common single words', () => {
    expect(toComponentName('dashboard')).toBe('Dashboard');
  });

  it('handles hyphen-separated keys', () => {
    expect(toComponentName('my-component')).toBe('MyComponent');
  });

  it('handles already PascalCase-style keys (single word)', () => {
    // "Hero" lowered -> "hero" which is common, so Section appended
    expect(toComponentName('Hero')).toBe('HeroSection');
  });
});

// ---------------------------------------------------------------------------
// extractSubtreeForSection
// ---------------------------------------------------------------------------

describe('extractSubtreeForSection', () => {
  it('extracts the hero section with all descendants', () => {
    const subtree = extractSubtreeForSection(testTree, 'hero');

    expect(subtree.root).toBe('hero');
    expect(Object.keys(subtree.elements)).toHaveLength(4);
    expect(subtree.elements).toHaveProperty('hero');
    expect(subtree.elements).toHaveProperty('hero_title');
    expect(subtree.elements).toHaveProperty('hero_subtitle');
    expect(subtree.elements).toHaveProperty('hero_btn');
  });

  it('extracts the features section with all descendants', () => {
    const subtree = extractSubtreeForSection(testTree, 'features');

    expect(subtree.root).toBe('features');
    expect(Object.keys(subtree.elements)).toHaveLength(4);
    expect(subtree.elements).toHaveProperty('features');
    expect(subtree.elements).toHaveProperty('f1');
    expect(subtree.elements).toHaveProperty('f2');
    expect(subtree.elements).toHaveProperty('f3');
  });

  it('extracts a leaf element as a single-element subtree', () => {
    const subtree = extractSubtreeForSection(testTree, 'footer');

    expect(subtree.root).toBe('footer');
    expect(Object.keys(subtree.elements)).toHaveLength(1);
    expect(subtree.elements).toHaveProperty('footer');
  });

  it('returns an empty tree for a non-existent key', () => {
    const subtree = extractSubtreeForSection(testTree, 'nonexistent');

    expect(subtree.root).toBe('nonexistent');
    expect(Object.keys(subtree.elements)).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// detectComponentImports
// ---------------------------------------------------------------------------

describe('detectComponentImports', () => {
  it('detects all unique types in the full tree', () => {
    const imports = detectComponentImports(testTree);

    expect(imports).toContain('Container');
    expect(imports).toContain('Column');
    expect(imports).toContain('Grid');
    expect(imports).toContain('Heading');
    expect(imports).toContain('Text');
    expect(imports).toContain('Button');
    expect(imports).toContain('FeatureCard');
    expect(imports).toContain('Footer');
    // 8 unique types total
    expect(imports).toHaveLength(8);
  });

  it('returns sorted results', () => {
    const imports = detectComponentImports(testTree);

    const sorted = [...imports].sort();
    expect(imports).toEqual(sorted);
  });

  it('strips namespace prefixes', () => {
    const nsTree: UITree = {
      root: 'r',
      elements: {
        r: {
          key: 'r',
          type: 'core::Container',
          props: {},
          children: ['b'],
        },
        b: { key: 'b', type: 'core::Button', props: {} },
      },
    };

    const imports = detectComponentImports(nsTree);

    expect(imports).toContain('Button');
    expect(imports).toContain('Container');
    expect(imports).not.toContain('core::Button');
  });
});

// ---------------------------------------------------------------------------
// splitTreeIntoSections — auto-detect
// ---------------------------------------------------------------------------

describe('splitTreeIntoSections (auto-detect)', () => {
  let result: SplitResult;

  beforeAll(() => {
    result = splitTreeIntoSections(testTree);
  });

  it('detects 3 sections from top-level children', () => {
    expect(result.sections).toHaveLength(3);
  });

  it('generates correct component names', () => {
    const names = result.sections.map((s) => s.componentName);

    expect(names).toContain('HeroSection');
    expect(names).toContain('FeaturesSection');
    expect(names).toContain('FooterSection');
  });

  it('assigns correct file names', () => {
    const files = result.sections.map((s) => s.fileName);

    expect(files).toContain('HeroSection.tsx');
    expect(files).toContain('FeaturesSection.tsx');
    expect(files).toContain('FooterSection.tsx');
  });

  it('each section has a valid subtree', () => {
    const hero = result.sections.find((s) => s.sectionKey === 'hero')!;
    expect(hero.tree.root).toBe('hero');
    expect(Object.keys(hero.tree.elements)).toHaveLength(4);
  });

  it('each section lists its component imports', () => {
    const hero = result.sections.find((s) => s.sectionKey === 'hero')!;
    expect(hero.imports).toContain('Column');
    expect(hero.imports).toContain('Heading');
    expect(hero.imports).toContain('Text');
    expect(hero.imports).toContain('Button');
  });

  it('generates a PageFile with all section imports', () => {
    expect(result.pageFile.componentName).toBe('Page');
    expect(result.pageFile.fileName).toBe('Page.tsx');
    expect(result.pageFile.sectionImports).toHaveLength(3);
    expect(result.pageFile.sectionImports[0]).toContain('HeroSection');
    expect(result.pageFile.sectionImports[1]).toContain('FeaturesSection');
    expect(result.pageFile.sectionImports[2]).toContain('FooterSection');
  });

  it('pageFile.rootProps come from the root element', () => {
    expect(result.pageFile.rootProps).toEqual({ maxWidth: 'lg' });
  });

  it('packageDeps is an array (possibly empty for simplified export)', () => {
    expect(Array.isArray(result.packageDeps)).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// splitTreeIntoSections — with explicit sections
// ---------------------------------------------------------------------------

describe('splitTreeIntoSections (explicit sections)', () => {
  it('uses provided TemplateSection keys', () => {
    const sections: TemplateSection[] = [
      {
        key: 'hero',
        name: 'Hero',
        description: 'Hero banner',
        aiPromptHint: 'Create a hero',
      },
      {
        key: 'footer',
        name: 'Footer',
        description: 'Page footer',
        aiPromptHint: 'Create a footer',
      },
    ];

    const result = splitTreeIntoSections(testTree, sections);

    expect(result.sections).toHaveLength(2);
    expect(result.sections[0].sectionKey).toBe('hero');
    expect(result.sections[1].sectionKey).toBe('footer');
  });

  it('skips section keys that do not exist in the tree', () => {
    const sections: TemplateSection[] = [
      {
        key: 'hero',
        name: 'Hero',
        description: '',
        aiPromptHint: '',
      },
      {
        key: 'nonexistent',
        name: 'Ghost',
        description: '',
        aiPromptHint: '',
      },
    ];

    const result = splitTreeIntoSections(testTree, sections);

    expect(result.sections).toHaveLength(1);
    expect(result.sections[0].sectionKey).toBe('hero');
  });
});

// ---------------------------------------------------------------------------
// generateSectionComponentCode
// ---------------------------------------------------------------------------

describe('generateSectionComponentCode', () => {
  it('produces valid-looking JSX with React import', () => {
    const result = splitTreeIntoSections(testTree);
    const hero = result.sections.find((s) => s.sectionKey === 'hero')!;

    const code = generateSectionComponentCode(hero);

    expect(code).toContain("import React from 'react';");
    expect(code).toContain('export function HeroSection()');
    expect(code).toContain('return (');
    expect(code).toContain('Welcome');
    expect(code).toContain('Build something amazing');
    expect(code).toContain('Get Started');
  });

  it('maps Heading to <h{level}>', () => {
    const result = splitTreeIntoSections(testTree);
    const hero = result.sections.find((s) => s.sectionKey === 'hero')!;

    const code = generateSectionComponentCode(hero);

    expect(code).toContain('<h1');
    expect(code).toContain('</h1>');
  });

  it('maps Button to <button>', () => {
    const result = splitTreeIntoSections(testTree);
    const hero = result.sections.find((s) => s.sectionKey === 'hero')!;

    const code = generateSectionComponentCode(hero);

    expect(code).toContain('<button');
  });

  it('maps Grid to <div> with grid classes', () => {
    const result = splitTreeIntoSections(testTree);
    const features = result.sections.find(
      (s) => s.sectionKey === 'features'
    )!;

    const code = generateSectionComponentCode(features);

    expect(code).toContain('grid grid-cols-3');
  });

  it('maps unknown types to <div data-component="...">', () => {
    const result = splitTreeIntoSections(testTree);
    const features = result.sections.find(
      (s) => s.sectionKey === 'features'
    )!;

    const code = generateSectionComponentCode(features);

    expect(code).toContain('data-component="FeatureCard"');
  });

  it('includes the auto-generated comment', () => {
    const result = splitTreeIntoSections(testTree);
    const hero = result.sections.find((s) => s.sectionKey === 'hero')!;

    const code = generateSectionComponentCode(hero);

    expect(code).toContain('// Auto-generated by UI Builder');
  });
});

// ---------------------------------------------------------------------------
// generatePageCode
// ---------------------------------------------------------------------------

describe('generatePageCode', () => {
  it('imports React', () => {
    const result = splitTreeIntoSections(testTree);
    const code = generatePageCode(result);

    expect(code).toContain("import React from 'react';");
  });

  it('imports all section components', () => {
    const result = splitTreeIntoSections(testTree);
    const code = generatePageCode(result);

    expect(code).toContain(
      "import { HeroSection } from './HeroSection';"
    );
    expect(code).toContain(
      "import { FeaturesSection } from './FeaturesSection';"
    );
    expect(code).toContain(
      "import { FooterSection } from './FooterSection';"
    );
  });

  it('renders all sections inside a wrapper div', () => {
    const result = splitTreeIntoSections(testTree);
    const code = generatePageCode(result);

    expect(code).toContain('<HeroSection />');
    expect(code).toContain('<FeaturesSection />');
    expect(code).toContain('<FooterSection />');
    expect(code).toContain('max-w-7xl mx-auto');
  });

  it('exports the Page component', () => {
    const result = splitTreeIntoSections(testTree);
    const code = generatePageCode(result);

    expect(code).toContain('export function Page()');
  });
});

// ---------------------------------------------------------------------------
// SplitResult packageDeps
// ---------------------------------------------------------------------------

describe('SplitResult packageDeps', () => {
  it('collects unique dependencies across all sections', () => {
    const result = splitTreeIntoSections(testTree);

    // For the simplified export all deps come from the COMPONENT_NPM_DEPS map.
    // The test tree uses basic types so deps should be empty (or at least
    // deduplicated).
    expect(Array.isArray(result.packageDeps)).toBe(true);
    // Ensure no duplicates
    const unique = new Set(result.packageDeps);
    expect(unique.size).toBe(result.packageDeps.length);
  });
});

// ---------------------------------------------------------------------------
// Edge cases
// ---------------------------------------------------------------------------

describe('edge cases', () => {
  it('handles a tree with no children on root', () => {
    const tree: UITree = {
      root: 'solo',
      elements: {
        solo: { key: 'solo', type: 'Container', props: {} },
      },
    };

    const result = splitTreeIntoSections(tree);

    expect(result.sections).toHaveLength(0);
    expect(result.pageFile.sectionImports).toHaveLength(0);
  });

  it('handles a tree with a single section', () => {
    const tree: UITree = {
      root: 'root',
      elements: {
        root: {
          key: 'root',
          type: 'Container',
          props: {},
          children: ['only'],
        },
        only: { key: 'only', type: 'Text', props: { content: 'Hello' } },
      },
    };

    const result = splitTreeIntoSections(tree);

    expect(result.sections).toHaveLength(1);
    expect(result.sections[0].componentName).toBe('Only');
    expect(result.pageFile.sectionImports).toHaveLength(1);
  });

  it('handles root element not found gracefully', () => {
    const tree: UITree = {
      root: 'missing',
      elements: {},
    };

    const result = splitTreeIntoSections(tree);

    expect(result.sections).toHaveLength(0);
    expect(result.pageFile.componentName).toBe('Page');
  });
});
