'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Switch = ({ element, onAction }: ComponentRenderProps) => {
  const {
    label,
    name,
    checked,
    defaultChecked = false,
    required = false,
    disabled = false,
    description,
    error,
    size = 'default',
    labelPosition = 'right',
    style
  } = element.props;

  const [isChecked, setIsChecked] = useState((checked ?? defaultChecked) as boolean);

  const sizeStyles = {
    sm: { track: 'h-4 w-7', thumb: 'h-3 w-3', translate: 'translate-x-3' },
    default: { track: 'h-5 w-9', thumb: 'h-4 w-4', translate: 'translate-x-4' },
    lg: { track: 'h-6 w-11', thumb: 'h-5 w-5', translate: 'translate-x-5' },
  };

  const currentSize = sizeStyles[(size as keyof typeof sizeStyles) || 'default'];

  const handleChange = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    onAction?.({
      name: 'change',
      params: { name, value: newValue },
    });
  };

  const labelContent = (label || description) ? (
    <div className={cn(labelPosition === 'left' ? 'mr-3' : 'ml-3', 'flex-1')}>
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
  ) : null;

  return (
    <div className="w-full" style={style as React.CSSProperties}>
      <div className={cn('flex items-start', labelPosition === 'left' && 'flex-row-reverse justify-end')}>
        {labelContent}
        <div className="relative flex items-center">
          <input
            type="checkbox"
            name={name as string}
            checked={isChecked}
            disabled={disabled as boolean}
            className="sr-only peer"
            onChange={handleChange}
          />
          <div
            className={cn(
              'rounded-full transition-colors cursor-pointer',
              'peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background',
              'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
              isChecked ? 'bg-primary' : 'bg-input',
              currentSize.track
            )}
            onClick={handleChange}
          >
            <div
              className={cn(
                'rounded-full bg-background shadow-sm transition-transform',
                currentSize.thumb,
                isChecked ? currentSize.translate : 'translate-x-0.5',
                'mt-0.5'
              )}
            />
          </div>
        </div>
      </div>
      {error ? <p className="text-sm text-destructive mt-1">{error as string}</p> : null}
    </div>
  );
};
