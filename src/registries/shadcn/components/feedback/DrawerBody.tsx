'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const DrawerBody = ({ element, children }: ComponentRenderProps) => {
  const { className, style } = element.props;

  return (
    <div
      className={cn('p-6 overflow-y-auto flex-1', className as string)}
      style={style as React.CSSProperties}
    >
      {children}
    </div>
  );
};
