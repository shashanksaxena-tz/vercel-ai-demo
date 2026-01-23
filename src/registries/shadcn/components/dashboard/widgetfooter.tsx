'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const WidgetFooter = ({ element, children }: ComponentRenderProps) => {
  const {
    bordered = true,
    align = 'right',
    style,
  } = element.props;

  const alignStyles = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
    between: 'justify-between',
  };

  return (
    <div
      className={cn(
        'flex items-center px-6 py-4 gap-3',
        bordered && 'border-t bg-muted/30',
        alignStyles[(align as keyof typeof alignStyles) || 'right']
      )}
      style={style as React.CSSProperties}
    >
      {children}
    </div>
  );
};
