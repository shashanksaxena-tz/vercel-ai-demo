/**
 * Framework Registry Factory
 *
 * Creates and manages framework-specific registries.
 * Supports all 8 UI frameworks with lazy loading capabilities.
 */

import type { UIFramework } from '@/types';
import type { RegistryDefinition, RegistryTheme } from './registry-context';
import { getThemeTokens, type ThemeTokens } from './theme-tokens';
import { createPlaceholderRegistry } from './placeholder-components';

// Import framework registries
import { shadcnRegistry } from '@/components/registries/shadcn/registry';
import { muiRegistry } from '@/components/registries/mui/registry';
import { chakraRegistry } from '@/components/registries/chakra/registry';
import { tailwindRegistry } from '@/components/registries/tailwind/registry';
import { flowbiteRegistry } from '@/components/registries/flowbite/registry';

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
    isAvailable: false, // Will be implemented in Task 3.4
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
    isAvailable: false, // Will be implemented in Task 3.4
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
    case 'antd':
    case 'magic-ui':
    case 'aceternity':
      // These will be implemented in future tasks
      // For now, return a placeholder registry
      registry = createPlaceholderRegistryDefinition(framework);
      break;
    default:
      // Fallback to shadcn
      console.warn(`Unknown framework: ${framework}, falling back to shadcn`);
      registry = shadcnRegistry;
  }

  // Cache the registry
  registryCache.set(framework, registry);

  return registry;
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
