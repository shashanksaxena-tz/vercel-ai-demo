'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus, ArrowUp, ArrowDown } from 'lucide-react';

export const TrendIndicator = ({ element }: ComponentRenderProps) => {
  const {
    value,
    direction,
    label,
    variant = 'default',
    size = 'default',
    showIcon = true,
    showLabel = true,
    iconStyle = 'trend',
    style,
  } = element.props;

  const valueNum = Number(value) || 0;
  const dir = direction || (valueNum > 0 ? 'up' : valueNum < 0 ? 'down' : 'neutral');

  const trendIcons = {
    trend: { up: TrendingUp, down: TrendingDown, neutral: Minus },
    arrow: { up: ArrowUp, down: ArrowDown, neutral: Minus },
  };

  const icons = trendIcons[(iconStyle as keyof typeof trendIcons) || 'trend'];
  const Icon = icons[dir as keyof typeof icons];

  const colorConfig = {
    up: 'text-emerald-600',
    down: 'text-rose-600',
    neutral: 'text-muted-foreground',
  };

  const bgConfig = {
    up: 'bg-emerald-50',
    down: 'bg-rose-50',
    neutral: 'bg-muted',
  };

  const color = colorConfig[dir as keyof typeof colorConfig];
  const bg = bgConfig[dir as keyof typeof bgConfig];

  const sizeStyles = {
    sm: { text: 'text-xs', icon: 'h-3 w-3', padding: 'px-1.5 py-0.5', gap: 'gap-0.5' },
    default: { text: 'text-sm', icon: 'h-4 w-4', padding: 'px-2 py-1', gap: 'gap-1' },
    lg: { text: 'text-base', icon: 'h-5 w-5', padding: 'px-3 py-1.5', gap: 'gap-1.5' },
  };

  const sizes = sizeStyles[(size as keyof typeof sizeStyles) || 'default'];

  const variantStyles = {
    default: cn('inline-flex items-center font-medium rounded-full', bg, color, sizes.padding, sizes.gap),
    minimal: cn('inline-flex items-center font-medium', color, sizes.gap),
    outline: cn('inline-flex items-center font-medium rounded-full border', color, sizes.padding, sizes.gap, 'border-current'),
  };

  return (
    <span
      className={cn(
        sizes.text,
        variantStyles[(variant as keyof typeof variantStyles) || 'default']
      )}
      style={style as React.CSSProperties}
    >
      {showIcon && <Icon className={sizes.icon} />}
      <span>{Math.abs(valueNum)}%</span>
      {showLabel && !!label && (
        <span className="text-muted-foreground font-normal">{label as React.ReactNode}</span>
      )}
    </span>
  );
};
