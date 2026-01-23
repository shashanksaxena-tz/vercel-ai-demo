'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const DangerZone = ({ element, children }: ComponentRenderProps) => {
  const {
    title = 'Danger Zone',
    description,
    style
  } = element.props;

  return (
    <div
      className={cn('border-2 border-destructive/50 rounded-lg overflow-hidden')}
      style={style as React.CSSProperties}
    >
      <div className="bg-destructive/10 px-4 py-3 border-b border-destructive/50">
        <h3 className="font-semibold text-destructive">{title as string}</h3>
        {description && (
          <p className="text-sm text-muted-foreground">{description as string}</p>
        )}
      </div>
      <div className="p-4 space-y-4">
        {children}
      </div>
    </div>
  );
};
