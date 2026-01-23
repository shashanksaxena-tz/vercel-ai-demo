'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Phone } from 'lucide-react';

export const PhoneInput = ({ element, onAction }: ComponentRenderProps) => {
  const {
    label,
    placeholder = '+1 (555) 000-0000',
    value,
    defaultValue,
    name,
    required = false,
    disabled = false,
    readOnly = false,
    error,
    helperText,
    showIcon = true,
    countryCode,
    style
  } = element.props;

  const formatPhoneNumber = (input: string): string => {
    const cleaned = input.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (!match) return input;

    let formatted = '';
    if (match[1]) formatted += `(${match[1]}`;
    if (match[1]?.length === 3) formatted += ') ';
    if (match[2]) formatted += match[2];
    if (match[2]?.length === 3) formatted += '-';
    if (match[3]) formatted += match[3];

    return formatted;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    onAction?.({
      name: 'change',
      params: { name, value: formatted },
    });
  };

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
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        ) : null}
        {countryCode ? (
          <span className={cn(
            'absolute top-1/2 -translate-y-1/2 text-sm text-muted-foreground',
            showIcon ? 'left-10' : 'left-3'
          )}>
            {countryCode as string}
          </span>
        ) : null}
        <input
          type="tel"
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
            !!(countryCode) && (showIcon ? 'pl-16' : 'pl-10'),
            !!(error) && 'border-destructive focus-visible:ring-destructive'
          )}
          onChange={handleChange}
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
