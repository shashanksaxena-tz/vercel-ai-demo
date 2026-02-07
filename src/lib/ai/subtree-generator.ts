/**
 * Subtree AI Generator
 *
 * Provides utilities for extracting, replacing, and merging subtrees within
 * a UITree structure. This enables targeted AI modifications to specific
 * parts of the UI tree without regenerating the entire tree.
 *
 * All functions are pure — no API calls are made in this module.
 * The actual AI call happens elsewhere using the prompt built by
 * generateSubtreePrompt().
 */

import type { UITree, UIElement } from './ui-generator';

// ============================================================================
// Types
// ============================================================================

/**
 * Context about where a subtree sits within the full tree.
 * Used to give the AI model awareness of the surrounding structure
 * when generating modifications to a subtree.
 */
export interface SubtreeContext {
  /** Type of the parent element (undefined if target is root) */
  parentType?: string;
  /** Types of sibling elements (undefined if target is root) */
  siblingTypes?: string[];
  /** Total number of elements in the full tree */
  fullTreeElementCount: number;
  /** Target framework hint for styling */
  framework?: string;
}

// ============================================================================
// Core Functions
// ============================================================================

/**
 * Extract a subtree rooted at the given key.
 *
 * Traverses the tree starting from `rootKey` and collects all elements
 * reachable from it via children references. The returned UITree has
 * `rootKey` as its root and contains only the reachable elements.
 *
 * @param tree - The full UITree to extract from
 * @param rootKey - The key of the element to use as the subtree root
 * @returns A new UITree containing only the subtree
 * @throws Error if rootKey does not exist in the tree
 */
export function extractSubtree(tree: UITree, rootKey: string): UITree {
  if (!tree.elements[rootKey]) {
    throw new Error(`Element "${rootKey}" not found in tree`);
  }

  const elements: Record<string, UIElement> = {};
  const queue: string[] = [rootKey];

  while (queue.length > 0) {
    const currentKey = queue.shift()!;
    if (elements[currentKey]) continue; // already visited

    const element = tree.elements[currentKey];
    if (!element) continue;

    elements[currentKey] = {
      ...element,
      props: { ...element.props },
      children: element.children ? [...element.children] : undefined,
    };

    if (element.children) {
      for (const childKey of element.children) {
        if (!elements[childKey]) {
          queue.push(childKey);
        }
      }
    }
  }

  return {
    root: rootKey,
    elements,
  };
}

/**
 * Replace a subtree in the full tree with a new one.
 *
 * Removes all elements reachable from `oldRootKey` and inserts all elements
 * from `newSubtree`. Updates the parent's children array to point to
 * `newSubtree.root` instead of `oldRootKey`.
 *
 * If `oldRootKey` is the tree root, the entire tree is replaced.
 *
 * @param tree - The full UITree to modify
 * @param oldRootKey - The key of the subtree root to replace
 * @param newSubtree - The new subtree to insert
 * @returns A new UITree with the replacement applied
 * @throws Error if oldRootKey does not exist in the tree
 */
export function replaceSubtree(
  tree: UITree,
  oldRootKey: string,
  newSubtree: UITree
): UITree {
  if (!tree.elements[oldRootKey]) {
    throw new Error(`Element "${oldRootKey}" not found in tree`);
  }

  // If replacing the root, just return the new subtree
  if (oldRootKey === tree.root) {
    return {
      root: newSubtree.root,
      elements: { ...newSubtree.elements },
    };
  }

  // Collect all keys in the old subtree to remove
  const oldKeys = new Set<string>();
  const queue: string[] = [oldRootKey];

  while (queue.length > 0) {
    const currentKey = queue.shift()!;
    if (oldKeys.has(currentKey)) continue;
    oldKeys.add(currentKey);

    const element = tree.elements[currentKey];
    if (element?.children) {
      for (const childKey of element.children) {
        if (!oldKeys.has(childKey)) {
          queue.push(childKey);
        }
      }
    }
  }

  // Build new elements: keep everything except old subtree, add new subtree
  const newElements: Record<string, UIElement> = {};

  for (const [key, element] of Object.entries(tree.elements)) {
    if (oldKeys.has(key)) continue;

    // Check if this element is the parent of the old root
    if (element.children?.includes(oldRootKey)) {
      newElements[key] = {
        ...element,
        props: { ...element.props },
        children: element.children.map((childKey) =>
          childKey === oldRootKey ? newSubtree.root : childKey
        ),
      };
    } else {
      newElements[key] = {
        ...element,
        props: { ...element.props },
        children: element.children ? [...element.children] : undefined,
      };
    }
  }

  // Add all elements from the new subtree
  for (const [key, element] of Object.entries(newSubtree.elements)) {
    newElements[key] = {
      ...element,
      props: { ...element.props },
      children: element.children ? [...element.children] : undefined,
    };
  }

  return {
    root: tree.root,
    elements: newElements,
  };
}

/**
 * Extract context about where a node sits in the tree.
 *
 * Finds the parent element type, sibling element types, and total element
 * count. This context is used to inform the AI about the surrounding
 * structure when modifying a subtree.
 *
 * @param tree - The full UITree
 * @param targetKey - The key of the target element
 * @returns Context about the target element's position in the tree
 * @throws Error if targetKey does not exist in the tree
 */
