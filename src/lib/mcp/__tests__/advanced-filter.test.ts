/**
 * Advanced Category Filtering System Tests
 *
 * Comprehensive test suite for multi-dimensional filtering, smart suggestions,
 * and performance benchmarking.
 */

import {
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
  type ComponentFilters,
  type FilterSuggestion,
} from '../advanced-filter';
import type { ComponentMetadata } from '../types';

// ============================================================================
// Test Data
// ============================================================================

const createTestComponent = (
  overrides: Partial<ComponentMetadata>
): ComponentMetadata => ({
  id: `test-${Math.random()}`,
  name: 'TestComponent',
  displayName: 'Test Component',
  description: 'A test component',
  category: 'other',
  tags: [],
  source: 'shadcn-ui',
  framework: 'react',
  ...overrides,
});

const mockComponents: ComponentMetadata[] = [
  // Simple buttons
  createTestComponent({
    id: 'btn-1',
    name: 'SimpleButton',
    category: 'forms',
    tags: ['button', 'simple'],
    source: 'shadcn-ui',
    framework: 'react',
    dependencies: ['react'],
  }),
  createTestComponent({
    id: 'btn-2',
    name: 'PrimaryButton',
    category: 'forms',
    tags: ['button', 'primary'],
    source: 'chakra-ui',
    framework: 'react',
    dependencies: ['react', '@chakra-ui/react'],
  }),

  // Animated buttons
  createTestComponent({
    id: 'btn-3',
    name: 'AnimatedButton',
    category: 'forms',
    tags: ['button', 'animated'],
    source: 'magic-ui',
    framework: 'react',
    dependencies: ['react', 'framer-motion'],
    animations: {
      type: 'framer-motion',
      complexity: 'simple',
    },
  }),
  createTestComponent({
    id: 'btn-4',
    name: 'ShimmerButton',
    category: 'forms',
    tags: ['button', 'shimmer', 'animated'],
    source: 'magic-ui',
    framework: 'react',
    dependencies: ['react', 'framer-motion'],
    animations: {
      type: 'framer-motion',
      complexity: 'medium',
    },
  }),

  // Cards
  createTestComponent({
    id: 'card-1',
    name: 'SimpleCard',
    category: 'cards',
    tags: ['card', 'simple'],
    source: 'shadcn-ui',
    framework: 'react',
  }),
  createTestComponent({
    id: 'card-2',
    name: 'AnimatedCard',
    category: 'cards',
    tags: ['card', 'animated'],
    source: 'aceternity-ui',
    framework: 'react',
    dependencies: ['react', 'framer-motion'],
    animations: {
      type: 'framer-motion',
      complexity: 'medium',
    },
  }),
  createTestComponent({
    id: 'card-3',
    name: '3DCard',
    category: 'cards',
    tags: ['card', '3d', 'animated'],
    source: 'aceternity-ui',
    framework: 'react',
    dependencies: ['react', 'framer-motion'],
    animations: {
      type: 'framer-motion',
      complexity: 'complex',
    },
  }),

  // Forms
  createTestComponent({
    id: 'form-1',
    name: 'LoginForm',
    category: 'forms',
    tags: ['form', 'login', 'authentication'],
    source: 'shadcn-ui',
    framework: 'react',
  }),
  createTestComponent({
    id: 'input-1',
    name: 'TextInput',
    category: 'inputs',
    tags: ['input', 'text'],
    source: 'shadcn-ui',
    framework: 'react',
  }),
  createTestComponent({
    id: 'input-2',
    name: 'DatePicker',
    category: 'inputs',
    tags: ['input', 'date', 'picker'],
    source: 'mui',
    framework: 'react',
    dependencies: ['react', '@mui/material'],
  }),

  // Navigation
  createTestComponent({
    id: 'nav-1',
    name: 'Sidebar',
    category: 'navigation',
    tags: ['navigation', 'sidebar', 'menu'],
    source: 'shadcn-ui',
    framework: 'react',
  }),
  createTestComponent({
    id: 'nav-2',
    name: 'Navbar',
    category: 'navigation',
    tags: ['navigation', 'navbar', 'header'],
    source: 'flowbite',
    framework: 'html',
  }),

  // Data display
  createTestComponent({
    id: 'table-1',
    name: 'DataTable',
    category: 'data-display',
    tags: ['table', 'data', 'grid'],
    source: 'shadcn-ui',
    framework: 'react',
  }),
  createTestComponent({
    id: 'chart-1',
    name: 'LineChart',
    category: 'charts',
    tags: ['chart', 'line', 'graph'],
    source: 'shadcn-ui',
    framework: 'react',
    dependencies: ['react', 'recharts'],
  }),

  // Marketing
  createTestComponent({
    id: 'hero-1',
    name: 'AnimatedHero',
    category: 'marketing',
    tags: ['hero', 'landing', 'animated'],
    source: 'magic-ui',
    framework: 'react',
    dependencies: ['react', 'framer-motion'],
    animations: {
      type: 'framer-motion',
      complexity: 'complex',
    },
  }),
];

