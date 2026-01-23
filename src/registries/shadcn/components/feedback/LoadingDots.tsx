'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const LoadingDots = ({ element }: ComponentRenderProps) => {
  const {
    size = 'default',
    color = 'primary',
    count = 3,
    speed = 'normal',
    className,
    style
  } = element.props;

  const sizeStyles = {
    xs: 'h-1 w-1',
    sm: 'h-1.5 w-1.5',
    default: 'h-2 w-2',
    lg: 'h-3 w-3',
    xl: 'h-4 w-4',
  };

  const colorStyles = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    muted: 'bg-muted-foreground',
    white: 'bg-white',
    current: 'bg-current',
  };

  const speedStyles = {
    slow: '1.5s',
    normal: '1s',
    fast: '0.6s',
  };

  const dotCount = Math.min(Math.max(count as number, 2), 5);
  const dots = Array.from({ length: dotCount });

  return (
    <div
      className={cn('flex items-center gap-1', className as string)}
      style={style as React.CSSProperties}
      role="status"
      aria-label="Loading"
    >
      {dots.map((_, i) => (
        <div
          key={i}
          className={cn(
            'rounded-full animate-bounce',
            sizeStyles[(size as keyof typeof sizeStyles) || 'default'],
            colorStyles[(color as keyof typeof colorStyles) || 'primary']
          )}
          style={{
            animationDelay: `${i * (1000 / dotCount / 3)}ms`,
            animationDuration: speedStyles[(speed as keyof typeof speedStyles) || 'normal'],
          }}
        />
      ))}
    </div>
  );
};
