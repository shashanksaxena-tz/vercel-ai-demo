'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Button = ({ element, onAction, children }: ComponentRenderProps) => {
  const { variant = 'default', size = 'default', label, action, disabled, loading, icon, className, style } = element.props;

  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'text-primary underline-offset-4 hover:underline',
  };

  const sizes = {
    sm: 'h-8 px-3 text-xs',
    default: 'h-10 px-4 py-2',
    lg: 'h-12 px-8 text-lg',
    icon: 'h-10 w-10',
  };

  const handleClick = () => {
    if (action && onAction) {
      onAction({ name: action as string });
    }
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        variants[(variant as keyof typeof variants)] || variants.default,
        sizes[(size as keyof typeof sizes)] || sizes.default,
        disabled && 'opacity-50 cursor-not-allowed',
        className as string
      )}
      onClick={handleClick}
      disabled={disabled as boolean}
      style={style as React.CSSProperties}
    >
      {loading && <span className="mr-2 animate-spin">&#8987;</span>}
      {icon && <span className="mr-2">{icon as React.ReactNode}</span>}
      {(label as string) || children}
    </button>
  );
};
