'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Minus, Plus } from 'lucide-react';

export const NumberInput = ({ element, onAction }: ComponentRenderProps) => {
  const {
    label,
    placeholder = '0',
    value,
    defaultValue = 0,
    name,
    required = false,
    disabled = false,
    readOnly = false,
    min,
    max,
    step = 1,
    error,
    helperText,
    showControls = true,
    style
  } = element.props;

  const [currentValue, setCurrentValue] = useState<number>(
    (value ?? defaultValue) as number
  );

  const handleChange = (newValue: number) => {
    const minVal = min as number | undefined;
    const maxVal = max as number | undefined;

    let clampedValue = newValue;
    if (minVal !== undefined && newValue < minVal) clampedValue = minVal;
    if (maxVal !== undefined && newValue > maxVal) clampedValue = maxVal;

    setCurrentValue(clampedValue);
    onAction?.({
      name: 'change',
      params: { name, value: clampedValue },
    });
  };

  const increment = () => handleChange(currentValue + (step as number));
  const decrement = () => handleChange(currentValue - (step as number));

  return (
    <div className="w-full" style={style as React.CSSProperties}>
      {label ? (
        <label className="block text-sm font-medium mb-2">
          {label as string}
          {(required as boolean) && <span className="text-destructive ml-1">*</span>}
        </label>
      ) : null}
      <div className="relative flex items-center">
        {showControls ? (
          <button
            type="button"
            className={cn(
              'absolute left-0 h-10 w-10 flex items-center justify-center rounded-l-md border border-r-0 border-input bg-muted hover:bg-muted/80',
              'disabled:cursor-not-allowed disabled:opacity-50'
            )}
            onClick={decrement}
            disabled={disabled as boolean || (min !== undefined && currentValue <= (min as number))}
          >
            <Minus className="h-4 w-4" />
          </button>
        ) : null}
        <input
          type="number"
          name={name as string}
          placeholder={placeholder as string}
          value={currentValue}
          required={required as boolean}
          disabled={disabled as boolean}
          readOnly={readOnly as boolean}
          min={min as number}
          max={max as number}
          step={step as number}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-center ring-offset-background',
            'placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
            !!(showControls) && 'px-12',
            !!(error) && 'border-destructive focus-visible:ring-destructive'
          )}
          onChange={(e) => handleChange(parseFloat(e.target.value) || 0)}
        />
        {showControls ? (
          <button
            type="button"
            className={cn(
              'absolute right-0 h-10 w-10 flex items-center justify-center rounded-r-md border border-l-0 border-input bg-muted hover:bg-muted/80',
              'disabled:cursor-not-allowed disabled:opacity-50'
            )}
            onClick={increment}
            disabled={disabled as boolean || (max !== undefined && currentValue >= (max as number))}
          >
            <Plus className="h-4 w-4" />
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
