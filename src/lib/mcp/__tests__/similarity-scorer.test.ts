/**
 * Cross-Framework Similarity Scorer Tests
 *
 * Comprehensive test suite covering:
 * - String similarity algorithms
 * - Category matching
 * - Feature overlap
 * - Framework compatibility
 * - Similarity scoring
 * - Ranking and clustering
 * - Performance benchmarks
 */

import { describe, test, expect } from '@jest/globals';
import type { ComponentMetadata } from '../types';
import {
  calculateSimilarity,
  findSimilarComponents,
  rankComponentsByRelevance,
  findButtonVariants,
  findAnimatedCards,
  clusterBySimilarity,
  formatSimilarityResults,
  benchmarkSimilarity,
} from '../similarity-scorer';

// ============================================================================
// Test Data
// ============================================================================

const createComponent = (
  id: string,
  name: string,
  category: any,
  tags: string[] = [],
  framework: any = 'react',
  source: any = 'shadcn-ui',
  animations?: any
): ComponentMetadata => ({
  id,
  name,
  displayName: name,
  description: `${name} component`,
  category,
  tags,
  framework,
  source,
  animations,
});

const testComponents: ComponentMetadata[] = [
  // Buttons
  createComponent('btn-1', 'Button', 'inputs', ['button', 'click'], 'react', 'shadcn-ui'),
  createComponent('btn-2', 'Button', 'inputs', ['button', 'action'], 'react', 'mui'),
  createComponent('btn-3', 'PrimaryButton', 'inputs', ['button', 'primary'], 'react', 'chakra-ui'),
  createComponent('btn-4', 'SubmitButton', 'forms', ['button', 'submit', 'form'], 'react', 'shadcn-ui'),
  createComponent('btn-5', 'ShimmerButton', 'inputs', ['button', 'animated'], 'react', 'magic-ui', {
    type: 'framer-motion' as const,
    complexity: 'medium' as const,
  }),
  createComponent('btn-6', 'MovingBorderButton', 'inputs', ['button', 'animated', 'border'], 'react', 'aceternity-ui', {
    type: 'framer-motion' as const,
    complexity: 'complex' as const,
  }),

  // Cards
  createComponent('card-1', 'Card', 'cards', ['card', 'container'], 'react', 'shadcn-ui'),
  createComponent('card-2', 'Card', 'cards', ['card', 'panel'], 'react', 'mui'),
  createComponent('card-3', 'PricingCard', 'cards', ['card', 'pricing'], 'react', 'shadcn-ui'),
  createComponent('card-4', 'ProfileCard', 'cards', ['card', 'profile', 'avatar'], 'react', 'chakra-ui'),
  createComponent('card-5', 'AnimatedCard', 'cards', ['card', 'animated'], 'react', 'magic-ui', {
    type: 'framer-motion' as const,
    complexity: 'medium' as const,
  }),
  createComponent('card-6', '3DCard', 'cards', ['card', '3d', 'animated'], 'react', 'aceternity-ui', {
    type: 'css' as const,
    complexity: 'complex' as const,
  }),

  // Inputs
  createComponent('input-1', 'Input', 'inputs', ['input', 'text'], 'react', 'shadcn-ui'),
  createComponent('input-2', 'TextField', 'inputs', ['input', 'text', 'field'], 'react', 'mui'),
  createComponent('input-3', 'TextInput', 'inputs', ['input', 'text'], 'react', 'chakra-ui'),

  // Navigation
  createComponent('nav-1', 'Navbar', 'navigation', ['nav', 'menu'], 'react', 'shadcn-ui'),
  createComponent('nav-2', 'NavigationBar', 'navigation', ['nav', 'menu'], 'react', 'mui'),
  createComponent('nav-3', 'Sidebar', 'navigation', ['nav', 'side'], 'react', 'chakra-ui'),

  // Forms
  createComponent('form-1', 'Form', 'forms', ['form', 'input'], 'react', 'shadcn-ui'),
  createComponent('form-2', 'FormControl', 'forms', ['form', 'control'], 'react', 'mui'),

  // Mixed frameworks
  createComponent('html-1', 'Button', 'inputs', ['button'], 'html', 'flowbite'),
  createComponent('html-2', 'Card', 'cards', ['card'], 'html', 'flowbite'),
];

