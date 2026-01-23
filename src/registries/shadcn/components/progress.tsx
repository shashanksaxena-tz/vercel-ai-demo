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
    style
  } = element.props;

  const percentage = Math.min(100, Math.max(0, ((value as number) / (max as number)) * 100));

  const sizeStyles = {
    sm: 'h-1',
    default: 'h-2',
    lg: 'h-3',
    xl: 'h-4',
  };

  const variantStyles = {
    default: 'bg-primary',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500',
    gradient: 'bg-gradient-to-r from-primary to-secondary',
  };

  return (
    <div className="w-full" style={style as React.CSSProperties}>
      {(label || showValue) ? (
        <div className="flex justify-between mb-2 text-sm">
          {label ? <span className="font-medium">{label as string}</span> : null}
          {(showValue as boolean) && (
            <span className="text-muted-foreground">
              {percentage.toFixed(0)}%
            </span>
          )}
        </div>
      ) : null}
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
            (animated as boolean) && 'animate-pulse'
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
