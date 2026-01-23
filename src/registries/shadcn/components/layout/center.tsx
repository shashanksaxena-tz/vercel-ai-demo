'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Center = ({ element, children }: ComponentRenderProps) => {
  const {
    inline = false,
    height,
    width,
    minHeight,
    style
  } = element.props;

  return (
    <div
      className={cn(
        inline ? 'inline-flex' : 'flex',
        'items-center justify-center'
      )}
      style={{
        height: height as string | number,
        width: width as string | number,
        minHeight: minHeight as string | number,
        ...style as React.CSSProperties,
      }}
    >
      {children}
    </div>
  );
};
