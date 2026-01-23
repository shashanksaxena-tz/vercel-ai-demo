'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Split = ({ element, children }: ComponentRenderProps) => {
  const {
    direction = 'horizontal',
    sizes,
    minSizes,
    gap = 0,
    gutterSize = 4,
    showGutter = false,
    style
  } = element.props;

  const gapNum = typeof gap === 'number' ? gap : Number(gap) || 0;
  const gutterNum = typeof gutterSize === 'number' ? gutterSize : Number(gutterSize) || 4;

  const sizesArray = (sizes as number[]) || [50, 50];
  const minSizesArray = minSizes as number[];

  return (
    <div
      className={cn(
        'flex w-full h-full',
        direction === 'vertical' ? 'flex-col' : 'flex-row'
      )}
      style={{
        gap: gapNum ? `${gapNum * 0.25}rem` : undefined,
        ...style as React.CSSProperties,
      }}
    >
      {React.Children.map(children, (child, index) => {
        const size = sizesArray[index] || 'auto';
        const minSize = minSizesArray?.[index];
        const isLast = index === React.Children.count(children) - 1;

        return (
          <React.Fragment key={index}>
            <div
              className="relative"
              style={{
                [direction === 'vertical' ? 'height' : 'width']: typeof size === 'number' ? `${size}%` : size,
                [direction === 'vertical' ? 'minHeight' : 'minWidth']: minSize,
              }}
            >
              {child}
            </div>
            {(showGutter as boolean) && !isLast && (
              <div
                className={cn(
                  'bg-border shrink-0',
                  direction === 'vertical'
                    ? 'h-1 w-full cursor-row-resize hover:bg-primary/50'
                    : 'w-1 h-full cursor-col-resize hover:bg-primary/50'
                )}
                style={{
                  [direction === 'vertical' ? 'height' : 'width']: `${gutterNum}px`,
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
