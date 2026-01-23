'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, AlertCircle, Info, TrendingUp, TrendingDown } from 'lucide-react';

export const ReportSummary = ({ element, children }: ComponentRenderProps) => {
  const {
    title,
    highlights,
    insights,
    metrics,
    variant = 'default',
    style,
  } = element.props;

  const highlightsArray = highlights as Array<{
    text: string;
    type?: 'success' | 'warning' | 'info';
  }>;

  const insightsArray = insights as Array<{
    text: string;
    trend?: 'up' | 'down';
    impact?: 'positive' | 'negative' | 'neutral';
  }>;

  const metricsArray = metrics as Array<{
    label: string;
    value: string | number;
    change?: number;
  }>;

  const highlightIcons = {
    success: CheckCircle2,
    warning: AlertCircle,
    info: Info,
  };

  const highlightStyles = {
    success: 'text-emerald-600',
    warning: 'text-amber-600',
    info: 'text-blue-600',
  };

  const variantStyles = {
    default: 'border shadow-sm',
    minimal: 'border-0 bg-muted/30',
    elevated: 'border-0 shadow-lg',
  };

  return (
    <Card
      className={cn(
        'overflow-hidden',
        variantStyles[(variant as keyof typeof variantStyles) || 'default']
      )}
      style={style as React.CSSProperties}
    >
      {!!title && (
        <CardHeader>
          <CardTitle>{title as React.ReactNode}</CardTitle>
        </CardHeader>
      )}
      <CardContent className="space-y-6">
        {/* Key Metrics */}
        {metricsArray && metricsArray.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metricsArray.map((metric, idx) => (
              <div key={idx} className="space-y-1">
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <p className="text-2xl font-bold">{metric.value}</p>
                {metric.change !== undefined && (
                  <p className={cn(
                    'text-sm font-medium flex items-center gap-1',
                    metric.change >= 0 ? 'text-emerald-600' : 'text-rose-600'
                  )}>
                    {metric.change >= 0 ? (
                      <TrendingUp className="h-3.5 w-3.5" />
                    ) : (
                      <TrendingDown className="h-3.5 w-3.5" />
                    )}
                    {Math.abs(metric.change)}%
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Highlights */}
        {highlightsArray && highlightsArray.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Key Highlights
            </h4>
            <ul className="space-y-2">
              {highlightsArray.map((highlight, idx) => {
                const Icon = highlightIcons[highlight.type || 'info'];
                return (
                  <li key={idx} className="flex items-start gap-2">
                    <Icon className={cn('h-5 w-5 mt-0.5 flex-shrink-0', highlightStyles[highlight.type || 'info'])} />
                    <span className="text-sm">{highlight.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* Insights */}
        {insightsArray && insightsArray.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Insights
            </h4>
            <div className="space-y-2">
              {insightsArray.map((insight, idx) => (
                <div
                  key={idx}
                  className={cn(
                    'p-3 rounded-lg border-l-4',
                    insight.impact === 'positive' && 'bg-emerald-50 border-emerald-500',
                    insight.impact === 'negative' && 'bg-rose-50 border-rose-500',
                    insight.impact === 'neutral' && 'bg-muted border-muted-foreground'
                  )}
                >
                  <p className="text-sm">{insight.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {children}
      </CardContent>
    </Card>
  );
};
