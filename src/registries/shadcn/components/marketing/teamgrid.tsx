'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const TeamGrid = ({ element, children }: ComponentRenderProps) => {
  const {
    columns = 4,
    gap = 'md',
    className,
    style
  } = element.props;

  const gapStyles = {
    sm: 'gap-4',
    md: 'gap-6 md:gap-8',
    lg: 'gap-8 md:gap-12',
  };

  const columnStyles = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
    5: 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
    6: 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
  };

  return (
    <div
      className={cn(
        'grid grid-cols-1',
        columnStyles[columns as keyof typeof columnStyles] || columnStyles[4],
        gapStyles[gap as keyof typeof gapStyles] || gapStyles.md,
        className
      )}
      style={style as React.CSSProperties}
    >
      {children}
    </div>
  );
};
