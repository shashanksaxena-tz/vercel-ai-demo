# MCP Component Discovery Architecture
## System Overview & Data Flow

This document describes the architecture of the dynamic MCP component discovery system.

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                          USER REQUEST                            │
│              "Create a dashboard with charts"                    │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    FEATURE FLAG CHECK                            │
│          NEXT_PUBLIC_ENABLE_DYNAMIC_DISCOVERY                    │
└───────────┬────────────────────────────────┬────────────────────┘
            │                                │
       FALSE│                                │TRUE
            │                                │
            ▼                                ▼
┌────────────────────────┐    ┌──────────────────────────────────┐
│   STANDARD PIPELINE    │    │   MCP DISCOVERY PIPELINE         │
│   (78 core components) │    │   (200+ components)              │
└────────────┬───────────┘    └─────────────┬────────────────────┘
             │                               │
             │                               │
             │                ┌──────────────▼─────────────────┐
             │                │  1. INTENT ANALYSIS            │
             │                │  smart-discovery.ts            │
             │                │  analyzeRequest()              │
             │                └──────────────┬─────────────────┘
             │                               │
             │                               ▼
             │                ┌──────────────────────────────────┐
             │                │  2. COMPONENT DISCOVERY          │
             │                │  /api/mcp/discover-batch         │
             │                │  Parallel MCP Queries            │
             │                └──────────────┬───────────────────┘
             │                               │
             │                               ▼
             │                ┌──────────────────────────────────┐
             │                │  3. PROMPT ENHANCEMENT           │
             │                │  dynamic-prompts.ts              │
             │                │  buildEnhancedSystemPrompt()     │
             │                └──────────────┬───────────────────┘
             │                               │
             └───────────────────────────────┼──────────────────┐
                                             │                  │
                                             ▼                  │
                              ┌──────────────────────────────┐  │
                              │  4. AI GENERATION            │  │
                              │  Gemini 2.5 Flash            │  │
                              │  Core + MCP Components       │  │
                              └──────────────┬───────────────┘  │
                                             │                  │
                                             ▼                  │
                              ┌──────────────────────────────┐  │
                              │  5. UI TREE OUTPUT           │  │
                              │  + Telemetry                 │  │
                              └──────────────┬───────────────┘  │
                                             │                  │
                                             ▼                  ▼
                              ┌────────────────────────────────────┐
                              │        RENDERED UI                 │
                              └────────────────────────────────────┘
