/**
 * Advanced Category Filtering System (Phase 3)
 *
 * Intelligent filtering system that uses categories, tags, metadata, and smart suggestions
 * to filter and rank components effectively across multiple dimensions.
 *
 * Features:
 * - Multi-dimensional filtering (category, framework, source, complexity, animation, etc.)
 * - Smart filter suggestions from natural language queries
 * - Efficient filtering with <50ms performance for 200+ components
 * - Combination filters with AND/OR logic
 * - Performance-based ranking
 */

import type { ComponentMetadata, ComponentCategory, MCPServerType } from './types';

// ============================================================================
// Filter Interfaces
// ============================================================================

export type FrameworkType = 'react' | 'vue' | 'svelte' | 'html';
export type AnimationType = 'framer-motion' | 'css' | 'gsap' | 'spring';
export type ComplexityLevel = 'simple' | 'medium' | 'complex';
export type BundleSizeCategory = 'small' | 'medium' | 'large';

export interface ComponentFilters {
  /** Filter by categories (OR within categories) */
  categories?: ComponentCategory[];

  /** Filter by frameworks (OR within frameworks) */
  frameworks?: FrameworkType[];

  /** Filter by MCP sources (OR within sources) */
  sources?: MCPServerType[];

  /** Filter by animation presence */
  hasAnimations?: boolean;

  /** Filter by animation type */
  animationType?: AnimationType | AnimationType[];

  /** Filter by complexity levels (OR within complexity) */
  complexity?: ComplexityLevel[];

  /** Maximum bundle size in KB */
  maxBundleSize?: number;

  /** Filter by tags (OR within tags) */
  tags?: string[];

  /** Custom filter function for advanced filtering */
  customFilter?: (comp: ComponentMetadata) => boolean;

  /** Minimum component match score (0-1) */
  minScore?: number;
}

export interface FilterSuggestion {
  /** Filter dimension name */
  dimension: keyof ComponentFilters;

  /** Suggested value for this dimension */
  value: unknown;

  /** Reasoning for this suggestion */
  reasoning: string;

  /** Confidence score (0-1) */
  confidence: number;
}

export interface FilterResult {
  /** Filtered components */
  components: ComponentMetadata[];

  /** Total matches before limit */
  totalMatches: number;

  /** Applied filters */
  appliedFilters: ComponentFilters;

  /** Performance metrics */
  performanceMs: number;
}

// ============================================================================
// Bundle Size Estimations (in KB)
// ============================================================================

const LIBRARY_BUNDLE_SIZES: Record<string, number> = {
  'framer-motion': 52,
  'react-spring': 28,
  'gsap': 45,
  '@react-spring/web': 28,
  'lottie-react': 35,
  '@mui/material': 85,
  '@chakra-ui/react': 78,
  'antd': 120,
  'react': 6,
  'react-dom': 40,
};

const SOURCE_BASE_SIZES: Record<MCPServerType, number> = {
  'shadcn-ui': 5,
  'magic-ui': 15,
  'aceternity-ui': 18,
  'mui': 85,
  'chakra-ui': 78,
  'flowbite': 12,
  'ui-layouts': 8,
  'tailwindcss': 3,
  'context7': 0,
  'figma': 0,
  'lucide-icons': 2,
  'heroicons': 1,
  'iconify': 1,
  'unsplash': 0,
  'pexels': 0,
};

// ============================================================================
// Filter Suggestion Patterns
// ============================================================================

interface FilterPattern {
  keywords: string[];
  filters: Partial<ComponentFilters>;
  confidence: number;
}

