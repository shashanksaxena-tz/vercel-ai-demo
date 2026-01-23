'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { CheckCircle, Package, Mail, ArrowRight } from 'lucide-react';

export const OrderConfirmation = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    orderNumber,
    orderDate,
    email,
    total,
    currency = '$',
    items,
    shippingAddress,
    estimatedDelivery,
    showContinueShopping = true,
    showTrackOrder = true,
    style,
  } = element.props;

  const cartItems = items as Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }> | undefined;

  const shipping = shippingAddress as {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  } | undefined;

  const handleContinueShopping = () => {
    if (onAction) {
      onAction({ name: 'continueShopping' });
    }
  };

  const handleTrackOrder = () => {
    if (onAction) {
      onAction({ name: 'trackOrder', payload: { orderNumber } } as never);
    }
  };

  const handleViewOrderDetails = () => {
    if (onAction) {
      onAction({ name: 'viewOrderDetails', payload: { orderNumber } } as never);
    }
  };

  return (
    <div className="max-w-2xl mx-auto text-center" style={style as React.CSSProperties}>
      <div className="mb-8">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-foreground mb-2">Order Confirmed!</h1>
        <p className="text-muted-foreground">
          Thank you for your purchase. Your order has been placed successfully.
        </p>
      </div>

      <div className="bg-muted/30 rounded-lg p-6 mb-6 text-left">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-muted-foreground">Order Number</p>
            <p className="font-semibold">#{orderNumber as string}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Order Date</p>
            <p className="font-semibold">{orderDate as string}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Amount</p>
            <p className="font-semibold">{currency}{Number(total || 0).toFixed(2)}</p>
          </div>
          {estimatedDelivery && (
            <div>
              <p className="text-sm text-muted-foreground">Estimated Delivery</p>
              <p className="font-semibold">{estimatedDelivery as string}</p>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground border-t pt-4">
          <Mail className="h-4 w-4" />
          <span>Confirmation sent to {email as string}</span>
        </div>
      </div>

      {cartItems && cartItems.length > 0 && (
        <div className="border rounded-lg p-6 mb-6 text-left">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Package className="h-5 w-5" />
            Order Items
          </h3>
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
                  <p className="font-medium text-sm">{item.name}</p>
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

      {shipping && (
        <div className="border rounded-lg p-6 mb-6 text-left">
          <h3 className="font-semibold mb-2">Shipping Address</h3>
          <div className="text-sm text-muted-foreground">
            <p>{shipping.name}</p>
            <p>{shipping.address}</p>
            <p>
              {shipping.city}, {shipping.state} {shipping.zipCode}
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {showTrackOrder && (
          <button
            onClick={handleTrackOrder}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
          >
            Track Order
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
        {showContinueShopping && (
          <button
            onClick={handleContinueShopping}
            className="px-6 py-3 border rounded-md font-medium hover:bg-muted transition-colors"
          >
            Continue Shopping
          </button>
        )}
      </div>

      <button
        onClick={handleViewOrderDetails}
        className="mt-4 text-sm text-primary hover:underline"
      >
        View Order Details
      </button>

      {children}
    </div>
  );
};