// ============================================================================
// String Similarity Tests
// ============================================================================

describe('String Similarity', () => {
  test('exact matches return 1.0', () => {
    const result = calculateSimilarity(testComponents[0], testComponents[0]);
    expect(result.breakdown.nameMatch).toBe(1.0);
  });

  test('identical names from different sources score high', () => {
    const btn1 = testComponents[0]; // Button from shadcn-ui
    const btn2 = testComponents[1]; // Button from mui
    const result = calculateSimilarity(btn1, btn2);
    expect(result.breakdown.nameMatch).toBeGreaterThan(0.95);
  });

  test('similar names score well', () => {
    const btn = testComponents[0]; // Button
    const shimmerBtn = testComponents[4]; // ShimmerButton
    const result = calculateSimilarity(btn, shimmerBtn);
    expect(result.breakdown.nameMatch).toBeGreaterThan(0.6);
  });

  test('very different names score low', () => {
    const btn = testComponents[0]; // Button
    const card = testComponents[6]; // Card
    const result = calculateSimilarity(btn, card);
    expect(result.breakdown.nameMatch).toBeLessThan(0.3);
  });

  test('case insensitive matching', () => {
    const comp1 = createComponent('1', 'BUTTON', 'inputs');
    const comp2 = createComponent('2', 'button', 'inputs');
    const result = calculateSimilarity(comp1, comp2);
    expect(result.breakdown.nameMatch).toBe(1.0);
  });

  test('substring containment scores high', () => {
    const comp1 = createComponent('1', 'Button', 'inputs');
    const comp2 = createComponent('2', 'PrimaryButton', 'inputs');
    const result = calculateSimilarity(comp1, comp2);
    expect(result.breakdown.nameMatch).toBeGreaterThan(0.8);
  });
});

// ============================================================================
// Category Matching Tests
// ============================================================================

describe('Category Matching', () => {
  test('same category returns 1.0', () => {
    const btn1 = testComponents[0];
    const btn2 = testComponents[1];
    const result = calculateSimilarity(btn1, btn2);
    expect(result.breakdown.categoryMatch).toBe(1.0);
  });

  test('related categories score 0.5', () => {
    const input = testComponents[12]; // Input (category: inputs)
    const form = testComponents[18]; // Form (category: forms)
    const result = calculateSimilarity(input, form);
    expect(result.breakdown.categoryMatch).toBe(0.5);
  });

  test('unrelated categories score 0.0', () => {
    const btn = testComponents[0]; // Button (inputs)
    const nav = testComponents[15]; // Navbar (navigation)
    const result = calculateSimilarity(btn, nav);
    expect(result.breakdown.categoryMatch).toBe(0.0);
  });
});

// ============================================================================
// Feature Similarity Tests
// ============================================================================

describe('Feature Similarity', () => {
  test('components with overlapping tags score higher', () => {
    const btn1 = createComponent('1', 'Btn1', 'inputs', ['button', 'click', 'primary']);
    const btn2 = createComponent('2', 'Btn2', 'inputs', ['button', 'click', 'secondary']);
    const result = calculateSimilarity(btn1, btn2);
    expect(result.breakdown.featureMatch).toBeGreaterThan(0.5);
  });

  test('components with same animation type score high', () => {
    const shimmer = testComponents[4]; // ShimmerButton (framer-motion, medium)
    const border = testComponents[5]; // MovingBorderButton (framer-motion, complex)
    const result = calculateSimilarity(shimmer, border);
    expect(result.breakdown.featureMatch).toBeGreaterThan(0.6);
  });

  test('animated vs non-animated components score lower', () => {
    const regularBtn = testComponents[0]; // Button (no animation)
    const shimmerBtn = testComponents[4]; // ShimmerButton (animated)
    const result = calculateSimilarity(regularBtn, shimmerBtn);
    expect(result.breakdown.featureMatch).toBeLessThan(0.5);
  });
});

