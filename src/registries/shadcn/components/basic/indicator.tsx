'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Indicator = ({ element, children }: ComponentRenderProps) => {
  const {
    value,
    color = 'default',
    position = 'top-right',
    size = 'default',
    pulse = false,
    showZero = false,
    className,
    style
  } = element.props;

  const colors = {
    default: 'bg-foreground text-background',
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    success: 'bg-green-500 text-white',
    warning: 'bg-yellow-500 text-white',
    destructive: 'bg-destructive text-destructive-foreground',
  };

  const positions = {
    'top-right': '-top-1 -right-1',
    'top-left': '-top-1 -left-1',
    'bottom-right': '-bottom-1 -right-1',
    'bottom-left': '-bottom-1 -left-1',
  };

  const sizes = {
    sm: 'h-4 min-w-4 text-[10px]',
    default: 'h-5 min-w-5 text-xs',
    lg: 'h-6 min-w-6 text-sm',
  };

  const displayValue = value as number | string | undefined;
  const shouldShow = displayValue !== undefined && (showZero || displayValue !== 0);

  if (!shouldShow && !children) {
    return null;
  }

  return (
    <span className={cn('relative inline-flex', className as string)} style={style as React.CSSProperties}>
      {children}
      {shouldShow && (
        <span
          className={cn(
            'absolute flex items-center justify-center rounded-full px-1 font-medium',
            colors[(color as keyof typeof colors)] || colors.default,
            positions[(position as keyof typeof positions)] || positions['top-right'],
            sizes[(size as keyof typeof sizes)] || sizes.default,
            pulse && 'animate-pulse'
          )}
        >
          {displayValue}
        </span>
      )}
    </span>
  );
};
