'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const SideNavGroup = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    label,
    items,
    icon,
    collapsible = true,
    defaultExpanded = true,
    collapsed,
    style
  } = element.props;

  const [expanded, setExpanded] = React.useState(defaultExpanded as boolean);

  return (
    <div className="py-2" style={style as React.CSSProperties}>
      {label && !collapsed && (
        <button
          onClick={() => collapsible && setExpanded(!expanded)}
          className={cn(
            'flex items-center w-full px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground',
            collapsible && 'hover:text-foreground cursor-pointer'
          )}
        >
          {icon && <span className="w-4 h-4 mr-2">{icon as React.ReactNode}</span>}
          <span className="flex-1 text-left">{label as string}</span>
          {collapsible && (
            <svg
              className={cn('w-4 h-4 transition-transform', expanded && 'rotate-180')}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </button>
      )}
      {(!collapsible || expanded || collapsed) && (
        <div className="flex flex-col gap-1 mt-1">
          {(items as Array<{ label: string; href?: string; action?: string; icon?: string; active?: boolean }>)?.map((item, i) => (
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
                'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                item.active
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                collapsed && 'justify-center'
              )}
              title={collapsed ? item.label : undefined}
            >
              {item.icon && <span className="w-5 h-5 flex-shrink-0">{item.icon}</span>}
              {!collapsed && item.label}
            </a>
          ))}
          {children}
        </div>
      )}
    </div>
  );
};
