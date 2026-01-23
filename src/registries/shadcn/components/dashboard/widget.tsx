'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

export const Widget = ({ element, children }: ComponentRenderProps) => {
  const {
    title,
    variant = 'default',
    span = 1,
    loading = false,
    style,
  } = element.props;

  const variantStyles = {
    default: 'border shadow-sm',
    elevated: 'border-0 shadow-lg',
    outline: 'border-2 shadow-none',
    ghost: 'border-0 shadow-none bg-muted/30',
    glass: 'border bg-background/80 backdrop-blur-sm',
  };

  return (
    <Card
      className={cn(
        'overflow-hidden transition-all duration-200 hover:shadow-md',
        variantStyles[(variant as keyof typeof variantStyles) || 'default'],
        loading && 'animate-pulse'
      )}
      style={{
        gridColumn: span > 1 ? `span ${span}` : undefined,
        ...(style as React.CSSProperties),
      }}
    >
      {children}
    </Card>
  );
};
