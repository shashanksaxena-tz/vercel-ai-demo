/**
 * MCP Client - Simulated MCP client for the browser
 * In a real implementation, this would connect to actual MCP servers
 * For now, we simulate the responses with static data
 */

import type {
  MCPToolCall,
  MCPToolResult,
  UILayoutsSearchResult,
  ComponentMetadata,
} from './types';

// Simulated UI Layouts components database
const uiLayoutsComponents: ComponentMetadata[] = [
  {
    id: 'hero-section',
    name: 'HeroSection',
    displayName: 'Hero Section',
    description: 'A modern hero section with gradient background and CTA buttons',
    category: 'marketing',
    tags: ['hero', 'landing', 'gradient', 'cta'],
    source: 'ui-layouts',
  },
  {
    id: 'pricing-table',
    name: 'PricingTable',
    displayName: 'Pricing Table',
    description: 'Responsive pricing table with multiple tiers',
    category: 'marketing',
    tags: ['pricing', 'table', 'subscription', 'tiers'],
    source: 'ui-layouts',
  },
  {
    id: 'feature-grid',
    name: 'FeatureGrid',
    displayName: 'Feature Grid',
    description: 'Grid layout for showcasing features with icons',
    category: 'marketing',
    tags: ['features', 'grid', 'icons', 'showcase'],
    source: 'ui-layouts',
  },
  {
    id: 'testimonial-carousel',
    name: 'TestimonialCarousel',
    displayName: 'Testimonial Carousel',
    description: 'Carousel component for displaying customer testimonials',
    category: 'marketing',
    tags: ['testimonials', 'carousel', 'reviews', 'social-proof'],
    source: 'ui-layouts',
  },
  {
    id: 'dashboard-stats',
    name: 'DashboardStats',
    displayName: 'Dashboard Stats',
    description: 'Stats cards for dashboard overview',
    category: 'dashboard',
    tags: ['stats', 'metrics', 'dashboard', 'cards'],
    source: 'ui-layouts',
  },
  {
    id: 'data-table',
    name: 'DataTable',
    displayName: 'Data Table',
    description: 'Advanced data table with sorting and filtering',
    category: 'dashboard',
    tags: ['table', 'data', 'sorting', 'filtering'],
    source: 'ui-layouts',
  },
  {
    id: 'sidebar-nav',
    name: 'SidebarNav',
    displayName: 'Sidebar Navigation',
    description: 'Collapsible sidebar navigation with icons',
    category: 'navigation',
    tags: ['sidebar', 'navigation', 'menu', 'collapsible'],
    source: 'ui-layouts',
  },
  {
    id: 'auth-form',
    name: 'AuthForm',
    displayName: 'Auth Form',
    description: 'Login and registration form with validation',
    category: 'forms',
    tags: ['auth', 'login', 'register', 'form'],
    source: 'ui-layouts',
  },
  {
    id: 'contact-form',
    name: 'ContactForm',
    displayName: 'Contact Form',
    description: 'Contact form with validation and submission',
    category: 'forms',
    tags: ['contact', 'form', 'validation', 'email'],
    source: 'ui-layouts',
  },
  {
    id: 'profile-card',
    name: 'ProfileCard',
    displayName: 'Profile Card',
    description: 'User profile card with avatar and social links',
    category: 'cards',
    tags: ['profile', 'card', 'avatar', 'social'],
    source: 'ui-layouts',
  },
  {
    id: 'product-card',
    name: 'ProductCard',
    displayName: 'Product Card',
    description: 'E-commerce product card with image and price',
    category: 'e-commerce',
    tags: ['product', 'card', 'e-commerce', 'shopping'],
    source: 'ui-layouts',
  },
  {
    id: 'cart-summary',
    name: 'CartSummary',
    displayName: 'Cart Summary',
    description: 'Shopping cart summary with items and total',
    category: 'e-commerce',
    tags: ['cart', 'summary', 'checkout', 'e-commerce'],
    source: 'ui-layouts',
  },
  {
    id: 'notification-center',
    name: 'NotificationCenter',
    displayName: 'Notification Center',
    description: 'Notification dropdown with read/unread states',
    category: 'feedback',
    tags: ['notifications', 'dropdown', 'alerts', 'messages'],
    source: 'ui-layouts',
  },
  {
    id: 'command-palette',
    name: 'CommandPalette',
    displayName: 'Command Palette',
    description: 'Keyboard-accessible command palette',
    category: 'navigation',
    tags: ['command', 'palette', 'search', 'keyboard'],
    source: 'ui-layouts',
  },
  {
    id: 'file-upload',
    name: 'FileUpload',
    displayName: 'File Upload',
    description: 'Drag and drop file upload with progress',
    category: 'forms',
    tags: ['file', 'upload', 'drag-drop', 'progress'],
    source: 'ui-layouts',
  },
];

