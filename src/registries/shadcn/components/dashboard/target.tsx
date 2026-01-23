'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Target as TargetIcon, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

export const Target = ({ element, children }: ComponentRenderProps) => {
  const {
    title,
    current,
    target,
    unit = '',
    deadline,
    status,
    showProgress = true,
    variant = 'default',
    size = 'default',
    style,
  } = element.props;

  const currentNum = Number(current) || 0;
  const targetNum = Number(target) || 100;
  const progress = Math.min((currentNum / targetNum) * 100, 100);
  const remaining = Math.max(targetNum - currentNum, 0);

  const autoStatus = currentNum >= targetNum ? 'achieved' : 'in_progress';
  const finalStatus = status || autoStatus;

  const statusConfig = {
    achieved: { icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50', label: 'Achieved' },
    in_progress: { icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50', label: 'In Progress' },
    at_risk: { icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50', label: 'At Risk' },
    missed: { icon: AlertTriangle, color: 'text-rose-600', bg: 'bg-rose-50', label: 'Missed' },
  };

  const config = statusConfig[(finalStatus as keyof typeof statusConfig) || 'in_progress'];
  const StatusIcon = config.icon;

  const variantStyles = {
    default: 'border shadow-sm',
    minimal: 'border-0 bg-muted/30',
    elevated: 'border-0 shadow-lg',
  };

  const sizeStyles = {
    sm: { card: 'p-4', title: 'text-sm', value: 'text-xl', progress: 'h-1.5' },
    default: { card: 'p-6', title: 'text-base', value: 'text-2xl', progress: 'h-2' },
    lg: { card: 'p-8', title: 'text-lg', value: 'text-3xl', progress: 'h-3' },
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
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-muted">
                <TargetIcon className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                {!!title && (
                  <p className={cn('font-medium', sizes.title)}>{title as React.ReactNode}</p>
                )}
                {!!deadline && (
                  <p className="text-xs text-muted-foreground mt-0.5">Due: {deadline as React.ReactNode}</p>
                )}
              </div>
            </div>
            <span className={cn('inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium', config.bg, config.color)}>
              <StatusIcon className="h-3 w-3" />
              {config.label}
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline justify-between">
              <span className={cn('font-bold', sizes.value)}>
                {currentNum.toLocaleString()}{unit}
              </span>
              <span className="text-sm text-muted-foreground">
                of {targetNum.toLocaleString()}{unit}
              </span>
            </div>

            {showProgress && (
              <div className="space-y-1">
                <div className="relative h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className={cn(
                      'h-full rounded-full transition-all duration-500',
                      finalStatus === 'achieved' ? 'bg-emerald-500' : 'bg-primary'
                    )}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{Math.round(progress)}% complete</span>
                  {remaining > 0 && (
                    <span>{remaining.toLocaleString()}{unit} remaining</span>
                  )}
                </div>
              </div>
            )}
          </div>

          {children}
        </div>
      </CardContent>
    </Card>
  );
};
