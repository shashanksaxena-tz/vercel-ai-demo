'use client';

import React, { useState, useRef, useMemo } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const VirtualList = ({ element }: ComponentRenderProps) => {
  const {
    items,
    itemHeight = 48,
    visibleItems = 10,
    overscan = 5,
    renderItem,
    style,
  } = element.props;

  const itemsArray = items as Array<{ id?: string; text: string; description?: string }>;

  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);

  const totalHeight = (itemsArray?.length || 0) * (itemHeight as number);
  const containerHeight = (visibleItems as number) * (itemHeight as number);

  const { startIndex, endIndex, visibleItemsData } = useMemo(() => {
    const start = Math.max(0, Math.floor(scrollTop / (itemHeight as number)) - (overscan as number));
    const end = Math.min(
      (itemsArray?.length || 0) - 1,
      Math.ceil((scrollTop + containerHeight) / (itemHeight as number)) + (overscan as number)
    );

    return {
      startIndex: start,
      endIndex: end,
      visibleItemsData: itemsArray?.slice(start, end + 1) || [],
    };
  }, [scrollTop, itemsArray, itemHeight, containerHeight, overscan]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  return (
    <div
      ref={containerRef}
      className="overflow-auto border rounded-md"
      style={{ height: containerHeight, ...style as React.CSSProperties }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        {visibleItemsData.map((item, i) => {
          const actualIndex = startIndex + i;
          return (
            <div
              key={item.id || actualIndex}
              className={cn(
                'absolute w-full px-4 flex items-center border-b hover:bg-muted/50 transition-colors'
              )}
              style={{
                height: itemHeight as number,
                top: actualIndex * (itemHeight as number),
              }}
            >
              <div className="flex-1 min-w-0">
                <span className="block truncate">{item.text}</span>
                {item.description && (
                  <p className="text-sm text-muted-foreground truncate">{item.description}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
