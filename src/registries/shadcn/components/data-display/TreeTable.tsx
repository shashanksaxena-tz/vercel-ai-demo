'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { ChevronRight, ChevronDown, Folder, File } from 'lucide-react';

interface TreeRow {
  id: string;
  children?: TreeRow[];
  [key: string]: any;
}

export const TreeTable = ({ element }: ComponentRenderProps) => {
  const {
    columns,
    data,
    defaultExpanded = false,
    showIcons = true,
    striped,
    hoverable,
    style,
  } = element.props;

  const cols = columns as Array<{ header: string; accessorKey: string; width?: number; align?: string }>;
  const rows = data as TreeRow[];

  const [expandedRows, setExpandedRows] = useState<Set<string>>(() => {
    if (defaultExpanded) {
      const getAllIds = (items: TreeRow[]): string[] => {
        return items.flatMap((item) => [item.id, ...(item.children ? getAllIds(item.children) : [])]);
      };
      return new Set(getAllIds(rows || []));
    }
    return new Set();
  });

  const toggleRow = (id: string) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const renderRow = (row: TreeRow, depth: number, rowIndex: number): React.ReactNode[] => {
    const isExpanded = expandedRows.has(row.id);
    const hasChildren = row.children && row.children.length > 0;
    const result: React.ReactNode[] = [];

    result.push(
      <tr
        key={row.id}
        className={cn(
          'border-b transition-colors',
          striped && rowIndex % 2 === 0 && 'bg-muted/50',
          hoverable && 'hover:bg-muted/50'
        )}
      >
        {cols?.map((col, j) => (
          <td
            key={j}
            className={cn(
              'p-4 align-middle',
              col.align === 'center' && 'text-center',
              col.align === 'right' && 'text-right'
            )}
            style={{ width: col.width }}
          >
            {j === 0 ? (
              <div className="flex items-center gap-2" style={{ paddingLeft: depth * 24 }}>
                {hasChildren ? (
                  <button
                    onClick={() => toggleRow(row.id)}
                    className="p-0.5 hover:bg-muted rounded"
                  >
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                ) : (
                  <span className="w-5" />
                )}
                {showIcons && (
                  hasChildren ? (
                    <Folder className="h-4 w-4 text-amber-500" />
                  ) : (
                    <File className="h-4 w-4 text-muted-foreground" />
                  )
                )}
                <span>{row[col.accessorKey]}</span>
              </div>
            ) : (
              row[col.accessorKey]
            )}
          </td>
        ))}
      </tr>
    );

    if (hasChildren && isExpanded) {
      row.children!.forEach((child, i) => {
        result.push(...renderRow(child, depth + 1, rowIndex + i + 1));
      });
    }

    return result;
  };

  let globalRowIndex = 0;
  const renderAllRows = (): React.ReactNode[] => {
    const result: React.ReactNode[] = [];
    rows?.forEach((row) => {
      const rowNodes = renderRow(row, 0, globalRowIndex);
      result.push(...rowNodes);
      globalRowIndex += rowNodes.length;
    });
    return result;
  };

  return (
    <div className="w-full overflow-auto border rounded-md" style={style as React.CSSProperties}>
      <table className="w-full text-sm">
        <thead className="border-b bg-muted/50">
          <tr>
            {cols?.map((col, i) => (
              <th
                key={i}
                className={cn(
                  'h-12 px-4 text-left align-middle font-medium text-muted-foreground',
                  col.align === 'center' && 'text-center',
                  col.align === 'right' && 'text-right'
                )}
                style={{ width: col.width }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{renderAllRows()}</tbody>
      </table>
    </div>
  );
};
