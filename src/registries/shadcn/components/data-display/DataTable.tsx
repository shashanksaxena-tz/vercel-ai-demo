'use client';

import React, { useState, useMemo } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { ChevronUp, ChevronDown, ChevronsUpDown, Search } from 'lucide-react';

export const DataTable = ({ element }: ComponentRenderProps) => {
  const {
    columns,
    data,
    caption,
    sortable,
    filterable,
    pagination,
    pageSize = 10,
    striped,
    hoverable,
    style,
  } = element.props;

  const cols = columns as Array<{ header: string; accessorKey: string; sortable?: boolean; align?: string }>;
  const rows = data as Array<Record<string, any>>;

  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [filterText, setFilterText] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const filteredData = useMemo(() => {
    if (!filterText || !rows) return rows || [];
    return rows.filter((row) =>
      Object.values(row).some((val) =>
        String(val).toLowerCase().includes(filterText.toLowerCase())
      )
    );
  }, [rows, filterText]);

  const sortedData = useMemo(() => {
    if (!sortConfig || !filteredData) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;
    const start = currentPage * (pageSize as number);
    return sortedData?.slice(start, start + (pageSize as number));
  }, [sortedData, pagination, currentPage, pageSize]);

  const totalPages = Math.ceil((sortedData?.length || 0) / (pageSize as number));

  const handleSort = (key: string) => {
    setSortConfig((prev) => {
      if (prev?.key !== key) return { key, direction: 'asc' };
      if (prev.direction === 'asc') return { key, direction: 'desc' };
      return null;
    });
  };

  const getSortIcon = (key: string) => {
    if (sortConfig?.key !== key) return <ChevronsUpDown className="h-4 w-4" />;
    return sortConfig.direction === 'asc' ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    );
  };

  return (
    <div className="w-full space-y-4" style={style as React.CSSProperties}>
      {filterable && (
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            value={filterText}
            onChange={(e) => {
              setFilterText(e.target.value);
              setCurrentPage(0);
            }}
            className="w-full pl-10 pr-4 py-2 border rounded-md text-sm bg-background"
          />
        </div>
      )}

      <div className="overflow-auto rounded-md border">
        <table className="w-full caption-bottom text-sm">
          {caption && (
            <caption className="mt-4 text-sm text-muted-foreground">{caption as string}</caption>
          )}
          <thead className="border-b bg-muted/50">
            <tr>
              {cols?.map((col, i) => (
                <th
                  key={i}
                  className={cn(
                    'h-12 px-4 text-left align-middle font-medium text-muted-foreground',
                    (sortable || col.sortable) && 'cursor-pointer select-none',
                    col.align === 'center' && 'text-center',
                    col.align === 'right' && 'text-right'
                  )}
                  onClick={() => (sortable || col.sortable) && handleSort(col.accessorKey)}
                >
                  <div className="flex items-center gap-2">
                    <span>{col.header}</span>
                    {(sortable || col.sortable) && getSortIcon(col.accessorKey)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData?.map((row, i) => (
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
                      'p-4 align-middle',
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

      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {currentPage * (pageSize as number) + 1} to{' '}
            {Math.min((currentPage + 1) * (pageSize as number), sortedData?.length || 0)} of{' '}
            {sortedData?.length || 0} results
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
              disabled={currentPage === 0}
              className="px-3 py-1 text-sm border rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={currentPage === totalPages - 1}
              className="px-3 py-1 text-sm border rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
