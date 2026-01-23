'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { DollarSign } from 'lucide-react';

export const CurrencyInput = ({ element, onAction }: ComponentRenderProps) => {
  const {
    label,
    name,
    value,
    defaultValue,
    placeholder = '0.00',
    currency = 'USD',
    currencySymbol = '$',
    disabled = false,
    required = false,
    min,
    max,
    decimalPlaces = 2,
    thousandSeparator = ',',
    decimalSeparator = '.',
    showCurrencySymbol = true,
    error,
    helperText,
    style
  } = element.props;

  const parseValue = (val: string | number | undefined): string => {
    if (val === undefined || val === null) return '';
    const num = typeof val === 'string' ? parseFloat(val.replace(/[^0-9.-]/g, '')) : val;
    if (isNaN(num)) return '';
    return num.toFixed(decimalPlaces as number);
  };

  const [inputValue, setInputValue] = useState(parseValue((value || defaultValue) as string | number));

  const formatCurrency = (val: string): string => {
    if (!val) return '';

    const parts = val.split(decimalSeparator as string);
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator as string);
    const decimalPart = parts[1] ? `${decimalSeparator}${parts[1]}` : '';

    return `${integerPart}${decimalPart}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9.]/g, '');

    // Handle decimal places
    const parts = rawValue.split('.');
    let sanitizedValue = parts[0];
    if (parts.length > 1) {
      sanitizedValue += '.' + parts[1].slice(0, decimalPlaces as number);
    }

    // Validate min/max
    const numericValue = parseFloat(sanitizedValue);
    if (!isNaN(numericValue)) {
      if (min !== undefined && numericValue < (min as number)) return;
      if (max !== undefined && numericValue > (max as number)) return;
    }

    setInputValue(sanitizedValue);
    onAction?.({
      name: 'change',
      params: {
        name,
        value: numericValue,
        formatted: formatCurrency(sanitizedValue),
        currency,
      },
    });
  };

  const handleBlur = () => {
    if (inputValue) {
      const formatted = parseFloat(inputValue).toFixed(decimalPlaces as number);
      setInputValue(formatted);
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
        {showCurrencySymbol && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
            {currencySymbol as string}
          </span>
        )}
        <input
          type="text"
          inputMode="decimal"
          name={name as string}
          value={formatCurrency(inputValue)}
          placeholder={placeholder as string}
          disabled={disabled as boolean}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background',
            'placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50 text-right',
            !!(showCurrencySymbol) && 'pl-8',
            !!(error) && 'border-destructive focus-visible:ring-destructive'
          )}
          onChange={handleChange}
          onBlur={handleBlur}
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
