/**
 * Cross-Framework Similarity Scorer Demo
 *
 * Demonstrates the similarity scoring system with real examples
 */

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
  description: `${name} component from ${source}`,
  category,
  tags,
  framework,
  source,
  animations,
});

const demoComponents: ComponentMetadata[] = [
  // Shadcn UI Buttons
  createComponent('btn-shadcn-1', 'Button', 'inputs', ['button', 'click', 'primary'], 'react', 'shadcn-ui'),
  createComponent('btn-shadcn-2', 'IconButton', 'inputs', ['button', 'icon', 'action'], 'react', 'shadcn-ui'),

  // MUI Buttons
  createComponent('btn-mui-1', 'Button', 'inputs', ['button', 'action', 'material'], 'react', 'mui'),
  createComponent('btn-mui-2', 'IconButton', 'inputs', ['button', 'icon'], 'react', 'mui'),
  createComponent('btn-mui-3', 'LoadingButton', 'inputs', ['button', 'loading', 'async'], 'react', 'mui'),

  // Chakra UI Buttons
  createComponent('btn-chakra-1', 'Button', 'inputs', ['button', 'chakra'], 'react', 'chakra-ui'),
  createComponent('btn-chakra-2', 'IconButton', 'inputs', ['button', 'icon', 'chakra'], 'react', 'chakra-ui'),

  // Magic UI Animated Buttons
  createComponent('btn-magic-1', 'ShimmerButton', 'inputs', ['button', 'animated', 'shimmer'], 'react', 'magic-ui', {
    type: 'framer-motion' as const,
    complexity: 'medium' as const,
  }),
  createComponent('btn-magic-2', 'PulsatingButton', 'inputs', ['button', 'animated', 'pulse'], 'react', 'magic-ui', {
    type: 'css' as const,
    complexity: 'simple' as const,
  }),

  // Aceternity UI Animated Buttons
  createComponent('btn-acet-1', 'MovingBorderButton', 'inputs', ['button', 'animated', 'border', 'gradient'], 'react', 'aceternity-ui', {
    type: 'framer-motion' as const,
    complexity: 'complex' as const,
  }),
  createComponent('btn-acet-2', 'GlowingButton', 'inputs', ['button', 'animated', 'glow'], 'react', 'aceternity-ui', {
    type: 'css' as const,
    complexity: 'medium' as const,
  }),

  // HTML/Flowbite Buttons
  createComponent('btn-html-1', 'Button', 'inputs', ['button', 'html'], 'html', 'flowbite'),
  createComponent('btn-html-2', 'GradientButton', 'inputs', ['button', 'gradient', 'html'], 'html', 'flowbite'),

  // Shadcn UI Cards
  createComponent('card-shadcn-1', 'Card', 'cards', ['card', 'container'], 'react', 'shadcn-ui'),
  createComponent('card-shadcn-2', 'HoverCard', 'cards', ['card', 'hover', 'overlay'], 'react', 'shadcn-ui'),

  // MUI Cards
  createComponent('card-mui-1', 'Card', 'cards', ['card', 'material'], 'react', 'mui'),
  createComponent('card-mui-2', 'PaperCard', 'cards', ['card', 'paper', 'elevation'], 'react', 'mui'),

  // Animated Cards
  createComponent('card-magic-1', 'AnimatedCard', 'cards', ['card', 'animated', 'hover'], 'react', 'magic-ui', {
    type: 'framer-motion' as const,
    complexity: 'medium' as const,
  }),
  createComponent('card-acet-1', '3DCard', 'cards', ['card', '3d', 'animated', 'tilt'], 'react', 'aceternity-ui', {
    type: 'css' as const,
    complexity: 'complex' as const,
  }),
  createComponent('card-acet-2', 'GlowCard', 'cards', ['card', 'glow', 'animated'], 'react', 'aceternity-ui', {
    type: 'framer-motion' as const,
    complexity: 'medium' as const,
  }),

  // Form Components
  createComponent('form-shadcn-1', 'Form', 'forms', ['form', 'validation'], 'react', 'shadcn-ui'),
  createComponent('form-mui-1', 'FormControl', 'forms', ['form', 'control'], 'react', 'mui'),
  createComponent('input-shadcn-1', 'Input', 'inputs', ['input', 'text'], 'react', 'shadcn-ui'),
  createComponent('input-mui-1', 'TextField', 'inputs', ['input', 'text', 'field'], 'react', 'mui'),

  // Navigation
  createComponent('nav-shadcn-1', 'NavigationMenu', 'navigation', ['nav', 'menu'], 'react', 'shadcn-ui'),
  createComponent('nav-mui-1', 'AppBar', 'navigation', ['nav', 'bar', 'header'], 'react', 'mui'),
  createComponent('nav-chakra-1', 'Breadcrumb', 'navigation', ['nav', 'breadcrumb'], 'react', 'chakra-ui'),
];

