/**
 * Performance Scoring Examples
 *
 * Practical examples of using the animation performance scoring system
 * in real-world scenarios.
 */

import {
  scoreAnimationPerformance,
  getPerformanceTier,
  formatPerformanceSummary,
  analyzeAnimationDependencies,
  estimateBundleImpact,
  type PerformanceScore,
} from '../animation-performance';
import type { ComponentMetadata } from '../types';

// ============================================================================
// Example 1: Simple Landing Page
// ============================================================================

export function exampleSimpleLandingPage() {
  const components: ComponentMetadata[] = [
    {
      id: 'fade-in-heading',
      name: 'FadeInHeading',
      displayName: 'Fade In Heading',
      description: 'Simple fade-in animation for headings',
      category: 'typography',
      tags: ['animation', 'fade', 'text'],
      source: 'magic-ui',
      animations: {
        type: 'css',
        complexity: 'simple',
      },
    },
    {
      id: 'slide-in-card',
      name: 'SlideInCard',
      displayName: 'Slide In Card',
      description: 'Cards that slide in from the bottom',
      category: 'cards',
      tags: ['animation', 'slide', 'card'],
      source: 'magic-ui',
      animations: {
        type: 'css',
        complexity: 'simple',
      },
    },
  ];

  const score = scoreAnimationPerformance(components);
  console.log('Simple Landing Page Score:');
  console.log(formatPerformanceSummary(score));

  return score;
}

// ============================================================================
// Example 2: Feature-Rich Dashboard
// ============================================================================

export function exampleDashboard() {
  const components: ComponentMetadata[] = [
    {
      id: 'shimmer-button',
      name: 'ShimmerButton',
      displayName: 'Shimmer Button',
      description: 'Button with shimmer effect',
      category: 'inputs',
      tags: ['button', 'animation', 'shimmer'],
      source: 'magic-ui',
      dependencies: {
        npm: ['framer-motion', 'clsx'],
      },
      animations: {
        type: 'framer-motion',
        complexity: 'medium',
      },
    },
    {
      id: 'card-flip',
      name: 'CardFlip',
      displayName: 'Card Flip',
      description: 'Flippable card component',
      category: 'cards',
      tags: ['card', 'animation', 'flip'],
      source: 'magic-ui',
      dependencies: {
        npm: ['framer-motion'],
      },
      animations: {
        type: 'framer-motion',
        complexity: 'medium',
      },
    },
    {
      id: 'stats-counter',
      name: 'StatsCounter',
      displayName: 'Stats Counter',
      description: 'Animated statistics counter',
      category: 'data-display',
      tags: ['stats', 'animation', 'counter'],
      source: 'magic-ui',
      dependencies: {
        npm: ['framer-motion', 'react-countup'],
      },
      animations: {
        type: 'framer-motion',
        complexity: 'medium',
      },
    },
  ];

  const score = scoreAnimationPerformance(components);
  const bundleImpact = estimateBundleImpact(components);
  const depAnalysis = analyzeAnimationDependencies(components);

  console.log('Dashboard Score:');
  console.log(formatPerformanceSummary(score));
  console.log('\nBundle Impact:', bundleImpact.estimatedKB, 'KB');
  console.log('Libraries:', Array.from(depAnalysis.libraries));

  return { score, bundleImpact, depAnalysis };
}

// ============================================================================
// Example 3: Premium Marketing Page
// ============================================================================

export function examplePremiumMarketing() {
  const components: ComponentMetadata[] = [
    {
      id: 'particle-bg',
      name: 'ParticleBackground',
      displayName: 'Particle Background',
      description: 'Animated particle background',
      category: 'other',
      tags: ['background', 'particles', 'animation'],
      source: 'aceternity-ui',
      dependencies: {
        npm: ['framer-motion', 'tsparticles'],
      },
      animations: {
        type: 'framer-motion',
        complexity: 'complex',
      },
    },
    {
      id: '3d-card',
      name: 'ThreeDCard',
      displayName: '3D Card',
      description: '3D perspective card effect',
      category: 'cards',
      tags: ['card', '3d', 'animation'],
      source: 'aceternity-ui',
      dependencies: {
        npm: ['framer-motion'],
      },
      animations: {
        type: 'framer-motion',
        complexity: 'complex',
      },
    },
    {
      id: 'shimmer-text',
      name: 'ShimmerText',
      displayName: 'Shimmer Text',
      description: 'Text with shimmer effect',
      category: 'typography',
      tags: ['text', 'shimmer', 'animation'],
      source: 'magic-ui',
      dependencies: {
        npm: ['framer-motion'],
      },
      animations: {
        type: 'framer-motion',
        complexity: 'medium',
      },
    },
  ];

  const score = scoreAnimationPerformance(components);
  const bundleImpact = estimateBundleImpact(components);

  console.log('Premium Marketing Page Score:');
  console.log(formatPerformanceSummary(score));
  console.log('\nBundle Impact:', bundleImpact.estimatedKB, 'KB');

  if (score.warning) {
    console.log('\n⚠️ WARNING:', score.warning);
  }

  if (score.recommendations) {
    console.log('\n📋 Recommendations:');
    score.recommendations.forEach((rec, i) => {
      console.log(`  ${i + 1}. ${rec}`);
    });
  }

  return { score, bundleImpact };
}

