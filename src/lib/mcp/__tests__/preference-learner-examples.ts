/**
 * Preference Learning System - Practical Examples
 *
 * This file demonstrates real-world usage scenarios for the preference learning system.
 * Run this file to see the learning algorithm in action.
 */

import { PreferenceLearner } from '../preference-learner';
import type { ComponentMetadata } from '../types';

// ============================================================================
// Mock Component Data
// ============================================================================

const shadcnButton: ComponentMetadata = {
  id: 'shadcn-button',
  name: 'Button',
  displayName: 'Button',
  description: 'A customizable button component with variants',
  category: 'forms',
  tags: ['button', 'input', 'action'],
  source: 'shadcn-ui',
  framework: 'react',
};

const shadcnCard: ComponentMetadata = {
  id: 'shadcn-card',
  name: 'Card',
  displayName: 'Card',
  description: 'A card container for content',
  category: 'data-display',
  tags: ['card', 'container'],
  source: 'shadcn-ui',
  framework: 'react',
};

const muiButton: ComponentMetadata = {
  id: 'mui-button',
  name: 'Button',
  displayName: 'Material Button',
  description: 'Material Design button',
  category: 'forms',
  tags: ['button', 'material'],
  source: 'mui',
  framework: 'react',
};

const muiCard: ComponentMetadata = {
  id: 'mui-card',
  name: 'Card',
  displayName: 'Material Card',
  description: 'Material Design card',
  category: 'data-display',
  tags: ['card', 'material'],
  source: 'mui',
  framework: 'react',
};

const chakraButton: ComponentMetadata = {
  id: 'chakra-button',
  name: 'Button',
  displayName: 'Chakra Button',
  description: 'Chakra UI button with theming',
  category: 'forms',
  tags: ['button', 'chakra'],
  source: 'chakra-ui',
  framework: 'react',
};

const lineChart: ComponentMetadata = {
  id: 'recharts-line',
  name: 'LineChart',
  displayName: 'Line Chart',
  description: 'Interactive line chart for data visualization',
  category: 'charts',
  tags: ['chart', 'graph', 'visualization'],
  source: 'shadcn-ui',
  framework: 'react',
};

const dataTable: ComponentMetadata = {
  id: 'mui-datatable',
  name: 'DataTable',
  displayName: 'Data Table',
  description: 'Feature-rich data table with sorting and filtering',
  category: 'data-display',
  tags: ['table', 'data', 'grid'],
  source: 'mui',
  framework: 'react',
};

const heroSection: ComponentMetadata = {
  id: 'magic-hero',
  name: 'Hero',
  displayName: 'Animated Hero',
  description: 'Eye-catching animated hero section',
  category: 'marketing',
  tags: ['hero', 'landing', 'animated'],
  source: 'magic-ui',
  framework: 'react',
  animations: {
    type: 'framer-motion',
    complexity: 'medium',
  },
};

const pricingCard: ComponentMetadata = {
  id: 'aceternity-pricing',
  name: 'PricingCard',
  displayName: 'Pricing Card',
  description: 'Modern pricing card with hover effects',
  category: 'marketing',
  tags: ['pricing', 'card', 'animated'],
  source: 'aceternity-ui',
  framework: 'react',
  animations: {
    type: 'framer-motion',
    complexity: 'simple',
  },
};

// ============================================================================
// Example 1: Learning Framework Preference
// ============================================================================

