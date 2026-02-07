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
  // Component search functions (for batch API)
  searchUILayouts,
  searchShadcn,
  searchTailwind,
  searchFlowbite,
  searchChakraUI,
  searchMagicUI,
  searchAceternityUI,
  searchMUI,
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

// Smart Discovery Engine
export {
  analyzeRequest as analyzeDiscoveryIntent,
  prioritizeComponents,
  estimateComponentTokens,
  withinTokenBudget,
  adjustForBudget,
} from './smart-discovery';
export type {
  DiscoveryIntent,
  ComponentPriority,
} from './smart-discovery';

// Animation Performance Scoring
export {
  scoreAnimationPerformance,
  getPerformanceTier,
  formatPerformanceSummary,
  analyzeAnimationDependencies,
  estimateBundleImpact,
} from './animation-performance';
export type { PerformanceScore } from './animation-performance';

// Query Enhancement Engine
export {
  enhanceQuery,
  enhanceQueries,
  getSynonyms,
  getRelatedTerms,
  getIntentTerms,
  expandSearchQuery,
  mergeEnhancements,
  getDictionaryStats,
} from './query-enhancer';
export type {
  QueryEnhancement,
  QueryEnhancerOptions,
} from './query-enhancer';

// User Preference Learning
export {
  PreferenceLearner,
  createPreferenceLearner,
  getPreferenceLearner,
  resetPreferenceLearner,
} from './preference-learner';
export type { UserPreferences } from './preference-learner';

// Cross-Framework Similarity Scorer
export {
  calculateSimilarity,
  findSimilarComponents,
  rankComponentsByRelevance,
  findButtonVariants,
  findAnimatedCards,
  clusterBySimilarity,
  formatSimilarityResults,
  benchmarkSimilarity,
} from './similarity-scorer';
export type {
  SimilarityScore,
  SimilarityOptions,
  RankingOptions,
} from './similarity-scorer';

// Advanced Category Filtering (Phase 3)
export {
  filterComponents,
  filterComponentsWithMetrics,
  filterByCategory,
  filterByComplexity,
  filterByAnimation,
  filterByFramework,
  suggestFilters,
  applyFilterSuggestions,
  rankByFilters,
  estimateComponentBundleSize,
  getBundleSizeCategory,
  combineFilters,
} from './advanced-filter';
export type {
  ComponentFilters,
  FilterSuggestion,
  FilterResult,
  FrameworkType,
  AnimationType,
  ComplexityLevel,
  BundleSizeCategory,
} from './advanced-filter';

// Component Recommendation System (Phase 3)
export {
  RecommendationEngine,
  createRecommendationEngine,
  quickRecommend,
} from './recommendation-engine';
export type {
  RecommendationContext,
  RecommendationType,
  ComponentRecommendation,
  RecommendationOptions,
  RecommendationResult,
} from './recommendation-engine';
