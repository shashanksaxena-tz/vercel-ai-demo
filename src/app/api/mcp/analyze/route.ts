/**
 * MCP Request Analysis API
 *
 * POST /api/mcp/analyze
 *
 * Analyzes a user request to identify what UI components are needed,
 * then discovers matching components from MCP servers.
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  mcpClient,
  MCP_SERVERS,
  connectToServer,
  analyzeRequest,
  getRecommendedSources,
  generateComponentHierarchy,
  type MCPServerType,
  type AnalyzeRequestInput,
  type AnalyzeRequestResponse,
  type ComponentMetadata,
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

    const body: AnalyzeRequestInput = await request.json();
    const { userRequest } = body;

    if (!userRequest) {
      return NextResponse.json(
        { error: 'userRequest is required' },
        { status: 400 }
      );
    }

    // Analyze the request to identify component needs
    const analysis = analyzeRequest(userRequest);

    // Get recommended MCP sources
    const sources = getRecommendedSources(analysis);

    // Search for components matching the analysis
    const allComponents: ComponentMetadata[] = [];

    // Search using the generated queries
    for (const query of analysis.searchQueries.slice(0, 5)) {
      try {
        const components = await mcpClient.searchComponents(query, sources);
        allComponents.push(...components);
      } catch {
        // Continue with other queries if one fails
      }
    }

    // Deduplicate components by ID
    const uniqueComponents = Array.from(
      new Map(allComponents.map((c) => [c.id, c])).values()
    );

    // Generate suggested component hierarchy
    const hierarchy = generateComponentHierarchy(analysis);

    const response: AnalyzeRequestResponse & {
      timing: number;
      hierarchy: ReturnType<typeof generateComponentHierarchy>;
      sources: MCPServerType[];
    } = {
      analysis,
      suggestedComponents: uniqueComponents,
      hierarchy,
      sources,
      timing: Date.now() - startTime,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('MCP analyze error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Analysis failed',
        timing: Date.now() - startTime,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    endpoint: '/api/mcp/analyze',
    method: 'POST',
    description: 'Analyze a user request to identify UI component needs',
    body: {
      userRequest: 'string (required) - Natural language description of desired UI',
    },
    example: {
      userRequest: 'Create a dashboard with user metrics, a data table, and a sidebar navigation',
    },
  });
}