export function example1_frameworkPreference() {
  console.log('\n=== Example 1: Learning Framework Preference ===\n');

  const learner = new PreferenceLearner();

  // User consistently chooses Shadcn UI
  console.log('User builds 5 pages using Shadcn UI...');
  for (let i = 0; i < 5; i++) {
    learner.trackSelection(shadcnButton, 'landing-page');
    learner.trackSelection(shadcnCard, 'landing-page');
  }

  // User tries MUI once
  console.log('User tries MUI once...');
  learner.trackSelection(muiButton, 'landing-page');

  // Check learned preferences
  const frameworks = learner.getFrameworkPreferences();
  console.log('\nLearned Framework Preferences:');
  frameworks.forEach((score, framework) => {
    console.log(`  ${framework}: ${(score * 100).toFixed(1)}% preference`);
  });

  // Test recommendation
  const candidates = [shadcnButton, muiButton, chakraButton];
  const preferred = learner.getPreferredComponents(candidates);

  console.log('\nWhen showing buttons, order will be:');
  preferred.forEach((comp, idx) => {
    const score = learner.scoreByPreference(comp);
    console.log(`  ${idx + 1}. ${comp.source} Button (score: ${score.toFixed(3)})`);
  });

  const stats = learner.getStats();
  console.log('\nStatistics:');
  console.log(`  Total selections: ${stats.totalSelections}`);
  console.log(`  Favorite framework: ${stats.favoriteFrameworks[0]}`);
}

// ============================================================================
// Example 2: Learning Intent Patterns
// ============================================================================

export function example2_intentPatterns() {
  console.log('\n=== Example 2: Learning Intent Patterns ===\n');

  const learner = new PreferenceLearner();

  // User builds multiple dashboards
  console.log('User builds 3 dashboards...');
  for (let i = 0; i < 3; i++) {
    learner.trackSelection(lineChart, 'dashboard');
    learner.trackSelection(dataTable, 'dashboard');
    learner.trackSelection(shadcnCard, 'dashboard');
  }

  // User builds 2 landing pages
  console.log('User builds 2 landing pages...');
  for (let i = 0; i < 2; i++) {
    learner.trackSelection(heroSection, 'landing-page');
    learner.trackSelection(pricingCard, 'landing-page');
  }

  // Check patterns
  const intents = learner.getIntentPatterns();
  console.log('\nCommon Intent Patterns:');
  intents.forEach(intent => console.log(`  - ${intent}`));

  // Test context-aware recommendation
  console.log('\n--- When building a DASHBOARD ---');
  const dashboardCandidates = [lineChart, dataTable, heroSection];
  const dashboardPreferred = learner.getPreferredComponents(
    dashboardCandidates,
    'dashboard'
  );

  dashboardPreferred.forEach((comp, idx) => {
    const score = learner.scoreByPreference(comp, 'dashboard');
    console.log(`  ${idx + 1}. ${comp.name} (score: ${score.toFixed(3)})`);
  });

  console.log('\n--- When building a LANDING PAGE ---');
  const landingCandidates = [lineChart, heroSection, pricingCard];
  const landingPreferred = learner.getPreferredComponents(
    landingCandidates,
    'landing-page'
  );

  landingPreferred.forEach((comp, idx) => {
    const score = learner.scoreByPreference(comp, 'landing-page');
    console.log(`  ${idx + 1}. ${comp.name} (score: ${score.toFixed(3)})`);
  });
}

// ============================================================================
// Example 3: Time Decay in Action
// ============================================================================

export function example3_timeDecay() {
  console.log('\n=== Example 3: Time Decay in Action ===\n');

  const learner = new PreferenceLearner();

  // Recent usage (today)
  const today = new Date();
  console.log('Using Button today...');
  learner.trackSelection(shadcnButton, 'app', today);

  // Usage 15 days ago
  const fifteenDaysAgo = new Date(Date.now() - 15 * 24 * 60 * 60 * 1000);
  console.log('Using Card 15 days ago...');
  learner.trackSelection(shadcnCard, 'app', fifteenDaysAgo);

  // Usage 100 days ago (old)
  const hundredDaysAgo = new Date(Date.now() - 100 * 24 * 60 * 60 * 1000);
  console.log('Using DataTable 100 days ago...');
  learner.trackSelection(dataTable, 'app', hundredDaysAgo);

  // Compare scores
  console.log('\nComponent Scores (with time decay):');
  const buttonScore = learner.scoreByPreference(shadcnButton);
  const cardScore = learner.scoreByPreference(shadcnCard);
  const tableScore = learner.scoreByPreference(dataTable);

  console.log(`  Button (today): ${buttonScore.toFixed(3)} ⬆️ +20% recency boost`);
  console.log(`  Card (15 days ago): ${cardScore.toFixed(3)} ⬆️ +10% recency boost`);
  console.log(`  DataTable (100 days ago): ${tableScore.toFixed(3)} ⬇️ -50% decay penalty`);
}

