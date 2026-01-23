'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const IntegrationSettings = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    integrations,
    style
  } = element.props;

  const integrationList = integrations as Array<{
    id: string;
    name: string;
    description?: string;
    icon?: string;
    connected: boolean;
    status?: string;
  }>;

  return (
    <div
      className={cn('space-y-4')}
      style={style as React.CSSProperties}
    >
      {integrationList && integrationList.length > 0 && (
        <div className="grid gap-4">
          {integrationList.map((integration) => (
            <div key={integration.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                {integration.icon ? (
                  <img src={integration.icon} alt="" className="w-10 h-10 rounded" />
                ) : (
                  <div className="w-10 h-10 rounded bg-muted flex items-center justify-center">
                    <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                )}
                <div>
                  <p className="font-medium">{integration.name}</p>
                  {integration.description && (
                    <p className="text-sm text-muted-foreground">{integration.description}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {integration.connected && integration.status && (
                  <span className="text-xs text-muted-foreground">{integration.status}</span>
                )}
                <button
                  onClick={() => onAction?.({
                    name: integration.connected ? 'disconnectIntegration' : 'connectIntegration',
                    payload: { id: integration.id }
                  })}
                  className={cn(
                    'px-3 py-1 text-sm rounded',
                    integration.connected
                      ? 'border hover:bg-muted'
                      : 'bg-primary text-primary-foreground hover:bg-primary/90'
                  )}
                >
                  {integration.connected ? 'Disconnect' : 'Connect'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {children}
    </div>
  );
};
