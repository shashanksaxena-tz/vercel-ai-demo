'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const DashboardGrid = ({ element, children }: ComponentRenderProps) => {
  const {
    columns = 12,
    gap = 'default',
    responsive = true,
    style,
  } = element.props;

  const gapStyles = {
    none: 'gap-0',
    sm: 'gap-2',
    default: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
  };

  const responsiveClasses = responsive
    ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
    : '';

  return (
    <div
      className={cn(
        'grid',
        gapStyles[(gap as keyof typeof gapStyles) || 'default'],
        !responsive && `grid-cols-${columns}`,
        responsiveClasses
      )}
      style={{
        gridTemplateColumns: !responsive
          ? `repeat(${columns}, minmax(0, 1fr))`
          : undefined,
        ...(style as React.CSSProperties),
      }}
    >
      {children}
    </div>
  );
};
