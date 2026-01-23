'use client';

import React, { useMemo } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const PivotTable = ({ element }: ComponentRenderProps) => {
  const {
    data,
    rows: rowFields,
    columns: colFields,
    values,
    aggregation = 'sum',
    showTotals = true,
    style,
  } = element.props;

  const dataArray = data as Array<Record<string, any>>;
  const rowField = (rowFields as string[])?.[0];
  const colField = (colFields as string[])?.[0];
  const valueField = (values as string[])?.[0];

  const pivotData = useMemo(() => {
    if (!dataArray || !rowField || !colField || !valueField) return null;

    const rowValues = [...new Set(dataArray.map((d) => d[rowField]))];
    const colValues = [...new Set(dataArray.map((d) => d[colField]))];

    const matrix: Record<string, Record<string, number[]>> = {};
    rowValues.forEach((r) => {
      matrix[r] = {};
      colValues.forEach((c) => {
        matrix[r][c] = [];
      });
    });

    dataArray.forEach((d) => {
      const r = d[rowField];
      const c = d[colField];
      const v = parseFloat(d[valueField]) || 0;
      matrix[r][c].push(v);
    });

    const aggregate = (nums: number[]): number => {
      if (nums.length === 0) return 0;
      switch (aggregation) {
        case 'sum':
          return nums.reduce((a, b) => a + b, 0);
        case 'avg':
          return nums.reduce((a, b) => a + b, 0) / nums.length;
        case 'count':
          return nums.length;
        case 'min':
          return Math.min(...nums);
        case 'max':
          return Math.max(...nums);
        default:
          return nums.reduce((a, b) => a + b, 0);
      }
    };

    return {
      rowValues,
      colValues,
      getValue: (r: string, c: string) => aggregate(matrix[r]?.[c] || []),
      getRowTotal: (r: string) =>
        aggregate(colValues.flatMap((c) => matrix[r]?.[c] || [])),
      getColTotal: (c: string) =>
        aggregate(rowValues.flatMap((r) => matrix[r]?.[c] || [])),
      getGrandTotal: () =>
        aggregate(rowValues.flatMap((r) => colValues.flatMap((c) => matrix[r]?.[c] || []))),
    };
  }, [dataArray, rowField, colField, valueField, aggregation]);

  if (!pivotData) {
    return (
      <div className="p-4 text-muted-foreground text-center border rounded-md">
        Configure rows, columns, and values to generate pivot table
      </div>
    );
  }

  const formatNumber = (n: number) => {
    return n.toLocaleString(undefined, { maximumFractionDigits: 2 });
  };

  return (
    <div className="w-full overflow-auto border rounded-md" style={style as React.CSSProperties}>
      <table className="w-full text-sm">
        <thead className="bg-muted/50">
          <tr>
            <th className="h-12 px-4 text-left font-medium text-muted-foreground border-b border-r">
              {rowField}
            </th>
            {pivotData.colValues.map((col, i) => (
              <th
                key={i}
                className="h-12 px-4 text-right font-medium text-muted-foreground border-b"
              >
                {String(col)}
              </th>
            ))}
            {showTotals && (
              <th className="h-12 px-4 text-right font-semibold border-b border-l bg-muted">
                Total
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {pivotData.rowValues.map((row, i) => (
            <tr key={i} className="border-b hover:bg-muted/50">
              <td className="p-4 font-medium border-r">{String(row)}</td>
              {pivotData.colValues.map((col, j) => (
                <td key={j} className="p-4 text-right tabular-nums">
                  {formatNumber(pivotData.getValue(String(row), String(col)))}
                </td>
              ))}
              {showTotals && (
                <td className="p-4 text-right font-semibold tabular-nums border-l bg-muted/30">
                  {formatNumber(pivotData.getRowTotal(String(row)))}
                </td>
              )}
            </tr>
          ))}
          {showTotals && (
            <tr className="bg-muted font-semibold">
              <td className="p-4 border-r border-t">Total</td>
              {pivotData.colValues.map((col, j) => (
                <td key={j} className="p-4 text-right tabular-nums border-t">
                  {formatNumber(pivotData.getColTotal(String(col)))}
                </td>
              ))}
              <td className="p-4 text-right tabular-nums border-l border-t bg-primary/10">
                {formatNumber(pivotData.getGrandTotal())}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
