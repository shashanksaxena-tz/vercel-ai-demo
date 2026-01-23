'use client';

import React, { useState, useEffect } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Spotlight = ({ element, onAction }: ComponentRenderProps) => {
  const {
    isOpen = false,
    placeholder = 'What do you need?',
    actions,
    recentActions,
    style
  } = element.props;

  const [query, setQuery] = useState('');

  const actionList = actions as Array<{
    id: string;
    label: string;
    icon?: string;
    shortcut?: string;
    keywords?: string[];
  }>;

  const recentList = recentActions as Array<{
    id: string;
    label: string;
    icon?: string;
  }>;

  const filteredActions = actionList?.filter(action => {
    const searchTerms = [action.label, ...(action.keywords || [])].join(' ').toLowerCase();
    return searchTerms.includes(query.toLowerCase());
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === ' ') {
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

  useEffect(() => {
    if (!isOpen) setQuery('');
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => onAction?.({ name: 'close' })}
      />
      <div
        className={cn(
          'relative w-full max-w-lg bg-background/95 backdrop-blur border rounded-2xl shadow-2xl overflow-hidden',
          'animate-in fade-in-0 zoom-in-95'
        )}
        style={style as React.CSSProperties}
      >
        <div className="px-4 pt-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder as string}
            className="w-full text-lg bg-transparent focus:outline-none"
            autoFocus
          />
        </div>

        <div className="border-t mt-4 max-h-80 overflow-y-auto">
          {query && filteredActions && filteredActions.length > 0 ? (
            <div className="py-2">
              {filteredActions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => {
                    onAction?.({ name: 'execute', payload: { action: action.id } } as never);
                    onAction?.({ name: 'close' });
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted text-left"
                >
                  {action.icon && (
                    <span className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                      {action.icon}
                    </span>
                  )}
                  <span className="flex-1 font-medium">{action.label}</span>
                  {action.shortcut && (
                    <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">{action.shortcut}</kbd>
                  )}
                </button>
              ))}
            </div>
          ) : !query && recentList && recentList.length > 0 ? (
            <div className="py-2">
              <p className="px-4 py-2 text-xs text-muted-foreground uppercase font-medium">Recent</p>
              {recentList.map((action) => (
                <button
                  key={action.id}
                  onClick={() => {
                    onAction?.({ name: 'execute', payload: { action: action.id } } as never);
                    onAction?.({ name: 'close' });
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted text-left"
                >
                  {action.icon && (
                    <span className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                      {action.icon}
                    </span>
                  )}
                  <span className="font-medium">{action.label}</span>
                </button>
              ))}
            </div>
          ) : query ? (
            <p className="px-4 py-8 text-center text-muted-foreground">No actions found</p>
          ) : (
            <p className="px-4 py-8 text-center text-muted-foreground">Type to search actions</p>
          )}
        </div>

        <div className="border-t px-4 py-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>Spotlight</span>
          <div className="flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 bg-muted rounded">Tab</kbd>
            <span>to navigate</span>
            <kbd className="px-1.5 py-0.5 bg-muted rounded ml-2">Enter</kbd>
            <span>to select</span>
          </div>
        </div>
      </div>
    </div>
  );
};
