'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Resizable = ({ element, children }: ComponentRenderProps) => {
  const {
    direction = 'both',
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    defaultWidth,
    defaultHeight,
    handlePosition = 'corner',
    showHandle = true,
    style
  } = element.props;

  const resizeClasses = {
    horizontal: 'resize-x',
    vertical: 'resize-y',
    both: 'resize',
    none: 'resize-none',
  };

  const handlePositionClasses = {
    corner: 'after:absolute after:bottom-0 after:right-0 after:w-4 after:h-4 after:cursor-se-resize',
    right: 'after:absolute after:top-0 after:right-0 after:w-2 after:h-full after:cursor-ew-resize',
    bottom: 'after:absolute after:bottom-0 after:left-0 after:w-full after:h-2 after:cursor-ns-resize',
  };

  return (
    <div
      className={cn(
        'overflow-auto relative',
        resizeClasses[(direction as keyof typeof resizeClasses) || 'both'],
        (showHandle as boolean) && 'after:content-[""]',
        (showHandle as boolean) && handlePositionClasses[(handlePosition as keyof typeof handlePositionClasses) || 'corner']
      )}
      style={{
        width: defaultWidth as string | number,
        height: defaultHeight as string | number,
        minWidth: minWidth as string | number,
        minHeight: minHeight as string | number,
        maxWidth: maxWidth as string | number,
        maxHeight: maxHeight as string | number,
        ...style as React.CSSProperties,
      }}
    >
      {children}
    </div>
  );
};
