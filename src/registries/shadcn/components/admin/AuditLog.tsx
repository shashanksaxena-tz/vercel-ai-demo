'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const AuditLog = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    title = 'Audit Log',
    showExport = true,
    showFilters = true,
    entries,
    style
  } = element.props;

  const entryList = entries as Array<{
    id: string;
    action: string;
    user: string;
    target?: string;
    timestamp: string;
    ipAddress?: string;
    details?: string;
  }>;

  return (
    <div
      className={cn('space-y-4')}
      style={style as React.CSSProperties}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{title as string}</h3>
        <div className="flex items-center gap-2">
          {showFilters && (
            <button
              onClick={() => onAction?.({ name: 'openFilters' })}
              className="px-3 py-1 text-sm border rounded hover:bg-muted"
            >
              Filter
            </button>
          )}
          {showExport && (
            <button
              onClick={() => onAction?.({ name: 'exportLog' })}
              className="px-3 py-1 text-sm border rounded hover:bg-muted"
            >
              Export
            </button>
          )}
        </div>
      </div>

      {entryList && entryList.length > 0 ? (
        <div className="border rounded-lg divide-y">
          {entryList.map((entry) => (
            <div key={entry.id} className="p-4 hover:bg-muted/50">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-sm">{entry.action}</p>
                  <p className="text-sm text-muted-foreground">
                    by {entry.user}
                    {entry.target && ` on ${entry.target}`}
                  </p>
                  {entry.details && (
                    <p className="text-xs text-muted-foreground mt-1">{entry.details}</p>
                  )}
                </div>
                <div className="text-right text-xs text-muted-foreground">
                  <p>{entry.timestamp}</p>
                  {entry.ipAddress && <p>{entry.ipAddress}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        children
      )}
    </div>
  );
};
