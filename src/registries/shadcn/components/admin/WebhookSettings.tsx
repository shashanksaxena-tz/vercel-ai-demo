'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const WebhookSettings = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    webhooks,
    style
  } = element.props;

  const webhookList = webhooks as Array<{
    id: string;
    url: string;
    events: string[];
    active: boolean;
    lastTriggered?: string;
  }>;

  return (
    <div
      className={cn('space-y-4')}
      style={style as React.CSSProperties}
    >
      <div className="flex items-center justify-between">
        <h4 className="font-medium">Webhooks</h4>
        <button
          onClick={() => onAction?.({ name: 'createWebhook' })}
          className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90"
        >
          Add Webhook
        </button>
      </div>

      {webhookList && webhookList.length > 0 ? (
        <div className="space-y-3">
          {webhookList.map((webhook) => (
            <div key={webhook.id} className="p-4 border rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      'w-2 h-2 rounded-full',
                      webhook.active ? 'bg-green-500' : 'bg-gray-400'
                    )} />
                    <p className="font-mono text-sm truncate">{webhook.url}</p>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {webhook.events.map((event, i) => (
                      <span key={i} className="px-2 py-0.5 bg-muted text-xs rounded">{event}</span>
                    ))}
                  </div>
                  {webhook.lastTriggered && (
                    <p className="text-xs text-muted-foreground mt-2">Last triggered: {webhook.lastTriggered}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onAction?.({ name: 'testWebhook', payload: { id: webhook.id } } as never)}
                    className="px-2 py-1 text-xs border rounded hover:bg-muted"
                  >
                    Test
                  </button>
                  <button
                    onClick={() => onAction?.({ name: 'editWebhook', payload: { id: webhook.id } } as never)}
                    className="p-1 hover:bg-muted rounded"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => onAction?.({ name: 'deleteWebhook', payload: { id: webhook.id } } as never)}
                    className="p-1 hover:bg-muted rounded text-destructive"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No webhooks configured yet.</p>
      )}

      {children}
    </div>
  );
};
