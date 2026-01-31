/**
 * Component Analyzer
 *
 * Analyzes user requests to identify what UI components are needed.
 * Uses pattern matching and keyword extraction to suggest components.
 */

import type {
  UIAnalysis,
  ComponentRequirement,
  ComponentCategory,
  MCPServerType,
} from './types';

// ============================================================================
// Component Patterns
// ============================================================================

interface ComponentPattern {
  keywords: string[];
  componentTypes: string[];
  category: ComponentCategory;
  priority: 'required' | 'optional' | 'nice-to-have';
}

const componentPatterns: ComponentPattern[] = [
  // Dashboard patterns
  {
    keywords: ['dashboard', 'admin', 'analytics', 'overview'],
    componentTypes: ['DashboardStats', 'MetricCard', 'Chart', 'DataTable', 'SidebarNav'],
    category: 'dashboard',
    priority: 'required',
  },
  {
    keywords: ['metrics', 'stats', 'kpi', 'numbers'],
    componentTypes: ['MetricCard', 'StatCard', 'Progress', 'Chart'],
    category: 'dashboard',
    priority: 'required',
  },

  // Charts
  {
    keywords: ['chart', 'graph', 'visualization', 'data viz'],
    componentTypes: ['LineChart', 'BarChart', 'PieChart', 'AreaChart'],
    category: 'charts',
    priority: 'required',
  },

  // Tables
  {
    keywords: ['table', 'list', 'data', 'grid', 'records'],
    componentTypes: ['DataTable', 'Table', 'ListView'],
    category: 'data-display',
    priority: 'required',
  },

  // Forms
  {
    keywords: ['form', 'input', 'submit', 'create', 'edit', 'settings'],
    componentTypes: ['Input', 'Select', 'Checkbox', 'Button', 'FormField', 'TextArea'],
    category: 'forms',
    priority: 'required',
  },
  {
    keywords: ['login', 'signup', 'register', 'auth', 'signin'],
    componentTypes: ['AuthForm', 'Input', 'Button', 'Card'],
    category: 'authentication',
    priority: 'required',
  },
  {
    keywords: ['contact', 'message', 'email', 'inquiry'],
    componentTypes: ['ContactForm', 'Input', 'TextArea', 'Button'],
    category: 'forms',
    priority: 'required',
  },

  // Navigation
  {
    keywords: ['navigation', 'nav', 'menu', 'sidebar', 'header'],
    componentTypes: ['Navbar', 'SidebarNav', 'Menu', 'Breadcrumb'],
    category: 'navigation',
    priority: 'required',
  },
  {
    keywords: ['tabs', 'tabbed', 'sections'],
    componentTypes: ['Tabs', 'TabList', 'TabPanel'],
    category: 'navigation',
    priority: 'required',
  },

  // Cards
  {
    keywords: ['card', 'tile', 'panel', 'box'],
    componentTypes: ['Card', 'ProfileCard', 'ProductCard', 'InfoCard'],
    category: 'cards',
    priority: 'required',
  },
  {
    keywords: ['profile', 'user', 'account', 'avatar'],
    componentTypes: ['ProfileCard', 'Avatar', 'Badge'],
    category: 'cards',
    priority: 'required',
  },
  {
    keywords: ['product', 'item', 'listing'],
    componentTypes: ['ProductCard', 'Image', 'Badge', 'Button'],
    category: 'e-commerce',
    priority: 'required',
  },

  // Marketing
  {
    keywords: ['landing', 'hero', 'homepage', 'marketing'],
    componentTypes: ['HeroSection', 'FeatureGrid', 'CTASection', 'Testimonials'],
    category: 'marketing',
    priority: 'required',
  },
  {
    keywords: ['pricing', 'plans', 'subscription', 'tiers'],
    componentTypes: ['PricingTable', 'PricingCard', 'Badge', 'Button'],
    category: 'marketing',
    priority: 'required',
  },
  {
    keywords: ['features', 'benefits', 'showcase'],
    componentTypes: ['FeatureGrid', 'FeatureCard', 'Icon', 'Text'],
    category: 'marketing',
    priority: 'required',
  },
  {
    keywords: ['testimonial', 'review', 'quote', 'feedback'],
    componentTypes: ['TestimonialCarousel', 'TestimonialCard', 'Avatar', 'Quote'],
    category: 'marketing',
    priority: 'required',
  },
  {
    keywords: ['faq', 'questions', 'answers', 'help'],
    componentTypes: ['Accordion', 'FAQ', 'Collapse'],
    category: 'marketing',
    priority: 'optional',
  },
  {
    keywords: ['footer', 'bottom', 'links'],
    componentTypes: ['Footer', 'Link', 'Stack'],
    category: 'navigation',
    priority: 'optional',
  },

  // E-commerce
  {
    keywords: ['cart', 'checkout', 'shopping', 'buy'],
    componentTypes: ['CartSummary', 'CartItem', 'Button', 'Input'],
    category: 'e-commerce',
    priority: 'required',
  },
  {
    keywords: ['order', 'receipt', 'invoice'],
    componentTypes: ['Table', 'Card', 'Divider', 'Text'],
    category: 'e-commerce',
    priority: 'required',
  },

  // Feedback
  {
    keywords: ['notification', 'alert', 'toast', 'message'],
    componentTypes: ['Alert', 'Toast', 'NotificationCenter'],
    category: 'feedback',
    priority: 'optional',
  },
  {
    keywords: ['loading', 'spinner', 'skeleton', 'placeholder'],
    componentTypes: ['Skeleton', 'Spinner', 'Progress'],
    category: 'feedback',
    priority: 'nice-to-have',
  },
  {
    keywords: ['modal', 'dialog', 'popup', 'overlay'],
    componentTypes: ['Dialog', 'Modal', 'Overlay'],
    category: 'overlay',
    priority: 'optional',
  },

  // Layout
  {
    keywords: ['layout', 'container', 'wrapper', 'page'],
    componentTypes: ['Container', 'Grid', 'Stack', 'Box'],
    category: 'layout',
    priority: 'required',
  },
  {
    keywords: ['grid', 'columns', 'rows', 'responsive'],
    componentTypes: ['Grid', 'Container', 'Stack'],
    category: 'layout',
    priority: 'required',
  },

  // Media
  {
    keywords: ['image', 'photo', 'picture', 'gallery'],
    componentTypes: ['Image', 'Gallery', 'Carousel'],
    category: 'media',
    priority: 'optional',
  },
  {
    keywords: ['icon', 'symbol', 'emoji'],
    componentTypes: ['Icon', 'Badge'],
    category: 'media',
    priority: 'nice-to-have',
  },

  // Animated Components (Magic UI / Aceternity UI)
  {
    keywords: ['animated', 'animation', 'motion', 'framer'],
    componentTypes: ['BlurFade', 'OrbitingCircles', 'AnimatedBeam', 'MorphingText'],
    category: 'media',
    priority: 'optional',
  },
  {
    keywords: ['text animation', 'typing', 'reveal', 'text effect'],
    componentTypes: ['TextAnimate', 'TypingAnimation', 'FlipText', 'WordPullUp'],
    category: 'typography',
    priority: 'optional',
  },
  {
    keywords: ['shimmer', 'glow', 'shine', 'gradient'],
    componentTypes: ['ShimmerButton', 'ShineBorder', 'GradientText', 'GlowingCard'],
    category: 'feedback',
    priority: 'nice-to-have',
  },
  {
    keywords: ['bento', 'masonry', 'dock', 'floating'],
    componentTypes: ['BentoGrid', 'Dock', 'FloatingCard', 'GridPattern'],
    category: 'layout',
    priority: 'optional',
  },
  {
    keywords: ['terminal', 'code', 'cli', 'console'],
    componentTypes: ['Terminal', 'CodeBlock', 'AnimatedCode'],
    category: 'media',
    priority: 'optional',
  },
  {
    keywords: ['globe', '3d', 'three', 'sphere'],
    componentTypes: ['Globe', 'AnimatedSphere', 'ThreeScene'],
    category: 'media',
    priority: 'nice-to-have',
  },
  {
    keywords: ['confetti', 'celebration', 'particles', 'sparkles'],
    componentTypes: ['Confetti', 'Particles', 'Sparkles'],
    category: 'feedback',
    priority: 'nice-to-have',
  },
  {
    keywords: ['device', 'mockup', 'iphone', 'safari', 'browser'],
    componentTypes: ['IPhone15Pro', 'Safari', 'BrowserMockup'],
    category: 'media',
    priority: 'optional',
  },
  {
    keywords: ['marquee', 'scroll', 'infinite', 'ticker'],
    componentTypes: ['Marquee', 'InfiniteScroll', 'Ticker'],
    category: 'media',
    priority: 'optional',
  },
  {
    keywords: ['spotlight', 'focus', 'highlight', 'beam'],
    componentTypes: ['Spotlight', 'AnimatedBeam', 'FocusCard'],
    category: 'feedback',
    priority: 'nice-to-have',
  },
];

