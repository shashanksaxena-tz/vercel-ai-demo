'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const DealCard = ({ element, onAction }: ComponentRenderProps) => {
  const {
    id,
    name,
    value,
    company,
    contact,
    avatar,
    daysInStage,
    priority,
    style
  } = element.props;

  const priorityColors = {
    low: 'border-l-gray-400',
    medium: 'border-l-yellow-500',
    high: 'border-l-orange-500',
    urgent: 'border-l-red-500',
  };

  return (
    <div
      className={cn(
        'p-3 bg-card border rounded-lg shadow-sm hover:shadow-md transition-all cursor-grab border-l-4',
        priorityColors[priority as keyof typeof priorityColors] || 'border-l-transparent'
      )}
      onClick={() => onAction?.({ name: 'viewDeal', payload: { id } } as never)}
      style={style as React.CSSProperties}
      draggable
    >
      <h4 className="font-medium text-sm mb-1 truncate">{name as string}</h4>
      <p className="text-lg font-bold text-primary">{value as string}</p>
      <div className="flex items-center gap-2 mt-2">
        {avatar ? (
          <img src={avatar as string} alt="" className="w-5 h-5 rounded-full" />
        ) : contact && (
          <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-xs">
            {(contact as string).charAt(0)}
          </div>
        )}
        <div className="flex-1 min-w-0">
          {company && <p className="text-xs text-muted-foreground truncate">{company as string}</p>}
        </div>
      </div>
      {daysInStage !== undefined && (
        <p className="text-xs text-muted-foreground mt-2">{daysInStage as number} days in stage</p>
      )}
    </div>
  );
};
