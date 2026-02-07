/**
 * Component Recommendation System (Phase 3)
 *
 * AI-powered recommendation engine that suggests the best components based on:
 * - Context (intent, selected components)
 * - User preferences (learned from usage patterns)
 * - Query relevance (semantic matching)
 * - Component similarity (cross-framework alternatives)
 * - Performance requirements (bundle size, animations)
 *
 * Integrates:
 * - QueryEnhancer (Task #10) - Expands queries with synonyms and related terms
 * - SimilarityScorer (Task #11) - Finds similar components across frameworks
 * - PreferenceLearner (Task #12) - Personalizes based on user history
 * - AdvancedFilter (Task #13) - Filters candidates by criteria
 *
 * Performance target: Generate recommendations in <100ms for 200+ components
 */

import type { ComponentMetadata } from './types';
import {
  enhanceQuery,
  type QueryEnhancement,
} from './query-enhancer';
import {
  findSimilarComponents,
  calculateSimilarity,
  type SimilarityScore,
} from './similarity-scorer';
import {
  PreferenceLearner,
  type UserPreferences,
} from './preference-learner';
import {
  filterComponents,
  suggestFilters,
  applyFilterSuggestions,
  type ComponentFilters,
  type FilterSuggestion,
} from './advanced-filter';

// ============================================================================
// Core Interfaces
// ============================================================================

export interface RecommendationContext {
  /** Current user intent (e.g., "landing-page", "dashboard") */
  currentIntent: string;

  /** Components already selected by the user */
  selectedComponents: ComponentMetadata[];

  /** User preferences (learned from history) */
  userPreferences?: UserPreferences;

  /** Target frameworks to prioritize */
  targetFrameworks?: string[];

  /** Performance requirements */
  performanceRequirements?: {
    maxBundleSize?: number;
    requiresAnimation?: boolean;
    mobileFirst?: boolean;
  };
}

export type RecommendationType = 'primary' | 'alternative' | 'complementary' | 'upgrade';

export interface ComponentRecommendation {
  /** The recommended component */
  component: ComponentMetadata;

  /** Overall recommendation score (0-1, higher = better) */
  score: number;

  /** Type of recommendation */
  type: RecommendationType;

  /** Detailed reasoning for the recommendation */
  reasoning: string[];

  /** Confidence in this recommendation (0-1) */
  confidence: number;

  /** Score breakdown for transparency */
  breakdown: {
    queryRelevance: number; // 0-1
    intentAlignment: number; // 0-1
    userPreference: number; // 0-1
    componentSimilarity: number; // 0-1
    qualityScore: number; // 0-1
  };
}

export interface RecommendationOptions {
  /** Maximum number of results per recommendation type */
  maxResults?: number;

  /** Include alternative framework recommendations */
  includeAlternatives?: boolean;

  /** Include complementary component suggestions */
  includeComplementary?: boolean;

  /** Include upgrade suggestions */
  includeUpgrades?: boolean;

  /** Minimum confidence threshold (0-1) */
  minConfidence?: number;

  /** Enable verbose reasoning */
  verboseReasoning?: boolean;
}

export interface RecommendationResult {
  /** All recommendations grouped by type */
  recommendations: {
    primary: ComponentRecommendation[];
    alternative: ComponentRecommendation[];
    complementary: ComponentRecommendation[];
    upgrade: ComponentRecommendation[];
  };

  /** Query enhancement details */
  queryEnhancement: QueryEnhancement;

  /** Applied filters */
  appliedFilters: ComponentFilters;

  /** Filter suggestions */
  filterSuggestions: FilterSuggestion[];

  /** Performance metrics */
  performance: {
    totalTimeMs: number;
    queryEnhanceTimeMs: number;
    filterTimeMs: number;
    scoreTimeMs: number;
    componentsEvaluated: number;
  };
}

// ============================================================================
// Complementary Component Patterns
// ============================================================================

/**
 * Define which components are commonly used together
 */