// ============================================================================
// Layout Patterns
// ============================================================================

interface LayoutPattern {
  keywords: string[];
  suggestedLayout: string;
  complexity: 'simple' | 'moderate' | 'complex';
}

const layoutPatterns: LayoutPattern[] = [
  {
    keywords: ['dashboard', 'admin', 'panel'],
    suggestedLayout: 'sidebar with main content area, header with navigation',
    complexity: 'complex',
  },
  {
    keywords: ['landing', 'homepage', 'marketing'],
    suggestedLayout: 'full-width sections stacked vertically with hero at top',
    complexity: 'moderate',
  },
  {
    keywords: ['form', 'settings', 'profile'],
    suggestedLayout: 'centered card with form fields',
    complexity: 'simple',
  },
  {
    keywords: ['list', 'table', 'data'],
    suggestedLayout: 'full-width container with data table',
    complexity: 'moderate',
  },
  {
    keywords: ['grid', 'gallery', 'products'],
    suggestedLayout: 'responsive grid of cards',
    complexity: 'moderate',
  },
  {
    keywords: ['login', 'signup', 'auth'],
    suggestedLayout: 'centered card with form',
    complexity: 'simple',
  },
];

// ============================================================================
// Analyzer
// ============================================================================

/**
 * Analyze a user request to identify UI component requirements
 */
