# Query Enhancement Engine - Usage Guide

## Overview

The Query Enhancement Engine is an intelligent system that expands user search queries with synonyms, related terms, and intent-based refinements to improve component discovery accuracy and coverage in the MCP Dynamic Component Discovery system.

## Features

✅ **Comprehensive Synonym Dictionary** - 69 component types with 318 synonyms
✅ **Intent-Based Expansion** - Supports all 8 intent categories
✅ **Related Terms** - 11 component groups with contextual relationships
✅ **Confidence Scoring** - Quality metrics for each enhancement
✅ **Batch Processing** - Enhance multiple queries at once
✅ **Flexible Options** - Configurable synonym limits, confidence thresholds

## Installation

The Query Enhancement Engine is part of the MCP library. Import from:

```typescript
import {
  enhanceQuery,
  enhanceQueries,
  getSynonyms,
  getRelatedTerms,
  getIntentTerms,
  expandSearchQuery,
  mergeEnhancements,
  getDictionaryStats,
} from '@/lib/mcp';
```

## Quick Start

### Basic Query Enhancement

```typescript
import { enhanceQuery } from '@/lib/mcp';

// Enhance a simple query
const result = enhanceQuery('button');

console.log(result.enhancedQueries);
// Output: ['button', 'cta', 'action', 'submit', 'button-group', 'btn']

console.log(result.confidence);
// Output: 1.0 (high confidence - known term with synonyms)
```

### Intent-Based Enhancement

```typescript
// Enhance with dashboard intent
const dashboardButton = enhanceQuery('button', 'dashboard');

console.log(dashboardButton.enhancedQueries);
// Output: ['button', 'cta', 'action', 'submit', 'button-group',
//          'chart-button', 'metric-button', 'stat-button', ...]

console.log(dashboardButton.intentTerms);
// Output: ['chart', 'graph', 'metric', 'stat', 'kpi', ...]
```

### Batch Enhancement

```typescript
import { enhanceQueries, mergeEnhancements } from '@/lib/mcp';

// Enhance multiple queries at once
const results = enhanceQueries(['button', 'card', 'chart'], 'dashboard');

// Merge all enhanced queries into a unique list
const allQueries = mergeEnhancements(results);

console.log(allQueries);
// Output: ['button', 'cta', 'card', 'panel', 'chart', 'graph',
//          'metric-button', 'stat-card', ...]
```

## API Reference

### `enhanceQuery(query, intent?, options?)`

Enhance a single search query with synonyms and intent-based expansions.

**Parameters:**
- `query: string` - The search query to enhance
- `intent?: string` - Optional intent category (dashboard, landing-page, form, etc.)
- `options?: QueryEnhancerOptions` - Configuration options

**Returns:** `QueryEnhancement`

```typescript
interface QueryEnhancement {
  originalQuery: string;      // Original input
  enhancedQueries: string[];  // All query variations
  synonyms: string[];         // Direct synonyms
  relatedTerms: string[];     // Contextually related terms
  intentTerms: string[];      // Intent-specific additions
  confidence: number;         // Quality score (0-1)
}
```

**Options:**

```typescript
interface QueryEnhancerOptions {
  maxSynonyms?: number;        // Max synonyms to include (default: 5)
  includeRelated?: boolean;    // Include related terms (default: true)
  minConfidence?: number;      // Min confidence threshold (default: 0.3)
  useIntentExpansion?: boolean; // Enable intent expansion (default: true)
}
```

**Examples:**

```typescript
// Limit synonyms
const limited = enhanceQuery('button', undefined, { maxSynonyms: 3 });

// Disable related terms
const noRelated = enhanceQuery('form', undefined, { includeRelated: false });

// Set confidence threshold
const highConfidence = enhanceQuery('chart', undefined, { minConfidence: 0.8 });
```

### `getSynonyms(term)`

Get direct synonyms for a component term.

```typescript
const synonyms = getSynonyms('button');
// Returns: ['cta', 'action', 'submit', 'button-group', 'btn', 'action-button']

const chartSynonyms = getSynonyms('chart');
// Returns: ['graph', 'visualization', 'plot', 'diagram', 'viz', 'data-viz']
```

### `getRelatedTerms(term)`

Get conceptually related component terms.

```typescript
const formRelated = getRelatedTerms('form');
// Returns: ['input', 'select', 'checkbox', 'radio', 'button', 'validation', 'error']

const tableRelated = getRelatedTerms('table');
// Returns: ['pagination', 'search', 'filter', 'sort', 'checkbox']
```

### `getIntentTerms(intent)`

Get terms associated with a specific intent category.

