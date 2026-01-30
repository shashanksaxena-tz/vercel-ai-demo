'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

const badgeVariants = cva(
  'inline-flex items-center gap-1 font-medium transition-colors',
  {
    variants: {
      variant: {
        solid: '',
        subtle: '',
        outline: 'border bg-transparent',
      },
      color: {
        default: '',
        primary: '',
        secondary: '',
        accent: '',
        success: '',
        warning: '',
        error: '',
        info: '',
        muted: '',
      },
      size: {
        xs: 'px-1.5 py-0.5 text-[10px] rounded',
        sm: 'px-2 py-0.5 text-xs rounded',
        md: 'px-2.5 py-0.5 text-sm rounded-md',
        lg: 'px-3 py-1 text-sm rounded-md',
        xl: 'px-4 py-1.5 text-base rounded-lg',
      },
      rounded: {
        true: 'rounded-full',
        false: '',
      },
    },
    compoundVariants: [
      // Solid variants
      { variant: 'solid', color: 'default', className: 'bg-foreground text-background' },
      { variant: 'solid', color: 'primary', className: 'bg-primary text-primary-foreground' },
      { variant: 'solid', color: 'secondary', className: 'bg-secondary text-secondary-foreground' },
      { variant: 'solid', color: 'accent', className: 'bg-accent text-accent-foreground' },
      { variant: 'solid', color: 'success', className: 'bg-green-600 text-white' },
      { variant: 'solid', color: 'warning', className: 'bg-yellow-500 text-white' },
      { variant: 'solid', color: 'error', className: 'bg-red-600 text-white' },
      { variant: 'solid', color: 'info', className: 'bg-blue-600 text-white' },
      { variant: 'solid', color: 'muted', className: 'bg-muted text-muted-foreground' },
      // Subtle variants
      { variant: 'subtle', color: 'default', className: 'bg-foreground/10 text-foreground' },
      { variant: 'subtle', color: 'primary', className: 'bg-primary/10 text-primary' },
      { variant: 'subtle', color: 'secondary', className: 'bg-secondary/50 text-secondary-foreground' },
      { variant: 'subtle', color: 'accent', className: 'bg-accent/50 text-accent-foreground' },
      { variant: 'subtle', color: 'success', className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' },
      { variant: 'subtle', color: 'warning', className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' },
      { variant: 'subtle', color: 'error', className: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' },
      { variant: 'subtle', color: 'info', className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' },
      { variant: 'subtle', color: 'muted', className: 'bg-muted text-muted-foreground' },
      // Outline variants
      { variant: 'outline', color: 'default', className: 'border-foreground/20 text-foreground' },
      { variant: 'outline', color: 'primary', className: 'border-primary text-primary' },
      { variant: 'outline', color: 'secondary', className: 'border-secondary text-secondary-foreground' },
      { variant: 'outline', color: 'accent', className: 'border-accent text-accent-foreground' },
      { variant: 'outline', color: 'success', className: 'border-green-600 text-green-600' },
      { variant: 'outline', color: 'warning', className: 'border-yellow-500 text-yellow-600' },
      { variant: 'outline', color: 'error', className: 'border-red-600 text-red-600' },
      { variant: 'outline', color: 'info', className: 'border-blue-600 text-blue-600' },
      { variant: 'outline', color: 'muted', className: 'border-muted-foreground/30 text-muted-foreground' },
    ],
    defaultVariants: {
      variant: 'solid',
      color: 'default',
      size: 'md',
      rounded: false,
    },
  }
);

export interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'>,
    VariantProps<typeof badgeVariants> {
  text?: string;
  closable?: boolean;
  onClose?: () => void;
  icon?: React.ReactNode;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, color, size, rounded, text, closable, onClose, icon, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant, color, size, rounded, className }))}
      {...props}
    >
      {icon}
      {text || children}
      {closable && (
        <button
          type="button"
          onClick={onClose}
          className="ml-0.5 -mr-0.5 rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/10"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </span>
  )
);
Badge.displayName = 'Badge';

// Tag Component (alias for Badge with closable by default)
export interface TagProps extends BadgeProps {
  label?: string;
}

const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ label, ...props }, ref) => (
    <Badge ref={ref} text={label} rounded {...props} />
  )
);
Tag.displayName = 'Tag';

export { Badge, badgeVariants, Tag };
