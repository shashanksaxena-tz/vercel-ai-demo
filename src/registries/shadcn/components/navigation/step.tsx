'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Step = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    label,
    description,
    icon,
    index = 0,
    status = 'pending',
    clickable,
    variant = 'default',
    orientation = 'horizontal',
    style
  } = element.props;

  const variants = {
    default: {
      completed: 'bg-primary text-primary-foreground',
      current: 'border-2 border-primary text-primary bg-background',
      pending: 'border-2 border-muted text-muted-foreground bg-background',
      error: 'bg-destructive text-destructive-foreground',
    },
    simple: {
      completed: 'bg-primary text-primary-foreground',
      current: 'bg-primary/20 text-primary border-2 border-primary',
      pending: 'bg-muted text-muted-foreground',
      error: 'bg-destructive text-destructive-foreground',
    },
  };

  const variantStyles = variants[variant as keyof typeof variants] || variants.default;
  const statusKey = status as keyof typeof variantStyles;

  const handleClick = () => {
    if (clickable) {
      onAction?.({ name: 'stepSelect', payload: { index } } as never);
    }
  };

  const renderIcon = () => {
    if (status === 'completed') {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      );
    }
    if (status === 'error') {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      );
    }
    if (icon) {
      return icon as React.ReactNode;
    }
    return <span className="text-sm font-medium">{(index as number) + 1}</span>;
  };

  return (
    <div
      className={cn(
        'flex gap-3',
        orientation === 'vertical' ? 'flex-row' : 'flex-col items-center',
        clickable && 'cursor-pointer'
      )}
      style={style as React.CSSProperties}
      onClick={handleClick}
    >
      <div
        className={cn(
          'flex items-center justify-center w-10 h-10 rounded-full shrink-0 transition-colors',
          variantStyles[statusKey]
        )}
      >
        {renderIcon()}
      </div>
      <div className={cn(orientation === 'horizontal' && 'text-center')}>
        {label && (
          <div
            className={cn(
              'text-sm font-medium',
              status === 'current' ? 'text-foreground' : 'text-muted-foreground'
            )}
          >
            {label as string}
          </div>
        )}
        {description && (
          <div className="text-xs text-muted-foreground mt-0.5">
            {description as string}
          </div>
        )}
        {children}
      </div>
    </div>
  );
};
