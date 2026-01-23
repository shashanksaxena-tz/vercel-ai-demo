'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Dot = ({ element }: ComponentRenderProps) => {
  const { color = 'default', size = 'default', pulse = false, className, style } = element.props;

  const colors = {
    default: 'bg-foreground',
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    destructive: 'bg-destructive',
    muted: 'bg-muted-foreground',
  };

  const sizes = {
    xs: 'h-1.5 w-1.5',
    sm: 'h-2 w-2',
    default: 'h-2.5 w-2.5',
    lg: 'h-3 w-3',
    xl: 'h-4 w-4',
  };

  return (
    <span
      className={cn(
        'inline-block rounded-full',
        colors[(color as keyof typeof colors)] || colors.default,
        sizes[(size as keyof typeof sizes)] || sizes.default,
        pulse && 'animate-pulse',
        className as string
      )}
      style={style as React.CSSProperties}
      aria-hidden="true"
    />
  );
};