const COMPLEMENTARY_PATTERNS: Record<string, string[]> = {
  // Common patterns
  button: ['card', 'badge', 'icon', 'spinner', 'tooltip'],
  card: ['typography', 'button', 'badge', 'image', 'icon'],
  form: ['input', 'select', 'checkbox', 'radio', 'button', 'textarea', 'label'],
  input: ['label', 'button', 'icon', 'validation', 'error'],
  modal: ['button', 'overlay', 'icon', 'heading', 'text'],
  navigation: ['link', 'icon', 'dropdown', 'search', 'badge'],
  table: ['pagination', 'search', 'filter', 'button', 'badge', 'checkbox'],
  chart: ['tooltip', 'legend', 'grid', 'label', 'card'],
  dashboard: ['chart', 'metric', 'stat', 'table', 'card', 'badge'],
  hero: ['heading', 'text', 'button', 'image', 'video', 'badge'],
  pricing: ['card', 'button', 'badge', 'list', 'heading', 'icon'],
  testimonial: ['card', 'avatar', 'rating', 'text', 'image'],
  timeline: ['card', 'icon', 'badge', 'text', 'heading'],
  accordion: ['icon', 'heading', 'text', 'button'],
  tabs: ['button', 'icon', 'badge', 'panel'],
  dropdown: ['button', 'icon', 'menu', 'list'],
  avatar: ['badge', 'icon', 'tooltip', 'image'],
  badge: ['icon', 'button', 'tooltip'],
  breadcrumb: ['link', 'icon', 'separator'],
  carousel: ['button', 'icon', 'image', 'pagination'],
  pagination: ['button', 'icon', 'select'],
  progress: ['label', 'text', 'percentage'],
  rating: ['icon', 'text', 'badge'],
  skeleton: ['card', 'text', 'image', 'avatar'],
  slider: ['label', 'tooltip', 'input'],
  stepper: ['button', 'icon', 'badge', 'text'],
  tag: ['icon', 'button', 'close'],
  toast: ['icon', 'button', 'text', 'close'],
  tooltip: ['icon', 'text', 'button'],
  tree: ['icon', 'checkbox', 'badge', 'text'],
};

/**
 * Quality score adjustments based on source
 */
const SOURCE_QUALITY_SCORES: Record<string, number> = {
  'shadcn-ui': 0.95,
  'magic-ui': 0.90,
  'aceternity-ui': 0.88,
  'mui': 0.92,
  'chakra-ui': 0.90,
  'flowbite': 0.85,
  'ui-layouts': 0.87,
  'tailwindcss': 0.88,
};

// ============================================================================
// Recommendation Engine Class
// ============================================================================

export class RecommendationEngine {
  private queryEnhancer: typeof enhanceQuery;
  private similarityScorer: typeof findSimilarComponents;
  private preferenceLearner: PreferenceLearner;
  private advancedFilter: typeof filterComponents;

  constructor(
    preferenceLearner: PreferenceLearner,
    options?: {
      queryEnhancer?: typeof enhanceQuery;
      similarityScorer?: typeof findSimilarComponents;
      advancedFilter?: typeof filterComponents;
    }
  ) {
    this.preferenceLearner = preferenceLearner;
    this.queryEnhancer = options?.queryEnhancer || enhanceQuery;
    this.similarityScorer = options?.similarityScorer || findSimilarComponents;
    this.advancedFilter = options?.advancedFilter || filterComponents;
  }

  // ==========================================================================
  // Main Recommendation Method
  // ==========================================================================

