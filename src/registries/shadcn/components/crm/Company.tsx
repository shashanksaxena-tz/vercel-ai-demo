'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Company = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    id,
    name,
    logo,
    industry,
    size,
    revenue,
    website,
    location,
    style
  } = element.props;

  return (
    <div
      className={cn(
        'p-4 border rounded-lg bg-background hover:shadow-md transition-shadow cursor-pointer'
      )}
      onClick={() => onAction?.({ name: 'viewCompany', payload: { id } })}
      style={style as React.CSSProperties}
    >
      <div className="flex items-start gap-4">
        {logo ? (
          <img src={logo as string} alt={name as string} className="w-12 h-12 rounded object-contain" />
        ) : (
          <div className="w-12 h-12 rounded bg-muted flex items-center justify-center">
            <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold">{name as string}</h3>
          {industry && <p className="text-sm text-muted-foreground">{industry as string}</p>}
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-muted-foreground">
            {size && <span>{size as string} employees</span>}
            {revenue && <span>{revenue as string}</span>}
            {location && <span>{location as string}</span>}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};
