'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Fixed = ({ element, children }: ComponentRenderProps) => {
  const {
    top,
    right,
    bottom,
    left,
    inset,
    zIndex = 50,
    width,
    height,
    style
  } = element.props;

  const parseValue = (value: unknown) => {
    if (value === undefined || value === null) return undefined;
    if (typeof value === 'number') return `${value * 0.25}rem`;
    return value as string;
  };

  const zIndexClasses = {
    '0': 'z-0',
    '10': 'z-10',
    '20': 'z-20',
    '30': 'z-30',
    '40': 'z-40',
    '50': 'z-50',
  };

  return (
    <div
      className={cn(
        'fixed',
        typeof zIndex === 'string' && zIndexClasses[zIndex as keyof typeof zIndexClasses]
      )}
      style={{
        top: parseValue(inset) ?? parseValue(top),
        right: parseValue(inset) ?? parseValue(right),
        bottom: parseValue(inset) ?? parseValue(bottom),
        left: parseValue(inset) ?? parseValue(left),
        width: width as string | number,
        height: height as string | number,
        zIndex: typeof zIndex === 'number' ? zIndex : undefined,
        ...style as React.CSSProperties,
      }}
    >
      {children}
    </div>
  );
};
