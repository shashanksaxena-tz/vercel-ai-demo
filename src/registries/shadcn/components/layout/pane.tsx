'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Pane = ({ element, children }: ComponentRenderProps) => {
  const {
    size,
    minSize,
    maxSize,
    grow = false,
    shrink = true,
    basis,
    padding = 0,
    background,
    overflow = 'auto',
    style
  } = element.props;

  const paddingNum = typeof padding === 'number' ? padding : Number(padding) || 0;

  const overflowClasses = {
    auto: 'overflow-auto',
    hidden: 'overflow-hidden',
    scroll: 'overflow-scroll',
    visible: 'overflow-visible',
  };

  const backgroundClasses = {
    default: '',
    muted: 'bg-muted',
    card: 'bg-card',
    background: 'bg-background',
  };

  return (
    <div
      className={cn(
        overflowClasses[(overflow as keyof typeof overflowClasses) || 'auto'],
        background ? backgroundClasses[background as keyof typeof backgroundClasses] : undefined
      )}
      style={{
        width: size as string | number,
        minWidth: minSize as string | number,
        maxWidth: maxSize as string | number,
        flexGrow: grow ? 1 : 0,
        flexShrink: shrink ? 1 : 0,
        flexBasis: basis as string | number,
        padding: paddingNum ? `${paddingNum * 0.25}rem` : undefined,
        ...style as React.CSSProperties,
      }}
    >
      {children}
    </div>
  );
};
