'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Eye, EyeOff, Lock } from 'lucide-react';

export const PasswordInput = ({ element, onAction }: ComponentRenderProps) => {
  const {
    label,
    placeholder = 'Enter password',
    value,
    defaultValue,
    name,
    required = false,
    disabled = false,
    error,
    helperText,
    showIcon = true,
    showToggle = true,
    minLength,
    maxLength,
    style
  } = element.props;

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full" style={style as React.CSSProperties}>
      {label ? (
        <label className="block text-sm font-medium mb-2">
          {label as string}
          {(required as boolean) && <span className="text-destructive ml-1">*</span>}
        </label>
      ) : null}
      <div className="relative">
        {showIcon ? (
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        ) : null}
        <input
          type={showPassword ? 'text' : 'password'}
          name={name as string}
          placeholder={placeholder as string}
          defaultValue={(value || defaultValue) as string}
          required={required as boolean}
          disabled={disabled as boolean}
          minLength={minLength as number}
          maxLength={maxLength as number}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background',
            'placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            !!(showIcon) && 'pl-10',
            !!(showToggle) && 'pr-10',
            !!(error) && 'border-destructive focus-visible:ring-destructive'
          )}
          onChange={(e) => {
            onAction?.({
              name: 'change',
              params: { name, value: e.target.value },
            });
          }}
        />
        {showToggle ? (
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
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
