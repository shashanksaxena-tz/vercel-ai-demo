'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

export const ActivityFeed = ({ element, children }: ComponentRenderProps) => {
  const {
    title,
    maxHeight = 400,
    showTimeline = true,
    variant = 'default',
    style,
  } = element.props;

  const variantStyles = {
    default: 'border shadow-sm',
    minimal: 'border-0 bg-transparent',
    elevated: 'border-0 shadow-lg',
  };

  return (
    <Card
      className={cn(
        'overflow-hidden',
        variantStyles[(variant as keyof typeof variantStyles) || 'default']
      )}
      style={style as React.CSSProperties}
    >
      {!!title && (
        <CardHeader className="pb-3">
          <CardTitle className="text-base">{title as React.ReactNode}</CardTitle>
        </CardHeader>
      )}
      <CardContent className="p-0">
        <ScrollArea style={{ height: `${maxHeight}px` }}>
          <div className={cn('space-y-0 p-4', showTimeline && 'relative')}>
            {showTimeline && (
              <div className="absolute left-7 top-0 bottom-0 w-px bg-border" />
            )}
            {children}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
