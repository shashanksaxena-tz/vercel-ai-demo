'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const CardGrid = ({ element, children }: ComponentRenderProps) => {
  const {
    columns = 3,
    gap = 'default',
    items,
    style,
  } = element.props;

  const gapStyles = {
    none: 'gap-0',
    sm: 'gap-2',
    default: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
  };

  const columnStyles = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
    6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
  };

  const itemsArray = items as Array<{
    title: string;
    description?: string;
    image?: string;
    footer?: string;
  }>;

  return (
    <div
      className={cn(
        'grid',
        columnStyles[(columns as keyof typeof columnStyles) || 3],
        gapStyles[(gap as keyof typeof gapStyles) || 'default']
      )}
      style={style as React.CSSProperties}
    >
      {itemsArray?.length ? (
        itemsArray.map((item, idx) => (
          <div
            key={idx}
            className="border bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            {item.image && (
              <div className="aspect-video">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <h3 className="font-semibold truncate">{item.title}</h3>
              {item.description && (
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {item.description}
                </p>
              )}
            </div>
            {item.footer && (
              <div className="px-4 py-3 border-t bg-muted/30 text-sm text-muted-foreground">
                {item.footer}
              </div>
            )}
          </div>
        ))
      ) : (
        children
      )}
    </div>
  );
};
