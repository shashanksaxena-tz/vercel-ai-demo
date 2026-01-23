'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const ContactCard = ({ element, onAction }: ComponentRenderProps) => {
  const {
    id,
    name,
    email,
    phone,
    avatar,
    role,
    company,
    style
  } = element.props;

  return (
    <div
      className={cn(
        'p-4 border rounded-lg bg-card hover:shadow-lg transition-all cursor-pointer'
      )}
      onClick={() => onAction?.({ name: 'viewContact', payload: { id } })}
      style={style as React.CSSProperties}
    >
      <div className="flex flex-col items-center text-center">
        {avatar ? (
          <img src={avatar as string} alt={name as string} className="w-16 h-16 rounded-full object-cover mb-3" />
        ) : (
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-xl font-semibold text-primary mb-3">
            {(name as string)?.charAt(0).toUpperCase()}
          </div>
        )}
        <h3 className="font-semibold">{name as string}</h3>
        {role && <p className="text-sm text-muted-foreground">{role as string}</p>}
        {company && <p className="text-sm text-muted-foreground">{company as string}</p>}
        <div className="flex gap-2 mt-4">
          {email && (
            <button
              onClick={(e) => { e.stopPropagation(); onAction?.({ name: 'email', payload: { email } } as never); }}
              className="p-2 hover:bg-muted rounded-full"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </button>
          )}
          {phone && (
            <button
              onClick={(e) => { e.stopPropagation(); onAction?.({ name: 'call', payload: { phone } } as never); }}
              className="p-2 hover:bg-muted rounded-full"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
