'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, TrendingUp, TrendingDown, Minus, Equal } from 'lucide-react';

export const Comparison = ({ element, children }: ComponentRenderProps) => {
  const {
    title,
    leftLabel,
    leftValue,
    rightLabel,
    rightValue,
    unit = '',
    showDifference = true,
    differenceLabel = 'Difference',
    variant = 'default',
    style,
  } = element.props;

  const leftNum = Number(leftValue) || 0;
  const rightNum = Number(rightValue) || 0;
  const difference = rightNum - leftNum;
  const percentChange = leftNum !== 0 ? ((rightNum - leftNum) / leftNum) * 100 : 0;

  const getComparisonInfo = () => {
    if (difference > 0) return { icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' };
    if (difference < 0) return { icon: TrendingDown, color: 'text-rose-600', bg: 'bg-rose-50' };
    return { icon: Equal, color: 'text-muted-foreground', bg: 'bg-muted' };
  };

  const info = getComparisonInfo();
  const Icon = info.icon;

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
      <CardContent className={cn(!title && 'pt-6')}>
        <div className="space-y-4">
          {/* Comparison Values */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 text-center p-4 rounded-lg bg-muted/30">
              <p className="text-sm text-muted-foreground mb-1">{leftLabel as React.ReactNode}</p>
              <p className="text-2xl font-bold">
                {leftNum.toLocaleString()}{unit}
              </p>
            </div>
            <div className="flex-shrink-0">
              <ArrowRight className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="flex-1 text-center p-4 rounded-lg bg-muted/30">
              <p className="text-sm text-muted-foreground mb-1">{rightLabel as React.ReactNode}</p>
              <p className="text-2xl font-bold">
                {rightNum.toLocaleString()}{unit}
              </p>
            </div>
          </div>

          {/* Difference */}
          {showDifference && (
            <div className={cn('flex items-center justify-center gap-3 p-3 rounded-lg', info.bg)}>
              <Icon className={cn('h-5 w-5', info.color)} />
              <div className="text-center">
                <p className="text-sm text-muted-foreground">{differenceLabel as React.ReactNode}</p>
                <p className={cn('font-semibold', info.color)}>
                  {difference > 0 ? '+' : ''}{difference.toLocaleString()}{unit}
                  {leftNum !== 0 && (
                    <span className="text-sm ml-1">
                      ({percentChange > 0 ? '+' : ''}{percentChange.toFixed(1)}%)
                    </span>
                  )}
                </p>
              </div>
            </div>
          )}

          {children}
        </div>
      </CardContent>
    </Card>
  );
};
