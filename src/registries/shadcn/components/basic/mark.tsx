'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Mark = ({ element, children }: ComponentRenderProps) => {
  const { content, variant = 'default', className, style } = element.props;

  const variants = {
    default: 'bg-yellow-200 dark:bg-yellow-800',
    primary: 'bg-primary/20',
    secondary: 'bg-secondary',
    success: 'bg-green-200 dark:bg-green-800',
    warning: 'bg-orange-200 dark:bg-orange-800',
    destructive: 'bg-destructive/20',
  };

  return (
    <mark
      className={cn(
        'px-1 rounded',
        variants[(variant as keyof typeof variants)] || variants.default,
        className as string
      )}
      style={style as React.CSSProperties}
    >
      {(content as React.ReactNode) || children}
    </mark>
  );
};
