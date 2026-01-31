'use client';
// @ts-nocheck

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Target, TrendingUp, CheckCircle2 } from 'lucide-react';

export const GoalProgress = ({ element, children }: ComponentRenderProps) => {
  const {
    title,
    description,
    current,
    target,
    unit = '',
    showPercentage = true,
    showRemaining = true,
    variant = 'default',
    size = 'default',
    style,
  } = element.props;

  const currentNum = Number(current) || 0;
  const targetNum = Number(target) || 100;
  const percentage = Math.min((currentNum / targetNum) * 100, 100);
  const remaining = Math.max(targetNum - currentNum, 0);
  const isComplete = currentNum >= targetNum;

  const variantStyles = {
    default: 'border shadow-sm',
    minimal: 'border-0 bg-muted/30',
    elevated: 'border-0 shadow-lg',
  };

  const sizeStyles = {
    sm: { card: 'p-4', title: 'text-sm', value: 'text-2xl', progress: 'h-2' },
    default: { card: 'p-6', title: 'text-base', value: 'text-3xl', progress: 'h-3' },
    lg: { card: 'p-8', title: 'text-lg', value: 'text-4xl', progress: 'h-4' },
  };

  const sizes = sizeStyles[(size as keyof typeof sizeStyles) || 'default'];

  return (
    <Card
      className={cn(
        'overflow-hidden',
        variantStyles[(variant as keyof typeof variantStyles) || 'default']
      )}
      style={style as React.CSSProperties}
    >
      <CardContent className={sizes.card}>
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              {!!title && (
                <CardTitle className={sizes.title}>{title as React.ReactNode}</CardTitle>
              )}
              {!!description && (
                <CardDescription>{description as React.ReactNode}</CardDescription>
              )}
            </div>
            <div className={cn(
              'p-2 rounded-full',
              isComplete ? 'bg-emerald-100' : 'bg-muted'
            )}>
              {isComplete ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              ) : (
                <Target className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-end justify-between">
              <div className="flex items-baseline gap-2">
                <span className={cn('font-bold', sizes.value)}>
                  {currentNum.toLocaleString()}
                </span>
                <span className="text-sm text-muted-foreground">
                  / {targetNum.toLocaleString()} {unit}
                </span>
              </div>
              {showPercentage && (
                <span className={cn(
                  'text-sm font-medium',
                  isComplete ? 'text-emerald-600' : 'text-muted-foreground'
                )}>
                  {Math.round(percentage)}%
                </span>
              )}
            </div>
            <Progress
              value={percentage}
              className={cn(sizes.progress, isComplete && '[&>div]:bg-emerald-500')}
            />
            {showRemaining && !isComplete && (
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                {remaining.toLocaleString()} {unit} remaining to reach goal
              </p>
            )}
          </div>

          {children}
        </div>
      </CardContent>
    </Card>
  );
};