  /**
   * Generate comprehensive recommendations for a query
   */
  recommend(
    query: string,
    allComponents: ComponentMetadata[],
    context: RecommendationContext,
    options: RecommendationOptions = {}
  ): RecommendationResult {
    const startTime = performance.now();
    const performanceMetrics = {
      queryEnhanceTimeMs: 0,
      filterTimeMs: 0,
      scoreTimeMs: 0,
    };

    // Default options
    const {
      maxResults = 5,
      includeAlternatives = true,
      includeComplementary = true,
      includeUpgrades = true,
      minConfidence = 0.3,
    } = options;

    // Step 1: Enhance query
    const enhanceStart = performance.now();
    const queryEnhancement = this.queryEnhancer(query, context.currentIntent);
    performanceMetrics.queryEnhanceTimeMs = performance.now() - enhanceStart;

    // Step 2: Suggest and apply filters
    const filterStart = performance.now();
    const filterSuggestions = suggestFilters(query, context.currentIntent);
    const appliedFilters = this.buildFilters(context, filterSuggestions);
    const filteredComponents = this.advancedFilter(allComponents, appliedFilters);
    performanceMetrics.filterTimeMs = performance.now() - filterStart;

    // Step 3: Score and rank components
    const scoreStart = performance.now();
    const primary = this.getPrimaryRecommendations(
      query,
      filteredComponents,
      context,
      maxResults,
      queryEnhancement
    );

    const alternative = includeAlternatives
      ? this.getAlternativeRecommendations(
          context.selectedComponents[0],
          allComponents,
          context,
          maxResults
        )
      : [];

    const complementary = includeComplementary
      ? this.getComplementaryRecommendations(
          context.selectedComponents,
          allComponents,
          context,
          maxResults
        )
      : [];

    const upgrade = includeUpgrades && context.selectedComponents.length > 0
      ? this.getUpgradeRecommendations(
          context.selectedComponents[0],
          allComponents,
          maxResults
        )
      : [];

    performanceMetrics.scoreTimeMs = performance.now() - scoreStart;

    // Filter by minimum confidence
    const filterByConfidence = (recs: ComponentRecommendation[]) =>
      recs.filter(r => r.confidence >= minConfidence);

    const endTime = performance.now();

    return {
      recommendations: {
        primary: filterByConfidence(primary),
        alternative: filterByConfidence(alternative),
        complementary: filterByConfidence(complementary),
        upgrade: filterByConfidence(upgrade),
      },
      queryEnhancement,
      appliedFilters,
      filterSuggestions,
      performance: {
        totalTimeMs: endTime - startTime,
        queryEnhanceTimeMs: performanceMetrics.queryEnhanceTimeMs,
        filterTimeMs: performanceMetrics.filterTimeMs,
        scoreTimeMs: performanceMetrics.scoreTimeMs,
        componentsEvaluated: allComponents.length,
      },
    };
  }

  // ==========================================================================
  // Primary Recommendations
  // ==========================================================================

  /**
   * Get top N most relevant components for the query
   */
  getPrimaryRecommendations(
    query: string,
    components: ComponentMetadata[],
    context: RecommendationContext,
    maxResults: number = 5,
    enhancement?: QueryEnhancement
  ): ComponentRecommendation[] {
    // Score all components
    const scored = components.map(component => ({
      component,
      score: this.scoreRecommendation(component, query, context, enhancement),
      breakdown: this.getScoreBreakdown(component, query, context, enhancement),
    }));

    // Sort by score (descending)
    scored.sort((a, b) => b.score - a.score);

    // Take top N and create recommendations
    return scored.slice(0, maxResults).map(({ component, score, breakdown }) => ({
      component,
      score,
      type: 'primary' as RecommendationType,
      reasoning: this.explainRecommendation(component, score, context, breakdown, 'primary'),
      confidence: this.calculateConfidence(score, breakdown),
      breakdown,
    }));
  }

  // ==========================================================================
  // Alternative Recommendations
  // ==========================================================================

  /**
   * Get alternative components from different frameworks
   */
  getAlternativeRecommendations(
    selectedComponent: ComponentMetadata | undefined,
    allComponents: ComponentMetadata[],
    context: RecommendationContext,
    maxResults: number = 5
  ): ComponentRecommendation[] {
    if (!selectedComponent) return [];

    // Find similar components across frameworks
    const similar = this.similarityScorer(selectedComponent, allComponents, {
      minScore: 0.4,
      maxResults: maxResults * 2, // Get more candidates
    });

    // Filter to different frameworks only
    const differentFrameworks = similar.filter(
      s => s.component.framework !== selectedComponent.framework ||
           s.component.source !== selectedComponent.source
    );

    // Convert to recommendations
    return differentFrameworks.slice(0, maxResults).map(similarScore => ({
      component: similarScore.component,
      score: similarScore.score,
      type: 'alternative' as RecommendationType,
      reasoning: this.explainAlternative(selectedComponent, similarScore),
      confidence: similarScore.score * 0.9, // Slightly lower confidence for alternatives
      breakdown: {
        queryRelevance: 0,
        intentAlignment: 0,
        userPreference: 0,
        componentSimilarity: similarScore.score,
        qualityScore: this.getQualityScore(similarScore.component),
      },
    }));
  }

