/**
 * AI-Powered UI Generator
 *
 * Uses the Vercel AI SDK with Google's Gemini model to generate UITree structures
 * from natural language prompts. Supports both fresh generation and refinement
 * of existing UI trees.
 */

import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';

import { GenerationResultSchema } from './schemas';
import {
  SYSTEM_PROMPT,
  buildFreshGenerationPrompt,
  buildRefinementPrompt,
  buildMessages,
} from './prompts';

// ============================================================================
// Types
// ============================================================================

/**
 * Represents a single UI element in the tree
 */
export interface UIElement {
  key: string;
  type: string;
  props: Record<string, unknown>;
  children?: string[];
}

/**
 * Represents a complete UI tree structure
 * This is the format used by json-render for rendering
 */
export interface UITree {
  root: string;
  elements: Record<string, UIElement>;
}

/**
 * Context for UI generation, including existing tree and conversation history
 */
export interface GenerationContext {
  /** Existing UI tree to modify (for refinement mode) */
  currentTree?: UITree;
  /** Target framework hint for styling */
  framework?: string;
  /** Previous conversation for context-aware generation */
  conversationHistory?: Array<{ role: 'user' | 'assistant'; content: string }>;
}

/**
 * Result of UI generation including the tree and metadata
 */
export interface GenerationResult {
  /** The generated UI tree */
  tree: UITree;
  /** Explanation of what was generated */
  explanation: string;
  /** Optional suggested Tailwind styles per element */
  suggestedStyles?: Record<string, string>;
}

// ============================================================================
// Constants
// ============================================================================

/**
 * The AI model used for generation
 * Using gemini-2.5-flash for optimal speed and quality balance
 */
const AI_MODEL = 'gemini-2.5-flash';

/**
 * Temperature for generation (0.7 for creative but consistent output)
 */
const GENERATION_TEMPERATURE = 0.7;

// ============================================================================
// Main Generator Function
// ============================================================================

/**
 * Generate a UITree from a natural language prompt
 *
 * This function uses the Vercel AI SDK with structured output to ensure
 * the generated tree conforms to the expected schema.
 *
 * @param prompt - The user's natural language description of desired UI
 * @param context - Optional context including existing tree, framework, and conversation history
 * @returns Generated UITree with explanation and optional style suggestions
 *
 * @example
 * ```typescript
 * // Fresh generation
 * const result = await generateUIFromPrompt(
 *   'Create a login form with email and password fields'
 * );
 *
 * // Refinement of existing UI
 * const result = await generateUIFromPrompt(
 *   'Add a "Forgot Password" link below the password field',
 *   { currentTree: existingTree }
 * );
 * ```
 */
export async function generateUIFromPrompt(
  prompt: string,
  context?: GenerationContext
): Promise<GenerationResult> {
  // Build the user message based on whether we're refining or creating fresh
  let userMessage: string;

  if (context?.currentTree) {
    // Refinement mode: include the existing tree
    userMessage = buildRefinementPrompt(prompt, context.currentTree, context?.framework);
  } else {
    // Fresh generation mode
    userMessage = buildFreshGenerationPrompt(prompt, context?.framework);
  }

  // Build the messages array with history
  const messages = buildMessages(userMessage, context?.conversationHistory);

  // Generate the UI tree using structured output
  const result = await generateObject({
    model: google(AI_MODEL),
    system: SYSTEM_PROMPT,
    messages,
    schema: GenerationResultSchema,
    temperature: GENERATION_TEMPERATURE,
  });

  // Convert array-based elements to record-based for compatibility
  const generatedResult = result.object;
  const elementsArray = generatedResult.tree.elements as unknown as Array<{
    key: string;
    type: string;
    props: Record<string, unknown>;
    children?: string[];
  }>;

  const elementsRecord: Record<string, UIElement> = {};
  for (const element of elementsArray) {
    elementsRecord[element.key] = element;
  }

  // Convert suggestedStyles array to record
  let stylesRecord: Record<string, string> | undefined;
  if (generatedResult.suggestedStyles) {
    const stylesArray = generatedResult.suggestedStyles as unknown as Array<{
      elementKey: string;
      classes: string;
    }>;
    stylesRecord = {};
    for (const style of stylesArray) {
      stylesRecord[style.elementKey] = style.classes;
    }
  }

  return {
    tree: {
      root: generatedResult.tree.root,
      elements: elementsRecord,
    },
    explanation: generatedResult.explanation,
    suggestedStyles: stylesRecord,
  };
}

// ============================================================================
// Validation Functions
// ============================================================================

/**
 * Validation result with detailed error messages
 */
export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

