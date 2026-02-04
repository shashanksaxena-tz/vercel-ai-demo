import React from 'react';
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

interface Column {
  header: string;
  accessorKey: string;
}

export const Table = ({ element }: ComponentRenderProps) => {
  const { columns, data, caption, style } = element.props;
  const safeColumns = (columns as Column[]) || [];
  const safeData = (data as Record<string, React.ReactNode>[]) || [];
  const captionNode = caption as React.ReactNode;

  return (
    <TableContainer component={Paper} style={style as React.CSSProperties}>
      <MuiTable>
        {captionNode && (
            <caption style={{ captionSide: 'bottom', padding: 16 }}>{captionNode}</caption>
        )}
        <TableHead>
          <TableRow>
            {safeColumns.map((col) => (
              <TableCell key={col.accessorKey}>{col.header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {safeData.map((row, i) => (
            <TableRow key={i}>
              {safeColumns.map((col) => (
                <TableCell key={col.accessorKey}>{row[col.accessorKey]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};
