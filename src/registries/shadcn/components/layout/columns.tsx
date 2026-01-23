'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Columns = ({ element, children }: ComponentRenderProps) => {
  const {
    count = 2,
    gap = 4,
    width,
    fill = 'auto',
    style
  } = element.props;

  const gapNum = typeof gap === 'number' ? gap : Number(gap) || 4;

  const fillClasses = {
    auto: '',
    balance: '',
  };

  return (
    <div
      className={cn(
        fillClasses[(fill as keyof typeof fillClasses) || 'auto']
      )}
      style={{
        columnCount: count as number,
        columnGap: `${gapNum * 0.25}rem`,
        columnWidth: width as string,
        columnFill: fill as 'auto' | 'balance',
        ...style as React.CSSProperties,
      }}
    >
      {children}
    </div>
  );
};
