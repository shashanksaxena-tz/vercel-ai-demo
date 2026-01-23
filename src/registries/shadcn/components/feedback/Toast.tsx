'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export const Toast = ({ element, onAction }: ComponentRenderProps) => {
  const {
    title,
    description,
    variant = 'default',
    action,
    actionLabel,
    showClose = true,
    position = 'bottom-right',
    className,
    style
  } = element.props;

  const variantStyles = {
    default: 'bg-background border text-foreground',
    success: 'bg-green-50 border-green-200 text-green-900 dark:bg-green-900/20 dark:border-green-800 dark:text-green-100',
    error: 'bg-red-50 border-red-200 text-red-900 dark:bg-red-900/20 dark:border-red-800 dark:text-red-100',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-900 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-100',
    info: 'bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-100',
  };

  const icons = {
    default: null,
    success: <CheckCircle2 className="h-5 w-5 text-green-500" />,
    error: <AlertCircle className="h-5 w-5 text-red-500" />,
    warning: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
    info: <Info className="h-5 w-5 text-blue-500" />,
  };

  const positionStyles = {
    'top-left': 'top-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
    'bottom-right': 'bottom-4 right-4',
  };

  const Icon = icons[(variant as keyof typeof icons) || 'default'];

  return (
    <div
      className={cn(
        'fixed z-50 w-full max-w-sm rounded-lg border shadow-lg p-4 animate-in slide-in-from-right-full duration-300',
        variantStyles[(variant as keyof typeof variantStyles) || 'default'],
        positionStyles[(position as keyof typeof positionStyles) || 'bottom-right'],
        className as string
      )}
      style={style as React.CSSProperties}
      role="alert"
    >
      <div className="flex gap-3">
        {Icon ? <div className="flex-shrink-0">{Icon}</div> : null}
        <div className="flex-1 min-w-0">
          {title ? <p className="font-semibold">{title as string}</p> : null}
          {description ? (
            <p className={cn('text-sm', title ? 'mt-1' : '', !title ? 'font-medium' : '')}>
              {description as string}
            </p>
          ) : null}
          {action && actionLabel ? (
            <button
              className="mt-2 text-sm font-medium underline hover:no-underline"
              onClick={() => onAction?.({ name: action as string })}
            >
              {actionLabel as string}
            </button>
          ) : null}
        </div>
        {showClose ? (
          <button
            className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
            onClick={() => onAction?.({ name: 'dismiss' })}
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>
    </div>
  );
};
