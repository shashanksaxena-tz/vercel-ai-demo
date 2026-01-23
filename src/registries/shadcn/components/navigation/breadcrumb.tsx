'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Breadcrumb = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    items,
    separator = '/',
    variant = 'default',
    maxItems,
    showHome,
    homeHref = '/',
    homeLabel = 'Home',
    style
  } = element.props;

  const variants = {
    default: 'text-sm',
    large: 'text-base',
    small: 'text-xs',
  };

  const itemsList = items as Array<{ label: string; href?: string; action?: string; icon?: React.ReactNode }>;
  const displayItems = maxItems && itemsList?.length > (maxItems as number)
    ? [
        ...itemsList.slice(0, 1),
        { label: '...', href: undefined },
        ...itemsList.slice(-(maxItems as number - 1))
      ]
    : itemsList;

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(variants[variant as keyof typeof variants] || variants.default)}
      style={style as React.CSSProperties}
    >
      <ol className="flex items-center gap-2">
        {showHome && (
          <>
            <li>
              <a
                href={homeHref as string}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {homeLabel as string}
              </a>
            </li>
            {displayItems?.length > 0 && (
              <li className="text-muted-foreground" aria-hidden="true">
                {separator as string}
              </li>
            )}
          </>
        )}
        {displayItems?.map((item, i) => (
          <React.Fragment key={i}>
            <li>
              {item.href || item.action ? (
                <a
                  href={item.href || '#'}
                  onClick={(e) => {
                    if (item.action) {
                      e.preventDefault();
                      onAction?.({ name: item.action });
                    }
                  }}
                  className={cn(
                    'transition-colors',
                    i === displayItems.length - 1
                      ? 'text-foreground font-medium'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                  aria-current={i === displayItems.length - 1 ? 'page' : undefined}
                >
                  <span className="flex items-center gap-1">
                    {item.icon}
                    {item.label}
                  </span>
                </a>
              ) : (
                <span
                  className={cn(
                    i === displayItems.length - 1
                      ? 'text-foreground font-medium'
                      : 'text-muted-foreground'
                  )}
                  aria-current={i === displayItems.length - 1 ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
            {i < displayItems.length - 1 && (
              <li className="text-muted-foreground" aria-hidden="true">
                {separator as string}
              </li>
            )}
          </React.Fragment>
        ))}
        {children}
      </ol>
    </nav>
  );
};
