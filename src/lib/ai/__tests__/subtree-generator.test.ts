import { describe, it, expect } from 'vitest';
import {
  extractSubtree,
  replaceSubtree,
  getSubtreeContext,
  generateSubtreePrompt,
  reKeySubtree,
  mergeSubtreeResult,
} from '../subtree-generator';
import type { UITree } from '../ui-generator';

// ============================================================================
// Test Fixtures
// ============================================================================

const sampleTree: UITree = {
  root: 'page',
  elements: {
    page: {
      key: 'page',
      type: 'Container',
      props: { maxWidth: 'lg' },
      children: ['header', 'content', 'footer'],
    },
    header: {
      key: 'header',
      type: 'Row',
      props: { justify: 'between' },
      children: ['logo', 'nav'],
    },
    logo: {
      key: 'logo',
      type: 'Heading',
      props: { level: '1', text: 'MyApp' },
    },
    nav: {
      key: 'nav',
      type: 'Row',
      props: { gap: 'md' },
      children: ['link1', 'link2'],
    },
    link1: {
      key: 'link1',
      type: 'Link',
      props: { text: 'Home', href: '/' },
    },
    link2: {
      key: 'link2',
      type: 'Link',
      props: { text: 'About', href: '/about' },
    },
    content: {
      key: 'content',
      type: 'Column',
      props: { gap: 'lg' },
      children: ['hero'],
    },
    hero: {
      key: 'hero',
      type: 'Hero',
      props: { title: 'Welcome', subtitle: 'Get started' },
    },
    footer: {
      key: 'footer',
      type: 'Footer',
      props: { copyright: '2026' },
    },
  },
};

// ============================================================================
// extractSubtree
// ============================================================================

describe('extractSubtree', () => {
  it('should extract the header subtree with all descendants', () => {
    const subtree = extractSubtree(sampleTree, 'header');

    expect(subtree.root).toBe('header');
    expect(Object.keys(subtree.elements)).toHaveLength(5);
    expect(subtree.elements).toHaveProperty('header');
    expect(subtree.elements).toHaveProperty('logo');
    expect(subtree.elements).toHaveProperty('nav');
    expect(subtree.elements).toHaveProperty('link1');
    expect(subtree.elements).toHaveProperty('link2');
  });

  it('should preserve element structure in extracted subtree', () => {
    const subtree = extractSubtree(sampleTree, 'header');

    expect(subtree.elements['header'].type).toBe('Row');
    expect(subtree.elements['header'].children).toEqual(['logo', 'nav']);
    expect(subtree.elements['nav'].children).toEqual(['link1', 'link2']);
    expect(subtree.elements['logo'].props).toEqual({ level: '1', text: 'MyApp' });
  });

  it('should extract a leaf node subtree (footer)', () => {
    const subtree = extractSubtree(sampleTree, 'footer');

    expect(subtree.root).toBe('footer');
    expect(Object.keys(subtree.elements)).toHaveLength(1);
    expect(subtree.elements['footer'].type).toBe('Footer');
    expect(subtree.elements['footer'].props).toEqual({ copyright: '2026' });
  });

  it('should extract the root and return the whole tree', () => {
    const subtree = extractSubtree(sampleTree, 'page');

    expect(subtree.root).toBe('page');
    expect(Object.keys(subtree.elements)).toHaveLength(
      Object.keys(sampleTree.elements).length
    );
    // All elements should be present
    for (const key of Object.keys(sampleTree.elements)) {
      expect(subtree.elements).toHaveProperty(key);
    }
  });

  it('should not include elements outside the subtree', () => {
    const subtree = extractSubtree(sampleTree, 'content');

    expect(subtree.root).toBe('content');
    expect(Object.keys(subtree.elements)).toHaveLength(2);
    expect(subtree.elements).toHaveProperty('content');
    expect(subtree.elements).toHaveProperty('hero');
    expect(subtree.elements).not.toHaveProperty('header');
    expect(subtree.elements).not.toHaveProperty('footer');
    expect(subtree.elements).not.toHaveProperty('page');
  });

  it('should throw for a non-existent key', () => {
    expect(() => extractSubtree(sampleTree, 'nonexistent')).toThrow(
      'Element "nonexistent" not found in tree'
    );
  });

  it('should return a deep copy, not a reference', () => {
    const subtree = extractSubtree(sampleTree, 'header');

    // Mutating the subtree should not affect the original
    subtree.elements['header'].props.justify = 'center';
    expect(sampleTree.elements['header'].props.justify).toBe('between');
  });
});

