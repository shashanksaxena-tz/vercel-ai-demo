'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const GlowButton = ({ element, onAction, children }: ComponentRenderProps) => {
  const { variant = 'default', size = 'default', label, action, disabled, glowColor = 'primary', className, style } = element.props;

  const sizes = {
    sm: 'h-8 px-3 text-xs',
    default: 'h-10 px-4 py-2',
    lg: 'h-12 px-8 text-lg',
  };

  const glowColors = {
    primary: 'shadow-primary/50 hover:shadow-primary',
    secondary: 'shadow-secondary/50 hover:shadow-secondary',
    accent: 'shadow-blue-500/50 hover:shadow-blue-500',
    success: 'shadow-green-500/50 hover:shadow-green-500',
    warning: 'shadow-yellow-500/50 hover:shadow-yellow-500',
    danger: 'shadow-red-500/50 hover:shadow-red-500',
  };

  const handleClick = () => {
    if (action && onAction) {
      onAction({ name: action as string });
    }
  };

  return (
    <button
      className={cn(
        'relative inline-flex items-center justify-center rounded-md font-medium',
        'bg-primary text-primary-foreground',
        'transition-all duration-500 ease-out',
        'shadow-lg hover:shadow-2xl',
        glowColors[(glowColor as keyof typeof glowColors)] || glowColors.primary,
        'hover:scale-105 active:scale-95',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        'before:absolute before:inset-0 before:rounded-md before:opacity-0',
        'before:bg-white/20 before:transition-opacity before:duration-300',
        'hover:before:opacity-100',
        sizes[(size as keyof typeof sizes)] || sizes.default,
        disabled && 'opacity-50 cursor-not-allowed hover:scale-100 hover:shadow-lg',
        className as string
      )}
      onClick={handleClick}
      disabled={disabled as boolean}
      style={style as React.CSSProperties}
    >
      <span className="relative z-10">{(label as string) || children}</span>
    </button>
  );
};