const FILTER_PATTERNS: FilterPattern[] = [
  // Animation patterns
  {
    keywords: ['animated', 'animation', 'motion', 'moving'],
    filters: { hasAnimations: true },
    confidence: 0.95,
  },
  {
    keywords: ['shimmer', 'shine', 'glow', 'sparkle'],
    filters: { hasAnimations: true, sources: ['magic-ui', 'aceternity-ui'] },
    confidence: 0.90,
  },
  {
    keywords: ['3d', 'perspective', 'depth'],
    filters: { hasAnimations: true, complexity: ['complex'], sources: ['aceternity-ui'] },
    confidence: 0.85,
  },

  // Complexity patterns
  {
    keywords: ['simple', 'basic', 'minimal', 'clean'],
    filters: { complexity: ['simple'] },
    confidence: 0.90,
  },
  {
    keywords: ['complex', 'advanced', 'sophisticated', 'rich'],
    filters: { complexity: ['complex'] },
    confidence: 0.85,
  },

  // Category patterns
  {
    keywords: ['button', 'btn', 'cta', 'action'],
    filters: { categories: ['forms'] },
    confidence: 0.90,
  },
  {
    keywords: ['card', 'panel', 'tile'],
    filters: { categories: ['cards'] },
    confidence: 0.95,
  },
  {
    keywords: ['form', 'input', 'field'],
    filters: { categories: ['forms', 'inputs'] },
    confidence: 0.95,
  },
  {
    keywords: ['table', 'grid', 'data'],
    filters: { categories: ['data-display'] },
    confidence: 0.90,
  },
  {
    keywords: ['navigation', 'nav', 'menu', 'sidebar'],
    filters: { categories: ['navigation'] },
    confidence: 0.95,
  },
  {
    keywords: ['chart', 'graph', 'visualization'],
    filters: { categories: ['charts'] },
    confidence: 0.95,
  },
  {
    keywords: ['modal', 'dialog', 'popup', 'overlay'],
    filters: { categories: ['overlay'] },
    confidence: 0.90,
  },

  // Framework patterns
  {
    keywords: ['react', 'jsx', 'tsx'],
    filters: { frameworks: ['react'] },
    confidence: 0.95,
  },
  {
    keywords: ['html', 'static', 'vanilla'],
    filters: { frameworks: ['html'] },
    confidence: 0.90,
  },

  // Source patterns
  {
    keywords: ['shadcn', 'radix'],
    filters: { sources: ['shadcn-ui'] },
    confidence: 0.95,
  },
  {
    keywords: ['material', 'mui', 'material-ui'],
    filters: { sources: ['mui'] },
    confidence: 0.95,
  },
  {
    keywords: ['chakra'],
    filters: { sources: ['chakra-ui'] },
    confidence: 0.95,
  },
  {
    keywords: ['magic ui', 'magicui'],
    filters: { sources: ['magic-ui'] },
    confidence: 0.95,
  },
  {
    keywords: ['aceternity'],
    filters: { sources: ['aceternity-ui'] },
    confidence: 0.95,
  },

  // Performance patterns
  {
    keywords: ['lightweight', 'fast', 'performant', 'small'],
    filters: { maxBundleSize: 20, complexity: ['simple'] },
    confidence: 0.85,
  },
  {
    keywords: ['mobile', 'responsive', 'touch'],
    filters: { maxBundleSize: 30, complexity: ['simple', 'medium'] },
    confidence: 0.80,
  },
];

// ============================================================================
// Core Filtering Functions
// ============================================================================

/**
 * Filter components based on multiple criteria
 *
 * @param components - Array of components to filter
 * @param filters - Filter criteria
 * @returns Filtered components
 */
export function filterComponents(
  components: ComponentMetadata[],
  filters: ComponentFilters
): ComponentMetadata[] {
  const startTime = performance.now();

  let filtered = components;

  // Category filter (OR logic)
  if (filters.categories && filters.categories.length > 0) {
    filtered = filtered.filter((comp) =>
      filters.categories!.includes(comp.category)
    );
  }

  // Framework filter (OR logic)
  if (filters.frameworks && filters.frameworks.length > 0) {
    filtered = filtered.filter((comp) =>
      comp.framework ? filters.frameworks!.includes(comp.framework) : false
    );
  }

  // Source filter (OR logic)
  if (filters.sources && filters.sources.length > 0) {
    filtered = filtered.filter((comp) =>
      filters.sources!.includes(comp.source)
    );
  }

  // Animation presence filter
  if (filters.hasAnimations !== undefined) {
    filtered = filtered.filter((comp) =>
      filters.hasAnimations ? !!comp.animations : !comp.animations
    );
  }

  // Animation type filter
  if (filters.animationType) {
    const types = Array.isArray(filters.animationType)
      ? filters.animationType
      : [filters.animationType];
    filtered = filtered.filter((comp) =>
      comp.animations ? types.includes(comp.animations.type) : false
    );
  }

  // Complexity filter (OR logic)
  if (filters.complexity && filters.complexity.length > 0) {
    filtered = filtered.filter((comp) =>
      comp.animations
        ? filters.complexity!.includes(comp.animations.complexity)
        : filters.complexity!.includes('simple') // Non-animated = simple
    );
  }

  // Bundle size filter
  if (filters.maxBundleSize !== undefined) {
    filtered = filtered.filter((comp) => {
      const estimatedSize = estimateComponentBundleSize(comp);
      return estimatedSize <= filters.maxBundleSize!;
    });
  }

  // Tags filter (OR logic)
  if (filters.tags && filters.tags.length > 0) {
    filtered = filtered.filter((comp) =>
      filters.tags!.some((tag) =>
        comp.tags.some((compTag) =>
          compTag.toLowerCase().includes(tag.toLowerCase())
        )
      )
    );
  }

  // Custom filter
  if (filters.customFilter) {
    filtered = filtered.filter(filters.customFilter);
  }

  const endTime = performance.now();
  const performanceMs = endTime - startTime;

  // Log performance warning if slow
  if (performanceMs > 50) {
    console.warn(
      `Filter performance exceeded 50ms target: ${performanceMs.toFixed(2)}ms for ${components.length} components`
    );
  }

  return filtered;
}

