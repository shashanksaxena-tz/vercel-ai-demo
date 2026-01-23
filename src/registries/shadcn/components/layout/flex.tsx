'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Flex = ({ element, children }: ComponentRenderProps) => {
  const {
    direction = 'row',
    wrap = false,
    gap = 0,
    align,
    justify,
    inline = false,
    grow,
    shrink,
    basis,
    style
  } = element.props;

  const gapNum = typeof gap === 'number' ? gap : Number(gap) || 0;

  const directionClasses = {
    row: 'flex-row',
    'row-reverse': 'flex-row-reverse',
    column: 'flex-col',
    'column-reverse': 'flex-col-reverse',
  };

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

  const wrapClasses = {
    true: 'flex-wrap',
    false: 'flex-nowrap',
    reverse: 'flex-wrap-reverse',
  };

  return (
    <div
      className={cn(
        (inline as boolean) ? 'inline-flex' : 'flex',
        directionClasses[(direction as keyof typeof directionClasses) || 'row'],
        wrapClasses[String(wrap) as keyof typeof wrapClasses] || 'flex-nowrap',
        align ? alignItems[align as keyof typeof alignItems] : undefined,
        justify ? justifyContent[justify as keyof typeof justifyContent] : undefined
      )}
      style={{
        gap: gapNum ? `${gapNum * 0.25}rem` : undefined,
        flexGrow: grow as number,
        flexShrink: shrink as number,
        flexBasis: basis as string | number,
        ...style as React.CSSProperties,
      }}
    >
      {children}
    </div>
  );
};
