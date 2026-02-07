/**
 * Framework Registry Factory
 *
 * Creates and manages framework-specific registries.
 * Supports all 8 UI frameworks with lazy loading capabilities.
 *
 * Namespace Support:
 * - core::ComponentName - Static framework components (78 components)
 * - mcp::ComponentName - Dynamically discovered MCP components
 * - ComponentName (no namespace) - Defaults to core::ComponentName
 */

import type { UIFramework } from '@/types';
import type { RegistryDefinition, RegistryTheme } from './registry-context';
import type { ComponentRegistry } from '@json-render/react';
import { getThemeTokens, type ThemeTokens } from './theme-tokens';
import { createPlaceholderRegistry } from './placeholder-components';

// Import framework registries
import { shadcnRegistry } from '@/components/registries/shadcn/registry';
import { muiRegistry } from '@/components/registries/mui/registry';
import { chakraRegistry } from '@/components/registries/chakra/registry';
import { tailwindRegistry } from '@/components/registries/tailwind/registry';
import { flowbiteRegistry } from '@/components/registries/flowbite/registry';
import { magicUIRegistry } from '@/components/registries/magic-ui/registry';
import { aceternityRegistry } from '@/components/registries/aceternity/registry';

// MCP component metadata type
export interface MCPComponentMetadata {
  name: string;
  description: string;
  props?: Record<string, {
    type: string;
    description?: string;
    required?: boolean;
    default?: any;
  }>;
  source: string;
  examples?: string[];
  // Component renderer function
  renderer?: React.ComponentType<any>;
}

// Framework metadata for display
export interface FrameworkInfo {
  id: UIFramework;
  name: string;
  displayName: string;
  description: string;
  icon: string;
  color: string;
  website: string;
  isAvailable: boolean;
  isDarkMode: boolean;
}

// All supported frameworks with metadata
export const frameworkInfoRegistry: Record<UIFramework, FrameworkInfo> = {
  shadcn: {
    id: 'shadcn',
    name: 'shadcn',
    displayName: 'Shadcn/UI',
    description: 'Beautiful components built with Radix UI and Tailwind CSS',
    icon: 'square',
    color: '#000000',
    website: 'https://ui.shadcn.com',
    isAvailable: true,
    isDarkMode: false,
  },
  mui: {
    id: 'mui',
    name: 'mui',
    displayName: 'Material UI',
    description: 'React components based on Google Material Design',
    icon: 'layers',
    color: '#1976d2',
    website: 'https://mui.com',
    isAvailable: true,
    isDarkMode: false,
  },
  chakra: {
    id: 'chakra',
    name: 'chakra',
    displayName: 'Chakra UI',
    description: 'Simple, modular and accessible component library',
    icon: 'zap',
    color: '#319795',
    website: 'https://chakra-ui.com',
    isAvailable: true,
    isDarkMode: false,
  },
  antd: {
    id: 'antd',
    name: 'antd',
    displayName: 'Ant Design',
    description: 'Enterprise-class UI design language and React library',
    icon: 'layout',
    color: '#1890ff',
    website: 'https://ant.design',
    isAvailable: false, // Will be implemented in Task 3.3
    isDarkMode: false,
  },
  tailwind: {
    id: 'tailwind',
    name: 'tailwind',
    displayName: 'Tailwind CSS',
    description: 'Utility-first CSS framework with pure Tailwind components',
    icon: 'wind',
    color: '#38bdf8',
    website: 'https://tailwindcss.com',
    isAvailable: true,
    isDarkMode: false,
  },
  flowbite: {
    id: 'flowbite',
    name: 'flowbite',
    displayName: 'Flowbite',
    description: 'Tailwind CSS component library with modern design',
    icon: 'flower',
    color: '#1d4ed8',
    website: 'https://flowbite.com',
    isAvailable: true,
    isDarkMode: false,
  },
  'magic-ui': {
    id: 'magic-ui',
    name: 'magic-ui',
    displayName: 'Magic UI',
    description: 'Animated, gradient-rich components for landing pages',
    icon: 'sparkles',
    color: '#6366f1',
    website: 'https://magicui.design',
    isAvailable: true,
    isDarkMode: true,
  },
  aceternity: {
    id: 'aceternity',
    name: 'aceternity',
    displayName: 'Aceternity UI',
    description: 'Modern dark-mode components with stunning animations',
    icon: 'moon',
    color: '#8b5cf6',
    website: 'https://ui.aceternity.com',
    isAvailable: true,
    isDarkMode: true,
  },
};

