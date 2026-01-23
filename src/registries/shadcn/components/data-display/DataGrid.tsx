'use client';

import React, { useState, useMemo } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { ChevronUp, ChevronDown, ChevronsUpDown, Search, Filter } from 'lucide-react';

export const DataGrid = ({ element }: ComponentRenderProps) => {
  const {
    columns,
    data,
    sortable = true,
    filterable = true,
    resizable,
    selectable,
    pagination,
    pageSize = 10,
    rowHeight = 'default',
    style,
  } = element.props;

  const cols = columns as Array<{
    header: string;
    accessorKey: string;
    width?: number;
    minWidth?: number;
    sortable?: boolean;
    filterable?: boolean;
    align?: string;
  }>;
  const rows = data as Array<Record<string, any>>;

  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [filterText, setFilterText] = useState('');
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  const filteredData = useMemo(() => {
    if (!rows) return [];
    let result = rows;

    if (filterText) {
      result = result.filter((row) =>
        Object.values(row).some((val) =>
          String(val).toLowerCase().includes(filterText.toLowerCase())
        )
      );
    }

    Object.entries(columnFilters).forEach(([key, value]) => {
      if (value) {
        result = result.filter((row) =>
          String(row[key]).toLowerCase().includes(value.toLowerCase())
        );
      }
    });

    return result;
  }, [rows, filterText, columnFilters]);

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

  const handleSelectAll = () => {
    if (selectedRows.size === paginatedData?.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(paginatedData?.map((_, i) => i)));
    }
  };

  const handleSelectRow = (index: number) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedRows(newSelected);
  };

  const rowHeightStyles = {
    compact: 'h-8',
    default: 'h-12',
    comfortable: 'h-16',
  };

  return (
    <div className="w-full space-y-4" style={style as React.CSSProperties}>
      {filterable && (
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search all columns..."
              value={filterText}
              onChange={(e) => {
                setFilterText(e.target.value);
                setCurrentPage(0);
              }}
              className="w-full pl-10 pr-4 py-2 border rounded-md text-sm bg-background"
            />
          </div>
        </div>
      )}

      <div className="overflow-auto rounded-md border">
        <table className="w-full text-sm">
          <thead className="border-b bg-muted/50 sticky top-0">
            <tr>
              {selectable && (
                <th className="w-12 px-4">
                  <input
                    type="checkbox"
                    checked={selectedRows.size === paginatedData?.length && paginatedData?.length > 0}
                    onChange={handleSelectAll}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                </th>
              )}
              {cols?.map((col, i) => (
                <th
                  key={i}
                  className={cn(
                    'px-4 text-left align-middle font-medium text-muted-foreground',
                    rowHeightStyles[(rowHeight as keyof typeof rowHeightStyles) || 'default'],
                    sortable && 'cursor-pointer select-none hover:bg-muted/80',
                    col.align === 'center' && 'text-center',
                    col.align === 'right' && 'text-right'
                  )}
                  style={{ width: col.width, minWidth: col.minWidth }}
                  onClick={() => sortable && handleSort(col.accessorKey)}
                >
                  <div className="flex items-center gap-2">
                    <span>{col.header}</span>
                    {sortable && (
                      sortConfig?.key === col.accessorKey ? (
                        sortConfig.direction === 'asc' ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )
                      ) : (
                        <ChevronsUpDown className="h-4 w-4 opacity-50" />
                      )
                    )}
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
                  'border-b transition-colors hover:bg-muted/50',
                  selectedRows.has(i) && 'bg-primary/10'
                )}
              >
                {selectable && (
                  <td className="w-12 px-4">
                    <input
                      type="checkbox"
                      checked={selectedRows.has(i)}
                      onChange={() => handleSelectRow(i)}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                  </td>
                )}
                {cols?.map((col, j) => (
                  <td
                    key={j}
                    className={cn(
                      'px-4 align-middle',
                      rowHeightStyles[(rowHeight as keyof typeof rowHeightStyles) || 'default'],
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
            {selectable && selectedRows.size > 0 && (
              <span className="mr-4">{selectedRows.size} selected</span>
            )}
            Showing {currentPage * (pageSize as number) + 1} to{' '}
            {Math.min((currentPage + 1) * (pageSize as number), sortedData?.length || 0)} of{' '}
            {sortedData?.length || 0}
          </p>
          <div className="flex gap-1">
            <button
              onClick={() => setCurrentPage(0)}
              disabled={currentPage === 0}
              className="px-2 py-1 text-sm border rounded-md disabled:opacity-50"
            >
              First
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
              disabled={currentPage === 0}
              className="px-3 py-1 text-sm border rounded-md disabled:opacity-50"
            >
              Prev
            </button>
            <span className="px-3 py-1 text-sm">
              {currentPage + 1} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={currentPage === totalPages - 1}
              className="px-3 py-1 text-sm border rounded-md disabled:opacity-50"
            >
              Next
            </button>
            <button
              onClick={() => setCurrentPage(totalPages - 1)}
              disabled={currentPage === totalPages - 1}
              className="px-2 py-1 text-sm border rounded-md disabled:opacity-50"
            >
              Last
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
