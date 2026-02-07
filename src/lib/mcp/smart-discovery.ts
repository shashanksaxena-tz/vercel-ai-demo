/**
 * Smart Component Discovery Engine
 *
 * Analyzes user requests to determine which components to discover from MCP servers.
 * Uses intent-based analysis to keep token budget under control while maximizing relevance.
 */

export interface DiscoveryIntent {
  /** Primary intent category */
  intent: 'dashboard' | 'landing-page' | 'form' | 'data-table' | 'marketing' | 'admin' | 'app' | 'general';

  /** Core components that should always be included */
  coreComponents: string[];

  /** Context-aware components to discover from MCP */
  contextComponents: string[];

  /** MCP server sources to query */
  mcpSources: string[];

  /** Search queries for MCP component discovery */
  searchQueries: string[];

  /** Estimated token budget for discovered components */
  estimatedTokens: number;
}

export interface ComponentPriority {
  /** Component name */
  name: string;

  /** Priority score (higher = more relevant) */
  priority: number;

  /** Reason for inclusion */
  reason: string;
}

/**
 * Intent patterns for different request types
 */
const INTENT_PATTERNS = {
  dashboard: {
    keywords: ['dashboard', 'analytics', 'metrics', 'stats', 'kpi', 'charts', 'graphs', 'data visualization'],
    contextComponents: ['LineChart', 'BarChart', 'PieChart', 'AreaChart', 'DataTable', 'StatCard', 'MetricCard', 'Sparkline'],
    mcpSources: ['shadcn-ui', 'recharts-mcp', 'mui', 'chakra-ui'],
    searchQueries: ['chart', 'graph', 'table', 'dashboard', 'metrics', 'statistics'],
    estimatedTokens: 5000,
  },
  'landing-page': {
    keywords: ['landing', 'marketing', 'hero', 'cta', 'pricing', 'testimonial', 'features', 'homepage'],
    contextComponents: ['Hero', 'PricingCard', 'TestimonialCard', 'FeatureGrid', 'CTASection', 'Newsletter', 'FAQ', 'LogoCloud'],
    mcpSources: ['shadcn-ui', 'magic-ui', 'aceternity-ui', 'tailwind-components'],
    searchQueries: ['hero', 'pricing', 'testimonial', 'cta', 'marketing', 'landing'],
    estimatedTokens: 4500,
  },
  form: {
    keywords: ['form', 'input', 'signup', 'login', 'registration', 'contact', 'survey', 'wizard'],
    contextComponents: ['FormField', 'TextInput', 'Select', 'Checkbox', 'Radio', 'DatePicker', 'FileUpload', 'FormWizard'],
    mcpSources: ['shadcn-ui', 'mui', 'chakra-ui', 'flowbite'],
    searchQueries: ['form', 'input', 'validation', 'field', 'picker'],
    estimatedTokens: 3500,
  },
  'data-table': {
    keywords: ['table', 'grid', 'list', 'data', 'records', 'rows', 'columns', 'pagination'],
    contextComponents: ['DataTable', 'DataGrid', 'VirtualTable', 'SortableTable', 'FilterableTable', 'Pagination'],
    mcpSources: ['shadcn-ui', 'mui', 'chakra-ui'],
    searchQueries: ['table', 'grid', 'data', 'pagination', 'sort', 'filter'],
    estimatedTokens: 4000,
  },
  marketing: {
    keywords: ['marketing', 'promo', 'campaign', 'banner', 'announcement', 'notification'],
    contextComponents: ['Banner', 'Notification', 'Toast', 'Modal', 'Popover', 'Tooltip', 'Badge', 'Alert'],
    mcpSources: ['shadcn-ui', 'magic-ui', 'aceternity-ui'],
    searchQueries: ['banner', 'notification', 'toast', 'alert', 'announcement'],
    estimatedTokens: 3000,
  },
  admin: {
    keywords: ['admin', 'settings', 'configuration', 'management', 'control panel', 'backoffice'],
    contextComponents: ['Sidebar', 'Navigation', 'Breadcrumb', 'Tabs', 'Accordion', 'Tree', 'Menu', 'Command'],
    mcpSources: ['shadcn-ui', 'mui', 'chakra-ui'],
    searchQueries: ['navigation', 'sidebar', 'menu', 'tabs', 'settings'],
    estimatedTokens: 3500,
  },
  app: {
    keywords: ['app', 'application', 'interface', 'ui', 'screen', 'page'],
    contextComponents: ['Layout', 'Container', 'Grid', 'Stack', 'Card', 'Paper', 'Sheet'],
    mcpSources: ['shadcn-ui', 'mui', 'chakra-ui', 'tailwind-components'],
    searchQueries: ['layout', 'container', 'grid', 'card'],
    estimatedTokens: 2500,
  },
  general: {
    keywords: [],
    contextComponents: ['Button', 'Input', 'Card', 'Container', 'Text', 'Heading', 'Image', 'Link'],
    mcpSources: ['shadcn-ui'],
    searchQueries: ['common', 'basic'],
    estimatedTokens: 2000,
  },
} as const;

