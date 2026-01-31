'use client';
// @ts-nocheck

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

export const Forecast = ({ element, children }: ComponentRenderProps) => {
  const {
    title,
    description,
    current,
    projected,
    target,
    unit = '',
    period,
    confidence,
    showComparison = true,
    variant = 'default',
    style,
  } = element.props;

  const currentNum = Number(current) || 0;
  const projectedNum = Number(projected) || 0;
  const targetNum = target !== undefined ? Number(target) : undefined;
  const confidenceNum = confidence !== undefined ? Number(confidence) : undefined;

  const projectedChange = currentNum !== 0 ? ((projectedNum - currentNum) / currentNum) * 100 : 0;
  const willMeetTarget = targetNum !== undefined ? projectedNum >= targetNum : undefined;

  const getTrendInfo = () => {
    if (projectedChange > 0) return { icon: TrendingUp, color: 'text-emerald-600' };
    if (projectedChange < 0) return { icon: TrendingDown, color: 'text-rose-600' };
    return { icon: Minus, color: 'text-muted-foreground' };
  };

  const trend = getTrendInfo();
  const TrendIcon = trend.icon;

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
      {(!!title || !!description) && (
        <CardHeader className="pb-2">
          {!!title && <CardTitle className="text-base">{title as React.ReactNode}</CardTitle>}
          {!!description && <CardDescription>{description as React.ReactNode}</CardDescription>}
        </CardHeader>
      )}
      <CardContent className={cn(!title && !description && 'pt-6', 'space-y-4')}>
        {/* Current to Projected */}
        <div className="flex items-center justify-between gap-4">
          <div className="text-center flex-1">
            <p className="text-sm text-muted-foreground mb-1">Current</p>
            <p className="text-2xl font-bold">{currentNum.toLocaleString()}{unit}</p>
          </div>
          <ArrowRight className="h-6 w-6 text-muted-foreground flex-shrink-0" />
          <div className="text-center flex-1">
            <p className="text-sm text-muted-foreground mb-1">
              Projected {period ? `(${period})` : ''}
            </p>
            <p className="text-2xl font-bold">{projectedNum.toLocaleString()}{unit}</p>
          </div>
        </div>

        {/* Change Indicator */}
        {showComparison && (
          <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-muted/50">
            <TrendIcon className={cn('h-5 w-5', trend.color)} />
            <span className={cn('font-medium', trend.color)}>
              {projectedChange >= 0 ? '+' : ''}{projectedChange.toFixed(1)}% expected change
            </span>
          </div>
        )}

        {/* Target Comparison */}
        {targetNum !== undefined && (
          <div className={cn(
            'flex items-center gap-2 p-3 rounded-lg',
            willMeetTarget ? 'bg-emerald-50' : 'bg-amber-50'
          )}>
            {willMeetTarget ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            ) : (
              <AlertCircle className="h-5 w-5 text-amber-600" />
            )}
            <span className={willMeetTarget ? 'text-emerald-700' : 'text-amber-700'}>
              {willMeetTarget
                ? `On track to meet target of ${targetNum.toLocaleString()}${unit}`
                : `May fall short of target (${targetNum.toLocaleString()}${unit}) by ${(targetNum - projectedNum).toLocaleString()}${unit}`
              }
            </span>
          </div>
        )}

        {/* Confidence Indicator */}
        {confidenceNum !== undefined && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Forecast confidence</span>
            <div className="flex items-center gap-2">
              <div className="w-20 h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className={cn(
                    'h-full rounded-full',
                    confidenceNum >= 80 ? 'bg-emerald-500' : confidenceNum >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                  )}
                  style={{ width: `${confidenceNum}%` }}
                />
              </div>
              <span className="font-medium">{confidenceNum}%</span>
            </div>
          </div>
        )}

        {children}
      </CardContent>
    </Card>
  );
};
