'use client';
// @ts-nocheck

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Package, ChevronRight, Search } from 'lucide-react';

export const OrderHistory = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    orders,
    showSearch = true,
    showFilters = false,
    emptyMessage = 'No orders found',
    currency = '$',
    style,
  } = element.props;

  const orderList = orders as Array<{
    id: string;
    orderNumber: string;
    date: string;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    total: number;
    itemCount: number;
    items?: Array<{
      name: string;
      image: string;
    }>;
  }> | undefined;

  const handleViewOrder = (orderNumber: string) => {
    if (onAction) {
      onAction({ name: 'viewOrder', payload: { orderNumber } } as never);
    }
  };

  const handleSearch = (query: string) => {
    if (onAction) {
      onAction({ name: 'searchOrders', payload: { query } } as never);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'shipped':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6" style={style as React.CSSProperties}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Order History</h2>
        {showSearch && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search orders..."
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-md bg-background text-sm w-64"
            />
          </div>
        )}
      </div>

      {!orderList || orderList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Package className="h-16 w-16 text-muted-foreground mb-4" />
          <p className="text-lg text-muted-foreground">{emptyMessage as string}</p>
          {children}
        </div>
      ) : (
        <div className="space-y-4">
          {orderList.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={() => handleViewOrder(order.orderNumber)}
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="flex -space-x-2">
                    {order.items?.slice(0, 3).map((item, i) => (
                      <div
                        key={i}
                        className="w-12 h-12 rounded-md overflow-hidden border-2 border-background bg-muted"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                    {order.itemCount > 3 && (
                      <div className="w-12 h-12 rounded-md border-2 border-background bg-muted flex items-center justify-center text-xs font-medium">
                        +{order.itemCount - 3}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium">Order #{order.orderNumber}</p>
                    <p className="text-sm text-muted-foreground">{order.date}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.itemCount} {order.itemCount === 1 ? 'item' : 'items'}
                    </p>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end gap-2">
                  <span
                    className={cn(
                      'px-2 py-1 rounded-full text-xs font-medium capitalize',
                      getStatusColor(order.status)
                    )}
                  >
                    {order.status}
                  </span>
                  <span className="font-semibold">
                    {currency}{order.total.toFixed(2)}
                  </span>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </div>
          ))}
          {children}
        </div>
      )}
    </div>
  );
};