/**
 * Core components that are always available (from existing 78)
 */
const CORE_COMPONENTS = [
  // Layout
  'Container', 'Grid', 'Stack', 'Flex', 'Box', 'Divider', 'Spacer',

  // Typography
  'Heading', 'Text', 'Paragraph', 'Label', 'Code',

  // Forms
  'Button', 'Input', 'Textarea', 'Select', 'Checkbox', 'Radio', 'Switch',

  // Display
  'Card', 'Paper', 'Badge', 'Avatar', 'Image', 'Icon',

  // Navigation
  'Link', 'Breadcrumb', 'Tabs', 'Menu',

  // Feedback
  'Alert', 'Toast', 'Progress', 'Spinner', 'Skeleton',
];

/**
 * Analyze user request to determine discovery intent
 */
export function analyzeRequest(request: string): DiscoveryIntent {
  const normalizedRequest = request.toLowerCase();

  // Find matching intent based on keywords
  let matchedIntent: keyof typeof INTENT_PATTERNS = 'general';
  let maxMatches = 0;

  for (const [intent, pattern] of Object.entries(INTENT_PATTERNS)) {
    const matches = pattern.keywords.filter(keyword =>
      normalizedRequest.includes(keyword)
    ).length;

    if (matches > maxMatches) {
      maxMatches = matches;
      matchedIntent = intent as keyof typeof INTENT_PATTERNS;
    }
  }

  const pattern = INTENT_PATTERNS[matchedIntent];

  return {
    intent: matchedIntent,
    coreComponents: CORE_COMPONENTS,
    contextComponents: pattern.contextComponents,
    mcpSources: pattern.mcpSources,
    searchQueries: pattern.searchQueries,
    estimatedTokens: pattern.estimatedTokens,
  };
}

/**
 * Prioritize discovered components based on relevance
 */
export function prioritizeComponents(
  discoveredComponents: Array<{ name: string; description?: string; source: string }>,
  intent: DiscoveryIntent,
  maxComponents: number = 50
): ComponentPriority[] {
  const priorities: ComponentPriority[] = discoveredComponents.map(component => {
    let priority = 0;
    let reason = 'General relevance';

    // Higher priority if in context components
    if (intent.contextComponents.some(cc =>
      component.name.toLowerCase().includes(cc.toLowerCase()) ||
      cc.toLowerCase().includes(component.name.toLowerCase())
    )) {
      priority += 10;
      reason = 'Matches intent context';
    }

    // Higher priority if description matches search queries
    if (component.description) {
      const descLower = component.description.toLowerCase();
      const matchingQueries = intent.searchQueries.filter(query =>
        descLower.includes(query)
      );

      if (matchingQueries.length > 0) {
        priority += matchingQueries.length * 5;
        reason = `Matches queries: ${matchingQueries.join(', ')}`;
      }
    }

    // Bonus for certain component types based on intent
    if (intent.intent === 'dashboard') {
      if (/chart|graph|metric|stat|data|table/i.test(component.name)) {
        priority += 8;
        reason = 'Dashboard-specific component';
      }
    } else if (intent.intent === 'landing-page') {
      if (/hero|pricing|testimonial|cta|feature/i.test(component.name)) {
        priority += 8;
        reason = 'Landing page component';
      }
    } else if (intent.intent === 'form') {
      if (/input|field|select|picker|upload/i.test(component.name)) {
        priority += 8;
        reason = 'Form component';
      }
    }

    // Prefer components from primary MCP sources
    if (intent.mcpSources.includes(component.source)) {
      priority += 3;
    }

    return {
      name: component.name,
      priority,
      reason,
    };
  });

  // Sort by priority and take top N
  return priorities
    .sort((a, b) => b.priority - a.priority)
    .slice(0, maxComponents);
}

/**
 * Estimate token count for component metadata
 * Rough heuristic: component name + description ~= 100 tokens
 */
export function estimateComponentTokens(componentCount: number): number {
  return componentCount * 100;
}

/**
 * Check if we're within token budget
 */
export function withinTokenBudget(
  coreTokens: number,
  discoveredTokens: number,
  maxBudget: number = 15000
): boolean {
  return (coreTokens + discoveredTokens) <= maxBudget;
}

/**
 * Adjust component count to fit within budget
 */
export function adjustForBudget(
  componentPriorities: ComponentPriority[],
  coreTokens: number,
  maxBudget: number = 15000
): ComponentPriority[] {
  const availableTokens = maxBudget - coreTokens;
  const maxComponents = Math.floor(availableTokens / 100); // 100 tokens per component

  return componentPriorities.slice(0, maxComponents);
}
