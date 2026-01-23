'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, Filter } from 'lucide-react';

export const TaskList = ({ element, children }: ComponentRenderProps) => {
  const {
    title,
    description,
    count,
    completedCount,
    maxHeight,
    showAddButton = false,
    showFilter = false,
    variant = 'default',
    style,
  } = element.props;

  const variantStyles = {
    default: 'border shadow-sm',
    minimal: 'border-0 bg-transparent',
    elevated: 'border-0 shadow-lg',
  };

  const progress = count && completedCount
    ? (Number(completedCount) / Number(count)) * 100
    : undefined;

  return (
    <Card
      className={cn(
        'overflow-hidden',
        variantStyles[(variant as keyof typeof variantStyles) || 'default']
      )}
      style={style as React.CSSProperties}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            {!!title && <CardTitle className="text-base">{title as React.ReactNode}</CardTitle>}
            {!!description && <CardDescription>{description as React.ReactNode}</CardDescription>}
          </div>
          <div className="flex items-center gap-1">
            {showFilter && (
              <button className="p-1.5 rounded-md hover:bg-muted transition-colors">
                <Filter className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
            {showAddButton && (
              <button className="p-1.5 rounded-md hover:bg-muted transition-colors">
                <Plus className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>
        {progress !== undefined && (
          <div className="space-y-1.5 pt-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{completedCount as React.ReactNode} of {count as React.ReactNode} completed</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </CardHeader>
      <CardContent className="p-0">
        {maxHeight ? (
          <ScrollArea style={{ height: `${maxHeight}px` }}>
            <div className="space-y-1 p-4 pt-0">{children}</div>
          </ScrollArea>
        ) : (
          <div className="space-y-1 p-4 pt-0">{children}</div>
        )}
      </CardContent>
    </Card>
  );
};
