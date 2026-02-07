# Similarity Scorer - Quick Start Guide

## Installation

The similarity scorer is part of the MCP module. No additional installation required.

```typescript
import {
  calculateSimilarity,
  findSimilarComponents,
  rankComponentsByRelevance,
} from '@/lib/mcp';
```

## 5-Minute Quick Start

### 1. Compare Two Components

```typescript
import { calculateSimilarity } from '@/lib/mcp';

const shadcnButton = {
  id: '1',
  name: 'Button',
  category: 'inputs',
  source: 'shadcn-ui',
  framework: 'react',
  // ... metadata
};

const muiButton = {
  id: '2',
  name: 'Button',
  category: 'inputs',
  source: 'mui',
  framework: 'react',
};

const result = calculateSimilarity(shadcnButton, muiButton);

console.log(`Similarity: ${(result.score * 100).toFixed(1)}%`);
// Output: Similarity: 92.0%

console.log(`Reasoning: ${result.reasoning}`);
// Output: Reasoning: nearly identical names, same category, both react, from mui
```

### 2. Find Similar Components

```typescript
import { findSimilarComponents } from '@/lib/mcp';

const targetComponent = {
  id: 'my-component',
  name: 'AnimatedCard',
  category: 'cards',
  // ... metadata
};

const similar = findSimilarComponents(targetComponent, allComponents, {
  minScore: 0.6,    // 60% similarity threshold
  maxResults: 10,   // Top 10 results
});

similar.forEach(result => {
  console.log(`${result.component.name} - ${(result.score * 100).toFixed(1)}%`);
});
```

### 3. Search Components by Query

```typescript
import { rankComponentsByRelevance } from '@/lib/mcp';

const results = rankComponentsByRelevance('animated button', allComponents, {
  maxResults: 5,
});

results.forEach(component => {
  console.log(component.name, component.source);
});
```

## Common Use Cases

### Find Framework Alternatives

```typescript
// Find MUI alternatives to Shadcn components
const shadcnCard = getComponent('shadcn-card');
const similar = findSimilarComponents(shadcnCard, allComponents);

const muiAlternatives = similar
  .filter(s => s.component.source === 'mui')
  .slice(0, 3);
```

### Find Simpler Alternatives

```typescript
// Find non-animated alternatives to complex animated components
const complexButton = {
  name: 'MovingBorderButton',
  animations: { complexity: 'complex' },
  // ...
};

const similar = findSimilarComponents(complexButton, allComponents);
const simpler = similar.filter(s =>
  !s.component.animations || s.component.animations.complexity === 'simple'
);
```

### Smart Component Search

```typescript
// Search with intent
const results = rankComponentsByRelevance('pricing card', allComponents, {
  intent: 'landing page with pricing section',
  preferredFrameworks: ['react'],
  preferredComplexity: 'medium',
});
```

## Key Parameters

### `minScore` (0-1)
- **0.9+**: Nearly identical components
- **0.7-0.9**: Very similar (good framework equivalents)
- **0.5-0.7**: Moderately similar (related components)
- **0.3-0.5**: Loosely similar (alternatives)

### `maxResults`
- Controls number of results returned
- Default: 20 for `findSimilarComponents`, 50 for `rankComponentsByRelevance`

### `weights`
Customize importance of different factors:

```typescript
{
  weights: {
    name: 0.4,       // Prioritize name matching
    category: 0.3,
    features: 0.2,
    framework: 0.05,
    complexity: 0.05,
  }
}
```

## Performance Tips

1. **Use appropriate thresholds**: Higher `minScore` = faster results
2. **Limit results**: Use `maxResults` to avoid processing too many
3. **Cache results**: Store similarity calculations for repeated queries

```typescript
const cache = new Map();

function getCachedSimilarity(comp1, comp2) {
  const key = `${comp1.id}:${comp2.id}`;
  if (!cache.has(key)) {
    cache.set(key, calculateSimilarity(comp1, comp2));
  }
  return cache.get(key);
}
```

## Example Output

### Similarity Score Breakdown

```typescript
{
  component: { name: 'Button', source: 'mui', ... },
  score: 0.92,           // 92% similar
  breakdown: {
    nameMatch: 1.0,      // 100% name match
    categoryMatch: 1.0,  // 100% category match
    featureMatch: 0.6,   // 60% feature overlap
    frameworkMatch: 1.0, // Same framework
    complexityMatch: 1.0 // Same complexity
  },
  reasoning: "nearly identical names, same category, both react, from mui"
}
```

## Demo Script

Run the comprehensive demo:

```bash
npx tsx src/lib/mcp/__tests__/similarity-scorer-demo.ts
```

This shows:
- ✓ Finding similar buttons across frameworks
- ✓ Button variant discovery
- ✓ Query-based ranking
- ✓ Animated component filtering
- ✓ Component clustering
- ✓ Performance benchmarks
- ✓ Real-world use cases

## Next Steps

- Read [SIMILARITY_SCORER.md](./SIMILARITY_SCORER.md) for detailed documentation
- Check [similarity-scorer.test.ts](./__tests__/similarity-scorer.test.ts) for 60+ test examples
- Explore integration with other MCP tools

## Troubleshooting

**Q: Getting too many irrelevant results?**
A: Increase `minScore` threshold (try 0.7+)

**Q: Not finding enough alternatives?**
A: Lower `minScore` threshold (try 0.4-0.5)

**Q: Want more name-based matching?**
A: Adjust weights to prioritize name: `{ name: 0.5, category: 0.2, ... }`

**Q: Slow performance?**
A: Use `maxResults` to limit output, or cache results

## Support

For issues or questions, see the main [MCP documentation](./README.md).