  // ==========================================================================
  // Complementary Recommendations
  // ==========================================================================

  /**
   * Get components that work well with selected components
   * "Users who used X also used Y"
   */
  getComplementaryRecommendations(
    selectedComponents: ComponentMetadata[],
    allComponents: ComponentMetadata[],
    context: RecommendationContext,
    maxResults: number = 5
  ): ComponentRecommendation[] {
    if (selectedComponents.length === 0) return [];

    // Get complementary component names from patterns
    const complementaryNames = new Set<string>();
    selectedComponents.forEach(comp => {
      const compKey = comp.name.toLowerCase();
      const patterns = COMPLEMENTARY_PATTERNS[compKey] || [];
      patterns.forEach(name => complementaryNames.add(name));
    });

    // Find components matching complementary names
    const candidates = allComponents.filter(comp => {
      const compName = comp.name.toLowerCase();
      return Array.from(complementaryNames).some(pattern =>
        compName.includes(pattern) || pattern.includes(compName)
      );
    });

    // Filter out already selected components
    const selectedIds = new Set(selectedComponents.map(c => c.id));
    const filtered = candidates.filter(c => !selectedIds.has(c.id));

    // Score based on complementary fit
    const scored = filtered.map(component => {
      const score = this.scoreComplementaryFit(component, selectedComponents, context);
      return {
        component,
        score,
        breakdown: {
          queryRelevance: 0,
          intentAlignment: score * 0.3,
          userPreference: this.preferenceLearner.scoreByPreference(component, context.currentIntent),
          componentSimilarity: 0,
          qualityScore: this.getQualityScore(component),
        },
      };
    });

    // Sort and limit
    scored.sort((a, b) => b.score - a.score);

    return scored.slice(0, maxResults).map(({ component, score, breakdown }) => ({
      component,
      score,
      type: 'complementary' as RecommendationType,
      reasoning: this.explainComplementary(component, selectedComponents),
      confidence: score * 0.85, // Good confidence for pattern-based
      breakdown,
    }));
  }

  // ==========================================================================
  // Upgrade Recommendations
  // ==========================================================================

  /**
   * Suggest upgraded versions of selected components
   * "Consider ShimmerButton instead of Button"
   */
  getUpgradeRecommendations(
    currentComponent: ComponentMetadata | undefined,
    allComponents: ComponentMetadata[],
    maxResults: number = 5
  ): ComponentRecommendation[] {
    if (!currentComponent) return [];

    // Find similar components with animations (upgrades)
    const similar = this.similarityScorer(currentComponent, allComponents, {
      minScore: 0.5,
      maxResults: 20,
    });

    // Filter for upgrades: similar name but with animations or from premium sources
    const upgrades = similar.filter(s => {
      const isAnimated = !!s.component.animations && !currentComponent.animations;
      const isPremiumSource = ['magic-ui', 'aceternity-ui'].includes(s.component.source);
      const isSameCategory = s.component.category === currentComponent.category;
      return (isAnimated || isPremiumSource) && isSameCategory;
    });

    return upgrades.slice(0, maxResults).map(upgrade => {
      const score = upgrade.score * 0.9; // Slight penalty for upgrade suggestions
      return {
        component: upgrade.component,
        score,
        type: 'upgrade' as RecommendationType,
        reasoning: this.explainUpgrade(currentComponent, upgrade.component),
        confidence: score * 0.8, // Lower confidence for upgrade suggestions
        breakdown: {
          queryRelevance: 0,
          intentAlignment: 0,
          userPreference: 0,
          componentSimilarity: upgrade.score,
          qualityScore: this.getQualityScore(upgrade.component),
        },
      };
    });
  }

  // ==========================================================================
  // Scoring Methods
  // ==========================================================================

