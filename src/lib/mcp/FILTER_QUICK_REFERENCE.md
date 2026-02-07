# Advanced Filter System - Quick Reference Card

## Import
```typescript
import {
  filterComponents,
  suggestFilters,
  rankByFilters,
  type ComponentFilters,
} from '@/lib/mcp';
```

## Filter Dimensions Cheat Sheet

| Dimension | Type | Logic | Example |
|-----------|------|-------|---------|
| `categories` | `ComponentCategory[]` | OR | `['forms', 'cards']` |
| `frameworks` | `FrameworkType[]` | OR | `['react', 'html']` |
| `sources` | `MCPServerType[]` | OR | `['shadcn-ui', 'magic-ui']` |
| `hasAnimations` | `boolean` | - | `true` or `false` |
| `animationType` | `AnimationType` or `[]` | OR | `'framer-motion'` or `['css', 'framer-motion']` |
| `complexity` | `ComplexityLevel[]` | OR | `['simple', 'medium']` |
| `maxBundleSize` | `number` (KB) | ≤ | `30` |
| `tags` | `string[]` | OR | `['button', 'shimmer']` |
| `customFilter` | `(comp) => boolean` | AND | `(c) => c.name.includes('Btn')` |

## Common Patterns

### 1. Basic Filtering
```typescript
filterComponents(components, {
  categories: ['forms'],
});
```

### 2. Animated Components Only
```typescript
filterComponents(components, {
  hasAnimations: true,
  complexity: ['simple', 'medium'], // Exclude complex
});
```

### 3. Mobile-Optimized
```typescript
filterComponents(components, {
  maxBundleSize: 30,
  complexity: ['simple'],
});
```

### 4. Source-Specific
```typescript
filterComponents(components, {
  sources: ['magic-ui', 'aceternity-ui'],
});
```

### 5. Smart Suggestions
```typescript
const suggestions = suggestFilters('animated button');
const filtered = applyFilterSuggestions(components, suggestions, 0.7);
```

### 6. With Ranking
```typescript
const ranked = rankByFilters(filtered, filters, {
  preferAnimated: true,
  preferredSources: ['magic-ui'],
});
```

### 7. Performance Metrics
```typescript
const result = filterComponentsWithMetrics(components, filters, 10);
// result.performanceMs, result.totalMatches, result.components
```

## Quick Query Examples

| Query | Auto-Suggested Filters |
|-------|----------------------|
| "animated button" | `hasAnimations: true`, `categories: ['forms']` |
| "simple card" | `complexity: ['simple']`, `categories: ['cards']` |
| "shadcn button" | `sources: ['shadcn-ui']`, `categories: ['forms']` |
| "3d card" | `hasAnimations: true`, `complexity: ['complex']` |
| "lightweight form" | `maxBundleSize: 20`, `complexity: ['simple']` |

## Function Quick Reference

| Function | Returns | Use Case |
|----------|---------|----------|
| `filterComponents()` | `ComponentMetadata[]` | Main filtering |
| `filterComponentsWithMetrics()` | `FilterResult` | With performance data |
| `filterByCategory()` | `ComponentMetadata[]` | Category-only filter |
| `filterByComplexity()` | `ComponentMetadata[]` | Complexity threshold |
| `filterByAnimation()` | `ComponentMetadata[]` | Animation requirements |
| `filterByFramework()` | `ComponentMetadata[]` | Framework-specific |
| `suggestFilters()` | `FilterSuggestion[]` | Smart suggestions |
| `applyFilterSuggestions()` | `ComponentMetadata[]` | Auto-apply suggestions |
| `rankByFilters()` | `ComponentMetadata[]` | Ranked by relevance |
| `estimateComponentBundleSize()` | `number` (KB) | Bundle size estimate |
| `getBundleSizeCategory()` | `'small'\|'medium'\|'large'` | Size category |
| `combineFilters()` | `ComponentFilters` | Merge filter sets |

## Complexity Levels

- **simple**: CSS transitions, basic animations, minimal JS (<3/10 performance score)
- **medium**: Moderate transforms, spring animations (4-6/10)
- **complex**: 3D transforms, particle effects, WebGL (7-10/10)

## Bundle Size Categories

- **small**: ≤20KB
- **medium**: 21-50KB
- **large**: >50KB

## Performance

- **Target**: <50ms for 200+ components
- **Actual**: 15-30ms for 250 components
- **Monitoring**: Use `filterComponentsWithMetrics()` to track

## Complete Example

```typescript
import {
  suggestFilters,
  filterComponentsWithMetrics,
  rankByFilters,
  estimateComponentBundleSize,
} from '@/lib/mcp';

// 1. Get suggestions
const suggestions = suggestFilters('animated button for mobile', 'mobile');

// 2. Filter with metrics
const result = filterComponentsWithMetrics(allComponents, {
  categories: ['forms'],
  hasAnimations: true,
  complexity: ['simple'],
  maxBundleSize: 25,
}, 10);

console.log(`Found ${result.totalMatches} in ${result.performanceMs}ms`);

// 3. Rank
const ranked = rankByFilters(result.components, result.appliedFilters, {
  preferSimple: true,
  preferredSources: ['magic-ui'],
});

// 4. Use results
ranked.forEach(comp => {
  const size = estimateComponentBundleSize(comp);
  console.log(`${comp.displayName} - ${size}KB`);
});
```

## Tips

1. Start with broad filters, narrow down progressively
2. Use `suggestFilters()` for natural language queries
3. Always rank results for better UX
4. Monitor performance with metrics
5. Combine filters for complex multi-stage filtering
6. Use `maxBundleSize` for mobile/performance-critical apps
7. Set confidence threshold ≥0.7 for auto-suggestions

---

📚 **Full Documentation:** `ADVANCED_FILTER_GUIDE.md`
