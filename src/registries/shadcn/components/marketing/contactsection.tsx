'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export const ContactSection = ({ element, children }: ComponentRenderProps) => {
  const {
    title,
    subtitle,
    description,
    email,
    phone,
    address,
    hours,
    layout = 'side-by-side',
    className,
    style
  } = element.props;

  const contactInfo = [
    email && { icon: Mail, label: 'Email', value: email },
    phone && { icon: Phone, label: 'Phone', value: phone },
    address && { icon: MapPin, label: 'Address', value: address },
    hours && { icon: Clock, label: 'Hours', value: hours },
  ].filter(Boolean);

  return (
    <section
      className={cn('w-full py-16 md:py-24', className)}
      style={style as React.CSSProperties}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            'grid gap-12',
            layout === 'side-by-side' && 'lg:grid-cols-2',
            layout === 'stacked' && 'max-w-3xl mx-auto'
          )}
        >
          {/* Info Section */}
          <div>
            {subtitle && (
              <span className="text-sm md:text-base font-medium text-primary uppercase tracking-wider">
                {subtitle as string}
              </span>
            )}
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-2 text-foreground">
                {title as string}
              </h2>
            )}
            {description && (
              <p className="text-lg text-muted-foreground mt-4">
                {description as string}
              </p>
            )}

            {contactInfo.length > 0 && (
              <div className="mt-8 space-y-6">
                {contactInfo.map((info, idx) => {
                  if (!info) return null;
                  const Icon = info.icon;
                  return (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{info.label}</p>
                        <p className="text-muted-foreground">{info.value as string}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Form Section */}
          {children && (
            <div>{children}</div>
          )}
        </div>
      </div>
    </section>
  );
};
