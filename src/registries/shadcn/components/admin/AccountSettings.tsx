'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const AccountSettings = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    email,
    username,
    createdAt,
    lastLogin,
    verified = false,
    style
  } = element.props;

  return (
    <div
      className={cn('space-y-6')}
      style={style as React.CSSProperties}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {email && (
          <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{email as string}</p>
              </div>
              <div className="flex items-center gap-2">
                {verified ? (
                  <span className="text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">Verified</span>
                ) : (
                  <button
                    onClick={() => onAction?.({ name: 'verifyEmail' })}
                    className="text-xs text-primary hover:underline"
                  >
                    Verify
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
        {username && (
          <div className="p-4 border rounded-lg">
            <p className="text-sm text-muted-foreground">Username</p>
            <p className="font-medium">{username as string}</p>
          </div>
        )}
        {createdAt && (
          <div className="p-4 border rounded-lg">
            <p className="text-sm text-muted-foreground">Account Created</p>
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
