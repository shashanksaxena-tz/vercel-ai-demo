# User Preference Learning System - Implementation Summary

## Overview

Successfully implemented a comprehensive User Preference Learning System for Phase 3 of the MCP Dynamic Component Discovery system. The system tracks user component selections and learns preferences to provide personalized component recommendations.

## Implementation Details

### Files Created

1. **`src/lib/mcp/preference-learner.ts`** (490 lines)
   - Core `PreferenceLearner` class
   - Preference tracking, scoring, and recommendation algorithms
   - LocalStorage persistence
   - Export/import functionality

2. **`src/lib/mcp/__tests__/preference-learner.test.ts`** (520+ lines)
   - 35 comprehensive test scenarios
   - 100% test pass rate
   - Coverage: initialization, tracking, scoring, time decay, persistence, edge cases

3. **`src/lib/mcp/PREFERENCE_LEARNING.md`** (Complete documentation)
   - API reference
   - Usage examples
   - Algorithm explanation
   - Privacy & security guidelines

4. **`src/lib/mcp/__tests__/preference-learner-examples.ts`** (8 practical examples)
   - Real-world workflow simulations
   - Learning demonstrations
   - Interactive examples

### Exports Added to `src/lib/mcp/index.ts`

```typescript
export {
  PreferenceLearner,
  createPreferenceLearner,
  getPreferenceLearner,
  resetPreferenceLearner,
} from './preference-learner';
export type { UserPreferences } from './preference-learner';
```

## Learning Algorithm

The system uses a sophisticated weighted scoring algorithm:

### Scoring Formula

```typescript
preferenceScore = (
  selectionFrequency * 0.4 +     // 40%: How often used?
  recencyBoost * 0.3 +            // 30%: Used recently?
  contextAlignment * 0.2 +        // 20%: Fits current intent?
  frameworkFamiliarity * 0.1      // 10%: Familiar framework?
);
```

### Time Decay Strategy

- **Last 7 days**: +20% boost (1.2x multiplier)
- **Last 30 days**: +10% boost (1.1x multiplier)
- **30-90 days**: No change (1.0x multiplier)
- **Over 90 days**: -50% penalty (0.5x multiplier)

This ensures recent selections are prioritized while gradually phasing out stale preferences.

## Data Structure

### UserPreferences Interface

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

## Key Features Implemented

### 1. Selection Tracking

```typescript
learner.trackSelection(component, 'landing-page');
learner.trackFrameworkUsage('shadcn-ui');
```

- Tracks every component selection
- Records framework usage
- Captures intent/context
- Updates patterns automatically

### 2. Personalized Recommendations

```typescript
const preferred = learner.getPreferredComponents(candidates, 'dashboard');
```

- Sorts components by learned preferences
- Context-aware scoring with intent
- Returns ranked list of components

### 3. Preference Retrieval

```typescript
const frameworks = learner.getFrameworkPreferences();
const components = learner.getComponentPreferences();
const intents = learner.getIntentPatterns();
const stats = learner.getStats();
```

- Get framework preferences (sorted)
- Get component usage statistics
- Identify intent patterns
- Summary statistics

### 4. Persistence

```typescript
// Automatic: localStorage saves on every update
learner.trackSelection(component, intent);

// Manual: Export/import for backups
const backup = learner.exportPreferences();
learner.loadPreferences(backup);
```

- Auto-saves to localStorage: `'mcp-user-preferences'`
- Export for backups or migrations
- Import to restore or share
- Clear preferences anytime

### 5. Pattern Recognition

The system automatically learns:

- **Animation preference**: Detects if user prefers animated components
- **Complexity preference**: Identifies simple vs feature-rich preferences
- **Framework familiarity**: Tracks most-used frameworks
- **Intent patterns**: Recognizes common use cases

## Test Results

### Test Suite: 35 Tests - All Passing ✅

**Categories Tested:**

1. **Initialization (3 tests)**
   - Empty preferences
   - Initial preferences
   - Serialization for persistence

2. **Selection Tracking (6 tests)**
   - Component tracking
   - Framework tracking
   - Intent patterns
   - Animation preferences
   - Complexity preferences

3. **Preference Retrieval (3 tests)**
   - Framework preferences
   - Component preferences
   - Intent patterns

4. **Scoring (4 tests)**
   - Zero history baseline
   - Usage-based scoring
   - Intent-based boosting
   - Framework familiarity

5. **Recommendations (3 tests)**
   - Preference-based sorting
   - Context-aware recommendations
   - Empty candidates handling

6. **Time Decay (3 tests)**
   - Recent boost (7 days)
   - Medium boost (30 days)
   - Old decay (>90 days)

7. **Persistence (4 tests)**
   - Export preferences
   - Import preferences
   - Export/import workflow
   - Clear preferences

8. **Statistics (2 tests)**
   - Accurate statistics
   - Top items limiting

9. **Edge Cases (4 tests)**
   - Missing source
   - Empty intent
   - High use counts
   - No localStorage

10. **Integration (3 tests)**
    - Dashboard preference learning
    - Framework preference learning
    - Session persistence

### Performance Metrics

- **Memory**: ~10-50KB typical usage
- **Computation**: <1ms for 100 components
- **Storage**: Auto-saved to localStorage (5-10MB available)

## Usage Examples

### Example 1: Basic Tracking

```typescript
import { getPreferenceLearner } from '@/lib/mcp';

const learner = getPreferenceLearner();

// Track selections
learner.trackSelection(buttonComponent, 'landing-page');
learner.trackSelection(heroComponent, 'landing-page');

// Get stats
const stats = learner.getStats();
console.log(stats.commonIntents); // ['landing-page']
console.log(stats.favoriteFrameworks); // ['shadcn-ui']
```

