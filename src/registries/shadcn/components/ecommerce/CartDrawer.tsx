'use client';
// @ts-nocheck

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { X, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';

export const CartDrawer = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    isOpen = false,
    items,
    subtotal,
    total,
    currency = '$',
    position = 'right',
    showOverlay = true,
    title = 'Shopping Cart',
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

  const positions = {
    left: 'left-0',
    right: 'right-0',
  };

  const handleClose = () => {
    if (onAction) {
      onAction({ name: 'closeCartDrawer' });
    }
  };

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

  const handleViewCart = () => {
    if (onAction) {
      onAction({ name: 'viewCart' });
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {showOverlay && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={handleClose}
        />
      )}
      <div
        className={cn(
          'fixed top-0 h-full w-full max-w-md bg-background shadow-xl z-50 flex flex-col',
          positions[position as keyof typeof positions] || positions.right
        )}
        style={style as React.CSSProperties}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            {title as string}
            {cartItems && cartItems.length > 0 && (
              <span className="text-sm font-normal text-muted-foreground">
                ({cartItems.length})
              </span>
            )}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-muted rounded-md transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {!cartItems || cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">{emptyMessage as string}</p>
            </div>
          ) : (
            <div className="space-y-4">
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
                    <h4 className="text-sm font-medium truncate">{item.name}</h4>
                    {item.variant && (
                      <p className="text-xs text-muted-foreground">{item.variant}</p>
                    )}
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center gap-1 border rounded text-xs">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="px-2 py-0.5 hover:bg-muted disabled:opacity-50"
                        >
                          -
                        </button>
                        <span className="px-2">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 hover:bg-muted"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-sm font-medium">
                        {currency}{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
          {children}
        </div>

        {cartItems && cartItems.length > 0 && (
          <div className="p-4 border-t space-y-4">
            <div className="space-y-2">
              {subtotal !== undefined && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{currency}{Number(subtotal).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{currency}{Number(total || subtotal || 0).toFixed(2)}</span>
              </div>
            </div>
            <div className="space-y-2">
              <button
                onClick={handleCheckout}
                className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
              >
                Checkout
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={handleViewCart}
                className="w-full py-2 text-sm text-center text-muted-foreground hover:text-foreground transition-colors"
              >
                View Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
