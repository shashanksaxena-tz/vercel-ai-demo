'use client';

/**
 * Registry Context - Provides the active UI registry to all components
 */

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { UIFramework } from '@/types';
import type { ComponentRegistry } from '@json-render/react';

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
  activeFramework: UIFramework;
  setActiveFramework: (framework: UIFramework) => void;
  activeRegistry: RegistryDefinition | null;
  availableRegistries: RegistryDefinition[];
  registerRegistry: (registry: RegistryDefinition) => void;
  getRegistry: (framework: UIFramework) => RegistryDefinition | undefined;
}

// Create context
const RegistryContext = createContext<RegistryContextValue | null>(null);

// Provider props
interface RegistryProviderProps {
  children: React.ReactNode;
  defaultFramework?: UIFramework;
  registries?: RegistryDefinition[];
}

/**
 * Registry Provider - Manages UI framework registries
 */
export function RegistryProvider({
  children,
  defaultFramework = 'shadcn',
  registries: initialRegistries = [],
}: RegistryProviderProps) {
  const [activeFramework, setActiveFramework] = useState<UIFramework>(defaultFramework);
  const [registries, setRegistries] = useState<Map<UIFramework, RegistryDefinition>>(
    () => new Map(initialRegistries.map(r => [r.framework, r]))
  );

  const registerRegistry = useCallback((registry: RegistryDefinition) => {
    setRegistries(prev => {
      const next = new Map(prev);
      next.set(registry.framework, registry);
      return next;
    });
  }, []);

  const getRegistry = useCallback((framework: UIFramework) => {
    return registries.get(framework);
  }, [registries]);

  const activeRegistry = useMemo(() => {
    return registries.get(activeFramework) || null;
  }, [registries, activeFramework]);

  const availableRegistries = useMemo(() => {
    return Array.from(registries.values());
  }, [registries]);

  const value = useMemo(() => ({
    activeFramework,
    setActiveFramework,
    activeRegistry,
    availableRegistries,
    registerRegistry,
    getRegistry,
  }), [activeFramework, activeRegistry, availableRegistries, registerRegistry, getRegistry]);

  return (
    <RegistryContext.Provider value={value}>
      {children}
    </RegistryContext.Provider>
  );
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