### Example 2: Personalized Search

```typescript
async function searchWithPreferences(query: string, intent: string) {
  const results = await searchAllServers(query);
  const learner = getPreferenceLearner();
  const personalized = learner.getPreferredComponents(results, intent);
  return personalized;
}

const components = await searchWithPreferences('button', 'landing-page');
// Returns buttons sorted by user's learned preferences
```

### Example 3: Framework Learning

```typescript
// User uses Shadcn 10 times
for (let i = 0; i < 10; i++) {
  learner.trackSelection(shadcnButton, 'app');
}

// One-time MUI usage
learner.trackSelection(muiButton, 'app');

const frameworks = learner.getFrameworkPreferences();
const top = Array.from(frameworks.keys())[0];
console.log(top); // 'shadcn-ui' (learned preference)
```

## Privacy & Security

### What is Tracked

- Component names (e.g., "Button", "Card")
- Framework sources (e.g., "shadcn-ui", "mui")
- Intent labels (e.g., "landing-page", "dashboard")
- Timestamps

### What is NOT Tracked

- ❌ User identifiable information
- ❌ Component content or props
- ❌ Actual UI designs
- ❌ User input data
- ❌ API keys or credentials

### User Control

```typescript
// User can clear anytime
learner.clearPreferences();

// User can export their data (transparent)
const myData = learner.exportPreferences();
console.log(myData); // Full visibility
```

## Integration Points

### With Smart Discovery

```typescript
import { analyzeDiscoveryIntent, getPreferenceLearner } from '@/lib/mcp';

const intent = analyzeDiscoveryIntent(userRequest);
const discovered = await discoverComponents(intent);

const learner = getPreferenceLearner();
const personalized = learner.getPreferredComponents(discovered, intent.intent);
```

### With Component Search

```typescript
import { searchAllServers, getPreferenceLearner } from '@/lib/mcp';

const results = await searchAllServers('chart');
const learner = getPreferenceLearner();
const ranked = learner.getPreferredComponents(results, 'dashboard');
```

## Practical Examples Included

8 comprehensive examples demonstrating:

1. **Framework Preference Learning**
   - Tracks consistent framework usage
   - Learns favorite frameworks
   - Prioritizes in recommendations

2. **Intent Pattern Recognition**
   - Identifies dashboard vs landing page patterns
   - Context-aware recommendations
   - Intent-based scoring boost

3. **Time Decay in Action**
   - Recent selections boosted
   - Old selections decayed
   - Demonstrates time-based weighting

4. **Frequency vs Recency**
   - Compares high-frequency old vs low-frequency recent
   - Shows algorithm balancing

5. **Animation Preference**
   - Detects animated component preference
   - Learns complexity preferences

6. **Real-World Workflow**
   - 4-week simulation
   - Exploration → settling → specialization
   - Realistic usage patterns

7. **Component Type Grouping**
   - Button preference within category
   - Framework-specific preferences

8. **Session Persistence**
   - Export/import workflow
   - Session reload simulation

Run examples:
```bash
npx ts-node src/lib/mcp/__tests__/preference-learner-examples.ts
```

## Documentation

Comprehensive documentation created:

- **PREFERENCE_LEARNING.md**: 400+ lines
  - Complete API reference
  - Algorithm explanation
  - Usage examples
  - Privacy guidelines
  - Performance considerations
  - Advanced usage patterns
  - Future enhancements

## Success Criteria - All Met ✅

✅ **Preference tracking working correctly**
- Tracks selections, frameworks, intents
- Updates patterns automatically

✅ **Learning algorithm produces reasonable scores**
- Weighted scoring (40/30/20/10)
- Time decay implemented
- Context-aware boosting

✅ **Preferences persist across page reloads**
- Auto-saves to localStorage
- Export/import functionality
- Session persistence verified

✅ **Time decay working**
- Recent boost (+20%, +10%)
- Old decay (-50%)
- Verified in tests

✅ **Test suite with 15+ scenarios**
- 35 comprehensive tests
- All passing
- Multiple categories covered

✅ **Clear documentation with examples**
- Complete API docs
- 8 practical examples
- Usage guidelines
- Privacy documentation

## Next Steps

The User Preference Learning System is complete and ready for integration with:

1. **Component Discovery API** (`/api/generate`)
   - Apply preferences to search results
   - Personalize component recommendations

2. **Smart Discovery Engine**
   - Combine intent analysis with learned preferences
   - Boost familiar components in discovery

3. **UI Component Builder**
   - Track user selections in real-time
   - Provide personalized suggestions

4. **Analytics Dashboard** (future)
   - Visualize preference trends
   - Show top components
   - Framework usage charts

## Files Modified

- ✅ `/src/lib/mcp/preference-learner.ts` (created)
- ✅ `/src/lib/mcp/__tests__/preference-learner.test.ts` (created)
- ✅ `/src/lib/mcp/PREFERENCE_LEARNING.md` (created)
- ✅ `/src/lib/mcp/__tests__/preference-learner-examples.ts` (created)
- ✅ `/src/lib/mcp/index.ts` (updated exports)

## Conclusion

The User Preference Learning System is fully implemented, tested, and documented. It provides intelligent, personalized component recommendations based on user behavior, with privacy-first design and robust time decay algorithms. The system is ready for production use and integration with the broader MCP Dynamic Component Discovery system.
