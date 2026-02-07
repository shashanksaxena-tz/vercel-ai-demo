# MCP Discovery Pipeline Integration

## Overview

The `/api/generate` endpoint now integrates with the MCP (Model Context Protocol) discovery pipeline to dynamically discover and include relevant components based on user intent.

## Feature Flag

The integration is controlled by the `NEXT_PUBLIC_ENABLE_DYNAMIC_DISCOVERY` environment variable:

```bash
# Enable MCP discovery
NEXT_PUBLIC_ENABLE_DYNAMIC_DISCOVERY=true

# Disable MCP discovery (default behavior)
NEXT_PUBLIC_ENABLE_DYNAMIC_DISCOVERY=false
```

## How It Works

### 1. Intent Analysis
When a user submits a prompt, the system analyzes it to determine intent:
- Dashboard (charts, metrics, analytics)
- Landing Page (hero, pricing, testimonials)
- Form (inputs, validation)
- Data Table (grids, pagination)
- Marketing (banners, notifications)
- Admin (navigation, settings)
- App (general UI)

### 2. Component Discovery
Based on the detected intent, the system:
- Identifies relevant MCP sources (shadcn-ui, mui, magic-ui, etc.)
- Generates search queries for component discovery
- Fetches components from MCP servers via `/api/mcp/discover`
- Deduplicates and prioritizes results

### 3. Enhanced Prompt Building
The discovered components are injected into the system prompt:
- Core components (78 base components)
- MCP-discovered components (context-aware, intent-based)
- Namespace prefixes (`core::Button` vs `mcp::ShimmerButton`)
- Token budget management (15,000 token limit)

### 4. UI Generation
The enhanced prompt is used to generate the UI tree with access to both core and discovered components.

## API Response

When discovery is enabled, the API response includes telemetry:

```json
{
  "tree": { ... },
  "explanation": "...",
  "timing": 1234,
  "valid": true,
  "telemetry": {
    "discoveryEnabled": true,
    "intent": "dashboard",
    "mcpComponentsDiscovered": 15,
    "mcpComponentsUsed": 0,
    "tokenUsage": {
      "core": 7800,
      "mcp": 1500,
      "total": 9300,
      "withinBudget": true
    },
    "discoveryTime": 450
  }
}
```

## Performance Considerations

### Discovery Time
- Intent analysis: ~5ms
- MCP queries: ~200-500ms (multiple parallel queries)
- Deduplication: ~5ms
- Prompt building: ~10ms

**Total overhead: ~200-520ms**

### Token Budget
- Core components: ~7,800 tokens
- MCP components: ~100 tokens per component
- Maximum budget: 15,000 tokens
- Auto-trimming when budget is exceeded

### Caching
Future enhancement: Component metadata caching to reduce MCP query time.

## Logging

Console logs are emitted at key stages:

```
[MCP Discovery] Intent analyzed: { intent: 'dashboard', ... }
[MCP Discovery] Discovery complete: { queriesExecuted: 6, uniqueComponents: 15, ... }
```

## Error Handling

The integration is fail-safe:
- If discovery fails, falls back to standard generation
- Individual MCP query failures don't block the request
- Discovery errors are logged but don't cause API failures

## Integration Points

### Files Modified

1. **`src/app/api/generate/route.ts`**
   - Added MCP discovery pipeline
   - Enhanced telemetry
   - Feature flag check

2. **`src/lib/ai/ui-generator.ts`**
   - Added `systemPromptOverride` to `GenerationContext`
   - Updated to use dynamic prompts when provided

3. **`src/lib/ai/index.ts`**
   - Exported dynamic prompt functions
   - Exported MCP component metadata types

4. **`src/lib/mcp/index.ts`**
   - Exported smart discovery functions
   - Exported discovery intent types

### New Dependencies

- `src/lib/mcp/smart-discovery.ts` - Intent analysis and component prioritization
- `src/lib/ai/dynamic-prompts.ts` - Enhanced prompt building
- `/api/mcp/discover` - Component discovery endpoint

## Testing

### Enable Discovery
```bash
export NEXT_PUBLIC_ENABLE_DYNAMIC_DISCOVERY=true
npm run dev
```

### Test Request
```bash
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Create a dashboard with revenue and user metrics"
  }'
```

### Expected Behavior
- Intent detected as `dashboard`
- MCP sources: `shadcn-ui`, `recharts-mcp`, `mui`, `chakra-ui`
- Search queries: `chart`, `graph`, `table`, `dashboard`, `metrics`, `statistics`
- Discovered components include chart and metric components
- Telemetry included in response

### Disable Discovery
```bash
export NEXT_PUBLIC_ENABLE_DYNAMIC_DISCOVERY=false
npm run dev
```

Response will not include telemetry and will use standard prompts.

## Future Enhancements

1. **Component Usage Tracking**: Track which MCP components are actually used in the generated tree
2. **Component Caching**: Cache MCP component metadata to reduce query time
3. **A/B Testing**: Compare generation quality with/without MCP discovery
4. **User Feedback Loop**: Learn which components are most useful for different intents
5. **Batch Discovery API**: Dedicated endpoint for batch component discovery
6. **Namespace Resolution**: Automatic fallback from `mcp::` to `core::` components

## Troubleshooting

### Discovery Not Working
- Check environment variable: `echo $NEXT_PUBLIC_ENABLE_DYNAMIC_DISCOVERY`
- Verify MCP servers are running: `curl http://localhost:3000/api/mcp/status`
- Check console logs for discovery errors

### Slow Response Times
- Discovery adds ~200-500ms overhead
- Consider disabling for time-sensitive requests
- Future: implement component caching

### Token Budget Exceeded
- System auto-trims MCP components to fit budget
- Check console for warnings: `Token budget exceeded`
- Reduce `maxTokens` in prompt config if needed

## Related Documentation

- [Smart Discovery Engine](src/lib/mcp/smart-discovery.ts)
- [Dynamic Prompts](src/lib/ai/dynamic-prompts.ts)
- [MCP Discovery API](src/app/api/mcp/discover/route.ts)
- [Task #7: Integrate MCP discovery into generate API](TASKS.md)