// ============================================================================
// Example 4: Mobile-First Application
// ============================================================================

export function exampleMobileFirst() {
  const components: ComponentMetadata[] = [
    {
      id: 'fade-in',
      name: 'FadeIn',
      displayName: 'Fade In',
      description: 'Simple fade in effect',
      category: 'other',
      tags: ['animation', 'fade'],
      source: 'magic-ui',
      animations: {
        type: 'css',
        complexity: 'simple',
      },
    },
    {
      id: 'slide-up',
      name: 'SlideUp',
      displayName: 'Slide Up',
      description: 'Slide up animation',
      category: 'other',
      tags: ['animation', 'slide'],
      source: 'magic-ui',
      animations: {
        type: 'css',
        complexity: 'simple',
      },
    },
  ];

  const score = scoreAnimationPerformance(components);

  console.log('Mobile-First App Score:');
  console.log(formatPerformanceSummary(score));

  const tier = getPerformanceTier(score.score);
  if (tier === 'excellent') {
    console.log('✅ Perfect for mobile devices!');
  }

  return score;
}

// ============================================================================
// Example 5: Component Selection Helper
// ============================================================================

export function selectOptimalComponents(
  availableComponents: ComponentMetadata[],
  maxScore: number = 5
): {
  selected: ComponentMetadata[];
  rejected: ComponentMetadata[];
  score: PerformanceScore;
} {
  const selected: ComponentMetadata[] = [];
  const rejected: ComponentMetadata[] = [];

  for (const component of availableComponents) {
    const testScore = scoreAnimationPerformance([...selected, component]);

    if (testScore.score <= maxScore) {
      selected.push(component);
    } else {
      rejected.push(component);
    }
  }

  const finalScore = scoreAnimationPerformance(selected);

  console.log(`\nSelected ${selected.length} components:`);
  selected.forEach((c) => console.log(`  - ${c.name} (${c.animations?.complexity})`));

  console.log(`\nRejected ${rejected.length} components:`);
  rejected.forEach((c) => console.log(`  - ${c.name} (${c.animations?.complexity})`));

  console.log('\nFinal Performance:');
  console.log(formatPerformanceSummary(finalScore));

  return { selected, rejected, score: finalScore };
}

// ============================================================================
// Example 6: Performance Budget Checker
// ============================================================================

export interface PerformanceBudget {
  maxScore: number;
  maxBundleKB: number;
  maxComplexAnimations: number;
  maxTotalAnimations: number;
}

export function checkPerformanceBudget(
  components: ComponentMetadata[],
  budget: PerformanceBudget
): {
  passed: boolean;
  violations: string[];
  score: PerformanceScore;
  bundleImpact: ReturnType<typeof estimateBundleImpact>;
} {
  const score = scoreAnimationPerformance(components);
  const bundleImpact = estimateBundleImpact(components);
  const violations: string[] = [];

  // Check score
  if (score.score > budget.maxScore) {
    violations.push(
      `Performance score ${score.score} exceeds budget of ${budget.maxScore}`
    );
  }

  // Check bundle size
  if (bundleImpact.estimatedKB > budget.maxBundleKB) {
    violations.push(
      `Bundle size ${bundleImpact.estimatedKB}KB exceeds budget of ${budget.maxBundleKB}KB`
    );
  }

  // Check complex animations
  if (score.breakdown.complex > budget.maxComplexAnimations) {
    violations.push(
      `${score.breakdown.complex} complex animations exceed budget of ${budget.maxComplexAnimations}`
    );
  }

  // Check total animations
  if (score.totalAnimations > budget.maxTotalAnimations) {
    violations.push(
      `${score.totalAnimations} total animations exceed budget of ${budget.maxTotalAnimations}`
    );
  }

  const passed = violations.length === 0;

  console.log('\n📊 Performance Budget Check:');
  console.log('Status:', passed ? '✅ PASSED' : '❌ FAILED');

  if (violations.length > 0) {
    console.log('\nViolations:');
    violations.forEach((v) => console.log(`  ⚠️ ${v}`));
  }

  console.log('\nActual Metrics:');
  console.log(`  Score: ${score.score}/${budget.maxScore}`);
  console.log(`  Bundle: ${bundleImpact.estimatedKB}KB/${budget.maxBundleKB}KB`);
  console.log(
    `  Complex: ${score.breakdown.complex}/${budget.maxComplexAnimations}`
  );
  console.log(
    `  Total: ${score.totalAnimations}/${budget.maxTotalAnimations}`
  );

  return { passed, violations, score, bundleImpact };
}

