'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const PermissionToggle = ({ element, onAction }: ComponentRenderProps) => {
  const {
    id,
    label,
    description,
    enabled = false,
    disabled = false,
    style
  } = element.props;

  return (
    <div
      className={cn(
        'flex items-center justify-between p-3 border rounded-lg',
        disabled && 'opacity-50'
      )}
      style={style as React.CSSProperties}
    >
      <div>
        <p className="font-medium text-sm">{label as string}</p>
        {description && (
          <p className="text-xs text-muted-foreground">{description as string}</p>
        )}
      </div>
      <button
        onClick={() => !disabled && onAction?.({ name: 'togglePermission', payload: { id, enabled: !enabled } })}
        disabled={disabled as boolean}
        className={cn(
          'relative w-11 h-6 rounded-full transition-colors',
          enabled ? 'bg-primary' : 'bg-muted',
          disabled && 'cursor-not-allowed'
        )}
      >
        <span
          className={cn(
            'absolute top-1 w-4 h-4 bg-white rounded-full transition-transform',
            enabled ? 'left-6' : 'left-1'
          )}
        />
      </button>
    </div>
  );
};
