'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const SkeletonAvatar = ({ element }: ComponentRenderProps) => {
  const {
    size = 'default',
    shape = 'circle',
    animated = true,
    className,
    style
  } = element.props;

  const sizeStyles = {
    xs: 'h-6 w-6',
    sm: 'h-8 w-8',
    default: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
    '2xl': 'h-20 w-20',
  };

  const shapeStyles = {
    circle: 'rounded-full',
    square: 'rounded-md',
  };

  return (
    <div
      className={cn(
        'bg-muted flex-shrink-0',
        sizeStyles[(size as keyof typeof sizeStyles) || 'default'],
        shapeStyles[(shape as keyof typeof shapeStyles) || 'circle'],
        animated ? 'animate-pulse' : '',
        className as string
      )}
      style={style as React.CSSProperties}
    />
  );
};
