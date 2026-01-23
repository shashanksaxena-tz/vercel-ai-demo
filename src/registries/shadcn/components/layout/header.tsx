'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Header = ({ element, children }: ComponentRenderProps) => {
  const {
    height = 64,
    sticky = false,
    stickyTop = 0,
    variant = 'default',
    padding = 4,
    justify = 'between',
    align = 'center',
    style
  } = element.props;

  const paddingNum = typeof padding === 'number' ? padding : Number(padding) || 4;

  const variantStyles = {
    default: 'bg-background border-b',
    transparent: 'bg-transparent',
    filled: 'bg-muted',
    floating: 'bg-background/80 backdrop-blur-md border-b',
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
    <header
      className={cn(
        'w-full flex shrink-0',
        variantStyles[(variant as keyof typeof variantStyles) || 'default'],
        justifyContent[(justify as keyof typeof justifyContent) || 'between'],
        alignItems[(align as keyof typeof alignItems) || 'center'],
        (sticky as boolean) && 'sticky z-50'
      )}
      style={{
        height: height as number,
        minHeight: height as number,
        paddingLeft: `${paddingNum * 0.25}rem`,
        paddingRight: `${paddingNum * 0.25}rem`,
        top: sticky ? (stickyTop as number) : undefined,
        ...style as React.CSSProperties,
      }}
    >
      {children}
    </header>
  );
};
