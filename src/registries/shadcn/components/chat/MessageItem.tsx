'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const MessageItem = ({ element, children }: ComponentRenderProps) => {
  const {
    id,
    isOwn = false,
    highlighted = false,
    style
  } = element.props;

  return (
    <div
      data-message-id={id}
      className={cn(
        'flex',
        isOwn ? 'justify-end' : 'justify-start',
        highlighted && 'bg-yellow-100/50 dark:bg-yellow-900/20 -mx-2 px-2 py-1 rounded'
      )}
      style={style as React.CSSProperties}
    >
      {children}
    </div>
  );
};
