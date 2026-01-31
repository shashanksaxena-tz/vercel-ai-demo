'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const UserDetail = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    id,
    name,
    email,
    avatar,
    role,
    status,
    phone,
    createdAt,
    lastLogin,
    style
  } = element.props;

  return (
    <div
      className={cn('space-y-6')}
      style={style as React.CSSProperties}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          {avatar ? (
            <img src={avatar as string} alt={name as string} className="w-16 h-16 rounded-full" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-xl font-semibold text-primary">
              {(name as string)?.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <h2 className="text-xl font-bold">{name as string}</h2>
            <p className="text-muted-foreground">{email as string}</p>
            {role && <span className="inline-block mt-1 px-2 py-0.5 bg-muted text-xs rounded">{role as string}</span>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onAction?.({ name: 'editUser', payload: { id } } as never)}
            className="px-3 py-1 text-sm border rounded hover:bg-muted"
          >
            Edit
          </button>
          <button
            onClick={() => onAction?.({ name: 'suspendUser', payload: { id } } as never)}
            className="px-3 py-1 text-sm border border-destructive text-destructive rounded hover:bg-destructive hover:text-destructive-foreground"
          >
            Suspend
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border rounded-lg">
          <p className="text-sm text-muted-foreground">Status</p>
          <p className="font-medium capitalize">{status as string}</p>
        </div>
        {phone && (
          <div className="p-4 border rounded-lg">
            <p className="text-sm text-muted-foreground">Phone</p>
            <p className="font-medium">{phone as string}</p>
          </div>
        )}
        {createdAt && (
          <div className="p-4 border rounded-lg">
            <p className="text-sm text-muted-foreground">Created</p>
            <p className="font-medium">{createdAt as string}</p>
          </div>
        )}
        {lastLogin && (
          <div className="p-4 border rounded-lg">
            <p className="text-sm text-muted-foreground">Last Login</p>
            <p className="font-medium">{lastLogin as string}</p>
          </div>
        )}
      </div>

      {children}
    </div>
  );
};
