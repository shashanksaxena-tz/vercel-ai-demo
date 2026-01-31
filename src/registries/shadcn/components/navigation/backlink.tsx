'use client';
// @ts-nocheck

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const BackLink = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    label = 'Back',
    href,
    action,
    icon,
    variant = 'default',
    size = 'default',
    style
  } = element.props;

  const variants = {
    default: 'text-muted-foreground hover:text-foreground',
    primary: 'text-primary hover:text-primary/80',
    subtle: 'text-muted-foreground/70 hover:text-muted-foreground',
  };

  const sizes = {
    sm: 'text-xs gap-1',
    default: 'text-sm gap-2',
    lg: 'text-base gap-2',
  };

  const handleClick = (e: React.MouseEvent) => {
    if (action) {
      e.preventDefault();
      onAction?.({ name: action as string });
    } else if (!href) {
      e.preventDefault();
      window.history.back();
    }
  };

  return (
    <a
      href={(href as string) || '#'}
      onClick={handleClick}
      className={cn(
        'inline-flex items-center font-medium transition-colors',
        variants[variant as keyof typeof variants] || variants.default,
        sizes[size as keyof typeof sizes] || sizes.default
      )}
      style={style as React.CSSProperties}
    >
      {icon || (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      )}
      <span>{label as string}</span>
      {children}
    </a>
  );
};