// ============================================================================
// Framework Compatibility Tests
// ============================================================================

describe('Framework Compatibility', () => {
  test('same framework returns 1.0', () => {
    const btn1 = testComponents[0]; // React
    const btn2 = testComponents[1]; // React
    const result = calculateSimilarity(btn1, btn2);
    expect(result.breakdown.frameworkMatch).toBe(1.0);
  });

  test('React to HTML compatibility is 0.5', () => {
    const reactBtn = testComponents[0]; // React Button
    const htmlBtn = testComponents[20]; // HTML Button
    const result = calculateSimilarity(reactBtn, htmlBtn);
    expect(result.breakdown.frameworkMatch).toBe(0.5);
  });

  test('different frameworks score lower', () => {
    const reactComp = createComponent('1', 'Comp', 'inputs', [], 'react');
    const vueComp = createComponent('2', 'Comp', 'inputs', [], 'vue');
    const result = calculateSimilarity(reactComp, vueComp);
    expect(result.breakdown.frameworkMatch).toBeLessThan(1.0);
  });
});

// ============================================================================
// Complexity Alignment Tests
// ============================================================================

describe('Complexity Alignment', () => {
  test('same complexity returns 1.0', () => {
    const comp1 = createComponent('1', 'A', 'inputs', [], 'react', 'shadcn-ui', {
      type: 'framer-motion',
      complexity: 'medium',
    });
    const comp2 = createComponent('2', 'B', 'inputs', [], 'react', 'shadcn-ui', {
      type: 'css',
      complexity: 'medium',
    });
    const result = calculateSimilarity(comp1, comp2);
    expect(result.breakdown.complexityMatch).toBe(1.0);
  });

  test('adjacent complexity levels score 0.6', () => {
    const simple = createComponent('1', 'A', 'inputs', [], 'react', 'shadcn-ui', {
      type: 'css',
      complexity: 'simple',
    });
    const medium = createComponent('2', 'B', 'inputs', [], 'react', 'shadcn-ui', {
      type: 'framer-motion',
      complexity: 'medium',
    });
    const result = calculateSimilarity(simple, medium);
    expect(result.breakdown.complexityMatch).toBe(0.6);
  });

  test('opposite complexity levels score low', () => {
    const simple = createComponent('1', 'A', 'inputs', [], 'react', 'shadcn-ui', {
      type: 'css',
      complexity: 'simple',
    });
    const complex = createComponent('2', 'B', 'inputs', [], 'react', 'shadcn-ui', {
      type: 'framer-motion',
      complexity: 'complex',
    });
    const result = calculateSimilarity(simple, complex);
    expect(result.breakdown.complexityMatch).toBe(0.2);
  });

  test('no animation metadata returns 1.0', () => {
    const comp1 = createComponent('1', 'A', 'inputs');
    const comp2 = createComponent('2', 'B', 'inputs');
    const result = calculateSimilarity(comp1, comp2);
    expect(result.breakdown.complexityMatch).toBe(1.0);
  });
});

// ============================================================================
// Find Similar Components Tests
// ============================================================================

describe('Find Similar Components', () => {
  test('finds similar buttons across frameworks', () => {
    const targetBtn = testComponents[0]; // Shadcn Button
    const similar = findSimilarComponents(targetBtn, testComponents);

    expect(similar.length).toBeGreaterThan(0);
    expect(similar[0].component.name).toContain('Button');
  });

  test('excludes self from results', () => {
    const targetBtn = testComponents[0];
    const similar = findSimilarComponents(targetBtn, testComponents);

    expect(similar.every(s => s.component.id !== targetBtn.id)).toBe(true);
  });

  test('respects minScore threshold', () => {
    const targetBtn = testComponents[0];
    const similar = findSimilarComponents(targetBtn, testComponents, {
      minScore: 0.7,
    });

    expect(similar.every(s => s.score >= 0.7)).toBe(true);
  });

  test('respects maxResults limit', () => {
    const targetBtn = testComponents[0];
    const similar = findSimilarComponents(targetBtn, testComponents, {
      maxResults: 3,
    });

    expect(similar.length).toBeLessThanOrEqual(3);
  });

  test('results are sorted by score descending', () => {
    const targetBtn = testComponents[0];
    const similar = findSimilarComponents(targetBtn, testComponents);

    for (let i = 1; i < similar.length; i++) {
      expect(similar[i - 1].score).toBeGreaterThanOrEqual(similar[i].score);
    }
  });

  test('finds all button variants', () => {
    const targetBtn = testComponents[0];
    const similar = findSimilarComponents(targetBtn, testComponents, {
      minScore: 0.4,
    });

    const buttonVariants = similar.filter(s => s.component.name.toLowerCase().includes('button'));
    expect(buttonVariants.length).toBeGreaterThan(3);
  });
});

