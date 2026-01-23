'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { CreditCard, Lock } from 'lucide-react';

export const PaymentForm = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    values,
    errors,
    selectedMethod = 'card',
    paymentMethods,
    showSaveCard = true,
    style,
  } = element.props;

  const formValues = (values as Record<string, string>) || {};
  const formErrors = (errors as Record<string, string>) || {};
  const methods = (paymentMethods as Array<{
    id: string;
    name: string;
    icon?: string;
    description?: string;
  }>) || [
    { id: 'card', name: 'Credit Card', description: 'Pay with credit or debit card' },
    { id: 'paypal', name: 'PayPal', description: 'Pay with your PayPal account' },
  ];

  const handleChange = (field: string, value: string) => {
    if (onAction) {
      onAction({ name: 'updatePaymentField', payload: { field, value } } as never);
    }
  };

  const handleMethodChange = (methodId: string) => {
    if (onAction) {
      onAction({ name: 'selectPaymentMethod', payload: { methodId } } as never);
    }
  };

  const inputClass = (field: string) =>
    cn(
      'w-full px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/50',
      formErrors[field] && 'border-destructive focus:ring-destructive/50'
    );

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

  return (
    <div className="space-y-6" style={style as React.CSSProperties}>
      <div className="space-y-3">
        {methods.map((method) => (
          <label
            key={method.id}
            className={cn(
              'flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors',
              selectedMethod === method.id
                ? 'border-primary bg-primary/5'
                : 'hover:bg-muted/50'
            )}
          >
            <input
              type="radio"
              name="paymentMethod"
              value={method.id}
              checked={selectedMethod === method.id}
              onChange={() => handleMethodChange(method.id)}
              className="text-primary"
            />
            <div className="flex-1">
              <p className="font-medium">{method.name}</p>
              {method.description && (
                <p className="text-sm text-muted-foreground">{method.description}</p>
              )}
            </div>
            {method.id === 'card' && <CreditCard className="h-6 w-6 text-muted-foreground" />}
          </label>
        ))}
      </div>

      {selectedMethod === 'card' && (
        <div className="space-y-4 pt-4 border-t">
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
              onChange={(e) => handleChange('cardName', e.target.value)}
              className={inputClass('cardName')}
              placeholder="John Doe"
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
                type="text"
                value={formValues.cvv || ''}
                onChange={(e) => handleChange('cvv', e.target.value.replace(/\D/g, '').substr(0, 4))}
                className={inputClass('cvv')}
                placeholder="123"
                maxLength={4}
              />
              {formErrors.cvv && (
                <p className="text-xs text-destructive mt-1">{formErrors.cvv}</p>
              )}
            </div>
          </div>

          {showSaveCard && (
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formValues.saveCard === 'true'}
                onChange={(e) => handleChange('saveCard', e.target.checked ? 'true' : 'false')}
                className="rounded border-input"
              />
              <span className="text-sm">Save card for future purchases</span>
            </label>
          )}

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Lock className="h-4 w-4" />
            <span>Your payment information is encrypted and secure</span>
          </div>
        </div>
      )}

      {selectedMethod === 'paypal' && (
        <div className="p-6 bg-muted/30 rounded-lg text-center">
          <p className="text-sm text-muted-foreground">
            You will be redirected to PayPal to complete your purchase.
          </p>
        </div>
      )}

      {children}
    </div>
  );
};
