'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Absolute = ({ element, children }: ComponentRenderProps) => {
  const {
    top,
    right,
    bottom,
    left,
    inset,
    insetX,
    insetY,
    zIndex = 'auto',
    style
  } = element.props;

  const parseValue = (value: unknown) => {
    if (value === undefined || value === null) return undefined;
    if (typeof value === 'number') return `${value * 0.25}rem`;
    return value as string;
  };

  const zIndexClasses = {
    auto: 'z-auto',
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
        'absolute',
        typeof zIndex === 'string' && zIndexClasses[zIndex as keyof typeof zIndexClasses]
      )}
      style={{
        top: parseValue(inset) ?? parseValue(insetY) ?? parseValue(top),
        right: parseValue(inset) ?? parseValue(insetX) ?? parseValue(right),
        bottom: parseValue(inset) ?? parseValue(insetY) ?? parseValue(bottom),
        left: parseValue(inset) ?? parseValue(insetX) ?? parseValue(left),
        zIndex: typeof zIndex === 'number' ? zIndex : undefined,
        ...style as React.CSSProperties,
      }}
    >
      {children}
    </div>
  );
};