// ============================================================================
// replaceSubtree
// ============================================================================

describe('replaceSubtree', () => {
  it('should replace the header subtree with a new one', () => {
    const newHeader: UITree = {
      root: 'newHeader',
      elements: {
        newHeader: {
          key: 'newHeader',
          type: 'Row',
          props: { justify: 'center' },
          children: ['brand'],
        },
        brand: {
          key: 'brand',
          type: 'Heading',
          props: { level: '1', text: 'NewBrand' },
        },
      },
    };

    const result = replaceSubtree(sampleTree, 'header', newHeader);

    // Old header subtree elements should be gone
    expect(result.elements).not.toHaveProperty('header');
    expect(result.elements).not.toHaveProperty('logo');
    expect(result.elements).not.toHaveProperty('nav');
    expect(result.elements).not.toHaveProperty('link1');
    expect(result.elements).not.toHaveProperty('link2');

    // New elements should be present
    expect(result.elements).toHaveProperty('newHeader');
    expect(result.elements).toHaveProperty('brand');

    // Parent should reference the new root
    expect(result.elements['page'].children).toContain('newHeader');
    expect(result.elements['page'].children).not.toContain('header');

    // Other elements should be preserved
    expect(result.elements).toHaveProperty('content');
    expect(result.elements).toHaveProperty('footer');
    expect(result.root).toBe('page');
  });

  it('should preserve sibling order when replacing', () => {
    const newHeader: UITree = {
      root: 'newHeader',
      elements: {
        newHeader: {
          key: 'newHeader',
          type: 'Row',
          props: {},
        },
      },
    };

    const result = replaceSubtree(sampleTree, 'header', newHeader);
    // Original order: ['header', 'content', 'footer']
    // After replacement: ['newHeader', 'content', 'footer']
    expect(result.elements['page'].children).toEqual([
      'newHeader',
      'content',
      'footer',
    ]);
  });

  it('should replace the root with a new tree', () => {
    const newTree: UITree = {
      root: 'newRoot',
      elements: {
        newRoot: {
          key: 'newRoot',
          type: 'Container',
          props: { maxWidth: 'xl' },
          children: ['child1'],
        },
        child1: {
          key: 'child1',
          type: 'Text',
          props: { content: 'Hello' },
        },
      },
    };

    const result = replaceSubtree(sampleTree, 'page', newTree);

    expect(result.root).toBe('newRoot');
    expect(Object.keys(result.elements)).toHaveLength(2);
    expect(result.elements).toHaveProperty('newRoot');
    expect(result.elements).toHaveProperty('child1');
    // None of the old elements should remain
    expect(result.elements).not.toHaveProperty('page');
    expect(result.elements).not.toHaveProperty('header');
  });

  it('should throw for a non-existent oldRootKey', () => {
    const newSubtree: UITree = {
      root: 'x',
      elements: { x: { key: 'x', type: 'Text', props: {} } },
    };
    expect(() => replaceSubtree(sampleTree, 'nonexistent', newSubtree)).toThrow(
      'Element "nonexistent" not found in tree'
    );
  });

  it('should not mutate the original tree', () => {
    const newHeader: UITree = {
      root: 'newHeader',
      elements: {
        newHeader: {
          key: 'newHeader',
          type: 'Row',
          props: {},
        },
      },
    };

    replaceSubtree(sampleTree, 'header', newHeader);

    // Original tree should be unchanged
    expect(sampleTree.elements).toHaveProperty('header');
    expect(sampleTree.elements['page'].children).toContain('header');
  });
});

// ============================================================================
// getSubtreeContext
// ============================================================================