/**
 * Filter components and return detailed results
 */
export function filterComponentsWithMetrics(
  components: ComponentMetadata[],
  filters: ComponentFilters,
  limit?: number
): FilterResult {
  const startTime = performance.now();

  const filtered = filterComponents(components, filters);
  const totalMatches = filtered.length;
  const limitedResults = limit ? filtered.slice(0, limit) : filtered;

  const endTime = performance.now();

  return {
    components: limitedResults,
    totalMatches,
    appliedFilters: filters,
    performanceMs: endTime - startTime,
  };
}

/**
 * Filter by specific category with optional strict matching
 *
 * @param components - Components to filter
 * @param category - Category to filter by
 * @param strictMatch - If true, only exact category match; if false, include similar categories
 */
export function filterByCategory(
  components: ComponentMetadata[],
  category: ComponentCategory,
  strictMatch: boolean = true
): ComponentMetadata[] {
  if (strictMatch) {
    return components.filter((comp) => comp.category === category);
  }

  // Non-strict: include related categories
  const relatedCategories = getRelatedCategories(category);
  return components.filter((comp) => relatedCategories.includes(comp.category));
}

/**
 * Filter by complexity level with maximum threshold
 */
export function filterByComplexity(
  components: ComponentMetadata[],
  maxComplexity: ComplexityLevel
): ComponentMetadata[] {
  const complexityOrder: ComplexityLevel[] = ['simple', 'medium', 'complex'];
  const maxIndex = complexityOrder.indexOf(maxComplexity);

  return components.filter((comp) => {
    if (!comp.animations) return true; // Non-animated = simple, always included

    const compIndex = complexityOrder.indexOf(comp.animations.complexity);
    return compIndex <= maxIndex;
  });
}

/**
 * Filter by animation requirements
 */
export function filterByAnimation(
  components: ComponentMetadata[],
  requirements: {
    hasAnimation?: boolean;
    type?: AnimationType | AnimationType[];
    maxComplexity?: ComplexityLevel;
  }
): ComponentMetadata[] {
  let filtered = components;

  if (requirements.hasAnimation !== undefined) {
    filtered = filtered.filter((comp) =>
      requirements.hasAnimation ? !!comp.animations : !comp.animations
    );
  }

  if (requirements.type) {
    const types = Array.isArray(requirements.type)
      ? requirements.type
      : [requirements.type];
    filtered = filtered.filter((comp) =>
      comp.animations ? types.includes(comp.animations.type) : false
    );
  }

  if (requirements.maxComplexity) {
    filtered = filterByComplexity(filtered, requirements.maxComplexity);
  }

  return filtered;
}

/**
 * Filter by framework type
 */
export function filterByFramework(
  components: ComponentMetadata[],
  framework: FrameworkType
): ComponentMetadata[] {
  return components.filter((comp) => comp.framework === framework);
}

// ============================================================================
// Smart Filter Suggestions
// ============================================================================

/**
 * Analyze query and suggest relevant filters
 *
 * @param query - User's natural language query
 * @param intent - Optional intent context for better suggestions
 * @returns Array of filter suggestions
 */
