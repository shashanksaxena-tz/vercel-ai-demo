'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const CategoryGrid = ({ element, children }: ComponentRenderProps) => {
  const {
    columns = 4,
    gap = 'md',
    layout = 'uniform',
    style,
  } = element.props;

  const gapSizes = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
  };

  const columnClasses = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
    5: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5',
    6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6',
  };

  if (layout === 'featured') {
    return (
      <div
        className={cn('grid grid-cols-2 lg:grid-cols-4', gapSizes[gap as keyof typeof gapSizes] || gapSizes.md)}
        style={style as React.CSSProperties}
      >
        {React.Children.map(children, (child, index) => {
          if (index === 0) {
            return (
              <div className="col-span-2 row-span-2">
                {child}
              </div>
            );
          }
          return child;
        })}
      </div>
    );
  }

  if (layout === 'masonry') {
    return (
      <div
        className={cn(
          'columns-2 sm:columns-3 lg:columns-4',
          gapSizes[gap as keyof typeof gapSizes] || gapSizes.md
        )}
        style={style as React.CSSProperties}
      >
        {React.Children.map(children, (child) => (
          <div className="break-inside-avoid mb-4">{child}</div>
        ))}
      </div>
    );
  }

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
