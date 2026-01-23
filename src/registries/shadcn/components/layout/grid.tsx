'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Grid = ({ element, children }: ComponentRenderProps) => {
  const {
    columns = 1,
    rows,
    gap = 4,
    columnGap,
    rowGap,
    align,
    justify,
    autoFlow,
    style
  } = element.props;

  const gapNum = typeof gap === 'number' ? gap : Number(gap) || 4;
  const colGapNum = columnGap !== undefined ? (typeof columnGap === 'number' ? columnGap : Number(columnGap)) : gapNum;
  const rowGapNum = rowGap !== undefined ? (typeof rowGap === 'number' ? rowGap : Number(rowGap)) : gapNum;

  const alignItems = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  };

  const justifyItems = {
    start: 'justify-items-start',
    center: 'justify-items-center',
    end: 'justify-items-end',
    stretch: 'justify-items-stretch',
  };

  const flowClasses = {
    row: 'grid-flow-row',
    column: 'grid-flow-col',
    dense: 'grid-flow-dense',
    'row-dense': 'grid-flow-row-dense',
    'col-dense': 'grid-flow-col-dense',
  };

  return (
    <div
      className={cn(
        'grid',
        align ? alignItems[align as keyof typeof alignItems] : undefined,
        justify ? justifyItems[justify as keyof typeof justifyItems] : undefined,
        autoFlow ? flowClasses[autoFlow as keyof typeof flowClasses] : undefined
      )}
      style={{
        gridTemplateColumns: typeof columns === 'string' ? columns : `repeat(${columns}, minmax(0, 1fr))`,
        gridTemplateRows: rows ? (typeof rows === 'string' ? rows : `repeat(${rows}, minmax(0, 1fr))`) : undefined,
        columnGap: `${colGapNum * 0.25}rem`,
        rowGap: `${rowGapNum * 0.25}rem`,
        ...style as React.CSSProperties,
      }}
    >
      {children}
    </div>
  );
};
