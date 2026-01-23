'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Placeholder = ({ element, children }: ComponentRenderProps) => {
  const {
    width = '100%',
    height = 200,
    label,
    variant = 'default',
    rounded = 'default',
    dashed = true,
    className,
    style
  } = element.props;

  const variantStyles = {
    default: 'bg-muted/50 border-muted-foreground/30',
    primary: 'bg-primary/10 border-primary/30',
    secondary: 'bg-secondary/10 border-secondary/30',
    success: 'bg-green-500/10 border-green-500/30',
    warning: 'bg-yellow-500/10 border-yellow-500/30',
    error: 'bg-red-500/10 border-red-500/30',
  };

  const roundedStyles = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    default: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
  };

  return (
    <div
      className={cn(
        'flex items-center justify-center border-2',
        dashed ? 'border-dashed' : '',
        variantStyles[(variant as keyof typeof variantStyles) || 'default'],
        roundedStyles[(rounded as keyof typeof roundedStyles) || 'default'],
        className as string
      )}
      style={{
        width: typeof width === 'number' ? `${width}px` : (width as string),
        height: typeof height === 'number' ? `${height}px` : (height as string),
        ...style as React.CSSProperties,
      }}
    >
      {children ? children : (
        label ? (
          <span className="text-sm text-muted-foreground">{label as string}</span>
        ) : null
      )}
    </div>
  );
};
