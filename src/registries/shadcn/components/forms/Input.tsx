'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Input = ({ element, onAction }: ComponentRenderProps) => {
  const {
    label,
    placeholder,
    type = 'text',
    value,
    defaultValue,
    name,
    required = false,
    disabled = false,
    readOnly = false,
    error,
    helperText,
    size = 'default',
    style
  } = element.props;

  const sizeStyles = {
    sm: 'h-8 text-xs px-2',
    default: 'h-10 text-sm px-3',
    lg: 'h-12 text-base px-4',
  };

  return (
    <div className="w-full" style={style as React.CSSProperties}>
      {label ? (
        <label className="block text-sm font-medium mb-2">
          {label as string}
          {(required as boolean) && <span className="text-destructive ml-1">*</span>}
        </label>
      ) : null}
      <input
        type={type as string}
        name={name as string}
        placeholder={placeholder as string}
        defaultValue={(value || defaultValue) as string}
        required={required as boolean}
        disabled={disabled as boolean}
        readOnly={readOnly as boolean}
        className={cn(
          'flex w-full rounded-md border border-input bg-background py-2 ring-offset-background',
          'placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          sizeStyles[(size as keyof typeof sizeStyles) || 'default'],
          !!(error) && 'border-destructive focus-visible:ring-destructive'
        )}
        onChange={(e) => {
          onAction?.({
            name: 'change',
            params: { name, value: e.target.value },
          });
        }}
      />
      {(error || helperText) ? (
        <p className={cn('mt-1 text-sm', error ? 'text-destructive' : 'text-muted-foreground')}>
          {(error || helperText) as string}
        </p>
      ) : null}
    </div>
  );
};
