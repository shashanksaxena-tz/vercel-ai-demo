'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Layer = ({ element, children }: ComponentRenderProps) => {
  const {
    zIndex = 0,
    position = 'relative',
    fill = false,
    pointerEvents = 'auto',
    style
  } = element.props;

  const positionClasses = {
    relative: 'relative',
    absolute: 'absolute',
    fixed: 'fixed',
    sticky: 'sticky',
  };

  const pointerEventsClasses = {
    auto: 'pointer-events-auto',
    none: 'pointer-events-none',
  };

  return (
    <div
      className={cn(
        positionClasses[(position as keyof typeof positionClasses) || 'relative'],
        (fill as boolean) && 'inset-0',
        pointerEventsClasses[(pointerEvents as keyof typeof pointerEventsClasses) || 'auto']
      )}
      style={{
        zIndex: zIndex as number,
        ...style as React.CSSProperties,
      }}
    >
      {children}
    </div>
  );
};
