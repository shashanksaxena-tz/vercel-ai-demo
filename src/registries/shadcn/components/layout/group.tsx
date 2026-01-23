'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Group = ({ element, children }: ComponentRenderProps) => {
  const {
    gap = 2,
    align = 'center',
    justify,
    wrap = false,
    grow = false,
    preventGrowOverflow = true,
    style
  } = element.props;

  const gapNum = typeof gap === 'number' ? gap : Number(gap) || 2;

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
        'flex flex-row',
        (wrap as boolean) && 'flex-wrap',
        alignItems[(align as keyof typeof alignItems) || 'center'],
        justify ? justifyContent[justify as keyof typeof justifyContent] : undefined,
        (grow as boolean) && '[&>*]:flex-grow',
        (grow as boolean) && (preventGrowOverflow as boolean) && '[&>*]:min-w-0'
      )}
      style={{
        gap: `${gapNum * 0.25}rem`,
        ...style as React.CSSProperties,
      }}
    >
      {children}
    </div>
  );
};
