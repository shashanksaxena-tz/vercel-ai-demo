import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import * as LucideIcons from 'lucide-react';

export const Feature = ({ element, children }: ComponentRenderProps) => {
  const {
    icon,
    title,
    description,
    variant = 'default',
    align = 'left',
    style
  } = element.props;

  const variantStyles = {
    default: '',
    card: 'bg-background border rounded-xl p-6 hover:shadow-md transition-shadow',
    filled: 'bg-muted rounded-xl p-6',
    minimal: '',
  };

  const alignStyles = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  // Try to get the icon from Lucide
  const IconComponent = icon
    ? (LucideIcons as any)[icon as string] || (LucideIcons as any).Star
    : null;

  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        variantStyles[(variant as keyof typeof variantStyles) || 'default'],
        alignStyles[(align as keyof typeof alignStyles) || 'left']
      )}
      style={style as React.CSSProperties}
    >
      {IconComponent && (
        <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 text-primary">
          <IconComponent className="h-6 w-6" />
        </div>
      )}
      {title && <h3 className="text-xl font-semibold">{title as string}</h3>}
      {description && (
        <p className="text-muted-foreground">{description as string}</p>
      )}
      {children}
    </div>
  );
};
