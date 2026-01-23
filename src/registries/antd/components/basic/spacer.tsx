'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';

export const Spacer = ({ element }: ComponentRenderProps) => {
  const {
    size = 16,
    direction = 'vertical',
    className,
    style
  } = element.props;

  const spacerStyle: React.CSSProperties = {
    display: direction === 'vertical' ? 'block' : 'inline-block',
    height: direction === 'vertical' ? (size as number) : 'auto',
    width: direction === 'horizontal' ? (size as number) : 'auto',
    ...style as React.CSSProperties
  };

  return <div className={className as string} style={spacerStyle} />;
};
