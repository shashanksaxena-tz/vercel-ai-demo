/**
 * Cross-Framework Similarity Scorer
 *
 * Finds and ranks similar components across different frameworks based on:
 * - Name similarity (Levenshtein distance)
 * - Category matching
 * - Feature overlap
 * - Framework compatibility
 * - Complexity alignment
 *
 * Performance target: Score 200+ components in <100ms
 */

import type { ComponentMetadata, ComponentCategory, MCPServerType } from './types';

/**
 * Similarity Score Interface
 */
export interface SimilarityScore {
  /** Component being compared */
  component: ComponentMetadata;

  /** Overall similarity score (0-1, higher = more similar) */
  score: number;

  /** Detailed breakdown of similarity metrics */
  breakdown: {
    nameMatch: number; // 0-1
    categoryMatch: number; // 0-1
    featureMatch: number; // 0-1
    frameworkMatch: number; // 0-1
    complexityMatch: number; // 0-1
  };

  /** Human-readable explanation of similarity */
  reasoning: string;
}

/**
 * Similarity Options
 */
export interface SimilarityOptions {
  /** Minimum score threshold (0-1) */
  minScore?: number;

  /** Maximum number of results to return */
  maxResults?: number;

  /** Weights for different factors (must sum to 1.0) */
  weights?: {
    name?: number; // default: 0.3
    category?: number; // default: 0.3
    features?: number; // default: 0.2
    framework?: number; // default: 0.1
    complexity?: number; // default: 0.1
  };
}

/**
 * Ranking Options
 */
export interface RankingOptions {
  /** User intent (e.g., "animated card", "simple button") */
  intent?: string;

  /** Preferred frameworks to prioritize */
  preferredFrameworks?: string[];

  /** Preferred animation complexity */
  preferredComplexity?: 'simple' | 'medium' | 'complex';

  /** Maximum results */
  maxResults?: number;
}

/**
 * Default similarity weights
 */
const DEFAULT_WEIGHTS = {
  name: 0.3,
  category: 0.3,
  features: 0.2,
  framework: 0.1,
  complexity: 0.1,
} as const;

/**
 * Category relationships for fuzzy matching
 */
const CATEGORY_RELATIONSHIPS: Record<ComponentCategory, ComponentCategory[]> = {
  'layout': ['blocks', 'dashboard'],
  'navigation': ['layout'],
  'forms': ['inputs'],
  'inputs': ['forms'],
  'data-display': ['charts', 'cards'],
  'feedback': ['overlay'],
  'overlay': ['feedback'],
  'typography': ['other'],
  'media': ['other'],
  'charts': ['data-display', 'dashboard'],
  'marketing': ['blocks'],
  'dashboard': ['layout', 'charts', 'data-display'],
  'blocks': ['layout', 'marketing'],
  'cards': ['data-display'],
  'e-commerce': ['blocks', 'marketing'],
  'authentication': ['forms', 'blocks'],
  'other': [],
};

/**
 * Framework compatibility matrix
 */
const FRAMEWORK_COMPATIBILITY: Record<string, Record<string, number>> = {
  'react': { react: 1.0, html: 0.5, vue: 0.3, svelte: 0.3 },
  'html': { html: 1.0, react: 0.5, vue: 0.5, svelte: 0.5 },
  'vue': { vue: 1.0, html: 0.5, react: 0.3, svelte: 0.4 },
  'svelte': { svelte: 1.0, html: 0.5, react: 0.3, vue: 0.4 },
};

// ============================================================================
// String Similarity Algorithms
// ============================================================================

/**
 * Calculate string similarity using multiple techniques
 */
function stringSimilarity(str1: string, str2: string): number {
  const s1 = str1.toLowerCase().trim();
  const s2 = str2.toLowerCase().trim();

  // Exact match
  if (s1 === s2) return 1.0;

  // Empty strings
  if (!s1 || !s2) return 0.0;

  // Substring containment (high weight for component names)
  if (s1.includes(s2) || s2.includes(s1)) {
    const shorter = s1.length < s2.length ? s1 : s2;
    const longer = s1.length < s2.length ? s2 : s1;
    return 0.8 + (shorter.length / longer.length) * 0.15;
  }

  // Levenshtein distance for more nuanced similarity
  const levScore = 1 - (levenshteinDistance(s1, s2) / Math.max(s1.length, s2.length));

  // Character set overlap (Jaccard similarity)
  const chars1 = new Set(s1.split(''));
  const chars2 = new Set(s2.split(''));
  const chars1Array = Array.from(chars1);
  const chars2Array = Array.from(chars2);
  const intersection = new Set(chars1Array.filter(c => chars2.has(c)));
  const union = new Set(chars1Array.concat(chars2Array));
  const jaccardScore = intersection.size / union.size;

  // Word-based similarity (for multi-word names)
  const words1 = s1.split(/[\s\-_]+/);
  const words2 = s2.split(/[\s\-_]+/);
  const wordOverlap = words1.filter(w => words2.some(w2 => w === w2 || w.includes(w2) || w2.includes(w))).length;
  const wordScore = wordOverlap / Math.max(words1.length, words2.length);

  // Combine metrics (weighted average)
  return (levScore * 0.4) + (jaccardScore * 0.3) + (wordScore * 0.3);
}

