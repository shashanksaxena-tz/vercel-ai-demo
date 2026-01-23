'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { AlertCircle, RefreshCw } from 'lucide-react';

export const ErrorState = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    title = 'Something went wrong',
    description,
    error,
    icon,
    showRetry = true,
    retryLabel = 'Try again',
    action,
    actionLabel,
    size = 'default',
    className,
    style
  } = element.props;

  const sizeStyles = {
    sm: {
      icon: 'h-10 w-10',
      title: 'text-base',
      description: 'text-sm',
      padding: 'p-6',
    },
    default: {
      icon: 'h-12 w-12',
      title: 'text-lg',
      description: 'text-sm',
      padding: 'p-8',
    },
    lg: {
      icon: 'h-16 w-16',
      title: 'text-xl',
      description: 'text-base',
      padding: 'p-12',
    },
  };

  const sizes = sizeStyles[(size as keyof typeof sizeStyles) || 'default'];

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center',
        sizes.padding,
        className as string
      )}
      style={style as React.CSSProperties}
      role="alert"
    >
      <div className={cn('text-destructive mb-4', sizes.icon)}>
        <AlertCircle className="h-full w-full" />
      </div>
      {title ? (
        <h3 className={cn('font-semibold', sizes.title)}>{title as string}</h3>
      ) : null}
      {description ? (
        <p className={cn('text-muted-foreground mt-2 max-w-sm', sizes.description)}>
          {description as string}
        </p>
      ) : null}
      {error ? (
        <code className="mt-3 px-3 py-1.5 bg-muted rounded text-xs text-muted-foreground max-w-md truncate">
          {error as string}
        </code>
      ) : null}
      {children}
      <div className="flex items-center gap-3 mt-6">
        {showRetry ? (
          <button
            className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            onClick={() => onAction?.({ name: 'retry' })}
          >
            <RefreshCw className="h-4 w-4" />
            {retryLabel as string}
          </button>
        ) : null}
        {action && actionLabel ? (
          <button
            className="inline-flex items-center justify-center rounded-md border bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
            onClick={() => onAction?.({ name: action as string })}
          >
            {actionLabel as string}
          </button>
        ) : null}
      </div>
    </div>
  );
};