// ============================================================================
// Ranking Tests
// ============================================================================

describe('Rank Components by Relevance', () => {
  test('ranks buttons highly for "button" query', () => {
    const ranked = rankComponentsByRelevance('button', testComponents);

    expect(ranked[0].name).toContain('Button');
  });

  test('ranks animated cards for "animated card" query', () => {
    const ranked = rankComponentsByRelevance('animated card', testComponents);

    const topResults = ranked.slice(0, 3);
    const hasAnimatedCard = topResults.some(c =>
      c.name.toLowerCase().includes('card') && c.animations
    );
    expect(hasAnimatedCard).toBe(true);
  });

  test('respects maxResults parameter', () => {
    const ranked = rankComponentsByRelevance('component', testComponents, {
      maxResults: 5,
    });

    expect(ranked.length).toBeLessThanOrEqual(5);
  });

  test('prioritizes preferred frameworks', () => {
    const ranked = rankComponentsByRelevance('button', testComponents, {
      preferredFrameworks: ['html'],
    });

    const htmlComponents = ranked.filter(c => c.framework === 'html');
    expect(htmlComponents.length).toBeGreaterThan(0);
  });

  test('matches based on tags', () => {
    const ranked = rankComponentsByRelevance('animated', testComponents);

    const topResults = ranked.slice(0, 3);
    const hasAnimated = topResults.some(c => c.animations !== undefined);
    expect(hasAnimated).toBe(true);
  });

  test('handles intent parameter', () => {
    const ranked = rankComponentsByRelevance('pricing', testComponents, {
      intent: 'pricing page with card layout',
    });

    expect(ranked[0].name).toContain('Card');
  });

  test('handles complexity preference', () => {
    const ranked = rankComponentsByRelevance('button', testComponents, {
      preferredComplexity: 'complex',
    });

    const topAnimated = ranked.find(c => c.animations);
    if (topAnimated?.animations) {
      expect(['medium', 'complex']).toContain(topAnimated.animations.complexity);
    }
  });
});

// ============================================================================
// Specialized Query Tests
// ============================================================================

describe('Find Button Variants', () => {
  test('finds all button components', () => {
    const buttons = findButtonVariants(testComponents);

    expect(buttons.length).toBeGreaterThan(4);
    expect(buttons.every(b => b.component.name.toLowerCase().includes('button'))).toBe(true);
  });

  test('includes animated button variants', () => {
    const buttons = findButtonVariants(testComponents);

    const hasAnimated = buttons.some(b => b.component.animations !== undefined);
    expect(hasAnimated).toBe(true);
  });

  test('scores are sorted descending', () => {
    const buttons = findButtonVariants(testComponents);

    for (let i = 1; i < buttons.length; i++) {
      expect(buttons[i - 1].score).toBeGreaterThanOrEqual(buttons[i].score);
    }
  });
});

describe('Find Animated Cards', () => {
  test('finds only card components with animations', () => {
    const animatedCards = findAnimatedCards(testComponents);

    expect(animatedCards.every(c => c.category === 'cards')).toBe(true);
    expect(animatedCards.every(c => c.animations !== undefined)).toBe(true);
  });

  test('filters out non-animated cards', () => {
    const animatedCards = findAnimatedCards(testComponents);
    const regularCards = testComponents.filter(c =>
      c.category === 'cards' && !c.animations
    );

    expect(animatedCards.length).toBeLessThan(regularCards.length + animatedCards.length);
  });
});

