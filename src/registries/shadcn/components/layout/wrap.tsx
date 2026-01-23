'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Wrap = ({ element, children }: ComponentRenderProps) => {
  const {
    gap = 4,
    rowGap,
    columnGap,
    align,
    justify,
    direction = 'row',
    style
  } = element.props;

  const gapNum = typeof gap === 'number' ? gap : Number(gap) || 4;
  const rowGapNum = rowGap !== undefined ? (typeof rowGap === 'number' ? rowGap : Number(rowGap)) : gapNum;
  const colGapNum = columnGap !== undefined ? (typeof columnGap === 'number' ? columnGap : Number(columnGap)) : gapNum;

  const alignItems = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
    baseline: 'items-baseline',
  };

  const justifyContent = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  };

  return (
    <div
      className={cn(
        'flex flex-wrap',
        direction === 'column' && 'flex-col',
        direction === 'row-reverse' && 'flex-row-reverse',
        direction === 'column-reverse' && 'flex-col-reverse',
        align ? alignItems[align as keyof typeof alignItems] : undefined,
        justify ? justifyContent[justify as keyof typeof justifyContent] : undefined
      )}
      style={{
        rowGap: `${rowGapNum * 0.25}rem`,
        columnGap: `${colGapNum * 0.25}rem`,
        ...style as React.CSSProperties,
      }}
    >
      {children}
    </div>
  );
};
