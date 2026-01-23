'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const AlertDescription = ({ element, children }: ComponentRenderProps) => {
  const { className, style } = element.props;

  return (
    <div
      className={cn('text-sm [&_p]:leading-relaxed', className as string)}
      style={style as React.CSSProperties}
    >
      {children}
    </div>
  );
};
