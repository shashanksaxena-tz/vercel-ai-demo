'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Fieldset = ({ element, children }: ComponentRenderProps) => {
  const {
    legend,
    description,
    disabled = false,
    variant = 'default', // 'default' | 'bordered' | 'card'
    style
  } = element.props;

  const variantStyles = {
    default: '',
    bordered: 'border border-input rounded-md p-4',
    card: 'border border-input rounded-lg p-6 bg-card shadow-sm',
  };

  return (
    <fieldset
      className={cn(
        'w-full',
        variantStyles[(variant as keyof typeof variantStyles) || 'default']
      )}
      style={style as React.CSSProperties}
      disabled={disabled as boolean}
    >
      {legend ? (
        <legend className={cn(
          'text-base font-semibold',
          variant === 'bordered' && 'px-2',
          variant === 'card' && 'px-2 -ml-2'
        )}>
          {legend as string}
        </legend>
      ) : null}
      {description ? (
        <p className="text-sm text-muted-foreground mt-1 mb-4">{description as string}</p>
      ) : null}
      <div className={cn('space-y-4', !legend && !description && 'pt-0')}>
        {children}
      </div>
    </fieldset>
  );
};
