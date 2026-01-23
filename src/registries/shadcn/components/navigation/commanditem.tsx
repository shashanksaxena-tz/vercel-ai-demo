'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const CommandItem = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    id,
    label,
    icon,
    shortcut,
    action,
    href,
    disabled,
    selected,
    style
  } = element.props;

  const handleClick = () => {
    if (disabled) return;
    if (action) {
      onAction?.({ name: action as string, payload: { id } } as never);
    }
    if (href) {
      window.location.href = href as string;
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled as boolean}
      className={cn(
        'w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors',
        selected
          ? 'bg-primary/10 text-primary'
          : 'hover:bg-muted text-foreground',
        disabled && 'opacity-50 pointer-events-none'
      )}
      style={style as React.CSSProperties}
      role="option"
      aria-selected={selected as boolean}
    >
      {icon && <span className="w-4 h-4 flex-shrink-0">{icon as React.ReactNode}</span>}
      <span className="flex-1 text-left">{label as string}</span>
      {shortcut && (
        <kbd className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
          {shortcut as string}
        </kbd>
      )}
      {children}
    </button>
  );
};