```typescript
const dashboardTerms = getIntentTerms('dashboard');
// Returns: ['chart', 'graph', 'metric', 'stat', 'kpi', 'data-viz', 'analytics', 'visualization']

const landingTerms = getIntentTerms('landing-page');
// Returns: ['hero', 'cta', 'feature', 'testimonial', 'pricing', 'logo-cloud', 'newsletter']
```

### `expandSearchQuery(query, intent?, maxResults?)`

Convenience function to get all possible search variations.

```typescript
const expanded = expandSearchQuery('button', 'dashboard', 10);
// Returns up to 10 unique search terms combining synonyms, related terms, and intent

console.log(expanded);
// ['button', 'cta', 'action', 'submit', 'chart-button', 'metric-button', ...]
```

### `enhanceQueries(queries, intent?, options?)`

Enhance multiple queries in batch.

```typescript
const results = enhanceQueries(['button', 'card', 'chart'], 'dashboard');
// Returns array of QueryEnhancement objects
```

### `mergeEnhancements(enhancements)`

Merge multiple enhancements into a unique list of queries.

```typescript
const enhancements = enhanceQueries(['button', 'card']);
const merged = mergeEnhancements(enhancements);
// Returns: ['button', 'cta', 'action', 'card', 'panel', 'container', ...]
```

### `getDictionaryStats()`

Get statistics about the synonym dictionary.

```typescript
const stats = getDictionaryStats();

console.log(stats);
// {
//   synonymEntries: 69,
//   totalSynonyms: 318,
//   averageSynonymsPerTerm: "4.61",
//   relatedTermEntries: 11,
//   intentExpansions: 8
// }
```

## Supported Intents

The Query Enhancement Engine supports 8 intent categories:

1. **dashboard** - Analytics, metrics, data visualization
2. **landing-page** - Marketing pages, hero sections, CTAs
3. **form** - User input, validation, fields
4. **data-table** - Tables, grids, data display
5. **marketing** - Banners, notifications, promotions
6. **admin** - Settings, navigation, management
7. **app** - Application layouts, containers
8. **general** - Common components

## Component Coverage

The synonym dictionary includes 69+ component types:

### Buttons & Actions
- button, cta, action, submit

### Cards & Containers
- card, panel, container, box

### Forms & Inputs
- form, input, field, select, checkbox, radio, textarea

### Charts & Visualization
- chart, graph, visualization, diagram

### Tables & Data Display
- table, grid, list, datagrid

### Navigation
- navigation, nav, menu, navbar, sidebar, tabs

### Modals & Overlays
- modal, dialog, popup, drawer, overlay

### Alerts & Notifications
- alert, notification, toast, banner, snackbar

### Layout Components
- layout, grid, flex, stack

### Typography
- heading, text, paragraph, label

### Media
- image, icon, video, avatar

### Feedback & Loading
- spinner, loader, progress, skeleton

### Data Entry
- datepicker, timepicker, colorpicker, slider, switch

### Advanced Components
- accordion, carousel, breadcrumb, pagination, tooltip, badge

### Authentication
- login, signup, auth

### Dashboard Components
- metric, stat, kpi

## Use Cases

### Use Case 1: MCP Component Search

Enhance user queries before searching MCP servers:

```typescript
import { enhanceQuery, expandSearchQuery } from '@/lib/mcp';

async function searchComponents(userQuery: string, intent: string) {
  // Get all search variations
  const searchTerms = expandSearchQuery(userQuery, intent, 10);

  // Search MCP servers with all variations
  const results = await Promise.all(
    searchTerms.map(term => mcpClient.searchAllServers(term))
  );

  return results.flat();
}

// Usage
const components = await searchComponents('button', 'dashboard');
// Searches for: button, cta, action, submit, metric-button, stat-button, etc.
```

### Use Case 2: Smart Discovery Integration

Combine with the Smart Discovery Engine:

```typescript
import { analyzeDiscoveryIntent } from '@/lib/mcp';
import { enhanceQueries, mergeEnhancements } from '@/lib/mcp';

async function smartDiscovery(userRequest: string) {
  // Analyze intent
  const intent = analyzeDiscoveryIntent(userRequest);

  // Enhance search queries
  const enhancements = enhanceQueries(intent.searchQueries, intent.intent);
  const allQueries = mergeEnhancements(enhancements);

  // Search with enhanced queries
  const components = await searchMCPServers(allQueries);

  return components;
}
```

### Use Case 3: Autocomplete Suggestions

Provide intelligent search suggestions:

