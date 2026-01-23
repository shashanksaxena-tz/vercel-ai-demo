'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const CTAInline = ({ element, children }: ComponentRenderProps) => {
  const {
    text,
    variant = 'default',
    className,
    style
  } = element.props;

  const variantStyles = {
    default: 'bg-muted rounded-lg px-4 py-3',
    bordered: 'border rounded-lg px-4 py-3',
    minimal: '',
    highlight: 'bg-primary/10 border border-primary/20 rounded-lg px-4 py-3',
  };

  return (
    <div
      className={cn(
        'flex items-center justify-between flex-wrap gap-4',
        variantStyles[variant as keyof typeof variantStyles] || variantStyles.default,
        className
      )}
      style={style as React.CSSProperties}
    >
      {text && (
        <p className="text-sm md:text-base text-foreground font-medium">
          {text as string}
        </p>
      )}
      {children && (
        <div className="flex items-center gap-3">{children}</div>
      )}
    </div>
  );
};