export function analyzeRequest(userRequest: string): UIAnalysis {
  const requestLower = userRequest.toLowerCase();
  const words = requestLower.split(/\s+/);

  // Find matching component patterns
  const matchedPatterns: ComponentPattern[] = [];
  const matchedComponents = new Set<string>();

  for (const pattern of componentPatterns) {
    const hasMatch = pattern.keywords.some(
      (keyword) => requestLower.includes(keyword)
    );
    if (hasMatch) {
      matchedPatterns.push(pattern);
      for (const comp of pattern.componentTypes) {
        matchedComponents.add(comp);
      }
    }
  }

  // Build requirements
  const requirements: ComponentRequirement[] = matchedPatterns.map((pattern) => ({
    type: pattern.category,
    purpose: `Components for ${pattern.keywords.find((k) => requestLower.includes(k))} functionality`,
    suggestedComponents: pattern.componentTypes,
    priority: pattern.priority,
  }));

  // Find layout suggestion
  let suggestedLayout = 'flexible container with stacked sections';
  let complexity: 'simple' | 'moderate' | 'complex' = 'simple';

  for (const layout of layoutPatterns) {
    const hasMatch = layout.keywords.some(
      (keyword) => requestLower.includes(keyword)
    );
    if (hasMatch) {
      suggestedLayout = layout.suggestedLayout;
      complexity = layout.complexity;
      break;
    }
  }

  // Determine intent
  const intentKeywords: Record<string, string[]> = {
    'create a dashboard': ['dashboard', 'admin', 'analytics'],
    'build a landing page': ['landing', 'marketing', 'homepage'],
    'design a form': ['form', 'input', 'submit', 'create', 'edit'],
    'create authentication': ['login', 'signup', 'auth', 'register'],
    'build e-commerce': ['cart', 'checkout', 'product', 'shop'],
    'create a profile page': ['profile', 'user', 'account'],
    'build a table view': ['table', 'list', 'data', 'grid'],
    'create navigation': ['navigation', 'menu', 'sidebar'],
  };

  let intent = 'create a custom UI';
  for (const [intentName, keywords] of Object.entries(intentKeywords)) {
    if (keywords.some((k) => requestLower.includes(k))) {
      intent = intentName;
      break;
    }
  }

  // Generate search queries for MCP
  const searchQueries = Array.from(matchedComponents);

  // Add extra search terms based on intent
  if (intent.includes('dashboard')) {
    searchQueries.push('dashboard', 'stats', 'chart', 'metrics');
  } else if (intent.includes('landing')) {
    searchQueries.push('hero', 'features', 'testimonial', 'pricing');
  } else if (intent.includes('form')) {
    searchQueries.push('form', 'input', 'validation');
  }

  return {
    intent,
    requirements,
    suggestedLayout,
    complexity,
    searchQueries: [...new Set(searchQueries)],
  };
}

