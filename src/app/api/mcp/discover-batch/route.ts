/**
 * MCP Batch Component Discovery API
 *
 * POST /api/mcp/discover-batch
 *
 * Discovers components from multiple MCP servers in parallel with timeout handling.
 * Returns standardized component metadata compatible with MCPComponentMetadata format.
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  mcpClient,
  MCP_SERVERS,
  connectToServer,
  searchUILayouts,
  searchShadcn,
  searchTailwind,
  searchFlowbite,
  searchChakraUI,
  searchMagicUI,
  searchAceternityUI,
  searchMUI,
  type MCPServerType,
  type ComponentMetadata,
} from '@/lib/mcp';
import type { MCPComponentMetadata } from '@/lib/ai/dynamic-prompts';
import { componentCache } from '@/lib/mcp/component-cache';

// ============================================================================
// Request/Response Types
// ============================================================================

export interface BatchDiscoveryRequest {
  /** Framework to filter components by */
  framework?: 'react' | 'vue' | 'svelte' | 'html';

  /** Search queries to execute in parallel */
  queries: string[];

  /** MCP server sources to query */
  sources?: MCPServerType[];

  /** Maximum results per query */
  limitPerQuery?: number;

  /** Use cached results if available */
  useCache?: boolean;
}

export interface BatchDiscoveryResponse {
  /** Discovered components in MCPComponentMetadata format */
  components: MCPComponentMetadata[];

  /** Number of components discovered */
  count: number;

  /** Sources that were queried */
  sources: MCPServerType[];

  /** Cache statistics */
  cache: {
    hits: number;
    misses: number;
  };

  /** Timing information */
  timing: {
    total: number;
    perQuery: Record<string, number>;
    perSource: Record<string, number>;
  };

  /** Errors that occurred (non-fatal) */
  errors?: Array<{
    source: MCPServerType;
    query: string;
    error: string;
  }>;
}

// ============================================================================
// Initialization
// ============================================================================

let initialized = false;

async function ensureInitialized() {
  if (initialized) return;

  const componentServers: MCPServerType[] = [
    'ui-layouts',
    'shadcn-ui',
    'tailwindcss',
    'flowbite',
    'chakra-ui',
    'magic-ui',
    'aceternity-ui',
    'mui',
  ];

  // Connect to all enabled servers in parallel
  await Promise.allSettled(
    componentServers
      .filter((s) => MCP_SERVERS[s]?.enabled)
      .map((s) => connectToServer(s, MCP_SERVERS[s]))
  );

  initialized = true;
}

// ============================================================================
// Component Discovery with Timeout
// ============================================================================

/**
 * Execute a search function with timeout
 */
async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  timeoutValue: T
): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((resolve) => setTimeout(() => resolve(timeoutValue), timeoutMs)),
  ]);
}

/**
 * Search a specific MCP server with timeout handling
 */
async function searchServerWithTimeout(
  serverType: MCPServerType,
  query: string,
  timeoutMs: number = 2000
): Promise<{ results: ComponentMetadata[]; timing: number }> {
  const startTime = Date.now();

  try {
    let searchPromise: Promise<ComponentMetadata[]>;

    switch (serverType) {
      case 'ui-layouts':
        searchPromise = searchUILayouts(query);
        break;
      case 'shadcn-ui':
        searchPromise = searchShadcn(query);
        break;
      case 'tailwindcss':
        searchPromise = searchTailwind(query);
        break;
      case 'flowbite':
        searchPromise = searchFlowbite(query);
        break;
      case 'chakra-ui':
        searchPromise = searchChakraUI(query);
        break;
      case 'magic-ui':
        searchPromise = searchMagicUI(query);
        break;
      case 'aceternity-ui':
        searchPromise = searchAceternityUI(query);
        break;
      case 'mui':
        searchPromise = searchMUI(query);
        break;
      default:
        return { results: [], timing: 0 };
    }

    const results = await withTimeout(searchPromise, timeoutMs, []);
    return { results, timing: Date.now() - startTime };
  } catch (error) {
    console.warn(`[BatchDiscovery] ${serverType} search failed for "${query}":`, error);
    return { results: [], timing: Date.now() - startTime };
  }
}

/**
 * Convert ComponentMetadata to MCPComponentMetadata format
 */
function toMCPComponentMetadata(component: ComponentMetadata): MCPComponentMetadata {
  return {
    name: component.name,
    description: component.description,
    props: component.props?.reduce((acc, prop) => {
      acc[prop.name] = {
        type: prop.type,
        description: prop.description,
        required: prop.required,
        default: prop.default,
      };
      return acc;
    }, {} as Record<string, any>),
    source: component.source,
    examples: component.preview ? [component.preview] : undefined,
    tags: component.tags,
    dependencies: typeof component.dependencies === 'object' && !Array.isArray(component.dependencies)
      ? component.dependencies
      : undefined,
    animations: component.animations,
  };
}

// ============================================================================
// Cache Integration
// ============================================================================

/**
 * Get cached components for a framework and query
 */
async function getCachedComponents(
  framework: string,
  query: string
): Promise<MCPComponentMetadata[]> {
  const cacheKey = `batch:${framework}:${query}`;

  // Try to get from cache (framework is used as prefix for cache key)
  const cached = await componentCache.getMetadata(framework, cacheKey);

  return cached ? [cached] : [];
}

/**
 * Cache discovered components
 */
async function cacheComponents(
  framework: string,
  query: string,
  components: MCPComponentMetadata[]
): Promise<void> {
  const cacheKey = `batch:${framework}:${query}`;

  // Cache each component individually
  await Promise.all(
    components.map((component) =>
      componentCache.setMetadata(framework, component.name, component)
    )
  );
}

