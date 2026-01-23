'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Package, Truck, CheckCircle, Clock, XCircle, RotateCcw } from 'lucide-react';

export const OrderStatus = ({ element }: ComponentRenderProps) => {
  const {
    status,
    variant = 'badge',
    size = 'md',
    showIcon = true,
    style,
  } = element.props;

  const statusConfig: Record<string, { label: string; color: string; icon: any; bgColor: string }> = {
    pending: {
      label: 'Pending',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
      icon: Clock,
    },
    processing: {
      label: 'Processing',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      icon: Package,
    },
    shipped: {
      label: 'Shipped',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100 dark:bg-indigo-900/30',
      icon: Truck,
    },
    delivered: {
      label: 'Delivered',
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      icon: CheckCircle,
    },
    cancelled: {
      label: 'Cancelled',
      color: 'text-red-600',
      bgColor: 'bg-red-100 dark:bg-red-900/30',
      icon: XCircle,
    },
    returned: {
      label: 'Returned',
      color: 'text-gray-600',
      bgColor: 'bg-gray-100 dark:bg-gray-900/30',
      icon: RotateCcw,
    },
    refunded: {
      label: 'Refunded',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
      icon: RotateCcw,
    },
  };

  const config = statusConfig[status as string] || statusConfig.pending;
  const Icon = config.icon;

  const sizes = {
    sm: { badge: 'px-2 py-0.5 text-xs', icon: 'h-3 w-3', text: 'text-sm' },
    md: { badge: 'px-2.5 py-1 text-sm', icon: 'h-4 w-4', text: 'text-base' },
    lg: { badge: 'px-3 py-1.5 text-base', icon: 'h-5 w-5', text: 'text-lg' },
  };

  const sizeConfig = sizes[size as keyof typeof sizes] || sizes.md;

  if (variant === 'text') {
    return (
      <span
        className={cn('flex items-center gap-1', config.color, sizeConfig.text)}
        style={style as React.CSSProperties}
      >
        {showIcon && <Icon className={sizeConfig.icon} />}
        {config.label}
      </span>
    );
  }

  if (variant === 'dot') {
    return (
      <span
        className={cn('flex items-center gap-2', sizeConfig.text)}
        style={style as React.CSSProperties}
      >
        <span className={cn('w-2 h-2 rounded-full', config.bgColor, config.color.replace('text-', 'bg-'))} />
        {config.label}
      </span>
    );
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full font-medium',
        config.bgColor,
        config.color,
        sizeConfig.badge
      )}
      style={style as React.CSSProperties}
    >
      {showIcon && <Icon className={sizeConfig.icon} />}
      {config.label}
    </span>
  );
};
