'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Menu = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    items,
    variant = 'default',
    orientation = 'vertical',
    style
  } = element.props;

  const variants = {
    default: 'bg-background border rounded-md shadow-sm',
    ghost: 'bg-transparent',
    filled: 'bg-muted rounded-md',
  };

  const orientationClasses = {
    vertical: 'flex flex-col',
    horizontal: 'flex flex-row',
  };

  return (
    <nav
      className={cn(
        'p-1',
        variants[variant as keyof typeof variants] || variants.default,
        orientationClasses[orientation as keyof typeof orientationClasses] || orientationClasses.vertical
      )}
      style={style as React.CSSProperties}
      role="menu"
    >
      {(items as Array<{ label: string; href?: string; action?: string; icon?: React.ReactNode; disabled?: boolean; active?: boolean; divider?: boolean }>)?.map((item, i) =>
        item.divider ? (
          <div
            key={i}
            className={cn(
              'my-1',
              orientation === 'horizontal' ? 'w-px h-6 bg-border mx-1' : 'h-px bg-border'
            )}
            role="separator"
          />
        ) : (
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
              'flex items-center gap-2 px-3 py-2 text-sm rounded-sm transition-colors',
              item.active
                ? 'bg-primary text-primary-foreground'
                : 'text-foreground hover:bg-muted',
              item.disabled && 'opacity-50 pointer-events-none'
            )}
            role="menuitem"
            aria-disabled={item.disabled}
          >
            {item.icon && <span className="w-4 h-4">{item.icon}</span>}
            {item.label}
          </a>
        )
      )}
      {children}
    </nav>
  );
};