// Simulated Shadcn components
const shadcnComponents: ComponentMetadata[] = [
  {
    id: 'shadcn-button',
    name: 'Button',
    displayName: 'Button',
    description: 'Displays a button or a component that looks like a button',
    category: 'inputs',
    tags: ['button', 'action', 'click'],
    source: 'shadcn',
    props: {
      variant: { name: 'variant', type: 'enum', options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] },
      size: { name: 'size', type: 'enum', options: ['default', 'sm', 'lg', 'icon'] },
    },
  },
  {
    id: 'shadcn-card',
    name: 'Card',
    displayName: 'Card',
    description: 'Displays a card with header, content, and footer',
    category: 'layout',
    tags: ['card', 'container', 'content'],
    source: 'shadcn',
  },
  {
    id: 'shadcn-dialog',
    name: 'Dialog',
    displayName: 'Dialog',
    description: 'A window overlaid on the primary window',
    category: 'overlay',
    tags: ['dialog', 'modal', 'popup'],
    source: 'shadcn',
  },
  {
    id: 'shadcn-input',
    name: 'Input',
    displayName: 'Input',
    description: 'Displays a form input field',
    category: 'inputs',
    tags: ['input', 'form', 'text'],
    source: 'shadcn',
  },
  {
    id: 'shadcn-table',
    name: 'Table',
    displayName: 'Table',
    description: 'A responsive table component',
    category: 'data-display',
    tags: ['table', 'data', 'grid'],
    source: 'shadcn',
  },
];

// Simulated Tailwind utilities
const tailwindUtilities = [
  { category: 'spacing', utilities: ['p-4', 'm-4', 'gap-4', 'space-x-4', 'space-y-4'] },
  { category: 'flexbox', utilities: ['flex', 'flex-row', 'flex-col', 'items-center', 'justify-between'] },
  { category: 'grid', utilities: ['grid', 'grid-cols-3', 'gap-4', 'col-span-2'] },
  { category: 'colors', utilities: ['bg-blue-500', 'text-white', 'border-gray-200'] },
  { category: 'typography', utilities: ['text-lg', 'font-bold', 'leading-relaxed'] },
  { category: 'effects', utilities: ['shadow-lg', 'rounded-lg', 'opacity-50'] },
];

/**
 * MCP Client class for interacting with MCP servers
 */
export class MCPClient {
  /**
   * Search for components across all MCP sources
   */
  async searchComponents(query: string, sources?: string[]): Promise<ComponentMetadata[]> {
    const results: ComponentMetadata[] = [];
    const queryLower = query.toLowerCase();

    // Search UI Layouts
    if (!sources || sources.includes('ui-layouts')) {
      const uiLayoutsResults = uiLayoutsComponents.filter(
        c => c.name.toLowerCase().includes(queryLower) ||
             c.description.toLowerCase().includes(queryLower) ||
             c.tags.some(t => t.includes(queryLower))
      );
      results.push(...uiLayoutsResults);
    }

    // Search Shadcn
    if (!sources || sources.includes('shadcn')) {
      const shadcnResults = shadcnComponents.filter(
        c => c.name.toLowerCase().includes(queryLower) ||
             c.description.toLowerCase().includes(queryLower) ||
             c.tags.some(t => t.includes(queryLower))
      );
      results.push(...shadcnResults);
    }

    return results;
  }

  /**
   * Get component details
   */
  async getComponentDetails(id: string): Promise<ComponentMetadata | null> {
    const allComponents = [...uiLayoutsComponents, ...shadcnComponents];
    return allComponents.find(c => c.id === id) || null;
  }

  /**
   * Get component source code
   */
  async getComponentSource(id: string): Promise<string | null> {
    // In real implementation, this would fetch from MCP server
    return `// Source code for component: ${id}\n// This would be fetched from the MCP server`;
  }

  /**
   * Get component documentation
   */
  async getComponentDocs(id: string): Promise<string | null> {
    const component = await this.getComponentDetails(id);
    if (!component) return null;

    return `# ${component.displayName}\n\n${component.description}\n\n## Usage\n\nImport the component and use it in your React application.\n\n## Props\n\nSee the component documentation for available props.`;
  }

  /**
   * Get Tailwind utilities by category
   */
  async getTailwindUtilities(category?: string): Promise<typeof tailwindUtilities> {
    if (category) {
      return tailwindUtilities.filter(u => u.category === category);
    }
    return tailwindUtilities;
  }

  /**
   * Execute a tool call
   */
  async callTool(tool: MCPToolCall): Promise<MCPToolResult> {
    try {
      switch (tool.name) {
        case 'search_components': {
          const query = tool.arguments.query as string;
          const results = await this.searchComponents(query);
          return { success: true, content: results };
        }
        case 'get_component_details': {
          const id = tool.arguments.id as string;
          const component = await this.getComponentDetails(id);
          return { success: true, content: component };
        }
        case 'get_component_source': {
          const id = tool.arguments.id as string;
          const source = await this.getComponentSource(id);
          return { success: true, content: source };
        }
        case 'get_component_docs': {
          const id = tool.arguments.id as string;
          const docs = await this.getComponentDocs(id);
          return { success: true, content: docs };
        }
        case 'get_tailwind_utilities': {
          const category = tool.arguments.category as string | undefined;
          const utilities = await this.getTailwindUtilities(category);
          return { success: true, content: utilities };
        }
        default:
          return { success: false, content: null, error: `Unknown tool: ${tool.name}` };
      }
    } catch (error) {
      return {
        success: false,
        content: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}

// Singleton instance
export const mcpClient = new MCPClient();