  /**
   * Calculate overall recommendation score for a component
   */
  private scoreRecommendation(
    component: ComponentMetadata,
    query: string,
    context: RecommendationContext,
    enhancement?: QueryEnhancement
  ): number {
    const breakdown = this.getScoreBreakdown(component, query, context, enhancement);

    // Weighted combination
    const score =
      breakdown.queryRelevance * 0.25 +
      breakdown.intentAlignment * 0.25 +
      breakdown.userPreference * 0.20 +
      breakdown.componentSimilarity * 0.15 +
      breakdown.qualityScore * 0.15;

    return Math.min(Math.max(score, 0), 1); // Clamp to 0-1
  }

  /**
   * Get detailed score breakdown
   */
  private getScoreBreakdown(
    component: ComponentMetadata,
    query: string,
    context: RecommendationContext,
    enhancement?: QueryEnhancement
  ): ComponentRecommendation['breakdown'] {
    // Query relevance: How well does the component match the query?
    const queryRelevance = this.calculateQueryRelevance(component, query, enhancement);

    // Intent alignment: Does it fit the current intent?
    const intentAlignment = this.calculateIntentAlignment(component, context.currentIntent);

    // User preference: Does the user prefer this component/framework?
    const userPreference = this.preferenceLearner.scoreByPreference(
      component,
      context.currentIntent
    );

    // Component similarity: Similar to what user already selected?
    const componentSimilarity = this.calculateComponentSimilarity(
      component,
      context.selectedComponents
    );

    // Quality score: Source quality and popularity
    const qualityScore = this.getQualityScore(component);

    return {
      queryRelevance,
      intentAlignment,
      userPreference,
      componentSimilarity,
      qualityScore,
    };
  }

  /**
   * Calculate how well the component matches the query
   */
  private calculateQueryRelevance(
    component: ComponentMetadata,
    query: string,
    enhancement?: QueryEnhancement
  ): number {
    const queryLower = query.toLowerCase();
    const nameLower = component.name.toLowerCase();
    const descLower = (component.description || '').toLowerCase();

    let score = 0;

    // Exact name match
    if (nameLower === queryLower) {
      score += 1.0;
    } else if (nameLower.includes(queryLower)) {
      score += 0.8;
    } else if (queryLower.includes(nameLower)) {
      score += 0.7;
    }

    // Description match
    if (descLower.includes(queryLower)) {
      score += 0.3;
    }

    // Tags match
    const tagMatches = component.tags.filter(tag =>
      tag.toLowerCase().includes(queryLower) || queryLower.includes(tag.toLowerCase())
    ).length;
    score += Math.min(tagMatches * 0.2, 0.5);

    // Enhanced query matches
    if (enhancement) {
      const enhancedMatches = enhancement.enhancedQueries.filter(eq =>
        nameLower.includes(eq) || descLower.includes(eq)
      ).length;
      score += Math.min(enhancedMatches * 0.15, 0.4);
    }

    return Math.min(score, 1.0);
  }

  /**
   * Calculate intent alignment score
   */
  private calculateIntentAlignment(
    component: ComponentMetadata,
    intent: string
  ): number {
    // Intent-to-category mappings
    const intentCategoryMap: Record<string, string[]> = {
      'landing-page': ['marketing', 'cards', 'layout', 'blocks'],
      'dashboard': ['data-display', 'charts', 'dashboard', 'cards'],
      'form': ['forms', 'inputs'],
      'data-table': ['data-display', 'charts'],
      'marketing': ['marketing', 'blocks', 'cards'],
      'admin': ['navigation', 'layout', 'dashboard'],
      'app': ['layout', 'navigation', 'cards'],
    };

    const relevantCategories = intentCategoryMap[intent.toLowerCase()] || [];

    if (relevantCategories.includes(component.category)) {
      return 1.0;
    }

    // Check tags for intent keywords
    const intentLower = intent.toLowerCase();
    const tagMatch = component.tags.some(tag =>
      tag.toLowerCase().includes(intentLower)
    );

    return tagMatch ? 0.6 : 0.3;
  }

