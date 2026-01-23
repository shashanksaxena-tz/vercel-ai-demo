'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const AlertTitle = ({ element, children }: ComponentRenderProps) => {
  const { className, style } = element.props;

  return (
    <h5
      className={cn('mb-1 font-medium leading-none tracking-tight', className as string)}
      style={style as React.CSSProperties}
    >
      {children}
    </h5>
  );
};
