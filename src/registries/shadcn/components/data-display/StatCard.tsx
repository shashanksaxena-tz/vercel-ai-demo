'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export const StatCard = ({ element, children }: ComponentRenderProps) => {
  const {
    label,
    value,
    change,
    changeLabel,
    trend,
    icon,
    description,
    variant = 'default',
    compact = false,
    style,
  } = element.props;

  const getTrendInfo = () => {
    if (trend) return { direction: trend as string, Icon: trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus };
    if (change !== undefined) {
      const changeNum = Number(change);
      if (changeNum > 0) return { direction: 'up', Icon: TrendingUp };
      if (changeNum < 0) return { direction: 'down', Icon: TrendingDown };
    }
    return { direction: 'neutral', Icon: Minus };
  };

  const trendInfo = getTrendInfo();

  const trendStyles = {
    up: 'text-green-600 bg-green-50',
    down: 'text-red-600 bg-red-50',
    neutral: 'text-muted-foreground bg-muted',
  };

  const variantStyles = {
    default: 'bg-card border shadow-sm',
    elevated: 'bg-card shadow-lg border-0',
    outline: 'bg-transparent border-2',
    filled: 'bg-muted border-0',
  };

  return (
    <div
      className={cn(
        'rounded-lg overflow-hidden',
        variantStyles[(variant as keyof typeof variantStyles) || 'default'],
        compact ? 'p-4' : 'p-6'
      )}
      style={style as React.CSSProperties}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          {label && (
            <p className={cn('font-medium text-muted-foreground', compact ? 'text-xs' : 'text-sm')}>
              {label as string}
            </p>
          )}
          <p className={cn('font-bold', compact ? 'text-2xl' : 'text-3xl')}>
            {value as React.ReactNode}
          </p>
        </div>
        {icon && (
          <div className={cn(
            'flex-shrink-0 rounded-lg bg-primary/10 flex items-center justify-center',
            compact ? 'p-2' : 'p-3'
          )}>
            {icon as React.ReactNode}
          </div>
        )}
      </div>

      {(change !== undefined || description) && (
        <div className={cn('flex items-center gap-2', compact ? 'mt-2' : 'mt-4')}>
          {change !== undefined && (
            <div className={cn(
              'flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
              trendStyles[trendInfo.direction as keyof typeof trendStyles]
            )}>
              <trendInfo.Icon className="h-3 w-3" />
              <span>{change as string}%</span>
            </div>
          )}
          {changeLabel && (
            <span className="text-xs text-muted-foreground">{changeLabel as string}</span>
          )}
          {description && !change && (
            <p className="text-sm text-muted-foreground">{description as string}</p>
          )}
        </div>
      )}

      {children}
    </div>
  );
};
