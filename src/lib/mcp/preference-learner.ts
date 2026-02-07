/**
 * User Preference Learning System
 *
 * Tracks user component selections and learns preferences to provide
 * personalized component recommendations.
 */

import type { ComponentMetadata } from './types';

// ============================================================================
// Types
// ============================================================================

export interface UserPreferences {
  frameworks: {
    [framework: string]: {
      selectionCount: number;
      lastUsed: Date;
      preferenceScore: number; // 0-1
    };
  };
  components: {
    [componentName: string]: {
      useCount: number;
      frameworks: string[];
      contexts: string[];
    };
  };
  patterns: {
    preferAnimated: boolean;
    preferSimple: boolean;
    favoriteFrameworks: string[];
    commonIntents: string[];
  };
  metadata: {
    totalSelections: number;
    firstUsed: Date;
    lastUpdated: Date;
  };
}

// ============================================================================
// Constants
// ============================================================================

const STORAGE_KEY = 'mcp-user-preferences';
const RECENCY_WINDOW_7_DAYS = 7 * 24 * 60 * 60 * 1000; // 7 days in ms
const RECENCY_WINDOW_30_DAYS = 30 * 24 * 60 * 60 * 1000; // 30 days in ms
const DECAY_WINDOW_90_DAYS = 90 * 24 * 60 * 60 * 1000; // 90 days in ms

// Scoring weights for preference algorithm
const WEIGHTS = {
  selectionFrequency: 0.4,
  recencyBoost: 0.3,
  contextAlignment: 0.2,
  frameworkFamiliarity: 0.1,
} as const;

// ============================================================================
// Preference Learner Class
// ============================================================================

export class PreferenceLearner {
  private preferences: UserPreferences;

  constructor(initialPrefs?: UserPreferences) {
    if (initialPrefs) {
      this.preferences = this.deserializePreferences(initialPrefs);
    } else {
      this.preferences = this.loadFromStorage() || this.createEmptyPreferences();
    }
  }

  // ==========================================================================
  // Tracking Methods
  // ==========================================================================

  /**
   * Track a component selection by the user
   */
  trackSelection(
    component: ComponentMetadata,
    intent: string,
    timestamp: Date = new Date()
  ): void {
    // Track framework usage
    if (component.source) {
      this.trackFrameworkUsage(component.source, timestamp);
    }

    // Track component usage
    const componentKey = this.getComponentKey(component);
    if (!this.preferences.components[componentKey]) {
      this.preferences.components[componentKey] = {
        useCount: 0,
        frameworks: [],
        contexts: [],
      };
    }

    const componentPref = this.preferences.components[componentKey];
    componentPref.useCount++;

    // Track framework association
    if (component.source && !componentPref.frameworks.includes(component.source)) {
      componentPref.frameworks.push(component.source);
    }

    // Track context/intent
    if (intent && !componentPref.contexts.includes(intent)) {
      componentPref.contexts.push(intent);
    }

    // Update patterns
    this.updatePatterns(component, intent);

    // Update metadata
    this.preferences.metadata.totalSelections++;
    this.preferences.metadata.lastUpdated = timestamp;

    // Persist to storage
    this.saveToStorage();
  }

  /**
   * Track framework usage
   */
  trackFrameworkUsage(framework: string, timestamp: Date = new Date()): void {
    if (!this.preferences.frameworks[framework]) {
      this.preferences.frameworks[framework] = {
        selectionCount: 0,
        lastUsed: timestamp,
        preferenceScore: 0,
      };
    }

    const frameworkPref = this.preferences.frameworks[framework];
    frameworkPref.selectionCount++;
    frameworkPref.lastUsed = timestamp;

    // Calculate preference score
    frameworkPref.preferenceScore = this.calculateFrameworkScore(framework);

    this.preferences.metadata.lastUpdated = timestamp;
    this.saveToStorage();
  }

  // ==========================================================================
  // Preference Retrieval
  // ==========================================================================

  /**
   * Get framework preferences sorted by score
   */
  getFrameworkPreferences(): Map<string, number> {
    const preferences = new Map<string, number>();

    for (const [framework, data] of Object.entries(this.preferences.frameworks)) {
      preferences.set(framework, data.preferenceScore);
    }

    // Sort by preference score
    return new Map(
      Array.from(preferences.entries()).sort((a, b) => b[1] - a[1])
    );
  }

  /**
   * Get component preferences sorted by usage
   */
  getComponentPreferences(): Map<string, number> {
    const preferences = new Map<string, number>();

    for (const [component, data] of Object.entries(this.preferences.components)) {
      preferences.set(component, data.useCount);
    }

    // Sort by use count
    return new Map(
      Array.from(preferences.entries()).sort((a, b) => b[1] - a[1])
    );
  }

