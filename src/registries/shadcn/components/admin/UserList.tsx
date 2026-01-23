'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const UserList = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    title = 'Users',
    totalUsers,
    showSearch = true,
    showFilters = true,
    style
  } = element.props;

  return (
    <div
      className={cn('space-y-4')}
      style={style as React.CSSProperties}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">{title as string}</h3>
          {totalUsers !== undefined && (
            <p className="text-sm text-muted-foreground">{totalUsers} total users</p>
          )}
        </div>
        <button
          onClick={() => onAction?.({ name: 'addUser' })}
          className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90"
        >
          Add User
        </button>
      </div>

      {(showSearch || showFilters) && (
        <div className="flex items-center gap-3">
          {showSearch && (
            <div className="flex-1 relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search users..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg bg-background"
                onChange={(e) => onAction?.({ name: 'search', payload: { query: e.target.value } })}
              />
            </div>
          )}
          {showFilters && (
            <button
              onClick={() => onAction?.({ name: 'openFilters' })}
              className="px-3 py-2 border rounded-lg hover:bg-muted flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filters
            </button>
          )}
        </div>
      )}

      <div className="border rounded-lg divide-y">
        {children}
      </div>
    </div>
  );
};
