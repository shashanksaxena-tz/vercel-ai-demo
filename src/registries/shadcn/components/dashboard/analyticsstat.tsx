'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export const AnalyticsStat = ({ element }: ComponentRenderProps) => {
  const {
    label,
    value,
    change,
    trend,
    suffix,
    prefix,
    format = 'default',
    size = 'default',
    style,
  } = element.props;

  const trendDirection = trend ?? (change !== undefined
    ? (Number(change) > 0 ? 'up' : Number(change) < 0 ? 'down' : 'neutral')
    : undefined);

  const trendConfig = {
    up: { icon: TrendingUp, color: 'text-emerald-600' },
    down: { icon: TrendingDown, color: 'text-rose-600' },
    neutral: { icon: Minus, color: 'text-muted-foreground' },
  };

  const config = trendDirection
    ? trendConfig[trendDirection as keyof typeof trendConfig]
    : null;
  const TrendIcon = config?.icon;

  const sizeStyles = {
    sm: { value: 'text-xl', label: 'text-xs' },
    default: { value: 'text-3xl', label: 'text-sm' },
    lg: { value: 'text-4xl', label: 'text-base' },
    xl: { value: 'text-5xl', label: 'text-lg' },
  };

  const sizes = sizeStyles[(size as keyof typeof sizeStyles) || 'default'];

  const formatValue = (val: unknown) => {
    const num = Number(val);
    if (format === 'currency') return `$${num.toLocaleString()}`;
    if (format === 'percentage') return `${num}%`;
    if (format === 'compact') {
      if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
      if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toLocaleString();
  };

  return (
    <div className="space-y-1" style={style as React.CSSProperties}>
      {!!label && (
        <p className={cn('font-medium text-muted-foreground', sizes.label)}>
          {label as React.ReactNode}
        </p>
      )}
      <div className="flex items-baseline gap-2">
        <span className={cn('font-bold tracking-tight', sizes.value)}>
          {prefix as React.ReactNode}
          {formatValue(value)}
          {suffix as React.ReactNode}
        </span>
        {change !== undefined && TrendIcon && (
          <span className={cn('flex items-center gap-0.5 text-sm font-medium', config?.color)}>
            <TrendIcon className="h-3.5 w-3.5" />
            {Math.abs(Number(change))}%
          </span>
        )}
      </div>
    </div>
  );
};
