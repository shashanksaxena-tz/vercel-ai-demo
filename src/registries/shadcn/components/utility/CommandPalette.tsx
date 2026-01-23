'use client';

import React, { useState, useEffect } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const CommandPalette = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    isOpen = false,
    placeholder = 'Type a command or search...',
    commands,
    style
  } = element.props;

  const [query, setQuery] = useState('');

  const commandList = commands as Array<{
    id: string;
    label: string;
    icon?: string;
    shortcut?: string;
    category?: string;
  }>;

  const filteredCommands = commandList?.filter(cmd =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

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
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => onAction?.({ name: 'close' })}
      />
      <div
        className={cn(
          'relative w-full max-w-lg bg-background border rounded-xl shadow-2xl overflow-hidden',
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
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder as string}
            className="flex-1 py-4 bg-transparent focus:outline-none"
            autoFocus
          />
          <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">esc</kbd>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {filteredCommands && filteredCommands.length > 0 ? (
            filteredCommands.map((cmd) => (
              <button
                key={cmd.id}
                onClick={() => {
                  onAction?.({ name: 'execute', payload: { command: cmd.id } } as never);
                  onAction?.({ name: 'close' });
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted text-left"
              >
                {cmd.icon && <span>{cmd.icon}</span>}
                <span className="flex-1">{cmd.label}</span>
                {cmd.shortcut && (
                  <kbd className="px-2 py-0.5 bg-muted rounded text-xs font-mono">{cmd.shortcut}</kbd>
                )}
              </button>
            ))
          ) : (
            children || <p className="px-3 py-8 text-center text-muted-foreground">No commands found</p>
          )}
        </div>
      </div>
    </div>
  );
};
