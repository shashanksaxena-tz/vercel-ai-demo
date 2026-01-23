'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const TestimonialGrid = ({ element, children }: ComponentRenderProps) => {
  const {
    columns = 3,
    gap = 'md',
    layout = 'grid',
    className,
    style
  } = element.props;

  const gapStyles = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
  };

  const columnStyles = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  if (layout === 'masonry') {
    return (
      <div
        className={cn(
          'columns-1 md:columns-2 lg:columns-3',
          gapStyles[gap as keyof typeof gapStyles] || gapStyles.md,
          className
        )}
        style={style as React.CSSProperties}
      >
        {React.Children.map(children, (child) => (
          <div className="break-inside-avoid mb-6">{child}</div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'grid grid-cols-1',
        columnStyles[columns as keyof typeof columnStyles] || columnStyles[3],
        gapStyles[gap as keyof typeof gapStyles] || gapStyles.md,
        className
      )}
      style={style as React.CSSProperties}
    >
      {children}
    </div>
  );
};
