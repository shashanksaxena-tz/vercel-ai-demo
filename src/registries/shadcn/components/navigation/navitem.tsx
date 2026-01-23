'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const NavItem = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    label,
    href,
    action,
    active,
    disabled,
    icon,
    badge,
    variant = 'default',
    style
  } = element.props;

  const variants = {
    default: cn(
      'text-sm font-medium transition-colors',
      active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
      disabled && 'opacity-50 pointer-events-none'
    ),
    pill: cn(
      'text-sm font-medium px-3 py-1.5 rounded-full transition-colors',
      active
        ? 'bg-primary text-primary-foreground'
        : 'text-muted-foreground hover:bg-muted hover:text-foreground',
      disabled && 'opacity-50 pointer-events-none'
    ),
    underline: cn(
      'text-sm font-medium pb-1 border-b-2 transition-colors',
      active
        ? 'border-primary text-foreground'
        : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted',
      disabled && 'opacity-50 pointer-events-none'
    ),
  };

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
      className={variants[variant as keyof typeof variants] || variants.default}
      style={style as React.CSSProperties}
      aria-current={active ? 'page' : undefined}
    >
      <span className="flex items-center gap-2">
        {icon && <span className="w-4 h-4">{icon as React.ReactNode}</span>}
        {label as string}
        {badge && (
          <span className="ml-1 px-1.5 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
            {badge as string}
          </span>
        )}
        {children}
      </span>
    </a>
  );
};
