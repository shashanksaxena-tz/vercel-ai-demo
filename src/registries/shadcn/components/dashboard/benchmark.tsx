'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Target, TrendingUp, TrendingDown, CheckCircle2, AlertCircle } from 'lucide-react';

export const Benchmark = ({ element, children }: ComponentRenderProps) => {
  const {
    title,
    label,
    current,
    benchmark,
    unit = '',
    showPerformance = true,
    variant = 'default',
    style,
  } = element.props;

  const currentNum = Number(current) || 0;
  const benchmarkNum = Number(benchmark) || 100;
  const performance = (currentNum / benchmarkNum) * 100;
  const difference = currentNum - benchmarkNum;
  const percentDiff = benchmarkNum !== 0 ? (difference / benchmarkNum) * 100 : 0;

  const isAbove = currentNum >= benchmarkNum;

  const getStatusInfo = () => {
    if (performance >= 100) return { icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50', label: 'Above Benchmark' };
    if (performance >= 80) return { icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50', label: 'Near Benchmark' };
    return { icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50', label: 'Below Benchmark' };
  };

  const status = getStatusInfo();
  const StatusIcon = status.icon;

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
        <CardHeader className="pb-2">
          <CardTitle className="text-base">{title as React.ReactNode}</CardTitle>
        </CardHeader>
      )}
      <CardContent className={cn(!title && 'pt-6', 'space-y-4')}>
        <div className="flex items-start justify-between">
          <div>
            {!!label && (
              <p className="text-sm text-muted-foreground mb-1">{label as React.ReactNode}</p>
            )}
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">{currentNum.toLocaleString()}{unit}</span>
              <span className="text-sm text-muted-foreground">
                / {benchmarkNum.toLocaleString()}{unit}
              </span>
            </div>
          </div>
          <div className={cn('p-2 rounded-full', status.bg)}>
            <StatusIcon className={cn('h-5 w-5', status.color)} />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Performance</span>
            <span className={status.color}>{Math.round(performance)}%</span>
          </div>
          <div className="relative">
            <Progress value={Math.min(performance, 100)} className="h-2" />
            <div
              className="absolute top-0 h-full w-0.5 bg-foreground"
              style={{ left: '100%', transform: 'translateX(-50%)' }}
            />
          </div>
        </div>

        {showPerformance && (
          <div className={cn('flex items-center gap-2 text-sm', status.color)}>
            {isAbove ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            <span>
              {Math.abs(difference).toLocaleString()}{unit} {isAbove ? 'above' : 'below'} benchmark
              ({percentDiff > 0 ? '+' : ''}{percentDiff.toFixed(1)}%)
            </span>
          </div>
        )}

        {children}
      </CardContent>
    </Card>
  );
};
