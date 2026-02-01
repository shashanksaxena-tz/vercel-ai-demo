'use client';

/**
 * Registry Context - Provides the active UI registry to all components
 *
 * Supports all 8 UI frameworks with runtime switching:
 * - Shadcn/UI (default)
 * - Material UI
 * - Chakra UI
 * - Ant Design
 * - Tailwind CSS
 * - Flowbite
 * - Magic UI
 * - Aceternity UI
 */

import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import type { UIFramework } from '@/types';
import type { ComponentRegistry } from '@json-render/react';
import {
  getFrameworkRegistry,
  getAllFrameworkRegistries,
  getAvailableFrameworkRegistries,
  isFrameworkAvailable,
  getFrameworkInfo,
  getAllFrameworkInfo,
  type FrameworkInfo,
} from './framework-registry';
import { getThemeTokens, type ThemeTokens } from './theme-tokens';

// Registry definition
export interface RegistryDefinition {
  name: string;
  displayName: string;
  description: string;
  framework: UIFramework;
  components: ComponentRegistry;
  theme: RegistryTheme;
}

// Theme for a registry
export interface RegistryTheme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    muted: string;
    success: string;
    warning: string;
    error: string;
    info: string;
  };
  fonts: {
    heading: string;
    body: string;
    mono: string;
  };
  borderRadius: string;
  shadows: boolean;
}

// Context value type
interface RegistryContextValue {
  // Framework state
  activeFramework: UIFramework;
  setActiveFramework: (framework: UIFramework) => void;

  // Registry access
  activeRegistry: RegistryDefinition | null;
  availableRegistries: RegistryDefinition[];
  allRegistries: RegistryDefinition[];

  // Registry management
  registerRegistry: (registry: RegistryDefinition) => void;
  getRegistry: (framework: UIFramework) => RegistryDefinition | undefined;

  // Theme tokens
  themeTokens: ThemeTokens | null;
  getFrameworkTokens: (framework: UIFramework) => ThemeTokens;

  // Framework info
  frameworkInfo: FrameworkInfo | undefined;
  allFrameworkInfo: FrameworkInfo[];
  isAvailable: (framework: UIFramework) => boolean;

  // Loading state
  isLoading: boolean;
  error: string | null;
}

// Create context
const RegistryContext = createContext<RegistryContextValue | null>(null);

// Provider props
interface RegistryProviderProps {
  children: React.ReactNode;
  defaultFramework?: UIFramework;
  registries?: RegistryDefinition[];
}

// Local storage key for persisting framework selection
const FRAMEWORK_STORAGE_KEY = 'ui-builder-framework';

/**
 * Registry Provider - Manages UI framework registries
 */
