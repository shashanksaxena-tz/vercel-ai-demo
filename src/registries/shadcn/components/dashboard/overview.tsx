'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus, BarChart3, PieChart, Activity, Users } from 'lucide-react';

export const Overview = ({ element, children }: ComponentRenderProps) => {
  const {
    title,
    description,
    metrics,
    highlights,
    period,
    lastUpdated,
    variant = 'default',
    layout = 'grid',
    style,
  } = element.props;

  const metricsArray = metrics as Array<{
    label: string;
    value: string | number;
    change?: number;
    changeLabel?: string;
    icon?: 'chart' | 'pie' | 'activity' | 'users';
  }>;

  const highlightsArray = highlights as Array<{
    text: string;
    type?: 'positive' | 'negative' | 'neutral';
  }>;

  const iconMap = {
    chart: BarChart3,
    pie: PieChart,
    activity: Activity,
    users: Users,
  };

  const variantStyles = {
    default: 'border shadow-sm',
    minimal: 'border-0 bg-muted/30',
    elevated: 'border-0 shadow-lg',
  };

  const layoutStyles = {
    grid: 'grid grid-cols-2 md:grid-cols-4 gap-4',
    list: 'space-y-3',
    compact: 'flex flex-wrap gap-4',
  };

  const getTrendInfo = (change?: number) => {
    if (change === undefined) return null;
    if (change > 0) return { icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' };
    if (change < 0) return { icon: TrendingDown, color: 'text-rose-600', bg: 'bg-rose-50' };
    return { icon: Minus, color: 'text-muted-foreground', bg: 'bg-muted' };
  };

  return (
    <Card
      className={cn(
        'overflow-hidden',
        variantStyles[(variant as keyof typeof variantStyles) || 'default']
      )}
      style={style as React.CSSProperties}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            {!!title && <CardTitle>{title as React.ReactNode}</CardTitle>}
            {!!description && <CardDescription>{description as React.ReactNode}</CardDescription>}
          </div>
          <div className="text-right text-sm text-muted-foreground">
            {!!period && <p>Period: {period as React.ReactNode}</p>}
            {!!lastUpdated && <p>Updated: {lastUpdated as React.ReactNode}</p>}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Key Metrics */}
        {metricsArray && metricsArray.length > 0 && (
          <div className={layoutStyles[(layout as keyof typeof layoutStyles) || 'grid']}>
            {metricsArray.map((metric, idx) => {
              const trend = getTrendInfo(metric.change);
              const TrendIcon = trend?.icon;
              const MetricIcon = metric.icon ? iconMap[metric.icon] : null;

              return (
                <div
                  key={idx}
                  className={cn(
                    'p-4 rounded-lg bg-muted/30',
                    layout === 'list' && 'flex items-center justify-between',
                    layout === 'compact' && 'flex-1 min-w-[150px]'
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm text-muted-foreground">{metric.label}</p>
                      <p className="text-2xl font-bold mt-1">
                        {typeof metric.value === 'number'
                          ? metric.value.toLocaleString()
                          : metric.value}
                      </p>
                    </div>
                    {MetricIcon && (
                      <div className="p-2 rounded-full bg-muted">
                        <MetricIcon className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  {trend && TrendIcon && (
                    <div className={cn('flex items-center gap-1 mt-2 text-sm font-medium', trend.color)}>
                      <TrendIcon className="h-4 w-4" />
                      <span>{Math.abs(metric.change!)}%</span>
                      {metric.changeLabel && (
                        <span className="text-muted-foreground font-normal ml-1">
                          {metric.changeLabel}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Highlights */}
        {highlightsArray && highlightsArray.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Key Insights</h4>
            <ul className="space-y-2">
              {highlightsArray.map((highlight, idx) => (
                <li
                  key={idx}
                  className={cn(
                    'flex items-start gap-2 text-sm p-2 rounded',
                    highlight.type === 'positive' && 'bg-emerald-50 text-emerald-700',
                    highlight.type === 'negative' && 'bg-rose-50 text-rose-700',
                    highlight.type === 'neutral' && 'bg-muted text-muted-foreground'
                  )}
                >
                  <span className="mt-0.5">
                    {highlight.type === 'positive' && <TrendingUp className="h-4 w-4" />}
                    {highlight.type === 'negative' && <TrendingDown className="h-4 w-4" />}
                    {highlight.type === 'neutral' && <Minus className="h-4 w-4" />}
                  </span>
                  <span>{highlight.text}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {children}
      </CardContent>
    </Card>
  );
};
