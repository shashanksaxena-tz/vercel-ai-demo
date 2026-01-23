'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Package, Truck, CheckCircle, MapPin, Clock, Box } from 'lucide-react';

export const OrderTracking = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    orderNumber,
    trackingNumber,
    carrier,
    status,
    events,
    estimatedDelivery,
    currentLocation,
    showMap = false,
    style,
  } = element.props;

  const trackingEvents = events as Array<{
    id: string;
    status: string;
    location: string;
    date: string;
    time: string;
    description?: string;
    isCurrent?: boolean;
  }> | undefined;

  const statusSteps = [
    { id: 'ordered', label: 'Order Placed', icon: Box },
    { id: 'processing', label: 'Processing', icon: Package },
    { id: 'shipped', label: 'Shipped', icon: Truck },
    { id: 'delivered', label: 'Delivered', icon: CheckCircle },
  ];

  const getCurrentStepIndex = () => {
    const statusMap: Record<string, number> = {
      pending: 0,
      processing: 1,
      shipped: 2,
      'out-for-delivery': 2,
      delivered: 3,
    };
    return statusMap[status as string] ?? 0;
  };

  const currentStepIndex = getCurrentStepIndex();

  const handleTrackCarrier = () => {
    if (onAction && trackingNumber) {
      onAction({ name: 'trackWithCarrier', payload: { trackingNumber, carrier } } as never);
    }
  };

  return (
    <div className="space-y-6" style={style as React.CSSProperties}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Track Your Order</h2>
          <p className="text-sm text-muted-foreground">
            Order #{orderNumber as string}
          </p>
        </div>
        {trackingNumber && (
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Tracking Number</p>
            <button
              onClick={handleTrackCarrier}
              className="font-mono text-primary hover:underline"
            >
              {trackingNumber as string}
            </button>
            {carrier && (
              <p className="text-sm text-muted-foreground">via {carrier as string}</p>
            )}
          </div>
        )}
      </div>

      {/* Status Progress */}
      <div className="relative">
        <div className="flex justify-between">
          {statusSteps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = index <= currentStepIndex;
            const isCurrent = index === currentStepIndex;
            return (
              <div key={step.id} className="flex flex-col items-center flex-1">
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center transition-colors',
                    isCompleted
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground',
                    isCurrent && 'ring-4 ring-primary/20'
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <span
                  className={cn(
                    'text-xs mt-2 text-center',
                    isCompleted ? 'text-foreground font-medium' : 'text-muted-foreground'
                  )}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted -z-10">
          <div
            className="h-full bg-primary transition-all"
            style={{ width: `${(currentStepIndex / (statusSteps.length - 1)) * 100}%` }}
          />
        </div>
      </div>

      {/* Estimated Delivery */}
      {estimatedDelivery && (
        <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
          <Clock className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm text-muted-foreground">Estimated Delivery</p>
            <p className="font-semibold">{estimatedDelivery as string}</p>
          </div>
        </div>
      )}

      {/* Current Location */}
      {currentLocation && (
        <div className="flex items-center gap-3 p-4 border rounded-lg">
          <MapPin className="h-5 w-5 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Current Location</p>
            <p className="font-medium">{currentLocation as string}</p>
          </div>
        </div>
      )}

      {/* Tracking Events */}
      {trackingEvents && trackingEvents.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold">Shipping Updates</h3>
          <div className="space-y-0">
            {trackingEvents.map((event, index) => (
              <div key={event.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      'w-3 h-3 rounded-full',
                      event.isCurrent || index === 0
                        ? 'bg-primary'
                        : 'bg-muted-foreground/30'
                    )}
                  />
                  {index < trackingEvents.length - 1 && (
                    <div className="w-0.5 h-12 bg-muted" />
                  )}
                </div>
                <div className="pb-6">
                  <p className="font-medium">{event.status}</p>
                  <p className="text-sm text-muted-foreground">{event.location}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {event.date} at {event.time}
                  </p>
                  {event.description && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {event.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {children}
    </div>
  );
};
