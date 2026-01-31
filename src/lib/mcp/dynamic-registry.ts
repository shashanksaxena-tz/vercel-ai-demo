/**
 * Dynamic Registry Builder
 *
 * Creates json-render compatible registries dynamically from MCP component metadata.
 * Supports lazy loading of component code from MCP servers.
 */

import React from 'react';
import type { ComponentRegistry, ComponentRenderProps } from '@json-render/react';
import type {
  MCPServerType,
  ComponentMetadata,
  ComponentSource,
  DynamicComponentDef,
} from './types';

// ============================================================================
// Dynamic Component Wrapper
// ============================================================================

/**
 * Creates a lazy-loading wrapper for MCP components
 */
function createDynamicComponent(
  metadata: ComponentMetadata,
  fetchSource: (id: string, source: MCPServerType) => Promise<ComponentSource | null>
): React.ComponentType<ComponentRenderProps<Record<string, unknown>>> {
  // Return a component that renders based on fetched source
  return function DynamicMCPComponent({ element, children }: ComponentRenderProps<Record<string, unknown>>) {
    const [status, setStatus] = React.useState<'loading' | 'loaded' | 'error'>('loading');
    const [source, setSource] = React.useState<ComponentSource | null>(null);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
      let mounted = true;

      async function loadComponent() {
        try {
          const componentSource = await fetchSource(metadata.id, metadata.source);
          if (mounted) {
            if (componentSource) {
              setSource(componentSource);
              setStatus('loaded');
            } else {
              setError('Failed to load component source');
              setStatus('error');
            }
          }
        } catch (err) {
          if (mounted) {
            setError(err instanceof Error ? err.message : 'Unknown error');
            setStatus('error');
          }
        }
      }

      loadComponent();
      return () => { mounted = false; };
    }, []);

    if (status === 'loading') {
      return React.createElement('div', {
        className: 'animate-pulse bg-gray-200 rounded p-4',
        children: `Loading ${metadata.displayName}...`,
      });
    }

    if (status === 'error') {
      return React.createElement('div', {
        className: 'bg-red-100 text-red-700 rounded p-4',
        children: `Error loading ${metadata.displayName}: ${error}`,
      });
    }

    // For HTML-based components (Tailwind, Flowbite), render as dangerouslySetInnerHTML
    if (source?.language === 'html') {
      return React.createElement('div', {
        dangerouslySetInnerHTML: { __html: source.code },
        ...element.props,
      });
    }

    // For React components, we need to evaluate the code
    // In a real implementation, this would use a sandboxed eval or dynamic import
    // For now, render a placeholder with the source info
    return React.createElement('div', {
      className: 'border rounded p-4',
      children: [
        React.createElement('div', {
          key: 'header',
          className: 'font-medium text-sm text-gray-500 mb-2',
          children: `${metadata.displayName} (${metadata.source})`,
        }),
        React.createElement('pre', {
          key: 'code',
          className: 'text-xs bg-gray-50 p-2 rounded overflow-auto max-h-40',
          children: source?.code?.slice(0, 500) + (source?.code && source.code.length > 500 ? '...' : ''),
        }),
        children && React.createElement('div', { key: 'children', className: 'mt-2' }, children),
      ],
    });
  };
}

// ============================================================================
// Registry Builder
// ============================================================================

export interface DynamicRegistryOptions {
  fetchSource: (id: string, source: MCPServerType) => Promise<ComponentSource | null>;
  fallbackRegistry?: ComponentRegistry;
}

/**
 * Build a dynamic registry from MCP component metadata
 */
export function buildDynamicRegistry(
  components: ComponentMetadata[],
  options: DynamicRegistryOptions
): ComponentRegistry {
  const registry: ComponentRegistry = {};

  for (const metadata of components) {
    // Use the component name as the registry key
    const key = metadata.name;

    // Create a dynamic component that loads from MCP
    registry[key] = createDynamicComponent(metadata, options.fetchSource);
  }

  // Merge with fallback registry if provided
  if (options.fallbackRegistry) {
    for (const [key, component] of Object.entries(options.fallbackRegistry)) {
      if (!registry[key]) {
        registry[key] = component;
      }
    }
  }

  return registry;
}

