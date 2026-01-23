'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Caption = ({ element, children }: ComponentRenderProps) => {
  const { content, align = 'left', className, style } = element.props;

  const alignStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <span
      className={cn(
        'text-sm text-muted-foreground',
        alignStyles[(align as keyof typeof alignStyles)] || alignStyles.left,
        className as string
      )}
      style={style as React.CSSProperties}
    >
      {(content as React.ReactNode) || children}
    </span>
  );
};
