'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const ContactDetail = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    id,
    name,
    email,
    phone,
    avatar,
    role,
    company,
    address,
    website,
    social,
    notes,
    createdAt,
    style
  } = element.props;

  return (
    <div
      className={cn('space-y-6')}
      style={style as React.CSSProperties}
    >
      <div className="flex items-start gap-4">
        {avatar ? (
          <img src={avatar as string} alt={name as string} className="w-20 h-20 rounded-full object-cover" />
        ) : (
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-semibold text-primary">
            {(name as string)?.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{name as string}</h2>
          {role && <p className="text-muted-foreground">{role as string}</p>}
          {company && <p className="text-muted-foreground">{company as string}</p>}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onAction?.({ name: 'edit', payload: { id } })}
            className="px-3 py-1 text-sm border rounded hover:bg-muted"
          >
            Edit
          </button>
          <button
            onClick={() => onAction?.({ name: 'delete', payload: { id } })}
            className="px-3 py-1 text-sm border border-destructive text-destructive rounded hover:bg-destructive hover:text-destructive-foreground"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {email && (
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <a href={`mailto:${email}`} className="text-primary hover:underline">{email as string}</a>
          </div>
        )}
        {phone && (
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <a href={`tel:${phone}`} className="text-primary hover:underline">{phone as string}</a>
          </div>
        )}
        {website && (
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            <a href={website as string} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{website as string}</a>
          </div>
        )}
        {address && (
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{address as string}</span>
          </div>
        )}
      </div>

      {notes && (
        <div className="p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium mb-2">Notes</h4>
          <p className="text-sm text-muted-foreground">{notes as string}</p>
        </div>
      )}

      {createdAt && (
        <p className="text-xs text-muted-foreground">Added on {createdAt as string}</p>
      )}

      {children}
    </div>
  );
};