// ============================================================================
// Demo Functions
// ============================================================================

function runDemo() {
  console.log('='.repeat(80));
  console.log('CROSS-FRAMEWORK SIMILARITY SCORER DEMO');
  console.log('='.repeat(80));
  console.log();

  // Demo 1: Find Similar Buttons
  console.log('Demo 1: Find Similar Buttons Across Frameworks');
  console.log('-'.repeat(80));
  const shadcnButton = demoComponents.find(c => c.id === 'btn-shadcn-1')!;
  const similarButtons = findSimilarComponents(shadcnButton, demoComponents, {
    minScore: 0.5,
    maxResults: 10,
  });

  console.log(`Target: ${shadcnButton.displayName} (${shadcnButton.source})`);
  console.log(`\nFound ${similarButtons.length} similar components:\n`);

  similarButtons.forEach((result, idx) => {
    const { component, score, breakdown, reasoning } = result;
    console.log(`${idx + 1}. ${component.displayName} (${component.source})`);
    console.log(`   Score: ${(score * 100).toFixed(1)}%`);
    console.log(`   Name Match: ${(breakdown.nameMatch * 100).toFixed(0)}%, Category: ${(breakdown.categoryMatch * 100).toFixed(0)}%, Features: ${(breakdown.featureMatch * 100).toFixed(0)}%`);
    console.log(`   Reasoning: ${reasoning}`);
    console.log();
  });

  // Demo 2: Find All Button Variants
  console.log('='.repeat(80));
  console.log('Demo 2: Find All Button Variants');
  console.log('-'.repeat(80));
  const buttonVariants = findButtonVariants(demoComponents);

  console.log(`Found ${buttonVariants.length} button variants across all frameworks:\n`);
  buttonVariants.slice(0, 8).forEach((result, idx) => {
    const { component, score } = result;
    const animated = component.animations ? '(animated)' : '';
    console.log(`${idx + 1}. ${component.displayName} - ${component.source} ${animated} - ${(score * 100).toFixed(1)}%`);
  });
  console.log();

  // Demo 3: Rank Components by Query
  console.log('='.repeat(80));
  console.log('Demo 3: Rank Components by Query "animated button"');
  console.log('-'.repeat(80));
  const rankedByQuery = rankComponentsByRelevance('animated button', demoComponents, {
    intent: 'find animated button components',
    maxResults: 10,
  });

  console.log(`Top 10 results for "animated button":\n`);
  rankedByQuery.forEach((component, idx) => {
    const animated = component.animations ? `[${component.animations.type}, ${component.animations.complexity}]` : '[no animation]';
    console.log(`${idx + 1}. ${component.displayName} (${component.source}) ${animated}`);
  });
  console.log();

  // Demo 4: Find Animated Cards
  console.log('='.repeat(80));
  console.log('Demo 4: Find Animated Cards');
  console.log('-'.repeat(80));
  const animatedCards = findAnimatedCards(demoComponents);

  console.log(`Found ${animatedCards.length} animated card components:\n`);
  animatedCards.forEach((component, idx) => {
    console.log(`${idx + 1}. ${component.displayName} (${component.source})`);
    console.log(`   Animation: ${component.animations?.type}, Complexity: ${component.animations?.complexity}`);
    console.log(`   Tags: ${component.tags.join(', ')}`);
    console.log();
  });

  // Demo 5: Component Clustering
  console.log('='.repeat(80));
  console.log('Demo 5: Group Similar Components into Clusters');
  console.log('-'.repeat(80));
  const clusters = clusterBySimilarity(demoComponents, 0.6);

  console.log(`Created ${clusters.length} clusters (threshold: 0.6):\n`);
  clusters.forEach((cluster, idx) => {
    console.log(`Cluster ${idx + 1} (${cluster.length} components):`);
    cluster.forEach(component => {
      console.log(`  - ${component.displayName} (${component.source})`);
    });
    console.log();
  });

  // Demo 6: Cross-Framework Comparison
  console.log('='.repeat(80));
  console.log('Demo 6: Compare Specific Components');
  console.log('-'.repeat(80));

  const comparisons = [
    { comp1: 'btn-shadcn-1', comp2: 'btn-mui-1', label: 'Shadcn Button vs MUI Button' },
    { comp1: 'btn-shadcn-1', comp2: 'btn-html-1', label: 'React Button vs HTML Button' },
    { comp1: 'btn-shadcn-1', comp2: 'btn-magic-1', label: 'Static Button vs Animated Button' },
    { comp1: 'card-shadcn-1', comp2: 'card-acet-1', label: 'Static Card vs 3D Card' },
  ];

  comparisons.forEach(({ comp1, comp2, label }) => {
    const component1 = demoComponents.find(c => c.id === comp1)!;
    const component2 = demoComponents.find(c => c.id === comp2)!;
    const result = calculateSimilarity(component1, component2);

    console.log(`${label}:`);
    console.log(`  Overall Score: ${(result.score * 100).toFixed(1)}%`);
    console.log(`  Name Match: ${(result.breakdown.nameMatch * 100).toFixed(0)}%`);
    console.log(`  Category Match: ${(result.breakdown.categoryMatch * 100).toFixed(0)}%`);
    console.log(`  Feature Match: ${(result.breakdown.featureMatch * 100).toFixed(0)}%`);
    console.log(`  Framework Match: ${(result.breakdown.frameworkMatch * 100).toFixed(0)}%`);
    console.log(`  Complexity Match: ${(result.breakdown.complexityMatch * 100).toFixed(0)}%`);
    console.log(`  Reasoning: ${result.reasoning}`);
    console.log();
  });

  // Demo 7: Performance Benchmark
  console.log('='.repeat(80));
  console.log('Demo 7: Performance Benchmark');
  console.log('-'.repeat(80));

  // Create larger dataset
  const largeDataset: ComponentMetadata[] = [];
  for (let i = 0; i < 200; i++) {
    largeDataset.push(
      createComponent(
        `perf-${i}`,
        `Component${i % 20}`,
        i % 2 === 0 ? 'inputs' : 'cards',
        ['tag1', 'tag2'],
        i % 3 === 0 ? 'html' : 'react',
        i % 5 === 0 ? 'mui' : 'shadcn-ui',
        i % 4 === 0 ? { type: 'framer-motion' as const, complexity: 'medium' as const } : undefined
      )
    );
  }

  const benchmark = benchmarkSimilarity(largeDataset, 50);

  console.log(`Performance Results:`);
  console.log(`  Total Components: ${benchmark.totalComponents}`);
  console.log(`  Average Time per Query: ${benchmark.avgTimeMs.toFixed(2)}ms`);
  console.log(`  Components Processed per ms: ${benchmark.componentsPerMs.toFixed(2)}`);
  console.log(`  Target: <100ms ✓ (${benchmark.avgTimeMs < 100 ? 'PASS' : 'FAIL'})`);
  console.log();

  // Demo 8: Real-World Use Cases
  console.log('='.repeat(80));
  console.log('Demo 8: Real-World Use Cases');
  console.log('-'.repeat(80));

  console.log('Use Case 1: "I want an animated card for my landing page"');
  const landingPageCards = rankComponentsByRelevance('animated card landing', demoComponents, {
    intent: 'landing page with visual appeal',
    preferredComplexity: 'medium',
    maxResults: 5,
  });
  landingPageCards.forEach((c, idx) => {
    const anim = c.animations ? `(${c.animations.complexity})` : '';
    console.log(`  ${idx + 1}. ${c.displayName} (${c.source}) ${anim}`);
  });
  console.log();

  console.log('Use Case 2: "Find MUI alternatives to my Shadcn components"');
  const shadcnCard = demoComponents.find(c => c.id === 'card-shadcn-1')!;
  const muiAlternatives = findSimilarComponents(shadcnCard, demoComponents, {
    minScore: 0.4,
  }).filter(s => s.component.source === 'mui');
  muiAlternatives.forEach((result, idx) => {
    console.log(`  ${idx + 1}. ${result.component.displayName} - Score: ${(result.score * 100).toFixed(1)}%`);
  });
  console.log();

  console.log('Use Case 3: "I need a simpler version of this complex animated button"');
  const complexButton = demoComponents.find(c => c.id === 'btn-acet-1')!;
  const simplerButtons = findSimilarComponents(complexButton, demoComponents, {
    minScore: 0.3,
  }).filter(s =>
    !s.component.animations || s.component.animations.complexity === 'simple'
  );
  simplerButtons.slice(0, 5).forEach((result, idx) => {
    const anim = result.component.animations ? `(${result.component.animations.complexity})` : '(static)';
    console.log(`  ${idx + 1}. ${result.component.displayName} (${result.component.source}) ${anim} - ${(result.score * 100).toFixed(1)}%`);
  });
  console.log();

  console.log('='.repeat(80));
  console.log('DEMO COMPLETE');
  console.log('='.repeat(80));
}

// Run the demo
if (require.main === module) {
  runDemo();
}

export { runDemo, demoComponents };
