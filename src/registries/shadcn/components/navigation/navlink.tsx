'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const NavLink = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    label,
    href,
    action,
    active,
    disabled,
    icon,
    iconRight,
    external,
    variant = 'default',
    size = 'default',
    style
  } = element.props;

  const variants = {
    default: cn(
      'font-medium transition-colors',
      active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
      disabled && 'opacity-50 pointer-events-none'
    ),
    underline: cn(
      'font-medium transition-colors border-b-2',
      active
        ? 'border-primary text-foreground'
        : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted',
      disabled && 'opacity-50 pointer-events-none'
    ),
    button: cn(
      'font-medium px-4 py-2 rounded-md transition-colors',
      active
        ? 'bg-primary text-primary-foreground'
        : 'text-muted-foreground hover:bg-muted hover:text-foreground',
      disabled && 'opacity-50 pointer-events-none'
    ),
    ghost: cn(
      'font-medium px-3 py-1.5 rounded-md transition-colors',
      active ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground',
      disabled && 'opacity-50 pointer-events-none'
    ),
  };

  const sizes = {
    sm: 'text-xs',
    default: 'text-sm',
    lg: 'text-base',
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
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={cn(
        'inline-flex items-center gap-2',
        variants[variant as keyof typeof variants] || variants.default,
        sizes[size as keyof typeof sizes] || sizes.default
      )}
      style={style as React.CSSProperties}
      aria-current={active ? 'page' : undefined}
    >
      {icon && <span className="w-4 h-4">{icon as React.ReactNode}</span>}
      {label as string}
      {iconRight && <span className="w-4 h-4">{iconRight as React.ReactNode}</span>}
      {external && (
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      )}
      {children}
    </a>
  );
};
