# Testing Guide: MCP Component Discovery
## Phase 1 Infrastructure Validation

This guide walks you through testing the newly implemented MCP component discovery infrastructure.

---

## Quick Start

### 1. Initial Setup (Feature Flag OFF)

First, verify that existing functionality is unchanged:

```bash
# Create .env.local if it doesn't exist
cp .env.example .env.local

# Ensure discovery is DISABLED
echo "NEXT_PUBLIC_ENABLE_DYNAMIC_DISCOVERY=false" >> .env.local

# Start development server
npm run dev
```

**Expected Behavior:**
- Application works exactly as before
- No MCP discovery queries
- 78 core components only
- Fast response times (~1-2 seconds)

### 2. Test Basic UI Generation

```bash
# Visit the application
open http://localhost:3000

# Try generating a UI
# Prompt: "Create a dashboard with metrics"
```

**Expected Result:**
- UI generated with core components only (Container, Grid, Card, Metric)
- No telemetry in API response
- Response structure unchanged

---

## Testing MCP Discovery (Phase 2 Pilot)

### 1. Enable Discovery

```bash
# Enable the feature flag
# Edit .env.local and change:
NEXT_PUBLIC_ENABLE_DYNAMIC_DISCOVERY=true

# Restart the dev server
npm run dev
```

### 2. Test Dashboard Generation

```bash
# API Test
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Create a SaaS dashboard with revenue metrics and user growth charts",
    "framework": "shadcn"
  }' | jq
```

**Expected Response:**
```json
{
  "tree": {
    "root": "dashboard",
    "elements": { ... }
  },
  "explanation": "...",
  "telemetry": {
    "discoveryEnabled": true,
    "intent": "dashboard",
    "mcpComponentsDiscovered": 12,
    "mcpComponentsUsed": 0,
    "tokenUsage": {
      "core": 7800,
      "mcp": 1200,
      "total": 9000,
      "withinBudget": true,
      "maxBudget": 15000
    },
    "discoveryTime": 450
  }
}
```

**What to Check:**
- ✅ `telemetry.discoveryEnabled` is `true`
- ✅ `telemetry.intent` matches request type (`"dashboard"`)
- ✅ `telemetry.mcpComponentsDiscovered` > 0
- ✅ `telemetry.tokenUsage.withinBudget` is `true`
- ✅ `telemetry.discoveryTime` < 1000ms

### 3. Test Batch Discovery API

```bash
# Test the new batch discovery endpoint
curl -X POST http://localhost:3000/api/mcp/discover-batch \
  -H "Content-Type: application/json" \
  -d '{
    "framework": "react",
    "queries": ["chart", "table", "metric"],
    "sources": ["shadcn-ui", "mui"],
    "limitPerQuery": 10,
    "useCache": true
  }' | jq
```

**Expected Response:**
```json
{
  "components": [
    {
      "name": "LineChart",
      "description": "Line chart component for time-series data",
      "props": {
        "data": {
          "type": "array",
          "required": true
        },
        "xAxis": {
          "type": "string"
        }
      },
      "source": "shadcn-ui",
      "examples": []
    }
  ],
  "count": 15,
  "sources": ["shadcn-ui", "mui"],
  "cache": {
    "hits": 0,
    "misses": 3
  },
  "timing": {
    "total": 450,
    "perQuery": {
      "chart": 120,
      "table": 180,
      "metric": 150
    },
    "perSource": {
      "shadcn-ui": 200,
      "mui": 250
    }
  },
  "errors": []
}
```

**What to Check:**
- ✅ `components` array has items
- ✅ `count` > 0
- ✅ `timing.total` < 2000ms
- ✅ `errors` array is empty
- ✅ Components have `name`, `description`, `source`

### 4. Test Different Intent Types

Test various request types to verify intent classification:

```bash
# Dashboard Intent
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Create an analytics dashboard"}' | jq '.telemetry.intent'
# Expected: "dashboard"

# Landing Page Intent
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Create a landing page with hero and pricing"}' | jq '.telemetry.intent'
# Expected: "landing-page"

# Form Intent
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Create a signup form"}' | jq '.telemetry.intent'
# Expected: "form"

# Data Table Intent
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Create a data table with sorting"}' | jq '.telemetry.intent'
# Expected: "data-table"
```

---

## Component Cache Testing

