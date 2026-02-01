// src/lib/components/index.ts

/**
 * Universal Component System
 *
 * This module provides a framework-agnostic component type system
 * that enables the Generative UI Builder to work across multiple
 * UI frameworks (Shadcn, MUI, Chakra, Ant Design, etc.)
 */

// Export all types
export type {
  UniversalComponentCategory,
  UniversalComponentDef,
  PropSchema,
  PropDefinition,
} from './universal-types';

// Export the component catalog
export { UNIVERSAL_COMPONENTS } from './universal-types';

// Export helper functions
export {
  resolveComponentName,
  getComponentDef,
  getComponentsByCategory,
  searchComponents,
  getAllComponentNames,
  getAllCategories,
  isValidComponent,
} from './universal-types';
