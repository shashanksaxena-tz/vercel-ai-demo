'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

// Format value based on format type
function formatValue(value: string | number, format?: string): string {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(numValue)) return String(value);

  switch (format) {
    case 'currency':
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(numValue);
    case 'percent':
      return new Intl.NumberFormat('en-US', {
        style: 'percent',
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }).format(numValue / 100);
    case 'compact':
      return new Intl.NumberFormat('en-US', {
        notation: 'compact',
        maximumFractionDigits: 1,
      }).format(numValue);
    case 'number':
    default:
      return new Intl.NumberFormat('en-US').format(numValue);
  }
}

// Metric Component
interface MetricProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: React.ReactNode;
  valuePath?: string;
  format?: 'currency' | 'percent' | 'number' | 'compact';
}

const Metric = React.forwardRef<HTMLDivElement, MetricProps>(
  ({
    className,
    label,
    value,
    change,
    changeType = 'neutral',
    icon,
    format,
    ...props
  }, ref) => {
    const formattedValue = formatValue(value, format);
    const changeColors = {
      positive: 'text-green-600',
      negative: 'text-red-600',
      neutral: 'text-muted-foreground',
    };

    const ChangeIcon = changeType === 'positive'
      ? TrendingUp
      : changeType === 'negative'
        ? TrendingDown
        : Minus;

    return (
      <div
        ref={ref}
        className={cn('flex flex-col space-y-1', className)}
        {...props}
      >
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {icon && <span className="text-foreground">{icon}</span>}
          <span>{label}</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold tracking-tight">{formattedValue}</span>
          {change && (
            <span className={cn('flex items-center text-sm font-medium', changeColors[changeType])}>
              <ChangeIcon className="h-3 w-3 mr-0.5" />
              {change}
            </span>
          )}
        </div>
      </div>
    );
  }
);
Metric.displayName = 'Metric';

// Stat Component (Alternative layout)
interface StatProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  helpText?: string;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    direction: 'up' | 'down';
  };
}

const Stat = React.forwardRef<HTMLDivElement, StatProps>(
  ({
    className,
    label,
    value,
    helpText,
    icon,
    trend,
    ...props
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('rounded-lg border bg-card p-4', className)}
        {...props}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">{label}</span>
          {icon && <span className="text-muted-foreground">{icon}</span>}
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-3xl font-bold">{value}</span>
          {trend && (
            <span
              className={cn(
                'flex items-center text-sm font-medium',
                trend.direction === 'up' ? 'text-green-600' : 'text-red-600'
              )}
            >
              {trend.direction === 'up' ? (
                <TrendingUp className="h-4 w-4 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1" />
              )}
              {trend.value}
            </span>
          )}
        </div>
        {helpText && (
          <p className="mt-1 text-xs text-muted-foreground">{helpText}</p>
        )}
      </div>
    );
  }
);
Stat.displayName = 'Stat';

// Metric Card (Combined Card + Metric)
interface MetricCardProps extends MetricProps {
  description?: string;
}

const MetricCard = React.forwardRef<HTMLDivElement, MetricCardProps>(
  ({
    className,
    label,
    value,
    change,
    changeType = 'neutral',
    icon,
    format,
    description,
    ...props
  }, ref) => {
    const formattedValue = formatValue(value, format);
    const changeColors = {
      positive: 'text-green-600 bg-green-100 dark:bg-green-900/30',
      negative: 'text-red-600 bg-red-100 dark:bg-red-900/30',
      neutral: 'text-muted-foreground bg-muted',
    };

    return (
      <div
        ref={ref}
        className={cn('rounded-lg border bg-card p-6 shadow-sm', className)}
        {...props}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">{label}</span>
          {icon && (
            <div className="rounded-full bg-muted p-2 text-muted-foreground">
              {icon}
            </div>
          )}
        </div>
        <div className="mt-4">
          <span className="text-3xl font-bold tracking-tight">{formattedValue}</span>
          {change && (
            <span
              className={cn(
                'ml-2 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
                changeColors[changeType]
              )}
            >
              {changeType === 'positive' && '+'}
              {change}
            </span>
          )}
        </div>
        {description && (
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    );
  }
);
MetricCard.displayName = 'MetricCard';

export { Metric, Stat, MetricCard, formatValue };
