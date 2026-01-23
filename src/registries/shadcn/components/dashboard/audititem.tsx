'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Shield, ShieldCheck, ShieldAlert, User, Clock } from 'lucide-react';

export const AuditItem = ({ element, children }: ComponentRenderProps) => {
  const {
    action,
    user,
    timestamp,
    details,
    ip,
    resource,
    category = 'general',
    severity = 'low',
    style,
  } = element.props;

  const severityConfig = {
    low: { icon: Shield, color: 'text-muted-foreground', bg: 'bg-muted' },
    medium: { icon: ShieldCheck, color: 'text-amber-600', bg: 'bg-amber-50' },
    high: { icon: ShieldAlert, color: 'text-rose-600', bg: 'bg-rose-50' },
    critical: { icon: ShieldAlert, color: 'text-rose-700', bg: 'bg-rose-100' },
  };

  const config = severityConfig[(severity as keyof typeof severityConfig) || 'low'];
  const Icon = config.icon;

  return (
    <div
      className="flex gap-4 p-4 rounded-lg border bg-card hover:bg-muted/30 transition-colors"
      style={style as React.CSSProperties}
    >
      <div className={cn('p-2 rounded-full h-fit', config.bg)}>
        <Icon className={cn('h-4 w-4', config.color)} />
      </div>
      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-medium text-sm">{action as React.ReactNode}</p>
            {!!resource && (
              <p className="text-xs text-muted-foreground mt-0.5">
                Resource: {resource as React.ReactNode}
              </p>
            )}
          </div>
          <span className={cn(
            'px-2 py-0.5 rounded text-xs font-medium capitalize',
            config.bg, config.color
          )}>
            {severity as React.ReactNode}
          </span>
        </div>

        {!!details && (
          <p className="text-sm text-muted-foreground">{details as React.ReactNode}</p>
        )}

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <User className="h-3 w-3" />
            {user as React.ReactNode}
          </span>
          {!!ip && (
            <span>IP: {ip as React.ReactNode}</span>
          )}
          {!!timestamp && (
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {timestamp as React.ReactNode}
            </span>
          )}
        </div>

        {children}
      </div>
    </div>
  );
};
