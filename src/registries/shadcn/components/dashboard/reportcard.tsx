'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { FileText, Download, Calendar } from 'lucide-react';

export const ReportCard = ({ element, children }: ComponentRenderProps) => {
  const {
    title,
    description,
    date,
    status = 'ready',
    type = 'report',
    showDownload = false,
    variant = 'default',
    style,
  } = element.props;

  const statusConfig = {
    ready: { label: 'Ready', color: 'bg-emerald-100 text-emerald-700' },
    pending: { label: 'Pending', color: 'bg-amber-100 text-amber-700' },
    processing: { label: 'Processing', color: 'bg-blue-100 text-blue-700' },
    error: { label: 'Error', color: 'bg-rose-100 text-rose-700' },
  };

  const config = statusConfig[(status as keyof typeof statusConfig) || 'ready'];

  const variantStyles = {
    default: 'border shadow-sm',
    compact: 'border shadow-sm',
    detailed: 'border shadow-md',
  };

  return (
    <Card
      className={cn(
        'overflow-hidden transition-all duration-200 hover:shadow-md',
        variantStyles[(variant as keyof typeof variantStyles) || 'default']
      )}
      style={style as React.CSSProperties}
    >
      <CardHeader className={variant === 'compact' ? 'p-4' : ''}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-md bg-muted">
              <FileText className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              {!!title && (
                <CardTitle className="text-base">{title as React.ReactNode}</CardTitle>
              )}
              {!!description && (
                <CardDescription>{description as React.ReactNode}</CardDescription>
              )}
            </div>
          </div>
          <span className={cn('px-2 py-1 text-xs font-medium rounded-full', config.color)}>
            {config.label}
          </span>
        </div>
      </CardHeader>
      {children && (
        <CardContent className={variant === 'compact' ? 'p-4 pt-0' : ''}>
          {children}
        </CardContent>
      )}
      {(!!date || showDownload) && (
        <CardFooter className="flex items-center justify-between border-t bg-muted/30 px-4 py-3">
          {!!date && (
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              {date as React.ReactNode}
            </span>
          )}
          {showDownload && (
            <button className="flex items-center gap-1 text-xs font-medium text-primary hover:underline">
              <Download className="h-3.5 w-3.5" />
              Download
            </button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};
