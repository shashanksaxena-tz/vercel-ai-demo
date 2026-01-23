'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const PartnerGrid = ({ element, children }: ComponentRenderProps) => {
  const {
    columns = 5,
    gap = 'md',
    variant = 'default',
    className,
    style
  } = element.props;

  const gapStyles = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
  };

  const columnStyles = {
    3: 'grid-cols-2 sm:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-4',
    5: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5',
    6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
  };

  const variantStyles = {
    default: '',
    bordered: 'border rounded-xl p-8',
    filled: 'bg-muted rounded-xl p-8',
  };

  return (
    <div
      className={cn(
        'grid items-center justify-items-center',
        columnStyles[columns as keyof typeof columnStyles] || columnStyles[5],
        gapStyles[gap as keyof typeof gapStyles] || gapStyles.md,
        variantStyles[variant as keyof typeof variantStyles] || variantStyles.default,
        className
      )}
      style={style as React.CSSProperties}
    >
      {children}
    </div>
  );
};
