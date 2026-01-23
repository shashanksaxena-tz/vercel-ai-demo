'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { ShoppingCart, Trash2, ArrowRight } from 'lucide-react';

export const Cart = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    items,
    subtotal,
    shipping,
    tax,
    total,
    currency = '$',
    showSummary = true,
    showCheckoutButton = true,
    emptyMessage = 'Your cart is empty',
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

  const handleRemove = (itemId: string) => {
    if (onAction) {
      onAction({ name: 'removeFromCart', payload: { itemId } } as never);
    }
  };

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    if (onAction) {
      onAction({ name: 'updateCartQuantity', payload: { itemId, quantity } } as never);
    }
  };

  const handleCheckout = () => {
    if (onAction) {
      onAction({ name: 'checkout' });
    }
  };

  const handleContinueShopping = () => {
    if (onAction) {
      onAction({ name: 'continueShopping' });
    }
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-16 text-center"
        style={style as React.CSSProperties}
      >
        <ShoppingCart className="h-20 w-20 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold mb-2">{emptyMessage as string}</h2>
        <p className="text-muted-foreground mb-6">
          Looks like you haven't added anything to your cart yet.
        </p>
        <button
          onClick={handleContinueShopping}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Continue Shopping
        </button>
        {children}
      </div>
    );
  }

  return (
    <div className="space-y-6" style={style as React.CSSProperties}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          Shopping Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
        </h2>
        <button
          onClick={handleContinueShopping}
          className="text-sm text-primary hover:underline"
        >
          Continue Shopping
        </button>
      </div>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 p-4 border rounded-lg bg-card"
          >
            <div className="w-24 h-24 rounded-md overflow-hidden bg-muted flex-shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  {item.variant && (
                    <p className="text-sm text-muted-foreground">{item.variant}</p>
                  )}
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center border rounded-md">
                  <button
                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="px-3 py-1 hover:bg-muted disabled:opacity-50"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 border-x">{item.quantity}</span>
                  <button
                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                    className="px-3 py-1 hover:bg-muted"
                  >
                    +
                  </button>
                </div>
                <span className="font-bold">
                  {currency}{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showSummary && (
        <div className="border rounded-lg p-6 space-y-4 bg-muted/30">
          <h3 className="font-semibold text-lg">Order Summary</h3>
          <div className="space-y-2">
            {subtotal !== undefined && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{currency}{Number(subtotal).toFixed(2)}</span>
              </div>
            )}
            {shipping !== undefined && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>
                  {Number(shipping) === 0 ? 'Free' : `${currency}${Number(shipping).toFixed(2)}`}
                </span>
              </div>
            )}
            {tax !== undefined && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>{currency}{Number(tax).toFixed(2)}</span>
              </div>
            )}
            <div className="border-t pt-2 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>{currency}{Number(total || 0).toFixed(2)}</span>
            </div>
          </div>
          {showCheckoutButton && (
            <button
              onClick={handleCheckout}
              className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground rounded-md font-semibold hover:bg-primary/90 transition-colors"
            >
              Proceed to Checkout
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      )}
      {children}
    </div>
  );
};
