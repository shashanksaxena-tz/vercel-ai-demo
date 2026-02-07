/**
 * MCP Client - Server-side client for connecting to MCP servers
 *
 * This client spawns MCP server processes and communicates via stdio.
 * It's designed to be used in Next.js API routes (server-side only).
 */

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import type {
  MCPServerType,
  MCPServerConfig,
  MCP_SERVERS,
  MCPConnection,
  MCPTool,
  MCPToolCall,
  MCPToolResult,
  ComponentMetadata,
  ComponentSource,
  ComponentCategory,
  IconMetadata,
  ImageMetadata,
} from './types';

// Re-export MCP_SERVERS from types
export { MCP_SERVERS } from './types';

// ============================================================================
// MCP Server Connection Manager
// ============================================================================

interface ServerConnection {
  client: Client;
  transport: StdioClientTransport;
  tools: MCPTool[];
  connected: boolean;
}

const connections = new Map<MCPServerType, ServerConnection>();

/**
 * Connect to an MCP server
 */
export async function connectToServer(
  serverType: MCPServerType,
  config: MCPServerConfig
): Promise<MCPConnection> {
  // Check if already connected
  const existing = connections.get(serverType);
  if (existing?.connected) {
    return {
      serverId: serverType,
      status: 'connected',
      tools: existing.tools,
      resources: [],
    };
  }

  try {
    console.log(`[MCP] Connecting to ${serverType}...`);
    console.log(`[MCP] Command: ${config.command} ${config.args.join(' ')}`);

    // Create transport
    const transport = new StdioClientTransport({
      command: config.command,
      args: config.args,
      env: config.env,
    });

    // Create client
    const client = new Client(
      {
        name: `generative-ui-builder-${serverType}`,
        version: '1.0.0',
      }
    );

    // Connect
    await client.connect(transport);
    console.log(`[MCP] ${serverType}: Connected successfully`);

    // List available tools
    const toolsResult = await client.listTools();
    const tools: MCPTool[] = toolsResult.tools.map((t) => ({
      name: t.name,
      description: t.description || '',
      inputSchema: t.inputSchema as Record<string, unknown>,
    }));

    console.log(`[MCP] ${serverType}: Found ${tools.length} tools:`, tools.map(t => t.name));

    // Store connection
    connections.set(serverType, {
      client,
      transport,
      tools,
      connected: true,
    });

    return {
      serverId: serverType,
      status: 'connected',
      tools,
      resources: [],
    };
  } catch (error) {
    console.error(`[MCP] ${serverType}: Connection failed -`, error);
    return {
      serverId: serverType,
      status: 'error',
      error: error instanceof Error ? error.message : 'Connection failed',
      tools: [],
      resources: [],
    };
  }
}

/**
 * Disconnect from an MCP server
 */
export async function disconnectFromServer(serverType: MCPServerType): Promise<void> {
  const connection = connections.get(serverType);
  if (connection) {
    try {
      await connection.client.close();
    } catch {
      // Ignore close errors
    }
    connections.delete(serverType);
  }
}

/**
 * Call a tool on an MCP server
 */
export async function callTool(call: MCPToolCall): Promise<MCPToolResult> {
  const startTime = Date.now();
  const connection = connections.get(call.server);

  if (!connection?.connected) {
    return {
      success: false,
      content: null,
      error: `Not connected to server: ${call.server}`,
      timing: Date.now() - startTime,
    };
  }

  try {
    const result = await connection.client.callTool({
      name: call.name,
      arguments: call.arguments,
    });

    // Extract content from result
    let content: unknown = null;
    if (result.content && Array.isArray(result.content)) {
      const textContent = result.content.find((c) => c.type === 'text');
      if (textContent && 'text' in textContent) {
        try {
          content = JSON.parse(textContent.text);
        } catch {
          content = textContent.text;
        }
      }
    }

    return {
      success: !result.isError,
      content,
      timing: Date.now() - startTime,
    };
  } catch (error) {
    return {
      success: false,
      content: null,
      error: error instanceof Error ? error.message : 'Tool call failed',
      timing: Date.now() - startTime,
    };
  }
}

// ============================================================================
// Component Discovery
// ============================================================================

/**
 * Search for components on UI Layouts MCP
 */
export async function searchUILayouts(query: string): Promise<ComponentMetadata[]> {
  const result = await callTool({
    server: 'ui-layouts',
    name: 'search_components',
    arguments: { q: query }, // Fixed: UI Layouts expects 'q' not 'query'
  });

  if (!result.success || !result.content) {
    return [];
  }

  // Parse markdown response format
  // Format: "# Search Results (N) for \"query\"\n\n- **Name**\n  - key: `key`\n  - group: Group\n  - href: `/path`"
  if (typeof result.content === 'string') {
    const components: Array<{
      key: string;
      name: string;
      group?: string;
      tags?: string[];
      description?: string;
    }> = [];

    const lines = result.content.split('\n');
    let currentComponent: any = null;

    for (const line of lines) {
      const trimmed = line.trim();

      // Component name line: - **Name**
      if (trimmed.startsWith('- **') && trimmed.endsWith('**')) {
        if (currentComponent) {
          components.push(currentComponent);
        }
        const name = trimmed.slice(4, -2); // Remove - ** and **
        currentComponent = { name, key: name.toLowerCase().replace(/\s+/g, '-') };
      }
      // Key line: - key: `value`
      else if (trimmed.startsWith('- key: `') && currentComponent) {
        currentComponent.key = trimmed.slice(8, -1); // Remove - key: ` and `
      }
      // Group line: - group: Value
      else if (trimmed.startsWith('- group: ') && currentComponent) {
        currentComponent.group = trimmed.slice(9);
      }
      // Href line: - href: `/path`
      else if (trimmed.startsWith('- href: ') && currentComponent) {
        currentComponent.description = trimmed.slice(8);
      }
    }

    if (currentComponent) {
      components.push(currentComponent);
    }

    return components.map((c) => ({
      id: `ui-layouts:${c.key}`,
      name: c.name,
      displayName: c.name,
      description: c.description || '',
      category: mapGroupToCategory(c.group),
      tags: c.tags || [],
      source: 'ui-layouts' as MCPServerType,
      framework: 'react' as const,
    }));
  }

  // Fallback: Handle JSON array responses
  const componentsArray = Array.isArray(result.content)
    ? result.content
    : (result.content as any).components || (result.content as any).results || [];

  if (!Array.isArray(componentsArray)) {
    return [];
  }

  return componentsArray.map((c: any) => ({
    id: `ui-layouts:${c.key || c.name}`,
    name: c.name,
    displayName: c.name,
    description: c.description || '',
    category: mapGroupToCategory(c.group),
    tags: c.tags || [],
    source: 'ui-layouts' as MCPServerType,
    framework: 'react' as const,
  }));
}

