'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Badge = ({ element, children }: ComponentRenderProps) => {
  const { variant = 'default', label, className, style } = element.props;

  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/80',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/80',
    outline: 'text-foreground border border-input',
    success: 'bg-green-500 text-white hover:bg-green-500/80',
    warning: 'bg-yellow-500 text-white hover:bg-yellow-500/80',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        variants[(variant as keyof typeof variants)] || variants.default,
        className as string
      )}
      style={style as React.CSSProperties}
    >
      {(label as string) || children}
    </span>
  );
};
