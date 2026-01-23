'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { ChevronDown, Check, ArrowUpDown } from 'lucide-react';

export const SortDropdown = ({ element, onAction }: ComponentRenderProps) => {
  const {
    options,
    selectedValue,
    label = 'Sort by',
    showLabel = true,
    variant = 'dropdown',
    style,
  } = element.props;

  const [isOpen, setIsOpen] = useState(false);

  const optionList = (options as Array<{
    value: string;
    label: string;
  }>) || [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'rating', label: 'Best Rating' },
    { value: 'popular', label: 'Most Popular' },
  ];

  const selectedOption = optionList.find((opt) => opt.value === selectedValue);

  const handleSelect = (value: string) => {
    setIsOpen(false);
    if (onAction) {
      onAction({ name: 'sort', payload: { sortBy: value } } as never);
    }
  };

  if (variant === 'buttons') {
    return (
      <div className="flex flex-wrap items-center gap-2" style={style as React.CSSProperties}>
        {showLabel && (
          <span className="text-sm text-muted-foreground mr-2">{label as string}:</span>
        )}
        {optionList.map((option) => (
          <button
            key={option.value}
            onClick={() => handleSelect(option.value)}
            className={cn(
              'px-3 py-1.5 text-sm rounded-md transition-colors',
              selectedValue === option.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80'
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    );
  }

  if (variant === 'select') {
    return (
      <div className="flex items-center gap-2" style={style as React.CSSProperties}>
        {showLabel && (
          <label className="text-sm text-muted-foreground">{label as string}:</label>
        )}
        <select
          value={selectedValue as string || ''}
          onChange={(e) => handleSelect(e.target.value)}
          className="px-3 py-2 pr-8 border rounded-md bg-background text-sm appearance-none cursor-pointer"
        >
          {optionList.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  // Dropdown variant (default)
  return (
    <div className="relative" style={style as React.CSSProperties}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 border rounded-md bg-background hover:bg-muted transition-colors"
      >
        <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
        {showLabel && (
          <span className="text-sm text-muted-foreground">{label as string}:</span>
        )}
        <span className="text-sm font-medium">
          {selectedOption?.label || 'Select'}
        </span>
        <ChevronDown
          className={cn(
            'h-4 w-4 text-muted-foreground transition-transform',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full mt-1 w-48 bg-background border rounded-md shadow-lg z-20">
            {optionList.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={cn(
                  'w-full flex items-center justify-between px-3 py-2 text-sm text-left hover:bg-muted transition-colors',
                  selectedValue === option.value && 'bg-muted'
                )}
              >
                {option.label}
                {selectedValue === option.value && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
