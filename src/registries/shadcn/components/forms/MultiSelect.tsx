'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { ChevronDown, Check, X } from 'lucide-react';

export const MultiSelect = ({ element, onAction }: ComponentRenderProps) => {
  const {
    label,
    placeholder = 'Select options',
    value,
    defaultValue,
    name,
    options = [],
    required = false,
    disabled = false,
    error,
    helperText,
    maxSelections,
    showTags = true,
    style
  } = element.props;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>(
    ((value || defaultValue) as string[]) || []
  );

  const optionsArray = options as Array<{
    value: string;
    label: string;
    disabled?: boolean;
  }>;

  const selectedOptions = optionsArray.filter((opt) => selectedValues.includes(opt.value));

  const handleToggle = (optionValue: string) => {
    let newValues: string[];
    if (selectedValues.includes(optionValue)) {
      newValues = selectedValues.filter((v) => v !== optionValue);
    } else {
      if (maxSelections && selectedValues.length >= (maxSelections as number)) {
        return;
      }
      newValues = [...selectedValues, optionValue];
    }
    setSelectedValues(newValues);
    onAction?.({
      name: 'change',
      params: { name, value: newValues },
    });
  };

  const handleRemove = (optionValue: string) => {
    const newValues = selectedValues.filter((v) => v !== optionValue);
    setSelectedValues(newValues);
    onAction?.({
      name: 'change',
      params: { name, value: newValues },
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
          'flex w-full min-h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 ring-offset-background',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          !!(error) && 'border-destructive focus:ring-destructive'
        )}
        disabled={disabled as boolean}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-wrap gap-1 flex-1">
          {showTags && selectedOptions.length > 0 ? (
            selectedOptions.map((option) => (
              <span
                key={option.value}
                className="inline-flex items-center gap-1 px-2 py-0.5 bg-muted rounded text-xs"
              >
                {option.label}
                <button
                  type="button"
                  className="hover:text-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(option.value);
                  }}
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))
          ) : (
            <span className={cn('text-sm', selectedValues.length === 0 && 'text-muted-foreground')}>
              {selectedValues.length > 0
                ? `${selectedValues.length} selected`
                : (placeholder as string)}
            </span>
          )}
        </div>
        <ChevronDown className={cn('h-4 w-4 flex-shrink-0 ml-2 transition-transform', isOpen && 'rotate-180')} />
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
                selectedValues.includes(option.value) && 'bg-muted'
              )}
              disabled={option.disabled}
              onClick={() => handleToggle(option.value)}
            >
              <span>{option.label}</span>
              {selectedValues.includes(option.value) && <Check className="h-4 w-4" />}
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
