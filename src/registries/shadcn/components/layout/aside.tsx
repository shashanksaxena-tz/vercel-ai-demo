'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Aside = ({ element, children }: ComponentRenderProps) => {
  const {
    width = 300,
    minWidth,
    maxWidth,
    position = 'right',
    padding = 4,
    variant = 'default',
    sticky = false,
    stickyTop = 0,
    style
  } = element.props;

  const paddingNum = typeof padding === 'number' ? padding : Number(padding) || 4;

  const variantStyles = {
    default: 'bg-background',
    bordered: 'bg-background border-l',
    filled: 'bg-muted',
    floating: 'bg-background shadow-lg rounded-lg border m-2',
  };

  return (
    <aside
      className={cn(
        'shrink-0',
        position === 'left' && 'border-r border-l-0',
        variantStyles[(variant as keyof typeof variantStyles) || 'default'],
        (sticky as boolean) && 'sticky self-start'
      )}
      style={{
        width: width as number,
        minWidth: minWidth as number,
        maxWidth: maxWidth as number,
        padding: `${paddingNum * 0.25}rem`,
        top: sticky ? (stickyTop as number) : undefined,
        ...(style as React.CSSProperties),
      }}
    >
      {children}
    </aside>
  );
};
