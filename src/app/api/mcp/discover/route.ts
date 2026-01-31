/**
 * MCP Component Discovery API
 *
 * POST /api/mcp/discover
 *
 * Searches for components across connected MCP servers.
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  mcpClient,
  MCP_SERVERS,
  connectToServer,
  type MCPServerType,
  type DiscoverComponentsRequest,
  type DiscoverComponentsResponse,
} from '@/lib/mcp';

// Initialize MCP connections on first request
let initialized = false;

async function ensureInitialized() {
  if (initialized) return;

  const servers: MCPServerType[] = [
    'ui-layouts',
    'shadcn-ui',
    'tailwindcss',
    'flowbite',
    'chakra-ui',
    'magic-ui',
    'aceternity-ui',
    'mui',
    'context7',
  ];

  await Promise.allSettled(
    servers
      .filter((s) => MCP_SERVERS[s]?.enabled)
      .map((s) => connectToServer(s, MCP_SERVERS[s]))
  );

  initialized = true;
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    await ensureInitialized();

    const body: DiscoverComponentsRequest = await request.json();
    const { query, sources, limit = 20 } = body;

    if (!query) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    // Search across specified sources or all enabled servers
    const serverSources = (sources || [
      'ui-layouts',
      'shadcn-ui',
      'tailwindcss',
      'flowbite',
      'chakra-ui',
      'magic-ui',
      'aceternity-ui',
      'mui',
    ]) as MCPServerType[];

    const components = await mcpClient.searchComponents(query, serverSources);

    // Apply limit
    const limitedComponents = components.slice(0, limit);

    const response: DiscoverComponentsResponse = {
      components: limitedComponents,
      sources: serverSources,
      timing: Date.now() - startTime,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('MCP discover error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Discovery failed',
        timing: Date.now() - startTime,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    endpoint: '/api/mcp/discover',
    method: 'POST',
    description: 'Search for components across MCP servers',
    body: {
      query: 'string (required) - Search query',
      sources: 'MCPServerType[] (optional) - Sources to search',
      limit: 'number (optional) - Max results (default: 20)',
    },
  });
}
