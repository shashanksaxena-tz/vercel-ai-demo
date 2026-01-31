'use client';
// @ts-nocheck

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { RotateCcw, Star } from 'lucide-react';

export const OrderItem = ({ element, onAction }: ComponentRenderProps) => {
  const {
    id,
    name,
    price,
    quantity,
    image,
    variant,
    status,
    currency = '$',
    showReview = false,
    showReturn = false,
    showReorder = true,
    style,
  } = element.props;

  const handleReview = () => {
    if (onAction) {
      onAction({ name: 'reviewProduct', payload: { productId: id } } as never);
    }
  };

  const handleReturn = () => {
    if (onAction) {
      onAction({ name: 'returnItem', payload: { itemId: id } } as never);
    }
  };

  const handleReorder = () => {
    if (onAction) {
      onAction({ name: 'reorderItem', payload: { productId: id, quantity } } as never);
    }
  };

  const getStatusColor = (status: string | undefined) => {
    switch (status) {
      case 'delivered':
        return 'text-green-600';
      case 'shipped':
        return 'text-blue-600';
      case 'processing':
        return 'text-yellow-600';
      case 'cancelled':
        return 'text-destructive';
      case 'returned':
        return 'text-muted-foreground';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div
      className="flex gap-4 py-4 border-b last:border-b-0"
      style={style as React.CSSProperties}
    >
      <div className="w-20 h-20 rounded-md overflow-hidden bg-muted flex-shrink-0">
        {image && (
          <img
            src={image as string}
            alt={name as string}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-medium">{name as string}</h4>
            {variant && (
              <p className="text-sm text-muted-foreground">{variant as string}</p>
            )}
            <p className="text-sm text-muted-foreground mt-1">
              Qty: {quantity} x {currency}{Number(price).toFixed(2)}
            </p>
          </div>
          <div className="text-right">
            <span className="font-bold">
              {currency}{(Number(price) * Number(quantity)).toFixed(2)}
            </span>
            {status && (
              <p className={cn('text-sm capitalize', getStatusColor(status as string))}>
                {status as string}
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-3 mt-3">
          {showReorder && (
            <button
              onClick={handleReorder}
              className="flex items-center gap-1 text-sm text-primary hover:underline"
            >
              <RotateCcw className="h-4 w-4" />
              Buy Again
            </button>
          )}
          {showReview && status === 'delivered' && (
            <button
              onClick={handleReview}
              className="flex items-center gap-1 text-sm text-primary hover:underline"
            >
              <Star className="h-4 w-4" />
              Write Review
            </button>
          )}
          {showReturn && (status === 'delivered' || status === 'shipped') && (
            <button
              onClick={handleReturn}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Return Item
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
