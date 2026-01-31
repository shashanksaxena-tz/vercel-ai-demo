'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const SecuritySettings = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    twoFactorEnabled = false,
    lastPasswordChange,
    activeSessions = 1,
    style
  } = element.props;

  return (
    <div
      className={cn('space-y-4')}
      style={style as React.CSSProperties}
    >
      <div className="flex items-center justify-between p-4 border rounded-lg">
        <div>
          <h4 className="font-medium">Password</h4>
          <p className="text-sm text-muted-foreground">
            {lastPasswordChange ? `Last changed ${lastPasswordChange}` : 'Set a strong password'}
          </p>
        </div>
        <button
          onClick={() => onAction?.({ name: 'changePassword' })}
          className="px-3 py-1 text-sm border rounded hover:bg-muted"
        >
          Change
        </button>
      </div>

      <div className="flex items-center justify-between p-4 border rounded-lg">
        <div>
          <h4 className="font-medium">Two-Factor Authentication</h4>
          <p className="text-sm text-muted-foreground">
            {twoFactorEnabled ? 'Enabled' : 'Add an extra layer of security'}
          </p>
        </div>
        <button
          onClick={() => onAction?.({ name: twoFactorEnabled ? 'disable2FA' : 'enable2FA' })}
          className={cn(
            'px-3 py-1 text-sm rounded',
            twoFactorEnabled
              ? 'border hover:bg-muted'
              : 'bg-primary text-primary-foreground hover:bg-primary/90'
          )}
        >
          {twoFactorEnabled ? 'Disable' : 'Enable'}
        </button>
      </div>

      <div className="flex items-center justify-between p-4 border rounded-lg">
        <div>
          <h4 className="font-medium">Active Sessions</h4>
          <p className="text-sm text-muted-foreground">{activeSessions as React.ReactNode} active session(s)</p>
        </div>
        <button
          onClick={() => onAction?.({ name: 'manageSessions' })}
          className="px-3 py-1 text-sm border rounded hover:bg-muted"
        >
          Manage
        </button>
      </div>

      {children}
    </div>
  );
};
