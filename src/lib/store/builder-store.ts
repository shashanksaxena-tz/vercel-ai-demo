/**
 * Central Builder Store
 *
 * Zustand store with Immer for immutable updates and Zundo for undo/redo.
 * Manages the full state of the Generative UI Builder: tree, selection, UI panels,
 * and the active framework.
 */

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { temporal } from 'zundo';
import type { UITree, UIElement } from '@json-render/core';
import type { UIFramework } from '@/types';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ViewMode = 'preview' | 'edit' | 'code';
export type Viewport = 'desktop' | 'tablet' | 'mobile';
export type LeftPanel = 'palette' | 'outline' | 'ai' | 'templates' | null;
export type RightPanel = 'props' | 'styles' | null;

export interface BuilderState {
  // -- Tree state --
  tree: UITree | null;
  setTree: (tree: UITree | null) => void;
  updateElement: (key: string, updates: Partial<UIElement>) => void;
  addElement: (element: UIElement, parentKey: string, index?: number) => void;
  removeElement: (key: string) => void;
  moveElement: (key: string, newParentKey: string, index?: number) => void;
  duplicateElement: (key: string) => void;

  // -- Selection state --
  selectedKey: string | null;
  hoveredKey: string | null;
  selectElement: (key: string | null) => void;
  hoverElement: (key: string | null) => void;

  // -- UI state --
  mode: ViewMode;
  viewport: Viewport;
  leftPanel: LeftPanel;
  rightPanel: RightPanel;
  setMode: (mode: ViewMode) => void;
  setViewport: (viewport: Viewport) => void;
  setLeftPanel: (panel: LeftPanel) => void;
  setRightPanel: (panel: RightPanel) => void;

  // -- Framework state --
  framework: UIFramework;
  setFramework: (framework: UIFramework) => void;

