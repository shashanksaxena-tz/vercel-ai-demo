'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const CallLog = ({ element, children }: ComponentRenderProps) => {
  const {
    title = 'Call Log',
    totalCalls,
    totalDuration,
    style
  } = element.props;

  return (
    <div
      className={cn('space-y-4')}
      style={style as React.CSSProperties}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{title as string}</h3>
        {(totalCalls !== undefined || totalDuration) && (
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {totalCalls !== undefined && <span>{totalCalls} calls</span>}
            {totalDuration && <span>{totalDuration} total</span>}
          </div>
        )}
      </div>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );
};
