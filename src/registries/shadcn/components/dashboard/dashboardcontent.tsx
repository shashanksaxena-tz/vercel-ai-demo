'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const DashboardContent = ({ element, children }: ComponentRenderProps) => {
  const {
    padding = 'default',
    maxWidth,
    centered = false,
    style,
  } = element.props;

  const paddingStyles = {
    none: 'p-0',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };

  return (
    <main
      className={cn(
        'flex-1 overflow-y-auto bg-muted/30',
        paddingStyles[(padding as keyof typeof paddingStyles) || 'default'],
        centered && 'flex flex-col items-center'
      )}
      style={{
        maxWidth: maxWidth ? `${maxWidth}px` : undefined,
        margin: centered ? '0 auto' : undefined,
        ...(style as React.CSSProperties),
      }}
    >
      {children}
    </main>
  );
};
