'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Paragraph = ({ element, children }: ComponentRenderProps) => {
  const { content, size = 'default', className, style } = element.props;

  const sizes = {
    sm: 'text-sm leading-6',
    default: 'text-base leading-7',
    lg: 'text-lg leading-8',
  };

  return (
    <p
      className={cn(
        sizes[(size as keyof typeof sizes)] || sizes.default,
        '[&:not(:first-child)]:mt-6',
        className as string
      )}
      style={style as React.CSSProperties}
    >
      {(content as React.ReactNode) || children}
    </p>
  );
};
