'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const PresenceIndicator = ({ element }: ComponentRenderProps) => {
  const {
    status = 'offline',
    showLabel = false,
    customLabel,
    size = 'md',
    style
  } = element.props;

  const sizes = {
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
  };

  const statusConfig = {
    online: { color: 'bg-green-500', label: 'Online' },
    offline: { color: 'bg-gray-400', label: 'Offline' },
    busy: { color: 'bg-red-500', label: 'Busy' },
    away: { color: 'bg-yellow-500', label: 'Away' },
    dnd: { color: 'bg-red-600', label: 'Do not disturb' },
    invisible: { color: 'bg-gray-300', label: 'Invisible' },
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.offline;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5'
      )}
      style={style as React.CSSProperties}
    >
      <span
        className={cn(
          'rounded-full',
          sizes[size as keyof typeof sizes] || sizes.md,
          config.color
        )}
      />
      {showLabel && (
        <span className="text-xs text-muted-foreground">
          {(customLabel || config.label) as string}
        </span>
      )}
    </span>
  );
};
