'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Page = ({ element, children }: ComponentRenderProps) => {
  const {
    padding = 4,
    maxWidth = '7xl',
    centered = true,
    background,
    minHeight = '100vh',
    style
  } = element.props;

  const paddingNum = typeof padding === 'number' ? padding : Number(padding) || 4;

  const maxWidthClasses = {
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
  };

  const backgroundClasses = {
    default: 'bg-background',
    muted: 'bg-muted',
    card: 'bg-card',
  };

  return (
    <div
      className={cn(
        'w-full flex flex-col',
        (centered as boolean) && 'mx-auto',
        (maxWidth as string) && maxWidthClasses[maxWidth as keyof typeof maxWidthClasses],
        background ? backgroundClasses[background as keyof typeof backgroundClasses] : 'bg-background'
      )}
      style={{
        minHeight: minHeight as string,
        padding: `${paddingNum * 0.25}rem`,
        ...style as React.CSSProperties,
      }}
    >
      {children}
    </div>
  );
};
