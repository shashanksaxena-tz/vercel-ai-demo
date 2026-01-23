'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, MoreHorizontal } from 'lucide-react';

export const TaskBoard = ({ element, children }: ComponentRenderProps) => {
  const {
    title,
    columns,
    variant = 'default',
    style,
  } = element.props;

  const columnsArray = columns as Array<{
    id: string;
    title: string;
    count?: number;
    color?: string;
  }>;

  const variantStyles = {
    default: 'bg-muted/30',
    minimal: 'bg-transparent',
    bordered: 'bg-background border',
  };

  return (
    <div
      className={cn(
        'rounded-lg p-4',
        variantStyles[(variant as keyof typeof variantStyles) || 'default']
      )}
      style={style as React.CSSProperties}
    >
      {!!title && (
        <h2 className="text-lg font-semibold mb-4">{title as React.ReactNode}</h2>
      )}
      <div className="flex gap-4 overflow-x-auto pb-2">
        {columnsArray?.map((column) => (
          <div key={column.id} className="flex-shrink-0 w-80">
            <Card className="bg-background">
              <CardHeader className="p-3 pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {column.color && (
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: column.color }}
                      />
                    )}
                    <CardTitle className="text-sm font-medium">
                      {column.title}
                    </CardTitle>
                    {column.count !== undefined && (
                      <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                        {column.count}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="p-1 rounded hover:bg-muted transition-colors">
                      <Plus className="h-4 w-4 text-muted-foreground" />
                    </button>
                    <button className="p-1 rounded hover:bg-muted transition-colors">
                      <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-2">
                <ScrollArea className="h-[500px]">
                  <div className="space-y-2 pr-2">
                    {/* Children would be filtered by column.id in actual implementation */}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        ))}
        {children}
      </div>
    </div>
  );
};