// Convert ThemeTokens to RegistryTheme
function tokensToTheme(tokens: ThemeTokens): RegistryTheme {
  return {
    name: tokens.name,
    colors: {
      primary: tokens.colors.primary,
      secondary: tokens.colors.secondary,
      accent: tokens.colors.accent,
      background: tokens.colors.background,
      foreground: tokens.colors.foreground,
      muted: tokens.colors.muted,
      success: tokens.colors.success,
      warning: tokens.colors.warning,
      error: tokens.colors.error,
      info: tokens.colors.info,
    },
    fonts: {
      heading: tokens.typography.fontFamily.sans,
      body: tokens.typography.fontFamily.sans,
      mono: tokens.typography.fontFamily.mono,
    },
    borderRadius: tokens.borderRadius.lg,
    shadows: tokens.shadows.md !== 'none',
  };
}

// Create placeholder registry definition
function createPlaceholderRegistryDefinition(framework: UIFramework): RegistryDefinition {
  const info = frameworkInfoRegistry[framework];
  const tokens = getThemeTokens(framework);

  return {
    name: info.name,
    displayName: info.displayName,
    description: info.description,
    framework,
    components: createPlaceholderRegistry(framework, info),
    theme: tokensToTheme(tokens),
  };
}

// Registry cache
// Note: In development, Next.js Fast Refresh will naturally reload this module
// and recreate the Map, so no manual cache clearing is needed
const registryCache = new Map<UIFramework, RegistryDefinition>();

/**
 * Get the component registry for a specific framework
 */
export function getFrameworkRegistry(framework: UIFramework): RegistryDefinition {
  // Check cache first
  if (registryCache.has(framework)) {
    return registryCache.get(framework)!;
  }

  let registry: RegistryDefinition;

  // Get the appropriate registry
  switch (framework) {
    case 'shadcn':
      registry = shadcnRegistry;
      break;
    case 'mui':
      registry = muiRegistry;
      break;
    case 'chakra':
      registry = chakraRegistry;
      break;
    case 'tailwind':
      registry = tailwindRegistry;
      break;
    case 'flowbite':
      registry = flowbiteRegistry;
      break;
    case 'magic-ui':
      registry = magicUIRegistry;
      break;
    case 'aceternity':
      registry = aceternityRegistry;
      break;
    case 'antd':
      // Will be implemented in a future task
      // For now, return a placeholder registry
      registry = createPlaceholderRegistryDefinition(framework);
      break;
    default:
      // Fallback to shadcn
      console.warn(`Unknown framework: ${framework}, falling back to shadcn`);
      registry = shadcnRegistry;
  }

  // Apply core:: namespace to all components
  // This ensures components work with both "Column" and "core::Column" references
  const namespacedComponents = namespaceRegistry(registry.components, 'core');

  const namespacedRegistry = {
    ...registry,
    components: namespacedComponents,
  };

  // Cache the namespaced registry
  registryCache.set(framework, namespacedRegistry);

  return namespacedRegistry;
}

/**
 * Get all available framework registries
 */
export function getAllFrameworkRegistries(): RegistryDefinition[] {
  const frameworks: UIFramework[] = [
    'shadcn',
    'mui',
    'chakra',
    'antd',
    'tailwind',
    'flowbite',
    'magic-ui',
    'aceternity',
  ];

  return frameworks.map((framework) => getFrameworkRegistry(framework));
}

/**
 * Get all available (implemented) framework registries
 */
export function getAvailableFrameworkRegistries(): RegistryDefinition[] {
  return Object.entries(frameworkInfoRegistry)
    .filter(([_, info]) => info.isAvailable)
    .map(([framework]) => getFrameworkRegistry(framework as UIFramework));
}

/**
 * Check if a framework is available
 */
export function isFrameworkAvailable(framework: UIFramework): boolean {
  return frameworkInfoRegistry[framework]?.isAvailable ?? false;
}

/**
 * Get framework info
 */
export function getFrameworkInfo(framework: UIFramework): FrameworkInfo | undefined {
  return frameworkInfoRegistry[framework];
}

/**
 * Get all framework info
 */
export function getAllFrameworkInfo(): FrameworkInfo[] {
  return Object.values(frameworkInfoRegistry);
}

/**
 * Clear the registry cache (useful for hot reloading)
 */
