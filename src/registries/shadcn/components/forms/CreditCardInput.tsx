'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { CreditCard } from 'lucide-react';

export const CreditCardInput = ({ element, onAction }: ComponentRenderProps) => {
  const {
    label,
    name,
    disabled = false,
    required = false,
    showIcon = true,
    error,
    helperText,
    style
  } = element.props;

  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardType, setCardType] = useState<string | null>(null);

  const detectCardType = (number: string): string | null => {
    const cleaned = number.replace(/\s/g, '');
    if (/^4/.test(cleaned)) return 'visa';
    if (/^5[1-5]/.test(cleaned) || /^2[2-7]/.test(cleaned)) return 'mastercard';
    if (/^3[47]/.test(cleaned)) return 'amex';
    if (/^6(?:011|5)/.test(cleaned)) return 'discover';
    return null;
  };

  const formatCardNumber = (value: string): string => {
    const cleaned = value.replace(/\D/g, '');
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(' ') : '';
  };

  const formatExpiryDate = (value: string): string => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = formatCardNumber(value);
    setCardNumber(formatted);
    setCardType(detectCardType(value));

    onAction?.({
      name: 'change',
      params: {
        name,
        value: {
          cardNumber: value,
          expiryDate: expiryDate.replace('/', ''),
          cvv,
          cardType: detectCardType(value),
        },
      },
    });
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    const formatted = formatExpiryDate(value);
    setExpiryDate(formatted);

    onAction?.({
      name: 'change',
      params: {
        name,
        value: {
          cardNumber: cardNumber.replace(/\s/g, ''),
          expiryDate: value,
          cvv,
          cardType,
        },
      },
    });
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, cardType === 'amex' ? 4 : 3);
    setCvv(value);

    onAction?.({
      name: 'change',
      params: {
        name,
        value: {
          cardNumber: cardNumber.replace(/\s/g, ''),
          expiryDate: expiryDate.replace('/', ''),
          cvv: value,
          cardType,
        },
      },
    });
  };

  const cardTypeIcons: Record<string, string> = {
    visa: 'VISA',
    mastercard: 'MC',
    amex: 'AMEX',
    discover: 'DISC',
  };

  return (
    <div className="w-full" style={style as React.CSSProperties}>
      {label ? (
        <label className="block text-sm font-medium mb-2">
          {label as string}
          {(required as boolean) && <span className="text-destructive ml-1">*</span>}
        </label>
      ) : null}

      <div className={cn(
        'rounded-md border border-input bg-background p-4',
        !!(error) && 'border-destructive',
        !!(disabled) && 'opacity-50 cursor-not-allowed'
      )}>
        {/* Card Number */}
        <div className="relative mb-4">
          <label className="block text-xs text-muted-foreground mb-1">Card Number</label>
          <div className="relative">
            {showIcon && (
              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            )}
            <input
              type="text"
              inputMode="numeric"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              disabled={disabled as boolean}
              className={cn(
                'w-full h-10 rounded-md border border-input bg-background px-3 text-sm',
                'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                'disabled:cursor-not-allowed disabled:opacity-50',
                !!(showIcon) && 'pl-10'
              )}
              onChange={handleCardNumberChange}
            />
            {cardType && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-primary">
                {cardTypeIcons[cardType]}
              </span>
            )}
          </div>
        </div>

        {/* Expiry and CVV */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-xs text-muted-foreground mb-1">Expiry Date</label>
            <input
              type="text"
              inputMode="numeric"
              placeholder="MM/YY"
              value={expiryDate}
              disabled={disabled as boolean}
              className={cn(
                'w-full h-10 rounded-md border border-input bg-background px-3 text-sm',
                'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                'disabled:cursor-not-allowed disabled:opacity-50'
              )}
              onChange={handleExpiryChange}
            />
          </div>
          <div className="w-24">
            <label className="block text-xs text-muted-foreground mb-1">CVV</label>
            <input
              type="password"
              inputMode="numeric"
              placeholder={cardType === 'amex' ? '4 digits' : '3 digits'}
              value={cvv}
              disabled={disabled as boolean}
              className={cn(
                'w-full h-10 rounded-md border border-input bg-background px-3 text-sm',
                'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                'disabled:cursor-not-allowed disabled:opacity-50'
              )}
              onChange={handleCvvChange}
            />
          </div>
        </div>
      </div>

      {(error || helperText) ? (
        <p className={cn('mt-1 text-sm', error ? 'text-destructive' : 'text-muted-foreground')}>
          {(error || helperText) as string}
        </p>
      ) : null}
    </div>
  );
};
