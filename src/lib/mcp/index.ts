/**
 * MCP Module Exports
 *
 * Unified exports for MCP (Model Context Protocol) integration.
 */

// Types
export * from './types';

// MCP Client
export { MCPClient, mcpClient, MCP_SERVERS } from './mcp-client';
export {
  connectToServer,
  disconnectFromServer,
  callTool,
  searchAllServers,
  fetchComponentSource,
  getConnectionStatus,
} from './mcp-client';

// Dynamic Registry
export {
  buildDynamicRegistry,
  getCachedComponent,
  cacheComponent,
  clearComponentCache,
  addToRegistryStore,
  getRegistryStore,
  getRegistryComponents,
  clearRegistryStore,
  fallbackComponents,
} from './dynamic-registry';
export type { DynamicRegistryOptions, RegistryStore } from './dynamic-registry';

// Component Analyzer
export {
  analyzeRequest,
  getRecommendedSources,
  generateComponentHierarchy,
  extractComponentNames,
} from './component-analyzer';
