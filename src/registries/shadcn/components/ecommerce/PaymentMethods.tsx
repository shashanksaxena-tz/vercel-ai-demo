'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { CreditCard, Building2, Wallet, Smartphone, Plus, Trash2 } from 'lucide-react';

export const PaymentMethods = ({ element, onAction }: ComponentRenderProps) => {
  const {
    methods,
    selectedMethod,
    showAddNew = true,
    allowDelete = true,
    variant = 'cards',
    style,
  } = element.props;

  const methodList = methods as Array<{
    id: string;
    type: 'card' | 'bank' | 'wallet' | 'mobile';
    name: string;
    last4?: string;
    expiry?: string;
    brand?: string;
    isDefault?: boolean;
  }> | undefined;

  const handleSelect = (methodId: string) => {
    if (onAction) {
      onAction({ name: 'selectPaymentMethod', payload: { methodId } } as never);
    }
  };

  const handleDelete = (methodId: string) => {
    if (onAction) {
      onAction({ name: 'deletePaymentMethod', payload: { methodId } } as never);
    }
  };

  const handleAddNew = () => {
    if (onAction) {
      onAction({ name: 'addPaymentMethod' });
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'card':
        return CreditCard;
      case 'bank':
        return Building2;
      case 'wallet':
        return Wallet;
      case 'mobile':
        return Smartphone;
      default:
        return CreditCard;
    }
  };

  if (variant === 'list') {
    return (
      <div className="space-y-2" style={style as React.CSSProperties}>
        {methodList?.map((method) => {
          const Icon = getIcon(method.type);
          return (
            <div
              key={method.id}
              className={cn(
                'flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors',
                selectedMethod === method.id
                  ? 'border-primary bg-primary/5'
                  : 'hover:bg-muted/50'
              )}
              onClick={() => handleSelect(method.id)}
            >
              <input
                type="radio"
                name="paymentMethod"
                checked={selectedMethod === method.id}
                onChange={() => handleSelect(method.id)}
                className="text-primary"
              />
              <Icon className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium">
                  {method.brand || method.name}
                  {method.last4 && <span className="text-muted-foreground"> **** {method.last4}</span>}
                </p>
                {method.expiry && (
                  <p className="text-xs text-muted-foreground">Expires {method.expiry}</p>
                )}
              </div>
              {method.isDefault && (
                <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded">
                  Default
                </span>
              )}
              {allowDelete && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(method.id);
                  }}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          );
        })}
        {showAddNew && (
          <button
            onClick={handleAddNew}
            className="flex items-center gap-2 w-full p-3 border border-dashed rounded-lg text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span className="text-sm">Add new payment method</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" style={style as React.CSSProperties}>
      {methodList?.map((method) => {
        const Icon = getIcon(method.type);
        return (
          <div
            key={method.id}
            className={cn(
              'relative p-4 border rounded-lg cursor-pointer transition-all',
              selectedMethod === method.id
                ? 'border-primary ring-2 ring-primary/20'
                : 'hover:border-muted-foreground/50'
            )}
            onClick={() => handleSelect(method.id)}
          >
            {method.isDefault && (
              <span className="absolute -top-2 -right-2 text-xs px-2 py-0.5 bg-primary text-primary-foreground rounded">
                Default
              </span>
            )}
            <div className="flex items-start justify-between">
              <Icon className="h-8 w-8 text-muted-foreground" />
              {allowDelete && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(method.id);
                  }}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="mt-3">
              <p className="font-medium">
                {method.brand || method.name}
              </p>
              {method.last4 && (
                <p className="text-sm text-muted-foreground">**** **** **** {method.last4}</p>
              )}
              {method.expiry && (
                <p className="text-xs text-muted-foreground mt-1">Expires {method.expiry}</p>
              )}
            </div>
          </div>
        );
      })}
      {showAddNew && (
        <button
          onClick={handleAddNew}
          className="p-4 border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-foreground hover:border-primary transition-colors min-h-[120px]"
        >
          <Plus className="h-8 w-8" />
          <span className="text-sm font-medium">Add new method</span>
        </button>
      )}
    </div>
  );
};