/**
 * Search for components on Shadcn UI MCP
 */
export async function searchShadcn(query: string): Promise<ComponentMetadata[]> {
  // Shadcn MCP uses directory browsing and component fetching
  // Try to list components and filter by query
  const result = await callTool({
    server: 'shadcn-ui',
    name: 'list_components',
    arguments: {},
  });

  if (!result.success || !result.content) {
    // Try alternate method
    const searchResult = await callTool({
      server: 'shadcn-ui',
      name: 'get_component',
      arguments: { name: query },
    });

    if (searchResult.success && searchResult.content) {
      const comp = searchResult.content as {
        name: string;
        description?: string;
        dependencies?: string[];
      };
      return [{
        id: `shadcn:${comp.name}`,
        name: comp.name,
        displayName: comp.name,
        description: comp.description || '',
        category: 'other' as ComponentCategory,
        tags: [],
        source: 'shadcn-ui' as MCPServerType,
        framework: 'react' as const,
        dependencies: comp.dependencies,
      }];
    }
    return [];
  }

  // Parse response - shadcn-ui returns { components: ["name1", "name2", ...] }
  const componentsData = (result.content as any).components || result.content;
  const componentsArray = Array.isArray(componentsData) ? componentsData : [];

  if (componentsArray.length === 0) {
    return [];
  }

  // Components are strings (names), not objects
  const queryLower = query.toLowerCase();
  const componentNames = componentsArray.filter((name: string) =>
    typeof name === 'string' && name.toLowerCase().includes(queryLower)
  );

  return componentNames.map((name: string) => ({
    id: `shadcn:${name}`,
    name,
    displayName: name,
    description: `shadcn/ui ${name} component`,
    category: 'other' as ComponentCategory,
    tags: [],
    source: 'shadcn-ui' as MCPServerType,
    framework: 'react' as const,
  }));
}

/**
 * Search for templates on Tailwind CSS MCP
 */
export async function searchTailwind(query: string): Promise<ComponentMetadata[]> {
  const result = await callTool({
    server: 'tailwindcss',
    name: 'generate_component_template',
    arguments: { componentType: query }, // Fixed: Use componentType instead of component
  });

  if (!result.success || !result.content) {
    return [];
  }

  // Parse JSON response format
  // Tailwind MCP returns: { html: string, description: string, utilities: string[], customizations: string[] }
  let template: {
    html?: string;
    description?: string;
    utilities?: string[];
    customizations?: string[];
  };

  if (typeof result.content === 'string') {
    try {
      template = JSON.parse(result.content);
    } catch {
      // If not JSON, assume it's plain text HTML
      template = { html: result.content };
    }
  } else {
    template = result.content as any;
  }

  if (!template.html) {
    return [];
  }

  return [{
    id: `tailwind:${query}`,
    name: query,
    displayName: query.charAt(0).toUpperCase() + query.slice(1), // Capitalize first letter
    description: template.description || `Tailwind CSS ${query} template`,
    category: 'other' as ComponentCategory,
    tags: ['tailwind', 'html', ...(template.utilities?.slice(0, 5) || [])], // Include first 5 utilities as tags
    source: 'tailwindcss' as MCPServerType,
    framework: 'html' as const,
  }];
}

/**
 * Search for components on Flowbite MCP
 */
export async function searchFlowbite(query: string): Promise<ComponentMetadata[]> {
  // Flowbite MCP uses resources (not tools) for component discovery
  // Get connection to access resources
  const connection = connections.get('flowbite');

  if (!connection?.connected) {
    console.warn('[searchFlowbite] Not connected to Flowbite server');
    return [];
  }

  try {
    // List all resources from the Flowbite server
    const resourcesResult = await connection.client.listResources();

    if (!resourcesResult.resources || resourcesResult.resources.length === 0) {
      return [];
    }

    const queryLower = query.toLowerCase();

    // Filter resources by query matching name or description
    const matchingResources = resourcesResult.resources.filter((resource) => {
      const name = resource.name?.toLowerCase() || '';
      const description = resource.description?.toLowerCase() || '';
      const title = (resource as any).title?.toLowerCase() || '';

      // Skip overview/theme/quickstart resources, focus on components
      if (name.includes('overview') || name.includes('theme') || name.includes('quickstart')) {
        return false;
      }

      return name.includes(queryLower) ||
             description.includes(queryLower) ||
             title.includes(queryLower);
    });

    // Convert resources to ComponentMetadata format
    return matchingResources.map((resource) => {
      // Extract component name from resource name (e.g., "flowbite_buttons" -> "buttons")
      const componentName = resource.name?.replace('flowbite_', '') || resource.name || 'unknown';
      const displayName = componentName
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      return {
        id: `flowbite:${componentName}`,
        name: componentName,
        displayName,
        description: resource.description || (resource as any).title || `Flowbite ${displayName} component`,
        category: mapFlowbiteComponentCategory(componentName),
        tags: ['flowbite', 'tailwind', 'html'],
        source: 'flowbite' as MCPServerType,
        framework: 'html' as const,
      };
    });
  } catch (error) {
    console.error('[searchFlowbite] Error listing resources:', error);
    return [];
  }
}

