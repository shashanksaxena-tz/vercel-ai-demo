# User Preference Learning System

## Overview

The User Preference Learning System tracks user component selections and learns preferences to provide personalized component recommendations. It uses a weighted scoring algorithm with time decay to prioritize recently-used and frequently-selected components.

## Features

- **Component Selection Tracking**: Records every component the user selects
- **Framework Preference Learning**: Identifies preferred UI frameworks (Shadcn, MUI, Chakra, etc.)
- **Intent Pattern Recognition**: Learns common use cases (landing pages, dashboards, forms)
- **Animation & Complexity Preferences**: Tracks preferences for animated vs static, simple vs complex components
- **Time Decay**: Boosts recent selections, decays old ones
- **Persistent Storage**: Saves preferences to localStorage
- **Privacy-First**: Only stores component names and timestamps, no personal information

## Installation

```typescript
import {
  PreferenceLearner,
  getPreferenceLearner,
  createPreferenceLearner
} from '@/lib/mcp';
```

## Core API

### Creating a Learner

```typescript
// Singleton instance (recommended for client apps)
const learner = getPreferenceLearner();

// Or create new instance
const learner = new PreferenceLearner();

// With initial preferences
const learner = new PreferenceLearner(existingPreferences);
```

### Tracking Selections

```typescript
import { ComponentMetadata } from '@/lib/mcp/types';

const component: ComponentMetadata = {
  id: 'shadcn-button',
  name: 'Button',
  displayName: 'Button',
  category: 'forms',
  source: 'shadcn-ui',
  // ... other metadata
};

// Track a component selection
learner.trackSelection(component, 'landing-page');

// Track framework usage independently
learner.trackFrameworkUsage('shadcn-ui');
```

### Getting Recommendations

```typescript
// Get all candidates sorted by preference
const candidates = [...]; // Array of ComponentMetadata
const preferred = learner.getPreferredComponents(candidates);

// With intent context for better scoring
const preferred = learner.getPreferredComponents(candidates, 'dashboard');

// Score individual component
const score = learner.scoreByPreference(component, 'dashboard');
```

### Retrieving Preferences

```typescript
// Get framework preferences (sorted by score)
const frameworks = learner.getFrameworkPreferences();
// Map { 'shadcn-ui' => 0.8, 'mui' => 0.6, ... }

// Get component preferences (sorted by usage)
const components = learner.getComponentPreferences();
// Map { 'shadcn-ui:Button' => 15, 'mui:Card' => 8, ... }

// Get intent patterns
const intents = learner.getIntentPatterns();
// ['landing-page', 'dashboard', 'form']

// Get summary statistics
const stats = learner.getStats();
// {
//   totalSelections: 42,
//   favoriteFrameworks: ['shadcn-ui', 'mui', 'chakra-ui'],
//   topComponents: ['shadcn-ui:Button', 'mui:Card', ...],
//   commonIntents: ['landing-page', 'dashboard']
// }
```

## Learning Algorithm

The system uses a weighted scoring algorithm:

```typescript
preferenceScore = (
  selectionFrequency * 0.4 +     // How often used?
  recencyBoost * 0.3 +            // Used recently?
  contextAlignment * 0.2 +        // Fits current intent?
  frameworkFamiliarity * 0.1      // Familiar framework?
);
```

### Scoring Components

**Selection Frequency (40% weight)**
- Normalized by usage count: `min(useCount / 10, 1.0)`
- More uses = higher score

**Recency Boost (30% weight)**
- Last 7 days: +20% boost
- Last 30 days: +10% boost
- 30-90 days: No change
- Over 90 days: -50% penalty (decay)

**Context Alignment (20% weight)**
- 1.0 if component was used in same intent
- 0.0 otherwise

**Framework Familiarity (10% weight)**
- Based on framework preference score
- Calculated from framework usage frequency and recency

## Time Decay

The system applies time decay to prevent stale preferences:

```typescript
// Recent usage (last 7 days)
score *= 1.2  // +20% boost

// Medium recent (8-30 days)
score *= 1.1  // +10% boost

// Old (31-90 days)
// No change

// Very old (>90 days)
score *= 0.5  // -50% penalty
```

## Data Structure

```typescript
interface UserPreferences {
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
```

## Persistence

### Automatic Persistence

Preferences are automatically saved to localStorage on every update:

```typescript
learner.trackSelection(component, intent);
// Automatically saves to localStorage key: 'mcp-user-preferences'
```

### Manual Export/Import

```typescript
// Export for backup
const backup = learner.exportPreferences();
const json = JSON.stringify(backup);
localStorage.setItem('backup', json);

// Import from backup
const restored = JSON.parse(localStorage.getItem('backup'));
learner.loadPreferences(restored);
```

### Clear Preferences

```typescript
// Reset all preferences
learner.clearPreferences();
```

## Usage Examples

### Example 1: Basic Tracking

```typescript
import { getPreferenceLearner } from '@/lib/mcp';

const learner = getPreferenceLearner();

// User builds a landing page
learner.trackSelection(buttonComponent, 'landing-page');
learner.trackSelection(heroComponent, 'landing-page');
learner.trackSelection(pricingCardComponent, 'landing-page');

// Later, get stats
const stats = learner.getStats();
console.log(stats.commonIntents); // ['landing-page']
console.log(stats.favoriteFrameworks); // e.g., ['shadcn-ui']
```

### Example 2: Personalized Recommendations

