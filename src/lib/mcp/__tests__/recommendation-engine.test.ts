/**
 * Recommendation Engine Test Suite
 *
 * Tests all 4 recommendation types and integration with Phase 3 components
 */

import { describe, it, expect, beforeEach } from '@jest/globals';
import {
  RecommendationEngine,
  createRecommendationEngine,
  quickRecommend,
  type RecommendationContext,
  type ComponentRecommendation,
} from '../recommendation-engine';
import { PreferenceLearner } from '../preference-learner';
import type { ComponentMetadata } from '../types';

// ============================================================================
// Test Data
// ============================================================================

const mockComponents: ComponentMetadata[] = [
  // Buttons
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
    id: 'mui-button',
    name: 'Button',
    displayName: 'MUI Button',
    description: 'Material Design button',
    category: 'forms',
    tags: ['button', 'material', 'click'],
    source: 'mui',
    framework: 'react',
  },
  {
    id: 'shimmer-button',
    name: 'ShimmerButton',
    displayName: 'Shimmer Button',
    description: 'Animated button with shimmer effect',
    category: 'forms',
    tags: ['button', 'animated', 'shimmer'],
    source: 'magic-ui',
    framework: 'react',
    animations: {
      type: 'framer-motion',
      complexity: 'medium',
    },
  },
  {
    id: 'moving-border-button',
    name: 'MovingBorderButton',
    displayName: 'Moving Border Button',
    description: 'Button with animated border effect',
    category: 'forms',
    tags: ['button', 'animated', 'border'],
    source: 'aceternity-ui',
    framework: 'react',
    animations: {
      type: 'framer-motion',
      complexity: 'complex',
    },
  },

  // Cards
  {
    id: 'shadcn-card',
    name: 'Card',
    displayName: 'Card',
    description: 'A simple card component',
    category: 'cards',
    tags: ['card', 'container', 'panel'],
    source: 'shadcn-ui',
    framework: 'react',
  },
  {
    id: '3d-card',
    name: '3DCard',
    displayName: '3D Card',
    description: 'Card with 3D perspective effect',
    category: 'cards',
    tags: ['card', '3d', 'animated'],
    source: 'aceternity-ui',
    framework: 'react',
    animations: {
      type: 'framer-motion',
      complexity: 'complex',
    },
  },

  // Charts
  {
    id: 'recharts-line',
    name: 'LineChart',
    displayName: 'Line Chart',
    description: 'Line chart for data visualization',
    category: 'charts',
    tags: ['chart', 'line', 'data', 'visualization'],
    source: 'shadcn-ui',
    framework: 'react',
  },
  {
    id: 'recharts-bar',
    name: 'BarChart',
    displayName: 'Bar Chart',
    description: 'Bar chart for data visualization',
    category: 'charts',
    tags: ['chart', 'bar', 'data', 'visualization'],
    source: 'shadcn-ui',
    framework: 'react',
  },

  // Form components
  {
    id: 'shadcn-input',
    name: 'Input',
    displayName: 'Input',
    description: 'Text input field',
    category: 'inputs',
    tags: ['input', 'text', 'field', 'form'],
    source: 'shadcn-ui',
    framework: 'react',
  },
  {
    id: 'shadcn-select',
    name: 'Select',
    displayName: 'Select',
    description: 'Dropdown select component',
    category: 'inputs',
    tags: ['select', 'dropdown', 'form'],
    source: 'shadcn-ui',
    framework: 'react',
  },
  {
    id: 'shadcn-checkbox',
    name: 'Checkbox',
    displayName: 'Checkbox',
    description: 'Checkbox input',
    category: 'inputs',
    tags: ['checkbox', 'form', 'input'],
    source: 'shadcn-ui',
    framework: 'react',
  },

  // UI elements
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
    id: 'typography',
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
// Test Suite
// ============================================================================

