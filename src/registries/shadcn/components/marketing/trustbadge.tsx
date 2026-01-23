'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Shield, ShieldCheck, Award, CheckCircle, Star, Lock } from 'lucide-react';

export const TrustBadge = ({ element }: ComponentRenderProps) => {
  const {
    text,
    icon = 'shield',
    variant = 'default',
    size = 'md',
    className,
    style
  } = element.props;

  const icons: Record<string, React.ComponentType<{ className?: string }>> = {
    shield: Shield,
    shieldCheck: ShieldCheck,
    award: Award,
    checkCircle: CheckCircle,
    star: Star,
    lock: Lock,
  };

  const IconComponent = icons[icon as string] || Shield;

  const variantStyles = {
    default: 'bg-muted text-foreground',
    success: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    primary: 'bg-primary/10 text-primary',
    outlined: 'border-2 text-foreground',
    subtle: 'text-muted-foreground',
  };

  const sizeStyles = {
    sm: 'px-2.5 py-1 text-xs gap-1.5',
    md: 'px-3 py-1.5 text-sm gap-2',
    lg: 'px-4 py-2 text-base gap-2.5',
  };

  const iconSizeStyles = {
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        variantStyles[variant as keyof typeof variantStyles] || variantStyles.default,
        sizeStyles[size as keyof typeof sizeStyles] || sizeStyles.md,
        className
      )}
      style={style as React.CSSProperties}
    >
      <IconComponent
        className={iconSizeStyles[size as keyof typeof iconSizeStyles] || iconSizeStyles.md}
      />
      {text && <span>{text as string}</span>}
    </div>
  );
};
