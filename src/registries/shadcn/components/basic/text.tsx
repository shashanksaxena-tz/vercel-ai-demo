'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Text = ({ element, children }: ComponentRenderProps) => {
  const { variant = 'body', content, className, style } = element.props;

  const variants = {
    body: 'text-base leading-7',
    body1: 'text-base leading-7',
    body2: 'text-sm leading-6',
    lead: 'text-xl text-muted-foreground',
    large: 'text-lg font-semibold',
    muted: 'text-sm text-muted-foreground',
    subtle: 'text-sm text-muted-foreground/80',
  };

  return (
    <p
      className={cn(
        variants[(variant as keyof typeof variants)] || variants.body,
        className as string
      )}
      style={style as React.CSSProperties}
    >
      {(content as React.ReactNode) || children}
    </p>
  );
};
