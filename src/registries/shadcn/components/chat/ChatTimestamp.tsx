'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const ChatTimestamp = ({ element }: ComponentRenderProps) => {
  const {
    time,
    format = 'relative',
    style
  } = element.props;

  const formatTime = (time: string) => {
    if (format === 'relative') {
      return time;
    }
    return time;
  };

  return (
    <span
      className={cn(
        'text-xs text-muted-foreground'
      )}
      style={style as React.CSSProperties}
    >
      {formatTime(time as string)}
    </span>
  );
};
