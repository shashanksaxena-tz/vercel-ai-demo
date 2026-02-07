# Advanced Category Filtering System - Usage Guide

The Advanced Category Filtering System provides intelligent, multi-dimensional filtering capabilities for MCP components with smart suggestions and performance-optimized ranking.

## Table of Contents

- [Quick Start](#quick-start)
- [Filter Dimensions](#filter-dimensions)
- [Core Functions](#core-functions)
- [Smart Suggestions](#smart-suggestions)
- [Ranking & Scoring](#ranking--scoring)
- [Performance](#performance)
- [Examples](#examples)

## Quick Start

```typescript
import {
  filterComponents,
  suggestFilters,
  rankByFilters,
  type ComponentFilters,
} from '@/lib/mcp';

// Simple category filter
const buttons = filterComponents(allComponents, {
  categories: ['forms'],
});

// Multi-dimensional filter
const animatedCards = filterComponents(allComponents, {
  categories: ['cards'],
  hasAnimations: true,
  complexity: ['simple', 'medium'],
  maxBundleSize: 50,
});

// Smart filter suggestions
const suggestions = suggestFilters('animated shimmer button');
const filtered = applyFilterSuggestions(allComponents, suggestions);

// Ranked results
const ranked = rankByFilters(filtered, {
  categories: ['forms'],
  hasAnimations: true,
});
```

## Filter Dimensions

The system supports filtering across 9 different dimensions:

### 1. **Category** (OR logic within dimension)
```typescript
categories?: ComponentCategory[]
```

Available categories:
- `layout` - Container, Grid, Stack, Flex
- `navigation` - Navbar, Sidebar, Menu, Breadcrumb
- `forms` - Button, Form, Input controls
- `inputs` - Text fields, Select, DatePicker
- `data-display` - Table, List, Badge, Tag
- `feedback` - Alert, Toast, Progress, Skeleton
- `overlay` - Modal, Dialog, Tooltip, Popover
- `typography` - Heading, Text, Code
- `media` - Image, Video, Avatar
- `charts` - LineChart, BarChart, PieChart
- `marketing` - Hero, Pricing, Testimonial, CTA
- `dashboard` - Stats, Metrics, KPI cards
- `blocks` - Pre-built sections
- `cards` - Card components
- `e-commerce` - Product cards, Shopping cart
- `authentication` - Login, Signup forms
- `other` - Miscellaneous

**Example:**
```typescript
// Get all buttons OR cards
filterComponents(components, {
  categories: ['forms', 'cards']
});
```

### 2. **Framework** (OR logic)
```typescript
frameworks?: ('react' | 'vue' | 'svelte' | 'html')[]
```

**Example:**
```typescript
// React components only
filterComponents(components, {
  frameworks: ['react']
});
```

### 3. **Source** (OR logic)
```typescript
sources?: MCPServerType[]
```

Available sources:
- `shadcn-ui` - Radix UI based components
- `magic-ui` - Animated components
- `aceternity-ui` - Modern animations
- `mui` - Material UI
- `chakra-ui` - Chakra UI
- `flowbite` - Tailwind components
- `ui-layouts` - Layout templates
- `tailwindcss` - Utility templates

**Example:**
```typescript
// Only from Magic UI and Aceternity UI
filterComponents(components, {
  sources: ['magic-ui', 'aceternity-ui']
});
```

### 4. **Animation Presence**
```typescript
hasAnimations?: boolean
```

**Example:**
```typescript
// Only animated components
filterComponents(components, {
  hasAnimations: true
});

// Only static components
filterComponents(components, {
  hasAnimations: false
});
```

### 5. **Animation Type**
```typescript
animationType?: 'framer-motion' | 'css' | 'gsap' | 'spring' | Array<...>
```

**Example:**
```typescript
// Framer Motion animations only
filterComponents(components, {
  animationType: 'framer-motion'
});

// CSS or Framer Motion
filterComponents(components, {
  animationType: ['css', 'framer-motion']
});
```

### 6. **Complexity** (OR logic)
```typescript
complexity?: ('simple' | 'medium' | 'complex')[]
```

- `simple` - CSS transitions, basic animations, minimal JavaScript
- `medium` - Moderate transforms, spring animations
- `complex` - 3D transforms, particle effects, WebGL

**Example:**
```typescript
// Simple and medium complexity only
filterComponents(components, {
  complexity: ['simple', 'medium']
});
```

### 7. **Bundle Size**
```typescript
maxBundleSize?: number // in KB
```

**Example:**
```typescript
// Components under 20KB
filterComponents(components, {
  maxBundleSize: 20
});
```

### 8. **Tags** (OR logic)
```typescript
tags?: string[]
```

**Example:**
```typescript
// Components with "shimmer" or "glow" tags
filterComponents(components, {
  tags: ['shimmer', 'glow']
});
```

### 9. **Custom Filter**
```typescript
customFilter?: (comp: ComponentMetadata) => boolean
```

**Example:**
```typescript
// Custom logic
filterComponents(components, {
  customFilter: (comp) =>
    comp.name.includes('Button') &&
    comp.tags.includes('primary')
});
```

## Core Functions

### `filterComponents()`

Main filtering function with performance optimization.

```typescript
function filterComponents(
  components: ComponentMetadata[],
  filters: ComponentFilters
): ComponentMetadata[]
```

**Example:**
```typescript
const filtered = filterComponents(allComponents, {
  categories: ['forms'],
  hasAnimations: true,
  complexity: ['simple', 'medium'],
  sources: ['shadcn-ui', 'magic-ui'],
});
```

### `filterComponentsWithMetrics()`

Returns filtered results with performance metrics.

```typescript
function filterComponentsWithMetrics(
  components: ComponentMetadata[],
  filters: ComponentFilters,
  limit?: number
): FilterResult
```

**Example:**
```typescript
const result = filterComponentsWithMetrics(allComponents, {
  categories: ['cards'],
  hasAnimations: true,
}, 10);

console.log(`Found ${result.totalMatches} matches`);
console.log(`Returned ${result.components.length} components`);
console.log(`Filtered in ${result.performanceMs.toFixed(2)}ms`);
```

### Specialized Filters

#### `filterByCategory()`
```typescript
filterByCategory(
  components: ComponentMetadata[],
  category: ComponentCategory,
  strictMatch?: boolean
): ComponentMetadata[]
```

**Example:**
```typescript
// Strict: only 'forms'
const forms = filterByCategory(components, 'forms', true);

// Non-strict: 'forms' and related categories like 'inputs'
const formsAndRelated = filterByCategory(components, 'forms', false);
```

#### `filterByComplexity()`
```typescript
filterByComplexity(
  components: ComponentMetadata[],
  maxComplexity: 'simple' | 'medium' | 'complex'
): ComponentMetadata[]
```

**Example:**
```typescript
// Only simple complexity (includes non-animated)
const simple = filterByComplexity(components, 'simple');

// Up to medium complexity
const upToMedium = filterByComplexity(components, 'medium');
```

#### `filterByAnimation()`
```typescript
filterByAnimation(
  components: ComponentMetadata[],
  requirements: {
    hasAnimation?: boolean;
    type?: AnimationType | AnimationType[];
    maxComplexity?: ComplexityLevel;
  }
): ComponentMetadata[]
```

**Example:**
```typescript
const result = filterByAnimation(components, {
  hasAnimation: true,
  type: 'framer-motion',
  maxComplexity: 'medium',
});
```

#### `filterByFramework()`
```typescript
filterByFramework(
  components: ComponentMetadata[],
  framework: FrameworkType
): ComponentMetadata[]
```

**Example:**
```typescript
const reactComponents = filterByFramework(components, 'react');
```

## Smart Suggestions

### `suggestFilters()`

Analyzes natural language queries and suggests relevant filters.

```typescript
function suggestFilters(
  query: string,
  intent?: string
): FilterSuggestion[]
```

**Example:**
```typescript
const suggestions = suggestFilters('animated shimmer button for landing page');

// Returns:
[
  {
    dimension: 'hasAnimations',
    value: true,
    reasoning: 'Detected "animated, shimmer" in query',
    confidence: 0.95
  },
  {
    dimension: 'categories',
    value: ['forms'],
    reasoning: 'Detected "button" in query',
    confidence: 0.90
  },
  {
    dimension: 'sources',
    value: ['magic-ui', 'aceternity-ui'],
    reasoning: 'Detected "shimmer" in query',
    confidence: 0.90
  }
]
```

**Supported query patterns:**

| Query | Suggested Filters |
|-------|------------------|
| "animated button" | hasAnimations: true, categories: ['forms'] |
| "simple card" | complexity: ['simple'], categories: ['cards'] |
| "shadcn button" | sources: ['shadcn-ui'], categories: ['forms'] |
| "3d card" | hasAnimations: true, complexity: ['complex'], sources: ['aceternity-ui'] |
| "lightweight form" | maxBundleSize: 20, complexity: ['simple'] |
| "mobile navigation" | maxBundleSize: 30, complexity: ['simple', 'medium'] |

### `applyFilterSuggestions()`

Automatically applies high-confidence filter suggestions.

```typescript
function applyFilterSuggestions(
  components: ComponentMetadata[],
  suggestions: FilterSuggestion[],
  minConfidence?: number
): ComponentMetadata[]
```

**Example:**
```typescript
const suggestions = suggestFilters('animated card');
const filtered = applyFilterSuggestions(
  allComponents,
  suggestions,
  0.7 // Only apply suggestions with >70% confidence
);
```

## Ranking & Scoring

### `rankByFilters()`

Ranks filtered components by relevance score.

```typescript
function rankByFilters(
  components: ComponentMetadata[],
  filters: ComponentFilters,
  preferences?: {
    preferAnimated?: boolean;
    preferSimple?: boolean;
    preferredSources?: MCPServerType[];
  }
): ComponentMetadata[]
```

**Scoring system:**
- Category match: +10 points
- Framework match: +8 points
- Source match: +7 points
- Preferred source: +8 points
- Tag match: +3 points per tag
- Animation preference: +5 points
- Simplicity preference: +6 points
- Bundle size bonus: Up to +5 points

**Example:**
```typescript
const ranked = rankByFilters(
  filteredComponents,
  {
    categories: ['forms'],
    hasAnimations: true,
  },
  {
    preferAnimated: true,
    preferredSources: ['magic-ui', 'aceternity-ui'],
  }
);

// First result will be the most relevant animated form component
console.log(ranked[0]);
```

### `estimateComponentBundleSize()`

Estimates the bundle size impact of a component.

```typescript
function estimateComponentBundleSize(
  component: ComponentMetadata
): number // KB
```

**Example:**
```typescript
const size = estimateComponentBundleSize(component);
console.log(`Estimated bundle size: ${size}KB`);
console.log(`Category: ${getBundleSizeCategory(size)}`); // small/medium/large
```

## Performance

The filtering system is optimized for speed:

- **Target:** <50ms for 200+ components
- **Efficient filtering:** Single-pass algorithm
- **No redundant iterations:** Combined filters applied in one pass
- **Performance monitoring:** Automatic warnings if >50ms

**Benchmark results:**
```typescript
// 250 components, complex filters
const result = filterComponentsWithMetrics(largeDataset, {
  categories: ['forms', 'cards'],
  hasAnimations: true,
  complexity: ['simple', 'medium'],
  sources: ['shadcn-ui', 'magic-ui'],
  maxBundleSize: 50,
});

// Typical: 15-30ms ✅
console.log(`Filtered in ${result.performanceMs}ms`);
```

## Examples

### Example 1: Find Simple Animated Buttons

```typescript
import { filterComponents } from '@/lib/mcp';

const animatedButtons = filterComponents(allComponents, {
  categories: ['forms'],
  hasAnimations: true,
  complexity: ['simple', 'medium'],
  tags: ['button'],
});

console.log(`Found ${animatedButtons.length} animated buttons`);
```

### Example 2: Mobile-Optimized Components

```typescript
import { filterComponents, rankByFilters } from '@/lib/mcp';

const mobileOptimized = filterComponents(allComponents, {
  maxBundleSize: 30, // Small bundle
  complexity: ['simple', 'medium'], // Not too complex
  frameworks: ['react'],
});

const ranked = rankByFilters(mobileOptimized, {
  maxBundleSize: 30,
}, {
  preferSimple: true, // Prefer simpler components
});

console.log('Top 5 mobile-optimized components:');
ranked.slice(0, 5).forEach((comp, i) => {
  const size = estimateComponentBundleSize(comp);
  console.log(`${i + 1}. ${comp.name} (${size}KB)`);
});
```

### Example 3: Landing Page Components

```typescript
import { suggestFilters, applyFilterSuggestions, rankByFilters } from '@/lib/mcp';

// Get smart suggestions
const suggestions = suggestFilters(
  'animated hero section with pricing cards',
  'landing-page'
);

// Apply high-confidence suggestions
const filtered = applyFilterSuggestions(allComponents, suggestions, 0.75);

// Rank by relevance
const ranked = rankByFilters(filtered, {
  categories: ['marketing', 'cards'],
  hasAnimations: true,
}, {
  preferAnimated: true,
  preferredSources: ['magic-ui', 'aceternity-ui'],
});

console.log(`Found ${ranked.length} landing page components`);
```

### Example 4: Dashboard Components

```typescript
import { filterComponents, filterByComplexity } from '@/lib/mcp';

const dashboardComponents = filterComponents(allComponents, {
  categories: ['data-display', 'charts', 'dashboard'],
  sources: ['shadcn-ui', 'mui', 'chakra-ui'],
  frameworks: ['react'],
});

// Further filter by complexity
const simpleDashboard = filterByComplexity(dashboardComponents, 'medium');

console.log(`Found ${simpleDashboard.length} dashboard components`);
```

### Example 5: Combine Multiple Filter Sets

```typescript
import { combineFilters, filterComponents } from '@/lib/mcp';

const baseFilters: ComponentFilters = {
  frameworks: ['react'],
  sources: ['shadcn-ui', 'magic-ui'],
};

const animationFilters: ComponentFilters = {
  hasAnimations: true,
  complexity: ['simple', 'medium'],
};

const sizeFilters: ComponentFilters = {
  maxBundleSize: 40,
};

// Combine all filters
const combined = combineFilters(baseFilters, animationFilters, sizeFilters);
const result = filterComponents(allComponents, combined);

console.log(`Found ${result.length} components matching all criteria`);
```

### Example 6: Custom Filter with Tags

```typescript
import { filterComponents } from '@/lib/mcp';

const shimmerComponents = filterComponents(allComponents, {
  hasAnimations: true,
  tags: ['shimmer', 'glow', 'shine'],
  customFilter: (comp) => {
    // Additional custom logic
    return comp.name.toLowerCase().includes('shimmer') ||
           comp.description?.toLowerCase().includes('shimmer');
  },
});

console.log('Shimmer components:', shimmerComponents.map(c => c.name));
```

### Example 7: Complete Workflow

```typescript
import {
  suggestFilters,
  applyFilterSuggestions,
  rankByFilters,
  filterComponentsWithMetrics,
  estimateComponentBundleSize,
  getBundleSizeCategory,
} from '@/lib/mcp';

// 1. Analyze user query
const userQuery = "I need a simple animated button for my mobile app";
const suggestions = suggestFilters(userQuery, 'mobile');

console.log('Filter suggestions:');
suggestions.forEach(s => {
  console.log(`- ${s.dimension}: ${JSON.stringify(s.value)} (${(s.confidence * 100).toFixed(0)}% confidence)`);
});

// 2. Apply suggestions and get metrics
const result = filterComponentsWithMetrics(
  allComponents,
  {
    categories: ['forms'],
    hasAnimations: true,
    complexity: ['simple'],
    maxBundleSize: 25,
  },
  10 // Limit to top 10
);

console.log(`\nFound ${result.totalMatches} matches in ${result.performanceMs.toFixed(2)}ms`);

// 3. Rank by user preferences
const ranked = rankByFilters(result.components, result.appliedFilters, {
  preferSimple: true,
  preferredSources: ['shadcn-ui', 'magic-ui'],
});

// 4. Display results
console.log('\nTop recommendations:');
ranked.forEach((comp, i) => {
  const size = estimateComponentBundleSize(comp);
  const category = getBundleSizeCategory(size);

  console.log(`${i + 1}. ${comp.displayName}`);
  console.log(`   Source: ${comp.source}`);
  console.log(`   Bundle: ${size}KB (${category})`);
  console.log(`   Animation: ${comp.animations?.complexity || 'none'}`);
  console.log('');
});
```

## Best Practices

1. **Start broad, narrow down**: Begin with category filters, then add complexity/animation filters
2. **Use smart suggestions**: Let the system parse natural language queries
3. **Apply ranking**: Always rank results for better UX
4. **Monitor performance**: Use `filterComponentsWithMetrics()` to track filtering speed
5. **Combine filters wisely**: Use `combineFilters()` for complex multi-stage filtering
6. **Consider bundle size**: Filter by `maxBundleSize` for mobile or performance-critical apps
7. **Leverage confidence scores**: Use high confidence threshold (>0.7) for auto-suggestions

## Filter Logic Summary

- **Between dimensions**: AND logic (must match all specified dimensions)
- **Within dimensions**: OR logic (match any value in array)
- **Custom filters**: AND logic when combined
- **Bundle size**: Maximum threshold (components must be ≤ limit)
- **Complexity**: Maximum threshold (simple ≤ medium ≤ complex)

## Related Modules

- **Smart Discovery** (`smart-discovery.ts`): Intent-based component discovery
- **Animation Performance** (`animation-performance.ts`): Performance scoring
- **Similarity Scorer** (`similarity-scorer.ts`): Cross-framework similarity
- **Query Enhancer** (`query-enhancer.ts`): Query expansion and synonyms
- **Preference Learner** (`preference-learner.ts`): User preference tracking

---

Built for **Phase 3** of the MCP Dynamic Component Discovery system.
