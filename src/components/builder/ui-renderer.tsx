'use client';

/**
 * UI Renderer - Renders json-render trees using the active registry or a custom registry
 * with Framer Motion animation support for Magic UI and Aceternity UI components
 */

import * as React from 'react';
import { Renderer, DataProvider, ActionProvider, VisibilityProvider } from '@json-render/react';
import type { UITree } from '@json-render/core';
import type { ComponentRegistry } from '@json-render/react';
import { useRegistry } from '@/lib/registry';
import { LazyMotion, domAnimation, AnimatePresence } from 'framer-motion';

interface UIRendererProps {
  tree: UITree | null;
  data?: Record<string, unknown>;
  onAction?: (action: string, params?: Record<string, unknown>) => void;
  className?: string;
  /** Optional custom registry to use instead of the active framework registry */
  customRegistry?: ComponentRegistry;
}

export function UIRenderer({ tree, data = {}, onAction, className, customRegistry }: UIRendererProps) {
  const { activeRegistry } = useRegistry();

  // Use custom registry if provided, otherwise use active framework registry
  const registry = customRegistry || activeRegistry?.components;

  // Create action handlers object for the ActionProvider
  // IMPORTANT: This hook must be called before any conditional returns to maintain hook order
  const actionHandlers = React.useMemo(() => {
    return {
      default: async (params: Record<string, unknown>) => {
        const action = (params.action as string) || 'default';
        console.log('Action triggered:', action, params);
        onAction?.(action, params);
      },
    };
  }, [onAction]);

  if (!tree) {
    return (
      <div className={`flex items-center justify-center h-64 text-muted-foreground ${className}`}>
        <p>No UI to render. Try selecting a test case or generating a new UI.</p>
      </div>
    );
  }

  if (!registry) {
    return (
      <div className={`flex items-center justify-center h-64 text-muted-foreground ${className}`}>
        <p>No registry available. Please select a UI framework or provide a custom registry.</p>
      </div>
    );
  }

  return (
    <LazyMotion features={domAnimation} strict>
      <AnimatePresence mode="wait">
        <DataProvider initialData={data}>
          <VisibilityProvider>
            <ActionProvider handlers={actionHandlers}>
              <div className={className}>
                <Renderer
                  tree={tree}
                  registry={registry}
                />
              </div>
            </ActionProvider>
          </VisibilityProvider>
        </DataProvider>
      </AnimatePresence>
    </LazyMotion>
  );
}

export default UIRenderer;
