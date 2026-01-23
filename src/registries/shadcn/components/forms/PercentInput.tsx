'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Percent } from 'lucide-react';

export const PercentInput = ({ element, onAction }: ComponentRenderProps) => {
  const {
    label,
    name,
    value,
    defaultValue,
    placeholder = '0',
    disabled = false,
    required = false,
    min = 0,
    max = 100,
    decimalPlaces = 0,
    showPercentSign = true,
    error,
    helperText,
    style
  } = element.props;

  const parseValue = (val: string | number | undefined): string => {
    if (val === undefined || val === null) return '';
    const num = typeof val === 'string' ? parseFloat(val) : val;
    if (isNaN(num)) return '';
    return num.toString();
  };

  const [inputValue, setInputValue] = useState(parseValue((value || defaultValue) as string | number));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9.]/g, '');

    // Handle decimal places
    const parts = rawValue.split('.');
    let sanitizedValue = parts[0];
    if (parts.length > 1 && (decimalPlaces as number) > 0) {
      sanitizedValue += '.' + parts[1].slice(0, decimalPlaces as number);
    }

    // Validate min/max
    const numericValue = parseFloat(sanitizedValue);
    if (!isNaN(numericValue)) {
      if (numericValue < (min as number) || numericValue > (max as number)) return;
    }

    setInputValue(sanitizedValue);
    onAction?.({
      name: 'change',
      params: {
        name,
        value: numericValue,
        decimal: numericValue / 100,
      },
    });
  };

  const handleBlur = () => {
    if (inputValue) {
      const num = parseFloat(inputValue);
      if (!isNaN(num)) {
        setInputValue(num.toFixed(decimalPlaces as number));
      }
    }
  };

  return (
    <div className="w-full" style={style as React.CSSProperties}>
      {label ? (
        <label className="block text-sm font-medium mb-2">
          {label as string}
          {(required as boolean) && <span className="text-destructive ml-1">*</span>}
        </label>
      ) : null}
      <div className="relative">
        <input
          type="text"
          inputMode="decimal"
          name={name as string}
          value={inputValue}
          placeholder={placeholder as string}
          disabled={disabled as boolean}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background',
            'placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            !!(showPercentSign) && 'pr-10',
            !!(error) && 'border-destructive focus-visible:ring-destructive'
          )}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {showPercentSign && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Percent className="h-4 w-4" />
          </span>
        )}
      </div>
      {(error || helperText) ? (
        <p className={cn('mt-1 text-sm', error ? 'text-destructive' : 'text-muted-foreground')}>
          {(error || helperText) as string}
        </p>
      ) : null}
    </div>
  );
};