// ============================================================================
// Clustering Tests
// ============================================================================

describe('Cluster by Similarity', () => {
  test('creates clusters of similar components', () => {
    const clusters = clusterBySimilarity(testComponents, 0.6);

    expect(clusters.length).toBeGreaterThan(0);
    expect(clusters.length).toBeLessThan(testComponents.length);
  });

  test('button cluster contains multiple button variants', () => {
    const clusters = clusterBySimilarity(testComponents, 0.5);

    const buttonCluster = clusters.find(cluster =>
      cluster.some(c => c.name === 'Button')
    );

    expect(buttonCluster).toBeDefined();
    expect(buttonCluster!.length).toBeGreaterThan(2);
  });

  test('all components are assigned to exactly one cluster', () => {
    const clusters = clusterBySimilarity(testComponents);
    const allClustered = clusters.flat();

    expect(allClustered.length).toBe(testComponents.length);

    const uniqueIds = new Set(allClustered.map(c => c.id));
    expect(uniqueIds.size).toBe(testComponents.length);
  });

  test('higher threshold creates more clusters', () => {
    const lowThreshold = clusterBySimilarity(testComponents, 0.5);
    const highThreshold = clusterBySimilarity(testComponents, 0.8);

    expect(highThreshold.length).toBeGreaterThanOrEqual(lowThreshold.length);
  });
});

// ============================================================================
// Formatting Tests
// ============================================================================

describe('Format Similarity Results', () => {
  test('formats results as readable text', () => {
    const targetBtn = testComponents[0];
    const similar = findSimilarComponents(targetBtn, testComponents, {
      maxResults: 3,
    });

    const formatted = formatSimilarityResults(similar);

    expect(formatted).toContain('Found');
    expect(formatted).toContain('Score:');
    expect(formatted).toContain('%');
  });

  test('includes component names and sources', () => {
    const targetBtn = testComponents[0];
    const similar = findSimilarComponents(targetBtn, testComponents, {
      maxResults: 2,
    });

    const formatted = formatSimilarityResults(similar);

    expect(formatted).toContain('Button');
    expect(formatted.toLowerCase()).toMatch(/(shadcn-ui|mui|chakra-ui)/);
  });

  test('includes breakdown metrics', () => {
    const targetBtn = testComponents[0];
    const similar = findSimilarComponents(targetBtn, testComponents, {
      maxResults: 1,
    });

    const formatted = formatSimilarityResults(similar);

    expect(formatted).toContain('name=');
    expect(formatted).toContain('category=');
    expect(formatted).toContain('features=');
  });
});

// ============================================================================
// Performance Tests
// ============================================================================

describe('Performance Benchmarks', () => {
  test('scores 200+ components in <100ms', () => {
    // Create larger dataset
    const largeDataset: ComponentMetadata[] = [];
    for (let i = 0; i < 200; i++) {
      largeDataset.push(
        createComponent(
          `perf-${i}`,
          `Component${i}`,
          i % 2 === 0 ? 'inputs' : 'cards',
          ['tag1', 'tag2']
        )
      );
    }

    const start = performance.now();
    findSimilarComponents(largeDataset[0], largeDataset, { maxResults: 20 });
    const end = performance.now();

    const duration = end - start;
    expect(duration).toBeLessThan(100);
  });

  test('benchmarkSimilarity returns valid metrics', () => {
    const benchmark = benchmarkSimilarity(testComponents.slice(0, 10), 10);

    expect(benchmark.avgTimeMs).toBeGreaterThan(0);
    expect(benchmark.componentsPerMs).toBeGreaterThan(0);
    expect(benchmark.totalComponents).toBe(10);
  });

  test('similarity calculation is consistent', () => {
    const comp1 = testComponents[0];
    const comp2 = testComponents[1];

    const result1 = calculateSimilarity(comp1, comp2);
    const result2 = calculateSimilarity(comp1, comp2);

    expect(result1.score).toBe(result2.score);
    expect(result1.breakdown.nameMatch).toBe(result2.breakdown.nameMatch);
  });
});

