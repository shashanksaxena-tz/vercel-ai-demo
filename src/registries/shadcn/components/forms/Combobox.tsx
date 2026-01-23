'use client';

import React, { useState, useMemo } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { ChevronDown, Check, Search } from 'lucide-react';

export const Combobox = ({ element, onAction }: ComponentRenderProps) => {
  const {
    label,
    placeholder = 'Select or search...',
    value,
    defaultValue,
    name,
    options = [],
    required = false,
    disabled = false,
    error,
    helperText,
    searchPlaceholder = 'Search...',
    emptyMessage = 'No results found',
    style
  } = element.props;

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedValue, setSelectedValue] = useState((value || defaultValue) as string);

  const optionsArray = options as Array<{
    value: string;
    label: string;
    disabled?: boolean;
  }>;

  const filteredOptions = useMemo(() => {
    if (!searchTerm) return optionsArray;
    return optionsArray.filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [optionsArray, searchTerm]);

  const selectedOption = optionsArray.find((opt) => opt.value === selectedValue);

  const handleSelect = (optionValue: string) => {
    setSelectedValue(optionValue);
    setSearchTerm('');
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
          'flex w-full h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
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
        <div className="absolute top-full left-0 right-0 z-50 mt-1 rounded-md border border-input bg-popover shadow-md">
          <div className="flex items-center border-b border-input px-3">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={searchPlaceholder as string}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent px-2 py-2 text-sm focus:outline-none"
              autoFocus
            />
          </div>
          <div className="max-h-60 overflow-auto">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-sm text-muted-foreground">
                {emptyMessage as string}
              </div>
            ) : (
              filteredOptions.map((option) => (
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
              ))
            )}
          </div>
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
