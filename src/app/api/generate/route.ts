/**
 * AI UI Generation API
 *
 * POST /api/generate
 *
 * Generates UITree structures from natural language prompts using
 * Google's Gemini model via the AI SDK.
 *
 * With ENABLE_DYNAMIC_DISCOVERY flag:
 * - Analyzes user intent to determine relevant components
 * - Discovers components from MCP servers dynamically
 * - Builds enhanced prompts with discovered components
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  generateUIFromPrompt,
  validateUITree,
  GenerateRequestSchema,
  type UITree,
  type GenerationResult,
  buildEnhancedSystemPrompt,
  type MCPComponentMetadata,
  calculateTokenUsage,
} from '@/lib/ai';
import { analyzeRequest } from '@/lib/mcp/smart-discovery';

// ============================================================================
// Types
// ============================================================================

interface GenerateRequestBody {
  prompt: string;
  currentTree?: UITree;
  conversationHistory?: Array<{ role: 'user' | 'assistant'; content: string }>;
  framework?: string;
}

interface GenerateSuccessResponse extends GenerationResult {
  timing: number;
  valid: boolean;
  validationErrors?: string[];
  telemetry?: {
    discoveryEnabled: boolean;
    intent?: string;
    mcpComponentsDiscovered?: number;
    mcpComponentsUsed?: number;
    tokenUsage?: {
      core: number;
      mcp: number;
      total: number;
      withinBudget: boolean;
    };
    discoveryTime?: number;
  };
}

interface GenerateErrorResponse {
  error: string;
  details?: string;
  timing: number;
}

// ============================================================================
// API Handler
// ============================================================================

export async function POST(request: NextRequest): Promise<NextResponse<GenerateSuccessResponse | GenerateErrorResponse>> {
  const startTime = Date.now();

  try {
    const body: GenerateRequestBody = await request.json();
    const { prompt, currentTree, conversationHistory, framework } = body;

    // Validate required fields
    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        {
          error: 'prompt is required and must be a string',
          timing: Date.now() - startTime,
        },
        { status: 400 }
      );
    }

    if (prompt.trim().length === 0) {
      return NextResponse.json(
        {
          error: 'prompt cannot be empty',
          timing: Date.now() - startTime,
        },
        { status: 400 }
      );
    }

    // Validate currentTree if provided
    if (currentTree) {
      const treeValidation = validateUITree(currentTree);
      if (!treeValidation.valid) {
        return NextResponse.json(
          {
            error: 'Invalid currentTree provided',
            details: treeValidation.errors.join('; '),
            timing: Date.now() - startTime,
          },
          { status: 400 }
        );
      }
    }

    // Feature flag: Check if dynamic discovery is enabled
    const dynamicDiscoveryEnabled = process.env.NEXT_PUBLIC_ENABLE_DYNAMIC_DISCOVERY === 'true';

    let mcpComponents: MCPComponentMetadata[] = [];
    let discoveryIntent: ReturnType<typeof analyzeRequest> | undefined;
    let discoveryTime = 0;
    let systemPromptOverride: string | undefined;

    // MCP Discovery Pipeline (only if enabled)
    if (dynamicDiscoveryEnabled) {
      const discoveryStartTime = Date.now();

      try {
        // Step 1: Analyze request to determine intent
        discoveryIntent = analyzeRequest(prompt);

        console.log('[MCP Discovery] Intent analyzed:', {
          intent: discoveryIntent.intent,
          coreComponents: discoveryIntent.coreComponents.length,
          contextComponents: discoveryIntent.contextComponents.length,
          mcpSources: discoveryIntent.mcpSources,
          searchQueries: discoveryIntent.searchQueries,
          estimatedTokens: discoveryIntent.estimatedTokens,
        });

        // Step 2: Discover components from MCP servers
        // Use multiple search queries for better coverage
        const discoveryPromises = discoveryIntent.searchQueries.map(async (query) => {
          try {
            const response = await fetch(`${request.nextUrl.origin}/api/mcp/discover`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                query,
                sources: discoveryIntent!.mcpSources,
                limit: 10, // Limit per query to manage token budget
              }),
            });

            if (!response.ok) {
              console.warn(`[MCP Discovery] Query "${query}" failed:`, response.statusText);
              return [];
            }

            const data = await response.json();
            return data.components || [];
          } catch (error) {
            console.warn(`[MCP Discovery] Query "${query}" error:`, error);
            return [];
          }
        });

        const discoveryResults = await Promise.all(discoveryPromises);
        const allDiscoveredComponents = discoveryResults.flat();

        // Deduplicate by component name
        const uniqueComponents = new Map<string, MCPComponentMetadata>();
        for (const component of allDiscoveredComponents) {
          if (!uniqueComponents.has(component.name)) {
            uniqueComponents.set(component.name, {
              name: component.name,
              description: component.description || '',
              props: component.props,
              source: component.source || 'unknown',
              examples: component.examples,
            });
          }
        }

        mcpComponents = Array.from(uniqueComponents.values());

        // Step 3: Calculate token usage
        const tokenUsage = calculateTokenUsage(mcpComponents.length);

        // Step 4: Build enhanced system prompt
        systemPromptOverride = buildEnhancedSystemPrompt(mcpComponents, {
          enableDynamicDiscovery: true,
          useNamespaces: true,
          maxTokens: 15000,
        });

        discoveryTime = Date.now() - discoveryStartTime;

        console.log('[MCP Discovery] Discovery complete:', {
          queriesExecuted: discoveryIntent.searchQueries.length,
          totalDiscovered: allDiscoveredComponents.length,
          uniqueComponents: mcpComponents.length,
          tokenUsage,
          discoveryTime: `${discoveryTime}ms`,
        });

      } catch (error) {
        // Log but don't fail - fall back to standard generation
        console.error('[MCP Discovery] Discovery failed, falling back to standard generation:', error);
        systemPromptOverride = undefined;
      }
    }

    // Generate the UI (with or without MCP enhancement)
    const result = await generateUIFromPrompt(prompt, {
      currentTree,
      conversationHistory,
      framework,
      systemPromptOverride, // Pass enhanced prompt if available
    });

    // Validate the generated tree
    const validation = validateUITree(result.tree);

    // Build telemetry data
    const telemetry = dynamicDiscoveryEnabled ? {
      discoveryEnabled: true,
      intent: discoveryIntent?.intent,
      mcpComponentsDiscovered: mcpComponents.length,
      mcpComponentsUsed: 0, // Could be enhanced to track actual usage
      tokenUsage: calculateTokenUsage(mcpComponents.length),
      discoveryTime,
    } : {
      discoveryEnabled: false,
    };

    const response: GenerateSuccessResponse = {
      ...result,
      timing: Date.now() - startTime,
      valid: validation.valid,
      validationErrors: validation.errors.length > 0 ? validation.errors : undefined,
      telemetry,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('UI generation error:', error);

    // Handle specific error types
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          error: 'Invalid JSON in request body',
          timing: Date.now() - startTime,
        },
        { status: 400 }
      );
    }

    // Check for AI SDK specific errors
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    // Check for rate limiting or API errors
    if (errorMessage.includes('rate') || errorMessage.includes('quota')) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded. Please try again later.',
          details: errorMessage,
          timing: Date.now() - startTime,
        },
        { status: 429 }
      );
    }

    if (errorMessage.includes('API key') || errorMessage.includes('authentication')) {
      return NextResponse.json(
        {
          error: 'API configuration error',
          details: 'Google AI API key may be missing or invalid',
          timing: Date.now() - startTime,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        error: 'UI generation failed',
        details: errorMessage,
        timing: Date.now() - startTime,
      },
      { status: 500 }
    );
  }
}

// ============================================================================
// API Documentation
// ============================================================================

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    endpoint: '/api/generate',
    method: 'POST',
    description: 'Generate UITree structures from natural language prompts using AI',
    body: {
      prompt: 'string (required) - Natural language description of the desired UI',
      currentTree: 'UITree (optional) - Existing tree to refine/modify',
      conversationHistory: 'Array<{role, content}> (optional) - Previous conversation for context',
      framework: 'string (optional) - Target framework hint (e.g., "React", "Chakra UI")',
    },
    response: {
      tree: 'UITree - The generated/modified UI tree structure',
      explanation: 'string - Brief explanation of what was generated',
      suggestedStyles: 'Record<string, string> (optional) - Suggested Tailwind classes per element',
      timing: 'number - Request processing time in milliseconds',
      valid: 'boolean - Whether the generated tree passed validation',
      validationErrors: 'string[] (optional) - Any validation errors found',
    },
    examples: [
      {
        description: 'Simple login form',
        request: {
          prompt: 'Create a simple login form with email and password fields',
        },
      },
      {
        description: 'Dashboard with metrics',
        request: {
          prompt: 'Build a dashboard with 4 metric cards showing revenue, users, orders, and conversion rate',
        },
      },
      {
        description: 'Refine existing UI',
        request: {
          prompt: 'Add a footer with copyright text',
          currentTree: {
            root: 'container',
            elements: {
              container: {
                key: 'container',
                type: 'Container',
                props: { maxWidth: 'lg' },
                children: ['header'],
              },
              header: {
                key: 'header',
                type: 'Heading',
                props: { level: '1', text: 'Welcome' },
              },
            },
          },
        },
      },
    ],
  });
}
