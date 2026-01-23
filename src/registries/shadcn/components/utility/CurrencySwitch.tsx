'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const CurrencySwitch = ({ element, onAction }: ComponentRenderProps) => {
  const {
    current = 'USD',
    currencies,
    style
  } = element.props;

  const [isOpen, setIsOpen] = useState(false);

  const defaultCurrencies = [
    { code: 'USD', symbol: '$', label: 'US Dollar' },
    { code: 'EUR', symbol: '', label: 'Euro' },
    { code: 'GBP', symbol: '', label: 'British Pound' },
    { code: 'JPY', symbol: '', label: 'Japanese Yen' },
  ];

  const currencyList = (currencies as Array<{ code: string; symbol: string; label: string }>) || defaultCurrencies;
  const currentCurrency = currencyList.find(c => c.code === current) || currencyList[0];

  return (
    <div className="relative" style={style as React.CSSProperties}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded border hover:bg-muted"
      >
        <span className="font-medium">{currentCurrency.symbol}</span>
        <span>{currentCurrency.code}</span>
        <svg className={cn('w-4 h-4 transition-transform', isOpen && 'rotate-180')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className={cn(
            'absolute top-full right-0 mt-2 w-56 bg-background border rounded-lg shadow-lg z-50 overflow-hidden',
            'animate-in fade-in-0 zoom-in-95'
          )}>
            {currencyList.map((currency) => (
              <button
                key={currency.code}
                onClick={() => {
                  onAction?.({ name: 'setCurrency', payload: { currency: currency.code } } as never);
                  setIsOpen(false);
                }}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-2 hover:bg-muted text-left',
                  current === currency.code && 'bg-primary/10'
                )}
              >
                <span className="w-6 text-center font-medium">{currency.symbol}</span>
                <div className="flex-1">
                  <span className="font-medium">{currency.code}</span>
                  <span className="text-muted-foreground ml-2">{currency.label}</span>
                </div>
                {current === currency.code && (
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
