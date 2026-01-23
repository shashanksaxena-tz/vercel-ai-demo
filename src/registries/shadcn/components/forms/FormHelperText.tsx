'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Info, AlertCircle, CheckCircle } from 'lucide-react';

export const FormHelperText = ({ element }: ComponentRenderProps) => {
  const {
    text,
    variant = 'default', // 'default' | 'info' | 'success' | 'error'
    showIcon = false,
    style
  } = element.props;

  if (!text) return null;

  const variantStyles = {
    default: 'text-muted-foreground',
    info: 'text-blue-500',
    success: 'text-green-500',
    error: 'text-destructive',
  };

  const icons = {
    default: null,
    info: Info,
    success: CheckCircle,
    error: AlertCircle,
  };

  const IconComponent = icons[(variant as keyof typeof icons) || 'default'];

  return (
    <div
      className={cn(
        'flex items-start gap-1.5 text-sm',
        variantStyles[(variant as keyof typeof variantStyles) || 'default']
      )}
      style={style as React.CSSProperties}
    >
      {showIcon && IconComponent && (
        <IconComponent className="h-4 w-4 flex-shrink-0 mt-0.5" />
      )}
      <span>{text as string}</span>
    </div>
  );
};
