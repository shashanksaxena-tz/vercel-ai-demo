import React from 'react';
import { Alert as ShadcnAlert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ComponentRenderProps } from '@json-render/react';
import * as LucideIcons from 'lucide-react';

export const Alert = ({ element }: ComponentRenderProps) => {
  const { title, description, variant = 'default', icon, style } = element.props;

  const getIcon = (str: string) => {
      if (!str) return null;
      const normalizeName = (s: string) => s.split(/[-_]/).map(p => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()).join('');
      const pascal = normalizeName(str);
      // @ts-expect-error - Dynamic access
      if (LucideIcons[pascal]) return LucideIcons[pascal];
      return LucideIcons.Info; // Default
  };

  const IconComponent = icon ? getIcon(icon as string) : null;

  return (
    <ShadcnAlert
      variant={variant as 'default' | 'destructive'}
      style={style as React.CSSProperties}
    >
      {IconComponent && React.createElement(IconComponent, { className: "h-4 w-4" })}
      {!!title && <AlertTitle>{title as React.ReactNode}</AlertTitle>}
      {!!description && <AlertDescription>{description as React.ReactNode}</AlertDescription>}
    </ShadcnAlert>
  );
};
