'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const InputAddon = ({ element, children }: ComponentRenderProps) => {
  const {
    text,
    position = 'left', // 'left' | 'right'
    variant = 'default', // 'default' | 'filled'
    icon,
    style
  } = element.props;

  const variantStyles = {
    default: 'bg-background border border-input',
    filled: 'bg-muted border border-input',
  };

  return (
    <div
      className={cn(
        'addon flex items-center justify-center px-3 text-sm text-muted-foreground',
        variantStyles[(variant as keyof typeof variantStyles) || 'default'],
        position === 'left' ? 'rounded-l-md' : 'rounded-r-md'
      )}
      style={style as React.CSSProperties}
    >
      {icon ? (
        <span className="flex items-center justify-center">{icon as string}</span>
      ) : null}
      {text ? (text as string) : children}
    </div>
  );
};