/**
 * Levenshtein distance algorithm (edit distance)
 */
function levenshteinDistance(str1: string, str2: string): number {
  const m = str1.length;
  const n = str2.length;

  // Create distance matrix
  const dp: number[][] = Array(m + 1)
    .fill(0)
    .map(() => Array(n + 1).fill(0));

  // Initialize first row and column
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  // Fill in the rest of the matrix
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(
          dp[i - 1][j],     // deletion
          dp[i][j - 1],     // insertion
          dp[i - 1][j - 1]  // substitution
        );
      }
    }
  }

  return dp[m][n];
}

// ============================================================================
// Category Similarity
// ============================================================================

/**
 * Calculate category similarity
 */
function categorySimilarity(cat1: ComponentCategory, cat2: ComponentCategory): number {
  // Exact match
  if (cat1 === cat2) return 1.0;

  // Related categories
  const relatedCategories = CATEGORY_RELATIONSHIPS[cat1] || [];
  if (relatedCategories.includes(cat2)) return 0.5;

  // Check inverse relationship
  const inverseRelated = CATEGORY_RELATIONSHIPS[cat2] || [];
  if (inverseRelated.includes(cat1)) return 0.5;

  // No relationship
  return 0.0;
}

// ============================================================================
// Feature Similarity
// ============================================================================

/**
 * Calculate feature overlap similarity
 */
function featureSimilarity(comp1: ComponentMetadata, comp2: ComponentMetadata): number {
  let score = 0.0;
  let factors = 0;

  // Tag overlap
  if (comp1.tags.length > 0 || comp2.tags.length > 0) {
    const tags1 = new Set(comp1.tags.map(t => t.toLowerCase()));
    const tags2 = new Set(comp2.tags.map(t => t.toLowerCase()));
    const tags1Array = Array.from(tags1);
    const tags2Array = Array.from(tags2);
    const intersection = new Set(tags1Array.filter(t => tags2.has(t)));
    const union = new Set(tags1Array.concat(tags2Array));

    if (union.size > 0) {
      score += intersection.size / union.size;
      factors++;
    }
  }

  // Animation similarity
  const hasAnim1 = !!comp1.animations;
  const hasAnim2 = !!comp2.animations;

  if (hasAnim1 && hasAnim2) {
    // Both have animations - compare type and complexity
    const typeMatch = comp1.animations!.type === comp2.animations!.type ? 1.0 : 0.5;
    const complexityMatch = comp1.animations!.complexity === comp2.animations!.complexity ? 1.0 : 0.5;
    score += (typeMatch + complexityMatch) / 2;
    factors++;
  } else if (hasAnim1 === hasAnim2) {
    // Both have or both don't have animations
    score += 1.0;
    factors++;
  } else {
    // One has animation, one doesn't
    score += 0.3;
    factors++;
  }

  // Props similarity (if available)
  if (comp1.props && comp2.props && (comp1.props.length > 0 || comp2.props.length > 0)) {
    const propNames1 = new Set(comp1.props.map(p => p.name.toLowerCase()));
    const propNames2 = new Set(comp2.props.map(p => p.name.toLowerCase()));
    const propNames1Array = Array.from(propNames1);
    const propNames2Array = Array.from(propNames2);
    const intersection = new Set(propNames1Array.filter(p => propNames2.has(p)));
    const union = new Set(propNames1Array.concat(propNames2Array));

    if (union.size > 0) {
      score += intersection.size / union.size;
      factors++;
    }
  }

  return factors > 0 ? score / factors : 0.5;
}

// ============================================================================
// Framework Compatibility
// ============================================================================

/**
 * Calculate framework compatibility score
 */
function frameworkCompatibility(
  framework1: string | undefined,
  framework2: string | undefined
): number {
  // If either framework is undefined, assume moderate compatibility
  if (!framework1 || !framework2) return 0.5;

  const fw1 = framework1.toLowerCase();
  const fw2 = framework2.toLowerCase();

  return FRAMEWORK_COMPATIBILITY[fw1]?.[fw2] ?? 0.5;
}

// ============================================================================
// Complexity Alignment
// ============================================================================

/**
 * Calculate complexity alignment score
 */
