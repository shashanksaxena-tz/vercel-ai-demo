'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Panel = ({ element, children }: ComponentRenderProps) => {
  const {
    padding = 4,
    variant = 'default',
    border = true,
    borderRadius = 'lg',
    shadow,
    header,
    footer,
    style
  } = element.props;

  const paddingNum = typeof padding === 'number' ? padding : Number(padding) || 4;

  const variantStyles = {
    default: 'bg-background',
    filled: 'bg-muted',
    card: 'bg-card',
    elevated: 'bg-background shadow-lg',
    outline: 'bg-transparent',
  };

  const borderRadiusClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
  };

  const shadowClasses = {
    none: 'shadow-none',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  };

  return (
    <div
      className={cn(
        'flex flex-col',
        variantStyles[(variant as keyof typeof variantStyles) || 'default'],
        (border as boolean) && 'border',
        borderRadiusClasses[(borderRadius as keyof typeof borderRadiusClasses) || 'lg'],
        shadow ? shadowClasses[shadow as keyof typeof shadowClasses] : undefined
      )}
      style={style as React.CSSProperties}
    >
      {(header as string) && (
        <div className="px-4 py-3 border-b font-medium">
          {header as string}
        </div>
      )}
      <div
        style={{
          padding: `${paddingNum * 0.25}rem`,
        }}
      >
        {children}
      </div>
      {(footer as string) && (
        <div className="px-4 py-3 border-t bg-muted/50">
          {footer as string}
        </div>
      )}
    </div>
  );
};
