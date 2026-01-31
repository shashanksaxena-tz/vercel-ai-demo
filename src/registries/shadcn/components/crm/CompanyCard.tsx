'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const CompanyCard = ({ element, onAction }: ComponentRenderProps) => {
  const {
    id,
    name,
    logo,
    industry,
    employeeCount,
    contactCount,
    dealCount,
    totalValue,
    style
  } = element.props;

  return (
    <div
      className={cn(
        'p-4 border rounded-lg bg-card hover:shadow-lg transition-all cursor-pointer'
      )}
      onClick={() => onAction?.({ name: 'viewCompany', payload: { id } } as never)}
      style={style as React.CSSProperties}
    >
      <div className="flex items-center gap-3 mb-4">
        {logo ? (
          <img src={logo as string} alt={name as string} className="w-10 h-10 rounded object-contain" />
        ) : (
          <div className="w-10 h-10 rounded bg-muted flex items-center justify-center">
            <span className="text-lg font-semibold">{(name as string)?.charAt(0)}</span>
          </div>
        )}
        <div>
          <h3 className="font-semibold">{name as string}</h3>
          {industry && <p className="text-xs text-muted-foreground">{industry as string}</p>}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 text-sm">
        {employeeCount !== undefined && (
          <div>
            <p className="text-muted-foreground">Employees</p>
            <p className="font-medium">{employeeCount as number}</p>
          </div>
        )}
        {contactCount !== undefined && (
          <div>
            <p className="text-muted-foreground">Contacts</p>
            <p className="font-medium">{contactCount as number}</p>
          </div>
        )}
        {dealCount !== undefined && (
          <div>
            <p className="text-muted-foreground">Deals</p>
            <p className="font-medium">{dealCount as number}</p>
          </div>
        )}
        {totalValue && (
          <div>
            <p className="text-muted-foreground">Value</p>
            <p className="font-medium">{totalValue as string}</p>
          </div>
        )}
      </div>
    </div>
  );
};
