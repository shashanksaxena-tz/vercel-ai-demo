'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const ProfileForm = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    avatar,
    name,
    showAvatarUpload = true,
    style
  } = element.props;

  return (
    <div
      className={cn('space-y-6')}
      style={style as React.CSSProperties}
    >
      {showAvatarUpload && (
        <div className="flex items-center gap-4">
          {avatar ? (
            <img src={avatar as string} alt={name as string || ''} className="w-24 h-24 rounded-full object-cover" />
          ) : (
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center text-3xl font-semibold text-muted-foreground">
              {(name as string)?.charAt(0).toUpperCase() || '?'}
            </div>
          )}
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => onAction?.({ name: 'uploadAvatar' })}
              className="px-3 py-1 text-sm border rounded hover:bg-muted"
            >
              Change photo
            </button>
            {avatar && (
              <button
                type="button"
                onClick={() => onAction?.({ name: 'removeAvatar' })}
                className="block text-sm text-destructive hover:underline"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      )}
      {children}
    </div>
  );
};
