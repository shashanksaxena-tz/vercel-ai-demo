'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const SimpleGrid = ({ element, children }: ComponentRenderProps) => {
  const {
    columns = 2,
    minChildWidth,
    gap = 4,
    rowGap,
    columnGap,
    style
  } = element.props;

  const gapNum = typeof gap === 'number' ? gap : Number(gap) || 4;
  const rowGapNum = rowGap !== undefined ? (typeof rowGap === 'number' ? rowGap : Number(rowGap)) : gapNum;
  const colGapNum = columnGap !== undefined ? (typeof columnGap === 'number' ? columnGap : Number(columnGap)) : gapNum;

  const templateColumns = minChildWidth
    ? `repeat(auto-fit, minmax(${minChildWidth}, 1fr))`
    : `repeat(${columns}, minmax(0, 1fr))`;

  return (
    <div
      className={cn('grid')}
      style={{
        gridTemplateColumns: templateColumns,
        rowGap: `${rowGapNum * 0.25}rem`,
        columnGap: `${colGapNum * 0.25}rem`,
        ...style as React.CSSProperties,
      }}
    >
      {children}
    </div>
  );
};
