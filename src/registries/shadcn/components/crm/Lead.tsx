'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Lead = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    id,
    name,
    email,
    phone,
    company,
    source,
    score,
    status,
    assignedTo,
    createdAt,
    style
  } = element.props;

  const statusColors = {
    new: 'bg-blue-100 text-blue-800',
    contacted: 'bg-yellow-100 text-yellow-800',
    qualified: 'bg-green-100 text-green-800',
    unqualified: 'bg-red-100 text-red-800',
    converted: 'bg-purple-100 text-purple-800',
  };

  return (
    <div
      className={cn(
        'p-4 border rounded-lg bg-background hover:shadow-md transition-shadow cursor-pointer'
      )}
      onClick={() => onAction?.({ name: 'viewLead', payload: { id } })}
      style={style as React.CSSProperties}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold">{name as string}</h3>
          {company && <p className="text-sm text-muted-foreground">{company as string}</p>}
        </div>
        <div className="flex items-center gap-2">
          {score !== undefined && (
            <span className={cn(
              'px-2 py-0.5 rounded text-xs font-medium',
              score >= 80 ? 'bg-green-100 text-green-800' :
              score >= 50 ? 'bg-yellow-100 text-yellow-800' :
              'bg-gray-100 text-gray-800'
            )}>
              Score: {score}
            </span>
          )}
          {status && (
            <span className={cn('px-2 py-0.5 rounded-full text-xs', statusColors[status as keyof typeof statusColors])}>
              {status as string}
            </span>
          )}
        </div>
      </div>
      <div className="mt-3 space-y-1 text-sm text-muted-foreground">
        {email && <p>{email as string}</p>}
        {phone && <p>{phone as string}</p>}
        {source && <p>Source: {source as string}</p>}
        {assignedTo && <p>Assigned to: {assignedTo as string}</p>}
      </div>
      {createdAt && (
        <p className="text-xs text-muted-foreground mt-2">Created: {createdAt as string}</p>
      )}
      {children}
    </div>
  );
};
