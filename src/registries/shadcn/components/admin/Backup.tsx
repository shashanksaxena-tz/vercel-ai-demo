'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Backup = ({ element, onAction }: ComponentRenderProps) => {
  const {
    lastBackup,
    nextBackup,
    backups,
    autoBackup = true,
    style
  } = element.props;

  const backupList = backups as Array<{
    id: string;
    name: string;
    size: string;
    date: string;
    type: string;
  }>;

  return (
    <div
      className={cn('space-y-4')}
      style={style as React.CSSProperties}
    >
      <div className="flex items-center justify-between p-4 border rounded-lg">
        <div>
          <h4 className="font-medium">Automatic Backups</h4>
          <p className="text-sm text-muted-foreground">
            {autoBackup ? 'Enabled' : 'Disabled'}
          </p>
        </div>
        <button
          onClick={() => onAction?.({ name: 'toggleAutoBackup' })}
          className={cn(
            'relative w-11 h-6 rounded-full transition-colors',
            autoBackup ? 'bg-primary' : 'bg-muted'
          )}
        >
          <span
            className={cn(
              'absolute top-1 w-4 h-4 bg-white rounded-full transition-transform',
              autoBackup ? 'left-6' : 'left-1'
            )}
          />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {lastBackup && (
          <div className="p-4 border rounded-lg">
            <p className="text-sm text-muted-foreground">Last Backup</p>
            <p className="font-medium">{lastBackup as string}</p>
          </div>
        )}
        {nextBackup && (
          <div className="p-4 border rounded-lg">
            <p className="text-sm text-muted-foreground">Next Backup</p>
            <p className="font-medium">{nextBackup as string}</p>
          </div>
        )}
      </div>

      <button
        onClick={() => onAction?.({ name: 'createBackup' })}
        className="w-full px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
      >
        Create Backup Now
      </button>

      {backupList && backupList.length > 0 && (
        <div className="border rounded-lg divide-y">
          {backupList.map((backup) => (
            <div key={backup.id} className="flex items-center justify-between p-4">
              <div>
                <p className="font-medium">{backup.name}</p>
                <p className="text-sm text-muted-foreground">
                  {backup.date} • {backup.size} • {backup.type}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onAction?.({ name: 'downloadBackup', payload: { id: backup.id } })}
                  className="p-2 hover:bg-muted rounded"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>
                <button
                  onClick={() => onAction?.({ name: 'restoreBackup', payload: { id: backup.id } })}
                  className="p-2 hover:bg-muted rounded"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
                <button
                  onClick={() => onAction?.({ name: 'deleteBackup', payload: { id: backup.id } })}
                  className="p-2 hover:bg-muted rounded text-destructive"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
