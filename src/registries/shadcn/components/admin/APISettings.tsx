'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const APISettings = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    apiKeys,
    rateLimits,
    endpoints,
    style
  } = element.props;

  const keyList = apiKeys as Array<{ name: string; key: string; created: string; lastUsed?: string }>;

  return (
    <div
      className={cn('space-y-6')}
      style={style as React.CSSProperties}
    >
      <div className="flex items-center justify-between">
        <h4 className="font-medium">API Keys</h4>
        <button
          onClick={() => onAction?.({ name: 'createAPIKey' })}
          className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90"
        >
          Create New Key
        </button>
      </div>

      {keyList && keyList.length > 0 && (
        <div className="space-y-3">
          {keyList.map((key, i) => (
            <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">{key.name}</p>
                <p className="text-sm text-muted-foreground font-mono">{key.key}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Created: {key.created}
                  {key.lastUsed && ` • Last used: ${key.lastUsed}`}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onAction?.({ name: 'copyKey', payload: { key: key.key } } as never)}
                  className="p-2 hover:bg-muted rounded"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
                <button
                  onClick={() => onAction?.({ name: 'revokeKey', payload: { name: key.name } } as never)}
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

      {rateLimits && (
        <div className="p-4 border rounded-lg">
          <h5 className="font-medium mb-2">Rate Limits</h5>
          <p className="text-sm text-muted-foreground">{rateLimits as string}</p>
        </div>
      )}

      {children}
    </div>
  );
};
