'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Command = ({ element, onAction }: ComponentRenderProps) => {
  const {
    icon,
    label,
    shortcut,
    description,
    disabled = false,
    style
  } = element.props;

  return (
    <button
      onClick={() => !disabled && onAction?.({ name: 'execute', payload: { label } })}
      disabled={disabled as boolean}
      className={cn(
        'w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted text-left transition-colors',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
      style={style as React.CSSProperties}
    >
      {icon && (
        <div className="w-8 h-8 rounded bg-muted flex items-center justify-center flex-shrink-0">
          {icon as React.ReactNode}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="font-medium">{label as string}</p>
        {description && <p className="text-sm text-muted-foreground truncate">{description as string}</p>}
      </div>
      {shortcut && (
        <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono text-muted-foreground">
          {shortcut as string}
        </kbd>
      )}
    </button>
  );
};
