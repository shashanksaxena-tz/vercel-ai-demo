'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const NavGroup = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    label,
    items,
    collapsible,
    defaultExpanded = true,
    variant = 'default',
    style
  } = element.props;

  const [expanded, setExpanded] = React.useState(defaultExpanded as boolean);

  const variants = {
    default: 'flex items-center gap-4',
    vertical: 'flex flex-col gap-2',
    compact: 'flex items-center gap-2',
  };

  return (
    <div
      className={cn('nav-group', variant === 'vertical' && 'w-full')}
      style={style as React.CSSProperties}
    >
      {label && (
        <button
          onClick={() => collapsible && setExpanded(!expanded)}
          className={cn(
            'text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2',
            collapsible && 'cursor-pointer hover:text-foreground flex items-center gap-2'
          )}
        >
          {label as string}
          {collapsible && (
            <svg
              className={cn('w-3 h-3 transition-transform', expanded && 'rotate-180')}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </button>
      )}
      {(!collapsible || expanded) && (
        <nav className={variants[variant as keyof typeof variants] || variants.default}>
          {(items as Array<{ label: string; href?: string; action?: string; active?: boolean }>)?.map((item, i) => (
            <a
              key={i}
              href={item.href || '#'}
              onClick={(e) => {
                if (item.action) {
                  e.preventDefault();
                  onAction?.({ name: item.action });
                }
              }}
              className={cn(
                'text-sm font-medium transition-colors',
                item.active
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {item.label}
            </a>
          ))}
          {children}
        </nav>
      )}
    </div>
  );
};