  // -- Computed helpers --
  getElement: (key: string) => UIElement | undefined;
  getParent: (key: string) => UIElement | undefined;
  getChildren: (key: string) => UIElement[];
  getAncestors: (key: string) => UIElement[];
  getSubtree: (key: string) => UITree;
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Collect all descendant keys (inclusive of the given key) via BFS.
 */
function collectDescendantKeys(
  elements: Record<string, UIElement>,
  key: string,
): string[] {
  const result: string[] = [];
  const queue = [key];
  while (queue.length > 0) {
    const current = queue.shift()!;
    result.push(current);
    const children = elements[current]?.children;
    if (children) {
      queue.push(...children);
    }
  }
  return result;
}

/**
 * Find the parent element that contains `childKey` in its children array.
 */
function findParent(
  elements: Record<string, UIElement>,
  childKey: string,
): UIElement | undefined {
  for (const el of Object.values(elements)) {
    if (el.children?.includes(childKey)) {
      return el;
    }
  }
  return undefined;
}

/**
 * Deep-clone a subtree rooted at `key`, assigning new keys using a suffix.
 * Returns the cloned elements map and the new root key.
 */
function cloneSubtree(
  elements: Record<string, UIElement>,
  key: string,
  suffix: string,
): { cloned: Record<string, UIElement>; newRootKey: string } {
  const cloned: Record<string, UIElement> = {};

  function cloneNode(nodeKey: string): string {
    const original = elements[nodeKey];
    if (!original) return nodeKey;

    const newKey = `${nodeKey}_copy_${suffix}`;
    const newChildren = original.children?.map((childKey) =>
      cloneNode(childKey),
    );

    cloned[newKey] = {
      ...original,
      key: newKey,
      props: { ...original.props },
      children: newChildren,
    };

    return newKey;
  }

  const newRootKey = cloneNode(key);
  return { cloned, newRootKey };
}

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

export const useBuilderStore = create<BuilderState>()(
  temporal(
    immer((set, get) => ({
      // ---- Tree state ----
      tree: null,

      setTree: (tree) =>
        set((state) => {
          state.tree = tree as BuilderState['tree'];
        }),

      updateElement: (key, updates) =>
        set((state) => {
          if (!state.tree) return;
          const el = state.tree.elements[key];
          if (!el) return;
          Object.assign(el, updates);
        }),

      addElement: (element, parentKey, index) =>
        set((state) => {
          if (!state.tree) return;
          const parent = state.tree.elements[parentKey];
          if (!parent) return;

          // Add element to elements map
          state.tree.elements[element.key] = element as UIElement;

          // Ensure parent has a children array
          if (!parent.children) {
            parent.children = [];
          }

          // Insert at index or append
          if (index !== undefined && index >= 0 && index <= parent.children.length) {
            parent.children.splice(index, 0, element.key);
          } else {
            parent.children.push(element.key);
          }
        }),

      removeElement: (key) =>
        set((state) => {
          if (!state.tree) return;
          // Cannot remove root
          if (state.tree.root === key) return;

          // Collect all keys to remove (element + descendants)
          const keysToRemove = collectDescendantKeys(state.tree.elements, key);

          // Remove from parent's children array
          const parent = findParent(state.tree.elements, key);
          if (parent?.children) {
            const idx = parent.children.indexOf(key);
            if (idx !== -1) {
              parent.children.splice(idx, 1);
            }
          }

          // Delete all elements
          for (const k of keysToRemove) {
            delete state.tree.elements[k];
          }

          // Clear selection if the removed element (or descendant) was selected
          if (state.selectedKey && keysToRemove.includes(state.selectedKey)) {
            state.selectedKey = null;
          }
          if (state.hoveredKey && keysToRemove.includes(state.hoveredKey)) {
            state.hoveredKey = null;
          }
        }),

      moveElement: (key, newParentKey, index) =>
        set((state) => {
          if (!state.tree) return;
          const element = state.tree.elements[key];
          if (!element) return;
          const newParent = state.tree.elements[newParentKey];
          if (!newParent) return;

          // Remove from old parent
          const oldParent = findParent(state.tree.elements, key);
          if (oldParent?.children) {
            const idx = oldParent.children.indexOf(key);
            if (idx !== -1) {
              oldParent.children.splice(idx, 1);
            }
          }

          // Add to new parent
          if (!newParent.children) {
            newParent.children = [];
          }

          if (index !== undefined && index >= 0 && index <= newParent.children.length) {
            newParent.children.splice(index, 0, key);
          } else {
            newParent.children.push(key);
          }
        }),

      duplicateElement: (key) =>
        set((state) => {
          if (!state.tree) return;
          const element = state.tree.elements[key];
          if (!element) return;

          // Cannot duplicate root
          if (state.tree.root === key) return;

          const suffix = String(Date.now());
          const { cloned, newRootKey } = cloneSubtree(
            state.tree.elements,
            key,
            suffix,
          );

          // Merge cloned elements into tree
          for (const [k, v] of Object.entries(cloned)) {
            state.tree.elements[k] = v as UIElement;
          }

          // Insert clone right after the original in the parent's children
          const parent = findParent(state.tree.elements, key);
          if (parent?.children) {
            const idx = parent.children.indexOf(key);
            parent.children.splice(idx + 1, 0, newRootKey);
          }
        }),

      // ---- Selection state ----
      selectedKey: null,
      hoveredKey: null,

      selectElement: (key) =>
        set((state) => {
          state.selectedKey = key;
        }),

      hoverElement: (key) =>
        set((state) => {
          state.hoveredKey = key;
        }),

      // ---- UI state ----
      mode: 'preview' as ViewMode,
      viewport: 'desktop' as Viewport,
      leftPanel: 'outline' as LeftPanel,
      rightPanel: 'props' as RightPanel,

      setMode: (mode) =>
        set((state) => {
          state.mode = mode;
        }),

      setViewport: (viewport) =>
        set((state) => {
          state.viewport = viewport;
        }),

      setLeftPanel: (panel) =>
        set((state) => {
          state.leftPanel = panel;
        }),

      setRightPanel: (panel) =>
        set((state) => {
          state.rightPanel = panel;
        }),

      // ---- Framework state ----
      framework: 'shadcn' as UIFramework,

      setFramework: (framework) =>
        set((state) => {
          state.framework = framework;
        }),

      // ---- Computed helpers ----
      getElement: (key) => {
        const { tree } = get();
        if (!tree) return undefined;
        return tree.elements[key];
      },

      getParent: (key) => {
        const { tree } = get();
        if (!tree) return undefined;
        return findParent(tree.elements, key);
      },

      getChildren: (key) => {
        const { tree } = get();
        if (!tree) return [];
        const element = tree.elements[key];
        if (!element?.children) return [];
        return element.children
          .map((childKey) => tree.elements[childKey])
          .filter(Boolean);
      },

      getAncestors: (key) => {
        const { tree } = get();
        if (!tree) return [];
        const ancestors: UIElement[] = [];
        let current = key;
        // Walk up the tree via findParent
        while (true) {
          const parent = findParent(tree.elements, current);
          if (!parent) break;
          ancestors.push(parent);
          current = parent.key;
        }
        return ancestors;
      },

      getSubtree: (key) => {
        const { tree } = get();
        if (!tree) {
          return { root: key, elements: {} };
        }
        const element = tree.elements[key];
        if (!element) {
          return { root: key, elements: {} };
        }

        const descendantKeys = collectDescendantKeys(tree.elements, key);
        const elements: Record<string, UIElement> = {};
        for (const k of descendantKeys) {
          if (tree.elements[k]) {
            elements[k] = tree.elements[k];
          }
        }

        return { root: key, elements };
      },
    })),
    {
      // Only track tree changes for undo/redo, not UI state
      partialize: (state) => ({ tree: state.tree }),
      limit: 50,
    },
  ),
);
