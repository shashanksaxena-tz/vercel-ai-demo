'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const UserCard = ({ element, onAction }: ComponentRenderProps) => {
  const {
    id,
    name,
    email,
    avatar,
    role,
    status,
    lastActive,
    style
  } = element.props;

  const statusColors = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    suspended: 'bg-red-100 text-red-800',
    pending: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <div
      className={cn('flex items-center justify-between p-4 hover:bg-muted/50 cursor-pointer')}
      onClick={() => onAction?.({ name: 'viewUser', payload: { id } } as never)}
      style={style as React.CSSProperties}
    >
      <div className="flex items-center gap-3">
        {avatar ? (
          <img src={avatar as string} alt={name as string} className="w-10 h-10 rounded-full" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-medium">
            {(name as string)?.charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <p className="font-medium">{name as string}</p>
          <p className="text-sm text-muted-foreground">{email as string}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {role && <span className="text-sm text-muted-foreground">{role as string}</span>}
        {status && (
          <span className={cn('px-2 py-0.5 text-xs rounded-full', statusColors[status as keyof typeof statusColors])}>
            {status as string}
          </span>
        )}
        {lastActive && (
          <span className="text-xs text-muted-foreground hidden sm:block">{lastActive as string}</span>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); onAction?.({ name: 'userMenu', payload: { id } } as never); }}
          className="p-1 hover:bg-muted rounded"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
};