// ============================================================================
// Component Cache
// ============================================================================

interface CachedComponent {
  metadata: ComponentMetadata;
  source?: ComponentSource;
  loadedAt: Date;
  expiresAt: Date;
}

const componentCache = new Map<string, CachedComponent>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Get a cached component or null
 */
export function getCachedComponent(id: string): CachedComponent | null {
  const cached = componentCache.get(id);
  if (cached && cached.expiresAt > new Date()) {
    return cached;
  }
  if (cached) {
    componentCache.delete(id);
  }
  return null;
}

/**
 * Cache a component
 */
export function cacheComponent(
  metadata: ComponentMetadata,
  source?: ComponentSource
): void {
  const now = new Date();
  componentCache.set(metadata.id, {
    metadata,
    source,
    loadedAt: now,
    expiresAt: new Date(now.getTime() + CACHE_TTL),
  });
}

/**
 * Clear the component cache
 */
export function clearComponentCache(): void {
  componentCache.clear();
}

// ============================================================================
// Registry Store
// ============================================================================

export interface RegistryStore {
  components: Map<string, DynamicComponentDef>;
  registry: ComponentRegistry;
  sources: Set<MCPServerType>;
  lastUpdated: Date;
}

const registryStore: RegistryStore = {
  components: new Map(),
  registry: {},
  sources: new Set(),
  lastUpdated: new Date(),
};

/**
 * Add components to the registry store
 */
export function addToRegistryStore(
  components: ComponentMetadata[],
  fetchSource: (id: string, source: MCPServerType) => Promise<ComponentSource | null>
): void {
  for (const metadata of components) {
    // Track the component
    registryStore.components.set(metadata.id, {
      metadata,
      loaded: false,
      loading: false,
    });

    // Add source
    registryStore.sources.add(metadata.source);

    // Create registry entry
    registryStore.registry[metadata.name] = createDynamicComponent(metadata, fetchSource);
  }

  registryStore.lastUpdated = new Date();
}

/**
 * Get the current registry
 */
export function getRegistryStore(): RegistryStore {
  return registryStore;
}

/**
 * Get the current registry components
 */
export function getRegistryComponents(): ComponentRegistry {
  return registryStore.registry;
}

/**
 * Clear the registry store
 */
export function clearRegistryStore(): void {
  registryStore.components.clear();
  registryStore.registry = {};
  registryStore.sources.clear();
  registryStore.lastUpdated = new Date();
}

// ============================================================================
// Pre-built Component Templates
// ============================================================================

/**
 * Common component templates that can be used when MCP is unavailable
 */