/**
 * Helper to map Flowbite component names to categories
 */
function mapFlowbiteComponentCategory(componentName: string): ComponentCategory {
  const name = componentName.toLowerCase();

  if (name.includes('button')) return 'inputs';
  if (name.includes('card')) return 'cards';
  if (name.includes('form') || name.includes('input') || name.includes('checkbox') ||
      name.includes('radio') || name.includes('select') || name.includes('textarea')) return 'forms';
  if (name.includes('nav') || name.includes('breadcrumb') || name.includes('sidebar') ||
      name.includes('menu')) return 'navigation';
  if (name.includes('modal') || name.includes('drawer') || name.includes('tooltip') ||
      name.includes('popover')) return 'overlay';
  if (name.includes('table') || name.includes('list')) return 'data-display';
  if (name.includes('alert') || name.includes('toast') || name.includes('spinner')) return 'feedback';
  if (name.includes('footer') || name.includes('header')) return 'layout';
  if (name.includes('text') || name.includes('heading') || name.includes('paragraph')) return 'typography';

  return 'other';
}

/**
 * Search for components on Chakra UI MCP
 */
export async function searchChakraUI(query: string): Promise<ComponentMetadata[]> {
  const result = await callTool({
    server: 'chakra-ui',
    name: 'list_components',
    arguments: {},
  });

  if (!result.success || !result.content) {
    return [];
  }

  // Chakra UI returns a JSON array of component names as strings
  // Example: ["button", "card", "alert", ...]
  let componentNames: string[] = [];

  if (Array.isArray(result.content)) {
    componentNames = result.content;
  } else if (typeof result.content === 'string') {
    try {
      componentNames = JSON.parse(result.content);
    } catch {
      componentNames = [];
    }
  }

  if (!Array.isArray(componentNames)) {
    return [];
  }

  // Filter component names by query
  const queryLower = query.toLowerCase();
  const filteredNames = componentNames.filter((name) =>
    typeof name === 'string' && name.toLowerCase().includes(queryLower)
  );

  // Convert to ComponentMetadata format
  return filteredNames.map((name) => ({
    id: `chakra:${name}`,
    name,
    displayName: name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' '),
    description: `Chakra UI ${name} component`,
    category: inferCategoryFromComponentName(name),
    tags: ['chakra-ui', 'react'],
    source: 'chakra-ui' as MCPServerType,
    framework: 'react' as const,
  }));
}

/**
 * Search for components on Magic UI MCP
 */
export async function searchMagicUI(query: string): Promise<ComponentMetadata[]> {
  const result = await callTool({
    server: 'magic-ui',
    name: 'getUIComponents',
    arguments: {},
  });

  if (!result.success || !result.content) {
    return [];
  }

  // callTool already parses JSON, so result.content is the parsed array
  const components = Array.isArray(result.content) ? result.content : [];

  if (components.length === 0) {
    return [];
  }

  // Filter by query
  const queryLower = query.toLowerCase();
  return components
    .filter((c: any) =>
      c.name?.toLowerCase().includes(queryLower) ||
      c.description?.toLowerCase().includes(queryLower)
    )
    .map((c: any) => {
      // Determine animation complexity based on component type
      const isTextAnimation = c.name.includes('text') || c.name.includes('typing') || c.name.includes('word');
      const isButtonAnimation = c.name.includes('button');
      const isBackgroundEffect = c.name.includes('grid') || c.name.includes('pattern') || c.name.includes('particles');

      let complexity: 'simple' | 'medium' | 'complex' = 'medium';
      if (isBackgroundEffect) {
        complexity = 'complex';
      } else if (isTextAnimation) {
        complexity = 'simple';
      }

      return {
        id: `magic-ui:${c.name}`,
        name: c.name,
        displayName: c.name,
        description: c.description || '',
        category: mapGroupToCategory(c.category),
        tags: ['magic-ui', 'animated', 'framer-motion'],
        source: 'magic-ui' as MCPServerType,
        framework: 'react' as const,
        dependencies: {
          npm: ['framer-motion@^11.0.0'],
          imports: ['motion', 'AnimatePresence'],
        },
        animations: {
          type: 'framer-motion' as const,
          complexity,
        },
      };
    });
}

/**
 * Search for components on Aceternity UI MCP
 */
