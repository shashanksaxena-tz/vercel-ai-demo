'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Search, X } from 'lucide-react';

export const SearchInput = ({ element, onAction }: ComponentRenderProps) => {
  const {
    label,
    placeholder = 'Search...',
    value,
    defaultValue,
    name,
    disabled = false,
    error,
    helperText,
    showClearButton = true,
    size = 'default',
    style
  } = element.props;

  const [inputValue, setInputValue] = React.useState((value || defaultValue || '') as string);

  const sizeStyles = {
    sm: 'h-8 text-xs',
    default: 'h-10 text-sm',
    lg: 'h-12 text-base',
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onAction?.({
      name: 'change',
      params: { name, value: e.target.value },
    });
  };

  const handleClear = () => {
    setInputValue('');
    onAction?.({
      name: 'change',
      params: { name, value: '' },
    });
    onAction?.({
      name: 'clear',
      params: { name },
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onAction?.({
        name: 'search',
        params: { name, value: inputValue },
      });
    }
  };

  return (
    <div className="w-full" style={style as React.CSSProperties}>
      {label ? (
        <label className="block text-sm font-medium mb-2">
          {label as string}
        </label>
      ) : null}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="search"
          name={name as string}
          placeholder={placeholder as string}
          value={inputValue}
          disabled={disabled as boolean}
          className={cn(
            'flex w-full rounded-md border border-input bg-background pl-10 pr-10 py-2 ring-offset-background',
            'placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            '[&::-webkit-search-cancel-button]:hidden',
            sizeStyles[(size as keyof typeof sizeStyles) || 'default'],
            !!(error) && 'border-destructive focus-visible:ring-destructive'
          )}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        {showClearButton && inputValue ? (
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            onClick={handleClear}
          >
            <X className="h-4 w-4" />
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
