'use client';
// @ts-nocheck

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const LeadCard = ({ element, onAction }: ComponentRenderProps) => {
  const {
    id,
    name,
    company,
    email,
    score,
    source,
    avatar,
    style
  } = element.props;

  return (
    <div
      className={cn(
        'p-4 border rounded-lg bg-card hover:shadow-lg transition-all cursor-pointer'
      )}
      onClick={() => onAction?.({ name: 'viewLead', payload: { id } } as never)}
      style={style as React.CSSProperties}
    >
      <div className="flex items-center gap-3 mb-3">
        {avatar ? (
          <img src={avatar as string} alt="" className="w-10 h-10 rounded-full" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
            {(name as string)?.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h4 className="font-medium truncate">{name as string}</h4>
          {company && <p className="text-sm text-muted-foreground truncate">{company as string}</p>}
        </div>
      </div>
      {email && <p className="text-sm text-muted-foreground truncate mb-2">{email as string}</p>}
      <div className="flex items-center justify-between">
        {source && (
          <span className="text-xs text-muted-foreground">{source as string}</span>
        )}
        {score !== undefined && (
          <div className="flex items-center gap-1">
            <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={cn(
                  'h-full rounded-full',
                  score >= 80 ? 'bg-green-500' : score >= 50 ? 'bg-yellow-500' : 'bg-gray-400'
                )}
                style={{ width: `${score}%` }}
              />
            </div>
            <span className="text-xs font-medium">{score}</span>
          </div>
        )}
      </div>
    </div>
  );
};