export async function searchAceternityUI(query: string): Promise<ComponentMetadata[]> {
  const result = await callTool({
    server: 'aceternity-ui',
    name: 'search_components',
    arguments: { query },
  });

  if (!result.success || !result.content) {
    // Fallback: try get_all_components
    const allResult = await callTool({
      server: 'aceternity-ui',
      name: 'get_all_components',
      arguments: {},
    });

    if (!allResult.success || !allResult.content) {
      return [];
    }

    // Parse response - aceternity-ui may return JSON string or object
    let parsedContent: any;
    if (typeof allResult.content === 'string') {
      try {
        parsedContent = JSON.parse(allResult.content);
      } catch {
        return [];
      }
    } else {
      parsedContent = allResult.content;
    }

    const components = parsedContent.components || parsedContent;
    if (!Array.isArray(components)) {
      return [];
    }

    const queryLower = query.toLowerCase();
    return components
      .filter((c: any) =>
        c.name.toLowerCase().includes(queryLower) ||
        c.description?.toLowerCase().includes(queryLower) ||
        c.tags?.some((tag: string) => tag.toLowerCase().includes(queryLower))
      )
      .map((c: any) => ({
        id: `aceternity:${c.name}`,
        name: c.name,
        displayName: c.name,
        description: c.description || '',
        category: mapGroupToCategory(c.category),
        tags: [...(c.tags || []), 'aceternity-ui', 'animated', 'framer-motion'],
        source: 'aceternity-ui' as MCPServerType,
        framework: 'react' as const,
        dependencies: {
          npm: ['framer-motion@^11.0.0', 'clsx', 'tailwind-merge'],
          imports: ['motion', 'AnimatePresence'],
        },
        animations: {
          type: 'framer-motion' as const,
          complexity: 'complex' as const,
        },
      }));
  }

  // Parse response from search_components
  let parsedContent: any;
  if (typeof result.content === 'string') {
    try {
      parsedContent = JSON.parse(result.content);
    } catch {
      return [];
    }
  } else {
    parsedContent = result.content;
  }

  const components = parsedContent.components || parsedContent;
  if (!Array.isArray(components)) {
    return [];
  }

  return components.map((c: any) => ({
    id: `aceternity:${c.name}`,
    name: c.name,
    displayName: c.name,
    description: c.description || '',
    category: mapGroupToCategory(c.category),
    tags: [...(c.tags || []), 'aceternity-ui', 'animated', 'framer-motion'],
    source: 'aceternity-ui' as MCPServerType,
    framework: 'react' as const,
    dependencies: {
      npm: ['framer-motion@^11.0.0', 'clsx', 'tailwind-merge'],
      imports: ['motion', 'AnimatePresence'],
    },
    animations: {
      type: 'framer-motion' as const,
      complexity: 'complex' as const,
    },
  }));
}

/**
 * Search for components on Material UI MCP
 */
/**
 * Search for components on Material UI MCP
 *
 * Note: MUI MCP is a documentation server, not a component search server.
 * It provides access to llms.txt files that contain component documentation.
 * We fetch the documentation index and parse component names from it.
 */
export async function searchMUI(query: string): Promise<ComponentMetadata[]> {
  try {
    // Fetch the Material UI documentation index
    const result = await callTool({
      server: 'mui',
      name: 'useMuiDocs',
      arguments: {
        urlList: ['https://llms.mui.com/material-ui/7.2.0/llms.txt']
      },
    });

    if (!result.success || !result.content) {
      console.warn('[MUI MCP] Failed to fetch documentation index');
      return [];
    }

    // Parse markdown response to extract component names
    // Format: "## Components\n\n[ComponentName](url): <classification>text</classification>: description\n"
    const content = typeof result.content === 'string'
      ? result.content
      : (result.content as any).text || '';

    if (!content) {
      console.warn('[MUI MCP] Empty content received');
      return [];
    }

    const components: ComponentMetadata[] = [];
    const queryLower = query.toLowerCase();

    // Extract component links from markdown
    // Pattern: [Component Name](url): <classification>text</classification>
    // We use a simpler pattern that stops at the next [ or double newline
    const componentRegex = /\[([^\]]+)\]\(([^)]+)\):\s*<classification>([^<]+)<\/classification>/g;
    let match;

    while ((match = componentRegex.exec(content)) !== null) {
      const [, name, url, classification] = match;
      const description = classification.trim();

      // Filter by query - match component name or description
      const nameLower = name.toLowerCase();
      const descLower = description.toLowerCase();

      if (nameLower.includes(queryLower) || descLower.includes(queryLower)) {
        // Extract component category from URL path if available
        const urlParts = url.split('/');
        const category = urlParts.includes('components') ? 'components' :
                        urlParts.includes('api') ? 'api' : 'other';

        components.push({
          id: `mui:${name}`,
          name: name,
          displayName: name,
          description: description || `Material UI ${name} component`,
          category: mapGroupToCategory(category),
          tags: ['material-ui', 'react', 'mui'],
          source: 'mui' as MCPServerType,
          framework: 'react' as const,
        });
      }
    }

    console.log(`[MUI MCP] Found ${components.length} components matching "${query}"`);
    return components;
  } catch (error) {
    console.error('[MUI MCP] Search failed:', error);
    return [];
  }
}

/**
 * Fetch documentation from Context7
 */
export async function fetchContext7Docs(library: string, query: string): Promise<string | null> {
  try {
    // First resolve the library ID
    const resolveResult = await callTool({
      server: 'context7',
      name: 'resolve-library-id',
      arguments: { query, libraryName: library },
    });

    if (!resolveResult.success || !resolveResult.content) {
      console.warn('Context7: Failed to resolve library ID for:', library, resolveResult.error);
      return null;
    }

    // Parse the response to extract the first (best match) library ID
    const responseText = resolveResult.content as string;

    // Extract library ID from the response
    // Format: "Context7-compatible library ID: /org/project"
    const libraryIdMatch = responseText.match(/Context7-compatible library ID:\s*(\/[^\s\n]+)/);

    if (!libraryIdMatch || !libraryIdMatch[1]) {
      console.warn('Context7: Could not extract library ID from response');
      console.warn('Response:', responseText.substring(0, 500));
      return null;
    }

    const libraryId = libraryIdMatch[1];
    console.log('Context7: Resolved library ID:', libraryId);

    // Then query the docs
    const docsResult = await callTool({
      server: 'context7',
      name: 'query-docs',
      arguments: { libraryId, query },
    });

    if (!docsResult.success || !docsResult.content) {
      console.warn('Context7: Failed to query docs:', docsResult.error);
      return null;
    }

    return docsResult.content as string;
  } catch (error) {
    console.error('Context7: Unexpected error:', error);
    return null;
  }
}

// ============================================================================
// Icon Discovery
// ============================================================================

/**
 * Search for icons on Lucide Icons MCP
 */
