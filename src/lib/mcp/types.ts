/**
 * MCP Types - Type definitions for MCP server integration
 */

// MCP Server Configuration
export interface MCPServerConfig {
  name: string;
  displayName: string;
  description: string;
  command: string;
  args: string[];
  env?: Record<string, string>;
}

// Available MCP Servers
export const MCP_SERVERS: Record<string, MCPServerConfig> = {
  'ui-layouts': {
    name: 'ui-layouts',
    displayName: 'UI Layouts',
    description: 'Search and discover UI components from ui-layouts.com',
    command: 'npx',
    args: ['@ui-layouts/mcp'],
  },
  'shadcn-ui': {
    name: 'shadcn-ui',
    displayName: 'Shadcn/UI',
    description: 'Search, install, and fetch Shadcn/UI components',
    command: 'npx',
    args: ['@heilgar/shadcn-ui-mcp-server'],
  },
  'tailwindcss': {
    name: 'tailwindcss',
    displayName: 'Tailwind CSS',
    description: 'Tailwind CSS utilities, documentation, and templates',
    command: 'npx',
    args: ['-y', 'tailwindcss-mcp-server'],
  },
  'flowbite': {
    name: 'flowbite',
    displayName: 'Flowbite',
    description: 'Flowbite + Tailwind CSS components and themes',
    command: 'npx',
    args: ['-y', 'flowbite-mcp'],
  },
};

// MCP Tool Call
export interface MCPToolCall {
  name: string;
  arguments: Record<string, unknown>;
}

// MCP Tool Result
export interface MCPToolResult {
  success: boolean;
  content: unknown;
  error?: string;
}

// UI Layouts MCP Tools
export interface UILayoutsSearchParams {
  query: string;
  tags?: string[];
  maxResults?: number;
}

export interface UILayoutsComponent {
  key: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  href: string;
}

export interface UILayoutsSearchResult {
  components: UILayoutsComponent[];
  total: number;
}

export interface UILayoutsDocParams {
  key: string;
  format?: 'html' | 'text' | 'snippet';
}

export interface UILayoutsSourceParams {
  componentName: string;
}

// Shadcn MCP Tools
export interface ShadcnComponent {
  name: string;
  description: string;
  dependencies: string[];
}

export interface ShadcnSearchResult {
  components: ShadcnComponent[];
}

// Tailwind MCP Tools
export interface TailwindUtility {
  name: string;
  description: string;
  examples: string[];
}

export interface TailwindSearchResult {
  utilities: TailwindUtility[];
}

// Flowbite MCP Tools
export interface FlowbiteComponent {
  name: string;
  description: string;
  category: string;
  variants: string[];
}

export interface FlowbiteSearchResult {
  components: FlowbiteComponent[];
}

// Generic Component Metadata (normalized from MCP results)
export interface ComponentMetadata {
  id: string;
  name: string;
  displayName: string;
  description: string;
  category: string;
  tags: string[];
  source: 'ui-layouts' | 'shadcn' | 'tailwind' | 'flowbite';
  sourceCode?: string;
  documentation?: string;
  props?: Record<string, PropMetadata>;
}

export interface PropMetadata {
  name: string;
  type: string;
  description?: string;
  required?: boolean;
  default?: unknown;
  options?: string[];
}
