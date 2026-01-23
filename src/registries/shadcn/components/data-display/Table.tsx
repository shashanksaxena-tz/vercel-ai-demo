'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Table = ({ element }: ComponentRenderProps) => {
  const { columns, data, caption, striped, hoverable, bordered, compact, style } = element.props;
  const cols = columns as Array<{ header: string; accessorKey: string; align?: string }>;
  const rows = data as Array<Record<string, any>>;

  return (
    <div className="w-full overflow-auto" style={style as React.CSSProperties}>
      <table className={cn('w-full caption-bottom text-sm', bordered && 'border')}>
        {caption && (
          <caption className="mt-4 text-sm text-muted-foreground">{caption as string}</caption>
        )}
        <thead className={cn('border-b', bordered && '[&_th]:border')}>
          <tr>
            {cols?.map((col, i) => (
              <th
                key={i}
                className={cn(
                  'px-4 text-left align-middle font-medium text-muted-foreground',
                  compact ? 'h-8 py-1' : 'h-12 py-2',
                  col.align === 'center' && 'text-center',
                  col.align === 'right' && 'text-right'
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={cn(bordered && '[&_td]:border')}>
          {rows?.map((row, i) => (
            <tr
              key={i}
              className={cn(
                'border-b transition-colors',
                striped && i % 2 === 0 && 'bg-muted/50',
                hoverable && 'hover:bg-muted/50'
              )}
            >
              {cols?.map((col, j) => (
                <td
                  key={j}
                  className={cn(
                    'align-middle',
                    compact ? 'p-2' : 'p-4',
                    col.align === 'center' && 'text-center',
                    col.align === 'right' && 'text-right'
                  )}
                >
                  {row[col.accessorKey]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
