'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const LocaleSelector = ({ element, onAction }: ComponentRenderProps) => {
  const {
    current,
    locales,
    variant = 'select',
    style
  } = element.props;

  const localeList = locales as Array<{ code: string; label: string; region?: string }>;

  if (variant === 'grid') {
    return (
      <div
        className={cn('grid grid-cols-2 sm:grid-cols-3 gap-2')}
        style={style as React.CSSProperties}
      >
        {localeList?.map((locale) => (
          <button
            key={locale.code}
            onClick={() => onAction?.({ name: 'setLocale', payload: { locale: locale.code } } as never)}
            className={cn(
              'p-3 border rounded-lg text-left hover:bg-muted transition-colors',
              current === locale.code && 'border-primary bg-primary/5'
            )}
          >
            <p className="font-medium">{locale.label}</p>
            {locale.region && <p className="text-sm text-muted-foreground">{locale.region}</p>}
          </button>
        ))}
      </div>
    );
  }

  return (
    <select
      value={current as string}
      onChange={(e) => onAction?.({ name: 'setLocale', payload: { locale: e.target.value } } as never)}
      className={cn(
        'px-3 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary'
      )}
      style={style as React.CSSProperties}
    >
      {localeList?.map((locale) => (
        <option key={locale.code} value={locale.code}>
          {locale.label} {locale.region && `(${locale.region})`}
        </option>
      ))}
    </select>
  );
};