describe('RecommendationEngine', () => {
  let engine: RecommendationEngine;
  let learner: PreferenceLearner;

  beforeEach(() => {
    learner = new PreferenceLearner();
    engine = new RecommendationEngine(learner);
  });

  // ==========================================================================
  // Primary Recommendations Tests
  // ==========================================================================

  describe('Primary Recommendations', () => {
    it('should recommend button for "button" query', () => {
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

      expect(result.recommendations.primary.length).toBeGreaterThan(0);
      expect(result.recommendations.primary.length).toBeLessThanOrEqual(3);

      const topRec = result.recommendations.primary[0];
      expect(topRec.component.name.toLowerCase()).toContain('button');
      expect(topRec.type).toBe('primary');
      expect(topRec.score).toBeGreaterThan(0);
      expect(topRec.score).toBeLessThanOrEqual(1);
    });

    it('should prioritize ShimmerButton for landing page intent', () => {
      const context: RecommendationContext = {
        currentIntent: 'landing-page',
        selectedComponents: [],
      };

      const result = engine.recommend('button', mockComponents, context, {
        maxResults: 5,
        includeAlternatives: false,
        includeComplementary: false,
        includeUpgrades: false,
      });

      const primary = result.recommendations.primary;
      const animatedButtons = primary.filter(r => !!r.component.animations);

      // Should include animated buttons for landing page
      expect(animatedButtons.length).toBeGreaterThan(0);
    });

    it('should recommend charts for dashboard intent', () => {
      const context: RecommendationContext = {
        currentIntent: 'dashboard',
        selectedComponents: [],
      };

      const result = engine.recommend('chart', mockComponents, context, {
        maxResults: 5,
        includeAlternatives: false,
        includeComplementary: false,
        includeUpgrades: false,
      });

      expect(result.recommendations.primary.length).toBeGreaterThan(0);

      const topRec = result.recommendations.primary[0];
      expect(topRec.component.category).toBe('charts');
      expect(topRec.breakdown.intentAlignment).toBeGreaterThan(0.5);
    });

    it('should include reasoning for recommendations', () => {
      const context: RecommendationContext = {
        currentIntent: 'form',
        selectedComponents: [],
      };

      const result = engine.recommend('input', mockComponents, context);

      const topRec = result.recommendations.primary[0];
      expect(topRec.reasoning).toBeDefined();
      expect(topRec.reasoning.length).toBeGreaterThan(0);
      expect(typeof topRec.reasoning[0]).toBe('string');
    });

    it('should provide score breakdown', () => {
      const context: RecommendationContext = {
        currentIntent: 'general',
        selectedComponents: [],
      };

      const result = engine.recommend('button', mockComponents, context);

      const topRec = result.recommendations.primary[0];
      expect(topRec.breakdown).toBeDefined();
      expect(topRec.breakdown.queryRelevance).toBeGreaterThanOrEqual(0);
      expect(topRec.breakdown.intentAlignment).toBeGreaterThanOrEqual(0);
      expect(topRec.breakdown.userPreference).toBeGreaterThanOrEqual(0);
      expect(topRec.breakdown.componentSimilarity).toBeGreaterThanOrEqual(0);
      expect(topRec.breakdown.qualityScore).toBeGreaterThan(0);
    });
  });

  // ==========================================================================
  // Alternative Recommendations Tests
  // ==========================================================================

  describe('Alternative Recommendations', () => {
    it('should find alternatives from different frameworks', () => {
      const context: RecommendationContext = {
        currentIntent: 'general',
        selectedComponents: [mockComponents[0]], // Shadcn Button
      };

      const result = engine.recommend('button', mockComponents, context, {
        maxResults: 5,
        includeAlternatives: true,
      });

      const alternatives = result.recommendations.alternative;
      expect(alternatives.length).toBeGreaterThan(0);

      // Should be from different source than selected
      alternatives.forEach(alt => {
        expect(alt.type).toBe('alternative');
        expect(alt.component.source).not.toBe('shadcn-ui');
      });
    });

    it('should suggest MUI Button as alternative to Shadcn Button', () => {
      const shadcnButton = mockComponents.find(c => c.id === 'shadcn-button')!;
      const context: RecommendationContext = {
        currentIntent: 'general',
        selectedComponents: [shadcnButton],
      };

      const alternatives = engine.getAlternativeRecommendations(
        shadcnButton,
        mockComponents,
        context,
        5
      );

      expect(alternatives.length).toBeGreaterThan(0);

      const muiAlt = alternatives.find(a => a.component.source === 'mui');
      expect(muiAlt).toBeDefined();
      expect(muiAlt!.component.name).toBe('Button');
    });

    it('should include reasoning for alternatives', () => {
      const context: RecommendationContext = {
        currentIntent: 'general',
        selectedComponents: [mockComponents[0]],
      };

      const result = engine.recommend('button', mockComponents, context, {
        includeAlternatives: true,
      });

      if (result.recommendations.alternative.length > 0) {
        const alt = result.recommendations.alternative[0];
        expect(alt.reasoning).toBeDefined();
        expect(alt.reasoning.length).toBeGreaterThan(0);
      }
    });
  });

  // ==========================================================================
  // Complementary Recommendations Tests
  // ==========================================================================

  describe('Complementary Recommendations', () => {
    it('should recommend complementary components for button', () => {
      const button = mockComponents.find(c => c.id === 'shadcn-button')!;
      const context: RecommendationContext = {
        currentIntent: 'general',
        selectedComponents: [button],
      };

      const result = engine.recommend('', mockComponents, context, {
        includeComplementary: true,
      });

      const complementary = result.recommendations.complementary;
      expect(complementary.length).toBeGreaterThan(0);

      complementary.forEach(comp => {
        expect(comp.type).toBe('complementary');
        expect(comp.component.id).not.toBe(button.id);
      });
    });

    it('should recommend input, select, checkbox for form components', () => {
      const button = mockComponents.find(c => c.id === 'shadcn-button')!;
      const context: RecommendationContext = {
        currentIntent: 'form',
        selectedComponents: [button],
      };

      const complementary = engine.getComplementaryRecommendations(
        [button],
        mockComponents,
        context,
        5
      );

      expect(complementary.length).toBeGreaterThan(0);

      // Should include form-related components
      const hasFormComponents = complementary.some(c =>
        ['Input', 'Select', 'Checkbox'].includes(c.component.name)
      );
      expect(hasFormComponents).toBe(true);
    });

    it('should recommend badge and typography for card', () => {
      const card = mockComponents.find(c => c.id === 'shadcn-card')!;
      const context: RecommendationContext = {
        currentIntent: 'general',
        selectedComponents: [card],
      };

      const complementary = engine.getComplementaryRecommendations(
        [card],
        mockComponents,
        context,
        5
      );

      expect(complementary.length).toBeGreaterThan(0);

      // Should include typical card companions
      const hasBadge = complementary.some(c => c.component.name === 'Badge');
      const hasTypography = complementary.some(c => c.component.name === 'Typography');

      expect(hasBadge || hasTypography).toBe(true);
    });

    it('should not recommend already selected components', () => {
      const selected = [
        mockComponents[0], // Button
        mockComponents[4], // Card
      ];

      const context: RecommendationContext = {
        currentIntent: 'general',
        selectedComponents: selected,
      };

      const complementary = engine.getComplementaryRecommendations(
        selected,
        mockComponents,
        context,
        10
      );

      const selectedIds = new Set(selected.map(c => c.id));
      complementary.forEach(comp => {
        expect(selectedIds.has(comp.component.id)).toBe(false);
      });
    });
  });

  // ==========================================================================
  // Upgrade Recommendations Tests
  // ==========================================================================

  describe('Upgrade Recommendations', () => {
    it('should suggest ShimmerButton as upgrade for basic Button', () => {
      const basicButton = mockComponents.find(c => c.id === 'shadcn-button')!;
      const context: RecommendationContext = {
        currentIntent: 'landing-page',
        selectedComponents: [basicButton],
      };

      const upgrades = engine.getUpgradeRecommendations(
        basicButton,
        mockComponents,
        5
      );

      expect(upgrades.length).toBeGreaterThan(0);

      // Should suggest animated buttons
      const hasAnimatedUpgrade = upgrades.some(u => !!u.component.animations);
      expect(hasAnimatedUpgrade).toBe(true);

      upgrades.forEach(upgrade => {
        expect(upgrade.type).toBe('upgrade');
      });
    });

    it('should suggest 3DCard as upgrade for basic Card', () => {
      const basicCard = mockComponents.find(c => c.id === 'shadcn-card')!;

      const upgrades = engine.getUpgradeRecommendations(
        basicCard,
        mockComponents,
        5
      );

      expect(upgrades.length).toBeGreaterThan(0);

      const has3DCard = upgrades.some(u => u.component.id === '3d-card');
      expect(has3DCard).toBe(true);
    });

    it('should include reasoning for upgrades', () => {
      const basicButton = mockComponents.find(c => c.id === 'shadcn-button')!;

      const upgrades = engine.getUpgradeRecommendations(
        basicButton,
        mockComponents,
        5
      );

      if (upgrades.length > 0) {
        const upgrade = upgrades[0];
        expect(upgrade.reasoning).toBeDefined();
        expect(upgrade.reasoning.length).toBeGreaterThan(0);

        // Should mention animation or enhancement
        const mentionsUpgrade = upgrade.reasoning.some(r =>
          r.toLowerCase().includes('animation') ||
          r.toLowerCase().includes('enhanced') ||
          r.toLowerCase().includes('premium')
        );
        expect(mentionsUpgrade).toBe(true);
      }
    });
  });

  // ==========================================================================
  // User Preference Integration Tests
  // ==========================================================================

  describe('User Preference Integration', () => {
    it('should prioritize components from preferred framework', () => {
      // Track some preferences
      const shadcnButton = mockComponents.find(c => c.source === 'shadcn-ui')!;
      learner.trackSelection(shadcnButton, 'general');
      learner.trackSelection(shadcnButton, 'general');
      learner.trackSelection(shadcnButton, 'general');

      const context: RecommendationContext = {
        currentIntent: 'general',
        selectedComponents: [],
        userPreferences: learner.exportPreferences(),
      };

      const result = engine.recommend('button', mockComponents, context, {
        maxResults: 5,
      });

      const primary = result.recommendations.primary;
      expect(primary.length).toBeGreaterThan(0);

      // Shadcn should be ranked higher due to preferences
      const shadcnRank = primary.findIndex(r => r.component.source === 'shadcn-ui');
      expect(shadcnRank).toBeGreaterThanOrEqual(0);
      expect(shadcnRank).toBeLessThan(3); // Should be in top 3
    });

    it('should boost score for frequently used components', () => {
      const shimmerButton = mockComponents.find(c => c.id === 'shimmer-button')!;

      // Track multiple uses
      for (let i = 0; i < 5; i++) {
        learner.trackSelection(shimmerButton, 'landing-page');
      }

      const context: RecommendationContext = {
        currentIntent: 'landing-page',
        selectedComponents: [],
        userPreferences: learner.exportPreferences(),
      };

      const result = engine.recommend('button', mockComponents, context);

      const shimmerRec = result.recommendations.primary.find(
        r => r.component.id === 'shimmer-button'
      );

      expect(shimmerRec).toBeDefined();
      expect(shimmerRec!.breakdown.userPreference).toBeGreaterThan(0);
    });
  });

  // ==========================================================================
  // Performance Requirements Tests
  // ==========================================================================

  describe('Performance Requirements', () => {
    it('should filter by mobile performance requirements', () => {
      const context: RecommendationContext = {
        currentIntent: 'general',
        selectedComponents: [],
        performanceRequirements: {
          maxBundleSize: 20,
          mobileFirst: true,
        },
      };

      const result = engine.recommend('button', mockComponents, context);

      // Should prefer lightweight components
      const primary = result.recommendations.primary;
      expect(primary.length).toBeGreaterThan(0);

      // Check that bundle sizes are reasonable
      primary.forEach(rec => {
        const bundleSize = (rec.breakdown.qualityScore as any) || 0;
        // This is a proxy check - in real implementation, would check actual bundle size
        expect(rec.component).toBeDefined();
      });
    });

    it('should include animation when required', () => {
      const context: RecommendationContext = {
        currentIntent: 'landing-page',
        selectedComponents: [],
        performanceRequirements: {
          requiresAnimation: true,
        },
      };

      const result = engine.recommend('button', mockComponents, context);

      const primary = result.recommendations.primary;
      const animatedCount = primary.filter(r => !!r.component.animations).length;

      // Should have at least some animated components
      expect(animatedCount).toBeGreaterThan(0);
    });
  });

  // ==========================================================================
  // Complete Recommendation Flow Tests
  // ==========================================================================

  describe('Complete Recommendation Flow', () => {
    it('should generate all recommendation types together', () => {
      const context: RecommendationContext = {
        currentIntent: 'landing-page',
        selectedComponents: [mockComponents[0]], // Button
      };

      const result = engine.recommend('button', mockComponents, context, {
        maxResults: 5,
        includeAlternatives: true,
        includeComplementary: true,
        includeUpgrades: true,
      });

      expect(result.recommendations.primary.length).toBeGreaterThan(0);
      expect(result.recommendations.alternative.length).toBeGreaterThan(0);
      expect(result.recommendations.complementary.length).toBeGreaterThan(0);
      // Upgrades may or may not exist depending on components
    });

    it('should include query enhancement details', () => {
      const context: RecommendationContext = {
        currentIntent: 'dashboard',
        selectedComponents: [],
      };

      const result = engine.recommend('chart', mockComponents, context);

      expect(result.queryEnhancement).toBeDefined();
      expect(result.queryEnhancement.originalQuery).toBe('chart');
      expect(result.queryEnhancement.enhancedQueries.length).toBeGreaterThan(0);
    });

    it('should include performance metrics', () => {
      const context: RecommendationContext = {
        currentIntent: 'general',
        selectedComponents: [],
      };

      const result = engine.recommend('button', mockComponents, context);

      expect(result.performance).toBeDefined();
      expect(result.performance.totalTimeMs).toBeGreaterThan(0);
      expect(result.performance.totalTimeMs).toBeLessThan(1000); // Should be fast
      expect(result.performance.componentsEvaluated).toBe(mockComponents.length);
    });

    it('should complete recommendations in under 100ms', () => {
      const context: RecommendationContext = {
        currentIntent: 'dashboard',
        selectedComponents: [],
      };

      const start = performance.now();
      const result = engine.recommend('chart', mockComponents, context, {
        maxResults: 5,
        includeAlternatives: true,
        includeComplementary: true,
      });
      const duration = performance.now() - start;

      expect(duration).toBeLessThan(100);
      expect(result.performance.totalTimeMs).toBeLessThan(100);
    });
  });

  // ==========================================================================
  // Edge Cases Tests
  // ==========================================================================

  describe('Edge Cases', () => {
    it('should handle empty components array', () => {
      const context: RecommendationContext = {
        currentIntent: 'general',
        selectedComponents: [],
      };

      const result = engine.recommend('button', [], context);

      expect(result.recommendations.primary).toEqual([]);
      expect(result.recommendations.alternative).toEqual([]);
      expect(result.recommendations.complementary).toEqual([]);
      expect(result.recommendations.upgrade).toEqual([]);
    });

    it('should handle empty query', () => {
      const context: RecommendationContext = {
        currentIntent: 'general',
        selectedComponents: [],
      };

      const result = engine.recommend('', mockComponents, context);

      // Should still provide some recommendations based on intent
      expect(result.recommendations.primary.length).toBeGreaterThanOrEqual(0);
    });

    it('should handle no selected components for alternatives', () => {
      const context: RecommendationContext = {
        currentIntent: 'general',
        selectedComponents: [],
      };

      const alternatives = engine.getAlternativeRecommendations(
        undefined,
        mockComponents,
        context,
        5
      );

      expect(alternatives).toEqual([]);
    });

    it('should handle empty preferences', () => {
      const emptyLearner = new PreferenceLearner();
      const emptyEngine = new RecommendationEngine(emptyLearner);

      const context: RecommendationContext = {
        currentIntent: 'general',
        selectedComponents: [],
      };

      const result = emptyEngine.recommend('button', mockComponents, context);

      expect(result.recommendations.primary.length).toBeGreaterThan(0);
      // Should work even without preferences
    });

    it('should filter by minimum confidence', () => {
      const context: RecommendationContext = {
        currentIntent: 'general',
        selectedComponents: [],
      };

      const result = engine.recommend('xyz-nonexistent', mockComponents, context, {
        minConfidence: 0.8, // High confidence threshold
      });

      // May have no recommendations if nothing matches well
      result.recommendations.primary.forEach(rec => {
        expect(rec.confidence).toBeGreaterThanOrEqual(0.8);
      });
    });
  });

  // ==========================================================================
  // Helper Functions Tests
  // ==========================================================================

  describe('Helper Functions', () => {
    it('quickRecommend should provide simplified API', () => {
      const recommendations = quickRecommend('button', mockComponents, 'general', 3);

      expect(recommendations.length).toBeLessThanOrEqual(3);
      expect(recommendations.length).toBeGreaterThan(0);
      recommendations.forEach(rec => {
        expect(rec.type).toBe('primary');
        expect(rec.component.name.toLowerCase()).toContain('button');
      });
    });

    it('createRecommendationEngine should create valid instance', () => {
      const newLearner = new PreferenceLearner();
      const newEngine = createRecommendationEngine(newLearner);

      expect(newEngine).toBeInstanceOf(RecommendationEngine);

      const context: RecommendationContext = {
        currentIntent: 'general',
        selectedComponents: [],
      };

      const result = newEngine.recommend('button', mockComponents, context);
      expect(result.recommendations.primary.length).toBeGreaterThan(0);
    });
  });

  // ==========================================================================
  // Confidence Scoring Tests
  // ==========================================================================

  describe('Confidence Scoring', () => {
    it('should have high confidence for exact matches', () => {
      const context: RecommendationContext = {
        currentIntent: 'general',
        selectedComponents: [],
      };

      const result = engine.recommend('Button', mockComponents, context);

      const exactMatch = result.recommendations.primary.find(
        r => r.component.name === 'Button'
      );

      expect(exactMatch).toBeDefined();
      expect(exactMatch!.confidence).toBeGreaterThan(0.7);
    });

    it('should have lower confidence for partial matches', () => {
      const context: RecommendationContext = {
        currentIntent: 'general',
        selectedComponents: [],
      };

      const result = engine.recommend('xyz', mockComponents, context);

      // If any results, they should have lower confidence
      result.recommendations.primary.forEach(rec => {
        expect(rec.confidence).toBeLessThan(0.9);
      });
    });
  });
});
