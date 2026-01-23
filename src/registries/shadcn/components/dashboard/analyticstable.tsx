'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const AnalyticsTable = ({ element }: ComponentRenderProps) => {
  const {
    title,
    description,
    columns,
    data,
    showTrend = false,
    trendColumn,
    compact = false,
    striped = false,
    style,
  } = element.props;

  const columnsArray = columns as Array<{
    key: string;
    label: string;
    align?: 'left' | 'center' | 'right';
    format?: 'text' | 'number' | 'currency' | 'percentage';
  }>;

  const dataArray = data as Array<Record<string, unknown>>;

  const formatCell = (value: unknown, format?: string) => {
    if (value === null || value === undefined) return '-';
    const num = Number(value);
    if (format === 'currency') return `$${num.toLocaleString()}`;
    if (format === 'percentage') return `${num}%`;
    if (format === 'number') return num.toLocaleString();
    return String(value);
  };

  const alignStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <Card className="overflow-hidden" style={style as React.CSSProperties}>
      {(!!title || !!description) && (
        <CardHeader className={compact ? 'p-4' : ''}>
          {!!title && <CardTitle className="text-base">{title as React.ReactNode}</CardTitle>}
          {!!description && <CardDescription>{description as React.ReactNode}</CardDescription>}
        </CardHeader>
      )}
      <CardContent className={compact ? 'p-0' : 'p-0'}>
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              {columnsArray?.map((col) => (
                <TableHead
                  key={col.key}
                  className={cn(
                    'font-semibold',
                    alignStyles[col.align || 'left'],
                    compact ? 'py-2 px-3' : ''
                  )}
                >
                  {col.label}
                </TableHead>
              ))}
              {showTrend && <TableHead className="w-16">Trend</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataArray?.map((row, idx) => (
              <TableRow
                key={idx}
                className={cn(striped && idx % 2 === 1 && 'bg-muted/30')}
              >
                {columnsArray?.map((col) => (
                  <TableCell
                    key={col.key}
                    className={cn(
                      alignStyles[col.align || 'left'],
                      compact ? 'py-2 px-3' : ''
                    )}
                  >
                    {formatCell(row[col.key], col.format)}
                  </TableCell>
                ))}
                {showTrend && trendColumn && (
                  <TableCell className="py-2">
                    {Number(row[trendColumn as string]) > 0 ? (
                      <TrendingUp className="h-4 w-4 text-emerald-600" />
                    ) : Number(row[trendColumn as string]) < 0 ? (
                      <TrendingDown className="h-4 w-4 text-rose-600" />
                    ) : null}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
