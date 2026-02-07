/**
 * Query Enhancer Test Suite
 *
 * Comprehensive tests for the Query Enhancement Engine
 */

import {
  enhanceQuery,
  enhanceQueries,
  getSynonyms,
  getRelatedTerms,
  getIntentTerms,
  expandSearchQuery,
  mergeEnhancements,
  getDictionaryStats,
} from '../query-enhancer';

describe('Query Enhancer', () => {
  describe('getSynonyms', () => {
    it('should return synonyms for button', () => {
      const synonyms = getSynonyms('button');
      expect(synonyms).toContain('cta');
      expect(synonyms).toContain('action');
      expect(synonyms).toContain('submit');
      expect(synonyms.length).toBeGreaterThan(3);
    });

    it('should return synonyms for chart', () => {
      const synonyms = getSynonyms('chart');
      expect(synonyms).toContain('graph');
      expect(synonyms).toContain('visualization');
      expect(synonyms).toContain('plot');
    });

    it('should return synonyms for form', () => {
      const synonyms = getSynonyms('form');
      expect(synonyms).toContain('input');
      expect(synonyms).toContain('field');
      expect(synonyms).toContain('form-control');
    });

    it('should return synonyms for card', () => {
      const synonyms = getSynonyms('card');
      expect(synonyms).toContain('panel');
      expect(synonyms).toContain('container');
      expect(synonyms).toContain('box');
    });

    it('should return synonyms for table', () => {
      const synonyms = getSynonyms('table');
      expect(synonyms).toContain('data-grid');
      expect(synonyms).toContain('data-table');
      expect(synonyms).toContain('grid');
    });

    it('should return synonyms for modal', () => {
      const synonyms = getSynonyms('modal');
      expect(synonyms).toContain('dialog');
      expect(synonyms).toContain('popup');
      expect(synonyms).toContain('overlay');
    });

    it('should return synonyms for navigation', () => {
      const synonyms = getSynonyms('navigation');
      expect(synonyms).toContain('nav');
      expect(synonyms).toContain('menu');
      expect(synonyms).toContain('navbar');
    });

    it('should return synonyms for alert', () => {
      const synonyms = getSynonyms('alert');
      expect(synonyms).toContain('notification');
      expect(synonyms).toContain('toast');
      expect(synonyms).toContain('message');
    });

    it('should return empty array for unknown terms', () => {
      const synonyms = getSynonyms('unknown-component-xyz');
      expect(synonyms).toEqual([]);
    });

    it('should handle case-insensitive input', () => {
      const lower = getSynonyms('button');
      const upper = getSynonyms('BUTTON');
      const mixed = getSynonyms('BuTtOn');
      expect(lower).toEqual(upper);
      expect(lower).toEqual(mixed);
    });

    it('should handle whitespace', () => {
      const synonyms = getSynonyms('  button  ');
      expect(synonyms).toContain('cta');
    });
  });

  describe('getRelatedTerms', () => {
    it('should return related terms for button', () => {
      const related = getRelatedTerms('button');
      expect(related).toContain('icon');
      expect(related).toContain('link');
    });

    it('should return related terms for form', () => {
      const related = getRelatedTerms('form');
      expect(related).toContain('input');
      expect(related).toContain('validation');
      expect(related).toContain('button');
    });

    it('should return related terms for table', () => {
      const related = getRelatedTerms('table');
      expect(related).toContain('pagination');
      expect(related).toContain('search');
      expect(related).toContain('filter');
    });

    it('should return empty array for unknown terms', () => {
      const related = getRelatedTerms('unknown-component');
      expect(related).toEqual([]);
    });
  });

  describe('getIntentTerms', () => {
    it('should return dashboard intent terms', () => {
      const terms = getIntentTerms('dashboard');
      expect(terms).toContain('chart');
      expect(terms).toContain('metric');
      expect(terms).toContain('stat');
      expect(terms).toContain('kpi');
    });

    it('should return landing-page intent terms', () => {
      const terms = getIntentTerms('landing-page');
      expect(terms).toContain('hero');
      expect(terms).toContain('cta');
      expect(terms).toContain('pricing');
    });

    it('should return form intent terms', () => {
      const terms = getIntentTerms('form');
      expect(terms).toContain('input');
      expect(terms).toContain('validation');
      expect(terms).toContain('field');
    });

    it('should return data-table intent terms', () => {
      const terms = getIntentTerms('data-table');
      expect(terms).toContain('pagination');
      expect(terms).toContain('sort');
      expect(terms).toContain('filter');
    });

    it('should return marketing intent terms', () => {
      const terms = getIntentTerms('marketing');
      expect(terms).toContain('banner');
      expect(terms).toContain('notification');
    });

    it('should return admin intent terms', () => {
      const terms = getIntentTerms('admin');
      expect(terms).toContain('sidebar');
      expect(terms).toContain('navigation');
      expect(terms).toContain('menu');
    });

    it('should return app intent terms', () => {
      const terms = getIntentTerms('app');
      expect(terms).toContain('layout');
      expect(terms).toContain('container');
    });

    it('should return general intent terms', () => {
      const terms = getIntentTerms('general');
      expect(terms).toContain('button');
      expect(terms).toContain('input');
    });
  });

  describe('enhanceQuery', () => {
    it('should enhance button query', () => {
      const result = enhanceQuery('button');
      expect(result.originalQuery).toBe('button');
      expect(result.enhancedQueries).toContain('button');
      expect(result.enhancedQueries).toContain('cta');
      expect(result.enhancedQueries).toContain('action');
      expect(result.synonyms).toContain('cta');
      expect(result.confidence).toBeGreaterThan(0.5);
    });

    it('should enhance button query with dashboard intent', () => {
      const result = enhanceQuery('button', 'dashboard');
      expect(result.enhancedQueries).toContain('button');
      expect(result.enhancedQueries).toContain('cta');
      expect(result.intentTerms).toContain('chart');
      expect(result.intentTerms).toContain('metric');
      // Should have intent-based combinations
      expect(result.enhancedQueries.some(q => q.includes('metric'))).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.7);
    });

    it('should enhance chart query with dashboard intent', () => {
      const result = enhanceQuery('chart', 'dashboard');
      expect(result.enhancedQueries).toContain('chart');
      expect(result.enhancedQueries).toContain('graph');
      expect(result.enhancedQueries).toContain('visualization');
      expect(result.intentTerms).toContain('metric');
      expect(result.intentTerms).toContain('stat');
      expect(result.confidence).toBeGreaterThan(0.7);
    });

    it('should enhance form query', () => {
      const result = enhanceQuery('form');
      expect(result.enhancedQueries).toContain('form');
      expect(result.enhancedQueries).toContain('input');
      expect(result.enhancedQueries).toContain('field');
      expect(result.synonyms).toContain('input');
      expect(result.relatedTerms).toContain('validation');
    });

    it('should enhance card query', () => {
      const result = enhanceQuery('card');
      expect(result.enhancedQueries).toContain('card');
      expect(result.enhancedQueries).toContain('panel');
      expect(result.enhancedQueries).toContain('container');
    });

    it('should enhance table query', () => {
      const result = enhanceQuery('table');
      expect(result.enhancedQueries).toContain('table');
      expect(result.enhancedQueries).toContain('data-grid');
      expect(result.enhancedQueries).toContain('grid');
    });

    it('should respect maxSynonyms option', () => {
      const result = enhanceQuery('button', undefined, { maxSynonyms: 2 });
      expect(result.synonyms.length).toBeLessThanOrEqual(2);
    });

    it('should exclude related terms when includeRelated is false', () => {
      const result = enhanceQuery('form', undefined, { includeRelated: false });
      expect(result.relatedTerms).toEqual([]);
    });

    it('should respect minConfidence option', () => {
      const result = enhanceQuery('unknown-term', undefined, { minConfidence: 0.8 });
      expect(result.confidence).toBe(0);
      expect(result.synonyms).toEqual([]);
    });

    it('should disable intent expansion when useIntentExpansion is false', () => {
      const result = enhanceQuery('button', 'dashboard', { useIntentExpansion: false });
      expect(result.intentTerms).toEqual([]);
    });

    it('should handle unknown terms gracefully', () => {
      const result = enhanceQuery('unknown-component-xyz');
      expect(result.originalQuery).toBe('unknown-component-xyz');
      expect(result.enhancedQueries).toContain('unknown-component-xyz');
      expect(result.synonyms).toEqual([]);
      expect(result.confidence).toBeLessThan(0.5);
    });
  });

  describe('enhanceQueries (batch)', () => {
    it('should enhance multiple queries', () => {
      const results = enhanceQueries(['button', 'chart', 'form']);
      expect(results).toHaveLength(3);
      expect(results[0].originalQuery).toBe('button');
      expect(results[1].originalQuery).toBe('chart');
      expect(results[2].originalQuery).toBe('form');
    });

    it('should enhance multiple queries with intent', () => {
      const results = enhanceQueries(['button', 'chart'], 'dashboard');
      expect(results).toHaveLength(2);
      expect(results[0].intentTerms).toContain('metric');
      expect(results[1].intentTerms).toContain('stat');
    });
  });

  describe('mergeEnhancements', () => {
    it('should merge multiple enhancements into unique queries', () => {
      const enhancements = enhanceQueries(['button', 'card', 'form']);
      const merged = mergeEnhancements(enhancements);

      expect(merged).toContain('button');
      expect(merged).toContain('card');
      expect(merged).toContain('form');
      expect(merged).toContain('cta');
      expect(merged).toContain('panel');

      // Should have no duplicates
      const uniqueSet = new Set(merged);
      expect(merged.length).toBe(uniqueSet.size);
    });
  });

  describe('expandSearchQuery', () => {
    it('should expand button search query', () => {
      const expanded = expandSearchQuery('button');
      expect(expanded).toContain('button');
      expect(expanded).toContain('cta');
      expect(expanded.length).toBeLessThanOrEqual(10);
    });

    it('should expand chart search query with dashboard intent', () => {
      const expanded = expandSearchQuery('chart', 'dashboard');
      expect(expanded).toContain('chart');
      expect(expanded).toContain('graph');
      expect(expanded.some(q => q.includes('metric') || q.includes('stat'))).toBe(true);
    });

    it('should respect maxResults parameter', () => {
      const expanded = expandSearchQuery('button', 'dashboard', 5);
      expect(expanded.length).toBeLessThanOrEqual(5);
    });
  });

  describe('getDictionaryStats', () => {
    it('should return correct statistics', () => {
      const stats = getDictionaryStats();

      expect(stats.synonymEntries).toBeGreaterThanOrEqual(30);
      expect(stats.totalSynonyms).toBeGreaterThan(0);
      expect(parseFloat(stats.averageSynonymsPerTerm)).toBeGreaterThan(0);
      expect(stats.relatedTermEntries).toBeGreaterThan(0);
      expect(stats.intentExpansions).toBe(8); // 8 intents defined
    });

    it('should have at least 30 synonym entries', () => {
      const stats = getDictionaryStats();
      expect(stats.synonymEntries).toBeGreaterThanOrEqual(30);
    });
  });

  describe('Intent-based expansion scenarios', () => {
    it('should enhance login form components', () => {
      const result = enhanceQuery('input', 'form');
      expect(result.enhancedQueries).toContain('input');
      expect(result.intentTerms).toContain('validation');
    });

    it('should enhance dashboard metric components', () => {
      const result = enhanceQuery('card', 'dashboard');
      expect(result.enhancedQueries).toContain('card');
      expect(result.intentTerms).toContain('metric');
      expect(result.intentTerms).toContain('stat');
    });

    it('should enhance landing page hero components', () => {
      const result = enhanceQuery('button', 'landing-page');
      expect(result.enhancedQueries).toContain('button');
      expect(result.intentTerms).toContain('cta');
      expect(result.intentTerms).toContain('hero');
    });

    it('should enhance admin navigation components', () => {
      const result = enhanceQuery('menu', 'admin');
      expect(result.enhancedQueries).toContain('menu');
      expect(result.intentTerms).toContain('sidebar');
      expect(result.intentTerms).toContain('navigation');
    });
  });

  describe('Edge cases', () => {
    it('should handle empty string', () => {
      const result = enhanceQuery('');
      expect(result.originalQuery).toBe('');
      expect(result.enhancedQueries).toContain('');
    });

    it('should handle whitespace-only string', () => {
      const result = enhanceQuery('   ');
      expect(result.originalQuery).toBe('   ');
    });

    it('should handle special characters', () => {
      const result = enhanceQuery('button@#$');
      expect(result.originalQuery).toBe('button@#$');
    });

    it('should not have duplicate entries in enhancedQueries', () => {
      const result = enhanceQuery('button', 'dashboard');
      const uniqueQueries = new Set(result.enhancedQueries);
      expect(result.enhancedQueries.length).toBe(uniqueQueries.size);
    });
  });

  describe('Confidence scoring', () => {
    it('should give high confidence to known terms', () => {
      const result = enhanceQuery('button');
      expect(result.confidence).toBeGreaterThan(0.7);
    });

    it('should give higher confidence with intent', () => {
      const withoutIntent = enhanceQuery('button');
      const withIntent = enhanceQuery('button', 'dashboard');
      expect(withIntent.confidence).toBeGreaterThanOrEqual(withoutIntent.confidence);
    });

    it('should give low confidence to unknown terms', () => {
      const result = enhanceQuery('xyz-unknown-component');
      expect(result.confidence).toBeLessThan(0.5);
    });
  });
});