export async function searchLucideIcons(query: string): Promise<IconMetadata[]> {
  const result = await callTool({
    server: 'lucide-icons',
    name: 'search_icons',
    arguments: { query },
  });

  if (!result.success || !result.content) {
    return [];
  }

  // Transform result to IconMetadata format
  const icons = result.content as Array<{
    name: string;
    svg: string;
    tags?: string[];
    category?: string;
  }>;

  return icons.map((icon) => ({
    name: icon.name,
    svg: icon.svg,
    source: 'lucide-icons' as MCPServerType,
    tags: icon.tags,
    category: icon.category,
  }));
}

/**
 * Get a specific Lucide icon by name
 */
export async function getLucideIcon(name: string): Promise<IconMetadata | null> {
  const result = await callTool({
    server: 'lucide-icons',
    name: 'get_icon',
    arguments: { name },
  });

  if (!result.success || !result.content) {
    return null;
  }

  const icon = result.content as {
    name: string;
    svg: string;
    tags?: string[];
    category?: string;
  };

  return {
    name: icon.name,
    svg: icon.svg,
    source: 'lucide-icons' as MCPServerType,
    tags: icon.tags,
    category: icon.category,
  };
}

/**
 * List all Lucide icon categories
 */
export async function listLucideCategories(): Promise<string[]> {
  const result = await callTool({
    server: 'lucide-icons',
    name: 'list_categories',
    arguments: {},
  });

  if (!result.success || !result.content) {
    return [];
  }

  return result.content as string[];
}

/**
 * Search for icons on Heroicons MCP
 */
export async function searchHeroicons(query: string): Promise<IconMetadata[]> {
  const result = await callTool({
    server: 'heroicons',
    name: 'search_icons',
    arguments: { query },
  });

  if (!result.success || !result.content) {
    console.error('[Heroicons MCP] Search failed:', result.error);
    return [];
  }

  // Transform result to IconMetadata format
  const icons = result.content as Array<{
    name: string;
    svg?: string;
    tags?: string[];
    category?: string;
    style?: string; // 'outline' | 'solid' | 'mini'
  }>;

  return icons.map((icon) => ({
    name: icon.name,
    svg: icon.svg || '',
    source: 'heroicons' as MCPServerType,
    tags: icon.tags,
    category: icon.category || icon.style,
  }));
}

/**
 * Get a specific Heroicon by name
 */
export async function getHeroicon(name: string, style: 'outline' | 'solid' | 'mini' = 'outline'): Promise<IconMetadata | null> {
  const result = await callTool({
    server: 'heroicons',
    name: 'get_icon',
    arguments: { name, style },
  });

  if (!result.success || !result.content) {
    return null;
  }

  const icon = result.content as {
    name: string;
    svg: string;
    tags?: string[];
    category?: string;
    style?: string;
  };

  return {
    name: icon.name,
    svg: icon.svg,
    source: 'heroicons' as MCPServerType,
    tags: icon.tags,
    category: icon.category || icon.style,
  };
}

// ============================================================================
// Image Discovery (Unsplash)
// ============================================================================

/**
 * Search for photos on Unsplash MCP
 */
export async function searchUnsplashImages(query: string, count: number = 10): Promise<ImageMetadata[]> {
  const result = await callTool({
    server: 'unsplash',
    name: 'search_photos',
    arguments: { query, per_page: count },
  });

  console.log('[searchUnsplashImages] Tool result:', JSON.stringify(result, null, 2));

  if (!result.success || !result.content) {
    console.log('[searchUnsplashImages] No success or content');
    return [];
  }

  // Check if result.content is an array or an object with a results field
  let photos: any[] = [];
  if (Array.isArray(result.content)) {
    photos = result.content;
  } else if (result.content && typeof result.content === 'object' && 'results' in result.content) {
    photos = (result.content as any).results;
  }

  console.log('[searchUnsplashImages] Photos array:', photos.length, 'items');

  if (!photos || photos.length === 0) {
    return [];
  }

  return photos.map((photo) => ({
    id: photo.id,
    url: photo.urls?.regular || photo.url || '',
    thumbnailUrl: photo.urls?.thumb || photo.thumbnailUrl || photo.urls?.small || '',
    alt: photo.alt_description || photo.description || 'Unsplash photo',
    photographer: photo.user?.name || photo.photographer || 'Unknown',
    width: photo.width || 0,
    height: photo.height || 0,
    source: 'unsplash',
  }));
}

/**
 * Get a random photo from Unsplash
 */
export async function getRandomUnsplashImage(query?: string): Promise<ImageMetadata | null> {
  const result = await callTool({
    server: 'unsplash',
    name: 'get_random_photo',
    arguments: query ? { query } : {},
  });

  if (!result.success || !result.content) {
    return null;
  }

  const photo = result.content as {
    id: string;
    urls: { regular: string; thumb: string };
    alt_description: string;
    user: { name: string };
    width: number;
    height: number;
  };

  return {
    id: photo.id,
    url: photo.urls.regular,
    thumbnailUrl: photo.urls.thumb,
    alt: photo.alt_description || 'Unsplash photo',
    photographer: photo.user.name,
    width: photo.width,
    height: photo.height,
    source: 'unsplash',
  };
}

/**
 * Get a specific photo from Unsplash by ID
 */
export async function getUnsplashImage(photoId: string): Promise<ImageMetadata | null> {
  const result = await callTool({
    server: 'unsplash',
    name: 'get_photo',
    arguments: { photo_id: photoId },
  });

  if (!result.success || !result.content) {
    return null;
  }

  const photo = result.content as {
    id: string;
    urls: { regular: string; thumb: string };
    alt_description: string;
    user: { name: string };
    width: number;
    height: number;
  };

  return {
    id: photo.id,
    url: photo.urls.regular,
    thumbnailUrl: photo.urls.thumb,
    alt: photo.alt_description || 'Unsplash photo',
    photographer: photo.user.name,
    width: photo.width,
    height: photo.height,
    source: 'unsplash',
  };
}

// ============================================================================
// Image Discovery (Pexels)
// ============================================================================

