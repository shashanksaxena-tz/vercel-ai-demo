'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const RoleList = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    title = 'Roles',
    showAddRole = true,
    style
  } = element.props;

  return (
    <div
      className={cn('space-y-4')}
      style={style as React.CSSProperties}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{title as string}</h3>
        {showAddRole && (
          <button
            onClick={() => onAction?.({ name: 'addRole' })}
            className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90"
          >
            Add Role
          </button>
        )}
      </div>
      <div className="grid gap-4">
        {children}
      </div>
    </div>
  );
};
