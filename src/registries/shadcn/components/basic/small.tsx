'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Small = ({ element, children }: ComponentRenderProps) => {
  const { content, muted = false, className, style } = element.props;

  return (
    <small
      className={cn(
        'text-sm font-medium leading-none',
        muted && 'text-muted-foreground',
        className as string
      )}
      style={style as React.CSSProperties}
    >
      {(content as React.ReactNode) || children}
    </small>
  );
};