export function getSubtreeContext(tree: UITree, targetKey: string): SubtreeContext {
  if (!tree.elements[targetKey]) {
    throw new Error(`Element "${targetKey}" not found in tree`);
  }

  const fullTreeElementCount = Object.keys(tree.elements).length;

  // If this is the root, there is no parent or siblings
  if (targetKey === tree.root) {
    return { fullTreeElementCount };
  }

  // Find parent
  let parentElement: UIElement | undefined;
  for (const element of Object.values(tree.elements)) {
    if (element.children?.includes(targetKey)) {
      parentElement = element;
      break;
    }
  }

  if (!parentElement) {
    // Orphan node — no parent found
    return { fullTreeElementCount };
  }

  const siblingTypes = (parentElement.children || [])
    .filter((childKey) => childKey !== targetKey)
    .map((childKey) => tree.elements[childKey]?.type)
    .filter((type): type is string => !!type);

  return {
    parentType: parentElement.type,
    siblingTypes,
    fullTreeElementCount,
  };
}

/**
 * Build the user prompt for subtree modification.
 *
 * Constructs a prompt that includes the current subtree JSON, the user's
 * modification request, context about the subtree's position in the tree,
 * and instructions to preserve the root key.
 *
 * @param subtree - The current subtree to be modified
 * @param userRequest - The user's natural language modification request
 * @param context - Context about where the subtree sits in the full tree
 * @returns The constructed prompt string
 */
export function generateSubtreePrompt(
  subtree: UITree,
  userRequest: string,
  context: SubtreeContext
): string {
  const parts: string[] = [];

  parts.push('## Subtree Modification Request');
  parts.push('');
  parts.push('You are modifying a SUBTREE of a larger UI tree. Only output the modified subtree.');
  parts.push('');

  // Context about position in the tree
  parts.push('### Context');
  if (context.parentType) {
    parts.push(`- Parent element type: **${context.parentType}**`);
  }
  if (context.siblingTypes && context.siblingTypes.length > 0) {
    parts.push(`- Sibling element types: ${context.siblingTypes.join(', ')}`);
  }
  parts.push(`- Full tree has ${context.fullTreeElementCount} elements total`);
  if (context.framework) {
    parts.push(`- Target framework: ${context.framework}`);
  }
  parts.push('');

  // Current subtree
  parts.push('### Current Subtree');
  parts.push('```json');
  parts.push(JSON.stringify(subtree, null, 2));
  parts.push('```');
  parts.push('');

  // User request
  parts.push('### Requested Modification');
  parts.push(userRequest);
  parts.push('');

  // Constraints
  parts.push('### Constraints');
  parts.push(`- IMPORTANT: The root element key MUST remain "${subtree.root}"`);
  parts.push('- Only return the modified subtree, not the full tree');
  parts.push('- Preserve the UITree format: { root: string, elements: Record<string, UIElement> }');
  parts.push('- Each element must have: key, type, props, and optionally children');
  parts.push('- Element keys in the elements record must match the element.key property');

  return parts.join('\n');
}

/**
 * Re-key a subtree to avoid key conflicts with an existing tree.
 *
 * Prepends `keyPrefix` to every key in the subtree, updating all children
 * references and the root reference accordingly.
 *
 * @param subtree - The subtree to re-key
 * @param keyPrefix - The prefix to prepend to all keys
 * @returns A new UITree with all keys prefixed
 */
export function reKeySubtree(subtree: UITree, keyPrefix: string): UITree {
  const newElements: Record<string, UIElement> = {};

  for (const [oldKey, element] of Object.entries(subtree.elements)) {
    const newKey = `${keyPrefix}${oldKey}`;
    newElements[newKey] = {
      ...element,
      key: newKey,
      props: { ...element.props },
      children: element.children
        ? element.children.map((childKey) => `${keyPrefix}${childKey}`)
        : undefined,
    };
  }

  return {
    root: `${keyPrefix}${subtree.root}`,
    elements: newElements,
  };
}

/**
 * Higher-level function that validates a generated subtree and merges it
 * back into the full tree.
 *
 * Validates that the generated subtree's root matches the target key,
 * then calls replaceSubtree to perform the merge.
 *
 * @param fullTree - The complete UITree
 * @param targetKey - The key of the subtree root being replaced
 * @param generatedSubtree - The AI-generated replacement subtree
 * @returns The updated full UITree
 * @throws Error if the generated subtree root does not match targetKey
 * @throws Error if the generated subtree is missing required structure
 */
export function mergeSubtreeResult(
  fullTree: UITree,
  targetKey: string,
  generatedSubtree: UITree
): UITree {
  // Validate the generated subtree has the required structure
  if (!generatedSubtree.root) {
    throw new Error('Generated subtree is missing a root key');
  }

  if (!generatedSubtree.elements || typeof generatedSubtree.elements !== 'object') {
    throw new Error('Generated subtree is missing elements');
  }

  if (!generatedSubtree.elements[generatedSubtree.root]) {
    throw new Error(
      `Generated subtree root "${generatedSubtree.root}" not found in its elements`
    );
  }

  // Ensure the root key matches the target
  if (generatedSubtree.root !== targetKey) {
    throw new Error(
      `Generated subtree root "${generatedSubtree.root}" does not match target key "${targetKey}"`
    );
  }

  // Perform the replacement
  return replaceSubtree(fullTree, targetKey, generatedSubtree);
}
