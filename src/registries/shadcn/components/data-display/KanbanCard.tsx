'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Clock, MessageSquare, Paperclip, CheckSquare } from 'lucide-react';

export const KanbanCard = ({ element, children }: ComponentRenderProps) => {
  const {
    title,
    description,
    labels,
    assignee,
    dueDate,
    priority,
    comments,
    attachments,
    checklist,
    cover,
    style,
  } = element.props;

  const labelsArray = labels as Array<{ text: string; color: string }>;
  const assigneeData = assignee as { name: string; avatar?: string };
  const checklistData = checklist as { completed: number; total: number };

  const getPriorityStyles = () => {
    switch (priority) {
      case 'high':
        return 'border-l-4 border-l-red-500';
      case 'medium':
        return 'border-l-4 border-l-yellow-500';
      case 'low':
        return 'border-l-4 border-l-green-500';
      default:
        return '';
    }
  };

  return (
    <div
      className={cn(
        'bg-background border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer',
        getPriorityStyles()
      )}
      style={style as React.CSSProperties}
    >
      {/* Cover Image */}
      {cover && (
        <div className="h-32 overflow-hidden">
          <img
            src={cover as string}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-3">
        {/* Labels */}
        {labelsArray && labelsArray.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {labelsArray.map((label, idx) => (
              <span
                key={idx}
                className="text-[10px] px-1.5 py-0.5 rounded font-medium text-white"
                style={{ backgroundColor: label.color }}
              >
                {label.text}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h4 className="text-sm font-medium">{title as string}</h4>

        {/* Description */}
        {description && (
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
            {description as string}
          </p>
        )}

        {children}

        {/* Metadata Row */}
        {(assigneeData || dueDate || comments || attachments || checklistData) && (
          <div className="flex items-center justify-between mt-3 text-muted-foreground">
            <div className="flex items-center gap-2">
              {dueDate && (
                <div className="flex items-center gap-1 text-[10px]">
                  <Clock className="h-3 w-3" />
                  {dueDate as string}
                </div>
              )}
              {comments && (
                <div className="flex items-center gap-1 text-[10px]">
                  <MessageSquare className="h-3 w-3" />
                  {comments as number}
                </div>
              )}
              {attachments && (
                <div className="flex items-center gap-1 text-[10px]">
                  <Paperclip className="h-3 w-3" />
                  {attachments as number}
                </div>
              )}
              {checklistData && (
                <div className="flex items-center gap-1 text-[10px]">
                  <CheckSquare className="h-3 w-3" />
                  {checklistData.completed}/{checklistData.total}
                </div>
              )}
            </div>
            {assigneeData && (
              assigneeData.avatar ? (
                <img
                  src={assigneeData.avatar}
                  alt={assigneeData.name}
                  className="w-6 h-6 rounded-full"
                  title={assigneeData.name}
                />
              ) : (
                <div
                  className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-medium text-primary"
                  title={assigneeData.name}
                >
                  {assigneeData.name.charAt(0)}
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};
