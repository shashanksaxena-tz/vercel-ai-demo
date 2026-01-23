'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const NotificationBadge = ({ element, children }: ComponentRenderProps) => {
  const {
    count,
    max = 99,
    showZero = false,
    variant = 'default',
    size = 'default',
    position = 'top-right',
    dot = false,
    pulse = false,
    style,
  } = element.props;

  const countNum = Number(count) || 0;

  if (!showZero && countNum === 0 && !dot) {
    return <>{children}</>;
  }

  const variantStyles = {
    default: 'bg-primary text-primary-foreground',
    destructive: 'bg-destructive text-destructive-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    success: 'bg-emerald-500 text-white',
    warning: 'bg-amber-500 text-white',
  };

  const sizeStyles = {
    sm: dot ? 'h-2 w-2' : 'h-4 min-w-4 text-[10px] px-1',
    default: dot ? 'h-2.5 w-2.5' : 'h-5 min-w-5 text-xs px-1.5',
    lg: dot ? 'h-3 w-3' : 'h-6 min-w-6 text-sm px-2',
  };

  const positionStyles = {
    'top-right': '-top-1 -right-1',
    'top-left': '-top-1 -left-1',
    'bottom-right': '-bottom-1 -right-1',
    'bottom-left': '-bottom-1 -left-1',
  };

  const displayCount = countNum > Number(max) ? `${max}+` : countNum;

  return (
    <div className="relative inline-flex" style={style as React.CSSProperties}>
      {children}
      <span
        className={cn(
          'absolute flex items-center justify-center rounded-full font-medium leading-none',
          variantStyles[(variant as keyof typeof variantStyles) || 'default'],
          sizeStyles[(size as keyof typeof sizeStyles) || 'default'],
          positionStyles[(position as keyof typeof positionStyles) || 'top-right'],
          pulse && 'animate-pulse'
        )}
      >
        {!dot && (displayCount as React.ReactNode)}
      </span>
    </div>
  );
};
