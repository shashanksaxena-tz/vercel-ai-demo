'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const ProgressBar = ({ element }: ComponentRenderProps) => {
  const {
    value = 0,
    max = 100,
    label,
    description,
    showValue = true,
    valueLabel,
    size = 'default',
    color = 'primary',
    animated = false,
    indeterminate = false,
    style,
  } = element.props;

  const percentage = Math.min(100, Math.max(0, ((value as number) / (max as number)) * 100));

  const sizeStyles = {
    sm: { bar: 'h-1.5', text: 'text-xs' },
    default: { bar: 'h-2.5', text: 'text-sm' },
    lg: { bar: 'h-4', text: 'text-base' },
  };

  const colorStyles: Record<string, string> = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  };

  const sizes = sizeStyles[(size as keyof typeof sizeStyles) || 'default'];

  return (
    <div className="w-full" style={style as React.CSSProperties}>
      {(label || showValue) && (
        <div className={cn('flex justify-between mb-1.5', sizes.text)}>
          <div>
            {label && <span className="font-medium">{label as string}</span>}
            {description && (
              <span className="text-muted-foreground ml-2">{description as string}</span>
            )}
          </div>
          {showValue && (
            <span className="text-muted-foreground tabular-nums">
              {(valueLabel || `${percentage.toFixed(0)}%`) as React.ReactNode}
            </span>
          )}
        </div>
      )}
      <div
        className={cn('w-full rounded-full bg-muted overflow-hidden', sizes.bar)}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : percentage}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={cn(
            'h-full rounded-full transition-all duration-300',
            colorStyles[color as string] || colorStyles.primary,
            animated && !indeterminate && 'animate-pulse',
            indeterminate && 'w-1/3 animate-[indeterminate_1.5s_ease-in-out_infinite]'
          )}
          style={indeterminate ? undefined : { width: `${percentage}%` }}
        />
      </div>
      <style jsx>{`
        @keyframes indeterminate {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(400%);
          }
        }
      `}</style>
    </div>
  );
};
