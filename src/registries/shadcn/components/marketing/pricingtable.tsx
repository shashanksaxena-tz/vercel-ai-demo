'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const PricingTable = ({ element, children }: ComponentRenderProps) => {
  const {
    columns = 3,
    gap = 'md',
    equalHeight = true,
    className,
    style
  } = element.props;

  const gapStyles = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
  };

  const columnStyles = {
    2: 'lg:grid-cols-2',
    3: 'lg:grid-cols-3',
    4: 'lg:grid-cols-4',
  };

  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2',
        columnStyles[columns as keyof typeof columnStyles] || columnStyles[3],
        gapStyles[gap as keyof typeof gapStyles] || gapStyles.md,
        equalHeight && 'items-stretch',
        className
      )}
      style={style as React.CSSProperties}
    >
      {children}
    </div>
  );
};
