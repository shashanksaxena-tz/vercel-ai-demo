'use client';

import React, { useState, useEffect } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const SearchModal = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    isOpen = false,
    placeholder = 'Search...',
    results,
    recentSearches,
    isLoading = false,
    style
  } = element.props;

  const [query, setQuery] = useState('');

  const resultList = results as Array<{ id: string; title: string; description?: string; type?: string }>;
  const recentList = recentSearches as string[];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onAction?.({ name: 'toggle' });
      }
      if (e.key === 'Escape' && isOpen) {
        onAction?.({ name: 'close' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onAction]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => onAction?.({ name: 'close' })}
      />
      <div
        className={cn(
          'relative w-full max-w-xl bg-background border rounded-xl shadow-2xl overflow-hidden',
          'animate-in fade-in-0 zoom-in-95'
        )}
        style={style as React.CSSProperties}
      >
        <div className="flex items-center gap-3 px-4 border-b">
          <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              onAction?.({ name: 'search', payload: { query: e.target.value } } as never);
            }}
            placeholder={placeholder as string}
            className="flex-1 py-4 bg-transparent focus:outline-none"
            autoFocus
          />
          {isLoading && (
            <svg className="w-5 h-5 animate-spin text-primary" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          )}
        </div>

        <div className="max-h-96 overflow-y-auto">
          {query && resultList && resultList.length > 0 ? (
            <div className="p-2">
              {resultList.map((result) => (
                <button
                  key={result.id}
                  onClick={() => {
                    onAction?.({ name: 'select', payload: { result: result.id } } as never);
                    onAction?.({ name: 'close' });
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted text-left"
                >
                  <div className="flex-1">
                    <p className="font-medium">{result.title}</p>
                    {result.description && (
                      <p className="text-sm text-muted-foreground truncate">{result.description}</p>
                    )}
                  </div>
                  {result.type && (
                    <span className="px-2 py-0.5 bg-muted text-xs rounded">{result.type}</span>
                  )}
                </button>
              ))}
            </div>
          ) : !query && recentList && recentList.length > 0 ? (
            <div className="p-4">
              <p className="text-sm text-muted-foreground mb-2">Recent searches</p>
              <div className="space-y-1">
                {recentList.map((recent, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setQuery(recent);
                      onAction?.({ name: 'search', payload: { query: recent } } as never);
                    }}
                    className="flex items-center gap-2 px-2 py-1 hover:bg-muted rounded text-sm"
                  >
                    <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {recent}
                  </button>
                ))}
              </div>
            </div>
          ) : query ? (
            <p className="px-4 py-8 text-center text-muted-foreground">No results found</p>
          ) : (
            children || <p className="px-4 py-8 text-center text-muted-foreground">Start typing to search</p>
          )}
        </div>
      </div>
    </div>
  );
};
