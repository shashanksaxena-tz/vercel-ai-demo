'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const DealStage = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    name,
    value,
    count,
    color,
    style
  } = element.props;

  const colors = {
    gray: 'bg-gray-100 border-gray-300',
    blue: 'bg-blue-50 border-blue-300',
    yellow: 'bg-yellow-50 border-yellow-300',
    orange: 'bg-orange-50 border-orange-300',
    green: 'bg-green-50 border-green-300',
    red: 'bg-red-50 border-red-300',
  };

  return (
    <div
      className={cn(
        'flex-shrink-0 w-72 rounded-lg border p-4',
        colors[color as keyof typeof colors] || 'bg-muted/30 border-muted'
      )}
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => onAction?.({ name: 'dropDeal', payload: { stage: name } })}
      style={style as React.CSSProperties}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold">{name as string}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {value && <span>{value as string}</span>}
            {count !== undefined && <span>({count} deals)</span>}
          </div>
        </div>
        <button
          onClick={() => onAction?.({ name: 'addDeal', payload: { stage: name } })}
          className="p-1 hover:bg-background rounded"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
};
