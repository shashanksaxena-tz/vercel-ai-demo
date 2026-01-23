'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';

export const Spacer = ({ element }: ComponentRenderProps) => {
  const { size = 'md', axis = 'vertical', style } = element.props;

  const sizeMap = {
    xs: 8,
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
    '2xl': 64,
    '3xl': 96,
  };

  const pixels = typeof size === 'number' ? size : sizeMap[(size as keyof typeof sizeMap)] || sizeMap.md;

  return (
    <div
      style={{
        width: axis === 'horizontal' ? pixels : 'auto',
        height: axis === 'vertical' ? pixels : 'auto',
        minWidth: axis === 'horizontal' ? pixels : 'auto',
        minHeight: axis === 'vertical' ? pixels : 'auto',
        flexShrink: 0,
        ...(style as React.CSSProperties),
      }}
      aria-hidden="true"
    />
  );
};
