'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export const LoadingOverlay = ({ element, children }: ComponentRenderProps) => {
  const {
    loading = true,
    blur = true,
    opacity = 0.8,
    size = 'default',
    label,
    variant = 'spinner',
    className,
    style
  } = element.props;

  const sizeStyles = {
    sm: 'h-6 w-6',
    default: 'h-10 w-10',
    lg: 'h-14 w-14',
    xl: 'h-20 w-20',
  };

  if (!loading) {
    return <>{children}</>;
  }

  const renderLoader = () => {
    if (variant === 'dots') {
      return (
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={cn(
                'rounded-full bg-primary animate-bounce',
                size === 'sm' && 'h-2 w-2',
                size === 'default' && 'h-3 w-3',
                size === 'lg' && 'h-4 w-4',
                size === 'xl' && 'h-5 w-5'
              )}
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
      );
    }

    return (
      <Loader2
        className={cn(
          'animate-spin text-primary',
          sizeStyles[(size as keyof typeof sizeStyles) || 'default']
        )}
      />
    );
  };

  return (
    <div
      className={cn('relative', className as string)}
      style={style as React.CSSProperties}
    >
      {children}
      <div
        className={cn(
          'absolute inset-0 flex flex-col items-center justify-center z-50',
          blur ? 'backdrop-blur-sm' : ''
        )}
        style={{ backgroundColor: `rgba(255, 255, 255, ${opacity as number})` }}
      >
        {renderLoader()}
        {label ? (
          <p className="mt-3 text-sm text-muted-foreground">{label as string}</p>
        ) : null}
      </div>
    </div>
  );
};
