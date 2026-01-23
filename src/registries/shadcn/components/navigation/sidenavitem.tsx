'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const SideNavItem = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    label,
    href,
    action,
    icon,
    active,
    disabled,
    badge,
    indent = 0,
    collapsed,
    style
  } = element.props;

  const handleClick = (e: React.MouseEvent) => {
    if (action) {
      e.preventDefault();
      onAction?.({ name: action as string });
    }
  };

  return (
    <a
      href={(href as string) || '#'}
      onClick={handleClick}
      className={cn(
        'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
        active
          ? 'bg-primary text-primary-foreground'
          : 'text-muted-foreground hover:bg-muted hover:text-foreground',
        disabled && 'opacity-50 pointer-events-none',
        collapsed && 'justify-center'
      )}
      style={{
        paddingLeft: indent ? `${(indent as number) * 12 + 12}px` : undefined,
        ...style as React.CSSProperties
      }}
      title={collapsed ? (label as string) : undefined}
      aria-current={active ? 'page' : undefined}
    >
      {icon && <span className="w-5 h-5 flex-shrink-0">{icon as React.ReactNode}</span>}
      {!collapsed && (
        <>
          <span className="flex-1">{label as string}</span>
          {badge && (
            <span className="ml-auto px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full">
              {badge as string}
            </span>
          )}
        </>
      )}
      {children}
    </a>
  );
};
