'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const ChatFooter = ({ element, children }: ComponentRenderProps) => {
  const {
    bordered = true,
    style
  } = element.props;

  return (
    <div
      className={cn(
        'px-4 py-3 bg-muted/30',
        bordered && 'border-t'
      )}
      style={style as React.CSSProperties}
    >
      {children}
    </div>
  );
};