/**
 * Get recommended MCP sources based on the analysis
 */
export function getRecommendedSources(analysis: UIAnalysis): MCPServerType[] {
  const sources = new Set<MCPServerType>();

  // Always include UI layouts for complex layouts
  if (analysis.complexity === 'complex' || analysis.complexity === 'moderate') {
    sources.add('ui-layouts');
  }

  // Include shadcn for form components
  const hasFormRequirements = analysis.requirements.some(
    (r) => r.type === 'forms' || r.type === 'inputs'
  );
  if (hasFormRequirements) {
    sources.add('shadcn-ui');
    sources.add('chakra-ui'); // Also great for forms
  }

  // Include tailwind for utility-based styling
  sources.add('tailwindcss');

  // Include flowbite for pre-built components
  if (analysis.requirements.some((r) => r.type === 'marketing' || r.type === 'e-commerce')) {
    sources.add('flowbite');
  }

  // Include Magic UI for animated components
  const hasAnimatedRequirements = analysis.requirements.some(
    (r) => r.type === 'media' || r.type === 'marketing'
  );
  if (hasAnimatedRequirements) {
    sources.add('magic-ui');
    sources.add('aceternity-ui');
  }

  // Include MUI for data-heavy components
  const hasDataRequirements = analysis.requirements.some(
    (r) => r.type === 'data-display' || r.type === 'dashboard' || r.type === 'charts'
  );
  if (hasDataRequirements) {
    sources.add('mui');
  }

  // Include Chakra UI for accessibility-focused components
  if (analysis.complexity === 'complex') {
    sources.add('chakra-ui');
  }

  return Array.from(sources);
}

/**
 * Generate a component hierarchy for the given analysis
 */
export function generateComponentHierarchy(analysis: UIAnalysis): {
  root: string;
  children: Array<{ type: string; props: Record<string, unknown> }>;
} {
  const children: Array<{ type: string; props: Record<string, unknown> }> = [];

  // Add layout container
  children.push({
    type: 'Container',
    props: { maxWidth: 'max-w-7xl', padding: 'px-4 py-8' },
  });

  // Group requirements by priority
  const required = analysis.requirements.filter((r) => r.priority === 'required');
  const optional = analysis.requirements.filter((r) => r.priority === 'optional');

  // Add required components first
  for (const req of required) {
    for (const comp of req.suggestedComponents.slice(0, 2)) {
      children.push({
        type: comp,
        props: { purpose: req.purpose },
      });
    }
  }

  // Add optional components
  for (const req of optional) {
    for (const comp of req.suggestedComponents.slice(0, 1)) {
      children.push({
        type: comp,
        props: { purpose: req.purpose },
      });
    }
  }

  return {
    root: 'main',
    children,
  };
}

/**
 * Extract component names from user request
 */
export function extractComponentNames(userRequest: string): string[] {
  const requestLower = userRequest.toLowerCase();
  const components = new Set<string>();

  for (const pattern of componentPatterns) {
    const hasMatch = pattern.keywords.some((keyword) =>
      requestLower.includes(keyword)
    );
    if (hasMatch) {
      for (const comp of pattern.componentTypes) {
        components.add(comp);
      }
    }
  }

  return Array.from(components);
}
