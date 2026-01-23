'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const FormField = ({ element, children }: ComponentRenderProps) => {
  const {
    label,
    name,
    required = false,
    error,
    helperText,
    layout = 'vertical',
    labelWidth,
    style
  } = element.props;

  if (layout === 'horizontal') {
    return (
      <div
        className="flex items-start gap-4"
        style={style as React.CSSProperties}
      >
        {label ? (
          <label
            htmlFor={name as string}
            className={cn(
              'text-sm font-medium pt-2 shrink-0',
              labelWidth ? '' : 'w-1/4'
            )}
            style={labelWidth ? { width: labelWidth as string } : undefined}
          >
            {label as string}
            {(required as boolean) && <span className="text-destructive ml-1">*</span>}
          </label>
        ) : null}
        <div className="flex-1">
          {children}
          {(error || helperText) ? (
            <p className={cn('mt-1 text-sm', error ? 'text-destructive' : 'text-muted-foreground')}>
              {(error || helperText) as string}
            </p>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full" style={style as React.CSSProperties}>
      {label ? (
        <label
          htmlFor={name as string}
          className="block text-sm font-medium mb-2"
        >
          {label as string}
          {(required as boolean) && <span className="text-destructive ml-1">*</span>}
        </label>
      ) : null}
      {children}
      {(error || helperText) ? (
        <p className={cn('mt-1 text-sm', error ? 'text-destructive' : 'text-muted-foreground')}>
          {(error || helperText) as string}
        </p>
      ) : null}
    </div>
  );
};
