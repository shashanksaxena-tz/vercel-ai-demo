'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const DeliveryStatus = ({ element }: ComponentRenderProps) => {
  const {
    status = 'sent',
    showLabel = false,
    style
  } = element.props;

  const statusConfig = {
    pending: { icon: '○', label: 'Sending', color: 'text-muted-foreground' },
    sent: { icon: '✓', label: 'Sent', color: 'text-muted-foreground' },
    delivered: { icon: '✓✓', label: 'Delivered', color: 'text-muted-foreground' },
    read: { icon: '✓✓', label: 'Read', color: 'text-primary' },
    failed: { icon: '!', label: 'Failed', color: 'text-destructive' },
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.sent;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 text-xs',
        config.color
      )}
      style={style as React.CSSProperties}
    >
      <span>{config.icon}</span>
      {showLabel && <span>{config.label}</span>}
    </span>
  );
};
