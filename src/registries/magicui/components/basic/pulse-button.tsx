'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const PulseButton = ({ element, onAction, children }: ComponentRenderProps) => {
  const { variant = 'default', size = 'default', label, action, disabled, pulseColor = 'primary', className, style } = element.props;

  const sizes = {
    sm: 'h-8 px-3 text-xs',
    default: 'h-10 px-4 py-2',
    lg: 'h-12 px-8 text-lg',
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
        'transition-all duration-300',
        'hover:scale-105 active:scale-95',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        sizes[(size as keyof typeof sizes)] || sizes.default,
        disabled && 'opacity-50 cursor-not-allowed hover:scale-100',
        className as string
      )}
      onClick={handleClick}
      disabled={disabled as boolean}
      style={style as React.CSSProperties}
    >
      {/* Pulse rings */}
      <span className="absolute inset-0 rounded-md animate-ping bg-primary/30" style={{ animationDuration: '1.5s' }} />
      <span className="absolute inset-0 rounded-md animate-ping bg-primary/20" style={{ animationDuration: '2s', animationDelay: '0.5s' }} />
      <span className="relative z-10">{(label as string) || children}</span>
    </button>
  );
};
