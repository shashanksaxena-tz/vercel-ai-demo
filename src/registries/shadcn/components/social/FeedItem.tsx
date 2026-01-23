'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const FeedItem = ({ element, children }: ComponentRenderProps) => {
  const {
    type = 'post',
    isNew = false,
    style
  } = element.props;

  return (
    <div
      className={cn(
        'relative',
        isNew && 'animate-in fade-in-0 slide-in-from-top-2'
      )}
      style={style as React.CSSProperties}
    >
      {isNew && (
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
          New
        </div>
      )}
      {children}
    </div>
  );
};