```

---

## Component Architecture

### 1. Smart Discovery Engine

```
┌─────────────────────────────────────────────────────────────────┐
│                    smart-discovery.ts                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  analyzeRequest(request: string)                                │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Input: "Create a dashboard with charts"                  │  │
│  │                                                           │  │
│  │ Process:                                                  │  │
│  │ 1. Normalize text to lowercase                           │  │
│  │ 2. Match keywords against intent patterns                │  │
│  │ 3. Calculate match scores                                │  │
│  │ 4. Select best-matching intent                           │  │
│  │                                                           │  │
│  │ Output: DiscoveryIntent {                                │  │
│  │   intent: 'dashboard',                                   │  │
│  │   coreComponents: ['Container', 'Grid', ...],            │  │
│  │   contextComponents: ['LineChart', 'DataTable', ...],    │  │
│  │   mcpSources: ['shadcn-ui', 'mui', ...],                 │  │
│  │   searchQueries: ['chart', 'table', 'metric'],           │  │
│  │   estimatedTokens: 5000                                  │  │
│  │ }                                                         │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  Intent Patterns:                                               │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ dashboard: keywords=['dashboard', 'analytics', ...]      │  │
│  │ landing-page: keywords=['hero', 'pricing', ...]          │  │
│  │ form: keywords=['form', 'input', 'signup', ...]          │  │
│  │ data-table: keywords=['table', 'grid', 'pagination']     │  │
│  │ marketing: keywords=['banner', 'notification', ...]      │  │
│  │ admin: keywords=['settings', 'navigation', ...]          │  │
│  │ app: keywords=['application', 'ui', ...]                 │  │
│  │ general: fallback (no specific keywords)                 │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  prioritizeComponents()                                         │
│  adjustForBudget()                                              │
│  estimateComponentTokens()                                      │
└─────────────────────────────────────────────────────────────────┘
```

### 2. Component Cache System

```
┌─────────────────────────────────────────────────────────────────┐
│                   component-cache.ts                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Multi-Layer Caching Strategy:                                  │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │ Layer 1: MEMORY CACHE (MemoryCache)                    │    │
│  │ ┌────────────────────────────────────────────────────┐ │    │
│  │ │ Lookup: < 10ms                                     │ │    │
│  │ │ Storage: Map<string, CacheEntry<T>>                │ │    │
│  │ │ TTL: 5 minutes                                     │ │    │
│  │ │ Eviction: LRU (Least Recently Used)               │ │    │
│  │ │ Stats: hits, misses, hitRate                      │ │    │
│  │ └────────────────────────────────────────────────────┘ │    │
│  └────────────────────┬───────────────────────────────────┘    │
│                       │ Cache Miss ▼                            │
│  ┌────────────────────────────────────────────────────────┐    │
│  │ Layer 2: LOCALSTORAGE CACHE                            │    │
│  │ ┌────────────────────────────────────────────────────┐ │    │
│  │ │ Lookup: < 50ms                                     │ │    │
│  │ │ Storage: Browser LocalStorage                      │ │    │
│  │ │ TTL: 5 minutes                                     │ │    │
│  │ │ Persistence: Survives page reloads                │ │    │
│  │ │ Key Format: mcp-metadata:framework::component      │ │    │
│  │ └────────────────────────────────────────────────────┘ │    │
│  └────────────────────┬───────────────────────────────────┘    │
│                       │ Cache Miss ▼                            │
│  ┌────────────────────────────────────────────────────────┐    │
│  │ Layer 3: INDEXEDDB CACHE (Source Code)                 │    │
│  │ ┌────────────────────────────────────────────────────┐ │    │
│  │ │ Lookup: < 100ms                                    │ │    │
│  │ │ Storage: IndexedDB (larger capacity)              │ │    │
│  │ │ Use Case: Component source code                   │ │    │
│  │ │ TTL: 5 minutes                                     │ │    │
│  │ └────────────────────────────────────────────────────┘ │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                  │
│  ComponentCacheManager API:                                     │
│  ┌────────────────────────────────────────────────────────┐    │
│  │ getMetadata(framework, component)                       │    │
│  │ setMetadata(framework, component, metadata, ttl)        │    │
│  │ getBatchMetadata([{framework, component}, ...])         │    │
│  │ preloadFramework(framework, topComponents)              │    │
│  │ getStats() → {hits, misses, size, hitRate}              │    │
│  │ clearAll()                                              │    │
│  └────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

### 3. Batch Discovery API

