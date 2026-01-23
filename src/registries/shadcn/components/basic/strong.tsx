'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Strong = ({ element, children }: ComponentRenderProps) => {
  const { content, className, style } = element.props;

  return (
    <strong
      className={cn('font-bold', className as string)}
      style={style as React.CSSProperties}
    >
      {(content as React.ReactNode) || children}
    </strong>
  );
};
