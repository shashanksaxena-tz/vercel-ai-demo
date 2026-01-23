'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const SideNav = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    brand,
    logo,
    items,
    collapsed,
    width = 256,
    variant = 'default',
    style
  } = element.props;

  const variants = {
    default: 'bg-background border-r',
    filled: 'bg-muted',
    dark: 'bg-zinc-900 text-white',
    transparent: 'bg-transparent',
  };

  return (
    <aside
      className={cn(
        'flex flex-col h-full shrink-0 transition-all duration-300',
        variants[variant as keyof typeof variants] || variants.default,
        collapsed ? 'w-16' : undefined
      )}
      style={{
        width: collapsed ? undefined : (width as number),
        ...style as React.CSSProperties
      }}
    >
      {(logo || brand) && (
        <div className={cn('flex items-center gap-3 px-4 py-4 border-b', collapsed && 'justify-center')}>
          {logo && <img src={logo as string} alt="Logo" className="h-8 w-8" />}
          {!collapsed && brand && (
            <span className="font-semibold text-lg">{brand as string}</span>
          )}
        </div>
      )}
      <nav className="flex-1 overflow-y-auto py-4">
        <div className="flex flex-col gap-1 px-3">
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
        </div>
        {children}
      </nav>
    </aside>
  );
};
