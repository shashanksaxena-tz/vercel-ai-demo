/**
 * Tests for the central Builder Store
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { useBuilderStore } from '../builder-store';
import type { UITree, UIElement } from '@json-render/core';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Reset the store to initial state before each test. */
function resetStore() {
  useBuilderStore.setState(useBuilderStore.getInitialState());
}

/** Create a simple test tree:
 *
 *   root
 *   ├── child-1
 *   │   ├── grandchild-1
 *   │   └── grandchild-2
 *   └── child-2
 */
function createTestTree(): UITree {
  return {
    root: 'root',
    elements: {
      root: {
        key: 'root',
        type: 'Container',
        props: { className: 'root-class' },
        children: ['child-1', 'child-2'],
      },
      'child-1': {
        key: 'child-1',
        type: 'Card',
        props: { title: 'Card One' },
        children: ['grandchild-1', 'grandchild-2'],
      },
      'child-2': {
        key: 'child-2',
        type: 'Button',
        props: { label: 'Click me' },
      },
      'grandchild-1': {
        key: 'grandchild-1',
        type: 'Text',
        props: { content: 'Hello' },
      },
      'grandchild-2': {
        key: 'grandchild-2',
        type: 'Text',
        props: { content: 'World' },
      },
    },
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('BuilderStore', () => {
  beforeEach(() => {
    resetStore();
  });

  // -------------------------------------------------------------------------
  // Initial state
  // -------------------------------------------------------------------------

  describe('initial state', () => {
    it('should have null tree', () => {
      const { tree } = useBuilderStore.getState();
      expect(tree).toBeNull();
    });

    it('should have null selection and hover', () => {
      const { selectedKey, hoveredKey } = useBuilderStore.getState();
      expect(selectedKey).toBeNull();
      expect(hoveredKey).toBeNull();
    });

    it('should default to preview mode, desktop viewport, no panels', () => {
      const { mode, viewport, leftPanel, rightPanel } =
        useBuilderStore.getState();
      expect(mode).toBe('preview');
      expect(viewport).toBe('desktop');
      expect(leftPanel).toBeNull();
      expect(rightPanel).toBeNull();
    });

    it('should default framework to shadcn', () => {
      const { framework } = useBuilderStore.getState();
      expect(framework).toBe('shadcn');
    });
  });

  // -------------------------------------------------------------------------
  // setTree
  // -------------------------------------------------------------------------

  describe('setTree', () => {
    it('should set a new tree', () => {
      const tree = createTestTree();
      useBuilderStore.getState().setTree(tree);

      const { tree: stored } = useBuilderStore.getState();
      expect(stored).not.toBeNull();
      expect(stored!.root).toBe('root');
      expect(Object.keys(stored!.elements)).toHaveLength(5);
    });

    it('should set tree to null', () => {
      useBuilderStore.getState().setTree(createTestTree());
      useBuilderStore.getState().setTree(null);

      const { tree } = useBuilderStore.getState();
      expect(tree).toBeNull();
    });

    it('should replace an existing tree', () => {
      useBuilderStore.getState().setTree(createTestTree());

      const newTree: UITree = {
        root: 'new-root',
        elements: {
          'new-root': {
            key: 'new-root',
            type: 'Box',
            props: {},
          },
        },
      };
      useBuilderStore.getState().setTree(newTree);

      const { tree } = useBuilderStore.getState();
      expect(tree!.root).toBe('new-root');
      expect(Object.keys(tree!.elements)).toHaveLength(1);
    });
  });

  // -------------------------------------------------------------------------
  // updateElement
  // -------------------------------------------------------------------------

  describe('updateElement', () => {
    it('should update element props', () => {
      useBuilderStore.getState().setTree(createTestTree());
      useBuilderStore
        .getState()
        .updateElement('child-2', { props: { label: 'Updated' } });

      const el = useBuilderStore.getState().tree!.elements['child-2'];
      expect(el.props).toEqual({ label: 'Updated' });
    });

    it('should update element type', () => {
      useBuilderStore.getState().setTree(createTestTree());
      useBuilderStore.getState().updateElement('child-2', { type: 'Link' });

      const el = useBuilderStore.getState().tree!.elements['child-2'];
      expect(el.type).toBe('Link');
    });

    it('should no-op when tree is null', () => {
      // Should not throw
      useBuilderStore.getState().updateElement('child-2', { type: 'Link' });
      expect(useBuilderStore.getState().tree).toBeNull();
    });

    it('should no-op for a non-existent key', () => {
      useBuilderStore.getState().setTree(createTestTree());
      useBuilderStore
        .getState()
        .updateElement('non-existent', { type: 'Link' });

      // Tree remains unchanged
      expect(
        Object.keys(useBuilderStore.getState().tree!.elements),
      ).toHaveLength(5);
    });
  });

  // -------------------------------------------------------------------------
  // addElement
  // -------------------------------------------------------------------------

  describe('addElement', () => {
    it('should add an element to a parent (appended)', () => {
      useBuilderStore.getState().setTree(createTestTree());

      const newEl: UIElement = {
        key: 'new-child',
        type: 'Badge',
        props: { text: 'New' },
      };
      useBuilderStore.getState().addElement(newEl, 'root');

      const tree = useBuilderStore.getState().tree!;
      expect(tree.elements['new-child']).toBeDefined();
      expect(tree.elements['root'].children).toContain('new-child');
      expect(tree.elements['root'].children!.at(-1)).toBe('new-child');
    });

    it('should add an element at a specific index', () => {
      useBuilderStore.getState().setTree(createTestTree());

      const newEl: UIElement = {
        key: 'new-child',
        type: 'Badge',
        props: { text: 'New' },
      };
      useBuilderStore.getState().addElement(newEl, 'root', 0);

      const children = useBuilderStore.getState().tree!.elements['root'].children!;
      expect(children[0]).toBe('new-child');
      expect(children).toHaveLength(3);
    });

    it('should create children array if parent has none', () => {
      useBuilderStore.getState().setTree(createTestTree());

      const newEl: UIElement = {
        key: 'sub-text',
        type: 'Span',
        props: {},
      };
      // child-2 (Button) has no children array
      useBuilderStore.getState().addElement(newEl, 'child-2');

      const parent = useBuilderStore.getState().tree!.elements['child-2'];
      expect(parent.children).toEqual(['sub-text']);
    });

    it('should no-op when tree is null', () => {
      const newEl: UIElement = {
        key: 'x',
        type: 'Box',
        props: {},
      };
      useBuilderStore.getState().addElement(newEl, 'root');
      expect(useBuilderStore.getState().tree).toBeNull();
    });
  });

  // -------------------------------------------------------------------------
  // removeElement
  // -------------------------------------------------------------------------

  describe('removeElement', () => {
    it('should remove a leaf element', () => {
      useBuilderStore.getState().setTree(createTestTree());
      useBuilderStore.getState().removeElement('child-2');

      const tree = useBuilderStore.getState().tree!;
      expect(tree.elements['child-2']).toBeUndefined();
      expect(tree.elements['root'].children).toEqual(['child-1']);
    });

    it('should recursively remove children', () => {
      useBuilderStore.getState().setTree(createTestTree());
      useBuilderStore.getState().removeElement('child-1');

      const tree = useBuilderStore.getState().tree!;
      expect(tree.elements['child-1']).toBeUndefined();
      expect(tree.elements['grandchild-1']).toBeUndefined();
      expect(tree.elements['grandchild-2']).toBeUndefined();
      expect(tree.elements['root'].children).toEqual(['child-2']);
      // Only root + child-2 remain
      expect(Object.keys(tree.elements)).toHaveLength(2);
    });

    it('should not remove the root element', () => {
      useBuilderStore.getState().setTree(createTestTree());
      useBuilderStore.getState().removeElement('root');

      const tree = useBuilderStore.getState().tree!;
      expect(tree.elements['root']).toBeDefined();
      expect(Object.keys(tree.elements)).toHaveLength(5);
    });

    it('should clear selectedKey if removed element was selected', () => {
      useBuilderStore.getState().setTree(createTestTree());
      useBuilderStore.getState().selectElement('grandchild-1');
      useBuilderStore.getState().removeElement('child-1');

      expect(useBuilderStore.getState().selectedKey).toBeNull();
    });

    it('should clear hoveredKey if removed element was hovered', () => {
      useBuilderStore.getState().setTree(createTestTree());
      useBuilderStore.getState().hoverElement('grandchild-2');
      useBuilderStore.getState().removeElement('child-1');

      expect(useBuilderStore.getState().hoveredKey).toBeNull();
    });

    it('should no-op when tree is null', () => {
      useBuilderStore.getState().removeElement('anything');
      expect(useBuilderStore.getState().tree).toBeNull();
    });
  });

  // -------------------------------------------------------------------------
  // moveElement
  // -------------------------------------------------------------------------

  describe('moveElement', () => {
    it('should move element to a new parent', () => {
      useBuilderStore.getState().setTree(createTestTree());
      useBuilderStore.getState().moveElement('grandchild-1', 'child-2');

      const tree = useBuilderStore.getState().tree!;
      // Removed from old parent
      expect(tree.elements['child-1'].children).toEqual(['grandchild-2']);
      // Added to new parent
      expect(tree.elements['child-2'].children).toEqual(['grandchild-1']);
    });

    it('should move element to a specific index in new parent', () => {
      useBuilderStore.getState().setTree(createTestTree());
      useBuilderStore.getState().moveElement('child-2', 'child-1', 0);

      const tree = useBuilderStore.getState().tree!;
      // child-2 is now the first child of child-1
      expect(tree.elements['child-1'].children).toEqual([
        'child-2',
        'grandchild-1',
        'grandchild-2',
      ]);
      // Removed from root
      expect(tree.elements['root'].children).toEqual(['child-1']);
    });

    it('should no-op when tree is null', () => {
      useBuilderStore.getState().moveElement('a', 'b');
      expect(useBuilderStore.getState().tree).toBeNull();
    });

    it('should no-op for non-existent element', () => {
      useBuilderStore.getState().setTree(createTestTree());
      useBuilderStore.getState().moveElement('non-existent', 'root');

      const tree = useBuilderStore.getState().tree!;
      expect(tree.elements['root'].children).toEqual(['child-1', 'child-2']);
    });
  });

  // -------------------------------------------------------------------------
  // duplicateElement
  // -------------------------------------------------------------------------

  describe('duplicateElement', () => {
    it('should duplicate a leaf element', () => {
      useBuilderStore.getState().setTree(createTestTree());

      const before = Object.keys(useBuilderStore.getState().tree!.elements).length;
      useBuilderStore.getState().duplicateElement('child-2');
      const after = Object.keys(useBuilderStore.getState().tree!.elements).length;

      // One new element added
      expect(after).toBe(before + 1);

      // Parent now has 3 children, clone is right after original
      const rootChildren = useBuilderStore.getState().tree!.elements['root'].children!;
      expect(rootChildren).toHaveLength(3);
      expect(rootChildren[1]).toBe('child-2');
      expect(rootChildren[2]).toContain('child-2_copy_');
    });

    it('should duplicate a subtree with children', () => {
      useBuilderStore.getState().setTree(createTestTree());

      const before = Object.keys(useBuilderStore.getState().tree!.elements).length;
      useBuilderStore.getState().duplicateElement('child-1');
      const after = Object.keys(useBuilderStore.getState().tree!.elements).length;

      // child-1 + grandchild-1 + grandchild-2 = 3 new elements
      expect(after).toBe(before + 3);

      // Cloned element's children should reference cloned grandchildren
      const rootChildren = useBuilderStore.getState().tree!.elements['root'].children!;
      expect(rootChildren).toHaveLength(3);
      const clonedKey = rootChildren[1]; // inserted right after child-1
      expect(clonedKey).toContain('child-1_copy_');

      const cloned = useBuilderStore.getState().tree!.elements[clonedKey];
      expect(cloned.children).toHaveLength(2);
      expect(cloned.children![0]).toContain('grandchild-1_copy_');
      expect(cloned.children![1]).toContain('grandchild-2_copy_');
    });

    it('should not duplicate the root element', () => {
      useBuilderStore.getState().setTree(createTestTree());
      useBuilderStore.getState().duplicateElement('root');

      expect(Object.keys(useBuilderStore.getState().tree!.elements)).toHaveLength(5);
    });

    it('should no-op when tree is null', () => {
      useBuilderStore.getState().duplicateElement('anything');
      expect(useBuilderStore.getState().tree).toBeNull();
    });
  });

  // -------------------------------------------------------------------------
  // selectElement / hoverElement
  // -------------------------------------------------------------------------

  describe('selectElement / hoverElement', () => {
    it('should select an element', () => {
      useBuilderStore.getState().selectElement('child-1');
      expect(useBuilderStore.getState().selectedKey).toBe('child-1');
    });

    it('should deselect by passing null', () => {
      useBuilderStore.getState().selectElement('child-1');
      useBuilderStore.getState().selectElement(null);
      expect(useBuilderStore.getState().selectedKey).toBeNull();
    });

    it('should hover an element', () => {
      useBuilderStore.getState().hoverElement('child-2');
      expect(useBuilderStore.getState().hoveredKey).toBe('child-2');
    });

    it('should unhover by passing null', () => {
      useBuilderStore.getState().hoverElement('child-2');
      useBuilderStore.getState().hoverElement(null);
      expect(useBuilderStore.getState().hoveredKey).toBeNull();
    });
  });

  // -------------------------------------------------------------------------
  // Computed helpers: getElement / getParent / getChildren
  // -------------------------------------------------------------------------

  describe('getElement', () => {
    it('should return element by key', () => {
      useBuilderStore.getState().setTree(createTestTree());

      const el = useBuilderStore.getState().getElement('child-1');
      expect(el).toBeDefined();
      expect(el!.type).toBe('Card');
    });

    it('should return undefined for non-existent key', () => {
      useBuilderStore.getState().setTree(createTestTree());
      expect(useBuilderStore.getState().getElement('nope')).toBeUndefined();
    });

    it('should return undefined when tree is null', () => {
      expect(useBuilderStore.getState().getElement('root')).toBeUndefined();
    });
  });

  describe('getParent', () => {
    it('should return the parent element', () => {
      useBuilderStore.getState().setTree(createTestTree());

      const parent = useBuilderStore.getState().getParent('grandchild-1');
      expect(parent).toBeDefined();
      expect(parent!.key).toBe('child-1');
    });

    it('should return undefined for the root element', () => {
      useBuilderStore.getState().setTree(createTestTree());
      expect(useBuilderStore.getState().getParent('root')).toBeUndefined();
    });

    it('should return undefined when tree is null', () => {
      expect(useBuilderStore.getState().getParent('x')).toBeUndefined();
    });
  });

  describe('getChildren', () => {
    it('should return child elements', () => {
      useBuilderStore.getState().setTree(createTestTree());

      const children = useBuilderStore.getState().getChildren('child-1');
      expect(children).toHaveLength(2);
      expect(children[0].key).toBe('grandchild-1');
      expect(children[1].key).toBe('grandchild-2');
    });

    it('should return empty array for leaf element', () => {
      useBuilderStore.getState().setTree(createTestTree());
      expect(useBuilderStore.getState().getChildren('child-2')).toEqual([]);
    });

    it('should return empty array when tree is null', () => {
      expect(useBuilderStore.getState().getChildren('root')).toEqual([]);
    });
  });

  // -------------------------------------------------------------------------
  // getAncestors
  // -------------------------------------------------------------------------

  describe('getAncestors', () => {
    it('should return ancestors from parent to root', () => {
      useBuilderStore.getState().setTree(createTestTree());

      const ancestors = useBuilderStore.getState().getAncestors('grandchild-1');
      expect(ancestors).toHaveLength(2);
      expect(ancestors[0].key).toBe('child-1');
      expect(ancestors[1].key).toBe('root');
    });

    it('should return empty array for root', () => {
      useBuilderStore.getState().setTree(createTestTree());
      expect(useBuilderStore.getState().getAncestors('root')).toEqual([]);
    });

    it('should return empty array when tree is null', () => {
      expect(useBuilderStore.getState().getAncestors('x')).toEqual([]);
    });
  });

  // -------------------------------------------------------------------------
  // getSubtree
  // -------------------------------------------------------------------------

  describe('getSubtree', () => {
    it('should extract subtree rooted at key', () => {
      useBuilderStore.getState().setTree(createTestTree());

      const subtree = useBuilderStore.getState().getSubtree('child-1');
      expect(subtree.root).toBe('child-1');
      expect(Object.keys(subtree.elements)).toHaveLength(3);
      expect(subtree.elements['child-1']).toBeDefined();
      expect(subtree.elements['grandchild-1']).toBeDefined();
      expect(subtree.elements['grandchild-2']).toBeDefined();
      // Should not include sibling or root
      expect(subtree.elements['root']).toBeUndefined();
      expect(subtree.elements['child-2']).toBeUndefined();
    });

    it('should extract a leaf as a single-element subtree', () => {
      useBuilderStore.getState().setTree(createTestTree());

      const subtree = useBuilderStore.getState().getSubtree('child-2');
      expect(subtree.root).toBe('child-2');
      expect(Object.keys(subtree.elements)).toHaveLength(1);
    });

    it('should return the whole tree when extracting from root', () => {
      useBuilderStore.getState().setTree(createTestTree());

      const subtree = useBuilderStore.getState().getSubtree('root');
      expect(subtree.root).toBe('root');
      expect(Object.keys(subtree.elements)).toHaveLength(5);
    });

    it('should return empty elements when tree is null', () => {
      const subtree = useBuilderStore.getState().getSubtree('x');
      expect(subtree.root).toBe('x');
      expect(Object.keys(subtree.elements)).toHaveLength(0);
    });

    it('should return empty elements for non-existent key', () => {
      useBuilderStore.getState().setTree(createTestTree());
      const subtree = useBuilderStore.getState().getSubtree('non-existent');
      expect(Object.keys(subtree.elements)).toHaveLength(0);
    });
  });

  // -------------------------------------------------------------------------
  // Mode / Viewport / Panel switching
  // -------------------------------------------------------------------------

  describe('mode / viewport / panel switching', () => {
    it('should switch mode', () => {
      useBuilderStore.getState().setMode('edit');
      expect(useBuilderStore.getState().mode).toBe('edit');

      useBuilderStore.getState().setMode('code');
      expect(useBuilderStore.getState().mode).toBe('code');

      useBuilderStore.getState().setMode('preview');
      expect(useBuilderStore.getState().mode).toBe('preview');
    });

    it('should switch viewport', () => {
      useBuilderStore.getState().setViewport('tablet');
      expect(useBuilderStore.getState().viewport).toBe('tablet');

      useBuilderStore.getState().setViewport('mobile');
      expect(useBuilderStore.getState().viewport).toBe('mobile');

      useBuilderStore.getState().setViewport('desktop');
      expect(useBuilderStore.getState().viewport).toBe('desktop');
    });

    it('should switch left panel', () => {
      useBuilderStore.getState().setLeftPanel('palette');
      expect(useBuilderStore.getState().leftPanel).toBe('palette');

      useBuilderStore.getState().setLeftPanel('outline');
      expect(useBuilderStore.getState().leftPanel).toBe('outline');

      useBuilderStore.getState().setLeftPanel('templates');
      expect(useBuilderStore.getState().leftPanel).toBe('templates');

      useBuilderStore.getState().setLeftPanel(null);
      expect(useBuilderStore.getState().leftPanel).toBeNull();
    });

    it('should switch right panel', () => {
      useBuilderStore.getState().setRightPanel('props');
      expect(useBuilderStore.getState().rightPanel).toBe('props');

      useBuilderStore.getState().setRightPanel('styles');
      expect(useBuilderStore.getState().rightPanel).toBe('styles');

      useBuilderStore.getState().setRightPanel(null);
      expect(useBuilderStore.getState().rightPanel).toBeNull();
    });
  });

  // -------------------------------------------------------------------------
  // Framework switching
  // -------------------------------------------------------------------------

  describe('framework switching', () => {
    it('should switch framework', () => {
      useBuilderStore.getState().setFramework('mui');
      expect(useBuilderStore.getState().framework).toBe('mui');

      useBuilderStore.getState().setFramework('tailwind');
      expect(useBuilderStore.getState().framework).toBe('tailwind');
    });
  });
});
