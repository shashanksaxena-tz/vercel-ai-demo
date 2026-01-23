'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const ShippingForm = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    values,
    errors,
    showSaveAddress = true,
    showShippingMethods = true,
    shippingMethods,
    selectedMethod,
    style,
  } = element.props;

  const formValues = (values as Record<string, string>) || {};
  const formErrors = (errors as Record<string, string>) || {};
  const methods = shippingMethods as Array<{
    id: string;
    name: string;
    description?: string;
    price: number;
    estimatedDays?: string;
  }> | undefined;

  const handleChange = (field: string, value: string) => {
    if (onAction) {
      onAction({ name: 'updateShippingField', payload: { field, value } } as never);
    }
  };

  const handleSelectMethod = (methodId: string) => {
    if (onAction) {
      onAction({ name: 'selectShippingMethod', payload: { methodId } } as never);
    }
  };

  const inputClass = (field: string) =>
    cn(
      'w-full px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/50',
      formErrors[field] && 'border-destructive focus:ring-destructive/50'
    );

  return (
    <div className="space-y-6" style={style as React.CSSProperties}>
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
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          value={formValues.email || ''}
          onChange={(e) => handleChange('email', e.target.value)}
          className={inputClass('email')}
          placeholder="john@example.com"
        />
        {formErrors.email && (
          <p className="text-xs text-destructive mt-1">{formErrors.email}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Phone</label>
        <input
          type="tel"
          value={formValues.phone || ''}
          onChange={(e) => handleChange('phone', e.target.value)}
          className={inputClass('phone')}
          placeholder="+1 (555) 123-4567"
        />
        {formErrors.phone && (
          <p className="text-xs text-destructive mt-1">{formErrors.phone}</p>
        )}
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

      {showSaveAddress && (
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formValues.saveAddress === 'true'}
            onChange={(e) => handleChange('saveAddress', e.target.checked ? 'true' : 'false')}
            className="rounded border-input"
          />
          <span className="text-sm">Save this address for future orders</span>
        </label>
      )}

      {showShippingMethods && methods && methods.length > 0 && (
        <div className="space-y-3 pt-4 border-t">
          <h4 className="font-medium">Shipping Method</h4>
          {methods.map((method) => (
            <label
              key={method.id}
              className={cn(
                'flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors',
                selectedMethod === method.id
                  ? 'border-primary bg-primary/5'
                  : 'hover:bg-muted/50'
              )}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="shippingMethod"
                  value={method.id}
                  checked={selectedMethod === method.id}
                  onChange={() => handleSelectMethod(method.id)}
                  className="text-primary"
                />
                <div>
                  <p className="font-medium">{method.name}</p>
                  {method.description && (
                    <p className="text-sm text-muted-foreground">{method.description}</p>
                  )}
                  {method.estimatedDays && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Estimated delivery: {method.estimatedDays}
                    </p>
                  )}
                </div>
              </div>
              <span className="font-medium">
                {method.price === 0 ? 'Free' : `$${method.price.toFixed(2)}`}
              </span>
            </label>
          ))}
        </div>
      )}

      {children}
    </div>
  );
};
