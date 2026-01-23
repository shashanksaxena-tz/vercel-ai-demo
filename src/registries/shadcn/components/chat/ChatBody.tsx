'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const ChatBody = ({ element, children }: ComponentRenderProps) => {
  const {
    padding = 'default',
    style
  } = element.props;

  const paddings = {
    none: 'p-0',
    sm: 'p-2',
    default: 'p-4',
    lg: 'p-6',
  };

  return (
    <div
      className={cn(
        'flex-1 overflow-y-auto space-y-4',
        paddings[padding as keyof typeof paddings] || paddings.default
      )}
      style={style as React.CSSProperties}
    >
      {children}
    </div>
  );
};
