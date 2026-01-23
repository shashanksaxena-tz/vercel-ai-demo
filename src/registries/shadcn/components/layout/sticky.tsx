'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Sticky = ({ element, children }: ComponentRenderProps) => {
  const {
    top = 0,
    bottom,
    left,
    right,
    zIndex = 40,
    offset,
    style
  } = element.props;

  const parseValue = (value: unknown) => {
    if (value === undefined || value === null) return undefined;
    if (typeof value === 'number') return `${value * 0.25}rem`;
    return value as string;
  };

  const offsetNum = offset !== undefined ? (typeof offset === 'number' ? offset : Number(offset)) : undefined;

  return (
    <div
      className={cn('sticky')}
      style={{
        top: offsetNum !== undefined ? `${offsetNum * 0.25}rem` : parseValue(top),
        bottom: parseValue(bottom),
        left: parseValue(left),
        right: parseValue(right),
        zIndex: zIndex as number,
        ...style as React.CSSProperties,
      }}
    >
      {children}
    </div>
  );
};
