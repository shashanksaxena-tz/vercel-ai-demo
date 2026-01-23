'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const ScrollArea = ({ element, children }: ComponentRenderProps) => {
  const {
    height,
    maxHeight,
    width,
    maxWidth,
    orientation = 'vertical',
    hideScrollbar = false,
    smooth = true,
    style
  } = element.props;

  const orientationClasses = {
    vertical: 'overflow-y-auto overflow-x-hidden',
    horizontal: 'overflow-x-auto overflow-y-hidden',
    both: 'overflow-auto',
  };

  return (
    <div
      className={cn(
        'relative',
        orientationClasses[(orientation as keyof typeof orientationClasses) || 'vertical'],
        (hideScrollbar as boolean) && 'scrollbar-hide',
        (smooth as boolean) && 'scroll-smooth'
      )}
      style={{
        height: height as string | number,
        maxHeight: maxHeight as string | number,
        width: width as string | number,
        maxWidth: maxWidth as string | number,
        ...(style as React.CSSProperties),
      }}
    >
      {children}
    </div>
  );
};
