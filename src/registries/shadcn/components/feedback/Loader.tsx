'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Loader = ({ element }: ComponentRenderProps) => {
  const {
    size = 'default',
    variant = 'spinner',
    color = 'primary',
    label,
    className,
    style
  } = element.props;

  const sizeStyles = {
    xs: 'h-4 w-4',
    sm: 'h-6 w-6',
    default: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };

  const colorStyles = {
    primary: 'border-primary',
    secondary: 'border-secondary',
    muted: 'border-muted-foreground',
    white: 'border-white',
  };

  const renderLoader = () => {
    switch (variant) {
      case 'spinner':
        return (
          <div
            className={cn(
              'rounded-full border-2 border-t-transparent animate-spin',
              sizeStyles[(size as keyof typeof sizeStyles) || 'default'],
              colorStyles[(color as keyof typeof colorStyles) || 'primary']
            )}
          />
        );
      case 'dots':
        return (
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={cn(
                  'rounded-full bg-primary animate-bounce',
                  size === 'xs' && 'h-1 w-1',
                  size === 'sm' && 'h-1.5 w-1.5',
                  size === 'default' && 'h-2 w-2',
                  size === 'lg' && 'h-3 w-3',
                  size === 'xl' && 'h-4 w-4'
                )}
                style={{ animationDelay: `${i * 150}ms` }}
              />
            ))}
          </div>
        );
      case 'pulse':
        return (
          <div
            className={cn(
              'rounded-full bg-primary animate-pulse',
              sizeStyles[(size as keyof typeof sizeStyles) || 'default']
            )}
          />
        );
      case 'bars':
        return (
          <div className="flex items-end gap-0.5">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={cn(
                  'bg-primary animate-pulse rounded-sm',
                  size === 'xs' && 'w-0.5 h-3',
                  size === 'sm' && 'w-1 h-4',
                  size === 'default' && 'w-1 h-6',
                  size === 'lg' && 'w-1.5 h-8',
                  size === 'xl' && 'w-2 h-12'
                )}
                style={{
                  animationDelay: `${i * 150}ms`,
                  animationDuration: '0.8s',
                }}
              />
            ))}
          </div>
        );
      default:
        return (
          <div
            className={cn(
              'rounded-full border-2 border-t-transparent animate-spin',
              sizeStyles[(size as keyof typeof sizeStyles) || 'default'],
              colorStyles[(color as keyof typeof colorStyles) || 'primary']
            )}
          />
        );
    }
  };

  if (label) {
    return (
      <div
        className={cn('flex flex-col items-center gap-2', className as string)}
        style={style as React.CSSProperties}
        role="status"
        aria-label={label as string}
      >
        {renderLoader()}
        <span className="text-sm text-muted-foreground">{label as string}</span>
      </div>
    );
  }

  return (
    <div
      className={cn('inline-flex', className as string)}
      style={style as React.CSSProperties}
      role="status"
      aria-label="Loading"
    >
      {renderLoader()}
    </div>
  );
};
