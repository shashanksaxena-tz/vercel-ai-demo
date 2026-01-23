'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const ProductList = ({ element, children }: ComponentRenderProps) => {
  const {
    gap = 'md',
    divided = true,
    style,
  } = element.props;

  const gapSizes = {
    sm: 'space-y-2',
    md: 'space-y-4',
    lg: 'space-y-6',
  };

  return (
    <div
      className={cn(
        gapSizes[gap as keyof typeof gapSizes] || gapSizes.md,
        divided && 'divide-y divide-border'
      )}
      style={style as React.CSSProperties}
    >
      {children}
    </div>
  );
};
