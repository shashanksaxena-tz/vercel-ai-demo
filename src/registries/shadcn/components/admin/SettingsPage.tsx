'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const SettingsPage = ({ element, children }: ComponentRenderProps) => {
  const {
    title = 'Settings',
    description,
    style
  } = element.props;

  return (
    <div
      className={cn('max-w-4xl mx-auto py-8 px-4')}
      style={style as React.CSSProperties}
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{title as string}</h1>
        {description && (
          <p className="text-muted-foreground mt-2">{description as string}</p>
        )}
      </div>
      <div className="space-y-8">
        {children}
      </div>
    </div>
  );
};
