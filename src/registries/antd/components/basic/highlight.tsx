'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';

export const Highlight = ({ element, children }: ComponentRenderProps) => {
  const {
    content,
    color = '#fadb14',
    className,
    style
  } = element.props;

  return (
    <span
      className={className as string}
      style={{
        backgroundColor: color as string,
        padding: '0 4px',
        borderRadius: 2,
        ...style as React.CSSProperties
      }}
    >
      {(content as string) || children}
    </span>
  );
};
