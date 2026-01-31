/**
 * MCP Component Source Fetch API
 *
 * POST /api/mcp/fetch
 *
 * Fetches the source code for a specific component from an MCP server.
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  fetchComponentSource,
  cacheComponent,
  getCachedComponent,
  MCP_SERVERS,
  connectToServer,
  type MCPServerType,
  type FetchSourceRequest,
  type FetchSourceResponse,
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

    const body: FetchSourceRequest = await request.json();
    const { componentId, source } = body;

    if (!componentId || !source) {
      return NextResponse.json(
        { error: 'componentId and source are required' },
        { status: 400 }
      );
    }

    // Check cache first
    const cached = getCachedComponent(componentId);
    if (cached?.source) {
      return NextResponse.json({
        source: cached.source,
        timing: Date.now() - startTime,
        cached: true,
      });
    }

    // Fetch from MCP server
    const componentSource = await fetchComponentSource(componentId, source as MCPServerType);

    if (!componentSource) {
      return NextResponse.json(
        {
          error: 'Component not found',
          timing: Date.now() - startTime,
        },
        { status: 404 }
      );
    }

    // Cache the result
    cacheComponent(
      {
        id: componentId,
        name: componentId.split(':')[1] || componentId,
        displayName: componentId.split(':')[1] || componentId,
        description: '',
        category: 'other',
        tags: [],
        source: source as MCPServerType,
      },
      componentSource
    );

    const response: FetchSourceResponse = {
      source: componentSource,
      timing: Date.now() - startTime,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('MCP fetch error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Fetch failed',
        timing: Date.now() - startTime,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    endpoint: '/api/mcp/fetch',
    method: 'POST',
    description: 'Fetch component source code from an MCP server',
    body: {
      componentId: 'string (required) - Component ID (e.g., "ui-layouts:hero-section")',
      source: 'MCPServerType (required) - Source server type',
    },
  });
}