/**
 * Validate a UITree structure for correctness
 *
 * Checks for:
 * - Root element existence
 * - Element key consistency
 * - Child reference validity
 * - Required properties
 *
 * @param tree - The UITree to validate
 * @returns Validation result with any errors found
 */
export function validateUITree(tree: UITree): ValidationResult {
  const errors: string[] = [];

  // Check root exists
  if (!tree.root) {
    errors.push('UITree must have a root element key');
  } else if (!tree.elements[tree.root]) {
    errors.push(`Root element "${tree.root}" not found in elements`);
  }

  // Check elements object exists
  if (!tree.elements || typeof tree.elements !== 'object') {
    errors.push('UITree must have an elements object');
    return { valid: false, errors };
  }

  // Validate each element
  for (const [key, element] of Object.entries(tree.elements)) {
    // Check key consistency
    if (element.key !== key) {
      errors.push(`Element key mismatch: object key "${key}" != element.key "${element.key}"`);
    }

    // Check required type
    if (!element.type) {
      errors.push(`Element "${key}" missing type`);
    }

    // Check props object exists
    if (element.props === undefined || element.props === null) {
      errors.push(`Element "${key}" missing props object`);
    }

    // Validate children references
    if (element.children) {
      if (!Array.isArray(element.children)) {
        errors.push(`Element "${key}" children must be an array`);
      } else {
        for (const childKey of element.children) {
          if (!tree.elements[childKey]) {
            errors.push(`Element "${key}" references non-existent child "${childKey}"`);
          }
        }
      }
    }
  }

  // Check for orphaned elements (not reachable from root)
  if (tree.root && tree.elements[tree.root]) {
    const reachable = new Set<string>();
    const queue = [tree.root];

    while (queue.length > 0) {
      const current = queue.shift()!;
      if (reachable.has(current)) continue;
      reachable.add(current);

      const element = tree.elements[current];
      if (element?.children) {
        queue.push(...element.children);
      }
    }

    for (const key of Object.keys(tree.elements)) {
      if (!reachable.has(key)) {
        errors.push(`Element "${key}" is orphaned (not reachable from root)`);
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// ============================================================================
// Tree Manipulation Functions
// ============================================================================

/**
 * Merge two UITrees, with the overlay tree taking precedence
 *
 * @param base - The base UITree
 * @param overlay - The overlay UITree with changes
 * @returns Merged UITree
 */
export function mergeUITrees(base: UITree, overlay: Partial<UITree>): UITree {
  return {
    root: overlay.root ?? base.root,
    elements: {
      ...base.elements,
      ...overlay.elements,
    },
  };
}

/**
 * Extract all unique component types used in a UITree
 *
 * @param tree - The UITree to analyze
 * @returns Array of unique component type names
 */
export function extractComponentTypes(tree: UITree): string[] {
  const types = new Set<string>();

  for (const element of Object.values(tree.elements)) {
    types.add(element.type);
  }

  return Array.from(types).sort();
}

/**
 * Get all elements of a specific type from a UITree
 *
 * @param tree - The UITree to search
 * @param type - The component type to find
 * @returns Array of elements matching the type
 */
export function getElementsByType(tree: UITree, type: string): UIElement[] {
  return Object.values(tree.elements).filter((element) => element.type === type);
}

/**
 * Find an element by its key in the UITree
 *
 * @param tree - The UITree to search
 * @param key - The element key to find
 * @returns The element or undefined if not found
 */
export function getElementByKey(tree: UITree, key: string): UIElement | undefined {
  return tree.elements[key];
}

/**
 * Get the parent element of a given element
 *
 * @param tree - The UITree to search
 * @param childKey - The key of the child element
 * @returns The parent element or undefined if it's the root
 */
export function getParentElement(tree: UITree, childKey: string): UIElement | undefined {
  for (const element of Object.values(tree.elements)) {
    if (element.children?.includes(childKey)) {
      return element;
    }
  }
  return undefined;
}

/**
 * Count the total number of elements in a UITree
 *
 * @param tree - The UITree to count
 * @returns Number of elements
 */
export function countElements(tree: UITree): number {
  return Object.keys(tree.elements).length;
}

/**
 * Create a deep copy of a UITree
 *
 * @param tree - The UITree to clone
 * @returns A new UITree with copied elements
 */
export function cloneUITree(tree: UITree): UITree {
  return {
    root: tree.root,
    elements: Object.fromEntries(
      Object.entries(tree.elements).map(([key, element]) => [
        key,
        {
          ...element,
          props: { ...element.props },
          children: element.children ? [...element.children] : undefined,
        },
      ])
    ),
  };
}
