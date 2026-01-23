'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const MenuItem = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    label,
    href,
    action,
    icon,
    iconRight,
    active,
    disabled,
    shortcut,
    description,
    variant = 'default',
    style
  } = element.props;

  const variants = {
    default: cn(
      'flex items-center gap-2 px-3 py-2 text-sm rounded-sm transition-colors',
      active ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted',
      disabled && 'opacity-50 pointer-events-none'
    ),
    danger: cn(
      'flex items-center gap-2 px-3 py-2 text-sm rounded-sm transition-colors',
      'text-destructive hover:bg-destructive/10',
      disabled && 'opacity-50 pointer-events-none'
    ),
    highlighted: cn(
      'flex items-center gap-2 px-3 py-2 text-sm rounded-sm transition-colors',
      'bg-primary/10 text-primary hover:bg-primary/20',
      disabled && 'opacity-50 pointer-events-none'
    ),
  };

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) return;
    if (action) {
      e.preventDefault();
      onAction?.({ name: action as string });
    }
  };

  return (
    <a
      href={(href as string) || '#'}
      onClick={handleClick}
      className={variants[variant as keyof typeof variants] || variants.default}
      style={style as React.CSSProperties}
      role="menuitem"
      aria-disabled={disabled as boolean}
    >
      {icon && <span className="w-4 h-4 flex-shrink-0">{icon as React.ReactNode}</span>}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span>{label as string}</span>
          {shortcut && (
            <span className="ml-auto text-xs text-muted-foreground">
              {shortcut as string}
            </span>
          )}
        </div>
        {description && (
          <p className="text-xs text-muted-foreground mt-0.5 truncate">
            {description as string}
          </p>
        )}
      </div>
      {iconRight && <span className="w-4 h-4 flex-shrink-0">{iconRight as React.ReactNode}</span>}
      {children}
    </a>
  );
};
