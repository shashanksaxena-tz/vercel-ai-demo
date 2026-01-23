'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const VirtualTable = ({ element }: ComponentRenderProps) => {
  const {
    columns,
    data,
    rowHeight = 48,
    visibleRows = 10,
    overscan = 5,
    striped,
    hoverable,
    style,
  } = element.props;

  const cols = columns as Array<{ header: string; accessorKey: string; width?: number; align?: string }>;
  const rows = data as Array<Record<string, any>>;

  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);

  const totalHeight = (rows?.length || 0) * (rowHeight as number);
  const containerHeight = (visibleRows as number) * (rowHeight as number);

  const { startIndex, endIndex, visibleItems } = useMemo(() => {
    const start = Math.max(0, Math.floor(scrollTop / (rowHeight as number)) - (overscan as number));
    const end = Math.min(
      (rows?.length || 0) - 1,
      Math.ceil((scrollTop + containerHeight) / (rowHeight as number)) + (overscan as number)
    );

    return {
      startIndex: start,
      endIndex: end,
      visibleItems: rows?.slice(start, end + 1) || [],
    };
  }, [scrollTop, rows, rowHeight, containerHeight, overscan]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  return (
    <div className="w-full border rounded-md" style={style as React.CSSProperties}>
      <div className="border-b bg-muted/50">
        <div className="flex">
          {cols?.map((col, i) => (
            <div
              key={i}
              className={cn(
                'px-4 py-3 font-medium text-muted-foreground flex-shrink-0',
                col.align === 'center' && 'text-center',
                col.align === 'right' && 'text-right'
              )}
              style={{ width: col.width || 150 }}
            >
              {col.header}
            </div>
          ))}
        </div>
      </div>

      <div
        ref={containerRef}
        className="overflow-auto"
        style={{ height: containerHeight }}
        onScroll={handleScroll}
      >
        <div style={{ height: totalHeight, position: 'relative' }}>
          {visibleItems.map((row, i) => {
            const actualIndex = startIndex + i;
            return (
              <div
                key={actualIndex}
                className={cn(
                  'flex border-b transition-colors absolute w-full',
                  striped && actualIndex % 2 === 0 && 'bg-muted/50',
                  hoverable && 'hover:bg-muted/50'
                )}
                style={{
                  height: rowHeight as number,
                  top: actualIndex * (rowHeight as number),
                }}
              >
                {cols?.map((col, j) => (
                  <div
                    key={j}
                    className={cn(
                      'px-4 flex items-center flex-shrink-0 overflow-hidden',
                      col.align === 'center' && 'justify-center',
                      col.align === 'right' && 'justify-end'
                    )}
                    style={{ width: col.width || 150 }}
                  >
                    <span className="truncate">{row[col.accessorKey]}</span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      <div className="border-t px-4 py-2 text-sm text-muted-foreground bg-muted/30">
        {rows?.length || 0} total rows
      </div>
    </div>
  );
};