```typescript
// User has built several dashboards
for (let i = 0; i < 5; i++) {
  learner.trackSelection(lineChartComponent, 'dashboard');
  learner.trackSelection(dataTableComponent, 'dashboard');
}

// Now user wants to build another dashboard
const allComponents = await searchComponents('chart');

// Get personalized recommendations
const recommended = learner.getPreferredComponents(
  allComponents,
  'dashboard' // Current intent
);

// recommended[0] will likely be LineChart or DataTable
// because user frequently uses them for dashboards
```

### Example 3: Framework Preference

```typescript
// User consistently chooses Shadcn UI
for (let i = 0; i < 10; i++) {
  learner.trackSelection(shadcnButton, 'app');
  learner.trackSelection(shadcnCard, 'app');
}

// One-time MUI usage
learner.trackSelection(muiButton, 'app');

// Get framework preferences
const frameworks = learner.getFrameworkPreferences();
const top = Array.from(frameworks.keys())[0];
console.log(top); // 'shadcn-ui'

// When showing mixed results, Shadcn components will rank higher
```

### Example 4: Component Search with Preferences

```typescript
async function searchWithPreferences(query: string, intent: string) {
  // Search MCP servers
  const results = await searchAllServers(query);

  // Get learner
  const learner = getPreferenceLearner();

  // Sort by preference
  const personalized = learner.getPreferredComponents(results, intent);

  return personalized;
}

// Usage
const components = await searchWithPreferences('button', 'landing-page');
// Returns buttons sorted by user's preferences
```

### Example 5: Integration with Smart Discovery

```typescript
import {
  analyzeDiscoveryIntent,
  prioritizeComponents,
  getPreferenceLearner
} from '@/lib/mcp';

async function discoverWithPreferences(userRequest: string) {
  // Analyze intent
  const intent = analyzeDiscoveryIntent(userRequest);

  // Discover components
  const discovered = await discoverComponents(intent);

  // Prioritize by relevance
  const prioritized = prioritizeComponents(discovered, intent);

  // Apply user preferences
  const learner = getPreferenceLearner();
  const personalized = learner.getPreferredComponents(
    prioritized.map(p => p.component),
    intent.intent
  );

  return personalized;
}
```

### Example 6: Migration & Backup

```typescript
// Before app update
const backup = learner.exportPreferences();
sessionStorage.setItem('prefs-backup', JSON.stringify(backup));

// After app update
const restored = sessionStorage.getItem('prefs-backup');
if (restored) {
  learner.loadPreferences(JSON.parse(restored));
  sessionStorage.removeItem('prefs-backup');
}
```

## Privacy & Security

### What is Tracked

- Component names (e.g., "Button", "Card")
- Framework sources (e.g., "shadcn-ui", "mui")
- Intent labels (e.g., "landing-page", "dashboard")
- Timestamps (Date objects)

### What is NOT Tracked

- User identifiable information
- Component content or props
- Actual UI designs
- User input data
- API keys or credentials

### Data Control

```typescript
// User can clear anytime
learner.clearPreferences();

// User can export their data
const myData = learner.exportPreferences();
console.log(myData); // Transparent data structure
```

## Performance Considerations

### Memory

- Preferences stored in memory: ~10-50KB typical
- localStorage limit: 5-10MB (plenty of room)

### Computation

- Scoring: O(n) where n = number of candidates
- Typical operation: <1ms for 100 components

### Storage

- Auto-save on every selection
- Debouncing recommended for high-frequency apps:

```typescript
let saveTimeout: NodeJS.Timeout;

function trackSelectionDebounced(component, intent) {
  learner.trackSelection(component, intent);

  // Debounce localStorage write
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    const prefs = learner.exportPreferences();
    localStorage.setItem('mcp-user-preferences', JSON.stringify(prefs));
  }, 500);
}
```

## Testing

Run the comprehensive test suite:

```bash
npx vitest run src/lib/mcp/__tests__/preference-learner.test.ts
```

Test coverage:
- 35 test scenarios
- Initialization, tracking, retrieval
- Scoring algorithm validation
- Time decay verification
- Persistence workflows
- Edge cases and error handling

## Advanced Usage

### Custom Scoring Weights

If you need different weights, extend the class:

```typescript
class CustomPreferenceLearner extends PreferenceLearner {
  scoreByPreference(component: ComponentMetadata, intent?: string): number {
    // Custom weights
    const frequencyWeight = 0.5;
    const recencyWeight = 0.3;
    const contextWeight = 0.1;
    const frameworkWeight = 0.1;

    // Apply custom logic
    // ...
  }
}
```

### Multi-User Support

For apps with multiple users:

```typescript
function getPreferenceLearnerForUser(userId: string) {
  const key = `mcp-preferences-${userId}`;
  const stored = localStorage.getItem(key);

  if (stored) {
    return new PreferenceLearner(JSON.parse(stored));
  }

  return new PreferenceLearner();
}
```

### Analytics Integration

```typescript
learner.trackSelection(component, intent);

// Send to analytics
analytics.track('Component Selected', {
  component: component.name,
  framework: component.source,
  intent,
  preferenceScore: learner.scoreByPreference(component),
});
```

## Future Enhancements

Planned features for future releases:

- Collaborative filtering (learn from similar users)
- A/B testing support
- Component pair learning (buttons + cards often together)
- Seasonal pattern detection
- Export to JSON/CSV for analysis
- Preference visualization dashboard

## Support

For issues or questions:
- Check test suite for usage examples
- Review this documentation
- File an issue on GitHub

## License

MIT
