'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const ProfileCard = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    name,
    email,
    avatar,
    role,
    bio,
    showEdit = true,
    style
  } = element.props;

  return (
    <div
      className={cn('border rounded-lg bg-card p-6')}
      style={style as React.CSSProperties}
    >
      <div className="flex items-start gap-4">
        {avatar ? (
          <img src={avatar as string} alt={name as string} className="w-20 h-20 rounded-full object-cover" />
        ) : (
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-semibold text-primary">
            {(name as string)?.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-xl font-semibold">{name as string}</h3>
          {role && <p className="text-muted-foreground">{role as string}</p>}
          {email && <p className="text-sm text-muted-foreground">{email as string}</p>}
          {bio && <p className="text-sm mt-2">{bio as string}</p>}
        </div>
        {showEdit && (
          <button
            onClick={() => onAction?.({ name: 'editProfile' })}
            className="px-3 py-1 text-sm border rounded hover:bg-muted"
          >
            Edit
          </button>
        )}
      </div>
      {children}
    </div>
  );
};