export function suggestFilters(
  query: string,
  intent?: string
): FilterSuggestion[] {
  const normalizedQuery = query.toLowerCase();
  const suggestions: FilterSuggestion[] = [];
  const seenDimensions = new Set<string>();

  // Match against patterns
  for (const pattern of FILTER_PATTERNS) {
    const matches = pattern.keywords.filter((keyword) =>
      normalizedQuery.includes(keyword)
    );

    if (matches.length > 0) {
      // Generate suggestions from matched pattern
      for (const [dimension, value] of Object.entries(pattern.filters)) {
        const key = `${dimension}:${JSON.stringify(value)}`;
        if (seenDimensions.has(key)) continue;
        seenDimensions.add(key);

        suggestions.push({
          dimension: dimension as keyof ComponentFilters,
          value,
          reasoning: `Detected "${matches.join(', ')}" in query`,
          confidence: pattern.confidence * (matches.length / pattern.keywords.length),
        });
      }
    }
  }

  // Intent-based suggestions
  if (intent) {
    const intentSuggestions = generateIntentBasedSuggestions(intent);
    suggestions.push(...intentSuggestions);
  }

  // Sort by confidence and return top suggestions
  return suggestions
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 10); // Limit to top 10 suggestions
}

/**
 * Apply filter suggestions to components
 */
export function applyFilterSuggestions(
  components: ComponentMetadata[],
  suggestions: FilterSuggestion[],
  minConfidence: number = 0.7
): ComponentMetadata[] {
  const filters: ComponentFilters = {};

  // Convert suggestions to filters (only high confidence)
  for (const suggestion of suggestions) {
    if (suggestion.confidence >= minConfidence) {
      (filters as any)[suggestion.dimension] = suggestion.value;
    }
  }

  return filterComponents(components, filters);
}

/**
 * Generate intent-based filter suggestions
 */
function generateIntentBasedSuggestions(intent: string): FilterSuggestion[] {
  const suggestions: FilterSuggestion[] = [];

  const intentMap: Record<string, Partial<ComponentFilters>> = {
    'landing-page': {
      categories: ['marketing', 'cards', 'layout'],
      hasAnimations: true,
      complexity: ['medium', 'complex'],
      sources: ['magic-ui', 'aceternity-ui', 'shadcn-ui'],
    },
    dashboard: {
      categories: ['data-display', 'charts', 'cards'],
      complexity: ['simple', 'medium'],
      sources: ['shadcn-ui', 'mui', 'chakra-ui'],
    },
    form: {
      categories: ['forms', 'inputs'],
      complexity: ['simple', 'medium'],
      sources: ['shadcn-ui', 'mui', 'chakra-ui'],
    },
    mobile: {
      maxBundleSize: 30,
      complexity: ['simple', 'medium'],
      hasAnimations: false,
    },
  };

  const intentFilters = intentMap[intent.toLowerCase()];
  if (intentFilters) {
    for (const [dimension, value] of Object.entries(intentFilters)) {
      suggestions.push({
        dimension: dimension as keyof ComponentFilters,
        value,
        reasoning: `Based on intent: ${intent}`,
        confidence: 0.80,
      });
    }
  }

  return suggestions;
}

// ============================================================================
// Ranking Functions
// ============================================================================

/**
 * Rank filtered components based on filters and preferences
 *
 * @param components - Components to rank
 * @param filters - Applied filters
 * @param preferences - Optional user preferences
 * @returns Ranked components
 */
export function rankByFilters(
  components: ComponentMetadata[],
  filters: ComponentFilters,
  preferences?: {
    preferAnimated?: boolean;
    preferSimple?: boolean;
    preferredSources?: MCPServerType[];
  }
): ComponentMetadata[] {
  return components
    .map((comp) => ({
      component: comp,
      score: calculateComponentScore(comp, filters, preferences),
    }))
    .sort((a, b) => b.score - a.score)
    .map((item) => item.component);
}

/**
 * Calculate relevance score for a component
 */