```
┌─────────────────────────────────────────────────────────────────┐
│              /api/mcp/discover-batch/route.ts                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  POST /api/mcp/discover-batch                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Request Body: {                                          │  │
│  │   framework: 'react',                                    │  │
│  │   queries: ['chart', 'table', 'metric'],                 │  │
│  │   sources: ['shadcn-ui', 'mui'],                         │  │
│  │   limitPerQuery: 10,                                     │  │
│  │   useCache: true                                         │  │
│  │ }                                                         │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  Processing Flow:                                               │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ 1. Validate Request                                      │  │
│  │    ├─ Check queries array                                │  │
│  │    ├─ Validate framework                                 │  │
│  │    └─ Set defaults for optional params                   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ 2. Check Cache (if useCache=true)                        │  │
│  │    ├─ Generate cache keys                                │  │
│  │    ├─ Lookup in componentCache                           │  │
│  │    └─ Track hits/misses                                  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ 3. Parallel MCP Queries                                  │  │
│  │    ┌────────────────────────────────────────────────┐    │  │
│  │    │ For each query × source combination:          │    │  │
│  │    │                                                │    │  │
│  │    │ Promise.race([                                │    │  │
│  │    │   mcpClient.search(query, source),            │    │  │
│  │    │   timeout(2000ms)                             │    │  │
│  │    │ ])                                            │    │  │
│  │    │                                                │    │  │
│  │    │ Example:                                       │    │  │
│  │    │ ['chart' × shadcn] → searchShadcn('chart')    │    │  │
│  │    │ ['chart' × mui]    → searchMUI('chart')       │    │  │
│  │    │ ['table' × shadcn] → searchShadcn('table')    │    │  │
│  │    │ ['table' × mui]    → searchMUI('table')       │    │  │
│  │    └────────────────────────────────────────────────┘    │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ 4. Deduplication                                         │  │
│  │    ├─ Use source:name as unique key                      │  │
│  │    ├─ Filter duplicates                                  │  │
│  │    └─ Framework filtering (React vs HTML)                │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ 5. Cache Results                                         │  │
│  │    └─ Store in componentCache for future requests        │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  Response:                                                      │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ {                                                         │  │
│  │   components: MCPComponentMetadata[],                    │  │
│  │   count: 15,                                             │  │
│  │   sources: ['shadcn-ui', 'mui'],                         │  │
│  │   cache: {hits: 2, misses: 3},                           │  │
│  │   timing: {                                              │  │
│  │     total: 450,                                          │  │
│  │     perQuery: {...},                                     │  │
│  │     perSource: {...}                                     │  │
│  │   },                                                      │  │
│  │   errors: []                                             │  │
│  │ }                                                         │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### 4. Dynamic Prompt Builder

```
┌─────────────────────────────────────────────────────────────────┐
│                  dynamic-prompts.ts                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Token Budget Management:                                       │
│  ┌────────────────────────────────────────────────────────┐    │
│  │ TOTAL LIMIT: 15,000 tokens                              │    │
│  │                                                         │    │
│  │ ┌─────────────────────────────────────────────────┐   │    │
│  │ │ Core Components: ~7,800 tokens (fixed)          │   │    │
│  │ │ ├─ Layout (7 components)                        │   │    │
│  │ │ ├─ Typography (5 components)                    │   │    │
│  │ │ ├─ Forms (7 components)                         │   │    │
│  │ │ ├─ Data Display (20+ components)                │   │    │
│  │ │ ├─ Feedback (5 components)                      │   │    │
│  │ │ ├─ Navigation (8 components)                    │   │    │
│  │ │ └─ Marketing (8 components)                     │   │    │
│  │ └─────────────────────────────────────────────────┘   │    │
│  │                                                         │    │
│  │ ┌─────────────────────────────────────────────────┐   │    │
│  │ │ MCP Components: 0-5,000 tokens (dynamic)        │   │    │
│  │ │ ├─ Intent-based discovery                       │   │    │
│  │ │ ├─ Priority ranking                             │   │    │
│  │ │ ├─ Auto-trimming if exceeded                    │   │    │
│  │ │ └─ Max 50 components                            │   │    │
│  │ └─────────────────────────────────────────────────┘   │    │
│  │                                                         │    │
│  │ ┌─────────────────────────────────────────────────┐   │    │
│  │ │ Rules & Structure: ~2,200 tokens (fixed)        │   │    │
│  │ │ ├─ UITree documentation                         │   │    │
│  │ │ ├─ Generation rules                             │   │    │
│  │ │ └─ Quality checklist                            │   │    │
│  │ └─────────────────────────────────────────────────┘   │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                  │
│  buildEnhancedSystemPrompt():                                   │
│  ┌────────────────────────────────────────────────────────┐    │
│  │ 1. Check feature flag                                   │    │
│  │ 2. Calculate token budget                               │    │
│  │ 3. Build MCP components section                         │    │
│  │ 4. Add namespace training                               │    │
│  │ 5. Merge with core prompt                               │    │
│  │ 6. Auto-trim if needed                                  │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                  │
│  Namespace Training Example:                                    │
│  ┌────────────────────────────────────────────────────────┐    │
│  │ ## Component Namespaces                                 │    │
│  │                                                         │    │
│  │ core::* - 78 core components (always available)        │    │
│  │ mcp::*  - MCP-discovered components (context-aware)    │    │
│  │                                                         │    │
│  │ Usage:                                                  │    │
│  │ {                                                       │    │
│  │   "type": "core::Button",     // Standard button       │    │
│  │   "type": "mcp::ShimmerButton" // Animated button      │    │
│  │ }                                                       │    │
│  └────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

