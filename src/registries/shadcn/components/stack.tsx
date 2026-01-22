import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Stack = ({ element, children }: ComponentRenderProps) => {
  const { direction = 'column', gap = 4, style } = element.props;

  return (
    <div
      className={cn(
        'flex',
        direction === 'row' ? 'flex-row' : 'flex-col',
        `gap-${gap}`
      )}
      style={style as React.CSSProperties}
    >
      {children}
    </div>
  );
};
