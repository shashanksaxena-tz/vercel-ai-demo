/**
 * Dynamic Prompt Builder
 *
 * Token-budget-aware prompt construction that merges core components
 * with dynamically discovered MCP components based on user intent.
 */

import { COMPONENT_REFERENCE, UITREE_STRUCTURE_DOC, GENERATION_RULES } from './prompts';
import { buildComponentReferenceFromBlocks } from './prompt-builder';
import { CORE_BLOCK_DEFINITIONS } from '../registry/core-blocks';
import { MAGIC_UI_BLOCK_DEFINITIONS, ACETERNITY_BLOCK_DEFINITIONS } from '../registry/extended-blocks';
import type { BlockDefinition } from '../registry/block-registry';
import type { DiscoveryIntent } from '../mcp/smart-discovery';
import { estimateComponentTokens, withinTokenBudget, adjustForBudget } from '../mcp/smart-discovery';
import type { ComponentPriority } from '../mcp/smart-discovery';

/**
 * Configuration for dynamic prompt building
 */
export interface DynamicPromptConfig {
  /** Maximum total tokens for the prompt */
  maxTokens: number;

  /** Whether to include namespace prefixes (core:: vs mcp::) */
  useNamespaces: boolean;

  /** Feature flag for dynamic discovery */
  enableDynamicDiscovery: boolean;
}

/**
 * Default configuration
 */
const DEFAULT_CONFIG: DynamicPromptConfig = {
  maxTokens: 15000,
  useNamespaces: true,
  enableDynamicDiscovery: process.env.NEXT_PUBLIC_ENABLE_DYNAMIC_DISCOVERY === 'true',
};

/**
 * MCP Component metadata for prompt inclusion
 */
export interface MCPComponentMetadata {
  /** Component name */
  name: string;

  /** Component description */
  description: string;

  /** Available props with descriptions */
  props?: Record<string, {
    type: string;
    description?: string;
    required?: boolean;
    default?: any;
  }>;

  /** MCP source */
  source: string;

  /** Examples of usage */
  examples?: string[];

  /** Component tags */
  tags?: string[];

  /** Component dependencies */
  dependencies?: {
    npm?: string[];
    imports?: string[];
  };

  /** Animation metadata */
  animations?: {
    type: 'framer-motion' | 'css' | 'spring' | 'gsap';
    complexity: 'simple' | 'medium' | 'complex';
  };
}

/**
 * Get all registered block definitions (core + extended).
 * This is the baseline block set that the prompt builder uses.
 */
function getAllRegisteredBlocks(): BlockDefinition[] {
  return [
    ...CORE_BLOCK_DEFINITIONS,
    ...MAGIC_UI_BLOCK_DEFINITIONS,
    ...ACETERNITY_BLOCK_DEFINITIONS,
  ];
}

/**
 * Extract core component reference from existing COMPONENT_REFERENCE
 * This is the baseline prompt content
 */
function getCoreComponentTokenEstimate(): number {
  // Optimized estimate: COMPONENT_REFERENCE + UITREE_STRUCTURE_DOC + GENERATION_RULES
  // Reduced from ~7,800 to ~2,500 tokens through aggressive compression
  return 2500;
}

/**
 * Format MCP component metadata for inclusion in prompt
 */
function formatMCPComponent(component: MCPComponentMetadata, useNamespace: boolean): string {
  const prefix = useNamespace ? 'mcp::' : '';
  const name = `${prefix}${component.name}`;

  let formatted = `- **${name}**: ${component.description}.`;

  if (component.props && Object.keys(component.props).length > 0) {
    const propsText = Object.entries(component.props)
      .map(([propName, propMeta]) => {
        const required = propMeta.required ? ' [REQUIRED]' : '';
        const typeInfo = propMeta.type ? ` (${propMeta.type})` : '';
        const desc = propMeta.description ? ` - ${propMeta.description}` : '';
        return `${propName}${typeInfo}${required}${desc}`;
      })
      .join(', ');

    formatted += ` Props: ${propsText}`;
  }

  formatted += ` Source: ${component.source}`;

  return formatted;
}

/**
 * Build MCP components section for prompt
 */
function buildMCPComponentsSection(
  components: MCPComponentMetadata[],
  useNamespace: boolean
): string {
  if (components.length === 0) {
    return '';
  }

  const formatted = components.map(c => formatMCPComponent(c, useNamespace)).join('\n');

  return `
### Discovered Components (MCP)

These components are dynamically discovered from MCP servers and are available for this request:

${formatted}

**Note**: Use the ${useNamespace ? 'mcp:: namespace prefix' : 'component names directly'} when referencing these components in your UITree.
`;
}

/**
 * Build enhanced system prompt with MCP components
 */
