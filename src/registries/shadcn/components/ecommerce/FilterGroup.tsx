'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';

export const FilterGroup = ({ element, onAction }: ComponentRenderProps) => {
  const {
    title,
    type = 'checkbox',
    options,
    selectedValues,
    collapsible = true,
    defaultExpanded = true,
    searchable = false,
    maxVisible = 5,
    showMore = true,
    style,
  } = element.props;

  const [isExpanded, setIsExpanded] = useState(Boolean(defaultExpanded));
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const optionList = options as Array<{
    value: string;
    label: string;
    count?: number;
    color?: string;
    disabled?: boolean;
  }> | undefined;

  const selected = (selectedValues as string[]) || [];

  const filteredOptions = searchable && searchQuery
    ? optionList?.filter((opt) =>
        opt.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : optionList;

  const visibleOptions = showMore && !showAll
    ? filteredOptions?.slice(0, Number(maxVisible))
    : filteredOptions;

  const remainingCount = (filteredOptions?.length || 0) - Number(maxVisible);

  const handleSelect = (value: string) => {
    if (onAction) {
      onAction({ name: 'toggleFilter', payload: { title, value } } as never);
    }
  };

  return (
    <div className="space-y-3" style={style as React.CSSProperties}>
      {collapsible ? (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between font-medium"
        >
          <span>{title as string}</span>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
      ) : (
        <h4 className="font-medium">{title as string}</h4>
      )}

      {(!collapsible || isExpanded) && (
        <>
          {searchable && (
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${title}...`}
              className="w-full px-3 py-1.5 text-sm border rounded-md bg-background"
            />
          )}

          <div className="space-y-2">
            {type === 'color' ? (
              <div className="flex flex-wrap gap-2">
                {visibleOptions?.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    disabled={option.disabled}
                    className={cn(
                      'w-8 h-8 rounded-full border-2 transition-all',
                      selected.includes(option.value)
                        ? 'border-primary ring-2 ring-primary/30'
                        : 'border-transparent hover:border-muted-foreground/50',
                      option.disabled && 'opacity-50 cursor-not-allowed'
                    )}
                    style={{ backgroundColor: option.color }}
                    title={option.label}
                  >
                    {selected.includes(option.value) && (
                      <Check
                        className={cn(
                          'h-4 w-4 mx-auto',
                          isLightColor(option.color || '#fff') ? 'text-gray-900' : 'text-white'
                        )}
                      />
                    )}
                  </button>
                ))}
              </div>
            ) : type === 'radio' ? (
              visibleOptions?.map((option) => (
                <label
                  key={option.value}
                  className={cn(
                    'flex items-center justify-between cursor-pointer py-1',
                    option.disabled && 'opacity-50 cursor-not-allowed'
                  )}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={title as string}
                      value={option.value}
                      checked={selected.includes(option.value)}
                      onChange={() => handleSelect(option.value)}
                      disabled={option.disabled}
                      className="text-primary"
                    />
                    <span className="text-sm">{option.label}</span>
                  </div>
                  {option.count !== undefined && (
                    <span className="text-xs text-muted-foreground">({option.count})</span>
                  )}
                </label>
              ))
            ) : type === 'button' ? (
              <div className="flex flex-wrap gap-2">
                {visibleOptions?.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    disabled={option.disabled}
                    className={cn(
                      'px-3 py-1.5 text-sm border rounded-md transition-colors',
                      selected.includes(option.value)
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'hover:bg-muted',
                      option.disabled && 'opacity-50 cursor-not-allowed'
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            ) : (
              // Checkbox (default)
              visibleOptions?.map((option) => (
                <label
                  key={option.value}
                  className={cn(
                    'flex items-center justify-between cursor-pointer py-1',
                    option.disabled && 'opacity-50 cursor-not-allowed'
                  )}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selected.includes(option.value)}
                      onChange={() => handleSelect(option.value)}
                      disabled={option.disabled}
                      className="rounded border-input text-primary"
                    />
                    <span className="text-sm">{option.label}</span>
                  </div>
                  {option.count !== undefined && (
                    <span className="text-xs text-muted-foreground">({option.count})</span>
                  )}
                </label>
              ))
            )}
          </div>

          {showMore && remainingCount > 0 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-sm text-primary hover:underline"
            >
              {showAll ? 'Show less' : `Show ${remainingCount} more`}
            </button>
          )}
        </>
      )}
    </div>
  );
};

function isLightColor(color: string): boolean {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128;
}
