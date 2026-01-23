'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Emphasis = ({ element, children }: ComponentRenderProps) => {
  const { content, className, style } = element.props;

  return (
    <em
      className={cn('italic', className as string)}
      style={style as React.CSSProperties}
    >
      {(content as React.ReactNode) || children}
    </em>
  );
};
