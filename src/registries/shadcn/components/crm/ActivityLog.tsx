'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const ActivityLog = ({ element, children }: ComponentRenderProps) => {
  const {
    title = 'Activity Log',
    showTimeline = true,
    style
  } = element.props;

  return (
    <div
      className={cn('space-y-4')}
      style={style as React.CSSProperties}
    >
      {title && <h3 className="font-semibold">{title as string}</h3>}
      <div className={cn(
        'space-y-0',
        showTimeline && 'relative pl-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-border'
      )}>
        {children}
      </div>
    </div>
  );
};
