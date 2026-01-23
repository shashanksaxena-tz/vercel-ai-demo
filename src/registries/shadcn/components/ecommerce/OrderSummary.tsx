'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Truck, MapPin, CreditCard, ShieldCheck } from 'lucide-react';

export const OrderSummary = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    items,
    subtotal,
    shipping,
    tax,
    discount,
    total,
    currency = '$',
    shippingAddress,
    billingAddress,
    shippingMethod,
    paymentMethod,
    showEdit = true,
    style,
  } = element.props;

  const cartItems = items as Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    variant?: string;
  }> | undefined;

  const shipping_addr = shippingAddress as {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  } | undefined;

  const payment = paymentMethod as {
    type: string;
    last4?: string;
    brand?: string;
  } | undefined;

  const handleEdit = (section: string) => {
    if (onAction) {
      onAction({ name: 'editSection', payload: { section } } as never);
    }
  };

  return (
    <div className="space-y-6" style={style as React.CSSProperties}>
      <h2 className="text-xl font-semibold">Order Summary</h2>

      {/* Items */}
      {cartItems && cartItems.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Items ({cartItems.length})</h3>
            {showEdit && (
              <button
                onClick={() => handleEdit('cart')}
                className="text-sm text-primary hover:underline"
              >
                Edit
              </button>
            )}
          </div>
          <div className="space-y-3">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-3">
                <div className="w-16 h-16 rounded overflow-hidden bg-muted flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{item.name}</p>
                  {item.variant && (
                    <p className="text-xs text-muted-foreground">{item.variant}</p>
                  )}
                  <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <span className="font-medium text-sm">
                  {currency}{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Shipping Address */}
      {shipping_addr && (
        <div className="space-y-2 pt-4 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium">Shipping Address</h3>
            </div>
            {showEdit && (
              <button
                onClick={() => handleEdit('shipping')}
                className="text-sm text-primary hover:underline"
              >
                Edit
              </button>
            )}
          </div>
          <div className="text-sm text-muted-foreground pl-6">
            <p>{shipping_addr.name}</p>
            <p>{shipping_addr.address}</p>
            <p>
              {shipping_addr.city}, {shipping_addr.state} {shipping_addr.zipCode}
            </p>
          </div>
        </div>
      )}

      {/* Shipping Method */}
      {shippingMethod && (
        <div className="space-y-2 pt-4 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium">Shipping Method</h3>
            </div>
            {showEdit && (
              <button
                onClick={() => handleEdit('shippingMethod')}
                className="text-sm text-primary hover:underline"
              >
                Edit
              </button>
            )}
          </div>
          <p className="text-sm text-muted-foreground pl-6">{shippingMethod as string}</p>
        </div>
      )}

      {/* Payment Method */}
      {payment && (
        <div className="space-y-2 pt-4 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium">Payment Method</h3>
            </div>
            {showEdit && (
              <button
                onClick={() => handleEdit('payment')}
                className="text-sm text-primary hover:underline"
              >
                Edit
              </button>
            )}
          </div>
          <p className="text-sm text-muted-foreground pl-6">
            {payment.brand || payment.type}
            {payment.last4 && ` ending in ${payment.last4}`}
          </p>
        </div>
      )}

      {/* Totals */}
      <div className="space-y-2 pt-4 border-t">
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
            {Number(shipping) === 0 ? 'Free' : `${currency}${Number(shipping || 0).toFixed(2)}`}
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

      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <ShieldCheck className="h-4 w-4" />
        <span>Your order is protected by our secure checkout</span>
      </div>

      {children}
    </div>
  );
};
