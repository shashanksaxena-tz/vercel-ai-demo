/**
 * MCP Server Types and Interfaces
 *
 * Defines the contract for interacting with various MCP component servers:
 * - ui-layouts (@ui-layouts/mcp)
 * - shadcn-ui (@jpisnice/shadcn-ui-mcp-server)
 * - tailwindcss (tailwindcss-mcp-server)
 * - flowbite (flowbite-mcp)
 * - chakra-ui (@chakra-ui/react-mcp)
 * - magic-ui (@magicuidesign/mcp)
 * - aceternity-ui (aceternityui-mcp)
 * - mui (@mui/mcp)
 * - context7 (@upstash/context7-mcp) - Documentation fetcher
 * - figma (Figma MCP server)
 */

// ============================================================================
// Core MCP Types
// ============================================================================

export type MCPServerType =
  | 'ui-layouts'
  | 'shadcn-ui'
  | 'tailwindcss'
  | 'flowbite'
  | 'chakra-ui'
  | 'magic-ui'
  | 'aceternity-ui'
  | 'mui'
  | 'context7'
  | 'figma';

export interface MCPServerConfig {
  type: MCPServerType;
  name: string;
  displayName: string;
  description: string;
  command: string;
  args: string[];
  env?: Record<string, string>;
  enabled: boolean;
  tools?: string[]; // List of available tools
}

export const MCP_SERVERS: Record<MCPServerType, MCPServerConfig> = {
  'ui-layouts': {
    type: 'ui-layouts',
    name: 'ui-layouts',
    displayName: 'UI Layouts',
    description: 'Search and discover UI components from ui-layouts.com',
    command: 'npx',
    args: ['-y', '@ui-layouts/mcp'],
    enabled: true,
    tools: ['search_components', 'get_docs', 'get_component_meta', 'get_source_code'],
  },
  'shadcn-ui': {
    type: 'shadcn-ui',
    name: 'shadcn-ui',
    displayName: 'Shadcn/UI',
    description: 'Search, install, and fetch Shadcn/UI components with demos',
    command: 'npx',
    args: ['-y', '@jpisnice/shadcn-ui-mcp-server'],
    enabled: true,
    tools: ['list_components', 'get_component', 'get_component_source', 'get_blocks'],
  },
  'tailwindcss': {
    type: 'tailwindcss',
    name: 'tailwindcss',
    displayName: 'Tailwind CSS',
    description: 'Tailwind CSS utilities, documentation, and templates',
    command: 'npx',
    args: ['-y', 'tailwindcss-mcp-server'],
    enabled: true,
    tools: ['get_tailwind_utilities', 'get_tailwind_colors', 'generate_component_template', 'search_tailwind_docs'],
  },
  'flowbite': {
    type: 'flowbite',
    name: 'flowbite',
    displayName: 'Flowbite',
    description: 'Flowbite + Tailwind CSS components and themes (60+ components)',
    command: 'npx',
    args: ['-y', 'flowbite-mcp'],
    enabled: true,
    tools: ['list_resources', 'get_resource', 'generate_theme'],
  },
  'chakra-ui': {
    type: 'chakra-ui',
    name: 'chakra-ui',
    displayName: 'Chakra UI',
    description: 'Chakra UI components with theming and design tokens',
    command: 'npx',
    args: ['-y', '@chakra-ui/react-mcp@latest'],
    enabled: true,
    tools: ['list_components', 'get_component_example', 'get_component_props', 'get_theme', 'customize_theme'],
  },
  'magic-ui': {
    type: 'magic-ui',
    name: 'magic-ui',
    displayName: 'Magic UI',
    description: 'Beautiful animated components for React (motion, text effects, widgets)',
    command: 'npx',
    args: ['-y', '@magicuidesign/mcp@latest'],
    enabled: true,
    tools: ['getUIComponents', 'getLayout', 'getMedia', 'getMotion', 'getTextReveal', 'getTextEffects', 'getButtons', 'getEffects', 'getWidgets', 'getDevices'],
  },
  'aceternity-ui': {
    type: 'aceternity-ui',
    name: 'aceternity-ui',
    displayName: 'Aceternity UI',
    description: 'Modern animated UI components with Framer Motion',
    command: 'npx',
    args: ['-y', 'aceternityui-mcp'],
    enabled: true,
    tools: ['search_components', 'get_component_info', 'get_installation_info', 'list_categories', 'get_all_components'],
  },
  'mui': {
    type: 'mui',
    name: 'mui',
    displayName: 'Material UI',
    description: 'Material UI React components (50+ components)',
    command: 'npx',
    args: ['-y', '@mui/mcp@latest'],
    enabled: true,
    tools: ['list_components', 'search_components', 'get_component_info', 'get_customization_guide', 'get_setup_guide'],
  },
  'context7': {
    type: 'context7',
    name: 'context7',
    displayName: 'Context7',
    description: 'Fetch up-to-date documentation for any library',
    command: 'npx',
    args: ['-y', '@upstash/context7-mcp'],
    enabled: true,
    tools: ['resolve-library-id', 'query-docs'],
  },
  'figma': {
    type: 'figma',
    name: 'figma',
    displayName: 'Figma',
    description: 'Extract design context and tokens from Figma designs',
    command: 'http', // Uses HTTP transport, not stdio
    args: ['http://127.0.0.1:3845/mcp'],
    enabled: false, // Requires Figma Desktop
    tools: ['get_design_context', 'get_variable_defs', 'get_code_connect_map', 'get_metadata'],
  },
};

