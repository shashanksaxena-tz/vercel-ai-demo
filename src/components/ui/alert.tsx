'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';

const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg+div]:translate-y-[-3px] [&:has(svg)]:pl-11',
  {
    variants: {
      variant: {
        solid: '',
        subtle: '',
        outline: 'bg-transparent',
        'left-accent': 'border-l-4 rounded-l-none',
      },
      status: {
        info: '',
        success: '',
        warning: '',
        error: '',
      },
    },
    compoundVariants: [
      // Solid variants
      { variant: 'solid', status: 'info', className: 'bg-blue-600 text-white border-blue-600' },
      { variant: 'solid', status: 'success', className: 'bg-green-600 text-white border-green-600' },
      { variant: 'solid', status: 'warning', className: 'bg-yellow-500 text-white border-yellow-500' },
      { variant: 'solid', status: 'error', className: 'bg-red-600 text-white border-red-600' },
      // Subtle variants
      { variant: 'subtle', status: 'info', className: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800' },
      { variant: 'subtle', status: 'success', className: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800' },
      { variant: 'subtle', status: 'warning', className: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800' },
      { variant: 'subtle', status: 'error', className: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800' },
      // Outline variants
      { variant: 'outline', status: 'info', className: 'border-blue-600 text-blue-600' },
      { variant: 'outline', status: 'success', className: 'border-green-600 text-green-600' },
      { variant: 'outline', status: 'warning', className: 'border-yellow-500 text-yellow-600' },
      { variant: 'outline', status: 'error', className: 'border-red-600 text-red-600' },
      // Left accent variants
      { variant: 'left-accent', status: 'info', className: 'border-l-blue-600 bg-blue-50 dark:bg-blue-900/20' },
      { variant: 'left-accent', status: 'success', className: 'border-l-green-600 bg-green-50 dark:bg-green-900/20' },
      { variant: 'left-accent', status: 'warning', className: 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' },
      { variant: 'left-accent', status: 'error', className: 'border-l-red-600 bg-red-50 dark:bg-red-900/20' },
    ],
    defaultVariants: {
      variant: 'subtle',
      status: 'info',
    },
  }
);

const statusIcons = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
};

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string;
  description?: string;
  closable?: boolean;
  onClose?: () => void;
  icon?: React.ReactNode;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({
    className,
    variant,
    status = 'info',
    title,
    description,
    closable,
    onClose,
    icon,
    children,
    ...props
  }, ref) => {
    const Icon = statusIcons[status!];

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant, status }), className)}
        {...props}
      >
        {icon || <Icon className="h-5 w-5" />}
        <div className="flex-1">
          {title && <h5 className="mb-1 font-medium leading-none tracking-tight">{title}</h5>}
          {(description || children) && (
            <div className="text-sm [&_p]:leading-relaxed">
              {description || children}
            </div>
          )}
        </div>
        {closable && (
          <button
            onClick={onClose}
            className="absolute right-2 top-2 rounded-md p-1 opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }
);
Alert.displayName = 'Alert';

// Empty State Component
interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, icon, title, description, actionLabel, onAction, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col items-center justify-center py-12 text-center', className)}
      {...props}
    >
      {icon && (
        <div className="mb-4 text-muted-foreground">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold">{title}</h3>
      {description && (
        <p className="mt-1 text-sm text-muted-foreground max-w-sm">{description}</p>
      )}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-4 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
);
EmptyState.displayName = 'EmptyState';

export { Alert, alertVariants, EmptyState };
