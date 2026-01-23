'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const CardHeader = ({ element, children }: ComponentRenderProps) => {
  const {
    title,
    subtitle,
    description,
    actions,
    avatar,
    icon,
    style,
  } = element.props;

  return (
    <div
      className={cn('flex items-start gap-4 p-6')}
      style={style as React.CSSProperties}
    >
      {avatar && (
        <img
          src={avatar as string}
          alt=""
          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
        />
      )}
      {icon && !avatar && (
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <span className="text-primary">{icon as React.ReactNode}</span>
        </div>
      )}
      <div className="flex-1 min-w-0">
        {title && (
          <h3 className="text-lg font-semibold tracking-tight truncate">
            {title as string}
          </h3>
        )}
        {subtitle && (
          <p className="text-sm font-medium text-muted-foreground">
            {subtitle as string}
          </p>
        )}
        {description && (
          <p className="text-sm text-muted-foreground mt-1">
            {description as string}
          </p>
        )}
        {children}
      </div>
      {actions && (
        <div className="flex-shrink-0 flex items-center gap-2">
          {actions as React.ReactNode}
        </div>
      )}
    </div>
  );
};
