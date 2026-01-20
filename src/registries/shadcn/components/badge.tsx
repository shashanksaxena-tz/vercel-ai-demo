import React from 'react';
import { Badge as ShadcnBadge } from '@/components/ui/badge';
import { ComponentRenderProps } from '@json-render/react';

export const Badge = ({ element, children }: ComponentRenderProps) => {
  const { variant = 'default', label, children: propsChildren, style } = element.props;

  const variantMap: Record<string, any> = {
    default: 'default',
    primary: 'default',
    secondary: 'secondary',
    success: 'secondary',
    warning: 'outline',
    outline: 'outline',
    error: 'destructive',
    destructive: 'destructive'
  };

  const content = label || propsChildren || children;

  return (
    <ShadcnBadge
      variant={variantMap[variant as string] || 'default'}
      style={style as React.CSSProperties}
    >
      {content as React.ReactNode}
    </ShadcnBadge>
  );
};
