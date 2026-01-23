'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export const Metric = ({ element }: ComponentRenderProps) => {
  const {
    label,
    value,
    previousValue,
    trend,
    trendValue,
    prefix,
    suffix,
    size = 'default',
    style,
  } = element.props;

  const calculateTrend = () => {
    if (trend) return trend as string;
    if (previousValue !== undefined && value !== undefined) {
      const prev = Number(previousValue);
      const curr = Number(value);
      if (curr > prev) return 'up';
      if (curr < prev) return 'down';
    }
    return 'neutral';
  };

  const calculatedTrend = calculateTrend();

  const getTrendIcon = () => {
    switch (calculatedTrend) {
      case 'up':
        return <TrendingUp className="h-4 w-4" />;
      case 'down':
        return <TrendingDown className="h-4 w-4" />;
      default:
        return <Minus className="h-4 w-4" />;
    }
  };

  const getTrendStyles = () => {
    switch (calculatedTrend) {
      case 'up':
        return 'text-green-600 bg-green-50';
      case 'down':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const sizeStyles = {
    sm: { label: 'text-xs', value: 'text-xl', trend: 'text-xs px-1.5 py-0.5' },
    default: { label: 'text-sm', value: 'text-3xl', trend: 'text-sm px-2 py-1' },
    lg: { label: 'text-base', value: 'text-4xl', trend: 'text-base px-2.5 py-1' },
  };

  const sizes = sizeStyles[(size as keyof typeof sizeStyles) || 'default'];

  return (
    <div className="space-y-1" style={style as React.CSSProperties}>
      {label && (
        <p className={cn('font-medium text-muted-foreground uppercase tracking-wide', sizes.label)}>
          {label as string}
        </p>
      )}
      <div className="flex items-end gap-3">
        <p className={cn('font-bold tracking-tight', sizes.value)}>
          {prefix && <span className="text-muted-foreground">{prefix as string}</span>}
          {value as React.ReactNode}
          {suffix && <span className="text-muted-foreground">{suffix as string}</span>}
        </p>
        {(trendValue || calculatedTrend !== 'neutral') && (
          <div className={cn('flex items-center gap-1 rounded-full font-medium', getTrendStyles(), sizes.trend)}>
            {getTrendIcon()}
            {trendValue && <span>{trendValue as string}</span>}
          </div>
        )}
      </div>
    </div>
  );
};
