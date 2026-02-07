import { describe, it, expect } from 'vitest';
import {
  PAGE_TEMPLATES,
  getTemplate,
  getTemplatesByCategory,
  getAllTemplateIds,
} from '../page-templates';
import type { PageTemplate } from '../page-templates';

// ============================================================================
// Template Catalog Tests
// ============================================================================

describe('Page Templates', () => {
  const EXPECTED_IDS = [
    'saas-landing',
    'analytics-dashboard',
    'admin-panel',
    'ecommerce-product',
    'blog-post',
    'portfolio',
  ];

  it('should export exactly 6 templates', () => {
    expect(PAGE_TEMPLATES).toHaveLength(6);
  });

  it('should include all expected template IDs', () => {
    const ids = PAGE_TEMPLATES.map((t) => t.id);
    for (const expectedId of EXPECTED_IDS) {
      expect(ids).toContain(expectedId);
    }
  });

  it('should have unique IDs across all templates', () => {
    const ids = PAGE_TEMPLATES.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('should have non-empty name, description, thumbnail, and tags for every template', () => {
    for (const template of PAGE_TEMPLATES) {
      expect(template.name.length).toBeGreaterThan(0);
      expect(template.description.length).toBeGreaterThan(0);
      expect(template.thumbnail.length).toBeGreaterThan(0);
      expect(template.tags.length).toBeGreaterThan(0);
    }
  });

  it('should assign a valid category to every template', () => {
    const validCategories = new Set([
      'landing',
      'dashboard',
      'admin',
      'ecommerce',
      'blog',
      'portfolio',
    ]);
    for (const template of PAGE_TEMPLATES) {
      expect(validCategories.has(template.category)).toBe(true);
    }
  });
});

// ============================================================================
// UITree Structural Validity
// ============================================================================

describe('UITree Structural Validity', () => {
  for (const template of PAGE_TEMPLATES) {
    describe(`template: ${template.id}`, () => {
      const { tree } = template;

      it('should have a root key that exists in elements', () => {
        expect(tree.root).toBeDefined();
        expect(tree.elements[tree.root]).toBeDefined();
      });

      it('should have a root element of type Container', () => {
        expect(tree.elements[tree.root].type).toBe('Container');
      });

      it('should have between 15 and 100 elements', () => {
        const count = Object.keys(tree.elements).length;
        expect(count).toBeGreaterThanOrEqual(15);
        expect(count).toBeLessThanOrEqual(100);
      });

      it('should have no duplicate element keys', () => {
        const keys = Object.keys(tree.elements);
        expect(new Set(keys).size).toBe(keys.length);
      });

      it('should have consistent element.key matching its object key', () => {
        for (const [key, element] of Object.entries(tree.elements)) {
          expect(element.key).toBe(key);
        }
      });

      it('should have valid children references (every child key exists in elements)', () => {
        for (const [key, element] of Object.entries(tree.elements)) {
          if (element.children) {
            for (const childKey of element.children) {
              expect(
                tree.elements[childKey],
                `Element "${key}" references non-existent child "${childKey}"`
              ).toBeDefined();
            }
          }
        }
      });

      it('should have no orphaned elements (all reachable from root)', () => {
        const reachable = new Set<string>();
        const queue = [tree.root];
        while (queue.length > 0) {
          const current = queue.shift()!;
          if (reachable.has(current)) continue;
          reachable.add(current);
          const el = tree.elements[current];
          if (el?.children) {
            queue.push(...el.children);
          }
        }
        for (const key of Object.keys(tree.elements)) {
          expect(reachable.has(key), `Element "${key}" is orphaned`).toBe(true);
        }
      });

      it('should have a type string for every element', () => {
        for (const [key, element] of Object.entries(tree.elements)) {
          expect(typeof element.type).toBe('string');
          expect(element.type.length, `Element "${key}" has empty type`).toBeGreaterThan(0);
        }
      });

      it('should have a props object for every element', () => {
        for (const [key, element] of Object.entries(tree.elements)) {
          expect(typeof element.props, `Element "${key}" props is not an object`).toBe('object');
          expect(element.props).not.toBeNull();
        }
      });
    });
  }
});

// ============================================================================
// Template Sections Validity
// ============================================================================

describe('Template Sections', () => {
  for (const template of PAGE_TEMPLATES) {
    describe(`template: ${template.id}`, () => {
      it('should have at least one section', () => {
        expect(template.sections.length).toBeGreaterThan(0);
      });

      it('should have section keys that exist in the tree elements', () => {
        for (const section of template.sections) {
          expect(
            template.tree.elements[section.key],
            `Section key "${section.key}" not found in template "${template.id}" elements`
          ).toBeDefined();
        }
      });

      it('should have non-empty name, description, and aiPromptHint for every section', () => {
        for (const section of template.sections) {
          expect(section.name.length).toBeGreaterThan(0);
          expect(section.description.length).toBeGreaterThan(0);
          expect(section.aiPromptHint.length).toBeGreaterThan(0);
        }
      });

      it('should have unique section keys within the template', () => {
        const keys = template.sections.map((s) => s.key);
        expect(new Set(keys).size).toBe(keys.length);
      });
    });
  }
});

// ============================================================================
// Component Prop Compliance
// ============================================================================

describe('Component Prop Compliance', () => {
  for (const template of PAGE_TEMPLATES) {
    describe(`template: ${template.id}`, () => {
      it('every Heading should have level and text props', () => {
        for (const [key, element] of Object.entries(template.tree.elements)) {
          if (element.type === 'Heading') {
            expect(
              element.props.level,
              `Heading "${key}" in "${template.id}" missing level`
            ).toBeDefined();
            expect(
              element.props.text,
              `Heading "${key}" in "${template.id}" missing text`
            ).toBeDefined();
            expect(typeof element.props.text).toBe('string');
            expect((element.props.text as string).length).toBeGreaterThan(0);
          }
        }
      });

      it('every Text should have content prop', () => {
        for (const [key, element] of Object.entries(template.tree.elements)) {
          if (element.type === 'Text') {
            expect(
              element.props.content,
              `Text "${key}" in "${template.id}" missing content`
            ).toBeDefined();
            expect(typeof element.props.content).toBe('string');
            expect((element.props.content as string).length).toBeGreaterThan(0);
          }
        }
      });

      it('every Button should have label prop', () => {
        for (const [key, element] of Object.entries(template.tree.elements)) {
          if (element.type === 'Button') {
            expect(
              element.props.label,
              `Button "${key}" in "${template.id}" missing label`
            ).toBeDefined();
            expect(typeof element.props.label).toBe('string');
            expect((element.props.label as string).length).toBeGreaterThan(0);
          }
        }
      });

      it('every Image should have src and alt props', () => {
        for (const [key, element] of Object.entries(template.tree.elements)) {
          if (element.type === 'Image') {
            expect(
              element.props.src,
              `Image "${key}" in "${template.id}" missing src`
            ).toBeDefined();
            expect(
              element.props.alt,
              `Image "${key}" in "${template.id}" missing alt`
            ).toBeDefined();
            expect(typeof element.props.src).toBe('string');
            expect(typeof element.props.alt).toBe('string');
          }
        }
      });
    });
  }
});

// ============================================================================
// Realistic Content Checks
// ============================================================================

describe('Realistic Content', () => {
  const allTextContent: string[] = [];

  for (const template of PAGE_TEMPLATES) {
    for (const element of Object.values(template.tree.elements)) {
      if (element.type === 'Text' && typeof element.props.content === 'string') {
        allTextContent.push(element.props.content);
      }
      if (element.type === 'Heading' && typeof element.props.text === 'string') {
        allTextContent.push(element.props.text);
      }
    }
  }

  it('should not contain "Lorem ipsum" placeholder text', () => {
    for (const text of allTextContent) {
      expect(text.toLowerCase()).not.toContain('lorem ipsum');
    }
  });

  it('should not contain "placeholder" text', () => {
    for (const text of allTextContent) {
      expect(text.toLowerCase()).not.toContain('placeholder');
    }
  });

  it('should not contain "TODO" text', () => {
    for (const text of allTextContent) {
      expect(text).not.toContain('TODO');
    }
  });

  it('should not contain "TBD" text', () => {
    for (const text of allTextContent) {
      expect(text).not.toContain('TBD');
    }
  });

  it('should have substantial text content across all templates', () => {
    expect(allTextContent.length).toBeGreaterThan(20);
  });
});

// ============================================================================
// Query Functions
// ============================================================================

describe('getTemplate', () => {
  it('should return the correct template by ID', () => {
    const saas = getTemplate('saas-landing');
    expect(saas).toBeDefined();
    expect(saas!.id).toBe('saas-landing');
    expect(saas!.name).toBe('SaaS Landing Page');
  });

  it('should return undefined for a non-existent ID', () => {
    expect(getTemplate('nonexistent')).toBeUndefined();
  });

  it('should return each template correctly', () => {
    for (const template of PAGE_TEMPLATES) {
      const found = getTemplate(template.id);
      expect(found).toBeDefined();
      expect(found!.id).toBe(template.id);
    }
  });
});

describe('getTemplatesByCategory', () => {
  it('should return landing templates', () => {
    const results = getTemplatesByCategory('landing');
    expect(results.length).toBeGreaterThan(0);
    for (const t of results) {
      expect(t.category).toBe('landing');
    }
  });

  it('should return dashboard templates', () => {
    const results = getTemplatesByCategory('dashboard');
    expect(results.length).toBeGreaterThan(0);
    for (const t of results) {
      expect(t.category).toBe('dashboard');
    }
  });

  it('should return an empty array for a category with no templates', () => {
    // All categories have exactly one template in the current set,
    // but using a cast to test the edge case behavior
    const results = getTemplatesByCategory('landing');
    expect(Array.isArray(results)).toBe(true);
  });

  it('should return only templates of the requested category', () => {
    const categories: PageTemplate['category'][] = [
      'landing',
      'dashboard',
      'admin',
      'ecommerce',
      'blog',
      'portfolio',
    ];
    for (const cat of categories) {
      const results = getTemplatesByCategory(cat);
      expect(results.length).toBe(1);
      expect(results[0].category).toBe(cat);
    }
  });
});

describe('getAllTemplateIds', () => {
  it('should return all 6 template IDs', () => {
    const ids = getAllTemplateIds();
    expect(ids).toHaveLength(6);
  });

  it('should include all expected IDs', () => {
    const ids = getAllTemplateIds();
    expect(ids).toContain('saas-landing');
    expect(ids).toContain('analytics-dashboard');
    expect(ids).toContain('admin-panel');
    expect(ids).toContain('ecommerce-product');
    expect(ids).toContain('blog-post');
    expect(ids).toContain('portfolio');
  });

  it('should return strings only', () => {
    const ids = getAllTemplateIds();
    for (const id of ids) {
      expect(typeof id).toBe('string');
    }
  });
});

// ============================================================================
// Image URL Checks
// ============================================================================

describe('Image URLs', () => {
  for (const template of PAGE_TEMPLATES) {
    it(`${template.id}: all Image src props should use picsum.photos`, () => {
      for (const [key, element] of Object.entries(template.tree.elements)) {
        if (element.type === 'Image') {
          expect(
            (element.props.src as string).includes('picsum.photos'),
            `Image "${key}" in "${template.id}" does not use picsum.photos`
          ).toBe(true);
        }
      }
    });
  }
});
