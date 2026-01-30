'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const cardVariants = cva(
  'rounded-lg transition-all',
  {
    variants: {
      variant: {
        elevated: 'bg-card text-card-foreground shadow-lg',
        outlined: 'border border-border bg-card text-card-foreground',
        filled: 'bg-muted text-card-foreground',
        ghost: 'bg-transparent',
      },
      padding: {
        none: 'p-0',
        xs: 'p-2',
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
        xl: 'p-8',
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        full: 'rounded-3xl',
      },
      hoverable: {
        true: 'hover:shadow-xl hover:scale-[1.02] cursor-pointer',
        false: '',
      },
      clickable: {
        true: 'cursor-pointer active:scale-[0.98]',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'elevated',
      padding: 'md',
      rounded: 'lg',
      hoverable: false,
      clickable: false,
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, rounded, hoverable, clickable, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, padding, rounded, hoverable, clickable, className }))}
      {...props}
    />
  )
);
Card.displayName = 'Card';

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  avatar?: string;
  action?: React.ReactNode;
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, title, subtitle, avatar, action, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-start gap-4 p-4 pb-0', className)}
      {...props}
    >
      {avatar && (
        <div className="flex-shrink-0">
          <img src={avatar} alt="" className="h-10 w-10 rounded-full" />
        </div>
      )}
      <div className="flex-1 space-y-1">
        {title && <h3 className="text-lg font-semibold leading-none tracking-tight">{title}</h3>}
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        {children}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  )
);
CardHeader.displayName = 'CardHeader';

interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const paddingMap = {
  none: 'p-0',
  xs: 'p-2',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8',
};

const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, padding = 'md', ...props }, ref) => (
    <div ref={ref} className={cn(paddingMap[padding], className)} {...props} />
  )
);
CardBody.displayName = 'CardBody';

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: 'start' | 'center' | 'end' | 'between';
}

const alignMap = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
};

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, align = 'end', ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center gap-2 p-4 pt-0', alignMap[align], className)}
      {...props}
    />
  )
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardBody, CardFooter, cardVariants };
