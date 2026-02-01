/**
 * MCP Icons Discovery API
 *
 * GET /api/mcp/icons?query=<search>
 *
 * Searches for icons across multiple icon libraries:
 * - Lucide Icons (via MCP)
 * - Iconify (via public API at https://api.iconify.design)
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  mcpClient,
  MCP_SERVERS,
  connectToServer,
  callTool,
  searchLucideIcons,
  type MCPServerType,
  type IconMetadata,
} from '@/lib/mcp';

// Initialize MCP connections on first request
let initialized = false;

async function ensureInitialized() {
  if (initialized) return;

  const servers: MCPServerType[] = ['lucide-icons', 'heroicons', 'iconify'];

  const results = await Promise.allSettled(
    servers
      .filter((s) => MCP_SERVERS[s]?.enabled)
      .map((s) => connectToServer(s, MCP_SERVERS[s]))
  );

  // Log connection results for debugging
  results.forEach((result, index) => {
    const serverName = servers[index];
    if (result.status === 'fulfilled') {
      const connection = result.value;
      console.log(`[Icon MCP] ${serverName}: ${connection.status}, tools: ${connection.tools.length}`);
    } else {
      console.error(`[Icon MCP] ${serverName}: Failed to connect - ${result.reason}`);
    }
  });

  initialized = true;
}

/**
 * Search icons from Heroicons MCP server
 */
async function searchHeroicons(query: string): Promise<IconMetadata[]> {
  try {
    const result = await callTool({
      server: 'heroicons',
      name: 'search_icons',
      arguments: { query },
    });

    if (!result.success || !result.content) {
      console.error('[Heroicons] Search failed:', result.error);
      return [];
    }

    const icons = result.content as Array<{
      name: string;
      svg?: string;
      style?: string;
      tags?: string[];
    }>;

    return icons.map((icon) => ({
      name: icon.name,
      svg: icon.svg || '',
      source: 'heroicons' as MCPServerType,
      tags: icon.tags,
      category: icon.style,
    }));
  } catch (error) {
    console.error('[Heroicons] Search error:', error);
    return [];
  }
}

/**
 * Search icons from Iconify MCP server
 */
async function searchIconify(query: string, limit: number = 20): Promise<IconMetadata[]> {
  try {
    const result = await callTool({
      server: 'iconify',
      name: 'search_icons',
      arguments: { query, limit },
    });

    if (!result.success || !result.content) {
      console.error('[Iconify] Search failed:', result.error);
      return [];
    }

    const icons = result.content as Array<{
      name: string;
      svg?: string;
      category?: string;
      tags?: string[];
    }>;

    return icons.map((icon) => ({
      name: icon.name,
      svg: icon.svg || '',
      source: 'iconify' as MCPServerType,
      tags: icon.tags,
      category: icon.category,
    }));
  } catch (error) {
    console.error('[Iconify] Search error:', error);
    return [];
  }
}

export async function GET(request: NextRequest) {
  const startTime = Date.now();

  try {
    await ensureInitialized();

    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const sources = searchParams.get('sources')?.split(',') as MCPServerType[] | undefined;

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      );
    }

    // Determine which sources to search
    const searchSources = sources || ['lucide-icons', 'heroicons', 'iconify'] as MCPServerType[];
    const results: IconMetadata[] = [];

    // Search in parallel across all sources
    const searches = searchSources.map(async (source) => {
      switch (source) {
        case 'lucide-icons':
          return searchLucideIcons(query);
        case 'heroicons':
          return searchHeroicons(query);
        case 'iconify':
          return searchIconify(query, limit);
        default:
          return [];
      }
    });

    const searchResults = await Promise.all(searches);
    for (const icons of searchResults) {
      results.push(...icons);
    }

    // Apply limit
    const limitedResults = results.slice(0, limit);

    return NextResponse.json({
      icons: limitedResults,
      sources: searchSources,
      totalCount: results.length,
      timing: Date.now() - startTime,
    });
  } catch (error) {
    console.error('Icons API error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Icon search failed',
        timing: Date.now() - startTime,
      },
      { status: 500 }
    );
  }
}
