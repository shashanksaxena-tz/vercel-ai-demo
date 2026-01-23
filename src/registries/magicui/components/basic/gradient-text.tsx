'use client';

import React, { JSX } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const GradientText = ({ element, children }: ComponentRenderProps) => {
  const { variant = 'h1', gradient = 'primary', animate = true, className, style } = element.props;

  const variants = {
    h1: 'text-4xl font-bold tracking-tight',
    h2: 'text-3xl font-semibold tracking-tight',
    h3: 'text-2xl font-semibold',
    h4: 'text-xl font-medium',
    p: 'text-base',
  };

  const gradients = {
    primary: 'from-primary via-purple-500 to-pink-500',
    rainbow: 'from-red-500 via-yellow-500 to-green-500',
    ocean: 'from-blue-500 via-teal-500 to-cyan-500',
    sunset: 'from-orange-500 via-red-500 to-pink-500',
    forest: 'from-green-500 via-emerald-500 to-teal-500',
    cosmic: 'from-purple-500 via-violet-500 to-indigo-500',
  };

  const Component = ['h1', 'h2', 'h3', 'h4'].includes(variant as string)
    ? (variant as keyof JSX.IntrinsicElements)
    : 'span';

  return React.createElement(
    Component,
    {
      className: cn(
        variants[(variant as keyof typeof variants)] || variants.h1,
        'bg-gradient-to-r bg-clip-text text-transparent',
        gradients[(gradient as keyof typeof gradients)] || gradients.primary,
        animate && 'animate-gradient bg-[length:200%_auto]',
        className as string
      ),
      style: {
        ...(style as React.CSSProperties),
        ...(animate ? { animation: 'gradient 3s linear infinite' } : {}),
      },
    },
    <>
      {children}
      {animate && (
        <style jsx>{`
          @keyframes gradient {
            0%, 100% { background-position: 0% center; }
            50% { background-position: 100% center; }
          }
        `}</style>
      )}
    </>
  );
};
