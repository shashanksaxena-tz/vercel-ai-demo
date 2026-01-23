'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Main = ({ element, children }: ComponentRenderProps) => {
  const {
    padding = 4,
    maxWidth,
    centered = false,
    background,
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
    prose: 'max-w-prose',
  };

  const backgroundClasses = {
    default: '',
    muted: 'bg-muted',
    card: 'bg-card',
    background: 'bg-background',
  };

  return (
    <main
      className={cn(
        'flex-1 w-full',
        (centered as boolean) && 'mx-auto',
        maxWidth ? maxWidthClasses[maxWidth as keyof typeof maxWidthClasses] : undefined,
        background ? backgroundClasses[background as keyof typeof backgroundClasses] : undefined
      )}
      style={{
        padding: `${paddingNum * 0.25}rem`,
        ...style as React.CSSProperties,
      }}
    >
      {children}
    </main>
  );
};
