'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const SkeletonText = ({ element }: ComponentRenderProps) => {
  const {
    lines = 3,
    gap = 2,
    animated = true,
    lastLineWidth = '75%',
    className,
    style
  } = element.props;

  const lineCount = lines as number;
  const gapValue = gap as number;
  const lineItems = Array.from({ length: lineCount });

  return (
    <div
      className={cn('flex flex-col', `gap-${gapValue}`, className as string)}
      style={style as React.CSSProperties}
    >
      {lineItems.map((_, index) => (
        <div
          key={index}
          className={cn(
            'h-4 bg-muted rounded',
            animated ? 'animate-pulse' : ''
          )}
          style={{
            width: index === lineCount - 1 ? (lastLineWidth as string) : '100%',
          }}
        />
      ))}
    </div>
  );
};
