'use client';
// @ts-nocheck

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Download, Printer } from 'lucide-react';

export const Invoice = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    invoiceNumber,
    invoiceDate,
    dueDate,
    orderNumber,
    company,
    customer,
    items,
    subtotal,
    tax,
    taxRate,
    shipping,
    discount,
    total,
    currency = '$',
    status = 'unpaid',
    notes,
    showActions = true,
    style,
  } = element.props;

  const companyInfo = company as {
    name: string;
    address?: string;
    email?: string;
    phone?: string;
    logo?: string;
  } | undefined;

  const customerInfo = customer as {
    name: string;
    address: string;
    email?: string;
  } | undefined;

  const lineItems = items as Array<{
    id: string;
    name: string;
    description?: string;
    quantity: number;
    price: number;
  }> | undefined;

  const handleDownload = () => {
    if (onAction) {
      onAction({ name: 'downloadInvoice', payload: { invoiceNumber } } as never);
    }
  };

  const handlePrint = () => {
    if (onAction) {
      onAction({ name: 'printInvoice', payload: { invoiceNumber } } as never);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'unpaid':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white dark:bg-card rounded-lg border p-8" style={style as React.CSSProperties}>
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          {companyInfo?.logo ? (
            <img src={companyInfo.logo} alt={companyInfo.name} className="h-12 mb-2" />
          ) : (
            <h1 className="text-2xl font-bold">{companyInfo?.name || 'Company'}</h1>
          )}
          {companyInfo?.address && (
            <p className="text-sm text-muted-foreground whitespace-pre-line">
              {companyInfo.address}
            </p>
          )}
          {companyInfo?.email && (
            <p className="text-sm text-muted-foreground">{companyInfo.email}</p>
          )}
          {companyInfo?.phone && (
            <p className="text-sm text-muted-foreground">{companyInfo.phone}</p>
          )}
        </div>
        <div className="text-right">
          <h2 className="text-3xl font-bold text-muted-foreground">INVOICE</h2>
          <p className="font-mono mt-2">#{invoiceNumber as string}</p>
          <span
            className={cn(
              'inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold uppercase',
              getStatusColor(status as string)
            )}
          >
            {status as string}
          </span>
        </div>
      </div>

      {/* Billing Info */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">BILL TO</h3>
          {customerInfo && (
            <>
              <p className="font-medium">{customerInfo.name}</p>
              <p className="text-sm text-muted-foreground whitespace-pre-line">
                {customerInfo.address}
              </p>
              {customerInfo.email && (
                <p className="text-sm text-muted-foreground">{customerInfo.email}</p>
              )}
            </>
          )}
        </div>
        <div className="text-right">
          <div className="space-y-1">
            <div className="flex justify-end gap-4">
              <span className="text-sm text-muted-foreground">Invoice Date:</span>
              <span className="text-sm font-medium">{invoiceDate as string}</span>
            </div>
            {dueDate && (
              <div className="flex justify-end gap-4">
                <span className="text-sm text-muted-foreground">Due Date:</span>
                <span className="text-sm font-medium">{dueDate as string}</span>
              </div>
            )}
            {orderNumber && (
              <div className="flex justify-end gap-4">
                <span className="text-sm text-muted-foreground">Order:</span>
                <span className="text-sm font-medium">#{orderNumber as string}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Items Table */}
      <table className="w-full mb-8">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 text-sm font-semibold text-muted-foreground">ITEM</th>
            <th className="text-right py-3 text-sm font-semibold text-muted-foreground">QTY</th>
            <th className="text-right py-3 text-sm font-semibold text-muted-foreground">PRICE</th>
            <th className="text-right py-3 text-sm font-semibold text-muted-foreground">AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          {lineItems?.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="py-3">
                <p className="font-medium">{item.name}</p>
                {item.description && (
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                )}
              </td>
              <td className="text-right py-3">{item.quantity}</td>
              <td className="text-right py-3">{currency}{item.price.toFixed(2)}</td>
              <td className="text-right py-3 font-medium">
                {currency}{(item.quantity * item.price).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div className="flex justify-end mb-8">
        <div className="w-64 space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{currency}{Number(subtotal || 0).toFixed(2)}</span>
          </div>
          {discount !== undefined && Number(discount) > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-{currency}{Number(discount).toFixed(2)}</span>
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
              <span className="text-muted-foreground">
                Tax {taxRate && `(${taxRate}%)`}
              </span>
              <span>{currency}{Number(tax).toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between font-bold text-lg pt-2 border-t">
            <span>Total</span>
            <span>{currency}{Number(total || 0).toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Notes */}
      {notes && (
        <div className="mb-8 p-4 bg-muted/50 rounded-lg">
          <h4 className="text-sm font-semibold mb-1">Notes</h4>
          <p className="text-sm text-muted-foreground">{notes as string}</p>
        </div>
      )}

      {/* Actions */}
      {showActions && (
        <div className="flex gap-4 justify-end print:hidden">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-muted transition-colors"
          >
            <Printer className="h-4 w-4" />
            Print
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </button>
        </div>
      )}

      {children}
    </div>
  );
};
