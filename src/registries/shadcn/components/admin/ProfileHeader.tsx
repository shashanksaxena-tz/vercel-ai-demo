'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const ProfileHeader = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    name,
    avatar,
    coverImage,
    role,
    status,
    showStatus = true,
    style
  } = element.props;

  const statusColors = {
    active: 'bg-green-500',
    inactive: 'bg-gray-400',
    away: 'bg-yellow-500',
  };

  return (
    <div
      className={cn('relative')}
      style={style as React.CSSProperties}
    >
      {coverImage && (
        <div
          className="h-32 bg-cover bg-center rounded-t-lg"
          style={{ backgroundImage: `url(${coverImage})` }}
        />
      )}
      <div className={cn('flex items-end gap-4 p-4', coverImage && '-mt-12')}>
        <div className="relative">
          {avatar ? (
            <img
              src={avatar as string}
              alt={name as string}
              className={cn(
                'rounded-full object-cover border-4 border-background',
                coverImage ? 'w-24 h-24' : 'w-16 h-16'
              )}
            />
          ) : (
            <div
              className={cn(
                'rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary border-4 border-background',
                coverImage ? 'w-24 h-24 text-2xl' : 'w-16 h-16 text-xl'
              )}
            >
              {(name as string)?.charAt(0).toUpperCase()}
            </div>
          )}
          {showStatus && status && (
            <span
              className={cn(
                'absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-background',
                statusColors[status as keyof typeof statusColors] || statusColors.inactive
              )}
            />
          )}
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold">{name as string}</h2>
          {role && <p className="text-muted-foreground">{role as string}</p>}
        </div>
        {children}
      </div>
    </div>
  );
};
