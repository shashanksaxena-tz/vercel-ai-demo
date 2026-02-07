/**
 * Recommendation Engine Usage Examples
 *
 * Demonstrates all 4 recommendation types and various use cases
 */

import {
  RecommendationEngine,
  createRecommendationEngine,
  quickRecommend,
  PreferenceLearner,
  type RecommendationContext,
  type ComponentMetadata,
} from '../index';

// ============================================================================
// Mock Data (simulates real component data)
// ============================================================================

const mockComponents: ComponentMetadata[] = [
  // Shadcn components
  {
    id: 'shadcn-button',
    name: 'Button',
    displayName: 'Button',
    description: 'A basic button component',
    category: 'forms',
    tags: ['button', 'click', 'action'],
    source: 'shadcn-ui',
    framework: 'react',
  },
  {
    id: 'shadcn-card',
    name: 'Card',
    displayName: 'Card',
    description: 'A simple card container',
    category: 'cards',
    tags: ['card', 'container', 'panel'],
    source: 'shadcn-ui',
    framework: 'react',
  },
  {
    id: 'shadcn-input',
    name: 'Input',
    displayName: 'Input',
    description: 'Text input field',
    category: 'inputs',
    tags: ['input', 'text', 'field'],
    source: 'shadcn-ui',
    framework: 'react',
  },

  // Magic UI animated components
  {
    id: 'magic-shimmer-button',
    name: 'ShimmerButton',
    displayName: 'Shimmer Button',
    description: 'Animated button with shimmer effect',
    category: 'forms',
    tags: ['button', 'animated', 'shimmer', 'premium'],
    source: 'magic-ui',
    framework: 'react',
    animations: {
      type: 'framer-motion',
      complexity: 'medium',
    },
  },
  {
    id: 'magic-3d-card',
    name: '3DCard',
    displayName: '3D Card',
    description: 'Card with 3D perspective effect',
    category: 'cards',
    tags: ['card', '3d', 'animated', 'premium'],
    source: 'magic-ui',
    framework: 'react',
    animations: {
      type: 'framer-motion',
      complexity: 'complex',
    },
  },

  // MUI components
  {
    id: 'mui-button',
    name: 'Button',
    displayName: 'MUI Button',
    description: 'Material Design button',
    category: 'forms',
    tags: ['button', 'material', 'click'],
    source: 'mui',
    framework: 'react',
  },

  // Complementary components
  {
    id: 'shadcn-badge',
    name: 'Badge',
    displayName: 'Badge',
    description: 'Small badge for labels',
    category: 'data-display',
    tags: ['badge', 'label', 'tag'],
    source: 'shadcn-ui',
    framework: 'react',
  },
  {
    id: 'shadcn-typography',
    name: 'Typography',
    displayName: 'Typography',
    description: 'Text styling component',
    category: 'typography',
    tags: ['text', 'heading', 'typography'],
    source: 'shadcn-ui',
    framework: 'react',
  },
];

// ============================================================================
// Example 1: Basic Primary Recommendations
// ============================================================================

export function example1_BasicRecommendations() {
  console.log('\n=== Example 1: Basic Primary Recommendations ===\n');

  const learner = new PreferenceLearner();
  const engine = createRecommendationEngine(learner);

  const context: RecommendationContext = {
    currentIntent: 'landing-page',
    selectedComponents: [],
  };

  const result = engine.recommend('button', mockComponents, context, {
    maxResults: 3,
    includeAlternatives: false,
    includeComplementary: false,
    includeUpgrades: false,
  });

  console.log('Query: "button"');
  console.log('Intent: landing-page');
  console.log('\nTop 3 Recommendations:');

  result.recommendations.primary.forEach((rec, idx) => {
    console.log(`\n${idx + 1}. ${rec.component.displayName} (${rec.component.source})`);
    console.log(`   Score: ${(rec.score * 100).toFixed(1)}%`);
    console.log(`   Confidence: ${(rec.confidence * 100).toFixed(1)}%`);
    console.log('   Reasoning:');
    rec.reasoning.forEach(reason => console.log(`     - ${reason}`));
  });

  console.log('\nPerformance:');
  console.log(`  Total time: ${result.performance.totalTimeMs.toFixed(2)}ms`);
  console.log(`  Components evaluated: ${result.performance.componentsEvaluated}`);
}

// ============================================================================
// Example 2: Alternative Recommendations
// ============================================================================

export function example2_AlternativeRecommendations() {
  console.log('\n=== Example 2: Alternative Framework Recommendations ===\n');

  const learner = new PreferenceLearner();
  const engine = createRecommendationEngine(learner);

  const shadcnButton = mockComponents.find(c => c.id === 'shadcn-button')!;

  const alternatives = engine.getAlternativeRecommendations(
    shadcnButton,
    mockComponents,
    {
      currentIntent: 'general',
      selectedComponents: [shadcnButton],
    },
    5
  );

  console.log('Selected: Shadcn Button');
  console.log('\nAlternatives from different frameworks:');

  alternatives.forEach((rec, idx) => {
    console.log(`\n${idx + 1}. ${rec.component.displayName} (${rec.component.source})`);
    console.log(`   Score: ${(rec.score * 100).toFixed(1)}%`);
    console.log('   Reasoning:');
    rec.reasoning.forEach(reason => console.log(`     - ${reason}`));
  });
}

