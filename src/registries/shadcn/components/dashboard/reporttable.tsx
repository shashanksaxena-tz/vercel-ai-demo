'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from '@/components/ui/table';

export const ReportTable = ({ element }: ComponentRenderProps) => {
  const {
    title,
    description,
    columns,
    data,
    summary,
    showTotal = false,
    totalColumn,
    bordered = false,
    style,
  } = element.props;

  const columnsArray = columns as Array<{
    key: string;
    label: string;
    align?: 'left' | 'center' | 'right';
    format?: 'text' | 'number' | 'currency' | 'percentage';
    width?: string;
  }>;

  const dataArray = data as Array<Record<string, unknown>>;

  const formatCell = (value: unknown, format?: string) => {
    if (value === null || value === undefined) return '-';
    const num = Number(value);
    if (format === 'currency') return `$${num.toLocaleString()}`;
    if (format === 'percentage') return `${num.toFixed(1)}%`;
    if (format === 'number') return num.toLocaleString();
    return String(value);
  };

  const alignStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const calculateTotal = () => {
    if (!showTotal || !totalColumn) return null;
    const total = dataArray?.reduce((sum, row) => sum + Number(row[totalColumn as string] || 0), 0);
    return total;
  };

  const total = calculateTotal();

  return (
    <Card
      className={cn('overflow-hidden', bordered && 'border-2')}
      style={style as React.CSSProperties}
    >
      {(!!title || !!description) && (
        <CardHeader>
          {!!title && <CardTitle>{title as React.ReactNode}</CardTitle>}
          {!!description && <CardDescription>{description as React.ReactNode}</CardDescription>}
        </CardHeader>
      )}
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              {columnsArray?.map((col) => (
                <TableHead
                  key={col.key}
                  className={cn('font-semibold', alignStyles[col.align || 'left'])}
                  style={{ width: col.width }}
                >
                  {col.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataArray?.map((row, idx) => (
              <TableRow key={idx}>
                {columnsArray?.map((col) => (
                  <TableCell
                    key={col.key}
                    className={alignStyles[col.align || 'left']}
                  >
                    {formatCell(row[col.key], col.format)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
          {showTotal && total !== null && (
            <TableFooter>
              <TableRow className="bg-muted/70 font-semibold">
                {columnsArray?.map((col, idx) => (
                  <TableCell
                    key={col.key}
                    className={alignStyles[col.align || 'left']}
                  >
                    {idx === 0
                      ? 'Total'
                      : col.key === totalColumn
                      ? formatCell(total, col.format)
                      : ''}
                  </TableCell>
                ))}
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </CardContent>
      {!!summary && (
        <div className="border-t px-6 py-4 bg-muted/30">
          <p className="text-sm text-muted-foreground">{summary as React.ReactNode}</p>
        </div>
      )}
    </Card>
  );
};
