'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const BreadcrumbItem = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    label,
    href,
    action,
    icon,
    active,
    separator = '/',
    showSeparator = true,
    style
  } = element.props;

  const handleClick = (e: React.MouseEvent) => {
    if (action) {
      e.preventDefault();
      onAction?.({ name: action as string });
    }
  };

  return (
    <>
      <li style={style as React.CSSProperties}>
        {href || action ? (
          <a
            href={(href as string) || '#'}
            onClick={handleClick}
            className={cn(
              'transition-colors',
              active
                ? 'text-foreground font-medium'
                : 'text-muted-foreground hover:text-foreground'
            )}
            aria-current={active ? 'page' : undefined}
          >
            <span className="flex items-center gap-1">
              {icon && <span className="w-4 h-4">{icon as React.ReactNode}</span>}
              {label as string}
              {children}
            </span>
          </a>
        ) : (
          <span
            className={cn(
              active ? 'text-foreground font-medium' : 'text-muted-foreground'
            )}
            aria-current={active ? 'page' : undefined}
          >
            <span className="flex items-center gap-1">
              {icon && <span className="w-4 h-4">{icon as React.ReactNode}</span>}
              {label as string}
              {children}
            </span>
          </span>
        )}
      </li>
      {showSeparator && (
        <li className="text-muted-foreground" aria-hidden="true">
          {separator as string}
        </li>
      )}
    </>
  );
};
