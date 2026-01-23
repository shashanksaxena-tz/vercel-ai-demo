'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Frame = ({ element, children }: ComponentRenderProps) => {
  const {
    width,
    height,
    aspectRatio,
    border = true,
    borderRadius = 'md',
    shadow,
    overflow = 'hidden',
    background,
    style
  } = element.props;

  const borderRadiusClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
    full: 'rounded-full',
  };

  const shadowClasses = {
    none: 'shadow-none',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    '2xl': 'shadow-2xl',
  };

  const overflowClasses = {
    hidden: 'overflow-hidden',
    auto: 'overflow-auto',
    scroll: 'overflow-scroll',
    visible: 'overflow-visible',
  };

  const backgroundClasses = {
    default: '',
    muted: 'bg-muted',
    card: 'bg-card',
    white: 'bg-white',
    black: 'bg-black',
  };

  return (
    <div
      className={cn(
        'relative',
        (border as boolean) && 'border',
        borderRadiusClasses[(borderRadius as keyof typeof borderRadiusClasses) || 'md'],
        shadow ? shadowClasses[shadow as keyof typeof shadowClasses] : undefined,
        overflowClasses[(overflow as keyof typeof overflowClasses) || 'hidden'],
        background ? backgroundClasses[background as keyof typeof backgroundClasses] : undefined
      )}
      style={{
        width: width as string | number,
        height: height as string | number,
        aspectRatio: aspectRatio as string,
        ...style as React.CSSProperties,
      }}
    >
      {children}
    </div>
  );
};
