'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { X, Bell, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export const Notification = ({ element, onAction }: ComponentRenderProps) => {
  const {
    title,
    description,
    variant = 'default',
    timestamp,
    read = false,
    avatar,
    action,
    actionLabel,
    showClose = true,
    className,
    style
  } = element.props;

  const variantStyles = {
    default: 'border-l-4 border-l-primary',
    success: 'border-l-4 border-l-green-500',
    error: 'border-l-4 border-l-red-500',
    warning: 'border-l-4 border-l-yellow-500',
    info: 'border-l-4 border-l-blue-500',
  };

  const icons = {
    default: <Bell className="h-5 w-5 text-primary" />,
    success: <CheckCircle2 className="h-5 w-5 text-green-500" />,
    error: <AlertCircle className="h-5 w-5 text-red-500" />,
    warning: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
    info: <Info className="h-5 w-5 text-blue-500" />,
  };

  const Icon = icons[(variant as keyof typeof icons) || 'default'];

  return (
    <div
      className={cn(
        'relative flex gap-3 p-4 bg-background border rounded-lg shadow-sm transition-colors',
        variantStyles[(variant as keyof typeof variantStyles) || 'default'],
        !read && 'bg-muted/50',
        className as string
      )}
      style={style as React.CSSProperties}
      role="alert"
    >
      {avatar ? (
        <img
          src={avatar as string}
          alt=""
          className="h-10 w-10 rounded-full flex-shrink-0"
        />
      ) : (
        <div className="flex-shrink-0 mt-0.5">{Icon}</div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            {title ? (
              <p className={cn('font-medium', !read ? 'font-semibold' : '')}>
                {title as string}
              </p>
            ) : null}
            {description ? (
              <p className="text-sm text-muted-foreground mt-1">
                {description as string}
              </p>
            ) : null}
          </div>
          {!read ? (
            <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-1.5" />
          ) : null}
        </div>
        {timestamp ? (
          <p className="text-xs text-muted-foreground mt-2">{timestamp as string}</p>
        ) : null}
        {action && actionLabel ? (
          <button
            className="mt-2 text-sm font-medium text-primary hover:underline"
            onClick={() => onAction?.({ name: action as string })}
          >
            {actionLabel as string}
          </button>
        ) : null}
      </div>
      {showClose ? (
        <button
          className="absolute top-2 right-2 opacity-70 hover:opacity-100 transition-opacity"
          onClick={() => onAction?.({ name: 'dismiss' })}
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      ) : null}
    </div>
  );
};
