'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const VStack = ({ element, children }: ComponentRenderProps) => {
  const {
    gap = 4,
    align = 'stretch',
    justify,
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
        (reverse as boolean) ? 'flex-col-reverse' : 'flex-col',
        alignItems[(align as keyof typeof alignItems) || 'stretch'],
        justify ? justifyContent[justify as keyof typeof justifyContent] : undefined,
        (divider as boolean) && '[&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:pb-4 [&>*:not(:first-child)]:pt-4'
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
