'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { CreditCard, Lock } from 'lucide-react';

export const CreditCardForm = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    values,
    errors,
    showCardPreview = true,
    acceptedCards = ['visa', 'mastercard', 'amex', 'discover'],
    style,
  } = element.props;

  const formValues = (values as Record<string, string>) || {};
  const formErrors = (errors as Record<string, string>) || {};
  const cards = acceptedCards as string[];

  const handleChange = (field: string, value: string) => {
    if (onAction) {
      onAction({ name: 'updateCardField', payload: { field, value } } as never);
    }
  };

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, '');
    const groups = digits.match(/.{1,4}/g) || [];
    return groups.join(' ').substr(0, 19);
  };

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length >= 2) {
      return digits.substr(0, 2) + '/' + digits.substr(2, 2);
    }
    return digits;
  };

  const getCardType = (number: string) => {
    const cleaned = number.replace(/\s/g, '');
    if (/^4/.test(cleaned)) return 'visa';
    if (/^5[1-5]/.test(cleaned)) return 'mastercard';
    if (/^3[47]/.test(cleaned)) return 'amex';
    if (/^6(?:011|5)/.test(cleaned)) return 'discover';
    return null;
  };

  const cardType = getCardType(formValues.cardNumber || '');

  const inputClass = (field: string) =>
    cn(
      'w-full px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/50',
      formErrors[field] && 'border-destructive focus:ring-destructive/50'
    );

  return (
    <div className="space-y-6" style={style as React.CSSProperties}>
      {showCardPreview && (
        <div className="relative h-48 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 p-6 text-white overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative">
            <div className="flex justify-between items-start">
              <div className="w-12 h-8 bg-gradient-to-br from-yellow-400 to-yellow-200 rounded" />
              {cardType && (
                <span className="text-lg font-bold uppercase">{cardType}</span>
              )}
            </div>
            <div className="mt-6">
              <p className="font-mono text-xl tracking-widest">
                {formValues.cardNumber || '**** **** **** ****'}
              </p>
            </div>
            <div className="mt-6 flex justify-between">
              <div>
                <p className="text-xs text-white/60">Card Holder</p>
                <p className="font-medium uppercase">
                  {formValues.cardName || 'YOUR NAME'}
                </p>
              </div>
              <div>
                <p className="text-xs text-white/60">Expires</p>
                <p className="font-medium">{formValues.expiry || 'MM/YY'}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-2 justify-center">
        {cards.includes('visa') && (
          <div className={cn('w-12 h-8 border rounded flex items-center justify-center text-xs font-bold', cardType === 'visa' ? 'border-primary bg-primary/5' : 'opacity-50')}>
            VISA
          </div>
        )}
        {cards.includes('mastercard') && (
          <div className={cn('w-12 h-8 border rounded flex items-center justify-center text-xs font-bold', cardType === 'mastercard' ? 'border-primary bg-primary/5' : 'opacity-50')}>
            MC
          </div>
        )}
        {cards.includes('amex') && (
          <div className={cn('w-12 h-8 border rounded flex items-center justify-center text-xs font-bold', cardType === 'amex' ? 'border-primary bg-primary/5' : 'opacity-50')}>
            AMEX
          </div>
        )}
        {cards.includes('discover') && (
          <div className={cn('w-12 h-8 border rounded flex items-center justify-center text-xs font-bold', cardType === 'discover' ? 'border-primary bg-primary/5' : 'opacity-50')}>
            DISC
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Card Number</label>
          <div className="relative">
            <input
              type="text"
              value={formValues.cardNumber || ''}
              onChange={(e) => handleChange('cardNumber', formatCardNumber(e.target.value))}
              className={cn(inputClass('cardNumber'), 'pr-10')}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
            />
            <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
          {formErrors.cardNumber && (
            <p className="text-xs text-destructive mt-1">{formErrors.cardNumber}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Cardholder Name</label>
          <input
            type="text"
            value={formValues.cardName || ''}
            onChange={(e) => handleChange('cardName', e.target.value.toUpperCase())}
            className={inputClass('cardName')}
            placeholder="JOHN DOE"
          />
          {formErrors.cardName && (
            <p className="text-xs text-destructive mt-1">{formErrors.cardName}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Expiry Date</label>
            <input
              type="text"
              value={formValues.expiry || ''}
              onChange={(e) => handleChange('expiry', formatExpiry(e.target.value))}
              className={inputClass('expiry')}
              placeholder="MM/YY"
              maxLength={5}
            />
            {formErrors.expiry && (
              <p className="text-xs text-destructive mt-1">{formErrors.expiry}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">CVV</label>
            <input
              type="password"
              value={formValues.cvv || ''}
              onChange={(e) => handleChange('cvv', e.target.value.replace(/\D/g, '').substr(0, 4))}
              className={inputClass('cvv')}
              placeholder="***"
              maxLength={4}
            />
            {formErrors.cvv && (
              <p className="text-xs text-destructive mt-1">{formErrors.cvv}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2">
        <Lock className="h-4 w-4" />
        <span>Your card details are encrypted and secure</span>
      </div>

      {children}
    </div>
  );
};
