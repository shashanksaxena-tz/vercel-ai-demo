'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, Send, Check } from 'lucide-react';

export const ContactForm = ({ element, onAction }: ComponentRenderProps) => {
  const {
    title,
    description,
    fields = ['name', 'email', 'message'],
    buttonText = 'Send Message',
    successMessage = 'Your message has been sent!',
    variant = 'default',
    className,
    style
  } = element.props;

  const [formData, setFormData] = React.useState<Record<string, string>>({});
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const fieldsArray = fields as string[];

  const variantStyles = {
    default: '',
    card: 'bg-background border rounded-xl p-6 md:p-8',
    filled: 'bg-muted rounded-xl p-6 md:p-8',
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      await onAction?.({ name: 'submit', payload: formData } as never);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const renderField = (field: string) => {
    const fieldLabels: Record<string, string> = {
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      company: 'Company',
      subject: 'Subject',
      message: 'Message',
    };

    const fieldTypes: Record<string, string> = {
      email: 'email',
      phone: 'tel',
    };

    const label = fieldLabels[field] || field.charAt(0).toUpperCase() + field.slice(1);
    const type = fieldTypes[field] || 'text';
    const isTextarea = field === 'message';

    return (
      <div key={field} className={cn(isTextarea && 'md:col-span-2')}>
        <Label htmlFor={field} className="text-sm font-medium">
          {label}
        </Label>
        {isTextarea ? (
          <Textarea
            id={field}
            value={formData[field] || ''}
            onChange={(e) => handleChange(field, e.target.value)}
            placeholder={`Enter your ${label.toLowerCase()}`}
            className="mt-1.5 min-h-[120px]"
            disabled={status === 'loading'}
            required
          />
        ) : (
          <Input
            id={field}
            type={type}
            value={formData[field] || ''}
            onChange={(e) => handleChange(field, e.target.value)}
            placeholder={`Enter your ${label.toLowerCase()}`}
            className="mt-1.5"
            disabled={status === 'loading'}
            required={field === 'email'}
          />
        )}
      </div>
    );
  };

  if (status === 'success') {
    return (
      <div
        className={cn(
          'text-center py-12',
          variantStyles[variant as keyof typeof variantStyles] || variantStyles.default,
          className
        )}
        style={style as React.CSSProperties}
      >
        <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">Message Sent!</h3>
        <p className="text-muted-foreground">{successMessage as string}</p>
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
      {(title || description) && (
        <div className="mb-6">
          {title && <h3 className="text-xl font-bold text-foreground">{title as string}</h3>}
          {description && (
            <p className="text-muted-foreground mt-2">{description as string}</p>
          )}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {fieldsArray.map(renderField)}
        </div>
        <Button type="submit" className="w-full md:w-auto" disabled={status === 'loading'}>
          {status === 'loading' ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              {buttonText as string}
            </>
          )}
        </Button>
      </form>
    </div>
  );
};
