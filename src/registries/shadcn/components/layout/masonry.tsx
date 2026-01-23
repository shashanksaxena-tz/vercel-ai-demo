'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Masonry = ({ element, children }: ComponentRenderProps) => {
  const {
    columns = 3,
    gap = 4,
    columnWidth,
    style
  } = element.props;

  const gapNum = typeof gap === 'number' ? gap : Number(gap) || 4;

  return (
    <div
      className={cn('w-full')}
      style={{
        columnCount: columns as number,
        columnGap: `${gapNum * 0.25}rem`,
        columnWidth: columnWidth as string,
        ...style as React.CSSProperties,
      }}
    >
      {React.Children.map(children, (child, index) => (
        <div
          key={index}
          className="break-inside-avoid"
          style={{
            marginBottom: `${gapNum * 0.25}rem`,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};