// ============================================================================
// Basic Filtering Tests
// ============================================================================

describe('Advanced Filter System', () => {
  describe('filterComponents', () => {
    it('should filter by single category', () => {
      const result = filterComponents(mockComponents, {
        categories: ['forms'],
      });

      expect(result.length).toBeGreaterThan(0);
      result.forEach((comp) => {
        expect(comp.category).toBe('forms');
      });
    });

    it('should filter by multiple categories (OR logic)', () => {
      const result = filterComponents(mockComponents, {
        categories: ['forms', 'cards'],
      });

      expect(result.length).toBeGreaterThan(0);
      result.forEach((comp) => {
        expect(['forms', 'cards']).toContain(comp.category);
      });
    });

    it('should filter by framework', () => {
      const result = filterComponents(mockComponents, {
        frameworks: ['react'],
      });

      expect(result.length).toBeGreaterThan(0);
      result.forEach((comp) => {
        expect(comp.framework).toBe('react');
      });
    });

    it('should filter by source', () => {
      const result = filterComponents(mockComponents, {
        sources: ['shadcn-ui'],
      });

      expect(result.length).toBeGreaterThan(0);
      result.forEach((comp) => {
        expect(comp.source).toBe('shadcn-ui');
      });
    });

    it('should filter by multiple sources (OR logic)', () => {
      const result = filterComponents(mockComponents, {
        sources: ['magic-ui', 'aceternity-ui'],
      });

      expect(result.length).toBeGreaterThan(0);
      result.forEach((comp) => {
        expect(['magic-ui', 'aceternity-ui']).toContain(comp.source);
      });
    });

    it('should filter by animation presence', () => {
      const animated = filterComponents(mockComponents, {
        hasAnimations: true,
      });

      expect(animated.length).toBeGreaterThan(0);
      animated.forEach((comp) => {
        expect(comp.animations).toBeDefined();
      });

      const notAnimated = filterComponents(mockComponents, {
        hasAnimations: false,
      });

      expect(notAnimated.length).toBeGreaterThan(0);
      notAnimated.forEach((comp) => {
        expect(comp.animations).toBeUndefined();
      });
    });

    it('should filter by animation type', () => {
      const result = filterComponents(mockComponents, {
        animationType: 'framer-motion',
      });

      expect(result.length).toBeGreaterThan(0);
      result.forEach((comp) => {
        expect(comp.animations?.type).toBe('framer-motion');
      });
    });

    it('should filter by complexity levels', () => {
      const simple = filterComponents(mockComponents, {
        complexity: ['simple'],
      });

      simple.forEach((comp) => {
        if (comp.animations) {
          expect(comp.animations.complexity).toBe('simple');
        }
      });

      const simpleAndMedium = filterComponents(mockComponents, {
        complexity: ['simple', 'medium'],
      });

      simpleAndMedium.forEach((comp) => {
        if (comp.animations) {
          expect(['simple', 'medium']).toContain(comp.animations.complexity);
        }
      });
    });

    it('should filter by tags', () => {
      const result = filterComponents(mockComponents, {
        tags: ['button'],
      });

      expect(result.length).toBeGreaterThan(0);
      result.forEach((comp) => {
        expect(comp.tags.some((tag) => tag.includes('button'))).toBe(true);
      });
    });

    it('should combine multiple filters (AND logic between dimensions)', () => {
      const result = filterComponents(mockComponents, {
        categories: ['forms'],
        hasAnimations: true,
        complexity: ['simple', 'medium'],
      });

      result.forEach((comp) => {
        expect(comp.category).toBe('forms');
        expect(comp.animations).toBeDefined();
        expect(['simple', 'medium']).toContain(comp.animations!.complexity);
      });
    });

    it('should filter with custom filter function', () => {
      const result = filterComponents(mockComponents, {
        customFilter: (comp) => comp.name.includes('Shimmer'),
      });

      expect(result.length).toBeGreaterThan(0);
      result.forEach((comp) => {
        expect(comp.name).toContain('Shimmer');
      });
    });
  });

  // ============================================================================
  // Specialized Filter Tests
  // ============================================================================

  describe('filterByCategory', () => {
    it('should filter by category with strict match', () => {
      const result = filterByCategory(mockComponents, 'forms', true);

      expect(result.length).toBeGreaterThan(0);
      result.forEach((comp) => {
        expect(comp.category).toBe('forms');
      });
    });

    it('should filter by category with related categories (non-strict)', () => {
      const result = filterByCategory(mockComponents, 'forms', false);

      expect(result.length).toBeGreaterThan(0);
      // Should include both 'forms' and 'inputs'
      const categories = new Set(result.map((c) => c.category));
      expect(categories.has('forms') || categories.has('inputs')).toBe(true);
    });
  });

  describe('filterByComplexity', () => {
    it('should include only simple components when maxComplexity is simple', () => {
      const result = filterByComplexity(mockComponents, 'simple');

      result.forEach((comp) => {
        if (comp.animations) {
          expect(comp.animations.complexity).toBe('simple');
        }
      });
    });

    it('should include simple and medium when maxComplexity is medium', () => {
      const result = filterByComplexity(mockComponents, 'medium');

      result.forEach((comp) => {
        if (comp.animations) {
          expect(['simple', 'medium']).toContain(comp.animations.complexity);
        }
      });
    });

    it('should include all when maxComplexity is complex', () => {
      const result = filterByComplexity(mockComponents, 'complex');

      expect(result.length).toBe(mockComponents.length);
    });

    it('should include non-animated components at all complexity levels', () => {
      const nonAnimated = mockComponents.filter((c) => !c.animations);
      const result = filterByComplexity(mockComponents, 'simple');

      // All non-animated components should be included
      nonAnimated.forEach((comp) => {
        expect(result).toContain(comp);
      });
    });
  });

  describe('filterByAnimation', () => {
    it('should filter animated components only', () => {
      const result = filterByAnimation(mockComponents, {
        hasAnimation: true,
      });

      expect(result.length).toBeGreaterThan(0);
      result.forEach((comp) => {
        expect(comp.animations).toBeDefined();
      });
    });

    it('should filter by animation type', () => {
      const result = filterByAnimation(mockComponents, {
        type: 'framer-motion',
      });

      expect(result.length).toBeGreaterThan(0);
      result.forEach((comp) => {
        expect(comp.animations?.type).toBe('framer-motion');
      });
    });

    it('should filter by multiple animation types', () => {
      const result = filterByAnimation(mockComponents, {
        type: ['framer-motion', 'css'],
      });

      result.forEach((comp) => {
        expect(['framer-motion', 'css']).toContain(comp.animations!.type);
      });
    });

    it('should filter by maximum complexity', () => {
      const result = filterByAnimation(mockComponents, {
        hasAnimation: true,
        maxComplexity: 'simple',
      });

      result.forEach((comp) => {
        expect(comp.animations?.complexity).toBe('simple');
      });
    });

    it('should combine all animation filters', () => {
      const result = filterByAnimation(mockComponents, {
        hasAnimation: true,
        type: 'framer-motion',
        maxComplexity: 'medium',
      });

      result.forEach((comp) => {
        expect(comp.animations).toBeDefined();
        expect(comp.animations!.type).toBe('framer-motion');
        expect(['simple', 'medium']).toContain(comp.animations!.complexity);
      });
    });
  });

  describe('filterByFramework', () => {
    it('should filter React components', () => {
      const result = filterByFramework(mockComponents, 'react');

      expect(result.length).toBeGreaterThan(0);
      result.forEach((comp) => {
        expect(comp.framework).toBe('react');
      });
    });

    it('should filter HTML components', () => {
      const result = filterByFramework(mockComponents, 'html');

      expect(result.length).toBeGreaterThan(0);
      result.forEach((comp) => {
        expect(comp.framework).toBe('html');
      });
    });
  });

  // ============================================================================
  // Smart Filter Suggestion Tests
  // ============================================================================

  describe('suggestFilters', () => {
    it('should suggest hasAnimations:true for "animated" query', () => {
      const suggestions = suggestFilters('animated button');

      const animationSuggestion = suggestions.find(
        (s) => s.dimension === 'hasAnimations'
      );

      expect(animationSuggestion).toBeDefined();
      expect(animationSuggestion!.value).toBe(true);
      expect(animationSuggestion!.confidence).toBeGreaterThan(0.7);
    });

    it('should suggest categories for "button" query', () => {
      const suggestions = suggestFilters('button');

      const categorySuggestion = suggestions.find(
        (s) => s.dimension === 'categories'
      );

      expect(categorySuggestion).toBeDefined();
      expect(categorySuggestion!.confidence).toBeGreaterThan(0.7);
    });

    it('should suggest sources for "shadcn" query', () => {
      const suggestions = suggestFilters('shadcn button');

      const sourceSuggestion = suggestions.find(
        (s) => s.dimension === 'sources'
      );

      expect(sourceSuggestion).toBeDefined();
      expect((sourceSuggestion!.value as string[]).includes('shadcn-ui')).toBe(
        true
      );
    });

    it('should suggest complexity for "simple" query', () => {
      const suggestions = suggestFilters('simple card');

      const complexitySuggestion = suggestions.find(
        (s) => s.dimension === 'complexity'
      );

      expect(complexitySuggestion).toBeDefined();
      expect((complexitySuggestion!.value as string[]).includes('simple')).toBe(
        true
      );
    });

    it('should suggest multiple dimensions for complex queries', () => {
      const suggestions = suggestFilters('animated shadcn button');

      expect(suggestions.length).toBeGreaterThan(2);

      const dimensions = suggestions.map((s) => s.dimension);
      expect(dimensions).toContain('hasAnimations');
      expect(dimensions).toContain('sources');
    });

    it('should handle 3d components with high complexity', () => {
      const suggestions = suggestFilters('3d card');

      const complexitySuggestion = suggestions.find(
        (s) => s.dimension === 'complexity'
      );

      expect(complexitySuggestion).toBeDefined();
      expect((complexitySuggestion!.value as string[]).includes('complex')).toBe(
        true
      );
    });

    it('should suggest bundle size limits for "lightweight" query', () => {
      const suggestions = suggestFilters('lightweight button');

      const bundleSuggestion = suggestions.find(
        (s) => s.dimension === 'maxBundleSize'
      );

      expect(bundleSuggestion).toBeDefined();
      expect(bundleSuggestion!.value).toBeLessThanOrEqual(30);
    });

    it('should generate intent-based suggestions', () => {
      const suggestions = suggestFilters('card', 'landing-page');

      expect(suggestions.length).toBeGreaterThan(0);

      // Should include landing-page specific suggestions
      const intentSuggestions = suggestions.filter(
        (s) => s.reasoning.includes('intent')
      );
      expect(intentSuggestions.length).toBeGreaterThan(0);
    });
  });

  describe('applyFilterSuggestions', () => {
    it('should apply high-confidence suggestions', () => {
      const suggestions: FilterSuggestion[] = [
        {
          dimension: 'categories',
          value: ['forms'],
          reasoning: 'Detected "button"',
          confidence: 0.90,
        },
        {
          dimension: 'hasAnimations',
          value: true,
          reasoning: 'Detected "animated"',
          confidence: 0.95,
        },
      ];

      const result = applyFilterSuggestions(
        mockComponents,
        suggestions,
        0.7
      );

      expect(result.length).toBeGreaterThan(0);
      result.forEach((comp) => {
        expect(comp.category).toBe('forms');
        expect(comp.animations).toBeDefined();
      });
    });

    it('should ignore low-confidence suggestions', () => {
      const suggestions: FilterSuggestion[] = [
        {
          dimension: 'categories',
          value: ['forms'],
          reasoning: 'Low confidence guess',
          confidence: 0.50, // Below threshold
        },
      ];

      const result = applyFilterSuggestions(
        mockComponents,
        suggestions,
        0.7
      );

      // Should return all components (no filter applied)
      expect(result.length).toBe(mockComponents.length);
    });
  });

  // ============================================================================
  // Ranking Tests
  // ============================================================================

  describe('rankByFilters', () => {
    it('should rank components by relevance to filters', () => {
      const filters: ComponentFilters = {
        categories: ['forms'],
        hasAnimations: true,
      };

      const ranked = rankByFilters(mockComponents, filters);

      // Animated form components should be ranked higher
      expect(ranked[0].category).toBe('forms');
      expect(ranked[0].animations).toBeDefined();
    });

    it('should respect user preferences for animated components', () => {
      const filters: ComponentFilters = {
        categories: ['cards'],
      };

      const ranked = rankByFilters(mockComponents, filters, {
        preferAnimated: true,
      });

      // First card should be animated
      expect(ranked[0].animations).toBeDefined();
    });

    it('should respect user preferences for simple components', () => {
      const filters: ComponentFilters = {
        categories: ['forms'],
      };

      const ranked = rankByFilters(mockComponents, filters, {
        preferSimple: true,
      });

      // First component should be non-animated or simple
      if (ranked[0].animations) {
        expect(ranked[0].animations.complexity).toBe('simple');
      }
    });

    it('should rank preferred sources higher', () => {
      const filters: ComponentFilters = {
        categories: ['forms'],
      };

      const ranked = rankByFilters(mockComponents, filters, {
        preferredSources: ['shadcn-ui'],
      });

      // Shadcn components should be ranked higher
      const firstFew = ranked.slice(0, 3);
      const shadcnCount = firstFew.filter((c) => c.source === 'shadcn-ui').length;
      expect(shadcnCount).toBeGreaterThan(0);
    });
  });

  // ============================================================================
  // Helper Function Tests
  // ============================================================================

  describe('estimateComponentBundleSize', () => {
    it('should estimate small bundle for simple components', () => {
      const component = createTestComponent({
        source: 'shadcn-ui',
        dependencies: ['react'],
      });

      const size = estimateComponentBundleSize(component);

      expect(size).toBeLessThan(20);
    });

    it('should estimate larger bundle for components with heavy dependencies', () => {
      const component = createTestComponent({
        source: 'mui',
        dependencies: ['react', '@mui/material'],
      });

      const size = estimateComponentBundleSize(component);

      expect(size).toBeGreaterThan(50);
    });

    it('should add overhead for animated components', () => {
      const simple = createTestComponent({
        source: 'shadcn-ui',
        dependencies: ['react'],
      });

      const animated = createTestComponent({
        source: 'magic-ui',
        dependencies: ['react', 'framer-motion'],
        animations: {
          type: 'framer-motion',
          complexity: 'complex',
        },
      });

      const simpleSize = estimateComponentBundleSize(simple);
      const animatedSize = estimateComponentBundleSize(animated);

      expect(animatedSize).toBeGreaterThan(simpleSize);
    });
  });

  describe('getBundleSizeCategory', () => {
    it('should categorize small bundles', () => {
      expect(getBundleSizeCategory(15)).toBe('small');
    });

    it('should categorize medium bundles', () => {
      expect(getBundleSizeCategory(35)).toBe('medium');
    });

    it('should categorize large bundles', () => {
      expect(getBundleSizeCategory(100)).toBe('large');
    });
  });

  describe('combineFilters', () => {
    it('should combine category arrays', () => {
      const filter1: ComponentFilters = { categories: ['forms'] };
      const filter2: ComponentFilters = { categories: ['cards'] };

      const combined = combineFilters(filter1, filter2);

      expect(combined.categories).toEqual(['forms', 'cards']);
    });

    it('should merge unique values only', () => {
      const filter1: ComponentFilters = { categories: ['forms'] };
      const filter2: ComponentFilters = { categories: ['forms', 'cards'] };

      const combined = combineFilters(filter1, filter2);

      expect(combined.categories).toEqual(['forms', 'cards']);
    });

    it('should combine custom filters with AND logic', () => {
      const filter1: ComponentFilters = {
        customFilter: (comp) => comp.name.includes('Button'),
      };
      const filter2: ComponentFilters = {
        customFilter: (comp) => comp.tags.includes('animated'),
      };

      const combined = combineFilters(filter1, filter2);

      const testComp = createTestComponent({
        name: 'AnimatedButton',
        tags: ['animated'],
      });

      expect(combined.customFilter!(testComp)).toBe(true);
    });

    it('should use minimum maxBundleSize', () => {
      const filter1: ComponentFilters = { maxBundleSize: 50 };
      const filter2: ComponentFilters = { maxBundleSize: 30 };

      const combined = combineFilters(filter1, filter2);

      expect(combined.maxBundleSize).toBe(30);
    });
  });

  // ============================================================================
  // Performance Tests
  // ============================================================================

  describe('Performance', () => {
    it('should filter 200+ components in under 50ms', () => {
      // Generate large dataset
      const largeDataset: ComponentMetadata[] = [];
      for (let i = 0; i < 250; i++) {
        largeDataset.push(
          createTestComponent({
            id: `perf-test-${i}`,
            name: `Component${i}`,
            category: i % 2 === 0 ? 'forms' : 'cards',
            source: i % 3 === 0 ? 'shadcn-ui' : 'magic-ui',
          })
        );
      }

      const startTime = performance.now();

      const result = filterComponents(largeDataset, {
        categories: ['forms'],
        sources: ['shadcn-ui'],
      });

      const endTime = performance.now();
      const duration = endTime - startTime;

      expect(duration).toBeLessThan(50);
      expect(result.length).toBeGreaterThan(0);
    });

    it('should return performance metrics', () => {
      const result = filterComponentsWithMetrics(mockComponents, {
        categories: ['forms'],
      });

      expect(result.performanceMs).toBeDefined();
      expect(result.performanceMs).toBeGreaterThanOrEqual(0);
      expect(result.totalMatches).toBe(result.components.length);
      expect(result.appliedFilters).toBeDefined();
    });

    it('should handle limit parameter efficiently', () => {
      const result = filterComponentsWithMetrics(
        mockComponents,
        { categories: ['forms'] },
        2
      );

      expect(result.components.length).toBe(2);
      expect(result.totalMatches).toBeGreaterThanOrEqual(2);
    });
  });

  // ============================================================================
  // Integration Tests
  // ============================================================================

  describe('Integration: Complete Filtering Workflow', () => {
    it('should handle complete workflow from query to ranked results', () => {
      // 1. Get filter suggestions
      const suggestions = suggestFilters('animated button', 'landing-page');

      expect(suggestions.length).toBeGreaterThan(0);

      // 2. Apply suggestions
      const filtered = applyFilterSuggestions(mockComponents, suggestions, 0.7);

      expect(filtered.length).toBeGreaterThan(0);

      // 3. Rank results
      const ranked = rankByFilters(filtered, { hasAnimations: true });

      expect(ranked.length).toBeGreaterThan(0);
      expect(ranked[0].animations).toBeDefined();
    });

    it('should filter for mobile-optimized components', () => {
      const suggestions = suggestFilters('button for mobile app', 'mobile');

      const filters = combineFilters(
        { maxBundleSize: 30 },
        { complexity: ['simple', 'medium'] }
      );

      const result = filterComponents(mockComponents, filters);

      result.forEach((comp) => {
        const size = estimateComponentBundleSize(comp);
        expect(size).toBeLessThanOrEqual(30);
      });
    });

    it('should find shimmer components with all metadata', () => {
      const result = filterComponents(mockComponents, {
        tags: ['shimmer'],
        hasAnimations: true,
      });

      expect(result.length).toBeGreaterThan(0);
      result.forEach((comp) => {
        expect(comp.tags).toContain('shimmer');
        expect(comp.animations).toBeDefined();
      });
    });

    it('should exclude complex animations for simple use case', () => {
      const result = filterComponents(mockComponents, {
        categories: ['cards'],
        complexity: ['simple', 'medium'],
      });

      result.forEach((comp) => {
        if (comp.animations) {
          expect(comp.animations.complexity).not.toBe('complex');
        }
      });
    });

    it('should filter dashboard components', () => {
      const suggestions = suggestFilters('dashboard', 'dashboard');

      const filters: ComponentFilters = {
        categories: ['data-display', 'charts'],
        complexity: ['simple', 'medium'],
      };

      const result = filterComponents(mockComponents, filters);

      expect(result.length).toBeGreaterThan(0);
    });
  });
});
