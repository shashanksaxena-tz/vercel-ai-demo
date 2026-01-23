'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const SettingsField = ({ element, children }: ComponentRenderProps) => {
  const {
    label,
    description,
    htmlFor,
    required = false,
    horizontal = false,
    style
  } = element.props;

  return (
    <div
      className={cn(
        'space-y-2',
        horizontal && 'sm:flex sm:items-start sm:justify-between sm:space-y-0 sm:gap-4'
      )}
      style={style as React.CSSProperties}
    >
      <div className={cn(horizontal && 'sm:flex-1')}>
        <label
          htmlFor={htmlFor as string}
          className="text-sm font-medium flex items-center gap-1"
        >
          {label as string}
          {required && <span className="text-destructive">*</span>}
        </label>
        {description && (
          <p className="text-sm text-muted-foreground mt-0.5">{description as string}</p>
        )}
      </div>
      <div className={cn(horizontal && 'sm:flex-1 sm:max-w-sm')}>
        {children}
      </div>
    </div>
  );
};
