'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Separator = ({ element }: ComponentRenderProps) => {
  const { orientation = 'horizontal', decorative = true, className, style } = element.props;

  const isHorizontal = orientation === 'horizontal';

  return (
    <div
      role={decorative ? 'none' : 'separator'}
      aria-orientation={decorative ? undefined : (orientation as 'horizontal' | 'vertical')}
      className={cn(
        'shrink-0 bg-border',
        isHorizontal ? 'h-[1px] w-full' : 'h-full w-[1px]',
        className as string
      )}
      style={style as React.CSSProperties}
    />
  );
};
