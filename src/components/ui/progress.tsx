'use client';

import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Linear Progress
const progressVariants = cva(
  'relative w-full overflow-hidden rounded-full bg-muted',
  {
    variants: {
      size: {
        xs: 'h-1',
        sm: 'h-2',
        md: 'h-3',
        lg: 'h-4',
        xl: 'h-5',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const indicatorVariants = cva(
  'h-full w-full flex-1 transition-all duration-300',
  {
    variants: {
      color: {
        default: 'bg-primary',
        primary: 'bg-primary',
        secondary: 'bg-secondary',
        accent: 'bg-accent',
        success: 'bg-green-600',
        warning: 'bg-yellow-500',
        error: 'bg-red-600',
        info: 'bg-blue-600',
        muted: 'bg-muted-foreground',
      },
    },
    defaultVariants: {
      color: 'primary',
    },
  }
);

interface ProgressProps
  extends Omit<React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>, 'color'>,
    VariantProps<typeof progressVariants>,
    VariantProps<typeof indicatorVariants> {
  value?: number;
  max?: number;
  showValue?: boolean;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value = 0, max = 100, size, color, showValue, ...props }, ref) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className="flex items-center gap-2 w-full">
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(progressVariants({ size, className }))}
        value={value}
        max={max}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn(indicatorVariants({ color }))}
          style={{ transform: `translateX(-${100 - percentage}%)` }}
        />
      </ProgressPrimitive.Root>
      {showValue && (
        <span className="text-sm text-muted-foreground min-w-[3ch] text-right">
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  );
});
Progress.displayName = 'Progress';

// Circular Progress
interface CircularProgressProps extends React.SVGAttributes<SVGElement> {
  value?: number;
  max?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'default' | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'info' | 'muted';
  showValue?: boolean;
  strokeWidth?: number;
}

const circleSizes = {
  xs: 24,
  sm: 32,
  md: 48,
  lg: 64,
  xl: 80,
};

const strokeWidths = {
  xs: 2,
  sm: 3,
  md: 4,
  lg: 5,
  xl: 6,
};

const colorClasses = {
  default: 'text-primary',
  primary: 'text-primary',
  secondary: 'text-secondary',
  accent: 'text-accent',
  success: 'text-green-600',
  warning: 'text-yellow-500',
  error: 'text-red-600',
  info: 'text-blue-600',
  muted: 'text-muted-foreground',
};

const CircularProgress = React.forwardRef<SVGSVGElement, CircularProgressProps>(
  ({
    className,
    value = 0,
    max = 100,
    size = 'md',
    color = 'primary',
    showValue,
    strokeWidth,
    ...props
  }, ref) => {
    const diameter = circleSizes[size];
    const stroke = strokeWidth || strokeWidths[size];
    const radius = (diameter - stroke) / 2;
    const circumference = radius * 2 * Math.PI;
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative inline-flex items-center justify-center">
        <svg
          ref={ref}
          className={cn('transform -rotate-90', colorClasses[color], className)}
          width={diameter}
          height={diameter}
          {...props}
        >
          <circle
            className="text-muted"
            strokeWidth={stroke}
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={diameter / 2}
            cy={diameter / 2}
          />
          <circle
            className="transition-all duration-300"
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={diameter / 2}
            cy={diameter / 2}
          />
        </svg>
        {showValue && (
          <span className="absolute text-xs font-medium">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    );
  }
);
CircularProgress.displayName = 'CircularProgress';

// Spinner
interface SpinnerProps extends React.SVGAttributes<SVGElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'default' | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'info' | 'muted';
  label?: string;
}

const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>(
  ({ className, size = 'md', color = 'primary', label, ...props }, ref) => {
    const diameter = circleSizes[size];

    return (
      <div className="inline-flex items-center gap-2">
        <svg
          ref={ref}
          className={cn('animate-spin', colorClasses[color], className)}
          width={diameter}
          height={diameter}
          viewBox="0 0 24 24"
          fill="none"
          {...props}
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        {label && <span className="text-sm text-muted-foreground">{label}</span>}
      </div>
    );
  }
);
Spinner.displayName = 'Spinner';

// Skeleton
interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  lines?: number;
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = 'text', width, height, lines = 1, ...props }, ref) => {
    const baseClass = 'animate-pulse bg-muted';
    const variantClasses = {
      text: 'h-4 rounded',
      circular: 'rounded-full',
      rectangular: '',
      rounded: 'rounded-md',
    };

    if (lines > 1) {
      return (
        <div ref={ref} className="space-y-2" {...props}>
          {Array.from({ length: lines }).map((_, i) => (
            <div
              key={i}
              className={cn(baseClass, variantClasses[variant], className)}
              style={{
                width: i === lines - 1 ? '60%' : width,
                height,
              }}
            />
          ))}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(baseClass, variantClasses[variant], className)}
        style={{ width, height }}
        {...props}
      />
    );
  }
);
Skeleton.displayName = 'Skeleton';

export { Progress, progressVariants, CircularProgress, Spinner, Skeleton };