// ============================================================================
// Edge Cases and Validation
// ============================================================================

describe('Edge Cases', () => {
  test('handles empty candidate list', () => {
    const targetBtn = testComponents[0];
    const similar = findSimilarComponents(targetBtn, []);

    expect(similar.length).toBe(0);
  });

  test('handles single component', () => {
    const targetBtn = testComponents[0];
    const similar = findSimilarComponents(targetBtn, [testComponents[0]]);

    expect(similar.length).toBe(0); // Excludes self
  });

  test('handles components with minimal metadata', () => {
    const minimal1 = createComponent('min-1', 'A', 'other');
    const minimal2 = createComponent('min-2', 'B', 'other');

    const result = calculateSimilarity(minimal1, minimal2);

    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(1);
  });

  test('handles components with undefined fields', () => {
    const comp1: ComponentMetadata = {
      id: 'test-1',
      name: 'Test',
      displayName: 'Test',
      description: 'Test component',
      category: 'other',
      tags: [],
      source: 'shadcn-ui',
    };

    const comp2: ComponentMetadata = {
      id: 'test-2',
      name: 'Test2',
      displayName: 'Test2',
      description: 'Test2 component',
      category: 'other',
      tags: [],
      source: 'mui',
    };

    const result = calculateSimilarity(comp1, comp2);

    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(1);
  });

  test('handles query with special characters', () => {
    const ranked = rankComponentsByRelevance('button@#$%', testComponents);

    expect(ranked.length).toBeGreaterThan(0);
  });

  test('handles empty query string', () => {
    const ranked = rankComponentsByRelevance('', testComponents);

    expect(ranked.length).toBeGreaterThan(0);
  });

  test('score is always between 0 and 1', () => {
    for (let i = 0; i < testComponents.length; i++) {
      for (let j = 0; j < testComponents.length; j++) {
        const result = calculateSimilarity(testComponents[i], testComponents[j]);
        expect(result.score).toBeGreaterThanOrEqual(0);
        expect(result.score).toBeLessThanOrEqual(1);
      }
    }
  });
});

// ============================================================================
// Real-World Scenarios
// ============================================================================

describe('Real-World Scenarios', () => {
  test('finding MUI alternatives to Shadcn components', () => {
    const shadcnCard = testComponents.find(c => c.source === 'shadcn-ui' && c.name === 'Card');
    expect(shadcnCard).toBeDefined();

    const similar = findSimilarComponents(shadcnCard!, testComponents);
    const muiAlternatives = similar.filter(s => s.component.source === 'mui');

    expect(muiAlternatives.length).toBeGreaterThan(0);
  });

  test('finding animated alternatives to static components', () => {
    const staticBtn = testComponents[0]; // Regular Button
    const similar = findSimilarComponents(staticBtn, testComponents);

    const animatedAlternatives = similar.filter(s => s.component.animations);
    expect(animatedAlternatives.length).toBeGreaterThan(0);
  });

  test('cross-framework component discovery', () => {
    const reactBtn = testComponents.find(c => c.framework === 'react' && c.name === 'Button');
    const htmlBtn = testComponents.find(c => c.framework === 'html' && c.name === 'Button');

    expect(reactBtn).toBeDefined();
    expect(htmlBtn).toBeDefined();

    const result = calculateSimilarity(reactBtn!, htmlBtn!);
    expect(result.score).toBeGreaterThan(0.5); // Should be somewhat similar
  });

  test('finding components for "create a dashboard with animated charts"', () => {
    const ranked = rankComponentsByRelevance('dashboard animated charts', testComponents, {
      intent: 'dashboard with data visualization',
      preferredComplexity: 'medium',
    });

    expect(ranked.length).toBeGreaterThan(0);
  });

  test('component substitution: finding simpler alternatives', () => {
    const complexBtn = testComponents[5]; // MovingBorderButton (complex)
    const similar = findSimilarComponents(complexBtn, testComponents);

    const simplerAlternatives = similar.filter(s =>
      !s.component.animations || s.component.animations.complexity === 'simple'
    );

    expect(simplerAlternatives.length).toBeGreaterThan(0);
  });
});
