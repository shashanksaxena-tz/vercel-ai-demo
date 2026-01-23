'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const RequiredIndicator = ({ element }: ComponentRenderProps) => {
  const {
    symbol = '*',
    color = 'destructive',
    showLabel = false,
    label = 'Required',
    size = 'default',
    style
  } = element.props;

  const colorStyles = {
    destructive: 'text-destructive',
    primary: 'text-primary',
    muted: 'text-muted-foreground',
  };

  const sizeStyles = {
    sm: 'text-xs',
    default: 'text-sm',
    lg: 'text-base',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center',
        colorStyles[(color as keyof typeof colorStyles) || 'destructive'],
        sizeStyles[(size as keyof typeof sizeStyles) || 'default']
      )}
      style={style as React.CSSProperties}
      aria-label={label as string}
    >
      {symbol as string}
      {showLabel && (
        <span className="ml-1 text-muted-foreground">{label as string}</span>
      )}
    </span>
  );
};
