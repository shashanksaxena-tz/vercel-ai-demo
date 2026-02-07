/**
 * Animation Performance Scoring
 *
 * Analyzes animation complexity and provides performance scores and recommendations.
 * Helps developers make informed decisions about animation usage.
 */

import type { ComponentMetadata } from './types';

/**
 * Performance Score Interface
 */
export interface PerformanceScore {
  /** Overall complexity rating */
  complexity: 'simple' | 'medium' | 'complex';

  /** Performance score from 1-10 (higher = more complex/potentially slower) */
  score: number;

  /** Warning message if performance concerns exist */
  warning?: string;

  /** Performance optimization recommendations */
  recommendations?: string[];

  /** Breakdown by complexity level */
  breakdown: {
    simple: number;
    medium: number;
    complex: number;
  };

  /** Total number of animated components */
  totalAnimations: number;
}

/**
 * Animation Complexity Weights
 *
 * Base performance scores for different animation types:
 * - Simple (1-3): Minimal CPU/GPU usage
 * - Medium (4-6): Moderate resource usage
 * - Complex (7-10): High resource usage
 */
const COMPLEXITY_SCORES = {
  simple: 2,
  medium: 5,
  complex: 8,
} as const;

/**
 * Score animation performance based on component metadata
 *
 * Scoring system:
 * - Simple (1-3): CSS transitions, fades, basic text animations
 *   - Examples: fade-in, fade-out, basic opacity changes
 *   - Uses: CSS transitions, simple keyframes
 *   - Impact: Minimal performance overhead
 *
 * - Medium (4-6): Framer Motion transforms, slides, spring animations
 *   - Examples: slide-in, scale animations, spring bounces
 *   - Uses: transform properties, moderate JavaScript
 *   - Impact: Moderate CPU/GPU usage
 *
 * - Complex (7-10): Canvas, WebGL, 3D transforms, particle effects
 *   - Examples: particle systems, 3D cards, parallax effects
 *   - Uses: Heavy JavaScript, GPU acceleration, complex calculations
 *   - Impact: Significant performance overhead
 *
 * @param components - Array of component metadata to analyze
 * @returns Performance score with recommendations
 */
export function scoreAnimationPerformance(
  components: ComponentMetadata[]
): PerformanceScore {
  let totalScore = 0;
  let maxComplexity: 'simple' | 'medium' | 'complex' = 'simple';
  const complexityCount = { simple: 0, medium: 0, complex: 0 };

  // Count animated components
  const animatedComponents = components.filter((c) => c.animations);

  // Calculate score based on animation complexity
  for (const component of animatedComponents) {
    if (!component.animations) continue;

    const { complexity } = component.animations;
    complexityCount[complexity]++;

    // Assign base score
    const componentScore = COMPLEXITY_SCORES[complexity];
    totalScore += componentScore;

    // Track max complexity
    if (complexity === 'complex') {
      maxComplexity = 'complex';
    } else if (complexity === 'medium' && maxComplexity === 'simple') {
      maxComplexity = 'medium';
    }
  }

  // Normalize score to 1-10 range
  const avgScore =
    animatedComponents.length > 0 ? totalScore / animatedComponents.length : 0;
  const normalizedScore = Math.min(10, Math.max(1, Math.round(avgScore)));

  // Generate warnings and recommendations
  const { warning, recommendations } = generateRecommendations(
    complexityCount,
    animatedComponents.length,
    maxComplexity
  );

  return {
    complexity: maxComplexity,
    score: normalizedScore,
    warning,
    recommendations: recommendations.length > 0 ? recommendations : undefined,
    breakdown: complexityCount,
    totalAnimations: animatedComponents.length,
  };
}

/**
 * Generate performance warnings and recommendations
 */
