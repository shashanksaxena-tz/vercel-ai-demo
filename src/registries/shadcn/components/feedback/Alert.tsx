'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

export const Alert = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    variant = 'default',
    title,
    description,
    icon,
    dismissible = false,
    className,
    style
  } = element.props;

  const variantStyles = {
    default: 'bg-background border text-foreground',
    info: 'bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-100',
    success: 'bg-green-50 border-green-200 text-green-900 dark:bg-green-900/20 dark:border-green-800 dark:text-green-100',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-900 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-100',
    error: 'bg-red-50 border-red-200 text-red-900 dark:bg-red-900/20 dark:border-red-800 dark:text-red-100',
    destructive: 'bg-destructive/10 border-destructive text-destructive dark:bg-destructive/20',
  };

  const icons = {
    default: null,
    info: <Info className="h-4 w-4 text-blue-500" />,
    success: <CheckCircle2 className="h-4 w-4 text-green-500" />,
    warning: <AlertTriangle className="h-4 w-4 text-yellow-500" />,
    error: <AlertCircle className="h-4 w-4 text-red-500" />,
    destructive: <AlertCircle className="h-4 w-4 text-destructive" />,
  };

  const IconComponent = icon === false ? null : icons[(variant as keyof typeof icons) || 'default'];

  return (
    <div
      className={cn(
        'relative flex gap-3 rounded-lg border p-4',
        variantStyles[(variant as keyof typeof variantStyles) || 'default'],
        className as string
      )}
      style={style as React.CSSProperties}
      role="alert"
    >
      {IconComponent && <div className="flex-shrink-0 mt-0.5">{IconComponent}</div>}
      <div className="flex-1 min-w-0">
        {title ? <div className="font-medium">{title as string}</div> : null}
        {description ? (
          <div className={cn('text-sm', title ? 'mt-1' : '')}>
            {description as string}
          </div>
        ) : null}
        {children}
      </div>
      {dismissible ? (
        <button
          className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
          onClick={() => onAction?.({ name: 'dismiss' })}
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      ) : null}
    </div>
  );
};
