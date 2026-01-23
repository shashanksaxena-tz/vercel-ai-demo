'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { X, Info, AlertTriangle, AlertCircle, CheckCircle2, Megaphone } from 'lucide-react';

export const Banner = ({ element, onAction }: ComponentRenderProps) => {
  const {
    title,
    description,
    variant = 'default',
    position = 'top',
    showIcon = true,
    dismissible = true,
    action,
    actionLabel,
    className,
    style
  } = element.props;

  const variantStyles = {
    default: 'bg-muted text-foreground',
    info: 'bg-blue-50 text-blue-900 dark:bg-blue-900/20 dark:text-blue-100',
    success: 'bg-green-50 text-green-900 dark:bg-green-900/20 dark:text-green-100',
    warning: 'bg-yellow-50 text-yellow-900 dark:bg-yellow-900/20 dark:text-yellow-100',
    error: 'bg-red-50 text-red-900 dark:bg-red-900/20 dark:text-red-100',
    promo: 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground',
  };

  const icons = {
    default: <Megaphone className="h-4 w-4" />,
    info: <Info className="h-4 w-4 text-blue-500" />,
    success: <CheckCircle2 className="h-4 w-4 text-green-500" />,
    warning: <AlertTriangle className="h-4 w-4 text-yellow-500" />,
    error: <AlertCircle className="h-4 w-4 text-red-500" />,
    promo: <Megaphone className="h-4 w-4" />,
  };

  const positionStyles = {
    top: 'top-0 left-0 right-0',
    bottom: 'bottom-0 left-0 right-0',
    inline: 'relative',
  };

  const Icon = icons[(variant as keyof typeof icons) || 'default'];

  return (
    <div
      className={cn(
        'flex items-center justify-center gap-3 px-4 py-3',
        position !== 'inline' && 'fixed z-50',
        variantStyles[(variant as keyof typeof variantStyles) || 'default'],
        positionStyles[(position as keyof typeof positionStyles) || 'top'],
        className as string
      )}
      style={style as React.CSSProperties}
      role="banner"
    >
      {showIcon ? <div className="flex-shrink-0">{Icon}</div> : null}
      <div className="flex items-center gap-2 flex-wrap justify-center text-sm">
        {title ? <span className="font-medium">{title as string}</span> : null}
        {description ? <span className="opacity-90">{description as string}</span> : null}
      </div>
      {action && actionLabel ? (
        <button
          className="flex-shrink-0 text-sm font-medium underline hover:no-underline"
          onClick={() => onAction?.({ name: action as string })}
        >
          {actionLabel as string}
        </button>
      ) : null}
      {dismissible ? (
        <button
          className="flex-shrink-0 ml-2 opacity-70 hover:opacity-100 transition-opacity"
          onClick={() => onAction?.({ name: 'dismiss' })}
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      ) : null}
    </div>
  );
};
