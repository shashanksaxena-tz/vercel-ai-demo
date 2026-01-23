'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const BillingForm = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    values,
    errors,
    sameAsShipping = false,
    showSameAsShipping = true,
    style,
  } = element.props;

  const formValues = (values as Record<string, string>) || {};
  const formErrors = (errors as Record<string, string>) || {};

  const handleChange = (field: string, value: string) => {
    if (onAction) {
      onAction({ name: 'updateBillingField', payload: { field, value } } as never);
    }
  };

  const handleSameAsShippingChange = (checked: boolean) => {
    if (onAction) {
      onAction({ name: 'setSameAsShipping', payload: { value: checked } } as never);
    }
  };

  const inputClass = (field: string) =>
    cn(
      'w-full px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/50',
      formErrors[field] && 'border-destructive focus:ring-destructive/50'
    );

  return (
    <div className="space-y-6" style={style as React.CSSProperties}>
      {showSameAsShipping && (
        <label className="flex items-center gap-2 pb-4 border-b">
          <input
            type="checkbox"
            checked={Boolean(sameAsShipping)}
            onChange={(e) => handleSameAsShippingChange(e.target.checked)}
            className="rounded border-input"
          />
          <span className="text-sm font-medium">Same as shipping address</span>
        </label>
      )}

      {!sameAsShipping && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">First Name</label>
              <input
                type="text"
                value={formValues.firstName || ''}
                onChange={(e) => handleChange('firstName', e.target.value)}
                className={inputClass('firstName')}
                placeholder="John"
              />
              {formErrors.firstName && (
                <p className="text-xs text-destructive mt-1">{formErrors.firstName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Last Name</label>
              <input
                type="text"
                value={formValues.lastName || ''}
                onChange={(e) => handleChange('lastName', e.target.value)}
                className={inputClass('lastName')}
                placeholder="Doe"
              />
              {formErrors.lastName && (
                <p className="text-xs text-destructive mt-1">{formErrors.lastName}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Company (optional)</label>
            <input
              type="text"
              value={formValues.company || ''}
              onChange={(e) => handleChange('company', e.target.value)}
              className={inputClass('company')}
              placeholder="Company name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              type="text"
              value={formValues.address || ''}
              onChange={(e) => handleChange('address', e.target.value)}
              className={inputClass('address')}
              placeholder="123 Main Street"
            />
            {formErrors.address && (
              <p className="text-xs text-destructive mt-1">{formErrors.address}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Apartment, suite, etc. (optional)
            </label>
            <input
              type="text"
              value={formValues.address2 || ''}
              onChange={(e) => handleChange('address2', e.target.value)}
              className={inputClass('address2')}
              placeholder="Apt 4B"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <input
                type="text"
                value={formValues.city || ''}
                onChange={(e) => handleChange('city', e.target.value)}
                className={inputClass('city')}
                placeholder="New York"
              />
              {formErrors.city && (
                <p className="text-xs text-destructive mt-1">{formErrors.city}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">State</label>
              <input
                type="text"
                value={formValues.state || ''}
                onChange={(e) => handleChange('state', e.target.value)}
                className={inputClass('state')}
                placeholder="NY"
              />
              {formErrors.state && (
                <p className="text-xs text-destructive mt-1">{formErrors.state}</p>
              )}
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium mb-1">ZIP Code</label>
              <input
                type="text"
                value={formValues.zipCode || ''}
                onChange={(e) => handleChange('zipCode', e.target.value)}
                className={inputClass('zipCode')}
                placeholder="10001"
              />
              {formErrors.zipCode && (
                <p className="text-xs text-destructive mt-1">{formErrors.zipCode}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Country</label>
            <select
              value={formValues.country || 'US'}
              onChange={(e) => handleChange('country', e.target.value)}
              className={inputClass('country')}
            >
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="GB">United Kingdom</option>
              <option value="AU">Australia</option>
            </select>
          </div>
        </>
      )}

      {children}
    </div>
  );
};
