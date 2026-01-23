'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { ChevronDown, Check } from 'lucide-react';

export const Select = ({ element, onAction }: ComponentRenderProps) => {
  const {
    label,
    placeholder = 'Select an option',
    value,
    defaultValue,
    name,
    options = [],
    required = false,
    disabled = false,
    error,
    helperText,
    size = 'default',
    style
  } = element.props;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState((value || defaultValue) as string);

  const optionsArray = options as Array<{
    value: string;
    label: string;
    disabled?: boolean;
  }>;

  const selectedOption = optionsArray.find((opt) => opt.value === selectedValue);

  const sizeStyles = {
    sm: 'h-8 text-xs px-2',
    default: 'h-10 text-sm px-3',
    lg: 'h-12 text-base px-4',
  };

  const handleSelect = (optionValue: string) => {
    setSelectedValue(optionValue);
    setIsOpen(false);
    onAction?.({
      name: 'change',
      params: { name, value: optionValue },
    });
  };

  return (
    <div className="relative w-full" style={style as React.CSSProperties}>
      {label ? (
        <label className="block text-sm font-medium mb-2">
          {label as string}
          {(required as boolean) && <span className="text-destructive ml-1">*</span>}
        </label>
      ) : null}
      <button
        type="button"
        className={cn(
          'flex w-full items-center justify-between rounded-md border border-input bg-background py-2 ring-offset-background',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          sizeStyles[(size as keyof typeof sizeStyles) || 'default'],
          !selectedValue && 'text-muted-foreground',
          !!(error) && 'border-destructive focus:ring-destructive'
        )}
        disabled={disabled as boolean}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate">
          {selectedOption ? selectedOption.label : (placeholder as string)}
        </span>
        <ChevronDown className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-auto rounded-md border border-input bg-popover shadow-md">
          {optionsArray.map((option) => (
            <button
              key={option.value}
              type="button"
              className={cn(
                'flex w-full items-center justify-between px-3 py-2 text-sm hover:bg-muted',
                option.disabled && 'opacity-50 cursor-not-allowed',
                selectedValue === option.value && 'bg-muted'
              )}
              disabled={option.disabled}
              onClick={() => handleSelect(option.value)}
            >
              <span>{option.label}</span>
              {selectedValue === option.value && <Check className="h-4 w-4" />}
            </button>
          ))}
        </div>
      )}

      {(error || helperText) ? (
        <p className={cn('mt-1 text-sm', error ? 'text-destructive' : 'text-muted-foreground')}>
          {(error || helperText) as string}
        </p>
      ) : null}
    </div>
  );
};
