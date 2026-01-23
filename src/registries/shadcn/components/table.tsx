import React from 'react';
import {
  Table as ShadcnTable,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ComponentRenderProps } from '@json-render/react';

export const Table = ({ element }: ComponentRenderProps) => {
  const { data, columns, caption, style } = element.props;

  const safeData = Array.isArray(data) ? data : [];

  return (
    <div className="rounded-md border" style={style as React.CSSProperties}>
      <ShadcnTable>
        {!!caption && <TableCaption>{caption as string}</TableCaption>}
        <TableHeader>
          <TableRow>
            {(columns as any[])?.map((col: any) => (
              <TableHead key={col.accessorKey}>{col.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {safeData.map((row: any, i: number) => (
            <TableRow key={i}>
              {(columns as any[])?.map((col: any) => (
                <TableCell key={col.accessorKey}>{row[col.accessorKey]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </ShadcnTable>
    </div>
  );
};
