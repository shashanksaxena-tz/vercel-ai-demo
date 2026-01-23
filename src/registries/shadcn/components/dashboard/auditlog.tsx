'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';

export const AuditLog = ({ element, children }: ComponentRenderProps) => {
  const {
    title,
    description,
    entries,
    maxHeight = 400,
    showFilters = false,
    variant = 'default',
    style,
  } = element.props;

  const entriesArray = entries as Array<{
    id?: string | number;
    action: string;
    user: string;
    timestamp: string;
    details?: string;
    ip?: string;
    status?: 'success' | 'warning' | 'error';
  }>;

  const statusStyles = {
    success: 'text-emerald-600 bg-emerald-50',
    warning: 'text-amber-600 bg-amber-50',
    error: 'text-rose-600 bg-rose-50',
  };

  const variantStyles = {
    default: 'border shadow-sm',
    minimal: 'border-0',
    elevated: 'border-0 shadow-lg',
  };

  return (
    <Card
      className={cn(
        'overflow-hidden',
        variantStyles[(variant as keyof typeof variantStyles) || 'default']
      )}
      style={style as React.CSSProperties}
    >
      {(!!title || !!description) && (
        <CardHeader>
          {!!title && <CardTitle>{title as React.ReactNode}</CardTitle>}
          {!!description && <CardDescription>{description as React.ReactNode}</CardDescription>}
        </CardHeader>
      )}
      <CardContent className="p-0">
        <ScrollArea style={{ height: `${maxHeight}px` }}>
          <Table>
            <TableHeader className="sticky top-0 bg-muted/80 backdrop-blur-sm">
              <TableRow>
                <TableHead className="w-[200px]">Action</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Details</TableHead>
                <TableHead className="w-[150px]">Timestamp</TableHead>
                <TableHead className="w-[100px]">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entriesArray?.map((entry, idx) => (
                <TableRow key={entry.id || idx}>
                  <TableCell className="font-medium">{entry.action}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm">{entry.user}</span>
                      {entry.ip && (
                        <span className="text-xs text-muted-foreground">{entry.ip}</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{entry.details || '-'}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{entry.timestamp}</TableCell>
                  <TableCell>
                    {entry.status && (
                      <span className={cn(
                        'px-2 py-0.5 rounded-full text-xs font-medium',
                        statusStyles[entry.status]
                      )}>
                        {entry.status}
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
        {children}
      </CardContent>
    </Card>
  );
};