### 1. Test Cache Behavior

```bash
# First request (cache miss)
curl -X POST http://localhost:3000/api/mcp/discover-batch \
  -H "Content-Type: application/json" \
  -d '{"queries": ["button"], "useCache": true}' \
  | jq '.cache'

# Expected: {"hits": 0, "misses": 1}

# Second request (cache hit)
curl -X POST http://localhost:3000/api/mcp/discover-batch \
  -H "Content-Type: application/json" \
  -d '{"queries": ["button"], "useCache": true}' \
  | jq '.cache'

# Expected: {"hits": 1, "misses": 0}
```

### 2. Monitor Cache Performance

Open browser console and check:
```javascript
// In browser DevTools console
localStorage.getItem('mcp-metadata:react::Button')
// Should see cached component metadata
```

### 3. Test Cache Expiration

```bash
# Wait 5+ minutes for TTL expiration
# Run query again - should be cache miss

curl -X POST http://localhost:3000/api/mcp/discover-batch \
  -H "Content-Type: application/json" \
  -d '{"queries": ["button"], "useCache": true}' \
  | jq '.cache'

# Expected: {"hits": 0, "misses": 1} (cache expired)
```

---

## Namespace Testing

### 1. Test Component Type Parsing

Create a test file to verify namespace support:

```typescript
// test-namespace.ts
import { parseComponentType, formatComponentType } from './src/lib/registry/framework-registry';

// Test parsing
console.log(parseComponentType('Button'));
// { namespace: 'core', component: 'Button' }

console.log(parseComponentType('core::Container'));
// { namespace: 'core', component: 'Container' }

console.log(parseComponentType('mcp::ShimmerButton'));
// { namespace: 'mcp', component: 'ShimmerButton' }

// Test formatting
console.log(formatComponentType('Button', 'core'));
// 'core::Button'

console.log(formatComponentType('DataTable', 'mcp'));
// 'mcp::DataTable'
```

### 2. Test Registry Merging

```typescript
// test-merge.ts
import { getFrameworkRegistry, mergeRegistry } from './src/lib/registry/framework-registry';

const shadcnRegistry = getFrameworkRegistry('shadcn');
console.log('Core components:', Object.keys(shadcnRegistry.components).length);
// Should be 78

const mcpComponents = [
  {
    name: 'DataTable',
    description: 'Advanced data table',
    source: 'shadcn-ui',
    renderer: DataTableComponent
  }
];

const merged = mergeRegistry(shadcnRegistry, mcpComponents);
console.log('Merged components:', Object.keys(merged.components).length);
// Should be 78 + 1 = 79

console.log('Has core::Button:', 'core::Button' in merged.components);
// true

console.log('Has mcp::DataTable:', 'mcp::DataTable' in merged.components);
// true
```

---

## Performance Testing

### 1. Measure Discovery Latency

```bash
# Run multiple requests and measure timing
for i in {1..10}; do
  curl -X POST http://localhost:3000/api/generate \
    -H "Content-Type: application/json" \
    -d '{"prompt": "Create a dashboard"}' \
    -w "\nTotal time: %{time_total}s\n" \
    -o /dev/null -s
done
```

**Expected Results:**
- First request: 2-3 seconds (cold start)
- Subsequent requests: < 2 seconds (with caching)

### 2. Token Budget Monitoring

```bash
# Generate a complex request
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Create a comprehensive dashboard with charts, tables, metrics, notifications, and user profile"
  }' | jq '.telemetry.tokenUsage'
```

**What to Check:**
- ✅ `total` < 15000 (within budget)
- ✅ `withinBudget` is `true`
- ✅ If `total` > 15000, components should be auto-trimmed

---

## Browser Testing

### 1. Test in UI Builder Application

1. Open http://localhost:3000
2. Enable dynamic discovery (if not already):
   - Check DevTools console for discovery logs
3. Test prompts:
   - "Create a dashboard with revenue metrics"
   - "Create a landing page with pricing"
   - "Create a signup form"
4. Check console for telemetry:
   ```javascript
   // Should see logs like:
   [MCP Discovery] Intent: dashboard
   [MCP Discovery] Discovered 12 components in 450ms
   [Token Budget] 9000/15000 tokens (60% usage)
   ```

### 2. Check Network Tab

