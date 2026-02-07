'use client';

import React from 'react';
import type { ComponentRenderProps } from '@json-render/react';

export function UnresolvedBlock({ element }: ComponentRenderProps) {
  const { type, props } = element;
  const componentName = type.replace('mcp::', '');

  return (
    <div className="relative rounded-lg border-2 border-dashed border-purple-400/50 bg-purple-950/20 p-4">
      <div className="mb-2 flex items-center gap-2">
        <span className="rounded bg-purple-600/20 px-2 py-0.5 text-xs font-medium text-purple-300">
          MCP Component
        </span>
        <span className="text-sm font-semibold text-purple-200">{componentName}</span>
      </div>
      {(props as any)?.description && (
        <p className="text-xs text-purple-300/70">{(props as any).description}</p>
      )}
      <p className="mt-2 text-xs text-purple-400/50">
        No preview available — will render correctly in exported code
      </p>
    </div>
  );
}
