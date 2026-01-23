'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Chat = ({ element, children }: ComponentRenderProps) => {
  const {
    variant = 'default',
    fullHeight = false,
    style
  } = element.props;

  const variants = {
    default: 'bg-background border rounded-lg',
    embedded: 'bg-muted/30',
    floating: 'bg-background border rounded-xl shadow-lg',
    minimal: 'bg-transparent',
  };

  return (
    <div
      className={cn(
        'flex flex-col',
        variants[variant as keyof typeof variants] || variants.default,
        fullHeight && 'h-full'
      )}
      style={style as React.CSSProperties}
    >
      {children}
    </div>
  );
};
