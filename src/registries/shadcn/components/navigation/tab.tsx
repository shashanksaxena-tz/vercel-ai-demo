'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Tab = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    label,
    value,
    icon,
    active,
    disabled,
    badge,
    variant = 'default',
    style
  } = element.props;

  const variants = {
    default: {
      base: 'px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
      active: 'bg-background text-foreground shadow-sm',
      inactive: 'text-muted-foreground hover:text-foreground',
    },
    underline: {
      base: 'px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors',
      active: 'border-primary text-foreground',
      inactive: 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted',
    },
    pills: {
      base: 'px-4 py-2 text-sm font-medium rounded-full transition-colors',
      active: 'bg-primary text-primary-foreground',
      inactive: 'text-muted-foreground hover:bg-muted hover:text-foreground',
    },
  };

  const variantStyles = variants[variant as keyof typeof variants] || variants.default;

  const handleClick = () => {
    if (!disabled) {
      onAction?.({ name: 'tabSelect', payload: { value } } as never);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        variantStyles.base,
        active ? variantStyles.active : variantStyles.inactive,
        disabled && 'opacity-50 pointer-events-none'
      )}
      style={style as React.CSSProperties}
      role="tab"
      aria-selected={active as boolean}
      aria-disabled={disabled as boolean}
    >
      <span className="flex items-center gap-2">
        {icon && <span className="w-4 h-4">{icon as React.ReactNode}</span>}
        {label as string}
        {badge && (
          <span className="ml-1 px-1.5 py-0.5 text-xs bg-primary/10 text-primary rounded-full">
            {badge as string}
          </span>
        )}
        {children}
      </span>
    </button>
  );
};