// ============================================================================
// Example 7: A/B Testing Scenarios
// ============================================================================

export function compareAnimationStrategies() {
  // Strategy A: CSS-only (simple)
  const strategyA: ComponentMetadata[] = [
    {
      id: 'css-fade',
      name: 'CSSFade',
      displayName: 'CSS Fade',
      description: 'CSS fade animation',
      category: 'other',
      tags: ['css'],
      source: 'magic-ui',
      animations: { type: 'css', complexity: 'simple' },
    },
    {
      id: 'css-slide',
      name: 'CSSSlide',
      displayName: 'CSS Slide',
      description: 'CSS slide animation',
      category: 'other',
      tags: ['css'],
      source: 'magic-ui',
      animations: { type: 'css', complexity: 'simple' },
    },
  ];

  // Strategy B: Framer Motion (medium)
  const strategyB: ComponentMetadata[] = [
    {
      id: 'fm-fade',
      name: 'FramerFade',
      displayName: 'Framer Motion Fade',
      description: 'Framer Motion fade',
      category: 'other',
      tags: ['framer'],
      source: 'magic-ui',
      dependencies: { npm: ['framer-motion'] },
      animations: { type: 'framer-motion', complexity: 'medium' },
    },
    {
      id: 'fm-slide',
      name: 'FramerSlide',
      displayName: 'Framer Motion Slide',
      description: 'Framer Motion slide',
      category: 'other',
      tags: ['framer'],
      source: 'magic-ui',
      dependencies: { npm: ['framer-motion'] },
      animations: { type: 'framer-motion', complexity: 'medium' },
    },
  ];

  const scoreA = scoreAnimationPerformance(strategyA);
  const scoreB = scoreAnimationPerformance(strategyB);
  const bundleA = estimateBundleImpact(strategyA);
  const bundleB = estimateBundleImpact(strategyB);

  console.log('\n🆚 A/B Testing: Animation Strategies\n');
  console.log('Strategy A (CSS-only):');
  console.log(`  Score: ${scoreA.score}/10`);
  console.log(`  Bundle: ${bundleA.estimatedKB}KB`);
  console.log(`  Tier: ${getPerformanceTier(scoreA.score)}`);

  console.log('\nStrategy B (Framer Motion):');
  console.log(`  Score: ${scoreB.score}/10`);
  console.log(`  Bundle: ${bundleB.estimatedKB}KB`);
  console.log(`  Tier: ${getPerformanceTier(scoreB.score)}`);

  console.log('\nRecommendation:');
  if (scoreA.score < scoreB.score) {
    console.log('✅ Strategy A performs better');
  } else {
    console.log('✅ Strategy B provides more features with acceptable performance');
  }

  return { strategyA: scoreA, strategyB: scoreB };
}

// ============================================================================
// Run Examples
// ============================================================================

if (require.main === module) {
  console.log('='.repeat(80));
  console.log('Animation Performance Scoring Examples');
  console.log('='.repeat(80));

  console.log('\n1️⃣ Simple Landing Page');
  console.log('-'.repeat(80));
  exampleSimpleLandingPage();

  console.log('\n\n2️⃣ Feature-Rich Dashboard');
  console.log('-'.repeat(80));
  exampleDashboard();

  console.log('\n\n3️⃣ Premium Marketing Page');
  console.log('-'.repeat(80));
  examplePremiumMarketing();

  console.log('\n\n4️⃣ Mobile-First Application');
  console.log('-'.repeat(80));
  exampleMobileFirst();

  console.log('\n\n5️⃣ Performance Budget Check');
  console.log('-'.repeat(80));
  const mockComponents: ComponentMetadata[] = [
    {
      id: 'test',
      name: 'Test',
      displayName: 'Test',
      description: 'Test',
      category: 'other',
      tags: [],
      source: 'magic-ui',
      animations: { type: 'framer-motion', complexity: 'medium' },
      dependencies: { npm: ['framer-motion'] },
    },
  ];
  checkPerformanceBudget(mockComponents, {
    maxScore: 5,
    maxBundleKB: 60,
    maxComplexAnimations: 1,
    maxTotalAnimations: 5,
  });

  console.log('\n\n6️⃣ A/B Testing Strategies');
  console.log('-'.repeat(80));
  compareAnimationStrategies();
}
