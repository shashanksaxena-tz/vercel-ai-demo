'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Link } from 'lucide-react';

export const UrlInput = ({ element, onAction }: ComponentRenderProps) => {
  const {
    label,
    placeholder = 'https://example.com',
    value,
    defaultValue,
    name,
    required = false,
    disabled = false,
    readOnly = false,
    error,
    helperText,
    showIcon = true,
    showProtocol = true,
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
        {showIcon ? (
          <Link className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        ) : null}
        {showProtocol ? (
          <span className={cn(
            'absolute top-1/2 -translate-y-1/2 text-sm text-muted-foreground',
            showIcon ? 'left-10' : 'left-3'
          )}>
            https://
          </span>
        ) : null}
        <input
          type="url"
          name={name as string}
          placeholder={placeholder as string}
          defaultValue={(value || defaultValue) as string}
          required={required as boolean}
          disabled={disabled as boolean}
          readOnly={readOnly as boolean}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background',
            'placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            !!(showIcon) && 'pl-10',
            !!(showProtocol) && (showIcon ? 'pl-[4.5rem]' : 'pl-14'),
            !!(error) && 'border-destructive focus-visible:ring-destructive'
          )}
          onChange={(e) => {
            onAction?.({
              name: 'change',
              params: { name, value: e.target.value },
            });
          }}
        />
      </div>
      {(error || helperText) ? (
        <p className={cn('mt-1 text-sm', error ? 'text-destructive' : 'text-muted-foreground')}>
          {(error || helperText) as string}
        </p>
      ) : null}
    </div>
  );
};