describe('getSubtreeContext', () => {
  it('should return correct context for header (non-root element)', () => {
    const context = getSubtreeContext(sampleTree, 'header');

    expect(context.parentType).toBe('Container');
    expect(context.siblingTypes).toEqual(['Column', 'Footer']);
    expect(context.fullTreeElementCount).toBe(9);
  });

  it('should return correct context for root (no parent, no siblings)', () => {
    const context = getSubtreeContext(sampleTree, 'page');

    expect(context.parentType).toBeUndefined();
    expect(context.siblingTypes).toBeUndefined();
    expect(context.fullTreeElementCount).toBe(9);
  });

  it('should return correct context for a deeply nested element', () => {
    const context = getSubtreeContext(sampleTree, 'link1');

    expect(context.parentType).toBe('Row');
    expect(context.siblingTypes).toEqual(['Link']);
    expect(context.fullTreeElementCount).toBe(9);
  });

  it('should return correct context for a leaf with no siblings', () => {
    const context = getSubtreeContext(sampleTree, 'hero');

    expect(context.parentType).toBe('Column');
    expect(context.siblingTypes).toEqual([]);
    expect(context.fullTreeElementCount).toBe(9);
  });

  it('should throw for a non-existent key', () => {
    expect(() => getSubtreeContext(sampleTree, 'nonexistent')).toThrow(
      'Element "nonexistent" not found in tree'
    );
  });
});

// ============================================================================
// generateSubtreePrompt
// ============================================================================

describe('generateSubtreePrompt', () => {
  it('should include the subtree JSON in the prompt', () => {
    const subtree = extractSubtree(sampleTree, 'footer');
    const context = getSubtreeContext(sampleTree, 'footer');
    const prompt = generateSubtreePrompt(subtree, 'Add social links', context);

    // Should contain the serialized subtree
    expect(prompt).toContain('"root": "footer"');
    expect(prompt).toContain('"copyright": "2026"');
  });

  it('should include the user request', () => {
    const subtree = extractSubtree(sampleTree, 'footer');
    const context = getSubtreeContext(sampleTree, 'footer');
    const prompt = generateSubtreePrompt(subtree, 'Add social links', context);

    expect(prompt).toContain('Add social links');
  });

  it('should include parent and sibling context', () => {
    const subtree = extractSubtree(sampleTree, 'header');
    const context = getSubtreeContext(sampleTree, 'header');
    const prompt = generateSubtreePrompt(subtree, 'Make it sticky', context);

    expect(prompt).toContain('Container');
    expect(prompt).toContain('Column');
    expect(prompt).toContain('Footer');
  });

  it('should include the root key preservation constraint', () => {
    const subtree = extractSubtree(sampleTree, 'header');
    const context = getSubtreeContext(sampleTree, 'header');
    const prompt = generateSubtreePrompt(subtree, 'Redesign', context);

    expect(prompt).toContain('root element key MUST remain "header"');
  });

  it('should include element count context', () => {
    const subtree = extractSubtree(sampleTree, 'header');
    const context = getSubtreeContext(sampleTree, 'header');
    const prompt = generateSubtreePrompt(subtree, 'Update', context);

    expect(prompt).toContain('9 elements total');
  });

  it('should include framework when provided', () => {
    const subtree = extractSubtree(sampleTree, 'header');
    const context: SubtreeContext = {
      ...getSubtreeContext(sampleTree, 'header'),
      framework: 'tailwind',
    };
    const prompt = generateSubtreePrompt(subtree, 'Update', context);

    expect(prompt).toContain('tailwind');
  });

  it('should handle root element context (no parent/siblings)', () => {
    const subtree = extractSubtree(sampleTree, 'page');
    const context = getSubtreeContext(sampleTree, 'page');
    const prompt = generateSubtreePrompt(subtree, 'Redesign everything', context);

    // Should not contain parent/sibling lines
    expect(prompt).not.toContain('Parent element type');
    expect(prompt).not.toContain('Sibling element types');
    expect(prompt).toContain('Redesign everything');
  });
});

// ============================================================================
// reKeySubtree
// ============================================================================

