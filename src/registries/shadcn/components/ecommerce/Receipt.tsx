'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Download, Share2, CheckCircle } from 'lucide-react';

export const Receipt = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    receiptNumber,
    orderNumber,
    date,
    time,
    store,
    items,
    subtotal,
    tax,
    taxRate,
    discount,
    total,
    paymentMethod,
    currency = '$',
    showActions = true,
    variant = 'default',
    style,
  } = element.props;

  const storeInfo = store as {
    name: string;
    address?: string;
    phone?: string;
  } | undefined;

  const lineItems = items as Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }> | undefined;

  const payment = paymentMethod as {
    type: string;
    last4?: string;
  } | undefined;

  const handleDownload = () => {
    if (onAction) {
      onAction({ name: 'downloadReceipt', payload: { receiptNumber } } as never);
    }
  };

  const handleShare = () => {
    if (onAction) {
      onAction({ name: 'shareReceipt', payload: { receiptNumber } } as never);
    }
  };

  if (variant === 'thermal') {
    return (
      <div
        className="max-w-sm mx-auto bg-white dark:bg-card p-6 font-mono text-sm"
        style={style as React.CSSProperties}
      >
        <div className="text-center mb-4">
          {storeInfo && (
            <>
              <p className="font-bold text-lg">{storeInfo.name}</p>
              {storeInfo.address && <p>{storeInfo.address}</p>}
              {storeInfo.phone && <p>{storeInfo.phone}</p>}
            </>
          )}
        </div>

        <div className="border-t border-dashed pt-4 mb-4">
          <div className="flex justify-between">
            <span>Date:</span>
            <span>{date as string}</span>
          </div>
          <div className="flex justify-between">
            <span>Time:</span>
            <span>{time as string}</span>
          </div>
          <div className="flex justify-between">
            <span>Receipt #:</span>
            <span>{receiptNumber as string}</span>
          </div>
        </div>

        <div className="border-t border-dashed py-4">
          {lineItems?.map((item) => (
            <div key={item.id} className="mb-2">
              <div className="flex justify-between">
                <span className="truncate flex-1">{item.name}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>
                  {item.quantity} x {currency}{item.price.toFixed(2)}
                </span>
                <span>{currency}{(item.quantity * item.price).toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-dashed pt-4 space-y-1">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{currency}{Number(subtotal || 0).toFixed(2)}</span>
          </div>
          {discount !== undefined && Number(discount) > 0 && (
            <div className="flex justify-between">
              <span>Discount</span>
              <span>-{currency}{Number(discount).toFixed(2)}</span>
            </div>
          )}
          {tax !== undefined && (
            <div className="flex justify-between">
              <span>Tax {taxRate && `(${taxRate}%)`}</span>
              <span>{currency}{Number(tax).toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between font-bold text-base pt-2 border-t border-dashed">
            <span>TOTAL</span>
            <span>{currency}{Number(total || 0).toFixed(2)}</span>
          </div>
        </div>

        {payment && (
          <div className="border-t border-dashed pt-4 mt-4">
            <div className="flex justify-between">
              <span>Payment</span>
              <span>
                {payment.type}
                {payment.last4 && ` ****${payment.last4}`}
              </span>
            </div>
          </div>
        )}

        <div className="text-center mt-6 pt-4 border-t border-dashed">
          <p>Thank you for your purchase!</p>
          <p className="text-muted-foreground text-xs mt-2">
            Please keep this receipt for your records
          </p>
        </div>

        {children}
      </div>
    );
  }

  return (
    <div
      className="bg-white dark:bg-card rounded-lg border p-6 max-w-lg mx-auto"
      style={style as React.CSSProperties}
    >
      <div className="text-center mb-6">
        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
        <h2 className="text-xl font-semibold">Payment Successful</h2>
        <p className="text-sm text-muted-foreground">Receipt #{receiptNumber as string}</p>
      </div>

      {storeInfo && (
        <div className="text-center mb-6 pb-6 border-b">
          <p className="font-medium">{storeInfo.name}</p>
          {storeInfo.address && (
            <p className="text-sm text-muted-foreground">{storeInfo.address}</p>
          )}
        </div>
      )}

      <div className="space-y-3 mb-6">
        {lineItems?.map((item) => (
          <div key={item.id} className="flex justify-between">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-muted-foreground">
                {item.quantity} x {currency}{item.price.toFixed(2)}
              </p>
            </div>
            <span className="font-medium">
              {currency}{(item.quantity * item.price).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

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

      {payment && (
        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <p className="text-sm">
            Paid with {payment.type}
            {payment.last4 && ` ending in ${payment.last4}`}
          </p>
          <p className="text-xs text-muted-foreground">
            {date as string} at {time as string}
          </p>
        </div>
      )}

      {showActions && (
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-2 py-2 border rounded-md hover:bg-muted transition-colors"
          >
            <Download className="h-4 w-4" />
            Download
          </button>
          <button
            onClick={handleShare}
            className="flex-1 flex items-center justify-center gap-2 py-2 border rounded-md hover:bg-muted transition-colors"
          >
            <Share2 className="h-4 w-4" />
            Share
          </button>
        </div>
      )}

      {children}
    </div>
  );
};