export function RegistryProvider({
  children,
  defaultFramework = 'shadcn',
  registries: initialRegistries = [],
}: RegistryProviderProps) {
  // Initialize framework from local storage or default
  const [activeFramework, setActiveFrameworkState] = useState<UIFramework>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(FRAMEWORK_STORAGE_KEY);
      if (stored && isFrameworkAvailable(stored as UIFramework)) {
        return stored as UIFramework;
      }
    }
    return defaultFramework;
  });

  const [customRegistries, setCustomRegistries] = useState<Map<UIFramework, RegistryDefinition>>(
    () => new Map(initialRegistries.map((r) => [r.framework, r]))
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Persist framework selection
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(FRAMEWORK_STORAGE_KEY, activeFramework);
    }
  }, [activeFramework]);

  // Set active framework with validation
  const setActiveFramework = useCallback((framework: UIFramework) => {
    setIsLoading(true);
    setError(null);

    try {
      // Validate framework
      if (!getFrameworkInfo(framework)) {
        throw new Error(`Unknown framework: ${framework}`);
      }

      setActiveFrameworkState(framework);

      // Dispatch custom event for components that need to react to framework changes
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('framework-change', {
            detail: { framework },
          })
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to switch framework');
      console.error('Failed to switch framework:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Register a custom registry
  const registerRegistry = useCallback((registry: RegistryDefinition) => {
    setCustomRegistries((prev) => {
      const next = new Map(prev);
      next.set(registry.framework, registry);
      return next;
    });
  }, []);

  // Get a specific registry
  const getRegistry = useCallback(
    (framework: UIFramework) => {
      // Check custom registries first
      if (customRegistries.has(framework)) {
        return customRegistries.get(framework);
      }
      // Fall back to built-in registries
      return getFrameworkRegistry(framework);
    },
    [customRegistries]
  );

  // Get active registry
  const activeRegistry = useMemo(() => {
    return getRegistry(activeFramework) || null;
  }, [getRegistry, activeFramework]);

  // Get all available registries (implemented frameworks only)
  const availableRegistries = useMemo(() => {
    const builtIn = getAvailableFrameworkRegistries();
    const custom = Array.from(customRegistries.values()).filter(
      (r) => !builtIn.some((b) => b.framework === r.framework)
    );
    return [...builtIn, ...custom];
  }, [customRegistries]);

  // Get all registries (including unavailable ones)
  const allRegistries = useMemo(() => {
    const builtIn = getAllFrameworkRegistries();
    const custom = Array.from(customRegistries.values()).filter(
      (r) => !builtIn.some((b) => b.framework === r.framework)
    );
    return [...builtIn, ...custom];
  }, [customRegistries]);

  // Get theme tokens for active framework
  const themeTokens = useMemo(() => {
    return getThemeTokens(activeFramework);
  }, [activeFramework]);

  // Get framework info for active framework
  const frameworkInfo = useMemo(() => {
    return getFrameworkInfo(activeFramework);
  }, [activeFramework]);

  // Context value
  const value = useMemo<RegistryContextValue>(
    () => ({
      // Framework state
      activeFramework,
      setActiveFramework,

      // Registry access
      activeRegistry,
      availableRegistries,
      allRegistries,

      // Registry management
      registerRegistry,
      getRegistry,

      // Theme tokens
      themeTokens,
      getFrameworkTokens: getThemeTokens,

      // Framework info
      frameworkInfo,
      allFrameworkInfo: getAllFrameworkInfo(),
      isAvailable: isFrameworkAvailable,

      // Loading state
      isLoading,
      error,
    }),
    [
      activeFramework,
      setActiveFramework,
      activeRegistry,
      availableRegistries,
      allRegistries,
      registerRegistry,
      getRegistry,
      themeTokens,
      frameworkInfo,
      isLoading,
      error,
    ]
  );

  return <RegistryContext.Provider value={value}>{children}</RegistryContext.Provider>;
}

/**
 * Hook to access registry context
 */
export function useRegistry(): RegistryContextValue {
  const context = useContext(RegistryContext);
  if (!context) {
    throw new Error('useRegistry must be used within a RegistryProvider');
  }
  return context;
}

/**
 * Hook to get the active component registry
 */
export function useActiveComponents(): ComponentRegistry | null {
  const { activeRegistry } = useRegistry();
  return activeRegistry?.components || null;
}

/**
 * Hook to get the active theme
 */
export function useActiveTheme(): RegistryTheme | null {
  const { activeRegistry } = useRegistry();
  return activeRegistry?.theme || null;
}

/**
 * Hook to get theme tokens for the active framework
 */
export function useThemeTokens(): ThemeTokens | null {
  const { themeTokens } = useRegistry();
  return themeTokens;
}

/**
 * Hook to listen for framework changes
 */
export function useFrameworkChangeListener(
  callback: (framework: UIFramework) => void
): void {
  useEffect(() => {
    const handler = (event: CustomEvent<{ framework: UIFramework }>) => {
      callback(event.detail.framework);
    };

    window.addEventListener('framework-change', handler as EventListener);
    return () => {
      window.removeEventListener('framework-change', handler as EventListener);
    };
  }, [callback]);
}
