'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const ReviewList = ({ element, children }: ComponentRenderProps) => {
  const {
    gap = 'md',
    showDividers = true,
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
        'flex flex-col',
        gapStyles[gap as keyof typeof gapStyles] || gapStyles.md,
        showDividers && 'divide-y',
        className
      )}
      style={style as React.CSSProperties}
    >
      {React.Children.map(children, (child, index) => (
        <div className={cn(index > 0 && showDividers && 'pt-6')}>
          {child}
        </div>
      ))}
    </div>
  );
};