export interface MCPConnection {
  serverId: MCPServerType;
  status: 'disconnected' | 'connecting' | 'connected' | 'error';
  error?: string;
  tools: MCPTool[];
  resources: MCPResource[];
}

export interface MCPTool {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
}

export interface MCPResource {
  uri: string;
  name: string;
  mimeType?: string;
  description?: string;
}

export interface MCPToolCall {
  server: MCPServerType;
  name: string;
  arguments: Record<string, unknown>;
}

export interface MCPToolResult {
  success: boolean;
  content: unknown;
  error?: string;
  timing?: number;
}

// ============================================================================
// Component Discovery Types
// ============================================================================

export type ComponentCategory =
  | 'layout'
  | 'navigation'
  | 'forms'
  | 'inputs'
  | 'data-display'
  | 'feedback'
  | 'overlay'
  | 'typography'
  | 'media'
  | 'charts'
  | 'marketing'
  | 'dashboard'
  | 'blocks'
  | 'cards'
  | 'e-commerce'
  | 'authentication'
  | 'other';

export interface ComponentMetadata {
  id: string;
  name: string;
  displayName: string;
  description: string;
  category: ComponentCategory;
  tags: string[];
  source: MCPServerType;
  framework?: 'react' | 'vue' | 'svelte' | 'html';
  dependencies?: string[];
  props?: ComponentPropDef[];
  preview?: string;
  documentation?: string;
}

export interface ComponentPropDef {
  name: string;
  type: string;
  required: boolean;
  default?: unknown;
  description?: string;
  options?: unknown[];
}

export interface ComponentSearchQuery {
  query?: string;
  category?: ComponentCategory;
  tags?: string[];
  sources?: MCPServerType[];
  framework?: 'react' | 'vue' | 'svelte' | 'html';
  limit?: number;
}

export interface ComponentSearchResult {
  components: ComponentMetadata[];
  totalCount: number;
  sources: MCPServerType[];
  timing: number;
}

// ============================================================================
// Component Source Types
// ============================================================================

export interface ComponentSource {
  componentId: string;
  source: MCPServerType;
  code: string;
  language: 'typescript' | 'javascript' | 'html' | 'css';
  dependencies: ComponentDependency[];
  styles?: string;
  documentation?: string;
}

export interface ComponentDependency {
  name: string;
  version?: string;
  type: 'npm' | 'local' | 'peer';
}

export interface FetchComponentRequest {
  componentId: string;
  source: MCPServerType;
  framework?: 'react' | 'vue' | 'svelte' | 'html';
  includeStyles?: boolean;
  includeDocs?: boolean;
}

// ============================================================================
// UI Layouts MCP Types
// ============================================================================

