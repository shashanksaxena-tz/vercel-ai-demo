'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const FeatureList = ({ element, children }: ComponentRenderProps) => {
  const {
    direction = 'vertical',
    gap = 'md',
    className,
    style
  } = element.props;

  const gapStyles = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
  };

  return (
    <div
      className={cn(
        'flex',
        direction === 'horizontal' ? 'flex-row flex-wrap' : 'flex-col',
        gapStyles[gap as keyof typeof gapStyles] || gapStyles.md,
        className
      )}
      style={style as React.CSSProperties}
    >
      {children}
    </div>
  );
};