// ============================================================================
// Example 4: Frequency vs Recency
// ============================================================================

export function example4_frequencyVsRecency() {
  console.log('\n=== Example 4: Frequency vs Recency ===\n');

  const learner = new PreferenceLearner();

  // Component A: Used frequently but long ago
  const twoMonthsAgo = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);
  console.log('Button: Used 10 times, but 2 months ago...');
  for (let i = 0; i < 10; i++) {
    learner.trackSelection(shadcnButton, 'app', twoMonthsAgo);
  }

  // Component B: Used less but recently
  console.log('Card: Used 3 times, all in the last week...');
  for (let i = 0; i < 3; i++) {
    learner.trackSelection(shadcnCard, 'app', new Date());
  }

  // Compare scores
  const buttonScore = learner.scoreByPreference(shadcnButton);
  const cardScore = learner.scoreByPreference(shadcnCard);

  console.log('\nScores:');
  console.log(`  Button (high frequency, old): ${buttonScore.toFixed(3)}`);
  console.log(`  Card (lower frequency, recent): ${cardScore.toFixed(3)}`);

  if (cardScore > buttonScore) {
    console.log('\n✨ Recency wins! Recent usage matters more than old frequency.');
  } else {
    console.log('\n📊 Frequency wins! Long-term usage patterns dominate.');
  }
}

// ============================================================================
// Example 5: Animation Preference Learning
// ============================================================================

export function example5_animationPreference() {
  console.log('\n=== Example 5: Animation Preference Learning ===\n');

  const learner = new PreferenceLearner();

  console.log('User consistently chooses animated components...');
  learner.trackSelection(heroSection, 'landing-page');
  learner.trackSelection(pricingCard, 'landing-page');
  learner.trackSelection(heroSection, 'marketing');
  learner.trackSelection(pricingCard, 'marketing');

  const prefs = learner.exportPreferences();
  console.log('\nLearned Pattern:');
  console.log(`  Prefers animated: ${prefs.patterns.preferAnimated ? 'Yes ✨' : 'No'}`);
  console.log(`  Prefers simple: ${prefs.patterns.preferSimple ? 'Yes' : 'No'}`);
}

// ============================================================================
// Example 6: Real-World Workflow Simulation
// ============================================================================

export function example6_realWorldWorkflow() {
  console.log('\n=== Example 6: Real-World Workflow Simulation ===\n');

  const learner = new PreferenceLearner();

  // Week 1: User explores different frameworks
  console.log('Week 1: Exploring different frameworks...');
  learner.trackSelection(shadcnButton, 'app');
  learner.trackSelection(muiCard, 'app');
  learner.trackSelection(chakraButton, 'app');

  // Week 2: User settles on Shadcn UI
  console.log('Week 2: Settling on Shadcn UI...');
  for (let i = 0; i < 5; i++) {
    learner.trackSelection(shadcnButton, 'landing-page');
    learner.trackSelection(shadcnCard, 'landing-page');
  }

  // Week 3: User builds dashboards
  console.log('Week 3: Building dashboards...');
  for (let i = 0; i < 3; i++) {
    learner.trackSelection(lineChart, 'dashboard');
    learner.trackSelection(dataTable, 'dashboard');
  }

  // Week 4: Back to landing pages
  console.log('Week 4: Back to landing pages...');
  learner.trackSelection(heroSection, 'landing-page');
  learner.trackSelection(pricingCard, 'landing-page');

  // Summary
  const stats = learner.getStats();
  console.log('\n=== After 4 Weeks ===');
  console.log(`Total components used: ${stats.totalSelections}`);
  console.log(`Favorite frameworks: ${stats.favoriteFrameworks.join(', ')}`);
  console.log(`Top components: ${stats.topComponents.slice(0, 3).join(', ')}`);
  console.log(`Common intents: ${stats.commonIntents.join(', ')}`);

  // Test recommendation for new landing page
  console.log('\n--- Building a NEW landing page ---');
  const candidates = [
    shadcnButton,
    muiButton,
    heroSection,
    lineChart,
    pricingCard,
  ];
  const recommended = learner.getPreferredComponents(candidates, 'landing-page');

  console.log('Recommended components (in order):');
  recommended.slice(0, 3).forEach((comp, idx) => {
    const score = learner.scoreByPreference(comp, 'landing-page');
    console.log(`  ${idx + 1}. ${comp.name} from ${comp.source} (score: ${score.toFixed(3)})`);
  });

  // Export for backup
  const backup = learner.exportPreferences();
  console.log(`\n📦 Preferences exported (${JSON.stringify(backup).length} bytes)`);
}

