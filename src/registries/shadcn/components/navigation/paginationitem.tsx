'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const PaginationItem = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    page,
    active,
    disabled,
    variant = 'default',
    size = 'default',
    type = 'page',
    style
  } = element.props;

  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    default: 'h-9 w-9 text-sm',
    lg: 'h-10 w-10 text-base',
  };

  const variantClasses = {
    default: 'border hover:bg-muted',
    outline: 'border-2',
    ghost: 'hover:bg-muted',
    filled: 'bg-muted hover:bg-muted/80',
  };

  const handleClick = () => {
    if (!disabled) {
      onAction?.({ name: 'pageChange', payload: { page } } as never);
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'first':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        );
      case 'last':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        );
      case 'prev':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        );
      case 'next':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        );
      case 'dots':
        return <span>...</span>;
      default:
        return page;
    }
  };

  if (type === 'dots') {
    return (
      <span className="px-2 text-muted-foreground" style={style as React.CSSProperties}>
        ...
      </span>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled as boolean}
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium transition-colors',
        'disabled:opacity-50 disabled:pointer-events-none',
        sizeClasses[size as keyof typeof sizeClasses] || sizeClasses.default,
        variantClasses[variant as keyof typeof variantClasses] || variantClasses.default,
        active && 'bg-primary text-primary-foreground hover:bg-primary/90'
      )}
      style={style as React.CSSProperties}
      aria-current={active ? 'page' : undefined}
    >
      {getIcon()}
      {children}
    </button>
  );
};