```typescript
import { getSynonyms, getRelatedTerms } from '@/lib/mcp';

function getSearchSuggestions(term: string) {
  const synonyms = getSynonyms(term);
  const related = getRelatedTerms(term);

  return {
    synonyms: synonyms.slice(0, 3),
    related: related.slice(0, 3),
  };
}

// Usage
const suggestions = getSearchSuggestions('button');
// {
//   synonyms: ['cta', 'action', 'submit'],
//   related: ['icon', 'link', 'badge']
// }
```

### Use Case 4: Query Refinement

Help users refine their searches:

```typescript
import { enhanceQuery } from '@/lib/mcp';

function refineQuery(query: string, intent: string) {
  const enhancement = enhanceQuery(query, intent);

  if (enhancement.confidence < 0.5) {
    return {
      message: 'No results found. Try these alternatives:',
      suggestions: enhancement.synonyms.slice(0, 5),
    };
  }

  return {
    message: 'Searching with expanded terms:',
    terms: enhancement.enhancedQueries,
  };
}
```

## Performance Characteristics

- **Dictionary Lookup:** O(1) - HashMap-based lookups
- **Query Enhancement:** O(n) where n = number of synonyms + related terms
- **Batch Processing:** O(m × n) where m = number of queries
- **Memory Usage:** ~50KB for dictionary data

## Best Practices

1. **Use Intent When Available**
   ```typescript
   // Good - provides context
   enhanceQuery('button', 'dashboard');

   // Less optimal - missing context
   enhanceQuery('button');
   ```

2. **Limit Synonyms for Performance**
   ```typescript
   // Good for quick searches
   enhanceQuery('button', 'dashboard', { maxSynonyms: 3 });

   // May be slow with many results
   enhanceQuery('button', 'dashboard', { maxSynonyms: 20 });
   ```

3. **Check Confidence Scores**
   ```typescript
   const result = enhanceQuery(userInput);

   if (result.confidence < 0.5) {
     // Show "no results" message
     // Suggest alternatives from synonyms
   } else {
     // Proceed with search
   }
   ```

4. **Use Batch Processing**
   ```typescript
   // Good - single pass
   const results = enhanceQueries(['button', 'card', 'chart']);

   // Less optimal - multiple passes
   const results = queries.map(q => enhanceQuery(q));
   ```

## Testing

Run the test suite:

```bash
npx tsx src/lib/mcp/__tests__/query-enhancer.manual-test.ts
```

Expected output:
```
✓ 79 tests passed (100%)
✓ 69 synonym entries
✓ 318 total synonyms
✓ 8 intent expansions
```

## Extending the Dictionary

To add new component types, edit `query-enhancer.ts`:

```typescript
const SYNONYM_DICTIONARY: Record<string, string[]> = {
  // Add your new component
  'my-component': ['synonym1', 'synonym2', 'synonym3'],

  // Existing entries...
};

// Add related terms
const RELATED_TERMS: Record<string, string[]> = {
  'my-component': ['related1', 'related2'],

  // Existing entries...
};
```

## Integration with MCP Discovery

The Query Enhancement Engine is designed to work seamlessly with:

1. **Smart Discovery Engine** (`smart-discovery.ts`)
2. **Component Analyzer** (`component-analyzer.ts`)
3. **Dynamic Registry** (`dynamic-registry.ts`)
4. **MCP Client** (`mcp-client.ts`)

Full integration example:

```typescript
import {
  analyzeDiscoveryIntent,
  enhanceQueries,
  mergeEnhancements,
  searchAllServers,
  buildDynamicRegistry,
} from '@/lib/mcp';

async function discoverComponents(userRequest: string) {
  // Step 1: Analyze intent
  const intent = analyzeDiscoveryIntent(userRequest);

  // Step 2: Enhance queries
  const enhancements = enhanceQueries(intent.searchQueries, intent.intent);
  const enhancedQueries = mergeEnhancements(enhancements);

  // Step 3: Search MCP servers
  const components = await searchAllServers(enhancedQueries.join(' '));

  // Step 4: Build dynamic registry
  const registry = await buildDynamicRegistry({
    components,
    intent: intent.intent,
  });

  return registry;
}
```

## Troubleshooting

**Q: Getting low confidence scores?**
A: The term might not be in the dictionary. Check with `getSynonyms(term)`. Consider adding it to the dictionary.

**Q: Too many results?**
A: Use `maxSynonyms` option to limit results, or increase `minConfidence` threshold.

**Q: Missing expected synonyms?**
A: Verify the term is normalized correctly (lowercase, trimmed). Check the dictionary contents.

**Q: Intent terms not appearing?**
A: Ensure `useIntentExpansion: true` (default) and intent is a valid category.

## License

Part of the MCP Dynamic Component Discovery system. See project LICENSE.
