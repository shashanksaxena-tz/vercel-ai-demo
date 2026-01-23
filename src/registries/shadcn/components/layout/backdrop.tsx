'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Backdrop = ({ element, children }: ComponentRenderProps) => {
  const {
    visible = true,
    zIndex = 40,
    blur = 'sm',
    opacity = 50,
    color = 'black',
    onClick,
    style
  } = element.props;

  if (!visible) return null;

  const blurClasses = {
    none: '',
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl',
    '2xl': 'backdrop-blur-2xl',
    '3xl': 'backdrop-blur-3xl',
  };

  const colorClasses = {
    black: 'bg-black',
    white: 'bg-white',
    primary: 'bg-primary',
    muted: 'bg-muted',
  };

  return (
    <div
      className={cn(
        'fixed inset-0 transition-opacity',
        blurClasses[(blur as keyof typeof blurClasses) || 'sm'],
        colorClasses[(color as keyof typeof colorClasses) || 'black']
      )}
      style={{
        zIndex: zIndex as number,
        opacity: (opacity as number) / 100,
        ...style as React.CSSProperties,
      }}
      onClick={onClick as React.MouseEventHandler<HTMLDivElement>}
      aria-hidden="true"
    >
      {children}
    </div>
  );
};
