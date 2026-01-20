import React from 'react';
import { Badge as ShadcnBadge } from '@/components/ui/badge';

type BadgeProps = {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  children: React.ReactNode;
  style?: React.CSSProperties;
};

export const Badge = ({ variant, children, style }: BadgeProps) => {
  return (
    <ShadcnBadge variant={variant} style={style}>
      {children}
    </ShadcnBadge>
  );
};
