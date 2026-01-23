'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Stack = ({ element, children }: ComponentRenderProps) => {
  const { direction = 'column', gap = 4, align, justify, wrap, style } = element.props;

  const gapNum = typeof gap === 'number' ? gap : Number(gap) || 4;
  const gapValue = `${gapNum * 0.25}rem`;

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
        direction === 'row' ? 'flex-row' : 'flex-col',
        align ? alignItems[align as keyof typeof alignItems] : undefined,
        justify ? justifyContent[justify as keyof typeof justifyContent] : undefined,
        (wrap as boolean) ? 'flex-wrap' : undefined
      )}
      style={{ gap: gapValue, ...style as React.CSSProperties }}
    >
      {children}
    </div>
  );
};
