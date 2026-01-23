'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const ZStack = ({ element, children }: ComponentRenderProps) => {
  const {
    align = 'center',
    justify = 'center',
    width,
    height,
    style
  } = element.props;

  const alignItems = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  };

  const justifyContent = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
  };

  return (
    <div
      className={cn(
        'relative',
        alignItems[(align as keyof typeof alignItems) || 'center'],
        justifyContent[(justify as keyof typeof justifyContent) || 'center']
      )}
      style={{
        width: width as string | number,
        height: height as string | number,
        ...style as React.CSSProperties,
      }}
    >
      {React.Children.map(children, (child, index) => (
        <div
          key={index}
          className={cn(
            index === 0 ? 'relative' : 'absolute inset-0',
            'flex',
            alignItems[(align as keyof typeof alignItems) || 'center'],
            justifyContent[(justify as keyof typeof justifyContent) || 'center']
          )}
          style={{
            zIndex: index,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};
