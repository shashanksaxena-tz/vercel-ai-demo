'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export const ProgressSteps = ({ element }: ComponentRenderProps) => {
  const {
    steps,
    currentStep = 0,
    orientation = 'horizontal',
    variant = 'default',
    size = 'default',
    showLabels = true,
    style,
  } = element.props;

  const stepsArray = steps as Array<{
    title: string;
    description?: string;
    icon?: React.ReactNode;
  }>;

  if (!stepsArray?.length) {
    return null;
  }

  const current = currentStep as number;

  const sizeStyles = {
    sm: { circle: 'w-6 h-6 text-xs', connector: 'h-0.5', text: 'text-xs' },
    default: { circle: 'w-8 h-8 text-sm', connector: 'h-0.5', text: 'text-sm' },
    lg: { circle: 'w-10 h-10 text-base', connector: 'h-1', text: 'text-base' },
  };

  const sizes = sizeStyles[(size as keyof typeof sizeStyles) || 'default'];

  const getStepStatus = (index: number) => {
    if (index < current) return 'completed';
    if (index === current) return 'current';
    return 'upcoming';
  };

  const getStepStyles = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-primary text-primary-foreground border-primary';
      case 'current':
        return variant === 'outlined'
          ? 'bg-transparent text-primary border-primary border-2'
          : 'bg-primary text-primary-foreground border-primary';
      default:
        return 'bg-muted text-muted-foreground border-muted';
    }
  };

  const getConnectorStyles = (index: number) => {
    return index < current ? 'bg-primary' : 'bg-muted';
  };

  if (orientation === 'vertical') {
    return (
      <div className="flex flex-col" style={style as React.CSSProperties}>
        {stepsArray.map((step, idx) => {
          const status = getStepStatus(idx);
          const isLast = idx === stepsArray.length - 1;

          return (
            <div key={idx} className="flex">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'rounded-full flex items-center justify-center border transition-all',
                    sizes.circle,
                    getStepStyles(status)
                  )}
                >
                  {status === 'completed' ? (
                    <Check className="w-4 h-4" />
                  ) : step.icon ? (
                    step.icon
                  ) : (
                    idx + 1
                  )}
                </div>
                {!isLast && (
                  <div
                    className={cn('w-0.5 flex-1 min-h-[2rem] my-1', getConnectorStyles(idx))}
                  />
                )}
              </div>
              {showLabels && (
                <div className="ml-4 pb-8">
                  <p className={cn('font-medium', sizes.text)}>{step.title}</p>
                  {step.description && (
                    <p className="text-muted-foreground text-sm mt-0.5">{step.description}</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="w-full" style={style as React.CSSProperties}>
      <div className="flex items-center">
        {stepsArray.map((step, idx) => {
          const status = getStepStatus(idx);
          const isLast = idx === stepsArray.length - 1;

          return (
            <React.Fragment key={idx}>
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'rounded-full flex items-center justify-center border transition-all',
                    sizes.circle,
                    getStepStyles(status)
                  )}
                >
                  {status === 'completed' ? (
                    <Check className="w-4 h-4" />
                  ) : step.icon ? (
                    step.icon
                  ) : (
                    idx + 1
                  )}
                </div>
                {showLabels && (
                  <div className="mt-2 text-center max-w-[100px]">
                    <p className={cn('font-medium', sizes.text, status === 'upcoming' && 'text-muted-foreground')}>
                      {step.title}
                    </p>
                    {step.description && (
                      <p className="text-muted-foreground text-xs mt-0.5 hidden sm:block">
                        {step.description}
                      </p>
                    )}
                  </div>
                )}
              </div>
              {!isLast && (
                <div className={cn('flex-1 mx-2', sizes.connector, getConnectorStyles(idx))} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