// ============================================================================
// Example 3: Complementary Recommendations
// ============================================================================

export function example3_ComplementaryRecommendations() {
  console.log('\n=== Example 3: Complementary Component Suggestions ===\n');

  const learner = new PreferenceLearner();
  const engine = createRecommendationEngine(learner);

  const card = mockComponents.find(c => c.id === 'shadcn-card')!;
  const button = mockComponents.find(c => c.id === 'shadcn-button')!;

  const complementary = engine.getComplementaryRecommendations(
    [card, button],
    mockComponents,
    {
      currentIntent: 'landing-page',
      selectedComponents: [card, button],
    },
    5
  );

  console.log('Selected Components:');
  console.log('  - Card (shadcn-ui)');
  console.log('  - Button (shadcn-ui)');
  console.log('\nComplementary components (often used together):');

  complementary.forEach((rec, idx) => {
    console.log(`\n${idx + 1}. ${rec.component.displayName} (${rec.component.source})`);
    console.log(`   Score: ${(rec.score * 100).toFixed(1)}%`);
    console.log('   Reasoning:');
    rec.reasoning.forEach(reason => console.log(`     - ${reason}`));
  });
}

// ============================================================================
// Example 4: Upgrade Recommendations
// ============================================================================

export function example4_UpgradeRecommendations() {
  console.log('\n=== Example 4: Component Upgrade Suggestions ===\n');

  const learner = new PreferenceLearner();
  const engine = createRecommendationEngine(learner);

  const basicButton = mockComponents.find(c => c.id === 'shadcn-button')!;

  const upgrades = engine.getUpgradeRecommendations(
    basicButton,
    mockComponents,
    5
  );

  console.log('Current Component: Button (basic, no animations)');
  console.log('\nUpgrade suggestions (enhanced versions):');

  upgrades.forEach((rec, idx) => {
    console.log(`\n${idx + 1}. ${rec.component.displayName} (${rec.component.source})`);
    console.log(`   Score: ${(rec.score * 100).toFixed(1)}%`);
    console.log(`   Confidence: ${(rec.confidence * 100).toFixed(1)}%`);
    if (rec.component.animations) {
      console.log(`   Animation: ${rec.component.animations.type} (${rec.component.animations.complexity})`);
    }
    console.log('   Reasoning:');
    rec.reasoning.forEach(reason => console.log(`     - ${reason}`));
  });
}

// ============================================================================
// Example 5: User Preference Learning
// ============================================================================

export function example5_UserPreferenceLearning() {
  console.log('\n=== Example 5: User Preference Learning ===\n');

  const learner = new PreferenceLearner();

  // Simulate user selecting Shadcn components multiple times
  const shadcnButton = mockComponents.find(c => c.source === 'shadcn-ui')!;
  const shadcnCard = mockComponents.find(c => c.id === 'shadcn-card')!;

  console.log('Tracking user selections:');
  for (let i = 0; i < 5; i++) {
    learner.trackSelection(shadcnButton, 'landing-page');
    console.log(`  - Selected Button (shadcn-ui) for landing-page`);
  }
  for (let i = 0; i < 3; i++) {
    learner.trackSelection(shadcnCard, 'landing-page');
    console.log(`  - Selected Card (shadcn-ui) for landing-page`);
  }

  const stats = learner.getStats();
  console.log('\nUser Preference Stats:');
  console.log(`  Total selections: ${stats.totalSelections}`);
  console.log(`  Favorite frameworks: ${stats.favoriteFrameworks.join(', ')}`);
  console.log(`  Top components: ${stats.topComponents.join(', ')}`);

  // Now use preferences in recommendations
  const engine = createRecommendationEngine(learner);

  const result = engine.recommend('button', mockComponents, {
    currentIntent: 'landing-page',
    selectedComponents: [],
    userPreferences: learner.exportPreferences(),
  }, {
    maxResults: 3,
  });

  console.log('\nRecommendations with learned preferences:');
  result.recommendations.primary.forEach((rec, idx) => {
    console.log(`\n${idx + 1}. ${rec.component.displayName} (${rec.component.source})`);
    console.log(`   Score: ${(rec.score * 100).toFixed(1)}%`);
    console.log(`   User Preference Score: ${(rec.breakdown.userPreference * 100).toFixed(1)}%`);
    console.log('   Reasoning:');
    rec.reasoning.forEach(reason => console.log(`     - ${reason}`));
  });
}

// ============================================================================
// Example 6: Performance Requirements
// ============================================================================

