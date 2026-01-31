'use client';
// @ts-nocheck

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { ArrowRight, ShieldCheck, Truck } from 'lucide-react';

export const CartSummary = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    subtotal,
    shipping,
    tax,
    discount,
    total,
    currency = '$',
    itemCount,
    showPromoInput = false,
    showSecurityBadge = true,
    showShippingEstimate = true,
    checkoutLabel = 'Proceed to Checkout',
    style,
  } = element.props;

  const handleCheckout = () => {
    if (onAction) {
      onAction({ name: 'checkout' });
    }
  };

  const handleApplyPromo = (code: string) => {
    if (onAction) {
      onAction({ name: 'applyPromoCode', payload: { code } } as never);
    }
  };

  return (
    <div
      className="border rounded-lg p-6 space-y-4 bg-card"
      style={style as React.CSSProperties}
    >
      <h3 className="font-semibold text-lg">Order Summary</h3>

      {itemCount !== undefined && (
        <p className="text-sm text-muted-foreground">
          {itemCount} {Number(itemCount) === 1 ? 'item' : 'items'} in cart
        </p>
      )}

      <div className="space-y-3 py-4 border-y">
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

        {shipping !== undefined && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>
            <span>
              {Number(shipping) === 0 ? (
                <span className="text-green-600">Free</span>
              ) : (
                `${currency}${Number(shipping).toFixed(2)}`
              )}
            </span>
          </div>
        )}

        {tax !== undefined && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tax</span>
            <span>{currency}{Number(tax).toFixed(2)}</span>
          </div>
        )}
      </div>

      <div className="flex justify-between font-bold text-lg">
        <span>Total</span>
        <span>{currency}{Number(total || 0).toFixed(2)}</span>
      </div>

      {showPromoInput && (
        <div className="pt-2">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Promo code"
              className="flex-1 px-3 py-2 text-sm border rounded-md bg-background"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleApplyPromo((e.target as HTMLInputElement).value);
                }
              }}
            />
            <button
              onClick={(e) => {
                const input = (e.target as HTMLElement).previousSibling as HTMLInputElement;
                if (input?.value) handleApplyPromo(input.value);
              }}
              className="px-4 py-2 text-sm border rounded-md hover:bg-muted transition-colors"
            >
              Apply
            </button>
          </div>
        </div>
      )}

      <button
        onClick={handleCheckout}
        className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground rounded-md font-semibold hover:bg-primary/90 transition-colors"
      >
        {checkoutLabel as string}
        <ArrowRight className="h-4 w-4" />
      </button>

      {showShippingEstimate && Number(shipping) === 0 && (
        <div className="flex items-center gap-2 text-sm text-green-600 justify-center">
          <Truck className="h-4 w-4" />
          <span>Free shipping on this order</span>
        </div>
      )}

      {showSecurityBadge && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center pt-2">
          <ShieldCheck className="h-4 w-4" />
          <span>Secure checkout with SSL encryption</span>
        </div>
      )}

      {children}
    </div>
  );
};
