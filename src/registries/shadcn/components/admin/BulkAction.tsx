'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const BulkAction = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    selectedCount = 0,
    actions,
    show = true,
    style
  } = element.props;

  const actionList = actions as Array<{ id: string; label: string; icon?: string; variant?: string }>;

  if (!show || selectedCount === 0) return null;

  return (
    <div
      className={cn(
        'fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-3 bg-background border rounded-full shadow-lg z-50'
      )}
      style={style as React.CSSProperties}
    >
      <span className="text-sm font-medium">{selectedCount} selected</span>

      <div className="h-6 w-px bg-border" />

      <div className="flex items-center gap-2">
        {actionList?.map((action) => (
          <button
            key={action.id}
            onClick={() => onAction?.({ name: action.id })}
            className={cn(
              'px-3 py-1 text-sm rounded transition-colors',
              action.variant === 'destructive'
                ? 'text-destructive hover:bg-destructive/10'
                : 'hover:bg-muted'
            )}
          >
            {action.label}
          </button>
        ))}
        {children}
      </div>

      <button
        onClick={() => onAction?.({ name: 'clearSelection' })}
        className="p-1 hover:bg-muted rounded"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};
