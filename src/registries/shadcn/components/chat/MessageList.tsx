'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const MessageList = ({ element, children }: ComponentRenderProps) => {
  const {
    gap = 'default',
    style
  } = element.props;

  const gaps = {
    sm: 'space-y-2',
    default: 'space-y-4',
    lg: 'space-y-6',
  };

  return (
    <div
      className={cn(
        'flex flex-col',
        gaps[gap as keyof typeof gaps] || gaps.default
      )}
      style={style as React.CSSProperties}
    >
      {children}
    </div>
  );
};
