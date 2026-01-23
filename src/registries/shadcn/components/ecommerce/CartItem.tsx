'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Trash2, Minus, Plus } from 'lucide-react';

export const CartItem = ({ element, onAction }: ComponentRenderProps) => {
  const {
    id,
    name,
    price,
    quantity,
    image,
    variant,
    currency = '$',
    maxQuantity = 99,
    minQuantity = 1,
    showRemove = true,
    showQuantityControls = true,
    compact = false,
    style,
  } = element.props;

  const handleRemove = () => {
    if (onAction) {
      onAction({ name: 'removeFromCart', payload: { itemId: id } } as never);
    }
  };

  const handleUpdateQuantity = (newQuantity: number) => {
    const min = Number(minQuantity) || 1;
    const max = Number(maxQuantity) || 99;
    const clamped = Math.min(Math.max(newQuantity, min), max);
    if (onAction) {
      onAction({ name: 'updateCartQuantity', payload: { itemId: id, quantity: clamped } } as never);
    }
  };

  if (compact) {
    return (
      <div
        className="flex items-center gap-3 py-2"
        style={style as React.CSSProperties}
      >
        <div className="w-12 h-12 rounded overflow-hidden bg-muted flex-shrink-0">
          {image && (
            <img
              src={image as string}
              alt={name as string}
              className="h-full w-full object-cover"
            />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{name as string}</p>
          <p className="text-xs text-muted-foreground">
            Qty: {quantity} x {currency}{Number(price).toFixed(2)}
          </p>
        </div>
        <span className="font-medium text-sm">
          {currency}{(Number(price) * Number(quantity)).toFixed(2)}
        </span>
        {showRemove && (
          <button
            onClick={handleRemove}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }

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
              {currency}{Number(price).toFixed(2)} each
            </p>
          </div>
          {showRemove && (
            <button
              onClick={handleRemove}
              className="text-muted-foreground hover:text-destructive transition-colors"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          )}
        </div>
        <div className="flex items-center justify-between mt-3">
          {showQuantityControls ? (
            <div className="flex items-center border rounded-md">
              <button
                onClick={() => handleUpdateQuantity(Number(quantity) - 1)}
                disabled={Number(quantity) <= Number(minQuantity)}
                className="p-1.5 hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-3 py-1 text-sm border-x min-w-[2.5rem] text-center">
                {quantity}
              </span>
              <button
                onClick={() => handleUpdateQuantity(Number(quantity) + 1)}
                disabled={Number(quantity) >= Number(maxQuantity)}
                className="p-1.5 hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <span className="text-sm text-muted-foreground">Qty: {quantity}</span>
          )}
          <span className="font-bold">
            {currency}{(Number(price) * Number(quantity)).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};