  /**
   * Get common intent patterns
   */
  getIntentPatterns(): string[] {
    return [...this.preferences.patterns.commonIntents];
  }

  // ==========================================================================
  // Scoring & Recommendations
  // ==========================================================================

  /**
   * Score a component based on learned preferences
   */
  scoreByPreference(component: ComponentMetadata, currentIntent?: string): number {
    const componentKey = this.getComponentKey(component);
    const componentPref = this.preferences.components[componentKey];
    const frameworkPref = component.source
      ? this.preferences.frameworks[component.source]
      : undefined;

    // Selection frequency score (0-1)
    const selectionFrequency = componentPref
      ? Math.min(componentPref.useCount / 10, 1)
      : 0;

    // Recency boost (0-1)
    const recencyBoost = frameworkPref
      ? this.calculateRecencyBoost(frameworkPref.lastUsed)
      : 0;

    // Context alignment (0-1)
    const contextAlignment = componentPref && currentIntent
      ? componentPref.contexts.includes(currentIntent) ? 1 : 0
      : 0;

    // Framework familiarity (0-1)
    const frameworkFamiliarity = frameworkPref
      ? frameworkPref.preferenceScore
      : 0;

    // Calculate weighted score
    const score =
      selectionFrequency * WEIGHTS.selectionFrequency +
      recencyBoost * WEIGHTS.recencyBoost +
      contextAlignment * WEIGHTS.contextAlignment +
      frameworkFamiliarity * WEIGHTS.frameworkFamiliarity;

    return score;
  }

  /**
   * Get preferred components from candidates
   */
  getPreferredComponents(
    candidates: ComponentMetadata[],
    intent?: string
  ): ComponentMetadata[] {
    // Score each component
    const scored = candidates.map(component => ({
      component,
      score: this.scoreByPreference(component, intent),
    }));

    // Sort by score (descending)
    scored.sort((a, b) => b.score - a.score);

    // Return sorted components
    return scored.map(item => item.component);
  }

  // ==========================================================================
  // Persistence
  // ==========================================================================

  /**
   * Export preferences for backup
   */
  exportPreferences(): UserPreferences {
    return {
      frameworks: { ...this.preferences.frameworks },
      components: { ...this.preferences.components },
      patterns: { ...this.preferences.patterns },
      metadata: { ...this.preferences.metadata },
    };
  }

  /**
   * Load preferences from external source
   */
  loadPreferences(prefs: UserPreferences): void {
    this.preferences = this.deserializePreferences(prefs);
    this.saveToStorage();
  }

  /**
   * Clear all preferences
   */
  clearPreferences(): void {
    this.preferences = this.createEmptyPreferences();
    this.saveToStorage();
  }

  // ==========================================================================
  // Utility Methods
  // ==========================================================================

  /**
   * Get usage statistics
   */
  getStats(): {
    totalSelections: number;
    favoriteFrameworks: string[];
    topComponents: string[];
    commonIntents: string[];
  } {
    const frameworkPrefs = this.getFrameworkPreferences();
    const componentPrefs = this.getComponentPreferences();

    return {
      totalSelections: this.preferences.metadata.totalSelections,
      favoriteFrameworks: Array.from(frameworkPrefs.keys()).slice(0, 3),
      topComponents: Array.from(componentPrefs.keys()).slice(0, 5),
      commonIntents: this.preferences.patterns.commonIntents.slice(0, 3),
    };
  }

  // ==========================================================================
  // Private Helper Methods
  // ==========================================================================

  /**
   * Create empty preferences structure
   */
  private createEmptyPreferences(): UserPreferences {
    return {
      frameworks: {},
      components: {},
      patterns: {
        preferAnimated: false,
        preferSimple: true,
        favoriteFrameworks: [],
        commonIntents: [],
      },
      metadata: {
        totalSelections: 0,
        firstUsed: new Date(),
        lastUpdated: new Date(),
      },
    };
  }

  /**
   * Get unique key for component
   */
  private getComponentKey(component: ComponentMetadata): string {
    return `${component.source}:${component.name}`;
  }

  /**
   * Calculate framework preference score
   */
  private calculateFrameworkScore(framework: string): number {
    const frameworkPref = this.preferences.frameworks[framework];
    if (!frameworkPref) return 0;

    const totalSelections = this.preferences.metadata.totalSelections;
    if (totalSelections === 0) return 0;

    // Base score from selection frequency
    const frequencyScore = frameworkPref.selectionCount / totalSelections;

    // Apply time decay
    const recencyMultiplier = this.calculateRecencyBoost(frameworkPref.lastUsed);

    return Math.min(frequencyScore * (1 + recencyMultiplier), 1);
  }

