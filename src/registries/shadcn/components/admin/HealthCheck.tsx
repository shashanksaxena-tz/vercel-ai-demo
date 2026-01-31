'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const HealthCheck = ({ element, onAction }: ComponentRenderProps) => {
  const {
    name,
    status = 'healthy',
    responseTime,
    lastChecked,
    details,
    style
  } = element.props;

  const statusConfig = {
    healthy: { icon: '✓', color: 'bg-green-100 text-green-600 border-green-200' },
    unhealthy: { icon: '✕', color: 'bg-red-100 text-red-600 border-red-200' },
    degraded: { icon: '!', color: 'bg-yellow-100 text-yellow-600 border-yellow-200' },
    unknown: { icon: '?', color: 'bg-gray-100 text-gray-600 border-gray-200' },
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.unknown;

  return (
    <div
      className={cn('flex items-center justify-between p-4 border rounded-lg', config.color)}
      style={style as React.CSSProperties}
    >
      <div className="flex items-center gap-3">
        <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold">
          {config.icon}
        </span>
        <div>
          <p className="font-medium">{name as string}</p>
          {details && <p className="text-sm opacity-80">{details as string}</p>}
        </div>
      </div>
      <div className="flex items-center gap-4">
        {responseTime && (
          <div className="text-right">
            <p className="text-sm font-medium">{responseTime as string}</p>
            <p className="text-xs opacity-80">Response time</p>
          </div>
        )}
        {lastChecked && (
          <p className="text-xs opacity-80">{lastChecked as string}</p>
        )}
        <button
          onClick={() => onAction?.({ name: 'refresh', payload: { check: name } } as never)}
          className="p-1 hover:bg-white/50 rounded"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
    </div>
  );
};
