'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Counter = ({ element }: ComponentRenderProps) => {
  const {
    value,
    label,
    prefix = '',
    suffix = '',
    animate = true,
    duration = 2000,
    variant = 'default',
    size = 'md',
    className,
    style
  } = element.props;

  const [displayValue, setDisplayValue] = React.useState(animate ? 0 : (value as number));
  const [hasAnimated, setHasAnimated] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!animate || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            const startTime = Date.now();
            const endValue = value as number;
            const animationDuration = duration as number;

            const updateValue = () => {
              const elapsed = Date.now() - startTime;
              const progress = Math.min(elapsed / animationDuration, 1);
              // Easing function
              const easeOutQuart = 1 - Math.pow(1 - progress, 4);
              const currentValue = Math.round(easeOutQuart * endValue);
              setDisplayValue(currentValue);

              if (progress < 1) {
                requestAnimationFrame(updateValue);
              }
            };

            requestAnimationFrame(updateValue);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [animate, value, duration, hasAnimated]);

  const variantStyles = {
    default: '',
    card: 'bg-background border rounded-xl p-6 text-center',
    filled: 'bg-muted rounded-xl p-6 text-center',
    minimal: 'text-center',
  };

  const sizeStyles = {
    sm: {
      value: 'text-2xl md:text-3xl',
      label: 'text-xs',
    },
    md: {
      value: 'text-3xl md:text-4xl',
      label: 'text-sm',
    },
    lg: {
      value: 'text-4xl md:text-5xl',
      label: 'text-base',
    },
    xl: {
      value: 'text-5xl md:text-6xl',
      label: 'text-lg',
    },
  };

  const sizes = sizeStyles[size as keyof typeof sizeStyles] || sizeStyles.md;

  return (
    <div
      ref={ref}
      className={cn(
        variantStyles[variant as keyof typeof variantStyles] || variantStyles.default,
        className
      )}
      style={style as React.CSSProperties}
    >
      <p className={cn('font-bold text-foreground', sizes.value)}>
        {prefix as string}
        {displayValue.toLocaleString()}
        {suffix as string}
      </p>
      {label && (
        <p className={cn('text-muted-foreground mt-1', sizes.label)}>
          {label as string}
        </p>
      )}
    </div>
  );
};
