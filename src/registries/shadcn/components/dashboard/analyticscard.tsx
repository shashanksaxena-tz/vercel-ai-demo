'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const AnalyticsCard = ({ element, children }: ComponentRenderProps) => {
  const {
    title,
    value,
    previousValue,
    change,
    changeType = 'percentage',
    trend,
    icon,
    variant = 'default',
    style,
  } = element.props;

  const calculatedChange = change ?? (previousValue
    ? ((Number(value) - Number(previousValue)) / Number(previousValue)) * 100
    : undefined);

  const trendDirection = trend ?? (calculatedChange !== undefined
    ? (calculatedChange > 0 ? 'up' : calculatedChange < 0 ? 'down' : 'neutral')
    : 'neutral');

  const trendConfig = {
    up: { icon: TrendingUp, arrowIcon: ArrowUpRight, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    down: { icon: TrendingDown, arrowIcon: ArrowDownRight, color: 'text-rose-600', bg: 'bg-rose-50' },
    neutral: { icon: Minus, arrowIcon: Minus, color: 'text-muted-foreground', bg: 'bg-muted/50' },
  };

  const config = trendConfig[trendDirection as keyof typeof trendConfig] || trendConfig.neutral;
  const TrendIcon = config.icon;

  const variantStyles = {
    default: 'border shadow-sm',
    minimal: 'border-0 shadow-none bg-muted/30',
    elevated: 'border-0 shadow-lg',
  };

  return (
    <Card
      className={cn(
        'overflow-hidden transition-all duration-200',
        variantStyles[(variant as keyof typeof variantStyles) || 'default']
      )}
      style={style as React.CSSProperties}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <p className="text-sm font-medium text-muted-foreground">
              {title as React.ReactNode}
            </p>
            <p className="text-3xl font-bold tracking-tight">
              {value as React.ReactNode}
            </p>
            {calculatedChange !== undefined && (
              <div className="flex items-center gap-2">
                <span className={cn('flex items-center gap-1 text-sm font-medium', config.color)}>
                  <TrendIcon className="h-3.5 w-3.5" />
                  {changeType === 'percentage'
                    ? `${Math.abs(calculatedChange).toFixed(1)}%`
                    : Math.abs(Number(calculatedChange)).toLocaleString()}
                </span>
                {!!previousValue && (
                  <span className="text-xs text-muted-foreground">
                    vs {previousValue as React.ReactNode}
                  </span>
                )}
              </div>
            )}
          </div>
          {!!icon && (
            <div className={cn('p-3 rounded-full', config.bg)}>
              <span className={config.color}>{icon as React.ReactNode}</span>
            </div>
          )}
        </div>
        {children}
      </CardContent>
    </Card>
  );
};
