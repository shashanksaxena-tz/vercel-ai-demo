'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Overlay = ({ element, children }: ComponentRenderProps) => {
  const {
    zIndex = 50,
    background = 'dark',
    opacity = 50,
    blur = false,
    centered = true,
    onClick,
    style
  } = element.props;

  const backgroundClasses = {
    dark: 'bg-black',
    light: 'bg-white',
    primary: 'bg-primary',
    transparent: 'bg-transparent',
  };

  return (
    <div
      className={cn(
        'fixed inset-0',
        backgroundClasses[(background as keyof typeof backgroundClasses) || 'dark'],
        (blur as boolean) && 'backdrop-blur-sm',
        (centered as boolean) && 'flex items-center justify-center'
      )}
      style={{
        zIndex: zIndex as number,
        opacity: (opacity as number) / 100,
        ...style as React.CSSProperties,
      }}
      onClick={onClick as React.MouseEventHandler<HTMLDivElement>}
    >
      {children}
    </div>
  );
};
