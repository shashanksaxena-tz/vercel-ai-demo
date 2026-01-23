'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export const Spinner = ({ element }: ComponentRenderProps) => {
  const {
    size = 'default',
    variant = 'default',
    label,
    className,
    style
  } = element.props;

  const sizeStyles = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    default: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12',
  };

  const variantStyles = {
    default: 'text-primary',
    muted: 'text-muted-foreground',
    white: 'text-white',
    current: 'text-current',
  };

  if (label) {
    return (
      <div
        className={cn('flex items-center gap-2', className as string)}
        style={style as React.CSSProperties}
        role="status"
        aria-label={label as string}
      >
        <Loader2
          className={cn(
            'animate-spin',
            sizeStyles[(size as keyof typeof sizeStyles) || 'default'],
            variantStyles[(variant as keyof typeof variantStyles) || 'default']
          )}
        />
        <span className="text-sm text-muted-foreground">{label as string}</span>
      </div>
    );
  }

  return (
    <Loader2
      className={cn(
        'animate-spin',
        sizeStyles[(size as keyof typeof sizeStyles) || 'default'],
        variantStyles[(variant as keyof typeof variantStyles) || 'default'],
        className as string
      )}
      style={style as React.CSSProperties}
      role="status"
      aria-label="Loading"
    />
  );
};