  /**
   * Calculate similarity to already selected components
   */
  private calculateComponentSimilarity(
    component: ComponentMetadata,
    selectedComponents: ComponentMetadata[]
  ): number {
    if (selectedComponents.length === 0) return 0.5; // Neutral if nothing selected

    const similarities = selectedComponents.map(selected =>
      calculateSimilarity(selected, component).score
    );

    // Average similarity
    const avgSimilarity = similarities.reduce((a, b) => a + b, 0) / similarities.length;

    return avgSimilarity;
  }

  /**
   * Get quality score based on source
   */
  private getQualityScore(component: ComponentMetadata): number {
    return SOURCE_QUALITY_SCORES[component.source] || 0.75;
  }

  /**
   * Score complementary fit
   */
  private scoreComplementaryFit(
    component: ComponentMetadata,
    selectedComponents: ComponentMetadata[],
    context: RecommendationContext
  ): number {
    let score = 0.5; // Base score

    // Check if component name appears in complementary patterns
    const compName = component.name.toLowerCase();
    selectedComponents.forEach(selected => {
      const selectedKey = selected.name.toLowerCase();
      const patterns = COMPLEMENTARY_PATTERNS[selectedKey] || [];

      if (patterns.some(p => compName.includes(p) || p.includes(compName))) {
        score += 0.3;
      }
    });

    // Bonus for matching framework
    if (selectedComponents.some(s => s.framework === component.framework)) {
      score += 0.2;
    }

    // User preference bonus
    const prefScore = this.preferenceLearner.scoreByPreference(component, context.currentIntent);
    score += prefScore * 0.3;

    return Math.min(score, 1.0);
  }

  /**
   * Calculate confidence score
   */
  private calculateConfidence(
    score: number,
    breakdown: ComponentRecommendation['breakdown']
  ): number {
    // Base confidence from score
    let confidence = score;

    // Boost if multiple factors align
    const highScores = Object.values(breakdown).filter(v => v >= 0.7).length;
    if (highScores >= 3) {
      confidence += 0.1;
    }

    // Reduce if low quality
    if (breakdown.qualityScore < 0.5) {
      confidence -= 0.15;
    }

    return Math.min(Math.max(confidence, 0), 1);
  }

  // ==========================================================================
  // Reasoning Generation
  // ==========================================================================

  /**
   * Generate human-readable reasoning for recommendation
   */
  private explainRecommendation(
    component: ComponentMetadata,
    score: number,
    context: RecommendationContext,
    breakdown: ComponentRecommendation['breakdown'],
    type: RecommendationType
  ): string[] {
    const reasons: string[] = [];

    // Query relevance
    if (breakdown.queryRelevance >= 0.8) {
      reasons.push('Perfect match for your search');
    } else if (breakdown.queryRelevance >= 0.5) {
      reasons.push('Good match for your search');
    }

    // Intent alignment
    if (breakdown.intentAlignment >= 0.8) {
      reasons.push(`Ideal for ${context.currentIntent} layouts`);
    }

    // User preference
    if (breakdown.userPreference >= 0.6) {
      reasons.push(`You frequently use ${component.source} components`);
    }

    // Performance
    if (context.performanceRequirements?.maxBundleSize) {
      const bundleSize = this.estimateBundleSize(component);
      if (bundleSize <= context.performanceRequirements.maxBundleSize) {
        reasons.push(`Lightweight (${bundleSize}KB) for mobile performance`);
      }
    }

    // Animation
    if (component.animations) {
      if (context.performanceRequirements?.requiresAnimation) {
        reasons.push(`${component.animations.complexity} animation attracts attention`);
      } else {
        reasons.push('Premium animation effects');
      }
    }

    // Quality
    if (breakdown.qualityScore >= 0.9) {
      reasons.push(`High-quality ${component.source} component`);
    }

    // Framework match
    if (context.targetFrameworks?.includes(component.framework || '')) {
      reasons.push(`Matches your ${component.framework} stack`);
    }

    // Fallback reason
    if (reasons.length === 0) {
      reasons.push(`${component.category} component from ${component.source}`);
    }

    return reasons;
  }

