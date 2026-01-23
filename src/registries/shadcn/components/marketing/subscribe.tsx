'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, ArrowRight, Check } from 'lucide-react';

export const Subscribe = ({ element, onAction }: ComponentRenderProps) => {
  const {
    title,
    description,
    placeholder = 'you@example.com',
    buttonText = 'Subscribe',
    successTitle = 'You are subscribed!',
    successDescription = 'Check your inbox for confirmation.',
    variant = 'default',
    size = 'md',
    className,
    style
  } = element.props;

  const [email, setEmail] = React.useState('');
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const sizeStyles = {
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16',
  };

  const variantStyles = {
    default: 'bg-muted rounded-2xl',
    card: 'bg-background border rounded-2xl shadow-lg',
    minimal: '',
    gradient: 'bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl',
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    try {
      await onAction?.({ name: 'subscribe', payload: { email } } as never);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div
        className={cn(
          'text-center px-6',
          sizeStyles[size as keyof typeof sizeStyles] || sizeStyles.md,
          variantStyles[variant as keyof typeof variantStyles] || variantStyles.default,
          className
        )}
        style={style as React.CSSProperties}
      >
        <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">{successTitle as string}</h3>
        <p className="text-muted-foreground">{successDescription as string}</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'text-center px-6',
        sizeStyles[size as keyof typeof sizeStyles] || sizeStyles.md,
        variantStyles[variant as keyof typeof variantStyles] || variantStyles.default,
        className
      )}
      style={style as React.CSSProperties}
    >
      {title && (
        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
          {title as string}
        </h3>
      )}
      {description && (
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          {description as string}
        </p>
      )}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      >
        <Input
          type="email"
          placeholder={placeholder as string}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-grow"
          disabled={status === 'loading'}
          required
        />
        <Button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              {buttonText as string}
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
};
