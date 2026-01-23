'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

interface Action {
  id: string;
  label: string;
  icon?: React.ReactNode;
  action?: string;
  variant?: 'default' | 'primary' | 'destructive';
  disabled?: boolean;
}

export const ActionBar = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    actions,
    selectedCount,
    position = 'bottom',
    variant = 'default',
    style
  } = element.props;

  const actionItems = actions as Action[];

  const positions = {
    top: 'fixed top-4 left-1/2 -translate-x-1/2',
    bottom: 'fixed bottom-4 left-1/2 -translate-x-1/2',
  };

  const variants = {
    default: 'bg-background border shadow-lg',
    dark: 'bg-zinc-900 text-white border-zinc-800 shadow-xl',
    glass: 'bg-background/95 backdrop-blur-md border shadow-lg',
  };

  const buttonVariants = {
    default: 'text-foreground hover:bg-muted',
    primary: 'text-primary hover:bg-primary/10',
    destructive: 'text-destructive hover:bg-destructive/10',
  };

  return (
    <div
      className={cn(
        'flex items-center gap-2 px-4 py-2 rounded-lg z-50',
        positions[position as keyof typeof positions] || positions.bottom,
        variants[variant as keyof typeof variants] || variants.default
      )}
      style={style as React.CSSProperties}
      role="toolbar"
    >
      {selectedCount !== undefined && (
        <span className="text-sm font-medium text-muted-foreground px-2">
          {selectedCount as number} selected
        </span>
      )}
      {selectedCount !== undefined && actionItems?.length > 0 && (
        <div className="w-px h-6 bg-border" />
      )}
      {actionItems?.map((action) => (
        <button
          key={action.id}
          onClick={() => {
            if (action.action) {
              onAction?.({ name: action.action, payload: { id: action.id } } as never);
            }
          }}
          disabled={action.disabled}
          className={cn(
            'flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
            buttonVariants[action.variant || 'default'],
            action.disabled && 'opacity-50 pointer-events-none'
          )}
        >
          {action.icon && <span className="w-4 h-4">{action.icon}</span>}
          {action.label}
        </button>
      ))}
      {children}
    </div>
  );
};
