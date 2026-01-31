'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const RoleCard = ({ element, onAction }: ComponentRenderProps) => {
  const {
    id,
    name,
    description,
    userCount,
    permissions,
    isSystem = false,
    color,
    style
  } = element.props;

  return (
    <div
      className={cn(
        'p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer',
        color && `border-l-4 border-l-${color}-500`
      )}
      onClick={() => onAction?.({ name: 'viewRole', payload: { id } } as never)}
      style={style as React.CSSProperties}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-semibold">{name as string}</h4>
            {isSystem && (
              <span className="px-2 py-0.5 bg-muted text-xs rounded">System</span>
            )}
          </div>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description as string}</p>
          )}
          {userCount !== undefined && (
            <p className="text-sm text-muted-foreground mt-2">{userCount as React.ReactNode} users</p>
          )}
          {permissions && (
            <div className="flex flex-wrap gap-1 mt-2">
              {(permissions as string[]).slice(0, 3).map((perm, i) => (
                <span key={i} className="px-2 py-0.5 bg-muted text-xs rounded">{perm}</span>
              ))}
              {(permissions as string[]).length > 3 && (
                <span className="px-2 py-0.5 bg-muted text-xs rounded">
                  +{(permissions as string[]).length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
        {!isSystem && (
          <button
            onClick={(e) => { e.stopPropagation(); onAction?.({ name: 'editRole', payload: { id } } as never); }}
            className="p-1 hover:bg-muted rounded"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
