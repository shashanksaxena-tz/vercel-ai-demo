'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const ModalHeader = ({ element, children }: ComponentRenderProps) => {
  const { className, style } = element.props;

  return (
    <div
      className={cn('flex flex-col space-y-1.5 pb-4', className as string)}
      style={style as React.CSSProperties}
    >
      {children}
    </div>
  );
};