// ============================================================================
// Example 7: Component Similarity Grouping
// ============================================================================

export function example7_componentGrouping() {
  console.log('\n=== Example 7: Component Type Preferences ===\n');

  const learner = new PreferenceLearner();

  // User loves buttons from Shadcn
  console.log('User frequently uses Shadcn buttons...');
  for (let i = 0; i < 8; i++) {
    learner.trackSelection(shadcnButton, 'app');
  }

  // Occasionally uses MUI buttons
  console.log('Sometimes uses MUI buttons...');
  for (let i = 0; i < 2; i++) {
    learner.trackSelection(muiButton, 'app');
  }

  // Check component preferences
  const componentPrefs = learner.getComponentPreferences();
  console.log('\nComponent Usage Count:');
  componentPrefs.forEach((count, component) => {
    console.log(`  ${component}: ${count} times`);
  });

  // When showing button options
  const buttonCandidates = [shadcnButton, muiButton, chakraButton];
  const ranked = learner.getPreferredComponents(buttonCandidates);

  console.log('\nButton Recommendations:');
  ranked.forEach((btn, idx) => {
    const score = learner.scoreByPreference(btn);
    console.log(`  ${idx + 1}. ${btn.source} (score: ${score.toFixed(3)})`);
  });
}

// ============================================================================
// Example 8: Export and Import (Session Persistence)
// ============================================================================

export function example8_sessionPersistence() {
  console.log('\n=== Example 8: Session Persistence ===\n');

  // Session 1: Build up preferences
  console.log('Session 1: Building preferences...');
  const learner1 = new PreferenceLearner();
  learner1.trackSelection(shadcnButton, 'landing-page');
  learner1.trackSelection(shadcnCard, 'landing-page');
  learner1.trackSelection(heroSection, 'landing-page');

  const stats1 = learner1.getStats();
  console.log(`  Tracked ${stats1.totalSelections} selections`);

  // Export
  const exported = learner1.exportPreferences();
  console.log('  Preferences exported ✅');

  // Simulate page reload / new session
  console.log('\nSimulating page reload...');

  // Session 2: Import preferences
  console.log('Session 2: Loading preferences...');
  const learner2 = new PreferenceLearner(exported);

  const stats2 = learner2.getStats();
  console.log(`  Restored ${stats2.totalSelections} selections ✅`);
  console.log(`  Favorite frameworks: ${stats2.favoriteFrameworks.join(', ')}`);

  // Continue tracking in new session
  learner2.trackSelection(pricingCard, 'landing-page');
  console.log(`\n  New selection tracked`);
  console.log(`  Total now: ${learner2.getStats().totalSelections} selections`);
}

// ============================================================================
// Run All Examples
// ============================================================================

export function runAllExamples() {
  console.clear();
  console.log('╔═══════════════════════════════════════════════════════════╗');
  console.log('║   User Preference Learning System - Practical Examples   ║');
  console.log('╚═══════════════════════════════════════════════════════════╝');

  example1_frameworkPreference();
  example2_intentPatterns();
  example3_timeDecay();
  example4_frequencyVsRecency();
  example5_animationPreference();
  example6_realWorldWorkflow();
  example7_componentGrouping();
  example8_sessionPersistence();

  console.log('\n╔═══════════════════════════════════════════════════════════╗');
  console.log('║                    Examples Complete!                     ║');
  console.log('╚═══════════════════════════════════════════════════════════╝\n');
}

// Run if executed directly
if (require.main === module) {
  runAllExamples();
}
