'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Mail, Check } from 'lucide-react';

export const NewsletterForm = ({ element, onAction }: ComponentRenderProps) => {
  const {
    placeholder = 'Enter your email',
    buttonText = 'Subscribe',
    successMessage = 'Thanks for subscribing!',
    layout = 'inline',
    showIcon = true,
    variant = 'default',
    privacyText,
    className,
    style
  } = element.props;

  const [email, setEmail] = React.useState('');
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    try {
      await onAction?.({ name: 'subscribe', payload: { email } } as never);
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  const variantStyles = {
    default: '',
    card: 'bg-background border rounded-xl p-6',
    filled: 'bg-muted rounded-xl p-6',
  };

  if (status === 'success') {
    return (
      <div
        className={cn(
          'flex items-center justify-center gap-2 py-4',
          variantStyles[variant as keyof typeof variantStyles] || variantStyles.default,
          className
        )}
        style={style as React.CSSProperties}
      >
        <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
          <Check className="h-5 w-5 text-green-600" />
        </div>
        <p className="text-foreground font-medium">{successMessage as string}</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        variantStyles[variant as keyof typeof variantStyles] || variantStyles.default,
        className
      )}
      style={style as React.CSSProperties}
    >
      <form
        onSubmit={handleSubmit}
        className={cn(
          layout === 'inline'
            ? 'flex flex-col sm:flex-row gap-3'
            : 'flex flex-col gap-4'
        )}
      >
        <div className="relative flex-grow">
          {showIcon && (
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          )}
          <Input
            type="email"
            placeholder={placeholder as string}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={cn(showIcon && 'pl-10')}
            disabled={status === 'loading'}
            required
          />
        </div>
        <Button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Subscribing...
            </>
          ) : (
            buttonText as string
          )}
        </Button>
      </form>
      {privacyText && (
        <p className="text-xs text-muted-foreground mt-3">{privacyText as string}</p>
      )}
    </div>
  );
};
