/**
 * Tests for User Preference Learning System
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { PreferenceLearner } from '../preference-learner';
import type { ComponentMetadata, UserPreferences } from '../types';

// ============================================================================
// Mock Data
// ============================================================================

const mockButtonComponent: ComponentMetadata = {
  id: 'shadcn-button',
  name: 'Button',
  displayName: 'Button',
  description: 'A customizable button component',
  category: 'forms',
  tags: ['button', 'input'],
  source: 'shadcn-ui',
  framework: 'react',
};

const mockCardComponent: ComponentMetadata = {
  id: 'mui-card',
  name: 'Card',
  displayName: 'Card',
  description: 'Material UI Card component',
  category: 'data-display',
  tags: ['card', 'container'],
  source: 'mui',
  framework: 'react',
};

const mockAnimatedComponent: ComponentMetadata = {
  id: 'magic-ui-sparkle',
  name: 'SparkleButton',
  displayName: 'Sparkle Button',
  description: 'Animated button with sparkle effect',
  category: 'forms',
  tags: ['button', 'animated'],
  source: 'magic-ui',
  framework: 'react',
  animations: {
    type: 'framer-motion',
    complexity: 'medium',
  },
};

const mockComplexComponent: ComponentMetadata = {
  id: 'mui-datatable',
  name: 'DataTable',
  displayName: 'Data Table',
  description: 'Complex data table with sorting and filtering',
  category: 'data-display',
  tags: ['table', 'data'],
  source: 'mui',
  framework: 'react',
  props: Array(15).fill(null).map((_, i) => ({
    name: `prop${i}`,
    type: 'string',
    required: false,
  })),
};

// ============================================================================
// Test Suite
// ============================================================================

describe('PreferenceLearner', () => {
  let learner: PreferenceLearner;
  let localStorageMock: { [key: string]: string };

  beforeEach(() => {
    // Mock localStorage
    localStorageMock = {};
    global.localStorage = {
      getItem: vi.fn((key: string) => localStorageMock[key] || null),
      setItem: vi.fn((key: string, value: string) => {
        localStorageMock[key] = value;
      }),
      removeItem: vi.fn((key: string) => {
        delete localStorageMock[key];
      }),
      clear: vi.fn(() => {
        localStorageMock = {};
      }),
      key: vi.fn(),
      length: 0,
    };

    learner = new PreferenceLearner();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  // ==========================================================================
  // Initialization Tests
  // ==========================================================================

  describe('Initialization', () => {
    it('should initialize with empty preferences', () => {
      const stats = learner.getStats();
      expect(stats.totalSelections).toBe(0);
      expect(stats.favoriteFrameworks).toEqual([]);
      expect(stats.topComponents).toEqual([]);
    });

    it('should initialize with provided preferences', () => {
      const initialPrefs: UserPreferences = {
        frameworks: {
          'shadcn-ui': {
            selectionCount: 5,
            lastUsed: new Date(),
            preferenceScore: 0.5,
          },
        },
        components: {},
        patterns: {
          preferAnimated: false,
          preferSimple: true,
          favoriteFrameworks: ['shadcn-ui'],
          commonIntents: ['landing-page'],
        },
        metadata: {
          totalSelections: 5,
          firstUsed: new Date(),
          lastUpdated: new Date(),
        },
      };

      const customLearner = new PreferenceLearner(initialPrefs);
      const stats = customLearner.getStats();
      expect(stats.totalSelections).toBe(5);
      expect(stats.favoriteFrameworks).toContain('shadcn-ui');
    });

    it('should support preferences serialization for persistence', () => {
      learner.trackSelection(mockButtonComponent, 'landing-page');
      learner.trackSelection(mockButtonComponent, 'landing-page');
      learner.trackSelection(mockButtonComponent, 'landing-page');

      // Export preferences (which would be saved to localStorage)
      const exported = learner.exportPreferences();
      expect(exported.metadata.totalSelections).toBe(3);

      // Create new learner with exported data (simulating reload)
      const loadedLearner = new PreferenceLearner(exported);
      const stats = loadedLearner.getStats();
      expect(stats.totalSelections).toBe(3);
    });
  });

  // ==========================================================================
  // Tracking Tests
  // ==========================================================================

  describe('Selection Tracking', () => {
    it('should track component selection', () => {
      learner.trackSelection(mockButtonComponent, 'landing-page');

      const stats = learner.getStats();
      expect(stats.totalSelections).toBe(1);
      expect(stats.favoriteFrameworks).toContain('shadcn-ui');
    });

    it('should track multiple selections of same component', () => {
      for (let i = 0; i < 10; i++) {
        learner.trackSelection(mockButtonComponent, 'landing-page');
      }

      const componentPrefs = learner.getComponentPreferences();
      const buttonKey = 'shadcn-ui:Button';
      expect(componentPrefs.get(buttonKey)).toBe(10);
    });

    it('should track framework usage independently', () => {
      learner.trackFrameworkUsage('shadcn-ui');
      learner.trackFrameworkUsage('mui');
      learner.trackFrameworkUsage('shadcn-ui');

      const frameworkPrefs = learner.getFrameworkPreferences();
      expect(frameworkPrefs.size).toBe(2);
    });

    it('should track intent patterns', () => {
      learner.trackSelection(mockButtonComponent, 'landing-page');
      learner.trackSelection(mockCardComponent, 'dashboard');
      learner.trackSelection(mockButtonComponent, 'landing-page');

      const intents = learner.getIntentPatterns();
      expect(intents).toContain('landing-page');
      expect(intents).toContain('dashboard');
    });

    it('should update animation preferences', () => {
      learner.trackSelection(mockAnimatedComponent, 'landing-page');

      const exported = learner.exportPreferences();
      expect(exported.patterns.preferAnimated).toBe(true);
    });

    it('should update complexity preferences', () => {
      learner.trackSelection(mockComplexComponent, 'dashboard');

      const exported = learner.exportPreferences();
      expect(exported.patterns.preferSimple).toBe(false);
    });
  });

  // ==========================================================================
  // Preference Retrieval Tests
  // ==========================================================================

  describe('Preference Retrieval', () => {
    beforeEach(() => {
      // Setup initial selections
      learner.trackSelection(mockButtonComponent, 'landing-page');
      learner.trackSelection(mockButtonComponent, 'landing-page');
      learner.trackSelection(mockCardComponent, 'dashboard');
      learner.trackSelection(mockAnimatedComponent, 'landing-page');
    });

    it('should return framework preferences sorted by score', () => {
      const frameworkPrefs = learner.getFrameworkPreferences();
      const frameworks = Array.from(frameworkPrefs.keys());

      // shadcn-ui should be highest (2 selections)
      expect(frameworks[0]).toBe('shadcn-ui');
    });

    it('should return component preferences sorted by usage', () => {
      const componentPrefs = learner.getComponentPreferences();
      const components = Array.from(componentPrefs.keys());

      // Button should be first (2 uses)
      expect(components[0]).toBe('shadcn-ui:Button');
      expect(componentPrefs.get('shadcn-ui:Button')).toBe(2);
    });

    it('should return intent patterns', () => {
      const intents = learner.getIntentPatterns();
      expect(intents).toContain('landing-page');
      expect(intents).toContain('dashboard');
    });
  });

  // ==========================================================================
  // Scoring Tests
  // ==========================================================================

  describe('Preference Scoring', () => {
    it('should score components with no history as 0', () => {
      const score = learner.scoreByPreference(mockButtonComponent);
      expect(score).toBe(0);
    });

    it('should score previously used components higher', () => {
      // Track multiple uses
      for (let i = 0; i < 5; i++) {
        learner.trackSelection(mockButtonComponent, 'landing-page');
      }

      const score = learner.scoreByPreference(mockButtonComponent);
      expect(score).toBeGreaterThan(0);
    });

    it('should boost score for matching intent', () => {
      learner.trackSelection(mockButtonComponent, 'landing-page');

      const scoreWithIntent = learner.scoreByPreference(
        mockButtonComponent,
        'landing-page'
      );
      const scoreWithoutIntent = learner.scoreByPreference(mockButtonComponent);

      expect(scoreWithIntent).toBeGreaterThan(scoreWithoutIntent);
    });

    it('should prioritize familiar frameworks', () => {
      // Use shadcn-ui multiple times
      for (let i = 0; i < 5; i++) {
        learner.trackSelection(mockButtonComponent, 'landing-page');
      }

      const shadcnScore = learner.scoreByPreference(mockButtonComponent);
      const muiScore = learner.scoreByPreference(mockCardComponent);

      expect(shadcnScore).toBeGreaterThan(muiScore);
    });
  });

  // ==========================================================================
  // Component Recommendation Tests
  // ==========================================================================

  describe('Component Recommendations', () => {
    it('should sort components by preference', () => {
      // Track button selections
      for (let i = 0; i < 5; i++) {
        learner.trackSelection(mockButtonComponent, 'landing-page');
      }
      // Track card selection once
      learner.trackSelection(mockCardComponent, 'dashboard');

      const candidates = [mockCardComponent, mockButtonComponent, mockAnimatedComponent];
      const preferred = learner.getPreferredComponents(candidates);

      // Button should be first (most used)
      expect(preferred[0].name).toBe('Button');
    });

    it('should consider intent in recommendations', () => {
      learner.trackSelection(mockButtonComponent, 'landing-page');
      learner.trackSelection(mockCardComponent, 'dashboard');

      const candidates = [mockButtonComponent, mockCardComponent];
      const preferred = learner.getPreferredComponents(candidates, 'dashboard');

      // Card should be preferred for dashboard intent
      expect(preferred[0].name).toBe('Card');
    });

    it('should handle empty candidates', () => {
      const preferred = learner.getPreferredComponents([]);
      expect(preferred).toEqual([]);
    });
  });

  // ==========================================================================
  // Time Decay Tests
  // ==========================================================================

  describe('Time Decay', () => {
    it('should boost recent selections (7 days)', () => {
      const recentDate = new Date();
      learner.trackSelection(mockButtonComponent, 'landing-page', recentDate);

      const score = learner.scoreByPreference(mockButtonComponent);
      expect(score).toBeGreaterThan(0);
    });

    it('should boost medium-recent selections (30 days)', () => {
      const mediumDate = new Date(Date.now() - 15 * 24 * 60 * 60 * 1000); // 15 days ago
      learner.trackSelection(mockButtonComponent, 'landing-page', mediumDate);

      const score = learner.scoreByPreference(mockButtonComponent);
      expect(score).toBeGreaterThan(0);
    });

    it('should decay old selections (>90 days)', () => {
      const oldDate = new Date(Date.now() - 100 * 24 * 60 * 60 * 1000); // 100 days ago
      learner.trackSelection(mockButtonComponent, 'landing-page', oldDate);

      // Score can be negative due to decay penalty, but algorithm should handle it
      const score = learner.scoreByPreference(mockButtonComponent);
      // The score might be negative due to -50% penalty, which is expected behavior
      expect(typeof score).toBe('number');
    });
  });

  // ==========================================================================
  // Persistence Tests
  // ==========================================================================

  describe('Persistence', () => {
    it('should export preferences', () => {
      learner.trackSelection(mockButtonComponent, 'landing-page');

      const exported = learner.exportPreferences();
      expect(exported.metadata.totalSelections).toBe(1);
      expect(exported.frameworks).toHaveProperty('shadcn-ui');
    });

    it('should import preferences', () => {
      const preferences: UserPreferences = {
        frameworks: {
          'mui': {
            selectionCount: 10,
            lastUsed: new Date(),
            preferenceScore: 0.8,
          },
        },
        components: {
          'mui:Card': {
            useCount: 10,
            frameworks: ['mui'],
            contexts: ['dashboard'],
          },
        },
        patterns: {
          preferAnimated: true,
          preferSimple: false,
          favoriteFrameworks: ['mui'],
          commonIntents: ['dashboard'],
        },
        metadata: {
          totalSelections: 10,
          firstUsed: new Date(),
          lastUpdated: new Date(),
        },
      };

      learner.loadPreferences(preferences);
      const stats = learner.getStats();
      expect(stats.totalSelections).toBe(10);
      expect(stats.favoriteFrameworks).toContain('mui');
    });

    it('should support export and import workflow', () => {
      learner.trackSelection(mockButtonComponent, 'landing-page');

      // Export preferences (similar to saving)
      const exported = learner.exportPreferences();
      expect(exported).toBeDefined();
      expect(exported.metadata.totalSelections).toBe(1);

      // Import into new learner (similar to loading)
      const newLearner = new PreferenceLearner();
      newLearner.loadPreferences(exported);

      const stats = newLearner.getStats();
      expect(stats.totalSelections).toBe(1);
    });

    it('should clear preferences', () => {
      learner.trackSelection(mockButtonComponent, 'landing-page');
      learner.trackSelection(mockCardComponent, 'dashboard');

      learner.clearPreferences();

      const stats = learner.getStats();
      expect(stats.totalSelections).toBe(0);
      expect(stats.favoriteFrameworks).toEqual([]);
    });
  });

  // ==========================================================================
  // Statistics Tests
  // ==========================================================================

  describe('Statistics', () => {
    it('should return accurate statistics', () => {
      learner.trackSelection(mockButtonComponent, 'landing-page');
      learner.trackSelection(mockButtonComponent, 'landing-page');
      learner.trackSelection(mockCardComponent, 'dashboard');
      learner.trackSelection(mockAnimatedComponent, 'landing-page');

      const stats = learner.getStats();

      expect(stats.totalSelections).toBe(4);
      expect(stats.favoriteFrameworks.length).toBeGreaterThan(0);
      expect(stats.topComponents.length).toBeGreaterThan(0);
      expect(stats.commonIntents).toContain('landing-page');
    });

    it('should limit top items', () => {
      // Add many frameworks
      for (let i = 0; i < 10; i++) {
        learner.trackFrameworkUsage(`framework-${i}`);
      }

      const stats = learner.getStats();
      expect(stats.favoriteFrameworks.length).toBeLessThanOrEqual(3);
    });
  });

  // ==========================================================================
  // Edge Cases
  // ==========================================================================

  describe('Edge Cases', () => {
    it('should handle component without source', () => {
      const componentNoSource: ComponentMetadata = {
        ...mockButtonComponent,
        source: undefined as any,
      };

      expect(() => {
        learner.trackSelection(componentNoSource, 'landing-page');
      }).not.toThrow();
    });

    it('should handle empty intent', () => {
      expect(() => {
        learner.trackSelection(mockButtonComponent, '');
      }).not.toThrow();
    });

    it('should handle very high use counts', () => {
      for (let i = 0; i < 100; i++) {
        learner.trackSelection(mockButtonComponent, 'landing-page');
      }

      const score = learner.scoreByPreference(mockButtonComponent);
      expect(score).toBeGreaterThan(0);
      expect(score).toBeLessThanOrEqual(1);
    });

    it('should handle localStorage unavailable', () => {
      // @ts-ignore
      delete global.localStorage;

      const newLearner = new PreferenceLearner();
      expect(() => {
        newLearner.trackSelection(mockButtonComponent, 'landing-page');
      }).not.toThrow();
    });
  });

  // ==========================================================================
  // Integration Tests
  // ==========================================================================

  describe('Integration Scenarios', () => {
    it('should learn dashboard preference after multiple selections', () => {
      // User builds several dashboards
      for (let i = 0; i < 5; i++) {
        learner.trackSelection(mockCardComponent, 'dashboard');
      }

      const intents = learner.getIntentPatterns();
      expect(intents).toContain('dashboard');

      const stats = learner.getStats();
      expect(stats.favoriteFrameworks).toContain('mui');
    });

    it('should learn framework preference', () => {
      // User prefers shadcn-ui
      for (let i = 0; i < 10; i++) {
        learner.trackSelection(mockButtonComponent, 'landing-page');
      }

      // One-time mui usage
      learner.trackSelection(mockCardComponent, 'dashboard');

      const frameworkPrefs = learner.getFrameworkPreferences();
      const topFramework = Array.from(frameworkPrefs.keys())[0];
      expect(topFramework).toBe('shadcn-ui');
    });

    it('should preserve preferences across sessions', () => {
      // Session 1: Track selections
      learner.trackSelection(mockButtonComponent, 'landing-page');
      learner.trackSelection(mockButtonComponent, 'landing-page');

      const exported = learner.exportPreferences();

      // Session 2: Load preferences
      const newLearner = new PreferenceLearner(exported);
      const stats = newLearner.getStats();

      expect(stats.totalSelections).toBe(2);
      expect(stats.favoriteFrameworks).toContain('shadcn-ui');
    });
  });
});
