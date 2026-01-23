'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const FormGroup = ({ element, children }: ComponentRenderProps) => {
  const {
    label,
    description,
    layout = 'vertical',
    columns = 1,
    gap = 'default',
    style
  } = element.props;

  const gapStyles = {
    none: 'gap-0',
    sm: 'gap-2',
    default: 'gap-4',
    lg: 'gap-6',
  };

  const columnStyles = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div
      className="w-full"
      style={style as React.CSSProperties}
    >
      {(label || description) ? (
        <div className="mb-4">
          {label ? (
            <h3 className="text-base font-semibold">{label as string}</h3>
          ) : null}
          {description ? (
            <p className="text-sm text-muted-foreground mt-1">{description as string}</p>
          ) : null}
        </div>
      ) : null}
      <div
        className={cn(
          layout === 'horizontal'
            ? 'flex flex-wrap items-end'
            : 'grid',
          layout !== 'horizontal' && columnStyles[(columns as keyof typeof columnStyles) || 1],
          gapStyles[(gap as keyof typeof gapStyles) || 'default']
        )}
      >
        {children}
      </div>
    </div>
  );
};
