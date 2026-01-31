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

    // List available tools
    const toolsResult = await client.listTools();
    const tools: MCPTool[] = toolsResult.tools.map((t) => ({
      name: t.name,
      description: t.description || '',
      inputSchema: t.inputSchema as Record<string, unknown>,
    }));

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
    arguments: { query },
  });

  if (!result.success || !result.content) {
    return [];
  }

  const components = result.content as Array<{
    key: string;
    name: string;
    group?: string;
    tags?: string[];
    description?: string;
  }>;

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

  const components = result.content as Array<{
    name: string;
    description?: string;
    dependencies?: string[];
  }>;

  const queryLower = query.toLowerCase();
  return components
    .filter((c) =>
      c.name.toLowerCase().includes(queryLower) ||
      c.description?.toLowerCase().includes(queryLower)
    )
    .map((c) => ({
      id: `shadcn:${c.name}`,
      name: c.name,
      displayName: c.name,
      description: c.description || '',
      category: 'other' as ComponentCategory,
      tags: [],
      source: 'shadcn-ui' as MCPServerType,
      framework: 'react' as const,
      dependencies: c.dependencies,
    }));
}

/**
 * Search for templates on Tailwind CSS MCP
 */
export async function searchTailwind(query: string): Promise<ComponentMetadata[]> {
  const result = await callTool({
    server: 'tailwindcss',
    name: 'generate_component_template',
    arguments: { component: query },
  });

  if (!result.success || !result.content) {
    return [];
  }

  const template = result.content as {
    name?: string;
    html?: string;
    description?: string;
  };

  if (!template.html) {
    return [];
  }

  return [{
    id: `tailwind:${query}`,
    name: query,
    displayName: query,
    description: template.description || `Tailwind CSS ${query} template`,
    category: 'other' as ComponentCategory,
    tags: ['tailwind', 'template'],
    source: 'tailwindcss' as MCPServerType,
    framework: 'html' as const,
  }];
}

/**
 * Search for components on Flowbite MCP
 */
export async function searchFlowbite(query: string): Promise<ComponentMetadata[]> {
  // Flowbite MCP uses resources for components
  // We need to list resources and filter
  const result = await callTool({
    server: 'flowbite',
    name: 'list_resources',
    arguments: {},
  });

  if (!result.success || !result.content) {
    return [];
  }

  const resources = result.content as Array<{
    uri: string;
    name: string;
    description?: string;
  }>;

  const queryLower = query.toLowerCase();
  return resources
    .filter((r) =>
      r.name.toLowerCase().includes(queryLower) ||
      r.description?.toLowerCase().includes(queryLower)
    )
    .map((r) => ({
      id: `flowbite:${r.name}`,
      name: r.name,
      displayName: r.name,
      description: r.description || '',
      category: 'other' as ComponentCategory,
      tags: ['flowbite', 'tailwind'],
      source: 'flowbite' as MCPServerType,
      framework: 'html' as const,
    }));
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

  const components = result.content as Array<{
    name: string;
    description?: string;
    category?: string;
  }>;

  const queryLower = query.toLowerCase();
  return components
    .filter((c) =>
      c.name.toLowerCase().includes(queryLower) ||
      c.description?.toLowerCase().includes(queryLower)
    )
    .map((c) => ({
      id: `chakra:${c.name}`,
      name: c.name,
      displayName: c.name,
      description: c.description || '',
      category: mapGroupToCategory(c.category),
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

  const components = result.content as Array<{
    name: string;
    description?: string;
    category?: string;
  }>;

  const queryLower = query.toLowerCase();
  return components
    .filter((c) =>
      c.name.toLowerCase().includes(queryLower) ||
      c.description?.toLowerCase().includes(queryLower)
    )
    .map((c) => ({
      id: `magic-ui:${c.name}`,
      name: c.name,
      displayName: c.name,
      description: c.description || '',
      category: mapGroupToCategory(c.category),
      tags: ['magic-ui', 'animated', 'framer-motion'],
      source: 'magic-ui' as MCPServerType,
      framework: 'react' as const,
    }));
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

    const components = allResult.content as Array<{
      name: string;
      description?: string;
      category?: string;
    }>;

    const queryLower = query.toLowerCase();
    return components
      .filter((c) =>
        c.name.toLowerCase().includes(queryLower) ||
        c.description?.toLowerCase().includes(queryLower)
      )
      .map((c) => ({
        id: `aceternity:${c.name}`,
        name: c.name,
        displayName: c.name,
        description: c.description || '',
        category: mapGroupToCategory(c.category),
        tags: ['aceternity-ui', 'animated', 'framer-motion'],
        source: 'aceternity-ui' as MCPServerType,
        framework: 'react' as const,
      }));
  }

  const components = result.content as Array<{
    name: string;
    description?: string;
    category?: string;
  }>;

  return components.map((c) => ({
    id: `aceternity:${c.name}`,
    name: c.name,
    displayName: c.name,
    description: c.description || '',
    category: mapGroupToCategory(c.category),
    tags: ['aceternity-ui', 'animated', 'framer-motion'],
    source: 'aceternity-ui' as MCPServerType,
    framework: 'react' as const,
  }));
}

/**
 * Search for components on Material UI MCP
 */
export async function searchMUI(query: string): Promise<ComponentMetadata[]> {
  const result = await callTool({
    server: 'mui',
    name: 'search_components',
    arguments: { query },
  });

  if (!result.success || !result.content) {
    // Fallback: list all components
    const listResult = await callTool({
      server: 'mui',
      name: 'list_components',
      arguments: {},
    });

    if (!listResult.success || !listResult.content) {
      return [];
    }

    const components = listResult.content as Array<{
      name: string;
      description?: string;
      category?: string;
    }>;

    const queryLower = query.toLowerCase();
    return components
      .filter((c) =>
        c.name.toLowerCase().includes(queryLower) ||
        c.description?.toLowerCase().includes(queryLower)
      )
      .map((c) => ({
        id: `mui:${c.name}`,
        name: c.name,
        displayName: c.name,
        description: c.description || '',
        category: mapGroupToCategory(c.category),
        tags: ['material-ui', 'react', 'mui'],
        source: 'mui' as MCPServerType,
        framework: 'react' as const,
      }));
  }

  const components = result.content as Array<{
    name: string;
    description?: string;
    category?: string;
  }>;

  return components.map((c) => ({
    id: `mui:${c.name}`,
    name: c.name,
    displayName: c.name,
    description: c.description || '',
    category: mapGroupToCategory(c.category),
    tags: ['material-ui', 'react', 'mui'],
    source: 'mui' as MCPServerType,
    framework: 'react' as const,
  }));
}

/**
 * Fetch documentation from Context7
 */
export async function fetchContext7Docs(library: string, query: string): Promise<string | null> {
  // First resolve the library ID
  const resolveResult = await callTool({
    server: 'context7',
    name: 'resolve-library-id',
    arguments: { library },
  });

  if (!resolveResult.success || !resolveResult.content) {
    return null;
  }

  const libraryId = resolveResult.content as string;

  // Then query the docs
  const docsResult = await callTool({
    server: 'context7',
    name: 'query-docs',
    arguments: { libraryId, query },
  });

  if (!docsResult.success || !docsResult.content) {
    return null;
  }

  return docsResult.content as string;
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
    arguments: { component: templateName },
  });

  if (!result.success || !result.content) {
    return null;
  }

  const template = result.content as {
    html?: string;
    classes?: string[];
  };

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
    ];
    await Promise.all(servers.map(disconnectFromServer));
    this.initialized = false;
  }
}

export const mcpClient = new MCPClient();
