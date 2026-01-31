'use client';
// @ts-nocheck

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Opportunity = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    id,
    name,
    value,
    probability,
    expectedRevenue,
    stage,
    closeDate,
    owner,
    company,
    style
  } = element.props;

  return (
    <div
      className={cn(
        'p-4 border rounded-lg bg-background hover:shadow-md transition-shadow cursor-pointer'
      )}
      onClick={() => onAction?.({ name: 'viewOpportunity', payload: { id } } as never)}
      style={style as React.CSSProperties}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold">{name as string}</h3>
          {company && <p className="text-sm text-muted-foreground">{company as string}</p>}
        </div>
        <span className="text-xl font-bold text-primary">{value as string}</span>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        {probability !== undefined && (
          <div>
            <p className="text-muted-foreground">Probability</p>
            <p className="font-medium">{probability}%</p>
          </div>
        )}
        {expectedRevenue && (
          <div>
            <p className="text-muted-foreground">Expected</p>
            <p className="font-medium">{expectedRevenue as string}</p>
          </div>
        )}
        {stage && (
          <div>
            <p className="text-muted-foreground">Stage</p>
            <p className="font-medium">{stage as string}</p>
          </div>
        )}
        {closeDate && (
          <div>
            <p className="text-muted-foreground">Close Date</p>
            <p className="font-medium">{closeDate as string}</p>
          </div>
        )}
      </div>
      {owner && (
        <p className="text-sm text-muted-foreground mt-3">Owner: {owner as string}</p>
      )}
      {children}
    </div>
  );
};