  /**
   * Explain alternative recommendation
   */
  private explainAlternative(
    original: ComponentMetadata,
    alternative: SimilarityScore
  ): string[] {
    const reasons: string[] = [];
    const { component, breakdown, reasoning } = alternative;

    reasons.push(`Similar to ${original.name} but from ${component.source}`);

    if (component.framework !== original.framework) {
      reasons.push(`${component.framework} alternative to ${original.framework}`);
    }

    if (component.animations && !original.animations) {
      reasons.push('Includes animations for enhanced UX');
    }

    if (breakdown.nameMatch >= 0.8) {
      reasons.push('Nearly identical functionality');
    }

    return reasons;
  }

  /**
   * Explain complementary recommendation
   */
  private explainComplementary(
    component: ComponentMetadata,
    selectedComponents: ComponentMetadata[]
  ): string[] {
    const reasons: string[] = [];

    const selectedNames = selectedComponents.map(c => c.name).join(', ');
    reasons.push(`Often used with ${selectedNames}`);

    if (selectedComponents.some(s => s.framework === component.framework)) {
      reasons.push(`Consistent ${component.framework} styling`);
    }

    reasons.push(`Complements your ${selectedComponents[0]?.category || 'layout'} design`);

    return reasons;
  }

  /**
   * Explain upgrade recommendation
   */
  private explainUpgrade(
    current: ComponentMetadata,
    upgrade: ComponentMetadata
  ): string[] {
    const reasons: string[] = [];

    reasons.push(`Enhanced version of ${current.name}`);

    if (upgrade.animations && !current.animations) {
      reasons.push(`Adds ${upgrade.animations.complexity} animations`);
    }

    if (['magic-ui', 'aceternity-ui'].includes(upgrade.source)) {
      reasons.push('Premium design with modern effects');
    }

    reasons.push('More engaging user experience');

    return reasons;
  }

  // ==========================================================================
  // Helper Methods
  // ==========================================================================

  /**
   * Build filters from context and suggestions
   */
  private buildFilters(
    context: RecommendationContext,
    suggestions: FilterSuggestion[]
  ): ComponentFilters {
    const filters: ComponentFilters = {};

    // Apply high-confidence filter suggestions
    suggestions.forEach(suggestion => {
      if (suggestion.confidence >= 0.7) {
        (filters as any)[suggestion.dimension] = suggestion.value;
      }
    });

    // Add context-based filters
    if (context.targetFrameworks && context.targetFrameworks.length > 0) {
      filters.frameworks = context.targetFrameworks as any[];
    }

    if (context.performanceRequirements?.maxBundleSize) {
      filters.maxBundleSize = context.performanceRequirements.maxBundleSize;
    }

    if (context.performanceRequirements?.requiresAnimation !== undefined) {
      filters.hasAnimations = context.performanceRequirements.requiresAnimation;
    }

    return filters;
  }

  /**
   * Estimate component bundle size (simplified)
   */
  private estimateBundleSize(component: ComponentMetadata): number {
    const baseSizes: Record<string, number> = {
      'shadcn-ui': 5,
      'magic-ui': 15,
      'aceternity-ui': 18,
      'mui': 85,
      'chakra-ui': 78,
      'flowbite': 12,
      'ui-layouts': 8,
      'tailwindcss': 3,
    };

    let size = baseSizes[component.source] || 10;

    if (component.animations) {
      size += component.animations.complexity === 'complex' ? 15 : 8;
    }

    return size;
  }
}

// ============================================================================
// Factory Functions
// ============================================================================

/**
 * Create a recommendation engine instance
 */
export function createRecommendationEngine(
  preferenceLearner: PreferenceLearner
): RecommendationEngine {
  return new RecommendationEngine(preferenceLearner);
}

/**
 * Quick recommendation helper (simplified API)
 */
export function quickRecommend(
  query: string,
  components: ComponentMetadata[],
  intent: string = 'general',
  maxResults: number = 5
): ComponentRecommendation[] {
  const learner = new PreferenceLearner();
  const engine = new RecommendationEngine(learner);

  const result = engine.recommend(
    query,
    components,
    {
      currentIntent: intent,
      selectedComponents: [],
    },
    {
      maxResults,
      includeAlternatives: false,
      includeComplementary: false,
      includeUpgrades: false,
    }
  );

  return result.recommendations.primary;
}
