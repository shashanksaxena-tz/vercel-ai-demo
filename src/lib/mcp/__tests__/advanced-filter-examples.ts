/**
 * Advanced Category Filtering - Real-World Examples
 *
 * Demonstrates practical usage of the filtering system with realistic scenarios.
 */

import {
  filterComponents,
  filterComponentsWithMetrics,
  filterByCategory,
  filterByComplexity,
  filterByAnimation,
  suggestFilters,
  applyFilterSuggestions,
  rankByFilters,
  estimateComponentBundleSize,
  getBundleSizeCategory,
  combineFilters,
  type ComponentFilters,
} from '../advanced-filter';
import type { ComponentMetadata } from '../types';

// ============================================================================
// Example Components Dataset
// ============================================================================

const exampleComponents: ComponentMetadata[] = [
  // Shadcn UI Components
  {
    id: 'shadcn-button',
    name: 'Button',
    displayName: 'Button',
    description: 'Simple button component',
    category: 'forms',
    tags: ['button', 'simple', 'form-control'],
    source: 'shadcn-ui',
    framework: 'react',
    dependencies: ['react', '@radix-ui/react-slot'],
  },
  {
    id: 'shadcn-card',
    name: 'Card',
    displayName: 'Card',
    description: 'Card container component',
    category: 'cards',
    tags: ['card', 'container'],
    source: 'shadcn-ui',
    framework: 'react',
  },

  // Magic UI Animated Components
  {
    id: 'magic-shimmer-button',
    name: 'ShimmerButton',
    displayName: 'Shimmer Button',
    description: 'Animated button with shimmer effect',
    category: 'forms',
    tags: ['button', 'animated', 'shimmer'],
    source: 'magic-ui',
    framework: 'react',
    dependencies: ['react', 'framer-motion'],
    animations: {
      type: 'framer-motion',
      complexity: 'medium',
    },
  },
  {
    id: 'magic-text-reveal',
    name: 'TextReveal',
    displayName: 'Text Reveal',
    description: 'Animated text reveal effect',
    category: 'typography',
    tags: ['text', 'animated', 'reveal'],
    source: 'magic-ui',
    framework: 'react',
    dependencies: ['react', 'framer-motion'],
    animations: {
      type: 'framer-motion',
      complexity: 'simple',
    },
  },

  // Aceternity UI Components
  {
    id: 'aceternity-3d-card',
    name: '3DCard',
    displayName: '3D Card',
    description: 'Interactive 3D card with perspective',
    category: 'cards',
    tags: ['card', '3d', 'animated', 'interactive'],
    source: 'aceternity-ui',
    framework: 'react',
    dependencies: ['react', 'framer-motion'],
    animations: {
      type: 'framer-motion',
      complexity: 'complex',
    },
  },
  {
    id: 'aceternity-hero',
    name: 'AnimatedHero',
    displayName: 'Animated Hero',
    description: 'Hero section with complex animations',
    category: 'marketing',
    tags: ['hero', 'landing', 'animated'],
    source: 'aceternity-ui',
    framework: 'react',
    dependencies: ['react', 'framer-motion'],
    animations: {
      type: 'framer-motion',
      complexity: 'complex',
    },
  },

  // MUI Components
  {
    id: 'mui-data-grid',
    name: 'DataGrid',
    displayName: 'Data Grid',
    description: 'Feature-rich data grid',
    category: 'data-display',
    tags: ['table', 'grid', 'data'],
    source: 'mui',
    framework: 'react',
    dependencies: ['react', '@mui/material', '@mui/x-data-grid'],
  },
  {
    id: 'mui-date-picker',
    name: 'DatePicker',
    displayName: 'Date Picker',
    description: 'Material design date picker',
    category: 'inputs',
    tags: ['input', 'date', 'picker'],
    source: 'mui',
    framework: 'react',
    dependencies: ['react', '@mui/material'],
  },
];

// ============================================================================
// Example 1: Basic Category Filtering
// ============================================================================

console.log('='.repeat(80));
console.log('Example 1: Basic Category Filtering');
console.log('='.repeat(80));

const buttons = filterComponents(exampleComponents, {
  categories: ['forms'],
});

console.log(`Found ${buttons.length} button components:`);
buttons.forEach((comp) => {
  console.log(`  - ${comp.displayName} (${comp.source})`);
});
console.log('');

// ============================================================================
// Example 2: Multi-Dimensional Filtering
// ============================================================================

console.log('='.repeat(80));
console.log('Example 2: Animated Cards with Performance Constraints');
console.log('='.repeat(80));

const animatedCards = filterComponents(exampleComponents, {
  categories: ['cards'],
  hasAnimations: true,
  complexity: ['simple', 'medium'],
  maxBundleSize: 50,
});

