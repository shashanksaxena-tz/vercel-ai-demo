'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Toaster = ({ element, children }: ComponentRenderProps) => {
  const {
    position = 'bottom-right',
    gap = 2,
    maxToasts = 5,
    className,
    style
  } = element.props;

  const positionStyles = {
    'top-left': 'top-4 left-4 items-start',
    'top-center': 'top-4 left-1/2 -translate-x-1/2 items-center',
    'top-right': 'top-4 right-4 items-end',
    'bottom-left': 'bottom-4 left-4 items-start',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2 items-center',
    'bottom-right': 'bottom-4 right-4 items-end',
  };

  const isTop = (position as string)?.startsWith('top');

  return (
    <div
      className={cn(
        'fixed z-50 flex flex-col pointer-events-none',
        `gap-${gap}`,
        positionStyles[(position as keyof typeof positionStyles) || 'bottom-right'],
        className as string
      )}
      style={style as React.CSSProperties}
      data-max-toasts={maxToasts}
    >
      <div className={cn('flex flex-col gap-2 pointer-events-auto', isTop ? 'flex-col' : 'flex-col-reverse')}>
        {children}
      </div>
    </div>
  );
};
