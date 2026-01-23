'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Radio = ({ element, onAction }: ComponentRenderProps) => {
  const {
    label,
    name,
    value,
    checked,
    defaultChecked = false,
    required = false,
    disabled = false,
    description,
    error,
    size = 'default',
    style
  } = element.props;

  const [isChecked, setIsChecked] = useState((checked ?? defaultChecked) as boolean);

  const sizeStyles = {
    sm: 'h-3.5 w-3.5',
    default: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  const dotSizeStyles = {
    sm: 'h-1.5 w-1.5',
    default: 'h-2 w-2',
    lg: 'h-2.5 w-2.5',
  };

  const handleChange = () => {
    setIsChecked(true);
    onAction?.({
      name: 'change',
      params: { name, value },
    });
  };

  return (
    <div className="flex items-start" style={style as React.CSSProperties}>
      <div className="relative flex items-center">
        <input
          type="radio"
          name={name as string}
          value={value as string}
          checked={isChecked}
          disabled={disabled as boolean}
          required={required as boolean}
          className="sr-only peer"
          onChange={handleChange}
        />
        <div
          className={cn(
            'flex items-center justify-center rounded-full border border-primary ring-offset-background transition-colors cursor-pointer',
            'peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2',
            'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
            !!(error) && 'border-destructive',
            sizeStyles[(size as keyof typeof sizeStyles) || 'default']
          )}
          onClick={handleChange}
        >
          {isChecked && (
            <div
              className={cn(
                'rounded-full bg-primary',
                dotSizeStyles[(size as keyof typeof dotSizeStyles) || 'default']
              )}
            />
          )}
        </div>
      </div>
      {(label || description) ? (
        <div className="ml-3 flex-1">
          {label ? (
            <label
              className={cn(
                'text-sm font-medium leading-none cursor-pointer',
                !!(disabled) && 'cursor-not-allowed opacity-50'
              )}
              onClick={handleChange}
            >
              {label as string}
              {(required as boolean) && <span className="text-destructive ml-1">*</span>}
            </label>
          ) : null}
          {description ? (
            <p className="text-xs text-muted-foreground mt-1">{description as string}</p>
          ) : null}
        </div>
      ) : null}
      {error ? <p className="text-sm text-destructive ml-3">{error as string}</p> : null}
    </div>
  );
};