function complexityAlignment(comp1: ComponentMetadata, comp2: ComponentMetadata): number {
  const complexity1 = comp1.animations?.complexity;
  const complexity2 = comp2.animations?.complexity;

  // Both have no animation metadata
  if (!complexity1 && !complexity2) return 1.0;

  // One has complexity, one doesn't
  if (!complexity1 || !complexity2) return 0.5;

  // Exact match
  if (complexity1 === complexity2) return 1.0;

  // Adjacent complexity levels
  const levels = ['simple', 'medium', 'complex'];
  const idx1 = levels.indexOf(complexity1);
  const idx2 = levels.indexOf(complexity2);

  if (Math.abs(idx1 - idx2) === 1) return 0.6;

  // Opposite ends
  return 0.2;
}

// ============================================================================
// Core Similarity Functions
// ============================================================================

/**
 * Calculate similarity between two components
 */
export function calculateSimilarity(
  comp1: ComponentMetadata,
  comp2: ComponentMetadata,
  options?: SimilarityOptions
): SimilarityScore {
  const weights = { ...DEFAULT_WEIGHTS, ...options?.weights };

  // Calculate individual scores
  const nameMatch = stringSimilarity(comp1.name, comp2.name);
  const categoryMatch = categorySimilarity(comp1.category, comp2.category);
  const featureMatch = featureSimilarity(comp1, comp2);
  const frameworkMatch = frameworkCompatibility(comp1.framework, comp2.framework);
  const complexityMatch = complexityAlignment(comp1, comp2);

  // Calculate weighted overall score
  const score =
    nameMatch * weights.name +
    categoryMatch * weights.category +
    featureMatch * weights.features +
    frameworkMatch * weights.framework +
    complexityMatch * weights.complexity;

  // Generate reasoning
  const reasoning = generateReasoning(
    comp1,
    comp2,
    { nameMatch, categoryMatch, featureMatch, frameworkMatch, complexityMatch }
  );

  return {
    component: comp2,
    score,
    breakdown: {
      nameMatch,
      categoryMatch,
      featureMatch,
      frameworkMatch,
      complexityMatch,
    },
    reasoning,
  };
}

/**
 * Find similar components across frameworks
 */
export function findSimilarComponents(
  targetComponent: ComponentMetadata,
  candidates: ComponentMetadata[],
  options?: SimilarityOptions
): SimilarityScore[] {
  const minScore = options?.minScore ?? 0.3;
  const maxResults = options?.maxResults ?? 20;

  // Calculate similarity for all candidates
  const scores = candidates
    .filter(c => c.id !== targetComponent.id) // Exclude self
    .map(candidate => calculateSimilarity(targetComponent, candidate, options))
    .filter(score => score.score >= minScore);

  // Sort by score (descending) and limit results
  return scores
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults);
}

/**
 * Rank components by relevance to a query
 */
export function rankComponentsByRelevance(
  query: string,
  components: ComponentMetadata[],
  options?: RankingOptions
): ComponentMetadata[] {
  const maxResults = options?.maxResults ?? 50;

  // Create scoring function based on query and options
  const scores = components.map(component => {
    let score = 0;

    // Name relevance
    const nameScore = stringSimilarity(query, component.name);
    score += nameScore * 0.4;

    // Description relevance
    if (component.description) {
      const descScore = stringSimilarity(query, component.description);
      score += descScore * 0.2;
    }

    // Tags relevance
    const queryLower = query.toLowerCase();
    const tagMatches = component.tags.filter(tag =>
      tag.toLowerCase().includes(queryLower) || queryLower.includes(tag.toLowerCase())
    ).length;
    score += (tagMatches / Math.max(component.tags.length, 1)) * 0.2;

    // Intent matching (if provided)
    if (options?.intent) {
      const intentScore = stringSimilarity(options.intent, component.description || component.name);
      score += intentScore * 0.1;
    }

    // Framework preference
    if (options?.preferredFrameworks && component.framework) {
      if (options.preferredFrameworks.includes(component.framework)) {
        score += 0.1;
      }
    }

    // Complexity preference
    if (options?.preferredComplexity && component.animations) {
      if (component.animations.complexity === options.preferredComplexity) {
        score += 0.1;
      }
    }

    return { component, score };
  });

  // Sort by score and return components
  return scores
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
    .map(item => item.component);
}

// ============================================================================
// Specialized Queries
// ============================================================================

/**
 * Find all button-like components across frameworks
 */
export function findButtonVariants(components: ComponentMetadata[]): SimilarityScore[] {
  const buttonReference: ComponentMetadata = {
    id: 'ref-button',
    name: 'Button',
    displayName: 'Button',
    description: 'Basic button component',
    category: 'inputs',
    tags: ['button', 'click', 'action'],
    source: 'shadcn-ui' as MCPServerType,
    framework: 'react',
  };

  return findSimilarComponents(buttonReference, components, {
    minScore: 0.4,
    maxResults: 30,
  });
}

