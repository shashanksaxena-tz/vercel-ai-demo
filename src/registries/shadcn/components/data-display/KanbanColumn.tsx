'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { MoreHorizontal, Plus } from 'lucide-react';

export const KanbanColumn = ({ element, children }: ComponentRenderProps) => {
  const {
    title,
    color,
    cardCount,
    limit,
    showAddCard = false,
    variant = 'default',
    style,
  } = element.props;

  const isOverLimit = limit && cardCount && (cardCount as number) > (limit as number);

  return (
    <div
      className={cn(
        'flex-shrink-0 w-72 rounded-lg flex flex-col',
        variant === 'default' && 'bg-muted/50',
        variant === 'card' && 'bg-card border shadow-sm'
      )}
      style={style as React.CSSProperties}
    >
      {/* Column Header */}
      <div className="p-3 border-b flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          {color && (
            <div className="w-3 h-3 rounded" style={{ backgroundColor: color as string }} />
          )}
          <h3 className="font-semibold text-sm">{title as string}</h3>
          {cardCount !== undefined && (
            <span
              className={cn(
                'text-xs px-2 py-0.5 rounded-full',
                isOverLimit ? 'bg-red-100 text-red-600' : 'bg-muted text-muted-foreground'
              )}
            >
              {cardCount as number}
              {limit && `/${limit}`}
            </span>
          )}
        </div>
        <button className="p-1 hover:bg-muted rounded">
          <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>

      {/* Cards Container */}
      <div className="flex-1 p-2 space-y-2 overflow-y-auto min-h-[200px]">
        {children}
      </div>

      {/* Add Card Button */}
      {showAddCard && (
        <div className="p-2 border-t flex-shrink-0">
          <button className="w-full flex items-center justify-center gap-1 p-2 text-sm text-muted-foreground hover:bg-muted rounded-md transition-colors">
            <Plus className="h-4 w-4" />
            Add card
          </button>
        </div>
      )}
    </div>
  );
};
