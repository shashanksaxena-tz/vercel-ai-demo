'use client';

import React, { useState, useEffect } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

export const Snackbar = ({ element, onAction }: ComponentRenderProps) => {
  const {
    message,
    variant = 'default',
    position = 'bottom-center',
    duration = 5000,
    showClose = true,
    action,
    actionLabel,
    open = true,
    className,
    style
  } = element.props;

  const [isVisible, setIsVisible] = useState(open as boolean);

  useEffect(() => {
    setIsVisible(open as boolean);
  }, [open]);

  useEffect(() => {
    if (isVisible && duration && (duration as number) > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onAction?.({ name: 'close' });
      }, duration as number);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onAction]);

  const variantStyles = {
    default: 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900',
    success: 'bg-green-600 text-white',
    error: 'bg-red-600 text-white',
    warning: 'bg-yellow-500 text-black',
    info: 'bg-blue-600 text-white',
  };

  const positionStyles = {
    'top-left': 'top-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
    'bottom-right': 'bottom-4 right-4',
  };

  const handleClose = () => {
    setIsVisible(false);
    onAction?.({ name: 'close' });
  };

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        'fixed z-50 flex items-center gap-3 rounded-md px-4 py-3 shadow-lg min-w-[200px] max-w-[400px] animate-in slide-in-from-bottom-5 duration-300',
        variantStyles[(variant as keyof typeof variantStyles) || 'default'],
        positionStyles[(position as keyof typeof positionStyles) || 'bottom-center'],
        className as string
      )}
      style={style as React.CSSProperties}
      role="alert"
      aria-live="polite"
    >
      <span className="flex-1 text-sm">{message as string}</span>
      {action && actionLabel ? (
        <button
          className="flex-shrink-0 text-sm font-medium opacity-90 hover:opacity-100 uppercase tracking-wide"
          onClick={() => onAction?.({ name: action as string })}
        >
          {actionLabel as string}
        </button>
      ) : null}
      {showClose ? (
        <button
          className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
          onClick={handleClose}
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      ) : null}
    </div>
  );
};