// ============================================================================
// Batch Discovery
// ============================================================================

export async function POST(request: NextRequest) {
  const overallStartTime = Date.now();

  try {
    await ensureInitialized();

    const body: BatchDiscoveryRequest = await request.json();
    const {
      framework = 'react',
      queries = [],
      sources,
      limitPerQuery = 10,
      useCache = true,
    } = body;

    if (!queries || queries.length === 0) {
      return NextResponse.json(
        { error: 'At least one query is required' },
        { status: 400 }
      );
    }

    // Determine which sources to query
    const defaultSources: MCPServerType[] = [
      'ui-layouts',
      'shadcn-ui',
      'tailwindcss',
      'flowbite',
      'chakra-ui',
      'magic-ui',
      'aceternity-ui',
      'mui',
    ];

    const serverSources = (sources || defaultSources).filter(
      (s) => MCP_SERVERS[s]?.enabled
    );

    // Track timing and errors
    const timingPerQuery: Record<string, number> = {};
    const timingPerSource: Record<string, number> = {};
    const errors: Array<{ source: MCPServerType; query: string; error: string }> = [];
    let cacheHits = 0;
    let cacheMisses = 0;

    // Execute all queries in parallel across all sources
    const allComponents: MCPComponentMetadata[] = [];
    const seenComponentIds = new Set<string>();

    await Promise.all(
      queries.map(async (query) => {
        const queryStartTime = Date.now();

        // Check cache first
        if (useCache) {
          const cachedComponents = await getCachedComponents(framework, query);
          if (cachedComponents.length > 0) {
            cacheHits++;
            cachedComponents.forEach((comp) => {
              const id = `${comp.source}:${comp.name}`;
              if (!seenComponentIds.has(id)) {
                seenComponentIds.add(id);
                allComponents.push(comp);
              }
            });
            timingPerQuery[query] = Date.now() - queryStartTime;
            return;
          }
        }

        cacheMisses++;

        // Query all sources in parallel for this query
        const sourceResults = await Promise.all(
          serverSources.map(async (source) => {
            const sourceStartTime = Date.now();
            const { results, timing } = await searchServerWithTimeout(
              source,
              query,
              2000 // 2-second timeout per source
            );

            // Track timing per source
            timingPerSource[source] = (timingPerSource[source] || 0) + timing;

            // Convert to MCPComponentMetadata format
            const converted = results
              .slice(0, limitPerQuery)
              .map(toMCPComponentMetadata);

            return { source, results: converted };
          })
        );

        // Collect results and deduplicate
        const queryComponents: MCPComponentMetadata[] = [];
        for (const { source, results } of sourceResults) {
          for (const component of results) {
            const id = `${component.source}:${component.name}`;
            if (!seenComponentIds.has(id)) {
              seenComponentIds.add(id);
              queryComponents.push(component);
            }
          }
        }

        // Filter by framework if specified
        const filteredComponents = queryComponents.filter((comp) => {
          // React components from all sources except tailwindcss/flowbite (HTML)
          if (framework === 'react') {
            return !['tailwindcss', 'flowbite'].includes(comp.source);
          }
          // HTML components from tailwindcss/flowbite
          if (framework === 'html') {
            return ['tailwindcss', 'flowbite'].includes(comp.source);
          }
          return true;
        });

        allComponents.push(...filteredComponents);

        // Cache the results
        if (useCache && filteredComponents.length > 0) {
          await cacheComponents(framework, query, filteredComponents);
        }

        timingPerQuery[query] = Date.now() - queryStartTime;
      })
    );

    const response: BatchDiscoveryResponse = {
      components: allComponents,
      count: allComponents.length,
      sources: serverSources,
      cache: {
        hits: cacheHits,
        misses: cacheMisses,
      },
      timing: {
        total: Date.now() - overallStartTime,
        perQuery: timingPerQuery,
        perSource: timingPerSource,
      },
      errors: errors.length > 0 ? errors : undefined,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('[BatchDiscovery] Error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Batch discovery failed',
        timing: {
          total: Date.now() - overallStartTime,
          perQuery: {},
          perSource: {},
        },
      },
      { status: 500 }
    );
  }
}

// ============================================================================
// GET endpoint for API documentation
// ============================================================================

export async function GET() {
  return NextResponse.json({
    endpoint: '/api/mcp/discover-batch',
    method: 'POST',
    description: 'Batch component discovery from multiple MCP servers with parallel queries',
    body: {
      framework: 'string (optional) - Framework to filter by (react, vue, svelte, html). Default: react',
      queries: 'string[] (required) - Search queries to execute in parallel',
      sources: 'MCPServerType[] (optional) - MCP servers to query. Default: all enabled',
      limitPerQuery: 'number (optional) - Max results per query. Default: 10',
      useCache: 'boolean (optional) - Use cached results. Default: true',
    },
    response: {
      components: 'MCPComponentMetadata[] - Discovered components',
      count: 'number - Total components found',
      sources: 'MCPServerType[] - Sources that were queried',
      cache: 'object - Cache hit/miss statistics',
      timing: 'object - Timing breakdown by query and source',
      errors: 'array (optional) - Non-fatal errors that occurred',
    },
    features: [
      'Parallel MCP server queries with 2-second timeout',
      'Automatic deduplication of components',
      'Framework-based filtering',
      'Multi-layer caching (memory + localStorage)',
      'Detailed timing and error tracking',
      'Graceful fallback on errors',
    ],
    example: {
      request: {
        framework: 'react',
        queries: ['button', 'card', 'table'],
        sources: ['shadcn-ui', 'mui', 'chakra-ui'],
        limitPerQuery: 5,
        useCache: true,
      },
    },
  });
}