export function example6_PerformanceRequirements() {
  console.log('\n=== Example 6: Performance-Constrained Recommendations ===\n');

  const learner = new PreferenceLearner();
  const engine = createRecommendationEngine(learner);

  const context: RecommendationContext = {
    currentIntent: 'mobile',
    selectedComponents: [],
    performanceRequirements: {
      maxBundleSize: 20,  // 20KB max
      mobileFirst: true,
      requiresAnimation: false,  // Avoid heavy animations
    },
  };

  const result = engine.recommend('button', mockComponents, context, {
    maxResults: 3,
  });

  console.log('Performance Requirements:');
  console.log('  - Max bundle size: 20KB');
  console.log('  - Mobile-first: true');
  console.log('  - Avoid animations: true');

  console.log('\nOptimized recommendations:');
  result.recommendations.primary.forEach((rec, idx) => {
    console.log(`\n${idx + 1}. ${rec.component.displayName} (${rec.component.source})`);
    console.log(`   Score: ${(rec.score * 100).toFixed(1)}%`);
    console.log(`   Has animations: ${!!rec.component.animations}`);
    console.log('   Reasoning:');
    rec.reasoning.forEach(reason => console.log(`     - ${reason}`));
  });
}

// ============================================================================
// Example 7: Complete Recommendation Flow
// ============================================================================

export function example7_CompleteFlow() {
  console.log('\n=== Example 7: Complete Recommendation Flow ===\n');

  const learner = new PreferenceLearner();
  const engine = createRecommendationEngine(learner);

  const button = mockComponents.find(c => c.id === 'shadcn-button')!;

  const result = engine.recommend('button', mockComponents, {
    currentIntent: 'landing-page',
    selectedComponents: [button],
  }, {
    maxResults: 3,
    includeAlternatives: true,
    includeComplementary: true,
    includeUpgrades: true,
  });

  console.log('Query: "button"');
  console.log('Intent: landing-page');
  console.log('Selected: Button (shadcn-ui)');

  console.log('\n--- PRIMARY RECOMMENDATIONS ---');
  result.recommendations.primary.slice(0, 2).forEach((rec, idx) => {
    console.log(`\n${idx + 1}. ${rec.component.displayName}`);
    console.log(`   ${rec.reasoning.join(', ')}`);
  });

  console.log('\n--- ALTERNATIVE RECOMMENDATIONS ---');
  result.recommendations.alternative.slice(0, 2).forEach((rec, idx) => {
    console.log(`\n${idx + 1}. ${rec.component.displayName}`);
    console.log(`   ${rec.reasoning.join(', ')}`);
  });

  console.log('\n--- COMPLEMENTARY RECOMMENDATIONS ---');
  result.recommendations.complementary.slice(0, 2).forEach((rec, idx) => {
    console.log(`\n${idx + 1}. ${rec.component.displayName}`);
    console.log(`   ${rec.reasoning.join(', ')}`);
  });

  console.log('\n--- UPGRADE RECOMMENDATIONS ---');
  result.recommendations.upgrade.slice(0, 2).forEach((rec, idx) => {
    console.log(`\n${idx + 1}. ${rec.component.displayName}`);
    console.log(`   ${rec.reasoning.join(', ')}`);
  });

  console.log('\n--- PERFORMANCE METRICS ---');
  console.log(`Total time: ${result.performance.totalTimeMs.toFixed(2)}ms`);
  console.log(`Query enhance: ${result.performance.queryEnhanceTimeMs.toFixed(2)}ms`);
  console.log(`Filter: ${result.performance.filterTimeMs.toFixed(2)}ms`);
  console.log(`Score: ${result.performance.scoreTimeMs.toFixed(2)}ms`);
}

// ============================================================================
// Example 8: Quick Recommend (Simplified API)
// ============================================================================

export function example8_QuickRecommend() {
  console.log('\n=== Example 8: Quick Recommend (Simplified API) ===\n');

  const recommendations = quickRecommend(
    'button',
    mockComponents,
    'landing-page',
    3
  );

  console.log('Using quickRecommend() for fast, simple recommendations');
  console.log('\nTop 3 Buttons for Landing Page:');

  recommendations.forEach((rec, idx) => {
    console.log(`\n${idx + 1}. ${rec.component.displayName}`);
    console.log(`   Score: ${(rec.score * 100).toFixed(1)}%`);
    console.log(`   ${rec.reasoning.join(', ')}`);
  });
}

// ============================================================================
// Run All Examples
// ============================================================================

export function runAllExamples() {
  console.log('╔═══════════════════════════════════════════════════════════╗');
  console.log('║   RECOMMENDATION ENGINE - USAGE EXAMPLES                 ║');
  console.log('╚═══════════════════════════════════════════════════════════╝');

  example1_BasicRecommendations();
  example2_AlternativeRecommendations();
  example3_ComplementaryRecommendations();
  example4_UpgradeRecommendations();
  example5_UserPreferenceLearning();
  example6_PerformanceRequirements();
  example7_CompleteFlow();
  example8_QuickRecommend();

  console.log('\n╔═══════════════════════════════════════════════════════════╗');
  console.log('║   ALL EXAMPLES COMPLETED                                 ║');
  console.log('╚═══════════════════════════════════════════════════════════╝\n');
}

// Uncomment to run examples
// runAllExamples();
