'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const LanguageSwitch = ({ element, onAction }: ComponentRenderProps) => {
  const {
    current = 'en',
    languages,
    showFlag = true,
    showLabel = true,
    style
  } = element.props;

  const [isOpen, setIsOpen] = useState(false);

  const defaultLanguages = [
    { code: 'en', label: 'English', flag: '' },
    { code: 'es', label: 'Spanish', flag: '' },
    { code: 'fr', label: 'French', flag: '' },
    { code: 'de', label: 'German', flag: '' },
  ];

  const languageList = (languages as Array<{ code: string; label: string; flag?: string }>) || defaultLanguages;
  const currentLang = languageList.find(l => l.code === current) || languageList[0];

  return (
    <div className="relative" style={style as React.CSSProperties}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded border hover:bg-muted"
      >
        {showFlag && currentLang.flag && <span>{currentLang.flag}</span>}
        {showLabel ? currentLang.label : currentLang.code.toUpperCase()}
        <svg className={cn('w-4 h-4 transition-transform', isOpen && 'rotate-180')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className={cn(
            'absolute top-full right-0 mt-2 w-48 bg-background border rounded-lg shadow-lg z-50 overflow-hidden',
            'animate-in fade-in-0 zoom-in-95'
          )}>
            {languageList.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  onAction?.({ name: 'setLanguage', payload: { language: lang.code } } as never);
                  setIsOpen(false);
                }}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-2 hover:bg-muted text-left',
                  current === lang.code && 'bg-primary/10'
                )}
              >
                {showFlag && lang.flag && <span>{lang.flag}</span>}
                <span>{lang.label}</span>
                {current === lang.code && (
                  <svg className="w-4 h-4 ml-auto text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