/**
 * Find animated card variants
 */
export function findAnimatedCards(components: ComponentMetadata[]): ComponentMetadata[] {
  return components.filter(c =>
    c.category === 'cards' &&
    c.animations &&
    (c.name.toLowerCase().includes('card') || c.tags.some(t => t.toLowerCase().includes('card')))
  );
}

/**
 * Group components by similarity clusters
 */
export function clusterBySimilarity(
  components: ComponentMetadata[],
  threshold: number = 0.7
): ComponentMetadata[][] {
  const clusters: ComponentMetadata[][] = [];
  const assigned = new Set<string>();

  for (const component of components) {
    if (assigned.has(component.id)) continue;

    // Start new cluster
    const cluster = [component];
    assigned.add(component.id);

    // Find similar components
    const similar = findSimilarComponents(component, components, {
      minScore: threshold,
      maxResults: 100,
    });

    for (const { component: simComp } of similar) {
      if (!assigned.has(simComp.id)) {
        cluster.push(simComp);
        assigned.add(simComp.id);
      }
    }

    clusters.push(cluster);
  }

  return clusters;
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Generate human-readable reasoning for similarity score
 */
function generateReasoning(
  comp1: ComponentMetadata,
  comp2: ComponentMetadata,
  breakdown: {
    nameMatch: number;
    categoryMatch: number;
    featureMatch: number;
    frameworkMatch: number;
    complexityMatch: number;
  }
): string {
  const reasons: string[] = [];

  // Name similarity
  if (breakdown.nameMatch >= 0.9) {
    reasons.push('nearly identical names');
  } else if (breakdown.nameMatch >= 0.7) {
    reasons.push('similar names');
  } else if (breakdown.nameMatch >= 0.5) {
    reasons.push('related names');
  }

  // Category match
  if (breakdown.categoryMatch === 1.0) {
    reasons.push('same category');
  } else if (breakdown.categoryMatch > 0) {
    reasons.push('related categories');
  }

  // Framework
  if (comp1.framework && comp2.framework) {
    if (comp1.framework === comp2.framework) {
      reasons.push(`both ${comp1.framework}`);
    } else {
      reasons.push(`different frameworks (${comp1.framework} vs ${comp2.framework})`);
    }
  }

  // Animation
  if (comp1.animations && comp2.animations) {
    if (comp1.animations.type === comp2.animations.type) {
      reasons.push(`both use ${comp1.animations.type} animations`);
    }
    if (comp1.animations.complexity === comp2.animations.complexity) {
      reasons.push(`${comp1.animations.complexity} complexity`);
    }
  }

  // Features
  if (breakdown.featureMatch >= 0.7) {
    reasons.push('similar features');
  }

  // Source
  if (comp1.source === comp2.source) {
    reasons.push(`both from ${comp1.source}`);
  } else {
    reasons.push(`from ${comp2.source}`);
  }

  return reasons.length > 0 ? reasons.join(', ') : 'general similarity';
}

/**
 * Format similarity results as readable summary
 */
export function formatSimilarityResults(scores: SimilarityScore[]): string {
  const lines: string[] = [];

  lines.push(`Found ${scores.length} similar component(s):\n`);

  scores.forEach((result, idx) => {
    const { component, score, breakdown, reasoning } = result;
    lines.push(`${idx + 1}. ${component.displayName} (${component.source})`);
    lines.push(`   Score: ${(score * 100).toFixed(1)}% - ${reasoning}`);
    lines.push(`   Breakdown: name=${(breakdown.nameMatch * 100).toFixed(0)}%, ` +
      `category=${(breakdown.categoryMatch * 100).toFixed(0)}%, ` +
      `features=${(breakdown.featureMatch * 100).toFixed(0)}%`);
    lines.push('');
  });

  return lines.join('\n');
}

/**
 * Performance benchmark helper
 */
export function benchmarkSimilarity(
  components: ComponentMetadata[],
  iterations: number = 100
): {
  avgTimeMs: number;
  componentsPerMs: number;
  totalComponents: number;
} {
  const start = performance.now();

  for (let i = 0; i < iterations; i++) {
    const target = components[i % components.length];
    findSimilarComponents(target, components, { maxResults: 10 });
  }

  const end = performance.now();
  const totalTime = end - start;
  const avgTime = totalTime / iterations;
  const componentsPerMs = components.length / avgTime;

  return {
    avgTimeMs: avgTime,
    componentsPerMs,
    totalComponents: components.length,
  };
}
