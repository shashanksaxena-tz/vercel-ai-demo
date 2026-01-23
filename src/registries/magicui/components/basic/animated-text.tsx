'use client';

import React, { JSX } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const AnimatedText = ({ element, children }: ComponentRenderProps) => {
  const { variant = 'p', animation = 'fade-in', delay = 0, className, style } = element.props;

  const variants = {
    h1: 'text-4xl font-bold',
    h2: 'text-3xl font-semibold',
    h3: 'text-2xl font-semibold',
    h4: 'text-xl font-medium',
    p: 'text-base',
  };

  const animations = {
    'fade-in': 'animate-in fade-in duration-700',
    'slide-up': 'animate-in fade-in slide-in-from-bottom-4 duration-700',
    'slide-down': 'animate-in fade-in slide-in-from-top-4 duration-700',
    'slide-left': 'animate-in fade-in slide-in-from-right-4 duration-700',
    'slide-right': 'animate-in fade-in slide-in-from-left-4 duration-700',
    'zoom-in': 'animate-in fade-in zoom-in-50 duration-700',
    'blur-in': 'animate-in fade-in duration-700',
  };

  const Component = ['h1', 'h2', 'h3', 'h4'].includes(variant as string)
    ? (variant as keyof JSX.IntrinsicElements)
    : 'p';

  return React.createElement(
    Component,
    {
      className: cn(
        variants[(variant as keyof typeof variants)] || variants.p,
        animations[(animation as keyof typeof animations)] || animations['fade-in'],
        className as string
      ),
      style: {
        animationDelay: `${delay}ms`,
        animationFillMode: 'both',
        ...(style as React.CSSProperties),
      },
    },
    children
  );
};
