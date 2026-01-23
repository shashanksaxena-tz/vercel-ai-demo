'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export const MetricCard = ({ element, children }: ComponentRenderProps) => {
  const {
    label,
    value,
    description,
    trend,
    trendValue,
    icon,
    sparkline,
    variant = 'default',
    style,
  } = element.props;

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-green-500';
    if (trend === 'down') return 'text-red-500';
    return 'text-muted-foreground';
  };

  const variantStyles = {
    default: 'bg-card border shadow-sm',
    elevated: 'bg-card shadow-lg',
    outline: 'bg-transparent border-2',
    ghost: 'bg-muted/30',
  };

  return (
    <div
      className={cn(
        'rounded-lg p-6',
        variantStyles[(variant as keyof typeof variantStyles) || 'default']
      )}
      style={style as React.CSSProperties}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          {label && (
            <p className="text-sm font-medium text-muted-foreground">{label as string}</p>
          )}
          <p className="text-3xl font-bold">{value as React.ReactNode}</p>
          {description && (
            <p className="text-sm text-muted-foreground">{description as string}</p>
          )}
          {(trend || trendValue) && (
            <div className={cn('flex items-center gap-1 text-sm font-medium', getTrendColor())}>
              {getTrendIcon()}
              {trendValue && <span>{trendValue as string}</span>}
            </div>
          )}
        </div>
        {icon && (
          <div className="flex-shrink-0 p-3 bg-primary/10 rounded-lg">
            {icon as React.ReactNode}
          </div>
        )}
      </div>
      {sparkline && (
        <div className="mt-4 h-12">
          {sparkline as React.ReactNode}
        </div>
      )}
      {children}
    </div>
  );
};
