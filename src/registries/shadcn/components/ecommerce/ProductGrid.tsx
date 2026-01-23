'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const ProductGrid = ({ element, children }: ComponentRenderProps) => {
  const {
    columns = 4,
    gap = 'md',
    style,
  } = element.props;

  const gapSizes = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
  };

  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
    6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6',
  };

  return (
    <div
      className={cn(
        'grid',
        columnClasses[columns as keyof typeof columnClasses] || columnClasses[4],
        gapSizes[gap as keyof typeof gapSizes] || gapSizes.md
      )}
      style={style as React.CSSProperties}
    >
      {children}
    </div>
  );
};
