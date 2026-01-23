'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { X, Loader2 } from 'lucide-react';

export const Autocomplete = ({ element, onAction }: ComponentRenderProps) => {
  const {
    label,
    placeholder = 'Type to search...',
    value,
    defaultValue,
    name,
    options = [],
    required = false,
    disabled = false,
    error,
    helperText,
    emptyMessage = 'No results found',
    loading = false,
    minChars = 1,
    allowCustomValue = false,
    style
  } = element.props;

  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState((value || defaultValue || '') as string);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const optionsArray = options as Array<{
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
  }>;

  const filteredOptions = useMemo(() => {
    if (inputValue.length < (minChars as number)) return [];
    return optionsArray.filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [optionsArray, inputValue, minChars]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setIsOpen(newValue.length >= (minChars as number));
    setHighlightedIndex(-1);

    onAction?.({
      name: 'search',
      params: { name, value: newValue },
    });

    if (allowCustomValue) {
      onAction?.({
        name: 'change',
        params: { name, value: newValue },
      });
    }
  };

  const handleSelect = (option: typeof optionsArray[0]) => {
    setInputValue(option.label);
    setIsOpen(false);
    setHighlightedIndex(-1);
    onAction?.({
      name: 'change',
      params: { name, value: option.value, label: option.label },
    });
  };

  const handleClear = () => {
    setInputValue('');
    setIsOpen(false);
    inputRef.current?.focus();
    onAction?.({
      name: 'change',
      params: { name, value: '' },
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < filteredOptions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredOptions.length - 1
      );
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      e.preventDefault();
      handleSelect(filteredOptions[highlightedIndex]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setHighlightedIndex(-1);
    }
  };

  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const highlightedElement = listRef.current.children[highlightedIndex] as HTMLElement;
      highlightedElement?.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightedIndex]);

  return (
    <div className="relative w-full" style={style as React.CSSProperties}>
      {label ? (
        <label className="block text-sm font-medium mb-2">
          {label as string}
          {(required as boolean) && <span className="text-destructive ml-1">*</span>}
        </label>
      ) : null}

      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          name={name as string}
          placeholder={placeholder as string}
          value={inputValue}
          disabled={disabled as boolean}
          className={cn(
            'flex w-full h-10 rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm ring-offset-background',
            'placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            !!(error) && 'border-destructive focus:ring-destructive'
          )}
          onChange={handleInputChange}
          onFocus={() => inputValue.length >= (minChars as number) && setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          ) : inputValue ? (
            <button
              type="button"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleClear}
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>
      </div>

      {isOpen && (
        <div
          ref={listRef}
          className="absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-auto rounded-md border border-input bg-popover shadow-md"
        >
          {filteredOptions.length === 0 ? (
            <div className="px-3 py-2 text-sm text-muted-foreground">
              {emptyMessage as string}
            </div>
          ) : (
            filteredOptions.map((option, index) => (
              <button
                key={option.value}
                type="button"
                className={cn(
                  'flex w-full flex-col items-start px-3 py-2 text-sm hover:bg-muted',
                  option.disabled && 'opacity-50 cursor-not-allowed',
                  highlightedIndex === index && 'bg-muted'
                )}
                disabled={option.disabled}
                onClick={() => handleSelect(option)}
              >
                <span>{option.label}</span>
                {option.description && (
                  <span className="text-xs text-muted-foreground">{option.description}</span>
                )}
              </button>
            ))
          )}
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