### 5. Framework Registry Enhancement

```
┌─────────────────────────────────────────────────────────────────┐
│                framework-registry.ts                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Namespace Support:                                             │
│  ┌────────────────────────────────────────────────────────┐    │
│  │ parseComponentType(type: string)                        │    │
│  │ ├─ "Button" → {namespace: "core", component: "Button"} │    │
│  │ ├─ "core::Container" → {namespace: "core", ...}        │    │
│  │ └─ "mcp::ShimmerButton" → {namespace: "mcp", ...}      │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                  │
│  mergeRegistry(baseRegistry, mcpComponents):                    │
│  ┌────────────────────────────────────────────────────────┐    │
│  │ Input: Base Registry (78 components)                    │    │
│  │ ┌────────────────────────────────────────────────────┐ │    │
│  │ │ {                                                  │ │    │
│  │ │   components: {                                    │ │    │
│  │ │     'Button': ButtonComponent,                     │ │    │
│  │ │     'Container': ContainerComponent,               │ │    │
│  │ │     ...                                            │ │    │
│  │ │   }                                                │ │    │
│  │ │ }                                                  │ │    │
│  │ └────────────────────────────────────────────────────┘ │    │
│  │                                                         │    │
│  │ Process:                                                │    │
│  │ 1. Namespace core components → core::*                 │    │
│  │ 2. Add MCP components → mcp::*                         │    │
│  │ 3. Preserve backward compat → Button → core::Button   │    │
│  │                                                         │    │
│  │ Output: Enhanced Registry                               │    │
│  │ ┌────────────────────────────────────────────────────┐ │    │
│  │ │ {                                                  │ │    │
│  │ │   components: {                                    │ │    │
│  │ │     // Core (namespaced)                           │ │    │
│  │ │     'core::Button': ButtonComponent,               │ │    │
│  │ │     'core::Container': ContainerComponent,         │ │    │
│  │ │                                                    │ │    │
│  │ │     // MCP (namespaced)                            │ │    │
│  │ │     'mcp::ShimmerButton': ShimmerButtonComponent,  │ │    │
│  │ │     'mcp::DataTable': DataTableComponent,          │ │    │
│  │ │                                                    │ │    │
│  │ │     // Backward compat (non-namespaced)            │ │    │
│  │ │     'Button': ButtonComponent,  // → core::Button  │ │    │
│  │ │     'Container': ContainerComponent                │ │    │
│  │ │   }                                                │ │    │
│  │ │ }                                                  │ │    │
│  │ └────────────────────────────────────────────────────┘ │    │
│  └────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

---

## Data Flow Example: Dashboard Generation

```
1. User Request
   "Create a dashboard with revenue metrics"
   │
   ▼
2. Feature Flag Check
   NEXT_PUBLIC_ENABLE_DYNAMIC_DISCOVERY=true
   │
   ▼
3. Intent Analysis (smart-discovery.ts)
   analyzeRequest("Create a dashboard with revenue metrics")
   │
   ├─ Keyword matching: "dashboard", "metrics"
   ├─ Intent: dashboard
   ├─ Context components: ['LineChart', 'BarChart', 'DataTable', 'StatCard']
   └─ Search queries: ['chart', 'graph', 'table', 'metric']
   │
   ▼
4. Component Discovery (/api/mcp/discover-batch)
   POST {
     queries: ['chart', 'graph', 'table', 'metric'],
     sources: ['shadcn-ui', 'mui', 'chakra-ui'],
     framework: 'react'
   }
   │
   ├─ Parallel queries to MCP servers:
   │  ├─ shadcn-ui: ['chart'] → LineChart, AreaChart, ...
   │  ├─ mui: ['chart'] → MuiChart, MuiDataGrid, ...
   │  ├─ shadcn-ui: ['table'] → DataTable, ...
   │  └─ ...
   │
   ├─ Deduplication: 15 unique components
   ├─ Cache: 3 hits, 2 misses
   └─ Timing: 450ms
   │
   ▼
