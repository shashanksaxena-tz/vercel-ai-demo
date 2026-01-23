'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Progress = ({ element }: ComponentRenderProps) => {
  const {
    value = 0,
    max = 100,
    label,
    showValue = false,
    size = 'default',
    variant = 'default',
    animated = false,
    striped = false,
    style,
  } = element.props;

  const percentage = Math.min(100, Math.max(0, ((value as number) / (max as number)) * 100));

  const sizeStyles = {
    xs: 'h-1',
    sm: 'h-1.5',
    default: 'h-2',
    lg: 'h-3',
    xl: 'h-4',
  };

  const variantStyles = {
    default: 'bg-primary',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    gradient: 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500',
  };

  return (
    <div className="w-full" style={style as React.CSSProperties}>
      {(label || showValue) && (
        <div className="flex justify-between mb-2 text-sm">
          {label && <span className="font-medium">{label as string}</span>}
          {showValue && (
            <span className="text-muted-foreground tabular-nums">{percentage.toFixed(0)}%</span>
          )}
        </div>
      )}
      <div
        className={cn(
          'w-full rounded-full bg-muted overflow-hidden',
          sizeStyles[(size as keyof typeof sizeStyles) || 'default']
        )}
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500',
            variantStyles[(variant as keyof typeof variantStyles) || 'default'],
            animated && 'animate-pulse',
            striped && 'bg-[length:1rem_1rem] bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)]'
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