/**
 * Search for photos on Pexels (via HTTP API)
 * Note: This is a direct API call, not via MCP stdio transport
 */
export async function searchPexelsImages(query: string, count: number = 10): Promise<ImageMetadata[]> {
  const apiKey = process.env.PEXELS_API_KEY;

  if (!apiKey) {
    console.warn('PEXELS_API_KEY not configured');
    return [];
  }

  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${count}`,
      {
        headers: {
          'Authorization': apiKey,
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.error('Pexels API error:', response.status);
      return [];
    }

    const data = await response.json();

    if (!data.photos || !Array.isArray(data.photos)) {
      return [];
    }

    return data.photos.map((photo: {
      id: number;
      src: { large: string; medium: string };
      alt: string;
      photographer: string;
      width: number;
      height: number;
    }) => ({
      id: String(photo.id),
      url: photo.src.large,
      thumbnailUrl: photo.src.medium,
      alt: photo.alt || 'Pexels photo',
      photographer: photo.photographer,
      width: photo.width,
      height: photo.height,
      source: 'pexels',
    }));
  } catch (error) {
    console.error('Pexels search error:', error);
    return [];
  }
}

/**
 * Get a specific photo from Pexels by ID
 */
export async function getPexelsImage(photoId: string): Promise<ImageMetadata | null> {
  const apiKey = process.env.PEXELS_API_KEY;

  if (!apiKey) {
    console.warn('PEXELS_API_KEY not configured');
    return null;
  }

  try {
    const response = await fetch(
      `https://api.pexels.com/v1/photos/${photoId}`,
      {
        headers: {
          'Authorization': apiKey,
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      return null;
    }

    const photo = await response.json() as {
      id: number;
      src: { large: string; medium: string };
      alt: string;
      photographer: string;
      width: number;
      height: number;
    };

    return {
      id: String(photo.id),
      url: photo.src.large,
      thumbnailUrl: photo.src.medium,
      alt: photo.alt || 'Pexels photo',
      photographer: photo.photographer,
      width: photo.width,
      height: photo.height,
      source: 'pexels',
    };
  } catch (error) {
    console.error('Pexels get photo error:', error);
    return null;
  }
}

/**
 * Search across all connected MCP servers
 */
export async function searchAllServers(
  query: string,
  sources?: MCPServerType[]
): Promise<ComponentMetadata[]> {
  // Default to all enabled servers
  const defaultServers: MCPServerType[] = [
    'ui-layouts',
    'shadcn-ui',
    'tailwindcss',
    'flowbite',
    'chakra-ui',
    'magic-ui',
    'aceternity-ui',
    'mui',
  ];
  const serverTypes = sources || defaultServers;
  const results: ComponentMetadata[] = [];

  // Run searches in parallel
  const searches = serverTypes.map(async (serverType) => {
    try {
      switch (serverType) {
        case 'ui-layouts':
          return await searchUILayouts(query);
        case 'shadcn-ui':
          return await searchShadcn(query);
        case 'tailwindcss':
          return await searchTailwind(query);
        case 'flowbite':
          return await searchFlowbite(query);
        case 'chakra-ui':
          return await searchChakraUI(query);
        case 'magic-ui':
          return await searchMagicUI(query);
        case 'aceternity-ui':
          return await searchAceternityUI(query);
        case 'mui':
          return await searchMUI(query);
        default:
          return [];
      }
    } catch {
      return [];
    }
  });

  const searchResults = await Promise.all(searches);
  for (const components of searchResults) {
    results.push(...components);
  }

  return results;
}

// ============================================================================
// Component Source Fetching
// ============================================================================

/**
 * Fetch component source code from UI Layouts
 */
export async function fetchUILayoutsSource(componentKey: string): Promise<ComponentSource | null> {
  const result = await callTool({
    server: 'ui-layouts',
    name: 'get_source_code',
    arguments: { componentName: componentKey },
  });

  if (!result.success || !result.content) {
    return null;
  }

  const source = result.content as string;

  return {
    componentId: `ui-layouts:${componentKey}`,
    source: 'ui-layouts',
    code: source,
    language: 'typescript',
    dependencies: [],
  };
}

/**
 * Fetch component source code from Shadcn
 */
export async function fetchShadcnSource(componentName: string): Promise<ComponentSource | null> {
  const result = await callTool({
    server: 'shadcn-ui',
    name: 'get_component_source',
    arguments: { name: componentName },
  });

  if (!result.success || !result.content) {
    return null;
  }

  const component = result.content as {
    name: string;
    files?: Array<{ name: string; content: string }>;
    dependencies?: string[];
  };

  const mainFile = component.files?.find((f) =>
    f.name.includes(componentName.toLowerCase())
  ) || component.files?.[0];

  if (!mainFile) {
    return null;
  }

  return {
    componentId: `shadcn:${componentName}`,
    source: 'shadcn-ui',
    code: mainFile.content,
    language: 'typescript',
    dependencies: (component.dependencies || []).map((d) => ({
      name: d,
      type: 'npm' as const,
    })),
  };
}

/**
 * Fetch template from Tailwind CSS
 */
export async function fetchTailwindTemplate(templateName: string): Promise<ComponentSource | null> {
  const result = await callTool({
    server: 'tailwindcss',
    name: 'generate_component_template',
    arguments: { componentType: templateName }, // Fixed: Use componentType instead of component
  });

  if (!result.success || !result.content) {
    return null;
  }

  // Parse JSON response format
  let template: {
    html?: string;
    description?: string;
    utilities?: string[];
    customizations?: string[];
  };

  if (typeof result.content === 'string') {
    try {
      template = JSON.parse(result.content);
    } catch {
      template = { html: result.content };
    }
  } else {
    template = result.content as any;
  }

  if (!template.html) {
    return null;
  }

  return {
    componentId: `tailwind:${templateName}`,
    source: 'tailwindcss',
    code: template.html,
    language: 'html',
    dependencies: [],
  };
}

