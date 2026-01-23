'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href?: string;
  action?: string;
  icon: React.ReactNode;
  badge?: string | number;
  active?: boolean;
}

export const BottomNav = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    items,
    variant = 'default',
    showLabels = true,
    style
  } = element.props;

  const navItems = items as NavItem[];

  const variants = {
    default: 'bg-background border-t',
    elevated: 'bg-background border-t shadow-[0_-4px_20px_rgba(0,0,0,0.1)]',
    glass: 'bg-background/80 backdrop-blur-md border-t',
    dark: 'bg-zinc-900 border-zinc-800 text-white',
  };

  return (
    <nav
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50 safe-area-inset-bottom',
        variants[variant as keyof typeof variants] || variants.default
      )}
      style={style as React.CSSProperties}
    >
      <div className="flex items-center justify-around h-16 px-2">
        {navItems?.map((item, i) => (
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
              'relative flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors',
              item.active
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <span className="relative">
              <span className="w-6 h-6">{item.icon}</span>
              {item.badge && (
                <span className="absolute -top-1 -right-2 min-w-[16px] h-4 flex items-center justify-center text-[10px] bg-destructive text-destructive-foreground rounded-full px-1">
                  {item.badge}
                </span>
              )}
            </span>
            {showLabels && (
              <span className={cn('text-xs', item.active && 'font-medium')}>
                {item.label}
              </span>
            )}
            {item.active && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
            )}
          </a>
        ))}
        {children}
      </div>
    </nav>
  );
};
