'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Container = ({ element, children }: ComponentRenderProps) => {
  const {
    maxWidth = '7xl',
    padding = 4,
    centerContent = false,
    style
  } = element.props;

  const maxWidthClass = {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
    full: 'max-w-full',
    prose: 'max-w-prose',
    screen: 'max-w-screen-xl',
  }[maxWidth as string] || 'max-w-7xl';

  const paddingNum = typeof padding === 'number' ? padding : Number(padding) || 4;

  return (
    <div
      className={cn(
        'mx-auto w-full',
        maxWidthClass,
        (centerContent as boolean) && 'flex flex-col items-center'
      )}
      style={{
        paddingLeft: `${paddingNum * 0.25}rem`,
        paddingRight: `${paddingNum * 0.25}rem`,
        ...style as React.CSSProperties
      }}
    >
      {children}
    </div>
  );
};