/**
 * Fetch component from Flowbite
 */
export async function fetchFlowbiteSource(componentName: string): Promise<ComponentSource | null> {
  const result = await callTool({
    server: 'flowbite',
    name: 'get_resource',
    arguments: { name: componentName },
  });

  if (!result.success || !result.content) {
    return null;
  }

  const resource = result.content as {
    html?: string;
    content?: string;
  };

  const code = resource.html || resource.content;
  if (!code) {
    return null;
  }

  return {
    componentId: `flowbite:${componentName}`,
    source: 'flowbite',
    code: code as string,
    language: 'html',
    dependencies: [],
  };
}

/**
 * Fetch component example from Chakra UI
 */
export async function fetchChakraUISource(componentName: string): Promise<ComponentSource | null> {
  const result = await callTool({
    server: 'chakra-ui',
    name: 'get_component_example',
    arguments: { component: componentName },
  });

  if (!result.success || !result.content) {
    return null;
  }

  const example = result.content as { code?: string; example?: string };
  const code = example.code || example.example;

  if (!code) {
    return null;
  }

  return {
    componentId: `chakra:${componentName}`,
    source: 'chakra-ui',
    code: code as string,
    language: 'typescript',
    dependencies: [],
  };
}

/**
 * Fetch component from Magic UI
 */
export async function fetchMagicUISource(componentName: string): Promise<ComponentSource | null> {
  // Magic UI has category-based tools, try to get component info
  const result = await callTool({
    server: 'magic-ui',
    name: 'getUIComponents',
    arguments: {},
  });

  if (!result.success || !result.content) {
    return null;
  }

  const components = result.content as Array<{
    name: string;
    code?: string;
    implementation?: string;
  }>;

  const component = components.find(
    (c) => c.name.toLowerCase() === componentName.toLowerCase()
  );

  if (!component || (!component.code && !component.implementation)) {
    return null;
  }

  return {
    componentId: `magic-ui:${componentName}`,
    source: 'magic-ui',
    code: (component.code || component.implementation) as string,
    language: 'typescript',
    dependencies: [],
  };
}

/**
 * Fetch component from Aceternity UI
 */
export async function fetchAceternityUISource(componentName: string): Promise<ComponentSource | null> {
  const result = await callTool({
    server: 'aceternity-ui',
    name: 'get_component_info',
    arguments: { component: componentName },
  });

  if (!result.success || !result.content) {
    return null;
  }

  const component = result.content as {
    name: string;
    code?: string;
    installation?: string;
  };

  const code = component.code || component.installation;

  if (!code) {
    return null;
  }

  return {
    componentId: `aceternity:${componentName}`,
    source: 'aceternity-ui',
    code: code as string,
    language: 'typescript',
    dependencies: [],
  };
}

/**
 * Fetch component from Material UI
 */
export async function fetchMUISource(componentName: string): Promise<ComponentSource | null> {
  const result = await callTool({
    server: 'mui',
    name: 'get_component_info',
    arguments: { component: componentName },
  });

  if (!result.success || !result.content) {
    return null;
  }

  const component = result.content as {
    name: string;
    import?: string;
    example?: string;
    documentation?: string;
  };

  // Combine import and example for complete code
  const code = [
    component.import,
    component.example,
  ].filter(Boolean).join('\n\n');

  if (!code) {
    return null;
  }

  return {
    componentId: `mui:${componentName}`,
    source: 'mui',
    code,
    language: 'typescript',
    dependencies: [{ name: '@mui/material', type: 'npm' as const }],
  };
}

/**
 * Fetch component source from any MCP server
 */
export async function fetchComponentSource(
  componentId: string,
  source: MCPServerType
): Promise<ComponentSource | null> {
  // Extract the actual component name from the ID
  const [, componentName] = componentId.split(':');

  switch (source) {
    case 'ui-layouts':
      return fetchUILayoutsSource(componentName);
    case 'shadcn-ui':
      return fetchShadcnSource(componentName);
    case 'tailwindcss':
      return fetchTailwindTemplate(componentName);
    case 'flowbite':
      return fetchFlowbiteSource(componentName);
    case 'chakra-ui':
      return fetchChakraUISource(componentName);
    case 'magic-ui':
      return fetchMagicUISource(componentName);
    case 'aceternity-ui':
      return fetchAceternityUISource(componentName);
    case 'mui':
      return fetchMUISource(componentName);
    default:
      return null;
  }
}

// ============================================================================
// Utility Functions
// ============================================================================

function mapGroupToCategory(group?: string): ComponentCategory {
  if (!group) return 'other';

  const groupLower = group.toLowerCase();
  const categoryMap: Record<string, ComponentCategory> = {
    'layout': 'layout',
    'layouts': 'layout',
    'navigation': 'navigation',
    'nav': 'navigation',
    'forms': 'forms',
    'form': 'forms',
    'inputs': 'inputs',
    'input': 'inputs',
    'data': 'data-display',
    'display': 'data-display',
    'feedback': 'feedback',
    'overlay': 'overlay',
    'modal': 'overlay',
    'typography': 'typography',
    'text': 'typography',
    'media': 'media',
    'charts': 'charts',
    'chart': 'charts',
    'marketing': 'marketing',
    'landing': 'marketing',
    'dashboard': 'dashboard',
    'blocks': 'blocks',
    'cards': 'cards',
    'card': 'cards',
    'commerce': 'e-commerce',
    'ecommerce': 'e-commerce',
    'auth': 'authentication',
    'authentication': 'authentication',
  };

  return categoryMap[groupLower] || 'other';
}

/**
 * Infer component category from its name
 * Used for Chakra UI and other libraries that return component names as strings
 */
