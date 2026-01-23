'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Target, AlertCircle, CheckCircle2 } from 'lucide-react';

export const KPI = ({ element }: ComponentRenderProps) => {
  const {
    label,
    value,
    target,
    unit,
    status,
    trend,
    trendValue,
    showProgress = true,
    style,
  } = element.props;

  const currentValue = Number(value) || 0;
  const targetValue = Number(target) || 100;
  const progress = Math.min((currentValue / targetValue) * 100, 100);

  const getStatus = () => {
    if (status) return status as string;
    if (progress >= 100) return 'success';
    if (progress >= 75) return 'on-track';
    if (progress >= 50) return 'warning';
    return 'at-risk';
  };

  const currentStatus = getStatus();

  const statusConfig = {
    success: { color: 'text-green-600', bg: 'bg-green-500', icon: CheckCircle2 },
    'on-track': { color: 'text-blue-600', bg: 'bg-blue-500', icon: TrendingUp },
    warning: { color: 'text-yellow-600', bg: 'bg-yellow-500', icon: AlertCircle },
    'at-risk': { color: 'text-red-600', bg: 'bg-red-500', icon: AlertCircle },
  };

  const config = statusConfig[currentStatus as keyof typeof statusConfig] || statusConfig['on-track'];
  const StatusIcon = config.icon;

  return (
    <div className="space-y-3" style={style as React.CSSProperties}>
      <div className="flex items-start justify-between">
        <div>
          {label && (
            <p className="text-sm font-medium text-muted-foreground">{label as string}</p>
          )}
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-bold">{value as React.ReactNode}</span>
            {unit && <span className="text-lg text-muted-foreground">{unit as string}</span>}
          </div>
        </div>
        <div className={cn('p-2 rounded-full', config.bg, 'bg-opacity-10')}>
          <StatusIcon className={cn('h-5 w-5', config.color)} />
        </div>
      </div>

      {showProgress && target && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Target: {targetValue}{unit ? ` ${unit}` : ''}</span>
            <span className={cn('font-medium', config.color)}>{progress.toFixed(0)}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className={cn('h-full rounded-full transition-all duration-500', config.bg)}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {(trend || trendValue) && (
        <div className="flex items-center gap-2 text-sm">
          {trend === 'up' && <TrendingUp className="h-4 w-4 text-green-500" />}
          {trend === 'down' && <TrendingDown className="h-4 w-4 text-red-500" />}
          {trendValue && (
            <span className={cn(trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-muted-foreground')}>
              {trendValue as string}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