describe('reKeySubtree', () => {
  it('should prefix all keys', () => {
    const subtree = extractSubtree(sampleTree, 'nav');
    const rekeyed = reKeySubtree(subtree, 'v2_');

    expect(rekeyed.root).toBe('v2_nav');
    expect(Object.keys(rekeyed.elements)).toEqual(
      expect.arrayContaining(['v2_nav', 'v2_link1', 'v2_link2'])
    );
    expect(Object.keys(rekeyed.elements)).toHaveLength(3);
  });

  it('should update children references', () => {
    const subtree = extractSubtree(sampleTree, 'nav');
    const rekeyed = reKeySubtree(subtree, 'v2_');

    expect(rekeyed.elements['v2_nav'].children).toEqual(['v2_link1', 'v2_link2']);
  });

  it('should update element.key to match the new key', () => {
    const subtree = extractSubtree(sampleTree, 'nav');
    const rekeyed = reKeySubtree(subtree, 'v2_');

    for (const [key, element] of Object.entries(rekeyed.elements)) {
      expect(element.key).toBe(key);
    }
  });

  it('should preserve props', () => {
    const subtree = extractSubtree(sampleTree, 'nav');
    const rekeyed = reKeySubtree(subtree, 'v2_');

    expect(rekeyed.elements['v2_nav'].props).toEqual({ gap: 'md' });
    expect(rekeyed.elements['v2_link1'].props).toEqual({ text: 'Home', href: '/' });
  });

  it('should handle leaf nodes without children', () => {
    const subtree = extractSubtree(sampleTree, 'footer');
    const rekeyed = reKeySubtree(subtree, 'new_');

    expect(rekeyed.root).toBe('new_footer');
    expect(rekeyed.elements['new_footer'].children).toBeUndefined();
  });

  it('should work with a larger subtree', () => {
    const subtree = extractSubtree(sampleTree, 'header');
    const rekeyed = reKeySubtree(subtree, 'pfx_');

    expect(rekeyed.root).toBe('pfx_header');
    expect(Object.keys(rekeyed.elements)).toHaveLength(5);
    expect(rekeyed.elements['pfx_header'].children).toEqual(['pfx_logo', 'pfx_nav']);
    expect(rekeyed.elements['pfx_nav'].children).toEqual(['pfx_link1', 'pfx_link2']);
  });
});

// ============================================================================
// mergeSubtreeResult
// ============================================================================

