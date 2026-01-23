'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const SystemStatus = ({ element, children }: ComponentRenderProps) => {
  const {
    status = 'operational',
    lastChecked,
    services,
    style
  } = element.props;

  const statusConfig = {
    operational: { label: 'All Systems Operational', color: 'bg-green-500', textColor: 'text-green-600' },
    degraded: { label: 'Degraded Performance', color: 'bg-yellow-500', textColor: 'text-yellow-600' },
    partial: { label: 'Partial Outage', color: 'bg-orange-500', textColor: 'text-orange-600' },
    major: { label: 'Major Outage', color: 'bg-red-500', textColor: 'text-red-600' },
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.operational;
  const serviceList = services as Array<{ name: string; status: string; uptime?: string }>;

  return (
    <div
      className={cn('space-y-4')}
      style={style as React.CSSProperties}
    >
      <div className={cn('flex items-center gap-3 p-4 rounded-lg bg-muted/50')}>
        <span className={cn('w-3 h-3 rounded-full', config.color)} />
        <span className={cn('font-semibold', config.textColor)}>{config.label}</span>
        {lastChecked && (
          <span className="text-sm text-muted-foreground ml-auto">Last checked: {lastChecked as string}</span>
        )}
      </div>

      {serviceList && serviceList.length > 0 && (
        <div className="space-y-2">
          {serviceList.map((service, i) => {
            const serviceConfig = statusConfig[service.status as keyof typeof statusConfig] || statusConfig.operational;
            return (
              <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-2">
                  <span className={cn('w-2 h-2 rounded-full', serviceConfig.color)} />
                  <span className="font-medium">{service.name}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  {service.uptime && <span>{service.uptime} uptime</span>}
                  <span className="capitalize">{service.status}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {children}
    </div>
  );
};
