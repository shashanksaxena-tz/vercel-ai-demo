'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Target, AlertCircle, CheckCircle2, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const KPICard = ({ element, children }: ComponentRenderProps) => {
  const {
    title,
    value,
    target,
    previousValue,
    unit,
    period,
    status,
    icon,
    variant = 'default',
    style,
  } = element.props;

  const currentValue = Number(value) || 0;
  const targetValue = Number(target);
  const prevValue = Number(previousValue);

  const getChange = () => {
    if (!prevValue) return null;
    const change = ((currentValue - prevValue) / prevValue) * 100;
    return {
      value: Math.abs(change).toFixed(1),
      direction: change >= 0 ? 'up' : 'down',
    };
  };

  const getProgress = () => {
    if (!targetValue) return null;
    return Math.min((currentValue / targetValue) * 100, 100);
  };

  const getStatus = () => {
    if (status) return status as string;
    const progress = getProgress();
    if (!progress) return 'neutral';
    if (progress >= 100) return 'success';
    if (progress >= 75) return 'on-track';
    if (progress >= 50) return 'warning';
    return 'at-risk';
  };

  const change = getChange();
  const progress = getProgress();
  const currentStatus = getStatus();

  const statusStyles = {
    success: 'border-l-green-500',
    'on-track': 'border-l-blue-500',
    warning: 'border-l-yellow-500',
    'at-risk': 'border-l-red-500',
    neutral: 'border-l-muted',
  };

  const variantStyles = {
    default: 'bg-card border shadow-sm',
    elevated: 'bg-card shadow-lg border-0',
    outline: 'bg-transparent border-2',
  };

  return (
    <div
      className={cn(
        'rounded-lg p-5 border-l-4',
        variantStyles[(variant as keyof typeof variantStyles) || 'default'],
        statusStyles[currentStatus as keyof typeof statusStyles] || statusStyles.neutral
      )}
      style={style as React.CSSProperties}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          {title && (
            <h3 className="text-sm font-medium text-muted-foreground">{title as string}</h3>
          )}
          {period && (
            <p className="text-xs text-muted-foreground/70">{period as string}</p>
          )}
        </div>
        {icon && (
          <div className="p-2 bg-muted rounded-lg">
            {icon as React.ReactNode}
          </div>
        )}
      </div>

      <div className="flex items-end justify-between">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold">{value as React.ReactNode}</span>
            {unit && <span className="text-sm text-muted-foreground">{unit as string}</span>}
          </div>
          {change && (
            <div className="flex items-center gap-1 mt-1">
              {change.direction === 'up' ? (
                <ArrowUpRight className="h-4 w-4 text-green-500" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-red-500" />
              )}
              <span className={cn('text-sm font-medium', change.direction === 'up' ? 'text-green-600' : 'text-red-600')}>
                {change.value}%
              </span>
              <span className="text-xs text-muted-foreground">vs previous</span>
            </div>
          )}
        </div>
        {targetValue && (
          <div className="text-right">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Target className="h-4 w-4" />
              <span className="text-sm">{targetValue}{unit ? ` ${unit}` : ''}</span>
            </div>
            {progress !== null && (
              <p className="text-xs text-muted-foreground mt-1">{progress.toFixed(0)}% achieved</p>
            )}
          </div>
        )}
      </div>

      {progress !== null && (
        <div className="mt-4">
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className={cn(
                'h-full rounded-full transition-all duration-500',
                currentStatus === 'success' && 'bg-green-500',
                currentStatus === 'on-track' && 'bg-blue-500',
                currentStatus === 'warning' && 'bg-yellow-500',
                currentStatus === 'at-risk' && 'bg-red-500'
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {children}
    </div>
  );
};
