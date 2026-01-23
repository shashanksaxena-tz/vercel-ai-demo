'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Footer = ({ element, children }: ComponentRenderProps) => {
  const {
    height,
    padding = 4,
    variant = 'default',
    sticky = false,
    justify = 'between',
    align = 'center',
    style
  } = element.props;

  const paddingNum = typeof padding === 'number' ? padding : Number(padding) || 4;

  const variantStyles = {
    default: 'bg-background border-t',
    filled: 'bg-muted',
    dark: 'bg-zinc-900 text-white',
    transparent: 'bg-transparent',
    solid: 'bg-primary text-primary-foreground',
  };

  const justifyContent = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
  };

  const alignItems = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  };

  return (
    <footer
      className={cn(
        'w-full flex shrink-0',
        variantStyles[(variant as keyof typeof variantStyles) || 'default'],
        justifyContent[(justify as keyof typeof justifyContent) || 'between'],
        alignItems[(align as keyof typeof alignItems) || 'center'],
        (sticky as boolean) && 'sticky bottom-0 z-50'
      )}
      style={{
        height: height as number,
        minHeight: height as number,
        padding: `${paddingNum * 0.25}rem`,
        ...style as React.CSSProperties,
      }}
    >
      {children}
    </footer>
  );
};
