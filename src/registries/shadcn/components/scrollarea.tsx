import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const ScrollArea = ({ element, children }: ComponentRenderProps) => {
  const {
    height,
    maxHeight,
    orientation = 'vertical',
    style
  } = element.props;

  return (
    <div
      className={cn(
        'relative overflow-auto',
        orientation === 'horizontal' ? 'overflow-x-auto overflow-y-hidden' : 'overflow-y-auto overflow-x-hidden'
      )}
      style={{
        height: height as string | number,
        maxHeight: maxHeight as string | number,
        ...(style as React.CSSProperties),
      }}
    >
      {children}
    </div>
  );
};