export interface UILayoutsSearchParams {
  name?: string;
  key?: string;
  group?: string;
  tags?: string[];
  href?: string;
  query?: string;
}

export interface UILayoutsComponent {
  key: string;
  name: string;
  group: string;
  tags: string[];
  href: string;
  description?: string;
}

export interface UILayoutsDocResult {
  html?: string;
  text?: string;
  snippet?: string;
}

export interface UILayoutsMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  twitterCard?: string;
}

// ============================================================================
// Shadcn UI MCP Types
// ============================================================================

export interface ShadcnComponent {
  name: string;
  description: string;
  type: 'component' | 'block';
  dependencies: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
  files: ShadcnFile[];
}

export interface ShadcnFile {
  name: string;
  content: string;
  type: 'component' | 'style' | 'util';
}

export interface ShadcnBlock {
  name: string;
  description: string;
  category: 'dashboard' | 'authentication' | 'settings' | 'calendar' | 'music' | 'mail' | 'tasks';
  components: string[];
}

// ============================================================================
// Tailwind CSS MCP Types
// ============================================================================

export interface TailwindUtility {
  name: string;
  className: string;
  description: string;
  category: string;
  cssProperties: string[];
}

export interface TailwindTemplate {
  name: string;
  html: string;
  description: string;
  category: string;
  classes: string[];
}

export interface TailwindColorPalette {
  name: string;
  colors: Record<string, string>;
}

export interface TailwindConfigGuide {
  framework: string;
  config: string;
  instructions: string;
}

// ============================================================================
// Flowbite MCP Types
// ============================================================================

export interface FlowbiteComponent {
  name: string;
  category: string;
  variants: string[];
  html: string;
  documentation: string;
}

export interface FlowbiteTheme {
  name: string;
  colors: Record<string, string>;
  variables: Record<string, string>;
}

// ============================================================================
// Figma MCP Types
// ============================================================================

export interface FigmaDesignContext {
  nodeId: string;
  name: string;
  type: string;
  code: string;
  tokens: FigmaDesignTokens;
}

export interface FigmaDesignTokens {
  colors: Record<string, string>;
  typography: Record<string, FigmaTypographyToken>;
  spacing: Record<string, string>;
  shadows: Record<string, string>;
}

export interface FigmaTypographyToken {
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing?: string;
}

// ============================================================================
// Dynamic Registry Types
// ============================================================================

export interface DynamicComponentDef {
  metadata: ComponentMetadata;
  source?: ComponentSource;
  loaded: boolean;
  loading: boolean;
  error?: string;
}

export interface DynamicRegistry {
  components: Map<string, DynamicComponentDef>;
  sources: Set<MCPServerType>;
  lastUpdated: Date;
}

// ============================================================================
// Request Analysis Types (for AI component identification)
// ============================================================================

export interface ComponentRequirement {
  type: string;
  purpose: string;
  suggestedComponents: string[];
  priority: 'required' | 'optional' | 'nice-to-have';
}

export interface UIAnalysis {
  intent: string;
  requirements: ComponentRequirement[];
  suggestedLayout: string;
  complexity: 'simple' | 'moderate' | 'complex';
  searchQueries: string[];
}

// ============================================================================
// API Request/Response Types
// ============================================================================

export interface DiscoverComponentsRequest {
  query: string;
  sources?: MCPServerType[];
  category?: ComponentCategory;
  limit?: number;
}

export interface DiscoverComponentsResponse {
  components: ComponentMetadata[];
  sources: MCPServerType[];
  timing: number;
}

export interface FetchSourceRequest {
  componentId: string;
  source: MCPServerType;
}

export interface FetchSourceResponse {
  source: ComponentSource;
  timing: number;
}

export interface AnalyzeRequestInput {
  userRequest: string;
}

export interface AnalyzeRequestResponse {
  analysis: UIAnalysis;
  suggestedComponents: ComponentMetadata[];
}

export interface BuildRegistryRequest {
  components: ComponentMetadata[];
}

export interface BuildRegistryResponse {
  registry: Record<string, DynamicComponentDef>;
  sources: MCPServerType[];
}
