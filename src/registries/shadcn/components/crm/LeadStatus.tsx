'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const LeadStatus = ({ element }: ComponentRenderProps) => {
  const {
    status = 'new',
    showIcon = true,
    variant = 'badge',
    style
  } = element.props;

  const statusConfig = {
    new: { label: 'New', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200', dotColor: 'bg-blue-500' },
    contacted: { label: 'Contacted', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200', dotColor: 'bg-yellow-500' },
    qualified: { label: 'Qualified', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200', dotColor: 'bg-green-500' },
    unqualified: { label: 'Unqualified', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200', dotColor: 'bg-red-500' },
    converted: { label: 'Converted', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200', dotColor: 'bg-purple-500' },
    nurturing: { label: 'Nurturing', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200', dotColor: 'bg-orange-500' },
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.new;

  if (variant === 'dot') {
    return (
      <span
        className={cn('inline-flex items-center gap-1.5')}
        style={style as React.CSSProperties}
      >
        <span className={cn('w-2 h-2 rounded-full', config.dotColor)} />
        <span className="text-sm">{config.label}</span>
      </span>
    );
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium',
        config.color
      )}
      style={style as React.CSSProperties}
    >
      {showIcon && (
        <span className={cn('w-1.5 h-1.5 rounded-full', config.dotColor)} />
      )}
      {config.label}
    </span>
  );
};