  /**
   * Calculate recency boost/decay
   */
  private calculateRecencyBoost(lastUsed: Date): number {
    const now = Date.now();
    const lastUsedTime = lastUsed.getTime();
    const timeDiff = now - lastUsedTime;

    if (timeDiff <= RECENCY_WINDOW_7_DAYS) {
      return 0.2; // +20% boost for last 7 days
    } else if (timeDiff <= RECENCY_WINDOW_30_DAYS) {
      return 0.1; // +10% boost for last 30 days
    } else if (timeDiff > DECAY_WINDOW_90_DAYS) {
      return -0.5; // -50% penalty for >90 days
    }

    return 0; // No boost or penalty
  }

  /**
   * Update preference patterns based on selection
   */
  private updatePatterns(component: ComponentMetadata, intent: string): void {
    const patterns = this.preferences.patterns;

    // Track animation preference
    if (component.animations) {
      patterns.preferAnimated = true;
    }

    // Track complexity preference
    if (component.props && component.props.length > 10) {
      patterns.preferSimple = false;
    }

    // Track common intents
    if (intent && !patterns.commonIntents.includes(intent)) {
      patterns.commonIntents.push(intent);

      // Keep only top 5 most common intents
      if (patterns.commonIntents.length > 5) {
        patterns.commonIntents = patterns.commonIntents.slice(-5);
      }
    }

    // Update favorite frameworks
    const frameworkPrefs = this.getFrameworkPreferences();
    patterns.favoriteFrameworks = Array.from(frameworkPrefs.keys()).slice(0, 3);
  }

  /**
   * Save preferences to localStorage
   */
  private saveToStorage(): void {
    if (typeof window === 'undefined' || !window.localStorage) {
      return; // Server-side or localStorage unavailable
    }

    try {
      const serialized = this.serializePreferences(this.preferences);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(serialized));
    } catch (error) {
      console.warn('Failed to save preferences to localStorage:', error);
    }
  }

  /**
   * Load preferences from localStorage
   */
  private loadFromStorage(): UserPreferences | null {
    if (typeof window === 'undefined' || !window.localStorage) {
      return null; // Server-side or localStorage unavailable
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return null;

      const parsed = JSON.parse(stored);
      return this.deserializePreferences(parsed);
    } catch (error) {
      console.warn('Failed to load preferences from localStorage:', error);
      return null;
    }
  }

  /**
   * Serialize preferences (convert Dates to ISO strings)
   */
  private serializePreferences(prefs: UserPreferences): any {
    return {
      frameworks: Object.fromEntries(
        Object.entries(prefs.frameworks).map(([key, value]) => [
          key,
          {
            ...value,
            lastUsed: value.lastUsed.toISOString(),
          },
        ])
      ),
      components: prefs.components,
      patterns: prefs.patterns,
      metadata: {
        ...prefs.metadata,
        firstUsed: prefs.metadata.firstUsed.toISOString(),
        lastUpdated: prefs.metadata.lastUpdated.toISOString(),
      },
    };
  }

  /**
   * Deserialize preferences (convert ISO strings to Dates)
   */
  private deserializePreferences(data: any): UserPreferences {
    return {
      frameworks: Object.fromEntries(
        Object.entries(data.frameworks || {}).map(([key, value]: [string, any]) => [
          key,
          {
            ...value,
            lastUsed: new Date(value.lastUsed),
          },
        ])
      ),
      components: data.components || {},
      patterns: data.patterns || {
        preferAnimated: false,
        preferSimple: true,
        favoriteFrameworks: [],
        commonIntents: [],
      },
      metadata: {
        totalSelections: data.metadata?.totalSelections || 0,
        firstUsed: new Date(data.metadata?.firstUsed || new Date()),
        lastUpdated: new Date(data.metadata?.lastUpdated || new Date()),
      },
    };
  }
}

// ============================================================================
// Factory & Utilities
// ============================================================================

/**
 * Create a preference learner instance
 */
export function createPreferenceLearner(
  initialPrefs?: UserPreferences
): PreferenceLearner {
  return new PreferenceLearner(initialPrefs);
}

/**
 * Get global preference learner instance (singleton pattern)
 */
let globalLearner: PreferenceLearner | null = null;

export function getPreferenceLearner(): PreferenceLearner {
  if (!globalLearner) {
    globalLearner = new PreferenceLearner();
  }
  return globalLearner;
}

/**
 * Reset global preference learner
 */
export function resetPreferenceLearner(): void {
  globalLearner = null;
}
