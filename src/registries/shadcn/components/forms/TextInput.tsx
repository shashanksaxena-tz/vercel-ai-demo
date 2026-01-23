'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const TextInput = ({ element, onAction }: ComponentRenderProps) => {
  const {
    label,
    placeholder,
    value,
    defaultValue,
    name,
    required = false,
    disabled = false,
    readOnly = false,
    maxLength,
    minLength,
    pattern,
    error,
    helperText,
    prefix,
    suffix,
    style
  } = element.props;

  return (
    <div className="w-full" style={style as React.CSSProperties}>
      {label ? (
        <label className="block text-sm font-medium mb-2">
          {label as string}
          {(required as boolean) && <span className="text-destructive ml-1">*</span>}
        </label>
      ) : null}
      <div className="relative flex items-center">
        {prefix ? (
          <span className="absolute left-3 text-muted-foreground text-sm">{prefix as string}</span>
        ) : null}
        <input
          type="text"
          name={name as string}
          placeholder={placeholder as string}
          defaultValue={(value || defaultValue) as string}
          required={required as boolean}
          disabled={disabled as boolean}
          readOnly={readOnly as boolean}
          maxLength={maxLength as number}
          minLength={minLength as number}
          pattern={pattern as string}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background',
            'placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            !!(prefix) && 'pl-8',
            !!(suffix) && 'pr-8',
            !!(error) && 'border-destructive focus-visible:ring-destructive'
          )}
          onChange={(e) => {
            onAction?.({
              name: 'change',
              params: { name, value: e.target.value },
            });
          }}
        />
        {suffix ? (
          <span className="absolute right-3 text-muted-foreground text-sm">{suffix as string}</span>
        ) : null}
      </div>
      {(error || helperText) ? (
        <p className={cn('mt-1 text-sm', error ? 'text-destructive' : 'text-muted-foreground')}>
          {(error || helperText) as string}
        </p>
      ) : null}
    </div>
  );
};
