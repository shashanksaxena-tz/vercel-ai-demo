'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const BillingSettings = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    plan,
    billingCycle,
    nextBillingDate,
    paymentMethod,
    style
  } = element.props;

  return (
    <div
      className={cn('space-y-4')}
      style={style as React.CSSProperties}
    >
      {plan && (
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <h4 className="font-medium">Current Plan</h4>
            <p className="text-lg font-bold text-primary">{plan as string}</p>
            {billingCycle && <p className="text-sm text-muted-foreground">Billed {billingCycle}</p>}
          </div>
          <button
            onClick={() => onAction?.({ name: 'changePlan' })}
            className="px-3 py-1 text-sm border rounded hover:bg-muted"
          >
            Change Plan
          </button>
        </div>
      )}

      {nextBillingDate && (
        <div className="p-4 border rounded-lg">
          <p className="text-sm text-muted-foreground">Next Billing Date</p>
          <p className="font-medium">{nextBillingDate as string}</p>
        </div>
      )}

      {paymentMethod && (
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-6 bg-muted rounded flex items-center justify-center text-xs">
              {(paymentMethod as { type: string; last4: string }).type}
            </div>
            <div>
              <p className="font-medium">•••• {(paymentMethod as { last4: string }).last4}</p>
            </div>
          </div>
          <button
            onClick={() => onAction?.({ name: 'updatePayment' })}
            className="px-3 py-1 text-sm border rounded hover:bg-muted"
          >
            Update
          </button>
        </div>
      )}

      <button
        onClick={() => onAction?.({ name: 'viewInvoices' })}
        className="text-sm text-primary hover:underline"
      >
        View billing history
      </button>

      {children}
    </div>
  );
};
