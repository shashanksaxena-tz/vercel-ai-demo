'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const CardFooter = ({ element, children }: ComponentRenderProps) => {
  const {
    actions,
    text,
    align = 'right',
    variant = 'default',
    style,
  } = element.props;

  const alignStyles = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
    between: 'justify-between',
  };

  const variantStyles = {
    default: 'border-t bg-muted/30',
    transparent: 'border-t',
    filled: 'border-t bg-muted',
  };

  return (
    <div
      className={cn(
        'flex items-center gap-4 px-6 py-4',
        alignStyles[(align as keyof typeof alignStyles) || 'right'],
        variantStyles[(variant as keyof typeof variantStyles) || 'default']
      )}
      style={style as React.CSSProperties}
    >
      {text && <p className="text-sm text-muted-foreground">{text as string}</p>}
      {actions && <div className="flex items-center gap-2">{actions as React.ReactNode}</div>}
      {children}
    </div>
  );
};
