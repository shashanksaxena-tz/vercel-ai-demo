'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Stepper = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    steps,
    currentStep = 0,
    variant = 'default',
    orientation = 'horizontal',
    clickable = false,
    showLabels = true,
    showDescription = true,
    style
  } = element.props;

  const stepItems = steps as Array<{
    label: string;
    description?: string;
    icon?: React.ReactNode;
    completed?: boolean;
    error?: boolean;
  }>;
  const current = currentStep as number;

  const handleStepClick = (index: number) => {
    if (clickable) {
      onAction?.({ name: 'stepChange', payload: { step: index } } as never);
    }
  };

  const getStepStatus = (index: number) => {
    if (stepItems[index]?.error) return 'error';
    if (stepItems[index]?.completed || index < current) return 'completed';
    if (index === current) return 'current';
    return 'pending';
  };

  const variants = {
    default: {
      completed: 'bg-primary text-primary-foreground',
      current: 'border-2 border-primary text-primary bg-background',
      pending: 'border-2 border-muted text-muted-foreground bg-background',
      error: 'bg-destructive text-destructive-foreground',
    },
    simple: {
      completed: 'bg-primary text-primary-foreground',
      current: 'bg-primary/20 text-primary border-2 border-primary',
      pending: 'bg-muted text-muted-foreground',
      error: 'bg-destructive text-destructive-foreground',
    },
  };

  const variantStyles = variants[variant as keyof typeof variants] || variants.default;

  return (
    <div
      className={cn(
        'flex gap-4',
        orientation === 'vertical' ? 'flex-col' : 'flex-row items-center'
      )}
      style={style as React.CSSProperties}
      role="navigation"
      aria-label="Progress"
    >
      {stepItems?.map((step, index) => {
        const status = getStepStatus(index);
        return (
          <React.Fragment key={index}>
            <div
              className={cn(
                'flex gap-3',
                orientation === 'vertical' ? 'flex-row' : 'flex-col items-center',
                clickable && 'cursor-pointer'
              )}
              onClick={() => handleStepClick(index)}
            >
              <div
                className={cn(
                  'flex items-center justify-center w-10 h-10 rounded-full shrink-0 transition-colors',
                  variantStyles[status]
                )}
              >
                {status === 'completed' ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : status === 'error' ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : step.icon ? (
                  step.icon
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              {(showLabels || showDescription) && (
                <div className={cn(orientation === 'horizontal' && 'text-center')}>
                  {showLabels && (
                    <div
                      className={cn(
                        'text-sm font-medium',
                        status === 'current' ? 'text-foreground' : 'text-muted-foreground'
                      )}
                    >
                      {step.label}
                    </div>
                  )}
                  {showDescription && step.description && (
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {step.description}
                    </div>
                  )}
                </div>
              )}
            </div>
            {index < stepItems.length - 1 && (
              <div
                className={cn(
                  'transition-colors',
                  orientation === 'vertical'
                    ? 'w-px h-8 ml-5 bg-border'
                    : 'flex-1 h-px bg-border',
                  index < current && 'bg-primary'
                )}
              />
            )}
          </React.Fragment>
        );
      })}
      {children}
    </div>
  );
};
