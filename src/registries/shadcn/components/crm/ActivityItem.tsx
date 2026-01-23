'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const ActivityItem = ({ element, children }: ComponentRenderProps) => {
  const {
    type,
    timestamp,
    showConnector = true,
    style
  } = element.props;

  const typeColors = {
    call: 'bg-green-500',
    email: 'bg-blue-500',
    meeting: 'bg-purple-500',
    note: 'bg-yellow-500',
    task: 'bg-orange-500',
    deal: 'bg-pink-500',
    default: 'bg-gray-400',
  };

  return (
    <div
      className={cn('relative pb-4')}
      style={style as React.CSSProperties}
    >
      {showConnector && (
        <div className={cn(
          'absolute left-0 top-1 w-2 h-2 rounded-full -translate-x-1/2',
          typeColors[type as keyof typeof typeColors] || typeColors.default
        )} />
      )}
      <div className="ml-4">
        {timestamp && (
          <p className="text-xs text-muted-foreground mb-1">{timestamp as string}</p>
        )}
        {children}
      </div>
    </div>
  );
};
