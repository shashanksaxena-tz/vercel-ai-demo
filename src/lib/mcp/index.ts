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
  // Lucide Icons functions
  searchLucideIcons,
  getLucideIcon,
  listLucideCategories,
  // Heroicons functions
  searchHeroicons,
  getHeroicon,
  // Unsplash Images functions
  searchUnsplashImages,
  getRandomUnsplashImage,
  getUnsplashImage,
  // Pexels Images functions
  searchPexelsImages,
  getPexelsImage,
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
