'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';

const inputVariants = cva(
  'flex w-full rounded-md border bg-transparent px-3 py-2 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        xs: 'h-7 px-2 text-xs',
        sm: 'h-8 px-2.5 text-sm',
        md: 'h-9 px-3',
        lg: 'h-10 px-4',
        xl: 'h-12 px-4 text-base',
      },
      variant: {
        outline: 'border-input bg-background',
        filled: 'border-transparent bg-muted',
        flushed: 'rounded-none border-0 border-b px-0 focus-visible:ring-0',
        unstyled: 'border-0 px-0 focus-visible:ring-0',
      },
      error: {
        true: 'border-red-500 focus-visible:ring-red-500',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'outline',
      error: false,
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    Omit<VariantProps<typeof inputVariants>, 'error'> {
  label?: string;
  hint?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  valuePath?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    className,
    type = 'text',
    size,
    variant,
    label,
    hint,
    error,
    leftIcon,
    rightIcon,
    disabled,
    ...props
  }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
            {props.required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground">
              {leftIcon}
            </div>
          )}
          <input
            type={inputType}
            className={cn(
              inputVariants({ size, variant, error: !!error, className }),
              leftIcon && 'pl-9',
              (rightIcon || isPassword) && 'pr-9'
            )}
            ref={ref}
            disabled={disabled}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          )}
          {!isPassword && rightIcon && (
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground">
              {rightIcon}
            </div>
          )}
        </div>
        {(hint || error) && (
          <p className={cn('text-xs', error ? 'text-red-500 flex items-center gap-1' : 'text-muted-foreground')}>
            {error && <AlertCircle className="h-3 w-3" />}
            {error || hint}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

// TextArea Component
export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  valuePath?: string;
}

const resizeClasses = {
  none: 'resize-none',
  vertical: 'resize-y',
  horizontal: 'resize-x',
  both: 'resize',
};

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({
    className,
    label,
    hint,
    error,
    resize = 'vertical',
    rows = 4,
    ...props
  }, ref) => (
    <div className="w-full space-y-1.5">
      {label && (
        <label className="text-sm font-medium leading-none">
          {label}
          {props.required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          resizeClasses[resize],
          error && 'border-red-500 focus-visible:ring-red-500',
          className
        )}
        ref={ref}
        rows={rows}
        {...props}
      />
      {(hint || error) && (
        <p className={cn('text-xs', error ? 'text-red-500 flex items-center gap-1' : 'text-muted-foreground')}>
          {error && <AlertCircle className="h-3 w-3" />}
          {error || hint}
        </p>
      )}
    </div>
  )
);
TextArea.displayName = 'TextArea';

export { Input, inputVariants, TextArea };