function inferCategoryFromComponentName(name: string): ComponentCategory {
  const nameLower = name.toLowerCase();

  // Input components
  if (nameLower.includes('input') || nameLower.includes('textarea') ||
      nameLower.includes('select') || nameLower.includes('slider') ||
      nameLower.includes('checkbox') || nameLower.includes('radio') ||
      nameLower.includes('switch') || nameLower.includes('pin-input') ||
      nameLower.includes('number-input') || nameLower.includes('editable') ||
      nameLower.includes('tags-input')) {
    return 'inputs';
  }

  // Form components
  if (nameLower.includes('form') || nameLower.includes('field') ||
      nameLower.includes('fieldset')) {
    return 'forms';
  }

  // Buttons
  if (nameLower.includes('button')) {
    return 'inputs';
  }

  // Navigation
  if (nameLower.includes('breadcrumb') || nameLower.includes('menu') ||
      nameLower.includes('tabs') || nameLower.includes('pagination') ||
      nameLower.includes('link') || nameLower.includes('skip-nav') ||
      nameLower.includes('steps')) {
    return 'navigation';
  }

  // Overlay/Modal
  if (nameLower.includes('modal') || nameLower.includes('dialog') ||
      nameLower.includes('drawer') || nameLower.includes('popover') ||
      nameLower.includes('tooltip') || nameLower.includes('hover-card') ||
      nameLower.includes('portal')) {
    return 'overlay';
  }

  // Feedback
  if (nameLower.includes('alert') || nameLower.includes('toast') ||
      nameLower.includes('spinner') || nameLower.includes('progress') ||
      nameLower.includes('skeleton') || nameLower.includes('loader') ||
      nameLower.includes('status')) {
    return 'feedback';
  }

  // Layout
  if (nameLower.includes('box') || nameLower.includes('container') ||
      nameLower.includes('flex') || nameLower.includes('grid') ||
      nameLower.includes('stack') || nameLower.includes('wrap') ||
      nameLower.includes('center') || nameLower.includes('spacer') ||
      nameLower.includes('divider') || nameLower.includes('separator') ||
      nameLower.includes('aspect-ratio') || nameLower.includes('bleed')) {
    return 'layout';
  }

  // Cards
  if (nameLower.includes('card')) {
    return 'cards';
  }

  // Data display
  if (nameLower.includes('table') || nameLower.includes('list') ||
      nameLower.includes('stat') || nameLower.includes('data-list') ||
      nameLower.includes('badge') || nameLower.includes('tag') ||
      nameLower.includes('code') || nameLower.includes('kbd') ||
      nameLower.includes('timeline')) {
    return 'data-display';
  }

  // Typography
  if (nameLower.includes('text') || nameLower.includes('heading') ||
      nameLower.includes('blockquote') || nameLower.includes('highlight') ||
      nameLower.includes('mark') || nameLower.includes('quote')) {
    return 'typography';
  }

  // Media
  if (nameLower.includes('image') || nameLower.includes('icon') ||
      nameLower.includes('avatar') || nameLower.includes('qr-code')) {
    return 'media';
  }

  // Charts
  if (nameLower.includes('chart') || nameLower.includes('sparkline')) {
    return 'charts';
  }

  return 'other';
}

// ============================================================================
// Connection Status
// ============================================================================

export function getConnectionStatus(): Record<MCPServerType, MCPConnection> {
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
    'figma',
    'lucide-icons',
    'heroicons',
    'iconify',
    'unsplash',
    'pexels',
  ];
  const status: Partial<Record<MCPServerType, MCPConnection>> = {};

  for (const server of servers) {
    const connection = connections.get(server);
    status[server] = {
      serverId: server,
      status: connection?.connected ? 'connected' : 'disconnected',
      tools: connection?.tools || [],
      resources: [],
    };
  }

  return status as Record<MCPServerType, MCPConnection>;
}

// ============================================================================
// Singleton Client
// ============================================================================

export class MCPClient {
  private initialized = false;

  async initialize(servers?: MCPServerType[]): Promise<void> {
    if (this.initialized) return;

    const { MCP_SERVERS } = await import('./types');
    // Default to all enabled component servers
    const serversToConnect = servers || [
      'ui-layouts',
      'shadcn-ui',
      'tailwindcss',
      'flowbite',
      'chakra-ui',
      'magic-ui',
      'aceternity-ui',
      'mui',
      'context7',
      'lucide-icons',
      'heroicons',
      'iconify',
    ] as MCPServerType[];

    await Promise.all(
      serversToConnect
        .filter((s) => MCP_SERVERS[s]?.enabled)
        .map((s) => connectToServer(s, MCP_SERVERS[s]))
    );

    this.initialized = true;
  }

  async searchComponents(query: string, sources?: MCPServerType[]): Promise<ComponentMetadata[]> {
    return searchAllServers(query, sources);
  }

  async getComponentSource(componentId: string, source: MCPServerType): Promise<ComponentSource | null> {
    return fetchComponentSource(componentId, source);
  }

  async getDocumentation(library: string, query: string): Promise<string | null> {
    return fetchContext7Docs(library, query);
  }

  async searchIcons(query: string): Promise<IconMetadata[]> {
    return searchLucideIcons(query);
  }

  async getIcon(name: string): Promise<IconMetadata | null> {
    return getLucideIcon(name);
  }

  async getIconCategories(): Promise<string[]> {
    return listLucideCategories();
  }

  async callTool(call: MCPToolCall): Promise<MCPToolResult> {
    return callTool(call);
  }

  getStatus(): Record<MCPServerType, MCPConnection> {
    return getConnectionStatus();
  }

  async shutdown(): Promise<void> {
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
      'figma',
      'lucide-icons',
      'heroicons',
      'iconify',
      'unsplash',
      'pexels',
    ];
    await Promise.all(servers.map(disconnectFromServer));
    this.initialized = false;
  }
}

export const mcpClient = new MCPClient();
