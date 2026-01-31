/**
 * MCP Context7 Documentation API
 *
 * POST /api/mcp/docs
 *
 * Fetches documentation for any library using Context7.
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  MCP_SERVERS,
  connectToServer,
  type MCPServerType,
} from '@/lib/mcp';
import { fetchContext7Docs } from '@/lib/mcp/mcp-client';

// Initialize MCP connections on first request
let initialized = false;

async function ensureInitialized() {
  if (initialized) return;

  const servers: MCPServerType[] = ['context7'];

  await Promise.allSettled(
    servers
      .filter((s) => MCP_SERVERS[s]?.enabled)
      .map((s) => connectToServer(s, MCP_SERVERS[s]))
  );

  initialized = true;
}

interface DocsRequest {
  library: string;
  query: string;
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    await ensureInitialized();

    const body: DocsRequest = await request.json();
    const { library, query } = body;

    if (!library || !query) {
      return NextResponse.json(
        { error: 'Both library and query are required' },
        { status: 400 }
      );
    }

    const docs = await fetchContext7Docs(library, query);

    if (!docs) {
      return NextResponse.json(
        {
          error: 'Documentation not found',
          timing: Date.now() - startTime,
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      library,
      query,
      documentation: docs,
      timing: Date.now() - startTime,
    });
  } catch (error) {
    console.error('MCP docs error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Documentation fetch failed',
        timing: Date.now() - startTime,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    endpoint: '/api/mcp/docs',
    method: 'POST',
    description: 'Fetch documentation for any library using Context7',
    body: {
      library: 'string (required) - Library name (e.g., "react", "next.js", "tailwindcss")',
      query: 'string (required) - Documentation query (e.g., "how to use useState hook")',
    },
    examples: [
      { library: 'react', query: 'useEffect cleanup' },
      { library: 'tailwindcss', query: 'responsive breakpoints' },
      { library: 'next.js', query: 'app router layouts' },
    ],
  });
}