export function buildEnhancedSystemPrompt(
  mcpComponents: MCPComponentMetadata[] = [],
  config: Partial<DynamicPromptConfig> = {}
): string {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };

  // If dynamic discovery is disabled, return original prompt
  if (!finalConfig.enableDynamicDiscovery) {
    return buildOriginalSystemPrompt();
  }

  // Calculate token budget
  const coreTokens = getCoreComponentTokenEstimate();
  const mcpTokens = estimateComponentTokens(mcpComponents.length);
  const totalTokens = coreTokens + mcpTokens;

  // If we exceed budget, trim MCP components
  let finalMCPComponents = mcpComponents;
  if (totalTokens > finalConfig.maxTokens) {
    const maxMCPComponents = Math.floor((finalConfig.maxTokens - coreTokens) / 100);
    finalMCPComponents = mcpComponents.slice(0, maxMCPComponents);

    console.warn(
      `[DynamicPrompts] Token budget exceeded (${totalTokens}/${finalConfig.maxTokens}). ` +
      `Trimming MCP components from ${mcpComponents.length} to ${finalMCPComponents.length}`
    );
  }

  // Build MCP section
  const mcpSection = buildMCPComponentsSection(finalMCPComponents, finalConfig.useNamespaces);

  // Build namespace training section
  const namespaceTraining = finalConfig.useNamespaces ? `

## Component Namespaces

This system supports components from multiple sources:

- **core::*** - The 78 core components defined above (always available)
- **mcp::*** - Components discovered from MCP servers (context-aware, listed below)

**Usage Examples:**
- Use \`core::Button\` for standard buttons
- Use \`mcp::ShimmerButton\` for animated buttons from MCP
- Use \`core::Container\` for standard containers
- Use \`mcp::DataTable\` for advanced data tables from MCP

When generating UITree structures, use the full namespace prefix in the \`type\` field:

\`\`\`json
{
  "type": "mcp::ShimmerButton",
  "props": { "label": "Get Started", ... }
}
\`\`\`
` : '';

  // Build component reference from block definitions (core + extended)
  const registeredBlocks = getAllRegisteredBlocks();
  const blockBasedReference = buildComponentReferenceFromBlocks(registeredBlocks);

  // Assemble enhanced prompt
  return `Expert UI designer generating UITree for json-render.

🎯 CRITICAL: Production-ready UIs with realistic content. NO empty/placeholder.

${blockBasedReference}

${mcpSection}

${namespaceTraining}

${UITREE_STRUCTURE_DOC}

${GENERATION_RULES}

## Response
- **tree**: Complete UITree with REALISTIC CONTENT
- **explanation**: 1-2 sentences
- **suggestedStyles**: Optional Tailwind map

Checklist:
✓ Headings: specific text
✓ Text: real sentences
✓ Buttons: action labels + icons
✓ Metrics: formatted + icons
✓ Images: picsum + alt
✓ Layouts: gap values
${finalConfig.useNamespaces ? '✓ Use namespace prefix (core:: or mcp::)' : ''}

Professional, polished UIs.`;
}

/**
 * Build original system prompt (no MCP components)
 * Uses block-based component reference for core + extended blocks.
 */
function buildOriginalSystemPrompt(): string {
  const registeredBlocks = getAllRegisteredBlocks();
  const blockBasedReference = buildComponentReferenceFromBlocks(registeredBlocks);

  return `Expert UI designer generating UITree for json-render.

🎯 CRITICAL: Production-ready UIs with realistic content. NO empty/placeholder.

${blockBasedReference}

${UITREE_STRUCTURE_DOC}

${GENERATION_RULES}

## Response
- **tree**: Complete UITree with REALISTIC CONTENT
- **explanation**: 1-2 sentences
- **suggestedStyles**: Optional Tailwind map

Checklist:
✓ Headings: specific text
✓ Text: real sentences
✓ Buttons: action labels + icons
✓ Metrics: formatted + icons
✓ Images: picsum + alt
✓ Layouts: gap values

Professional, polished UIs.`;
}

/**
 * Build user prompt with dynamic component context
 */
export function buildDynamicUserPrompt(
  userRequest: string,
  intent: DiscoveryIntent,
  framework?: string
): string {
  let prompt = userRequest;

  if (framework) {
    prompt += `\n\nNote: This UI will be rendered using ${framework} components.`;
  }

  // Add intent context hint
  if (intent.intent !== 'general') {
    prompt += `\n\nIntent: This appears to be a ${intent.intent} request. Consider using relevant components for this use case.`;
  }

  return prompt;
}

/**
 * Build refinement prompt with dynamic component context
 */
export function buildDynamicRefinementPrompt(
  userRequest: string,
  currentTree: object,
  intent: DiscoveryIntent,
  framework?: string
): string {
  let prompt = `Current UI Tree (modify this based on my request):
\`\`\`json
${JSON.stringify(currentTree, null, 2)}
\`\`\`

User Request: ${userRequest}`;

  if (framework) {
    prompt += `\n\nNote: This UI will be rendered using ${framework} components.`;
  }

  // Add intent context hint
  if (intent.intent !== 'general') {
    prompt += `\n\nIntent: This refinement appears to be ${intent.intent}-related. Consider using relevant components for this use case.`;
  }

  return prompt;
}

/**
 * Calculate token usage for monitoring
 */
export interface TokenUsage {
  core: number;
  mcp: number;
  total: number;
  withinBudget: boolean;
  maxBudget: number;
}

export function calculateTokenUsage(
  mcpComponentCount: number,
  config: Partial<DynamicPromptConfig> = {}
): TokenUsage {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  const coreTokens = getCoreComponentTokenEstimate();
  const mcpTokens = estimateComponentTokens(mcpComponentCount);
  const totalTokens = coreTokens + mcpTokens;

  return {
    core: coreTokens,
    mcp: mcpTokens,
    total: totalTokens,
    withinBudget: totalTokens <= finalConfig.maxTokens,
    maxBudget: finalConfig.maxTokens,
  };
}
