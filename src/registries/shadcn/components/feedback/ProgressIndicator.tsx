'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface Step {
  label: string;
  description?: string;
  completed?: boolean;
  active?: boolean;
  error?: boolean;
}

export const ProgressIndicator = ({ element }: ComponentRenderProps) => {
  const {
    steps = [],
    currentStep = 0,
    variant = 'horizontal',
    size = 'default',
    showLabels = true,
    showDescriptions = false,
    className,
    style
  } = element.props;

  const stepList = steps as Step[];
  const current = currentStep as number;

  const sizeStyles = {
    sm: {
      circle: 'h-6 w-6 text-xs',
      line: 'h-0.5',
      label: 'text-xs',
      description: 'text-xs',
    },
    default: {
      circle: 'h-8 w-8 text-sm',
      line: 'h-0.5',
      label: 'text-sm',
      description: 'text-xs',
    },
    lg: {
      circle: 'h-10 w-10 text-base',
      line: 'h-1',
      label: 'text-base',
      description: 'text-sm',
    },
  };

  const sizes = sizeStyles[(size as keyof typeof sizeStyles) || 'default'];

  const getStepState = (index: number) => {
    const step = stepList[index];
    if (step?.error) return 'error';
    if (step?.completed || index < current) return 'completed';
    if (step?.active || index === current) return 'active';
    return 'pending';
  };

  const renderStep = (step: Step, index: number) => {
    const state = getStepState(index);

    const circleStyles = {
      completed: 'bg-primary text-primary-foreground border-primary',
      active: 'bg-background text-primary border-primary',
      pending: 'bg-background text-muted-foreground border-muted-foreground',
      error: 'bg-destructive text-destructive-foreground border-destructive',
    };

    return (
      <div
        key={index}
        className={cn(
          'flex items-center',
          variant === 'horizontal' ? 'flex-col' : 'flex-row gap-4'
        )}
      >
        <div
          className={cn(
            'relative flex items-center justify-center rounded-full border-2 font-medium transition-colors',
            sizes.circle,
            circleStyles[state]
          )}
        >
          {state === 'completed' ? (
            <Check className="h-4 w-4" />
          ) : (
            index + 1
          )}
        </div>
        {showLabels ? (
          <div
            className={cn(
              'flex flex-col',
              variant === 'horizontal' ? 'items-center mt-2' : 'items-start'
            )}
          >
            <span
              className={cn(
                sizes.label,
                state === 'active' ? 'font-medium' : '',
                state === 'error' ? 'text-destructive' : '',
                state === 'pending' ? 'text-muted-foreground' : ''
              )}
            >
              {step.label}
            </span>
            {showDescriptions && step.description ? (
              <span className={cn(sizes.description, 'text-muted-foreground mt-0.5')}>
                {step.description}
              </span>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  };

  const renderConnector = (index: number) => {
    const state = getStepState(index);
    const isCompleted = state === 'completed';

    if (variant === 'horizontal') {
      return (
        <div
          key={`connector-${index}`}
          className={cn(
            'flex-1 min-w-[2rem] mx-2',
            sizes.line,
            isCompleted ? 'bg-primary' : 'bg-muted'
          )}
        />
      );
    }

    return (
      <div
        key={`connector-${index}`}
        className={cn(
          'w-0.5 h-8 ml-4',
          isCompleted ? 'bg-primary' : 'bg-muted'
        )}
      />
    );
  };

  return (
    <div
      className={cn(
        variant === 'horizontal'
          ? 'flex items-start justify-between w-full'
          : 'flex flex-col',
        className as string
      )}
      style={style as React.CSSProperties}
      role="progressbar"
      aria-valuenow={current + 1}
      aria-valuemin={1}
      aria-valuemax={stepList.length}
    >
      {stepList.map((step, index) => (
        <React.Fragment key={index}>
          {renderStep(step, index)}
          {index < stepList.length - 1 && renderConnector(index)}
        </React.Fragment>
      ))}
    </div>
  );
};