export const fallbackComponents: ComponentRegistry = {
  // Container
  Container: ({ element, children }) => {
    const { className = '', maxWidth = 'max-w-7xl', padding = 'px-4' } = element.props as {
      className?: string;
      maxWidth?: string;
      padding?: string;
    };
    return React.createElement('div', {
      className: `${maxWidth} mx-auto ${padding} ${className}`.trim(),
      children,
    });
  },

  // Stack
  Stack: ({ element, children }) => {
    const { direction = 'vertical', gap = '4', className = '' } = element.props as {
      direction?: 'vertical' | 'horizontal';
      gap?: string;
      className?: string;
    };
    const flexDir = direction === 'horizontal' ? 'flex-row' : 'flex-col';
    return React.createElement('div', {
      className: `flex ${flexDir} gap-${gap} ${className}`.trim(),
      children,
    });
  },

  // Grid
  Grid: ({ element, children }) => {
    const { columns = 3, gap = '4', className = '' } = element.props as {
      columns?: number;
      gap?: string;
      className?: string;
    };
    return React.createElement('div', {
      className: `grid grid-cols-${columns} gap-${gap} ${className}`.trim(),
      children,
    });
  },

  // Card
  Card: ({ element, children }) => {
    const { title, description, className = '' } = element.props as {
      title?: string;
      description?: string;
      className?: string;
    };
    return React.createElement('div', {
      className: `bg-white rounded-lg border shadow-sm p-6 ${className}`.trim(),
      children: [
        title && React.createElement('h3', { key: 'title', className: 'text-lg font-semibold' }, title),
        description && React.createElement('p', { key: 'desc', className: 'text-gray-600 mt-1' }, description),
        children && React.createElement('div', { key: 'content', className: 'mt-4' }, children),
      ],
    });
  },

  // Text
  Text: ({ element }) => {
    const { content, variant = 'body', className = '' } = element.props as {
      content?: string;
      variant?: 'body' | 'heading' | 'caption';
      className?: string;
    };
    const variantClasses = {
      heading: 'text-2xl font-bold',
      body: 'text-base',
      caption: 'text-sm text-gray-500',
    };
    return React.createElement('p', {
      className: `${variantClasses[variant]} ${className}`.trim(),
      children: content,
    });
  },

  // Button
  Button: ({ element }) => {
    const { label, variant = 'primary', size = 'md', onClick, className = '' } = element.props as {
      label?: string;
      variant?: 'primary' | 'secondary' | 'outline';
      size?: 'sm' | 'md' | 'lg';
      onClick?: () => void;
      className?: string;
    };
    const variantClasses = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700',
      secondary: 'bg-gray-600 text-white hover:bg-gray-700',
      outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
    };
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2',
      lg: 'px-6 py-3 text-lg',
    };
    return React.createElement('button', {
      className: `rounded-md font-medium ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim(),
      onClick,
      children: label,
    });
  },

  // Input
  Input: ({ element }) => {
    const { label, placeholder, type = 'text', value, onChange, className = '' } = element.props as {
      label?: string;
      placeholder?: string;
      type?: string;
      value?: string;
      onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
      className?: string;
    };
    return React.createElement('div', {
      className: className,
      children: [
        label && React.createElement('label', {
          key: 'label',
          className: 'block text-sm font-medium text-gray-700 mb-1',
          children: label,
        }),
        React.createElement('input', {
          key: 'input',
          type,
          placeholder,
          value,
          onChange,
          className: 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
        }),
      ],
    });
  },

  // Badge
  Badge: ({ element }) => {
    const { label, variant = 'default', className = '' } = element.props as {
      label?: string;
      variant?: 'default' | 'success' | 'warning' | 'error';
      className?: string;
    };
    const variantClasses = {
      default: 'bg-gray-100 text-gray-800',
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800',
    };
    return React.createElement('span', {
      className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantClasses[variant]} ${className}`.trim(),
      children: label,
    });
  },

  // Alert
  Alert: ({ element }) => {
    const { title, message, variant = 'info', className = '' } = element.props as {
      title?: string;
      message?: string;
      variant?: 'info' | 'success' | 'warning' | 'error';
      className?: string;
    };
    const variantClasses = {
      info: 'bg-blue-50 text-blue-800 border-blue-200',
      success: 'bg-green-50 text-green-800 border-green-200',
      warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
      error: 'bg-red-50 text-red-800 border-red-200',
    };
    return React.createElement('div', {
      className: `border rounded-md p-4 ${variantClasses[variant]} ${className}`.trim(),
      children: [
        title && React.createElement('h4', { key: 'title', className: 'font-medium' }, title),
        message && React.createElement('p', { key: 'message', className: 'mt-1 text-sm' }, message),
      ],
    });
  },

  // Divider
  Divider: ({ element }) => {
    const { className = '' } = element.props as { className?: string };
    return React.createElement('hr', {
      className: `border-t border-gray-200 ${className}`.trim(),
    });
  },

  // Spacer
  Spacer: ({ element }) => {
    const { size = '4' } = element.props as { size?: string };
    return React.createElement('div', { className: `h-${size}` });
  },
};
