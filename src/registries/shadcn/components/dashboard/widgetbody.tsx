'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const WidgetBody = ({ element, children }: ComponentRenderProps) => {
  const {
    padding = 'default',
    scrollable = false,
    maxHeight,
    style,
  } = element.props;

  const paddingStyles = {
    none: 'p-0',
    sm: 'px-4 py-2',
    default: 'px-6 py-4',
    lg: 'px-8 py-6',
  };

  return (
    <div
      className={cn(
        paddingStyles[(padding as keyof typeof paddingStyles) || 'default'],
        scrollable && 'overflow-y-auto'
      )}
      style={{
        maxHeight: maxHeight ? `${maxHeight}px` : undefined,
        ...(style as React.CSSProperties),
      }}
    >
      {children}
    </div>
  );
};