export function clearRegistryCache(): void {
  registryCache.clear();
}

/**
 * Preload all available registries
 */
export function preloadRegistries(): void {
  Object.keys(frameworkInfoRegistry).forEach((framework) => {
    getFrameworkRegistry(framework as UIFramework);
  });
}

/**
 * Parse namespaced component type
 * Examples:
 * - "Button" -> { namespace: "core", component: "Button" }
 * - "core::Button" -> { namespace: "core", component: "Button" }
 * - "mcp::ShimmerButton" -> { namespace: "mcp", component: "ShimmerButton" }
 */
export function parseComponentType(type: string): { namespace: string; component: string } {
  const parts = type.split('::');

  if (parts.length === 1) {
    // No namespace, default to core
    return { namespace: 'core', component: parts[0] };
  }

  if (parts.length === 2) {
    return { namespace: parts[0], component: parts[1] };
  }

  // Invalid format, default to core
  console.warn(`Invalid component type format: ${type}, defaulting to core`);
  return { namespace: 'core', component: type };
}

/**
 * Format component type with namespace
 * Examples:
 * - formatComponentType("Button", "core") -> "core::Button"
 * - formatComponentType("ShimmerButton", "mcp") -> "mcp::ShimmerButton"
 */
export function formatComponentType(component: string, namespace: string = 'core'): string {
  return `${namespace}::${component}`;
}

/**
 * Add namespace prefix to all components in a registry
 * Converts { Button: Component } to { "core::Button": Component }
 */
function namespaceRegistry(
  registry: ComponentRegistry,
  namespace: string = 'core'
): ComponentRegistry {
  const namespacedRegistry: ComponentRegistry = {};

  for (const [key, component] of Object.entries(registry)) {
    // Add both namespaced and non-namespaced versions for backward compatibility
    const namespacedKey = formatComponentType(key, namespace);
    namespacedRegistry[namespacedKey] = component;

    // Only add non-namespaced version for core components
    if (namespace === 'core') {
      namespacedRegistry[key] = component;
    }
  }

  return namespacedRegistry;
}

/**
 * Convert MCP component metadata to ComponentRegistry entries
 */
function mcpMetadataToRegistry(components: MCPComponentMetadata[]): ComponentRegistry {
  const registry: ComponentRegistry = {};

  for (const component of components) {
    if (component.renderer) {
      // Use mcp:: namespace for all MCP components
      const namespacedKey = formatComponentType(component.name, 'mcp');
      registry[namespacedKey] = component.renderer;
    }
  }

  return registry;
}

/**
 * Merge MCP components into a framework registry
 *
 * @param baseRegistry - The base framework registry
 * @param mcpComponents - MCP component metadata to merge
 * @returns Enhanced registry with both core and MCP components
 *
 * Example usage:
 * ```ts
 * const shadcnWithMCP = mergeRegistry(shadcnRegistry, mcpComponents);
 * // Result includes:
 * // - core::Button (static shadcn)
 * // - mcp::ShimmerButton (dynamic MCP)
 * // - Button (alias to core::Button for backward compatibility)
 * ```
 */
export function mergeRegistry(
  baseRegistry: RegistryDefinition,
  mcpComponents: MCPComponentMetadata[] = []
): RegistryDefinition {
  // Namespace the core registry components
  const namespacedCore = namespaceRegistry(baseRegistry.components, 'core');

  // Convert MCP metadata to registry with mcp:: namespace
  const mcpRegistry = mcpMetadataToRegistry(mcpComponents);

  // Merge registries - MCP components cannot override core components
  const mergedComponents: ComponentRegistry = {
    ...namespacedCore,
    ...mcpRegistry,
  };

  return {
    ...baseRegistry,
    components: mergedComponents,
  };
}

/**
 * Get framework registry with optional MCP components merged
 *
 * @param framework - The UI framework
 * @param mcpComponents - Optional MCP components to merge
 * @returns Registry with core and optionally MCP components
 */
export function getFrameworkRegistryWithMCP(
  framework: UIFramework,
  mcpComponents: MCPComponentMetadata[] = []
): RegistryDefinition {
  const baseRegistry = getFrameworkRegistry(framework);

  if (mcpComponents.length === 0) {
    // No MCP components, just namespace the core registry
    return {
      ...baseRegistry,
      components: namespaceRegistry(baseRegistry.components, 'core'),
    };
  }

  return mergeRegistry(baseRegistry, mcpComponents);
}
