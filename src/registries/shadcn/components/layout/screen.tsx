'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Screen = ({ element, children }: ComponentRenderProps) => {
  const {
    height = '100vh',
    width = '100vw',
    overflow = 'hidden',
    background,
    centered = false,
    style
  } = element.props;

  const overflowClasses = {
    hidden: 'overflow-hidden',
    auto: 'overflow-auto',
    scroll: 'overflow-scroll',
    visible: 'overflow-visible',
  };

  const backgroundClasses = {
    default: 'bg-background',
    muted: 'bg-muted',
    dark: 'bg-zinc-900 text-white',
    gradient: 'bg-gradient-to-br from-primary/10 via-background to-secondary/10',
  };

  return (
    <div
      className={cn(
        overflowClasses[(overflow as keyof typeof overflowClasses) || 'hidden'],
        background ? backgroundClasses[background as keyof typeof backgroundClasses] : 'bg-background',
        (centered as boolean) && 'flex items-center justify-center'
      )}
      style={{
        height: height as string,
        width: width as string,
        ...style as React.CSSProperties,
      }}
    >
      {children}
    </div>
  );
};
