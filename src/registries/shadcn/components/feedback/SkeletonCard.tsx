'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const SkeletonCard = ({ element }: ComponentRenderProps) => {
  const {
    showImage = true,
    showTitle = true,
    showDescription = true,
    showFooter = false,
    imageHeight = 200,
    animated = true,
    className,
    style
  } = element.props;

  const animatedClass = animated ? 'animate-pulse' : '';

  return (
    <div
      className={cn(
        'bg-background rounded-lg border overflow-hidden',
        className as string
      )}
      style={style as React.CSSProperties}
    >
      {showImage ? (
        <div
          className={cn('bg-muted w-full', animatedClass)}
          style={{ height: `${imageHeight as number}px` }}
        />
      ) : null}
      <div className="p-4 space-y-3">
        {showTitle ? (
          <div
            className={cn('h-5 bg-muted rounded w-3/4', animatedClass)}
          />
        ) : null}
        {showDescription ? (
          <div className="space-y-2">
            <div
              className={cn('h-4 bg-muted rounded w-full', animatedClass)}
            />
            <div
              className={cn('h-4 bg-muted rounded w-5/6', animatedClass)}
            />
          </div>
        ) : null}
        {showFooter ? (
          <div className="pt-2 flex items-center gap-2">
            <div
              className={cn('h-8 w-8 bg-muted rounded-full', animatedClass)}
            />
            <div className="flex-1 space-y-1">
              <div
                className={cn('h-3 bg-muted rounded w-1/2', animatedClass)}
              />
              <div
                className={cn('h-3 bg-muted rounded w-1/3', animatedClass)}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