5. Prompt Enhancement (dynamic-prompts.ts)
   buildEnhancedSystemPrompt(discoveredComponents)
   │
   ├─ Core components: 7,800 tokens
   ├─ MCP components: 1,500 tokens (15 components)
   ├─ Total: 9,300 tokens (within 15,000 budget)
   └─ Namespace training included
   │
   ▼
6. AI Generation (Gemini 2.5 Flash)
   System Prompt: Enhanced with MCP components
   User Prompt: "Create a dashboard with revenue metrics"
   │
   └─ Generates UITree with:
      ├─ core::Container
      ├─ core::Grid
      ├─ mcp::LineChart (discovered)
      ├─ mcp::DataTable (discovered)
      └─ mcp::StatCard (discovered)
   │
   ▼
7. Response
   {
     tree: { ... },
     explanation: "...",
     telemetry: {
       discoveryEnabled: true,
       intent: "dashboard",
       mcpComponentsDiscovered: 15,
       tokenUsage: {
         core: 7800,
         mcp: 1500,
         total: 9300,
         withinBudget: true
       },
       discoveryTime: 450
     }
   }
```

---

## Performance Characteristics

### Latency Breakdown

```
Total Request Time: 2-3 seconds (with discovery enabled)

┌──────────────────────────────────────────────┐
│ Intent Analysis:          100ms              │
├──────────────────────────────────────────────┤
│ Component Discovery:      450ms              │
│ ├─ Cache lookup:          50ms               │
│ ├─ MCP queries (parallel): 300ms             │
│ └─ Deduplication:         100ms              │
├──────────────────────────────────────────────┤
│ Prompt Building:          100ms              │
├──────────────────────────────────────────────┤
│ AI Generation:            1500ms             │
├──────────────────────────────────────────────┤
│ Response Formatting:      50ms               │
└──────────────────────────────────────────────┘
```

### Cache Performance

```
Warmup Phase (First 5 requests):
├─ Cache hits: 20%
├─ Cache misses: 80%
└─ Average latency: 2.5s

Steady State (After warmup):
├─ Cache hits: 95%+
├─ Cache misses: 5%
└─ Average latency: 1.8s
```

---

## Scaling Considerations

### Current Limits
- Max MCP components per request: 50
- Max token budget: 15,000
- MCP timeout: 2 seconds per server
- Cache TTL: 5 minutes

### Future Optimizations
1. **Preloading**: Background preload of top 50 components
2. **CDN Caching**: Edge caching for popular components
3. **Batch Optimization**: Combine similar queries
4. **Predictive Caching**: ML-based component prediction

---

## Error Handling

```
┌─────────────────────────────────────────────┐
│ Error Scenarios & Recovery                  │
├─────────────────────────────────────────────┤
│                                             │
│ 1. MCP Server Timeout (> 2s)                │
│    └─ Fallback: Use cached components       │
│                                             │
│ 2. MCP Server Unavailable                   │
│    └─ Fallback: Core 78 components only     │
│                                             │
│ 3. Token Budget Exceeded                    │
│    └─ Fallback: Auto-trim MCP components    │
│                                             │
│ 4. Cache Full (LocalStorage limit)          │
│    └─ Fallback: LRU eviction                │
│                                             │
│ 5. Discovery API Failure                    │
│    └─ Fallback: Standard generation         │
│                                             │
└─────────────────────────────────────────────┘
```

---

## Conclusion

This architecture provides:
- ✅ Intelligent component discovery based on user intent
- ✅ Token-budget-aware prompt construction
- ✅ Multi-layer caching for performance
- ✅ Graceful degradation on failures
- ✅ Zero breaking changes (feature flag controlled)
- ✅ Scalable to 200+ components across 8 frameworks
