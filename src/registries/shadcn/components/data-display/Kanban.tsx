'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { MoreHorizontal, Plus } from 'lucide-react';

interface KanbanCard {
  id: string;
  title: string;
  description?: string;
  labels?: Array<{ text: string; color: string }>;
  assignee?: { name: string; avatar?: string };
  dueDate?: string;
  priority?: 'low' | 'medium' | 'high';
}

interface KanbanColumn {
  id: string;
  title: string;
  cards: KanbanCard[];
  color?: string;
  limit?: number;
}

export const Kanban = ({ element, children }: ComponentRenderProps) => {
  const {
    columns,
    showCardCount = true,
    showAddCard = false,
    variant = 'default',
    style,
  } = element.props;

  const columnsArray = columns as KanbanColumn[];

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (!columnsArray?.length && !children) {
    return (
      <div className="p-8 text-center text-muted-foreground border rounded-lg">
        No columns configured
      </div>
    );
  }

  if (children) {
    return (
      <div
        className="flex gap-4 overflow-x-auto pb-4"
        style={style as React.CSSProperties}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className="flex gap-4 overflow-x-auto pb-4"
      style={style as React.CSSProperties}
    >
      {columnsArray.map((column) => (
        <div
          key={column.id}
          className={cn(
            'flex-shrink-0 w-72 rounded-lg',
            variant === 'default' && 'bg-muted/50',
            variant === 'card' && 'bg-card border shadow-sm'
          )}
        >
          {/* Column Header */}
          <div className="p-3 border-b flex items-center justify-between">
            <div className="flex items-center gap-2">
              {column.color && (
                <div className="w-3 h-3 rounded" style={{ backgroundColor: column.color }} />
              )}
              <h3 className="font-semibold text-sm">{column.title}</h3>
              {showCardCount && (
                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                  {column.cards.length}
                  {column.limit && `/${column.limit}`}
                </span>
              )}
            </div>
            <button className="p-1 hover:bg-muted rounded">
              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>

          {/* Cards */}
          <div className="p-2 space-y-2 min-h-[200px]">
            {column.cards.map((card) => (
              <div
                key={card.id}
                className="bg-background border rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                {card.priority && (
                  <div className={cn('w-full h-1 rounded-full mb-2', getPriorityColor(card.priority))} />
                )}
                {card.labels && card.labels.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {card.labels.map((label, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-1.5 py-0.5 rounded font-medium"
                        style={{ backgroundColor: label.color, color: 'white' }}
                      >
                        {label.text}
                      </span>
                    ))}
                  </div>
                )}
                <h4 className="text-sm font-medium">{card.title}</h4>
                {card.description && (
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {card.description}
                  </p>
                )}
                {(card.assignee || card.dueDate) && (
                  <div className="flex items-center justify-between mt-3">
                    {card.assignee && (
                      card.assignee.avatar ? (
                        <img
                          src={card.assignee.avatar}
                          alt={card.assignee.name}
                          className="w-6 h-6 rounded-full"
                        />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-medium">
                          {card.assignee.name.charAt(0)}
                        </div>
                      )
                    )}
                    {card.dueDate && (
                      <span className="text-[10px] text-muted-foreground">
                        {card.dueDate}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Add Card Button */}
          {showAddCard && (
            <div className="p-2 border-t">
              <button className="w-full flex items-center justify-center gap-1 p-2 text-sm text-muted-foreground hover:bg-muted rounded-md transition-colors">
                <Plus className="h-4 w-4" />
                Add card
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
