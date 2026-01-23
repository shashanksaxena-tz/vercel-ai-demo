'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { ShieldCheck, Lock } from 'lucide-react';

export const Checkout = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    currentStep = 1,
    steps,
    showSidebar = true,
    items,
    subtotal,
    shipping,
    tax,
    discount,
    total,
    currency = '$',
    style,
  } = element.props;

  const stepList = (steps as Array<{ id: number; title: string; description?: string }>) || [
    { id: 1, title: 'Shipping' },
    { id: 2, title: 'Payment' },
    { id: 3, title: 'Review' },
  ];

  const cartItems = items as Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }> | undefined;

  return (
    <div
      className={cn(
        'grid gap-8',
        showSidebar ? 'lg:grid-cols-3' : 'max-w-2xl mx-auto'
      )}
      style={style as React.CSSProperties}
    >
      <div className={cn(showSidebar ? 'lg:col-span-2' : '')}>
        {/* Steps indicator */}
        <div className="flex items-center justify-between mb-8">
          {stepList.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex items-center">
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
                    Number(currentStep) >= step.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  )}
                >
                  {step.id}
                </div>
                <span
                  className={cn(
                    'ml-2 text-sm font-medium hidden sm:inline',
                    Number(currentStep) >= step.id
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  )}
                >
                  {step.title}
                </span>
              </div>
              {index < stepList.length - 1 && (
                <div
                  className={cn(
                    'flex-1 h-0.5 mx-4',
                    Number(currentStep) > step.id ? 'bg-primary' : 'bg-muted'
                  )}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Form content */}
        <div className="space-y-6">{children}</div>
      </div>

      {showSidebar && (
        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6 space-y-4 sticky top-4">
            <h3 className="font-semibold text-lg">Order Summary</h3>

            {cartItems && cartItems.length > 0 && (
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-14 h-14 rounded overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-medium">
                      {currency}{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{currency}{Number(subtotal || 0).toFixed(2)}</span>
              </div>
              {discount !== undefined && Number(discount) > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount</span>
                  <span>-{currency}{Number(discount).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>
                  {shipping === undefined
                    ? 'Calculated next'
                    : Number(shipping) === 0
                    ? 'Free'
                    : `${currency}${Number(shipping).toFixed(2)}`}
                </span>
              </div>
              {tax !== undefined && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>{currency}{Number(tax).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total</span>
                <span>{currency}{Number(total || 0).toFixed(2)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground pt-4 border-t">
              <Lock className="h-4 w-4" />
              <span>Secure SSL encrypted checkout</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4" />
              <span>Your data is protected</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