console.log(`Found ${animatedCards.length} animated cards (simple-medium complexity, <50KB):`);
animatedCards.forEach((comp) => {
  const size = estimateComponentBundleSize(comp);
  const sizeCategory = getBundleSizeCategory(size);
  console.log(`  - ${comp.displayName} (${comp.source})`);
  console.log(`    Complexity: ${comp.animations?.complexity}, Bundle: ${size}KB (${sizeCategory})`);
});
console.log('');

// ============================================================================
// Example 3: Smart Filter Suggestions
// ============================================================================

console.log('='.repeat(80));
console.log('Example 3: Smart Filter Suggestions from Natural Language');
console.log('='.repeat(80));

const query = 'animated shimmer button';
console.log(`Query: "${query}"\n`);

const suggestions = suggestFilters(query);

console.log('Suggested filters:');
suggestions.slice(0, 5).forEach((suggestion) => {
  console.log(`  - ${suggestion.dimension}: ${JSON.stringify(suggestion.value)}`);
  console.log(`    Confidence: ${(suggestion.confidence * 100).toFixed(0)}%`);
  console.log(`    Reasoning: ${suggestion.reasoning}`);
  console.log('');
});

const autoFiltered = applyFilterSuggestions(exampleComponents, suggestions, 0.75);
console.log(`Auto-filtered results: ${autoFiltered.length} components`);
autoFiltered.forEach((comp) => {
  console.log(`  - ${comp.displayName} (${comp.source})`);
});
console.log('');

// ============================================================================
// Example 4: Intent-Based Filtering
// ============================================================================

console.log('='.repeat(80));
console.log('Example 4: Landing Page Component Discovery');
console.log('='.repeat(80));

const landingQuery = 'hero section for landing page';
const landingSuggestions = suggestFilters(landingQuery, 'landing-page');

console.log(`Query: "${landingQuery}"`);
console.log(`Intent: landing-page\n`);

const landingComponents = applyFilterSuggestions(
  exampleComponents,
  landingSuggestions,
  0.70
);

console.log(`Found ${landingComponents.length} landing page components:`);
landingComponents.forEach((comp) => {
  console.log(`  - ${comp.displayName} (${comp.source})`);
});
console.log('');

// ============================================================================
// Example 5: Ranking by Relevance
// ============================================================================

console.log('='.repeat(80));
console.log('Example 5: Ranked Component Recommendations');
console.log('='.repeat(80));

const filters: ComponentFilters = {
  categories: ['forms', 'cards'],
  hasAnimations: true,
};

const ranked = rankByFilters(exampleComponents, filters, {
  preferAnimated: true,
  preferredSources: ['magic-ui', 'aceternity-ui'],
});

console.log('Top 5 recommended components:');
ranked.slice(0, 5).forEach((comp, index) => {
  const size = estimateComponentBundleSize(comp);
  console.log(`${index + 1}. ${comp.displayName}`);
  console.log(`   Source: ${comp.source}`);
  console.log(`   Category: ${comp.category}`);
  console.log(`   Animation: ${comp.animations?.complexity || 'none'}`);
  console.log(`   Bundle Size: ${size}KB`);
  console.log('');
});

// ============================================================================
// Example 6: Mobile-Optimized Components
// ============================================================================

console.log('='.repeat(80));
console.log('Example 6: Mobile-Optimized Component Selection');
console.log('='.repeat(80));

const mobileFilters = combineFilters(
  {
    maxBundleSize: 30,
    complexity: ['simple', 'medium'],
  },
  {
    frameworks: ['react'],
  }
);

const mobileComponents = filterComponents(exampleComponents, mobileFilters);
const rankedMobile = rankByFilters(mobileComponents, mobileFilters, {
  preferSimple: true,
});

console.log(`Found ${rankedMobile.length} mobile-optimized components:\n`);
rankedMobile.forEach((comp) => {
  const size = estimateComponentBundleSize(comp);
  const sizeCategory = getBundleSizeCategory(size);
  console.log(`  - ${comp.displayName} (${comp.source})`);
  console.log(`    Bundle: ${size}KB (${sizeCategory})`);
  console.log(`    Complexity: ${comp.animations?.complexity || 'static'}`);
  console.log('');
});

// ============================================================================
// Example 7: Performance Metrics
// ============================================================================

console.log('='.repeat(80));
console.log('Example 7: Filter Performance Benchmarking');
console.log('='.repeat(80));

const result = filterComponentsWithMetrics(
  exampleComponents,
  {
    categories: ['forms', 'cards'],
    hasAnimations: true,
    complexity: ['simple', 'medium'],
    sources: ['magic-ui', 'aceternity-ui'],
  },
  5
);

console.log('Performance Metrics:');
console.log(`  Total matches: ${result.totalMatches}`);
console.log(`  Returned: ${result.components.length}`);
console.log(`  Processing time: ${result.performanceMs.toFixed(2)}ms`);
console.log(`  Performance: ${result.performanceMs < 50 ? '✅ Excellent' : '⚠️ Needs optimization'}`);
console.log('');

