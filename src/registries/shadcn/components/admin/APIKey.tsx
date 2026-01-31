'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const APIKey = ({ element, onAction }: ComponentRenderProps) => {
  const {
    name,
    apiKey,
    prefix,
    createdAt,
    lastUsed,
    expiresAt,
    permissions,
    style
  } = element.props;

  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const maskedKey = `${prefix || ''}${'•'.repeat(32)}`;
  const displayKey = isVisible ? apiKey : maskedKey;

  const handleCopy = () => {
    onAction?.({ name: 'copy', payload: { key: apiKey } } as never);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn('p-4 border rounded-lg')}
      style={style as React.CSSProperties}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-medium">{name as string}</h4>
          {createdAt && (
            <p className="text-xs text-muted-foreground">Created: {createdAt as string}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onAction?.({ name: 'regenerate', payload: { name } } as never)}
            className="px-2 py-1 text-xs border rounded hover:bg-muted"
          >
            Regenerate
          </button>
          <button
            onClick={() => onAction?.({ name: 'revoke', payload: { name } } as never)}
            className="px-2 py-1 text-xs border border-destructive text-destructive rounded hover:bg-destructive hover:text-destructive-foreground"
          >
            Revoke
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 p-2 bg-muted/50 rounded font-mono text-sm">
        <code className="flex-1 truncate">{displayKey as string}</code>
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="p-1 hover:bg-muted rounded"
        >
          {isVisible ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          )}
        </button>
        <button
          onClick={handleCopy}
          className="p-1 hover:bg-muted rounded"
        >
          {copied ? (
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          )}
        </button>
      </div>

      <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
        {lastUsed && <span>Last used: {lastUsed as string}</span>}
        {expiresAt && <span>Expires: {expiresAt as string}</span>}
      </div>

      {permissions && (
        <div className="flex flex-wrap gap-1 mt-2">
          {(permissions as string[]).map((perm, i) => (
            <span key={i} className="px-2 py-0.5 bg-muted text-xs rounded">{perm}</span>
          ))}
        </div>
      )}
    </div>
  );
};
