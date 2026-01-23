'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Maintenance = ({ element, onAction }: ComponentRenderProps) => {
  const {
    isActive = false,
    scheduledStart,
    scheduledEnd,
    message,
    allowAdmin = true,
    style
  } = element.props;

  return (
    <div
      className={cn(
        'p-4 border rounded-lg',
        isActive ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20' : 'bg-muted/30'
      )}
      style={style as React.CSSProperties}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={cn(
            'w-10 h-10 rounded-full flex items-center justify-center',
            isActive ? 'bg-yellow-200 text-yellow-700' : 'bg-muted text-muted-foreground'
          )}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <h4 className="font-semibold">Maintenance Mode</h4>
            <p className="text-sm text-muted-foreground">
              {isActive ? 'Currently active' : 'Not active'}
            </p>
          </div>
        </div>
        <button
          onClick={() => onAction?.({ name: isActive ? 'disableMaintenance' : 'enableMaintenance' })}
          className={cn(
            'px-3 py-1 text-sm rounded',
            isActive
              ? 'border hover:bg-muted'
              : 'bg-yellow-500 text-white hover:bg-yellow-600'
          )}
        >
          {isActive ? 'Disable' : 'Enable'}
        </button>
      </div>

      {(scheduledStart || scheduledEnd || message) && (
        <div className="mt-4 pt-4 border-t space-y-2">
          {scheduledStart && (
            <p className="text-sm">
              <span className="text-muted-foreground">Start:</span> {scheduledStart as string}
            </p>
          )}
          {scheduledEnd && (
            <p className="text-sm">
              <span className="text-muted-foreground">End:</span> {scheduledEnd as string}
            </p>
          )}
          {message && (
            <p className="text-sm">
              <span className="text-muted-foreground">Message:</span> {message as string}
            </p>
          )}
          {allowAdmin && (
            <p className="text-xs text-muted-foreground">Admins can still access the system</p>
          )}
        </div>
      )}
    </div>
  );
};