console.log('Applied filters:');
Object.entries(result.appliedFilters).forEach(([key, value]) => {
  console.log(`  - ${key}: ${JSON.stringify(value)}`);
});
console.log('');

// ============================================================================
// Example 8: Complex Multi-Stage Filtering
// ============================================================================

console.log('='.repeat(80));
console.log('Example 8: Complex Multi-Stage Filtering Pipeline');
console.log('='.repeat(80));

// Stage 1: Get all animated components
const stage1 = filterComponents(exampleComponents, {
  hasAnimations: true,
});
console.log(`Stage 1 - Animated components: ${stage1.length}`);

// Stage 2: Filter by complexity
const stage2 = filterByComplexity(stage1, 'medium');
console.log(`Stage 2 - Up to medium complexity: ${stage2.length}`);

// Stage 3: Filter by animation type
const stage3 = filterByAnimation(stage2, {
  type: 'framer-motion',
});
console.log(`Stage 3 - Framer Motion only: ${stage3.length}`);

// Stage 4: Rank by preferences
const final = rankByFilters(stage3, { hasAnimations: true }, {
  preferredSources: ['magic-ui'],
});

console.log('\nFinal ranked results:');
final.forEach((comp, index) => {
  console.log(`${index + 1}. ${comp.displayName} (${comp.source})`);
});
console.log('');

// ============================================================================
// Example 9: Custom Filter with Business Logic
// ============================================================================

console.log('='.repeat(80));
console.log('Example 9: Custom Filter with Business Logic');
console.log('='.repeat(80));

const customFiltered = filterComponents(exampleComponents, {
  customFilter: (comp) => {
    // Business rule: Only components with 'shimmer' or '3d' in tags
    const hasSpecialTag = comp.tags.some((tag) =>
      tag.includes('shimmer') || tag.includes('3d')
    );

    // Must also be animated
    const isAnimated = !!comp.animations;

    // Bundle must be under 80KB
    const size = estimateComponentBundleSize(comp);
    const isLightweight = size < 80;

    return hasSpecialTag && isAnimated && isLightweight;
  },
});

console.log(`Found ${customFiltered.length} components matching custom business rules:`);
customFiltered.forEach((comp) => {
  const size = estimateComponentBundleSize(comp);
  console.log(`  - ${comp.displayName} (${comp.source})`);
  console.log(`    Tags: ${comp.tags.join(', ')}`);
  console.log(`    Bundle: ${size}KB`);
  console.log('');
});

// ============================================================================
// Example 10: Dashboard Component Discovery
// ============================================================================

console.log('='.repeat(80));
console.log('Example 10: Dashboard Component Discovery');
console.log('='.repeat(80));

const dashboardSuggestions = suggestFilters('data table and charts', 'dashboard');

const dashboardComponents = filterComponents(exampleComponents, {
  categories: ['data-display', 'charts'],
  sources: ['shadcn-ui', 'mui'],
  complexity: ['simple', 'medium'],
});

const rankedDashboard = rankByFilters(dashboardComponents, {
  categories: ['data-display'],
}, {
  preferSimple: true,
  preferredSources: ['mui'],
});

console.log(`Dashboard components (${rankedDashboard.length} total):\n`);
rankedDashboard.forEach((comp) => {
  const size = estimateComponentBundleSize(comp);
  console.log(`  - ${comp.displayName} (${comp.source})`);
  console.log(`    Category: ${comp.category}`);
  console.log(`    Bundle: ${size}KB`);
  console.log('');
});

// ============================================================================
// Summary Statistics
// ============================================================================

console.log('='.repeat(80));
console.log('Summary Statistics');
console.log('='.repeat(80));

const totalComponents = exampleComponents.length;
const animatedCount = exampleComponents.filter((c) => c.animations).length;
const simpleCount = exampleComponents.filter(
  (c) => !c.animations || c.animations.complexity === 'simple'
).length;

const avgBundleSize =
  exampleComponents.reduce((sum, c) => sum + estimateComponentBundleSize(c), 0) /
  totalComponents;

console.log(`Total components: ${totalComponents}`);
console.log(`Animated: ${animatedCount} (${((animatedCount / totalComponents) * 100).toFixed(1)}%)`);
console.log(`Simple: ${simpleCount} (${((simpleCount / totalComponents) * 100).toFixed(1)}%)`);
console.log(`Average bundle size: ${avgBundleSize.toFixed(1)}KB`);
console.log('');

// Sources breakdown
const sourceBreakdown = exampleComponents.reduce((acc, comp) => {
  acc[comp.source] = (acc[comp.source] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

console.log('Components by source:');
Object.entries(sourceBreakdown).forEach(([source, count]) => {
  console.log(`  - ${source}: ${count}`);
});
console.log('');

console.log('='.repeat(80));
console.log('All examples completed successfully! ✅');
console.log('='.repeat(80));

export { exampleComponents };
