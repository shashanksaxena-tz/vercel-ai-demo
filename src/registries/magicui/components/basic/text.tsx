'use client';

import React, { JSX } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Text = ({ element, children }: ComponentRenderProps) => {
  const { variant = 'p', className, style, animate = false } = element.props;

  const variants = {
    h1: 'text-4xl font-bold tracking-tight',
    h2: 'text-3xl font-semibold tracking-tight',
    h3: 'text-2xl font-semibold',
    h4: 'text-xl font-medium',
    h5: 'text-lg font-medium',
    h6: 'text-base font-medium',
    p: 'text-base',
    small: 'text-sm',
    muted: 'text-sm text-muted-foreground',
    lead: 'text-xl text-muted-foreground',
  };

  const animationClass = animate
    ? 'animate-in fade-in slide-in-from-bottom-2 duration-500'
    : '';

  const Component = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(variant as string)
    ? (variant as keyof JSX.IntrinsicElements)
    : 'p';

  return React.createElement(
    Component,
    {
      className: cn(
        variants[(variant as keyof typeof variants)] || variants.p,
        animationClass,
        className as string
      ),
      style: style as React.CSSProperties,
    },
    children
  );
};
