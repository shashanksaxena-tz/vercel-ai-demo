'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

// List Container
interface ListProps extends React.HTMLAttributes<HTMLUListElement | HTMLOListElement> {
  variant?: 'unordered' | 'ordered' | 'none';
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const spacingClasses = {
  xs: 'space-y-0.5',
  sm: 'space-y-1',
  md: 'space-y-2',
  lg: 'space-y-3',
  xl: 'space-y-4',
};

const List = React.forwardRef<HTMLElement, ListProps>(
  ({ className, variant = 'unordered', spacing = 'sm', children, ...props }, ref) => {
    const listStyle = variant === 'ordered' ? 'list-decimal' : variant === 'unordered' ? 'list-disc' : 'list-none';
    const commonProps = {
      className: cn(
        listStyle,
        variant !== 'none' && 'pl-5',
        spacingClasses[spacing],
        className
      ),
      ...props,
    };

    if (variant === 'ordered') {
      return (
        <ol ref={ref as React.Ref<HTMLOListElement>} {...commonProps}>
          {children}
        </ol>
      );
    }

    return (
      <ul ref={ref as React.Ref<HTMLUListElement>} {...commonProps}>
        {children}
      </ul>
    );
  }
);
List.displayName = 'List';

// List Item
interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  icon?: React.ReactNode;
}

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ className, icon, children, ...props }, ref) => {
    if (icon) {
      return (
        <li
          ref={ref}
          className={cn('flex items-start gap-2 list-none', className)}
          {...props}
        >
          <span className="flex-shrink-0 mt-0.5 text-muted-foreground">{icon}</span>
          <span>{children}</span>
        </li>
      );
    }

    return (
      <li ref={ref} className={cn(className)} {...props}>
        {children}
      </li>
    );
  }
);
ListItem.displayName = 'ListItem';

// Timeline Components
interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'vertical' | 'horizontal';
}

const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ className, orientation = 'vertical', children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'relative',
        orientation === 'horizontal' ? 'flex items-start' : 'space-y-4',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
Timeline.displayName = 'Timeline';

interface TimelineItemProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  time?: string;
  icon?: React.ReactNode;
  status?: 'completed' | 'current' | 'upcoming';
}

const statusStyles = {
  completed: 'bg-green-600 text-white',
  current: 'bg-primary text-primary-foreground ring-4 ring-primary/20',
  upcoming: 'bg-muted text-muted-foreground',
};

const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(
  ({
    className,
    title,
    description,
    time,
    icon,
    status = 'upcoming',
    ...props
  }, ref) => (
    <div ref={ref} className={cn('relative flex gap-4', className)} {...props}>
      {/* Connector line */}
      <div className="absolute left-4 top-8 -bottom-4 w-0.5 bg-border last:hidden" />

      {/* Icon/Status indicator */}
      <div
        className={cn(
          'relative z-10 flex h-8 w-8 items-center justify-center rounded-full',
          statusStyles[status]
        )}
      >
        {icon || (
          <span className="h-2 w-2 rounded-full bg-current" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">{title}</h4>
          {time && (
            <span className="text-xs text-muted-foreground">{time}</span>
          )}
        </div>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  )
);
TimelineItem.displayName = 'TimelineItem';

// Stepper Components
interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  currentStep?: number;
  orientation?: 'horizontal' | 'vertical';
}

interface StepperContextValue {
  currentStep: number;
  orientation: 'horizontal' | 'vertical';
}

const StepperContext = React.createContext<StepperContextValue | null>(null);

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  ({ className, currentStep = 0, orientation = 'horizontal', children, ...props }, ref) => {
    const steps = React.Children.toArray(children);

    return (
      <StepperContext.Provider value={{ currentStep, orientation }}>
        <div
          ref={ref}
          className={cn(
            'flex',
            orientation === 'horizontal' ? 'items-center' : 'flex-col',
            className
          )}
          {...props}
        >
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              {React.isValidElement(step) &&
                React.cloneElement(step as React.ReactElement<{ stepIndex: number }>, {
                  stepIndex: index,
                })}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'bg-border',
                    orientation === 'horizontal' ? 'h-0.5 flex-1 mx-2' : 'w-0.5 h-8 ml-4 my-1'
                  )}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </StepperContext.Provider>
    );
  }
);
Stepper.displayName = 'Stepper';

interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  stepIndex?: number;
}

const Step = React.forwardRef<HTMLDivElement, StepProps>(
  ({ className, title, description, icon, stepIndex = 0, ...props }, ref) => {
    const context = React.useContext(StepperContext);
    const { currentStep = 0 } = context || {};
    const isCompleted = stepIndex < currentStep;
    const isCurrent = stepIndex === currentStep;

    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-3', className)}
        {...props}
      >
        <div
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors',
            isCompleted && 'bg-primary text-primary-foreground',
            isCurrent && 'bg-primary text-primary-foreground ring-4 ring-primary/20',
            !isCompleted && !isCurrent && 'bg-muted text-muted-foreground'
          )}
        >
          {isCompleted ? (
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : icon ? (
            icon
          ) : (
            stepIndex + 1
          )}
        </div>
        <div>
          <p className={cn('text-sm font-medium', isCurrent ? 'text-foreground' : 'text-muted-foreground')}>
            {title}
          </p>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
    );
  }
);
Step.displayName = 'Step';

export {
  List,
  ListItem,
  Timeline,
  TimelineItem,
  Stepper,
  Step,
};