function calculateComponentScore(
  component: ComponentMetadata,
  filters: ComponentFilters,
  preferences?: {
    preferAnimated?: boolean;
    preferSimple?: boolean;
    preferredSources?: MCPServerType[];
  }
): number {
  let score = 0;

  // Category match bonus
  if (filters.categories?.includes(component.category)) {
    score += 10;
  }

  // Framework match bonus
  if (filters.frameworks?.includes(component.framework!)) {
    score += 8;
  }

  // Source match bonus
  if (filters.sources?.includes(component.source)) {
    score += 7;
  }

  // Animation preferences
  if (preferences?.preferAnimated && component.animations) {
    score += 5;
  }

  // Complexity preferences
  if (preferences?.preferSimple) {
    if (!component.animations || component.animations.complexity === 'simple') {
      score += 6;
    }
  }

  // Preferred sources
  if (preferences?.preferredSources?.includes(component.source)) {
    score += 8;
  }

  // Tag match bonus
  if (filters.tags) {
    const tagMatches = filters.tags.filter((tag) =>
      component.tags.some((compTag) =>
        compTag.toLowerCase().includes(tag.toLowerCase())
      )
    );
    score += tagMatches.length * 3;
  }

  // Bundle size bonus (smaller is better)
  if (filters.maxBundleSize) {
    const componentSize = estimateComponentBundleSize(component);
    const sizeRatio = componentSize / filters.maxBundleSize;
    if (sizeRatio <= 1) {
      score += (1 - sizeRatio) * 5; // Max 5 points for smallest components
    }
  }

  return score;
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Estimate component bundle size in KB
 */
export function estimateComponentBundleSize(component: ComponentMetadata): number {
  let size = SOURCE_BASE_SIZES[component.source] || 10;

  if (component.dependencies) {
    const deps = Array.isArray(component.dependencies)
      ? component.dependencies
      : component.dependencies.npm || [];

    for (const dep of deps) {
      size += LIBRARY_BUNDLE_SIZES[dep] || 10;
    }
  }

  // Animation overhead
  if (component.animations) {
    if (component.animations.complexity === 'complex') {
      size += 15;
    } else if (component.animations.complexity === 'medium') {
      size += 8;
    } else {
      size += 3;
    }
  }

  return size;
}

/**
 * Get related categories for non-strict filtering
 */
function getRelatedCategories(category: ComponentCategory): ComponentCategory[] {
  const categoryGroups: Record<string, ComponentCategory[]> = {
    forms: ['forms', 'inputs'],
    cards: ['cards', 'data-display'],
    navigation: ['navigation', 'layout'],
    marketing: ['marketing', 'blocks', 'cards'],
    dashboard: ['dashboard', 'data-display', 'charts'],
  };

  return categoryGroups[category] || [category];
}

/**
 * Get bundle size category
 */
export function getBundleSizeCategory(sizeKB: number): BundleSizeCategory {
  if (sizeKB <= 20) return 'small';
  if (sizeKB <= 50) return 'medium';
  return 'large';
}

/**
 * Combine multiple filters with AND logic
 */
export function combineFilters(...filters: ComponentFilters[]): ComponentFilters {
  const combined: ComponentFilters = {};

  for (const filter of filters) {
    // Merge arrays (unique values only)
    if (filter.categories) {
      combined.categories = [
        ...(combined.categories || []),
        ...filter.categories,
      ].filter((v, i, a) => a.indexOf(v) === i);
    }

    if (filter.frameworks) {
      combined.frameworks = [
        ...(combined.frameworks || []),
        ...filter.frameworks,
      ].filter((v, i, a) => a.indexOf(v) === i);
    }

    if (filter.sources) {
      combined.sources = [
        ...(combined.sources || []),
        ...filter.sources,
      ].filter((v, i, a) => a.indexOf(v) === i);
    }

    if (filter.complexity) {
      combined.complexity = [
        ...(combined.complexity || []),
        ...filter.complexity,
      ].filter((v, i, a) => a.indexOf(v) === i);
    }

    if (filter.tags) {
      combined.tags = [...(combined.tags || []), ...filter.tags].filter(
        (v, i, a) => a.indexOf(v) === i
      );
    }

    // Override single values
    if (filter.hasAnimations !== undefined) {
      combined.hasAnimations = filter.hasAnimations;
    }

    if (filter.animationType) {
      combined.animationType = filter.animationType;
    }

    if (filter.maxBundleSize !== undefined) {
      // Use minimum bundle size constraint
      combined.maxBundleSize = Math.min(
        combined.maxBundleSize ?? Infinity,
        filter.maxBundleSize
      );
    }

    if (filter.minScore !== undefined) {
      // Use maximum score constraint
      combined.minScore = Math.max(
        combined.minScore ?? 0,
        filter.minScore
      );
    }

    // Combine custom filters with AND logic
    if (filter.customFilter) {
      const existingFilter = combined.customFilter;
      combined.customFilter = existingFilter
        ? (comp) => existingFilter(comp) && filter.customFilter!(comp)
        : filter.customFilter;
    }
  }

  return combined;
}
