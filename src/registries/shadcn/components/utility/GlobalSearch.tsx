'use client';

import React, { useState, useEffect } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const GlobalSearch = ({ element, onAction }: ComponentRenderProps) => {
  const {
    isOpen = false,
    placeholder = 'Search everything...',
    categories,
    results,
    isLoading = false,
    style
  } = element.props;

  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categoryList = categories as Array<{ id: string; label: string; icon?: string }>;
  const resultsByCategory = results as Record<string, Array<{ id: string; title: string; description?: string }>>;

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setActiveCategory(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh]">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => onAction?.({ name: 'close' })}
      />
      <div
        className={cn(
          'relative w-full max-w-2xl bg-background border rounded-xl shadow-2xl overflow-hidden',
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
              onAction?.({ name: 'search', payload: { query: e.target.value, category: activeCategory } } as never);
            }}
            placeholder={placeholder as string}
            className="flex-1 py-4 bg-transparent focus:outline-none"
            autoFocus
          />
          <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">esc</kbd>
        </div>

        {categoryList && categoryList.length > 0 && (
          <div className="flex gap-2 px-4 py-2 border-b overflow-x-auto">
            <button
              onClick={() => {
                setActiveCategory(null);
                onAction?.({ name: 'search', payload: { query, category: null } } as never);
              }}
              className={cn(
                'px-3 py-1 rounded-full text-sm whitespace-nowrap',
                !activeCategory ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'
              )}
            >
              All
            </button>
            {categoryList.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  onAction?.({ name: 'search', payload: { query, category: cat.id } } as never);
                }}
                className={cn(
                  'px-3 py-1 rounded-full text-sm whitespace-nowrap',
                  activeCategory === cat.id ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}

        <div className="max-h-[50vh] overflow-y-auto p-4">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <svg className="w-6 h-6 animate-spin text-primary" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </div>
          ) : resultsByCategory ? (
            <div className="space-y-6">
              {Object.entries(resultsByCategory).map(([category, items]) => (
                items.length > 0 && (
                  <div key={category}>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">{category}</h4>
                    <div className="space-y-1">
                      {items.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            onAction?.({ name: 'select', payload: { id: item.id, category } } as never);
                            onAction?.({ name: 'close' });
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted text-left"
                        >
                          <div>
                            <p className="font-medium">{item.title}</p>
                            {item.description && (
                              <p className="text-sm text-muted-foreground">{item.description}</p>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">
              {query ? 'No results found' : 'Start typing to search'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
