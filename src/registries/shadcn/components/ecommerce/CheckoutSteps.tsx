'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export const CheckoutSteps = ({ element, onAction }: ComponentRenderProps) => {
  const {
    steps,
    currentStep = 1,
    variant = 'default',
    clickable = false,
    style,
  } = element.props;

  const stepList = (steps as Array<{
    id: number;
    title: string;
    description?: string;
    icon?: React.ReactNode;
  }>) || [
    { id: 1, title: 'Cart', description: 'Review your items' },
    { id: 2, title: 'Shipping', description: 'Delivery address' },
    { id: 3, title: 'Payment', description: 'Payment method' },
    { id: 4, title: 'Review', description: 'Confirm order' },
  ];

  const handleStepClick = (stepId: number) => {
    if (clickable && stepId < Number(currentStep) && onAction) {
      onAction({ name: 'goToStep', payload: { step: stepId } } as never);
    }
  };

  if (variant === 'minimal') {
    return (
      <div className="flex items-center gap-2" style={style as React.CSSProperties}>
        {stepList.map((step, index) => (
          <React.Fragment key={step.id}>
            <button
              onClick={() => handleStepClick(step.id)}
              disabled={!clickable || step.id >= Number(currentStep)}
              className={cn(
                'text-sm font-medium transition-colors',
                Number(currentStep) === step.id
                  ? 'text-primary'
                  : Number(currentStep) > step.id
                  ? 'text-muted-foreground hover:text-foreground'
                  : 'text-muted-foreground/50',
                clickable && step.id < Number(currentStep) && 'cursor-pointer'
              )}
            >
              {step.title}
            </button>
            {index < stepList.length - 1 && (
              <span className="text-muted-foreground/50">/</span>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }

  if (variant === 'vertical') {
    return (
      <div className="space-y-4" style={style as React.CSSProperties}>
        {stepList.map((step, index) => (
          <div key={step.id} className="flex gap-4">
            <div className="flex flex-col items-center">
              <button
                onClick={() => handleStepClick(step.id)}
                disabled={!clickable || step.id >= Number(currentStep)}
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors',
                  Number(currentStep) > step.id
                    ? 'bg-primary border-primary text-primary-foreground'
                    : Number(currentStep) === step.id
                    ? 'border-primary text-primary'
                    : 'border-muted text-muted-foreground',
                  clickable && step.id < Number(currentStep) && 'cursor-pointer hover:bg-primary/90'
                )}
              >
                {Number(currentStep) > step.id ? (
                  <Check className="h-5 w-5" />
                ) : (
                  step.id
                )}
              </button>
              {index < stepList.length - 1 && (
                <div
                  className={cn(
                    'w-0.5 h-12 mt-2',
                    Number(currentStep) > step.id ? 'bg-primary' : 'bg-muted'
                  )}
                />
              )}
            </div>
            <div className="pt-2">
              <h4
                className={cn(
                  'font-medium',
                  Number(currentStep) >= step.id
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                )}
              >
                {step.title}
              </h4>
              {step.description && (
                <p className="text-sm text-muted-foreground">{step.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center" style={style as React.CSSProperties}>
      {stepList.map((step, index) => (
        <React.Fragment key={step.id}>
          <button
            onClick={() => handleStepClick(step.id)}
            disabled={!clickable || step.id >= Number(currentStep)}
            className={cn(
              'flex items-center gap-2',
              clickable && step.id < Number(currentStep) && 'cursor-pointer'
            )}
          >
            <div
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors',
                Number(currentStep) > step.id
                  ? 'bg-primary text-primary-foreground'
                  : Number(currentStep) === step.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              )}
            >
              {Number(currentStep) > step.id ? (
                <Check className="h-4 w-4" />
              ) : (
                step.id
              )}
            </div>
            <span
              className={cn(
                'text-sm font-medium hidden sm:inline',
                Number(currentStep) >= step.id
                  ? 'text-foreground'
                  : 'text-muted-foreground'
              )}
            >
              {step.title}
            </span>
          </button>
          {index < stepList.length - 1 && (
            <div
              className={cn(
                'flex-1 h-0.5 mx-4',
                Number(currentStep) > step.id ? 'bg-primary' : 'bg-muted'
              )}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
