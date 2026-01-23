'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const HStack = ({ element, children }: ComponentRenderProps) => {
  const {
    gap = 4,
    align = 'center',
    justify,
    wrap = false,
    reverse = false,
    divider = false,
    style
  } = element.props;

  const gapNum = typeof gap === 'number' ? gap : Number(gap) || 4;

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
        'flex',
        (reverse as boolean) ? 'flex-row-reverse' : 'flex-row',
        (wrap as boolean) && 'flex-wrap',
        alignItems[(align as keyof typeof alignItems) || 'center'],
        justify ? justifyContent[justify as keyof typeof justifyContent] : undefined,
        (divider as boolean) && '[&>*:not(:last-child)]:border-r [&>*:not(:last-child)]:pr-4 [&>*:not(:first-child)]:pl-4'
      )}
      style={{
        gap: (divider as boolean) ? undefined : `${gapNum * 0.25}rem`,
        ...style as React.CSSProperties,
      }}
    >
      {children}
    </div>
  );
};
