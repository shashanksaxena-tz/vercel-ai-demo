'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const ModalBody = ({ element, children }: ComponentRenderProps) => {
  const { className, style } = element.props;

  return (
    <div
      className={cn('py-4', className as string)}
      style={style as React.CSSProperties}
    >
      {children}
    </div>
  );
};
