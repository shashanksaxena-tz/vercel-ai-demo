/**
 * MCP Build Registry API
 *
 * POST /api/mcp/build-registry
 *
 * Builds a dynamic json-render compatible registry from discovered components.
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  mcpClient,
  MCP_SERVERS,
  connectToServer,
  analyzeRequest,
  getRecommendedSources,
  addToRegistryStore,
  getRegistryStore,
  clearRegistryStore,
  fetchComponentSource,
  type MCPServerType,
  type ComponentMetadata,
  type DynamicComponentDef,
} from '@/lib/mcp';

// Initialize MCP connections on first request
let initialized = false;

async function ensureInitialized() {
  if (initialized) return;

  const servers: MCPServerType[] = ['ui-layouts', 'shadcn-ui', 'tailwindcss', 'flowbite'];

  await Promise.allSettled(
    servers
      .filter((s) => MCP_SERVERS[s]?.enabled)
      .map((s) => connectToServer(s, MCP_SERVERS[s]))
  );

  initialized = true;
}

interface BuildRegistryRequest {
  userRequest?: string;
  components?: ComponentMetadata[];
  clearExisting?: boolean;
}

interface BuildRegistryResponse {
  registry: Record<string, DynamicComponentDef>;
  componentCount: number;
  sources: MCPServerType[];
  timing: number;
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    await ensureInitialized();

    const body: BuildRegistryRequest = await request.json();
    const { userRequest, components, clearExisting = false } = body;

    if (!userRequest && !components) {
      return NextResponse.json(
        { error: 'Either userRequest or components array is required' },
        { status: 400 }
      );
    }

    // Clear existing registry if requested
    if (clearExisting) {
      clearRegistryStore();
    }

    let discoveredComponents: ComponentMetadata[] = components || [];

    // If user request provided, analyze and discover components
    if (userRequest) {
      const analysis = analyzeRequest(userRequest);
      const sources = getRecommendedSources(analysis);

      // Search for components matching the analysis
      for (const query of analysis.searchQueries.slice(0, 8)) {
        try {
          const found = await mcpClient.searchComponents(query, sources);
          discoveredComponents.push(...found);
        } catch {
          // Continue with other queries
        }
      }

      // Deduplicate
      discoveredComponents = Array.from(
        new Map(discoveredComponents.map((c) => [c.id, c])).values()
      );
    }

    // Add components to registry store
    addToRegistryStore(discoveredComponents, fetchComponentSource);

    // Get the updated registry
    const store = getRegistryStore();

    // Convert Map to plain object for JSON response
    const registryObj: Record<string, DynamicComponentDef> = {};
    for (const [key, value] of store.components) {
      registryObj[key] = value;
    }

    const response: BuildRegistryResponse = {
      registry: registryObj,
      componentCount: store.components.size,
      sources: Array.from(store.sources),
      timing: Date.now() - startTime,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('MCP build-registry error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Registry build failed',
        timing: Date.now() - startTime,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Return current registry state
  const store = getRegistryStore();

  const registryObj: Record<string, DynamicComponentDef> = {};
  for (const [key, value] of store.components) {
    registryObj[key] = value;
  }

  return NextResponse.json({
    registry: registryObj,
    componentCount: store.components.size,
    sources: Array.from(store.sources),
    lastUpdated: store.lastUpdated.toISOString(),
  });
}

export async function DELETE() {
  clearRegistryStore();

  return NextResponse.json({
    message: 'Registry cleared',
    timestamp: new Date().toISOString(),
  });
}
