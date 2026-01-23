'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Rows = ({ element, children }: ComponentRenderProps) => {
  const {
    count,
    gap = 4,
    minRowHeight,
    autoRows = 'auto',
    align,
    style
  } = element.props;

  const gapNum = typeof gap === 'number' ? gap : Number(gap) || 4;

  const alignItems = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  };

  const autoRowsClasses = {
    auto: 'auto-rows-auto',
    min: 'auto-rows-min',
    max: 'auto-rows-max',
    fr: 'auto-rows-fr',
  };

  return (
    <div
      className={cn(
        'grid grid-flow-row',
        align ? alignItems[align as keyof typeof alignItems] : undefined,
        !minRowHeight && autoRowsClasses[(autoRows as keyof typeof autoRowsClasses) || 'auto']
      )}
      style={{
        gridTemplateRows: count ? `repeat(${count}, minmax(0, 1fr))` : undefined,
        gridAutoRows: minRowHeight ? `minmax(${minRowHeight}, auto)` : undefined,
        gap: `${gapNum * 0.25}rem`,
        ...style as React.CSSProperties,
      }}
    >
      {children}
    </div>
  );
};
