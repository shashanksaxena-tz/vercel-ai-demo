'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const OpportunityCard = ({ element, onAction }: ComponentRenderProps) => {
  const {
    id,
    name,
    value,
    probability,
    company,
    daysUntilClose,
    isHot,
    style
  } = element.props;

  return (
    <div
      className={cn(
        'p-4 border rounded-lg bg-card hover:shadow-lg transition-all cursor-pointer relative',
        isHot && 'ring-2 ring-orange-500'
      )}
      onClick={() => onAction?.({ name: 'viewOpportunity', payload: { id } })}
      style={style as React.CSSProperties}
    >
      {isHot && (
        <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-orange-500 text-white text-xs rounded-full">
          Hot
        </span>
      )}
      <h4 className="font-medium mb-1">{name as string}</h4>
      {company && <p className="text-sm text-muted-foreground mb-3">{company as string}</p>}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-bold text-primary">{value as string}</p>
          {probability !== undefined && (
            <p className="text-sm text-muted-foreground">{probability}% likely</p>
          )}
        </div>
        {daysUntilClose !== undefined && (
          <span className={cn(
            'px-2 py-1 rounded text-xs',
            (daysUntilClose as number) <= 7 ? 'bg-red-100 text-red-800' :
            (daysUntilClose as number) <= 30 ? 'bg-yellow-100 text-yellow-800' :
            'bg-green-100 text-green-800'
          )}>
            {daysUntilClose} days
          </span>
        )}
      </div>
    </div>
  );
};
