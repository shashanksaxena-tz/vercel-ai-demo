'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { MapPin } from 'lucide-react';

export const MapMarker = ({ element, children }: ComponentRenderProps) => {
  const {
    lat,
    lng,
    title,
    description,
    icon,
    color = '#ef4444',
    size = 'default',
    popup,
    onClick,
    style,
  } = element.props;

  const sizeStyles = {
    sm: 'w-6 h-6',
    default: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  // This component is meant to be used within a Map component
  // For standalone display, it shows marker info
  return (
    <div
      className="inline-flex items-center gap-2 p-2 bg-card border rounded-lg shadow-sm"
      style={style as React.CSSProperties}
    >
      <div
        className={cn(
          'flex items-center justify-center rounded-full',
          sizeStyles[(size as keyof typeof sizeStyles) || 'default']
        )}
        style={{ backgroundColor: `${color}20` }}
      >
        {icon ? (
          icon as React.ReactNode
        ) : (
          <MapPin className="h-5 w-5" style={{ color: color as string }} />
        )}
      </div>
      <div className="min-w-0">
        {title && <p className="font-medium text-sm truncate">{title as string}</p>}
        {description && (
          <p className="text-xs text-muted-foreground truncate">{description as string}</p>
        )}
        {lat !== undefined && lng !== undefined && (
          <p className="text-xs text-muted-foreground">
            {Number(lat).toFixed(4)}, {Number(lng).toFixed(4)}
          </p>
        )}
      </div>
      {children}
    </div>
  );
};
