import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Container = ({ element, children }: ComponentRenderProps) => {
  const { maxWidth = '7xl', style } = element.props;

  const maxWidthClass = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
    full: 'max-w-full',
  }[maxWidth as string] || 'max-w-7xl';

  return (
    <div
      className={cn('mx-auto px-4', maxWidthClass)}
      style={style as React.CSSProperties}
    >
      {children}
    </div>
  );
};
