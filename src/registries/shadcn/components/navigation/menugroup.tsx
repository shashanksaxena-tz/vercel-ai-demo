'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const MenuGroup = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    label,
    items,
    style
  } = element.props;

  return (
    <div className="py-1" style={style as React.CSSProperties} role="group">
      {label && (
        <div className="px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {label as string}
        </div>
      )}
      {(items as Array<{ label: string; href?: string; action?: string; icon?: React.ReactNode; disabled?: boolean; active?: boolean }>)?.map((item, i) => (
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
      ))}
      {children}
    </div>
  );
};
