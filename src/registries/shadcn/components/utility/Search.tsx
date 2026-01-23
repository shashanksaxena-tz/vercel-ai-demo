'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Search = ({ element, onAction }: ComponentRenderProps) => {
  const {
    placeholder = 'Search...',
    value = '',
    size = 'md',
    showClear = true,
    style
  } = element.props;

  const [query, setQuery] = useState(value as string);

  const sizes = {
    sm: 'h-8 text-sm',
    md: 'h-10',
    lg: 'h-12 text-lg',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAction?.({ name: 'search', payload: { query } } as never);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('relative flex items-center')}
      style={style as React.CSSProperties}
    >
      <svg className="absolute left-3 w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          onAction?.({ name: 'change', payload: { query: e.target.value } } as never);
        }}
        placeholder={placeholder as string}
        className={cn(
          'w-full pl-10 pr-10 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary',
          sizes[size as keyof typeof sizes] || sizes.md
        )}
      />
      {showClear && query && (
        <button
          type="button"
          onClick={() => {
            setQuery('');
            onAction?.({ name: 'clear' });
          }}
          className="absolute right-3 p-1 hover:bg-muted rounded"
        >
          <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </form>
  );
};
