'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Contact = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    id,
    name,
    email,
    phone,
    company,
    avatar,
    tags,
    status,
    style
  } = element.props;

  const statusColors = {
    active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    inactive: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
    lead: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    customer: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  };

  return (
    <div
      className={cn(
        'p-4 border rounded-lg bg-background hover:shadow-md transition-shadow cursor-pointer'
      )}
      onClick={() => onAction?.({ name: 'viewContact', payload: { id } } as never)}
      style={style as React.CSSProperties}
    >
      <div className="flex items-start gap-3">
        {avatar ? (
          <img src={avatar as string} alt={name as string} className="w-12 h-12 rounded-full object-cover" />
        ) : (
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-lg font-medium">
            {(name as string)?.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold truncate">{name as string}</h3>
            {status && (
              <span className={cn('px-2 py-0.5 rounded-full text-xs', statusColors[status as keyof typeof statusColors])}>
                {status as string}
              </span>
            )}
          </div>
          {company && <p className="text-sm text-muted-foreground">{company as string}</p>}
          {email && <p className="text-sm text-muted-foreground truncate">{email as string}</p>}
          {phone && <p className="text-sm text-muted-foreground">{phone as string}</p>}
          {tags && (
            <div className="flex flex-wrap gap-1 mt-2">
              {(tags as string[]).map((tag, i) => (
                <span key={i} className="px-2 py-0.5 bg-muted text-xs rounded">{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};