With discovery enabled:
1. Open Network tab
2. Generate a UI
3. Look for requests to:
   - `/api/generate` (should include telemetry)
   - `/api/mcp/discover-batch` (may be called internally)

---

## Error Handling Testing

### 1. Test MCP Server Timeout

Simulate slow MCP server:
```bash
# This should timeout gracefully after 2 seconds
curl -X POST http://localhost:3000/api/mcp/discover-batch \
  -H "Content-Type: application/json" \
  -d '{
    "queries": ["nonexistent-component-xyz"],
    "sources": ["fake-mcp-server"],
    "limitPerQuery": 10
  }'
```

**Expected:**
- Response should still succeed
- `errors` array should contain timeout errors
- `components` array may be empty
- No application crash

### 2. Test Token Budget Exceeded

```bash
# Intentionally exceed token budget
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Create everything: dashboard, landing page, forms, tables, charts, metrics, notifications, modals, tooltips, all components"
  }' | jq '.telemetry.tokenUsage'
```

**Expected:**
- Components auto-trimmed to fit budget
- `total` <= 15000
- `withinBudget` is `true`
- Warning in console about trimming

---

## Regression Testing

### 1. Test with Feature Flag OFF

```bash
# Disable discovery
# Edit .env.local:
NEXT_PUBLIC_ENABLE_DYNAMIC_DISCOVERY=false

# Restart server
npm run dev

# Test existing functionality
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Create a button"}'
```

**Expected:**
- No `telemetry` field in response
- Standard 78-component behavior
- No MCP queries in logs
- Response time unchanged from before

### 2. Compare Generated UIs

Test the same prompt with flag ON and OFF:

```bash
# Flag OFF
curl -X POST http://localhost:3000/api/generate \
  -d '{"prompt": "Create a dashboard"}' > result-off.json

# Flag ON
# (change .env.local and restart)
curl -X POST http://localhost:3000/api/generate \
  -d '{"prompt": "Create a dashboard"}' > result-on.json

# Compare
diff result-off.json result-on.json
```

**What to Check:**
- Both should produce valid UIs
- ON version may have additional telemetry
- Both should render successfully

---

## Success Criteria

### Phase 1 Validation ✅

Before proceeding to Phase 2:

- [ ] Feature flag OFF: Application works identically to before
- [ ] Feature flag ON: Discovery pipeline runs successfully
- [ ] Batch discovery API returns components
- [ ] Intent classification works for all 8 categories
- [ ] Token budget stays within 15,000 limit
- [ ] Component caching works (hit/miss tracking)
- [ ] Namespace parsing/formatting works
- [ ] Registry merging preserves core components
- [ ] No crashes or errors in any test case
- [ ] Performance targets met (< 3s total, < 1s discovery)

---

## Troubleshooting

### Issue: "Discovery enabled but no components found"

**Cause:** MCP servers not running or not returning results

**Fix:**
```bash
# Check MCP server status
ps aux | grep mcp

# Restart MCP servers if needed
# (Follow MCP_SETUP.md instructions)
```

### Issue: "Token budget exceeded warning"

**Cause:** Too many components discovered

**Fix:**
- Expected behavior - components auto-trimmed
- Check console for trimming log
- Verify `tokenUsage.withinBudget` is `true`

### Issue: "Cache not working"

**Cause:** LocalStorage disabled or full

**Fix:**
```javascript
// In browser console
localStorage.clear();
location.reload();
```

### Issue: "Namespace components not rendering"

**Cause:** Registry merger not applied

**Fix:**
- Verify `NEXT_PUBLIC_USE_COMPONENT_NAMESPACES=true`
- Check console for merge logs
- Restart dev server

---

## Next Steps

After successful Phase 1 validation:

1. **Phase 2 Pilot**: Enable for ShadCN framework only
2. **Monitor Metrics**: Track latency, cache hits, component usage
3. **User Testing**: A/B test with real users
4. **Optimization**: Based on metrics, optimize cache and discovery
5. **Phase 3+**: Expand to all frameworks

---

## Support

- **Documentation**: See `PHASE_1_SUMMARY.md` for detailed info
- **API Reference**: See `MCP_DISCOVERY_INTEGRATION.md`
- **Namespace Guide**: See `src/lib/registry/USAGE_EXAMPLES.md`
- **Console Logs**: Check browser console and terminal for debugging info
