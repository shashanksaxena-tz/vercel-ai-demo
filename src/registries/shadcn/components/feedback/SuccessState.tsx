'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { CheckCircle2 } from 'lucide-react';

export const SuccessState = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    title = 'Success',
    description,
    icon,
    action,
    actionLabel,
    secondaryAction,
    secondaryActionLabel,
    size = 'default',
    animated = true,
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
      role="status"
    >
      <div
        className={cn(
          'text-green-500 mb-4',
          sizes.icon,
          animated ? 'animate-in zoom-in-50 duration-300' : ''
        )}
      >
        <CheckCircle2 className="h-full w-full" />
      </div>
      {title ? (
        <h3 className={cn('font-semibold', sizes.title)}>{title as string}</h3>
      ) : null}
      {description ? (
        <p className={cn('text-muted-foreground mt-2 max-w-sm', sizes.description)}>
          {description as string}
        </p>
      ) : null}
      {children}
      {(action || secondaryAction) ? (
        <div className="flex items-center gap-3 mt-6">
          {action && actionLabel ? (
            <button
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              onClick={() => onAction?.({ name: action as string })}
            >
              {actionLabel as string}
            </button>
          ) : null}
          {secondaryAction && secondaryActionLabel ? (
            <button
              className="inline-flex items-center justify-center rounded-md border bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
              onClick={() => onAction?.({ name: secondaryAction as string })}
            >
              {secondaryActionLabel as string}
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};
