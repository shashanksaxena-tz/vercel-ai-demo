'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const InputGroup = ({ element, children }: ComponentRenderProps) => {
  const {
    label,
    required = false,
    disabled = false,
    error,
    helperText,
    size = 'default',
    style
  } = element.props;

  const sizeStyles = {
    sm: '[&_input]:h-8 [&_button]:h-8 [&_.addon]:h-8',
    default: '[&_input]:h-10 [&_button]:h-10 [&_.addon]:h-10',
    lg: '[&_input]:h-12 [&_button]:h-12 [&_.addon]:h-12',
  };

  return (
    <div className="w-full" style={style as React.CSSProperties}>
      {label ? (
        <label className="block text-sm font-medium mb-2">
          {label as string}
          {(required as boolean) && <span className="text-destructive ml-1">*</span>}
        </label>
      ) : null}
      <div
        className={cn(
          'flex',
          sizeStyles[(size as keyof typeof sizeStyles) || 'default'],
          '[&>*:first-child]:rounded-r-none',
          '[&>*:last-child]:rounded-l-none',
          '[&>*:not(:first-child):not(:last-child)]:rounded-none',
          '[&>*:not(:first-child)]:border-l-0',
          !!(disabled) && 'opacity-50 pointer-events-none',
          !!(error) && '[&_input]:border-destructive [&_.addon]:border-destructive'
        )}
      >
        {children}
      </div>
      {(error || helperText) ? (
        <p className={cn('mt-1 text-sm', error ? 'text-destructive' : 'text-muted-foreground')}>
          {(error || helperText) as string}
        </p>
      ) : null}
    </div>
  );
};
