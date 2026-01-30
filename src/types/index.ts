/**
 * Type definitions for the Generative UI Builder
 */

import type { UITree, UIElement } from '@json-render/core';

// Supported UI Frameworks/Libraries
export type UIFramework = 'shadcn' | 'tailwind' | 'flowbite' | 'mui' | 'antd';

// MCP Server Types
export type MCPServerType =
  | 'ui-layouts'
  | 'shadcn-ui'
  | 'tailwindcss'
  | 'flowbite'
  | 'figma';

// MCP Tool Response
export interface MCPToolResponse {
  success: boolean;
  data?: unknown;
  error?: string;
}

// Component Metadata
export interface ComponentMetadata {
  name: string;
  key: string;
  description: string;
  category: string;
  tags: string[];
  framework: UIFramework;
  props: Record<string, PropDefinition>;
  hasChildren: boolean;
  sourceCode?: string;
  documentation?: string;
}

// Property Definition
export interface PropDefinition {
  type: 'string' | 'number' | 'boolean' | 'array' | 'object' | 'enum';
  description?: string;
  required?: boolean;
  default?: unknown;
  enum?: string[];
}

// Registry Configuration
export interface RegistryConfig {
  name: string;
  displayName: string;
  description: string;
  framework: UIFramework;
  components: ComponentMetadata[];
  theme?: ThemeConfig;
}

// Theme Configuration
export interface ThemeConfig {
  colors: Record<string, string>;
  fonts: Record<string, string>;
  spacing: Record<string, string>;
  borderRadius: Record<string, string>;
}

// Builder State
export interface BuilderState {
  activeFramework: UIFramework;
  uiTree: UITree | null;
  preview: PreviewState;
  history: HistoryState;
}

// Preview State
export interface PreviewState {
  device: 'desktop' | 'tablet' | 'mobile';
  zoom: number;
  showGrid: boolean;
}

// History State for undo/redo
export interface HistoryState {
  past: UITree[];
  future: UITree[];
}

// Chat Message
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  uiTree?: UITree;
}

// Generation Request
export interface GenerationRequest {
  prompt: string;
  framework: UIFramework;
  context?: string;
  previousTree?: UITree;
}

// Generation Response
export interface GenerationResponse {
  success: boolean;
  tree?: UITree;
  error?: string;
  metadata?: {
    componentsUsed: string[];
    generationTime: number;
  };
}

// Test Case Definition
export interface TestCase {
  id: string;
  name: string;
  description: string;
  category: TestCategory;
  frameworks: UIFramework[];
  expectedTree: UITree;
  tags: string[];
}

// Test Categories
export type TestCategory =
  | 'layout'
  | 'navigation'
  | 'forms'
  | 'data-display'
  | 'feedback'
  | 'cards'
  | 'dashboards'
  | 'landing-pages'
  | 'e-commerce'
  | 'admin-panels'
  | 'auth'
  | 'pricing'
  | 'features'
  | 'testimonials'
  | 'footers'
  | 'headers';

// MCP Search Result
export interface MCPSearchResult {
  components: ComponentMetadata[];
  total: number;
  page: number;
  pageSize: number;
}

// Render Context
export interface RenderContext {
  framework: UIFramework;
  theme: ThemeConfig;
  data: Record<string, unknown>;
  actions: Record<string, () => void>;
}

// Export Tree for different formats
export interface ExportOptions {
  format: 'json' | 'jsx' | 'tsx' | 'html';
  framework: UIFramework;
  includeStyles: boolean;
  includeTypes: boolean;
}

// Re-export json-render types
export type { UITree, UIElement };
