/**
 * AI Module Exports
 *
 * Provides AI-powered UI generation capabilities using the Vercel AI SDK
 * with Google's Gemini model for structured output.
 */

// Core generator functions and types
export {
  generateUIFromPrompt,
  validateUITree,
  mergeUITrees,
  extractComponentTypes,
  getElementsByType,
  getElementByKey,
  getParentElement,
  countElements,
  cloneUITree,
  type UIElement,
  type UITree,
  type GenerationContext,
  type GenerationResult,
  type ValidationResult,
} from './ui-generator';

// Zod schemas for structured output
export {
  UIElementSchema,
  UITreeSchema,
  GenerationResultSchema,
  GenerateRequestSchema,
  GenerateResponseSchema,
  VALID_COMPONENT_TYPES,
  getValidComponentTypesFromBlocks,
  SizeVariantSchema,
  ColorVariantSchema,
  AlignmentSchema,
  JustifySchema,
  OrientationSchema,
  ComponentTypeSchema,
  type UIElementSchemaType,
  type UITreeSchemaType,
  type GenerationResultSchemaType,
  type GenerateRequestSchemaType,
  type GenerateResponseSchemaType,
  type ValidComponentType,
} from './schemas';

// Prompts and documentation
export {
  SYSTEM_PROMPT,
  COMPONENT_REFERENCE,
  UITREE_STRUCTURE_DOC,
  GENERATION_RULES,
  buildFreshGenerationPrompt,
  buildRefinementPrompt,
  buildMessages,
  buildSystemPromptFromBlocks,
} from './prompts';

// Dynamic prompt builder from block definitions
export {
  buildComponentReferenceFromBlocks,
  buildValidComponentTypes,
} from './prompt-builder';

// Dynamic prompt building with MCP component discovery
export {
  buildEnhancedSystemPrompt,
  buildDynamicUserPrompt,
  buildDynamicRefinementPrompt,
  calculateTokenUsage,
  type MCPComponentMetadata,
  type DynamicPromptConfig,
  type TokenUsage,
} from './dynamic-prompts';

// Chat context types only (components exported from ./chat-context directly for client use)
export type {
  ChatMessage,
  ChatState,
  ChatContextValue,
  ChatProviderProps,
} from './chat-context';
