'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Deal = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    id,
    name,
    value,
    stage,
    probability,
    company,
    contact,
    closeDate,
    style
  } = element.props;

  const stageColors = {
    lead: 'bg-gray-100 text-gray-800',
    qualified: 'bg-blue-100 text-blue-800',
    proposal: 'bg-yellow-100 text-yellow-800',
    negotiation: 'bg-orange-100 text-orange-800',
    won: 'bg-green-100 text-green-800',
    lost: 'bg-red-100 text-red-800',
  };

  return (
    <div
      className={cn(
        'p-4 border rounded-lg bg-background hover:shadow-md transition-shadow cursor-pointer'
      )}
      onClick={() => onAction?.({ name: 'viewDeal', payload: { id } } as never)}
      style={style as React.CSSProperties}
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="font-semibold">{name as string}</h3>
          {company && <p className="text-sm text-muted-foreground">{company as string}</p>}
        </div>
        <span className="text-lg font-bold text-primary">{value as string}</span>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        {stage && (
          <span className={cn('px-2 py-0.5 rounded-full text-xs', stageColors[stage as keyof typeof stageColors] || stageColors.lead)}>
            {stage as string}
          </span>
        )}
        {probability !== undefined && (
          <span className="text-xs text-muted-foreground">{probability as number}% probability</span>
        )}
        {closeDate && (
          <span className="text-xs text-muted-foreground">Close: {closeDate as string}</span>
        )}
      </div>
      {contact && (
        <p className="text-sm text-muted-foreground mt-2">Contact: {contact as string}</p>
      )}
      {children}
    </div>
  );
};
