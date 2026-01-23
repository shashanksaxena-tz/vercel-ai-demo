'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const WidgetGrid = ({ element, children }: ComponentRenderProps) => {
  const {
    columns = 3,
    gap = 'default',
    minChildWidth,
    style,
  } = element.props;

  const gapStyles = {
    none: 'gap-0',
    sm: 'gap-2',
    default: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
  };

  return (
    <div
      className={cn(
        'grid',
        gapStyles[(gap as keyof typeof gapStyles) || 'default']
      )}
      style={{
        gridTemplateColumns: minChildWidth
          ? `repeat(auto-fit, minmax(${minChildWidth}px, 1fr))`
          : `repeat(${columns}, minmax(0, 1fr))`,
        ...(style as React.CSSProperties),
      }}
    >
      {children}
    </div>
  );
};
