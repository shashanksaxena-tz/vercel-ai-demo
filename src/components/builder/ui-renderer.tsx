'use client';

/**
 * UI Renderer - Renders json-render trees using the active registry
 */

import * as React from 'react';
import { Renderer, DataProvider, ActionProvider } from '@json-render/react';
import type { UITree } from '@json-render/core';
import { useRegistry } from '@/lib/registry';

interface UIRendererProps {
  tree: UITree | null;
  data?: Record<string, unknown>;
  onAction?: (action: string, params?: Record<string, unknown>) => void;
  className?: string;
}

export function UIRenderer({ tree, data = {}, onAction, className }: UIRendererProps) {
  const { activeRegistry } = useRegistry();

  if (!tree) {
    return (
      <div className={`flex items-center justify-center h-64 text-muted-foreground ${className}`}>
        <p>No UI to render. Try selecting a test case or generating a new UI.</p>
      </div>
    );
  }

  if (!activeRegistry) {
    return (
      <div className={`flex items-center justify-center h-64 text-muted-foreground ${className}`}>
        <p>No registry selected. Please select a UI framework.</p>
      </div>
    );
  }

  // Create action handlers object for the ActionProvider
  const actionHandlers = React.useMemo(() => {
    return {
      default: async (params: Record<string, unknown>) => {
        const action = (params.action as string) || 'default';
        console.log('Action triggered:', action, params);
        onAction?.(action, params);
      },
    };
  }, [onAction]);

  return (
    <DataProvider initialData={data}>
      <ActionProvider handlers={actionHandlers}>
        <div className={className}>
          <Renderer
            tree={tree}
            registry={activeRegistry.components}
          />
        </div>
      </ActionProvider>
    </DataProvider>
  );
}

export default UIRenderer;
