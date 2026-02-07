# User Preference Learning - Quick Reference

## 🚀 Quick Start

```typescript
import { getPreferenceLearner } from '@/lib/mcp';

const learner = getPreferenceLearner();

// Track a selection
learner.trackSelection(component, 'landing-page');

// Get recommendations
const ranked = learner.getPreferredComponents(candidates, 'dashboard');
```

## 📊 Core Methods

### Tracking

```typescript
// Track component selection
learner.trackSelection(component, intent, timestamp?)

// Track framework usage
learner.trackFrameworkUsage(framework, timestamp?)
```

### Recommendations

```typescript
// Get personalized recommendations
learner.getPreferredComponents(candidates, intent?)

// Score individual component
learner.scoreByPreference(component, intent?)
```

### Retrieval

```typescript
// Framework preferences (Map<string, number>)
learner.getFrameworkPreferences()

// Component preferences (Map<string, number>)
learner.getComponentPreferences()

// Intent patterns (string[])
learner.getIntentPatterns()

// Summary statistics
learner.getStats()
```

### Persistence

```typescript
// Export for backup
const backup = learner.exportPreferences()

// Import from backup
learner.loadPreferences(preferences)

// Clear all preferences
learner.clearPreferences()
```

## 🧮 Scoring Algorithm

```
Score = selectionFrequency (40%) +
        recencyBoost (30%) +
        contextAlignment (20%) +
        frameworkFamiliarity (10%)
```

### Time Decay
- Last 7 days: **+20% boost**
- Last 30 days: **+10% boost**
- 30-90 days: No change
- Over 90 days: **-50% penalty**

## 💾 Storage

- **Key**: `'mcp-user-preferences'`
- **Location**: localStorage
- **Auto-save**: On every update
- **Size**: ~10-50KB typical

## 📝 Common Patterns

### Pattern 1: Search with Preferences

```typescript
async function searchWithPreferences(query: string, intent: string) {
  const results = await searchAllServers(query);
  const learner = getPreferenceLearner();
  return learner.getPreferredComponents(results, intent);
}
```

### Pattern 2: Track User Action

```typescript
function onComponentSelect(component: ComponentMetadata) {
  const learner = getPreferenceLearner();
  learner.trackSelection(component, currentIntent);

  // Use component...
}
```

### Pattern 3: Show Personalized Results

```typescript
function PersonalizedResults({ components, intent }) {
  const learner = getPreferenceLearner();
  const ranked = learner.getPreferredComponents(components, intent);

  return ranked.map(comp => <ComponentCard {...comp} />);
}
```

### Pattern 4: Export/Import

```typescript
// Export
const prefs = learner.exportPreferences();
localStorage.setItem('backup', JSON.stringify(prefs));

// Import
const stored = localStorage.getItem('backup');
if (stored) {
  learner.loadPreferences(JSON.parse(stored));
}
```

## 🔍 Debugging

```typescript
// Check stats
const stats = learner.getStats();
console.log('Total selections:', stats.totalSelections);
console.log('Favorite frameworks:', stats.favoriteFrameworks);
console.log('Top components:', stats.topComponents);
console.log('Common intents:', stats.commonIntents);

// Check specific scores
const score = learner.scoreByPreference(component, intent);
console.log('Component score:', score);

// Check framework preferences
const frameworks = learner.getFrameworkPreferences();
frameworks.forEach((score, fw) => {
  console.log(`${fw}: ${(score * 100).toFixed(1)}%`);
});
```

## ⚡ Performance Tips

### Debounce High-Frequency Updates

```typescript
let saveTimeout: NodeJS.Timeout;

function trackDebounced(component, intent) {
  learner.trackSelection(component, intent);

  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    // Force save after delay
  }, 500);
}
```

### Batch Updates

```typescript
// Track multiple selections
const components = [comp1, comp2, comp3];
components.forEach(comp => {
  learner.trackSelection(comp, intent);
});
// Auto-saves after all updates
```

## 🔒 Privacy

**Tracked:**
- ✅ Component names
- ✅ Framework sources
- ✅ Intent labels
- ✅ Timestamps

**NOT Tracked:**
- ❌ Personal info
- ❌ Component content
- ❌ User designs
- ❌ Credentials

## 📚 Learn More

- **Full Documentation**: `PREFERENCE_LEARNING.md`
- **Test Suite**: `__tests__/preference-learner.test.ts`
- **Examples**: `__tests__/preference-learner-examples.ts`
- **Summary**: `PREFERENCE_LEARNING_SUMMARY.md` (root)

## 🧪 Testing

```bash
# Run tests
npx vitest run src/lib/mcp/__tests__/preference-learner.test.ts

# Run examples
npx ts-node src/lib/mcp/__tests__/preference-learner-examples.ts
```

## 🎯 Integration Examples

### With Smart Discovery

```typescript
import { analyzeDiscoveryIntent, getPreferenceLearner } from '@/lib/mcp';

const intent = analyzeDiscoveryIntent(request);
const discovered = await discoverComponents(intent);

const learner = getPreferenceLearner();
const personalized = learner.getPreferredComponents(
  discovered,
  intent.intent
);
```

### With Component Search API

```typescript
// In API route
import { getPreferenceLearner } from '@/lib/mcp';

export async function POST(req: Request) {
  const { query, intent } = await req.json();

  const results = await searchComponents(query);
  const learner = getPreferenceLearner();
  const ranked = learner.getPreferredComponents(results, intent);

  return Response.json({ components: ranked });
}
```

### With React Hook

```typescript
function usePreferences() {
  const learnerRef = useRef(getPreferenceLearner());

  const trackSelection = useCallback((component, intent) => {
    learnerRef.current.trackSelection(component, intent);
  }, []);

  const getRecommendations = useCallback((components, intent) => {
    return learnerRef.current.getPreferredComponents(components, intent);
  }, []);

  return { trackSelection, getRecommendations };
}
```

## 🎨 Example Output

```typescript
const stats = learner.getStats();

// Output:
{
  totalSelections: 42,
  favoriteFrameworks: ['shadcn-ui', 'mui', 'chakra-ui'],
  topComponents: [
    'shadcn-ui:Button',
    'mui:Card',
    'shadcn-ui:Card',
    'magic-ui:Hero',
    'mui:DataTable'
  ],
  commonIntents: ['landing-page', 'dashboard', 'form']
}
```

## ⚙️ Advanced Configuration

### Custom Instance

```typescript
// Create isolated instance
const customLearner = new PreferenceLearner(initialPrefs);

// Use for specific context
customLearner.trackSelection(component, 'admin-panel');
```

### Multi-User Support

```typescript
function getUserLearner(userId: string) {
  const key = `mcp-prefs-${userId}`;
  const stored = localStorage.getItem(key);

  if (stored) {
    return new PreferenceLearner(JSON.parse(stored));
  }

  return new PreferenceLearner();
}
```

## 🐛 Common Issues

### Issue: Preferences not persisting

**Solution**: Check localStorage availability
```typescript
if (typeof window !== 'undefined' && window.localStorage) {
  // Safe to use
}
```

### Issue: Unexpected scores

**Solution**: Check time decay
```typescript
const frameworks = learner.getFrameworkPreferences();
// Old selections get -50% penalty after 90 days
```

### Issue: Same scores for all components

**Solution**: Track more selections first
```typescript
// Need at least 5-10 selections for meaningful scores
for (let i = 0; i < 10; i++) {
  learner.trackSelection(component, intent);
}
```

## 📞 Support

- File issues on GitHub
- Check test suite for examples
- Review full documentation