function generateRecommendations(
  complexityCount: { simple: number; medium: number; complex: number },
  totalAnimations: number,
  maxComplexity: 'simple' | 'medium' | 'complex'
): { warning?: string; recommendations: string[] } {
  let warning: string | undefined;
  const recommendations: string[] = [];

  // Complex animation warnings
  if (complexityCount.complex > 0) {
    if (complexityCount.complex > 1) {
      warning = `Using multiple complex animations (${complexityCount.complex}) may impact performance on lower-end devices`;
      recommendations.push(
        'Consider lazy loading complex animations with React.lazy() or dynamic imports'
      );
      recommendations.push(
        'Use Intersection Observer to trigger animations only when components are visible'
      );
      recommendations.push(
        'Implement reduced motion preference detection with prefers-reduced-motion'
      );
      recommendations.push(
        'Test on mobile devices and slower hardware to ensure smooth performance'
      );
    } else {
      warning =
        'Complex animations detected - test performance on mobile devices';
      recommendations.push(
        'Monitor frame rate during animations using browser DevTools'
      );
      recommendations.push(
        'Consider providing a simpler fallback for users with reduced motion preference'
      );
      recommendations.push(
        'Ensure animations are GPU-accelerated using transform and opacity'
      );
    }
  }

  // Medium complexity recommendations
  if (complexityCount.medium > 2 && complexityCount.complex === 0) {
    recommendations.push(
      'Multiple medium-complexity animations detected - consider staggering their execution'
    );
    recommendations.push(
      'Use requestAnimationFrame for smoother animation timing'
    );
  }

  // General recommendations for many simultaneous animations
  if (totalAnimations > 5) {
    recommendations.push(
      `Limit simultaneous animations (currently ${totalAnimations}) to improve performance`
    );
    recommendations.push(
      'Use will-change CSS property sparingly - only on elements that will definitely animate'
    );
    recommendations.push(
      'Avoid animating expensive properties like box-shadow, filter, or background'
    );
    recommendations.push(
      'Prefer transform and opacity animations which are GPU-accelerated'
    );
  }

  // Framer Motion specific recommendations
  if (maxComplexity !== 'simple') {
    recommendations.push(
      'If using Framer Motion, consider using the "layout" prop for automatic layout animations'
    );
    recommendations.push(
      'Use Framer Motion\'s useReducedMotion() hook to respect user preferences'
    );
  }

  // Universal best practices
  if (totalAnimations > 0) {
    recommendations.push(
      'Always test animations on various devices, browsers, and network conditions'
    );
    recommendations.push(
      'Implement prefers-reduced-motion media query: @media (prefers-reduced-motion: reduce)'
    );
    recommendations.push(
      'Consider using CSS animations for simple effects to reduce JavaScript overhead'
    );
  }

  return { warning, recommendations };
}

/**
 * Get performance tier based on score
 */
export function getPerformanceTier(
  score: number
): 'excellent' | 'good' | 'fair' | 'poor' {
  if (score <= 3) return 'excellent';
  if (score <= 5) return 'good';
  if (score <= 7) return 'fair';
  return 'poor';
}

/**
 * Format performance score as human-readable summary
 */
export function formatPerformanceSummary(score: PerformanceScore): string {
  const tier = getPerformanceTier(score.score);
  const lines: string[] = [];

  lines.push(`Performance Score: ${score.score}/10 (${tier})`);
  lines.push(`Overall Complexity: ${score.complexity}`);
  lines.push(`Total Animated Components: ${score.totalAnimations}`);
  lines.push('');
  lines.push('Breakdown:');
  lines.push(`  - Simple: ${score.breakdown.simple}`);
  lines.push(`  - Medium: ${score.breakdown.medium}`);
  lines.push(`  - Complex: ${score.breakdown.complex}`);

  if (score.warning) {
    lines.push('');
    lines.push(`Warning: ${score.warning}`);
  }

  if (score.recommendations && score.recommendations.length > 0) {
    lines.push('');
    lines.push('Recommendations:');
    score.recommendations.forEach((rec) => {
      lines.push(`  - ${rec}`);
    });
  }

  return lines.join('\n');
}

/**
 * Analyze animation dependencies and suggest optimizations
 */
export function analyzeAnimationDependencies(
  components: ComponentMetadata[]
): {
  libraries: Set<string>;
  suggestions: string[];
} {
  const libraries = new Set<string>();
  const suggestions: string[] = [];

  for (const component of components) {
    if (!component.dependencies || !component.animations) continue;

    const deps = Array.isArray(component.dependencies)
      ? component.dependencies
      : component.dependencies.npm || [];

    deps.forEach((dep) => libraries.add(dep));
  }

  // Analyze dependency mix
  if (libraries.has('framer-motion') && libraries.has('react-spring')) {
    suggestions.push(
      'Multiple animation libraries detected (Framer Motion + React Spring) - consider standardizing on one library to reduce bundle size'
    );
  }

  if (libraries.has('gsap') && libraries.has('framer-motion')) {
    suggestions.push(
      'Both GSAP and Framer Motion detected - GSAP is more powerful but heavier; consider if both are necessary'
    );
  }

  if (libraries.has('framer-motion')) {
    suggestions.push(
      'Framer Motion detected - use LazyMotion to reduce bundle size by loading features on demand'
    );
  }

  if (libraries.size > 3) {
    suggestions.push(
      `Multiple animation libraries in use (${libraries.size}) - consolidate to reduce bundle size and complexity`
    );
  }

  return { libraries, suggestions };
}

/**
 * Estimate bundle size impact of animations
 */
export function estimateBundleImpact(components: ComponentMetadata[]): {
  estimatedKB: number;
  breakdown: Record<string, number>;
} {
  const libraryWeights: Record<string, number> = {
    'framer-motion': 52, // ~52KB gzipped
    'react-spring': 28, // ~28KB gzipped
    gsap: 45, // ~45KB gzipped
    '@react-spring/web': 28,
    'lottie-react': 35, // ~35KB gzipped
  };

  const breakdown: Record<string, number> = {};
  let totalKB = 0;

  const { libraries } = analyzeAnimationDependencies(components);

  libraries.forEach((lib) => {
    const weight = libraryWeights[lib] || 20; // Default 20KB for unknown libs
    breakdown[lib] = weight;
    totalKB += weight;
  });

  return {
    estimatedKB: totalKB,
    breakdown,
  };
}
