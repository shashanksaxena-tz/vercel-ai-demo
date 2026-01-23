'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Navbar = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    brand,
    logo,
    sticky = true,
    variant = 'default',
    items,
    style
  } = element.props;

  const variants = {
    default: 'bg-background border-b',
    glass: 'bg-background/80 backdrop-blur-md border-b',
    transparent: 'bg-transparent',
    filled: 'bg-primary text-primary-foreground',
    dark: 'bg-zinc-900 text-white border-zinc-800',
  };

  return (
    <nav
      className={cn(
        'flex items-center justify-between px-6 py-4 w-full',
        variants[variant as keyof typeof variants] || variants.default,
        sticky && 'sticky top-0 z-50'
      )}
      style={style as React.CSSProperties}
    >
      <div className="flex items-center gap-2">
        {logo && <img src={logo as string} alt="Logo" className="h-8 w-8" />}
        {brand && <span className="font-semibold text-lg">{brand as string}</span>}
      </div>
      <div className="flex items-center gap-6">
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
      </div>
    </nav>
  );
};
