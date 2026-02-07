/**
 * Manual Test Runner for Query Enhancer
 *
 * Run with: npx tsx src/lib/mcp/__tests__/query-enhancer.manual-test.ts
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

// Test result tracking
let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition: boolean, message: string) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`✓ ${message}`);
  } else {
    failedTests++;
    console.error(`✗ ${message}`);
  }
}

function assertContains<T>(array: T[], item: T, message: string) {
  assert(array.includes(item), message);
}

function assertGreaterThan(value: number, threshold: number, message: string) {
  assert(value > threshold, `${message} (${value} > ${threshold})`);
}

function assertGreaterThanOrEqual(value: number, threshold: number, message: string) {
  assert(value >= threshold, `${message} (${value} >= ${threshold})`);
}

function assertEquals<T>(actual: T, expected: T, message: string) {
  assert(actual === expected, `${message} (${actual} === ${expected})`);
}

console.log('🧪 Running Query Enhancer Tests\n');

// Test 1: getSynonyms - button
console.log('Test Group: getSynonyms');
const buttonSynonyms = getSynonyms('button');
assertContains(buttonSynonyms, 'cta', 'button should have cta synonym');
assertContains(buttonSynonyms, 'action', 'button should have action synonym');
assertContains(buttonSynonyms, 'submit', 'button should have submit synonym');
assertGreaterThan(buttonSynonyms.length, 3, 'button should have more than 3 synonyms');

// Test 2: getSynonyms - chart
const chartSynonyms = getSynonyms('chart');
assertContains(chartSynonyms, 'graph', 'chart should have graph synonym');
assertContains(chartSynonyms, 'visualization', 'chart should have visualization synonym');
assertContains(chartSynonyms, 'plot', 'chart should have plot synonym');

// Test 3: getSynonyms - form
const formSynonyms = getSynonyms('form');
assertContains(formSynonyms, 'input', 'form should have input synonym');
assertContains(formSynonyms, 'field', 'form should have field synonym');
assertContains(formSynonyms, 'form-control', 'form should have form-control synonym');

// Test 4: getSynonyms - card
const cardSynonyms = getSynonyms('card');
assertContains(cardSynonyms, 'panel', 'card should have panel synonym');
assertContains(cardSynonyms, 'container', 'card should have container synonym');
assertContains(cardSynonyms, 'box', 'card should have box synonym');

// Test 5: getSynonyms - table
const tableSynonyms = getSynonyms('table');
assertContains(tableSynonyms, 'data-grid', 'table should have data-grid synonym');
assertContains(tableSynonyms, 'data-table', 'table should have data-table synonym');
assertContains(tableSynonyms, 'grid', 'table should have grid synonym');

// Test 6: getSynonyms - modal
const modalSynonyms = getSynonyms('modal');
assertContains(modalSynonyms, 'dialog', 'modal should have dialog synonym');
assertContains(modalSynonyms, 'popup', 'modal should have popup synonym');
assertContains(modalSynonyms, 'overlay', 'modal should have overlay synonym');

// Test 7: getSynonyms - navigation
const navSynonyms = getSynonyms('navigation');
assertContains(navSynonyms, 'nav', 'navigation should have nav synonym');
assertContains(navSynonyms, 'menu', 'navigation should have menu synonym');
assertContains(navSynonyms, 'navbar', 'navigation should have navbar synonym');

// Test 8: getSynonyms - alert
const alertSynonyms = getSynonyms('alert');
assertContains(alertSynonyms, 'notification', 'alert should have notification synonym');
assertContains(alertSynonyms, 'toast', 'alert should have toast synonym');
assertContains(alertSynonyms, 'message', 'alert should have message synonym');

// Test 9: getRelatedTerms
console.log('\nTest Group: getRelatedTerms');
const formRelated = getRelatedTerms('form');
assertContains(formRelated, 'input', 'form should have input as related term');
assertContains(formRelated, 'validation', 'form should have validation as related term');

const tableRelated = getRelatedTerms('table');
assertContains(tableRelated, 'pagination', 'table should have pagination as related term');
assertContains(tableRelated, 'search', 'table should have search as related term');

// Test 10: getIntentTerms
console.log('\nTest Group: getIntentTerms');
const dashboardIntent = getIntentTerms('dashboard');
assertContains(dashboardIntent, 'chart', 'dashboard intent should include chart');
assertContains(dashboardIntent, 'metric', 'dashboard intent should include metric');
assertContains(dashboardIntent, 'stat', 'dashboard intent should include stat');
assertContains(dashboardIntent, 'kpi', 'dashboard intent should include kpi');

const landingPageIntent = getIntentTerms('landing-page');
assertContains(landingPageIntent, 'hero', 'landing-page intent should include hero');
assertContains(landingPageIntent, 'cta', 'landing-page intent should include cta');
assertContains(landingPageIntent, 'pricing', 'landing-page intent should include pricing');

const formIntent = getIntentTerms('form');
assertContains(formIntent, 'input', 'form intent should include input');
assertContains(formIntent, 'validation', 'form intent should include validation');

// Test 11: enhanceQuery - basic
console.log('\nTest Group: enhanceQuery');
const buttonEnhancement = enhanceQuery('button');
assertEquals(buttonEnhancement.originalQuery, 'button', 'original query should be button');
assertContains(buttonEnhancement.enhancedQueries, 'button', 'enhanced queries should include button');
assertContains(buttonEnhancement.enhancedQueries, 'cta', 'enhanced queries should include cta');
assertContains(buttonEnhancement.synonyms, 'cta', 'synonyms should include cta');
assertGreaterThan(buttonEnhancement.confidence, 0.5, 'confidence should be > 0.5');

// Test 12: enhanceQuery - with dashboard intent
const buttonDashboard = enhanceQuery('button', 'dashboard');
assertContains(buttonDashboard.enhancedQueries, 'button', 'should include button');
assertContains(buttonDashboard.enhancedQueries, 'cta', 'should include cta');
assertContains(buttonDashboard.intentTerms, 'chart', 'should have chart in intent terms');
assertContains(buttonDashboard.intentTerms, 'metric', 'should have metric in intent terms');
assertGreaterThan(buttonDashboard.confidence, 0.7, 'confidence with intent should be > 0.7');

// Test 13: enhanceQuery - chart with dashboard
const chartDashboard = enhanceQuery('chart', 'dashboard');
assertContains(chartDashboard.enhancedQueries, 'chart', 'should include chart');
assertContains(chartDashboard.enhancedQueries, 'graph', 'should include graph');
assertContains(chartDashboard.enhancedQueries, 'visualization', 'should include visualization');
assertContains(chartDashboard.intentTerms, 'metric', 'should have metric in intent terms');
assertGreaterThan(chartDashboard.confidence, 0.7, 'confidence should be > 0.7');

// Test 14: enhanceQuery - form
const formEnhancement = enhanceQuery('form');
assertContains(formEnhancement.enhancedQueries, 'form', 'should include form');
assertContains(formEnhancement.enhancedQueries, 'input', 'should include input');
assertContains(formEnhancement.enhancedQueries, 'field', 'should include field');

// Test 15: enhanceQueries - batch
console.log('\nTest Group: enhanceQueries (batch)');
const batchResults = enhanceQueries(['button', 'chart', 'form']);
assertEquals(batchResults.length, 3, 'should return 3 results');
assertEquals(batchResults[0].originalQuery, 'button', 'first should be button');
assertEquals(batchResults[1].originalQuery, 'chart', 'second should be chart');
assertEquals(batchResults[2].originalQuery, 'form', 'third should be form');

// Test 16: mergeEnhancements
console.log('\nTest Group: mergeEnhancements');
const merged = mergeEnhancements(batchResults);
assertContains(merged, 'button', 'merged should include button');
assertContains(merged, 'chart', 'merged should include chart');
assertContains(merged, 'form', 'merged should include form');
assertContains(merged, 'cta', 'merged should include cta');
assertContains(merged, 'graph', 'merged should include graph');

// Test 17: expandSearchQuery
console.log('\nTest Group: expandSearchQuery');
const expanded = expandSearchQuery('button');
assertContains(expanded, 'button', 'expanded should include button');
assertContains(expanded, 'cta', 'expanded should include cta');
assert(expanded.length <= 10, 'expanded should be <= 10');

const expandedWithIntent = expandSearchQuery('chart', 'dashboard');
assertContains(expandedWithIntent, 'chart', 'should include chart');
assertContains(expandedWithIntent, 'graph', 'should include graph');

// Test 18: getDictionaryStats
console.log('\nTest Group: getDictionaryStats');
const stats = getDictionaryStats();
assertGreaterThanOrEqual(stats.synonymEntries, 30, 'should have >= 30 synonym entries');
assertGreaterThan(stats.totalSynonyms, 0, 'should have total synonyms > 0');
assertEquals(stats.intentExpansions, 8, 'should have 8 intent expansions');

// Test 19: Intent-based scenarios
console.log('\nTest Group: Intent-based scenarios');
const dashboardCard = enhanceQuery('card', 'dashboard');
assertContains(dashboardCard.intentTerms, 'metric', 'dashboard + card should have metric');
assertContains(dashboardCard.intentTerms, 'stat', 'dashboard + card should have stat');

const landingButton = enhanceQuery('button', 'landing-page');
assertContains(landingButton.intentTerms, 'cta', 'landing-page + button should have cta');
assertContains(landingButton.intentTerms, 'hero', 'landing-page + button should have hero');

// Test 20: Edge cases
console.log('\nTest Group: Edge cases');
const unknownResult = enhanceQuery('unknown-component-xyz');
assertEquals(unknownResult.originalQuery, 'unknown-component-xyz', 'should preserve unknown query');
assert(unknownResult.confidence < 0.5, 'unknown term should have low confidence');

// Summary
console.log('\n' + '='.repeat(50));
console.log('📊 Test Summary');
console.log('='.repeat(50));
console.log(`Total Tests:  ${totalTests}`);
console.log(`Passed:       ${passedTests} ✓`);
console.log(`Failed:       ${failedTests} ✗`);
console.log(`Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`);
console.log('='.repeat(50));

// Display dictionary stats
console.log('\n📚 Dictionary Statistics:');
console.log('='.repeat(50));
const finalStats = getDictionaryStats();
console.log(`Synonym Entries:     ${finalStats.synonymEntries}`);
console.log(`Total Synonyms:      ${finalStats.totalSynonyms}`);
console.log(`Avg Synonyms/Term:   ${finalStats.averageSynonymsPerTerm}`);
console.log(`Related Term Groups: ${finalStats.relatedTermEntries}`);
console.log(`Intent Expansions:   ${finalStats.intentExpansions}`);
console.log('='.repeat(50));

// Exit with appropriate code
process.exit(failedTests > 0 ? 1 : 0);
