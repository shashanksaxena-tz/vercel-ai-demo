'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Skip = ({ element, children }: ComponentRenderProps) => {
  const {
    label = 'Skip to main content',
    href = '#main',
    style
  } = element.props;

  return (
    <a
      href={href as string}
      className={cn(
        'sr-only focus:not-sr-only focus:absolute focus:z-50',
        'focus:top-4 focus:left-4 focus:px-4 focus:py-2',
        'focus:bg-background focus:border focus:rounded-md focus:shadow-lg',
        'focus:text-foreground focus:font-medium focus:text-sm',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
      )}
      style={style as React.CSSProperties}
    >
      {label as string}
      {children}
    </a>
  );
};