describe('mergeSubtreeResult', () => {
  it('should merge a generated subtree back into the full tree', () => {
    const generatedSubtree: UITree = {
      root: 'header',
      elements: {
        header: {
          key: 'header',
          type: 'Row',
          props: { justify: 'center', sticky: true },
          children: ['logo', 'searchBar'],
        },
        logo: {
          key: 'logo',
          type: 'Heading',
          props: { level: '1', text: 'NewApp' },
        },
        searchBar: {
          key: 'searchBar',
          type: 'Input',
          props: { placeholder: 'Search...' },
        },
      },
    };

    const result = mergeSubtreeResult(sampleTree, 'header', generatedSubtree);

    // Root should be unchanged
    expect(result.root).toBe('page');

    // Old nav elements should be gone
    expect(result.elements).not.toHaveProperty('nav');
    expect(result.elements).not.toHaveProperty('link1');
    expect(result.elements).not.toHaveProperty('link2');

    // New elements should be present
    expect(result.elements).toHaveProperty('header');
    expect(result.elements).toHaveProperty('searchBar');
    expect(result.elements['header'].props.sticky).toBe(true);

    // Rest of tree should be intact
    expect(result.elements).toHaveProperty('content');
    expect(result.elements).toHaveProperty('hero');
    expect(result.elements).toHaveProperty('footer');
    expect(result.elements['page'].children).toContain('header');
  });

  it('should throw if generated subtree root does not match target key', () => {
    const badSubtree: UITree = {
      root: 'wrongKey',
      elements: {
        wrongKey: {
          key: 'wrongKey',
          type: 'Row',
          props: {},
        },
      },
    };

    expect(() => mergeSubtreeResult(sampleTree, 'header', badSubtree)).toThrow(
      'does not match target key "header"'
    );
  });

  it('should throw if generated subtree is missing root in elements', () => {
    const badSubtree: UITree = {
      root: 'header',
      elements: {
        somethingElse: {
          key: 'somethingElse',
          type: 'Text',
          props: {},
        },
      },
    };

    expect(() => mergeSubtreeResult(sampleTree, 'header', badSubtree)).toThrow(
      'root "header" not found in its elements'
    );
  });

  it('should throw if generated subtree is missing elements', () => {
    const badSubtree = {
      root: 'header',
      elements: null,
    } as unknown as UITree;

    expect(() => mergeSubtreeResult(sampleTree, 'header', badSubtree)).toThrow(
      'missing elements'
    );
  });

  it('should throw if generated subtree is missing root key', () => {
    const badSubtree = {
      root: '',
      elements: {},
    } as UITree;

    expect(() => mergeSubtreeResult(sampleTree, 'header', badSubtree)).toThrow(
      'missing a root key'
    );
  });

  it('should handle replacing a leaf node', () => {
    const generatedSubtree: UITree = {
      root: 'footer',
      elements: {
        footer: {
          key: 'footer',
          type: 'Footer',
          props: { copyright: '2026' },
          children: ['socialLinks'],
        },
        socialLinks: {
          key: 'socialLinks',
          type: 'Row',
          props: { gap: 'sm' },
          children: ['twitter', 'github'],
        },
        twitter: {
          key: 'twitter',
          type: 'Link',
          props: { text: 'Twitter', href: 'https://twitter.com' },
        },
        github: {
          key: 'github',
          type: 'Link',
          props: { text: 'GitHub', href: 'https://github.com' },
        },
      },
    };

    const result = mergeSubtreeResult(sampleTree, 'footer', generatedSubtree);

    expect(result.elements).toHaveProperty('footer');
    expect(result.elements).toHaveProperty('socialLinks');
    expect(result.elements).toHaveProperty('twitter');
    expect(result.elements).toHaveProperty('github');
    expect(result.elements['footer'].children).toEqual(['socialLinks']);

    // The rest of the tree should remain intact
    expect(result.elements).toHaveProperty('header');
    expect(result.elements).toHaveProperty('content');
    expect(result.elements['page'].children).toContain('footer');
  });

  it('should handle a complete end-to-end flow', () => {
    // 1. Extract
    const subtree = extractSubtree(sampleTree, 'header');
    expect(subtree.root).toBe('header');

    // 2. Get context
    const context = getSubtreeContext(sampleTree, 'header');
    expect(context.parentType).toBe('Container');

    // 3. Generate prompt
    const prompt = generateSubtreePrompt(subtree, 'Add a search bar', context);
    expect(prompt).toContain('header');
    expect(prompt).toContain('Add a search bar');

    // 4. Simulate AI generating a new subtree
    const generatedSubtree: UITree = {
      root: 'header',
      elements: {
        header: {
          key: 'header',
          type: 'Row',
          props: { justify: 'between', align: 'center' },
          children: ['logo', 'search', 'nav'],
        },
        logo: {
          key: 'logo',
          type: 'Heading',
          props: { level: '1', text: 'MyApp' },
        },
        search: {
          key: 'search',
          type: 'Input',
          props: { placeholder: 'Search...', type: 'text' },
        },
        nav: {
          key: 'nav',
          type: 'Row',
          props: { gap: 'md' },
          children: ['link1', 'link2'],
        },
        link1: {
          key: 'link1',
          type: 'Link',
          props: { text: 'Home', href: '/' },
        },
        link2: {
          key: 'link2',
          type: 'Link',
          props: { text: 'About', href: '/about' },
        },
      },
    };

    // 5. Merge back
    const result = mergeSubtreeResult(sampleTree, 'header', generatedSubtree);

    expect(result.root).toBe('page');
    expect(result.elements['header'].children).toContain('search');
    expect(result.elements['search'].type).toBe('Input');
    expect(result.elements).toHaveProperty('content');
    expect(result.elements).toHaveProperty('footer');
    expect(Object.keys(result.elements)).toHaveLength(10); // 9 original - 5 old header + 6 new header = 10
  });
});
