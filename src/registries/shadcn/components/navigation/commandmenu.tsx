'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

interface CommandItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  action?: string;
  href?: string;
  disabled?: boolean;
  group?: string;
}

export const CommandMenu = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    items,
    placeholder = 'Type a command or search...',
    open: controlledOpen,
    shortcut = 'k',
    groups,
    style
  } = element.props;

  const [open, setOpen] = React.useState(controlledOpen as boolean || false);
  const [search, setSearch] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const commandItems = items as CommandItem[];
  const groupLabels = groups as Record<string, string> | undefined;

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === shortcut) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [shortcut]);

  React.useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const filteredItems = commandItems?.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase())
  );

  const groupedItems = filteredItems?.reduce((acc, item) => {
    const group = item.group || 'default';
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(item);
    return acc;
  }, {} as Record<string, CommandItem[]>);

  const handleSelect = (item: CommandItem) => {
    if (item.disabled) return;
    if (item.action) {
      onAction?.({ name: item.action, payload: { id: item.id } } as never);
    }
    if (item.href) {
      window.location.href = item.href;
    }
    setOpen(false);
    setSearch('');
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className={cn(
          'inline-flex items-center gap-2 px-4 py-2 text-sm',
          'text-muted-foreground border rounded-md',
          'hover:bg-muted transition-colors'
        )}
        style={style as React.CSSProperties}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span>{placeholder as string}</span>
        <kbd className="ml-auto text-xs bg-muted px-1.5 py-0.5 rounded">
          {navigator.platform.includes('Mac') ? 'Cmd' : 'Ctrl'}+{(shortcut as string).toUpperCase()}
        </kbd>
      </button>
    );
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={() => setOpen(false)}
      />
      <div
        className={cn(
          'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50',
          'w-full max-w-lg bg-background border rounded-lg shadow-lg overflow-hidden'
        )}
        style={style as React.CSSProperties}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center border-b px-4">
          <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={placeholder as string}
            className="flex-1 px-3 py-3 text-sm bg-transparent outline-none"
          />
        </div>
        <div className="max-h-80 overflow-y-auto p-2">
          {groupedItems && Object.entries(groupedItems).map(([group, items]) => (
            <div key={group}>
              {group !== 'default' && groupLabels && (
                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                  {groupLabels[group] || group}
                </div>
              )}
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  disabled={item.disabled}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors',
                    'hover:bg-muted text-foreground',
                    item.disabled && 'opacity-50 pointer-events-none'
                  )}
                >
                  {item.icon && <span className="w-4 h-4">{item.icon}</span>}
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.shortcut && (
                    <kbd className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                      {item.shortcut}
                    </kbd>
                  )}
                </button>
              ))}
            </div>
          ))}
          {filteredItems?.length === 0 && (
            <div className="py-6 text-center text-sm text-muted-foreground">
              No results found.
            </div>
          )}
        </div>
        {children}
      </div>
    </>
  );
};
