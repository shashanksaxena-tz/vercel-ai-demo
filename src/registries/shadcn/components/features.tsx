import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import * as LucideIcons from 'lucide-react';

export const Features = ({ element }: ComponentRenderProps) => {
  const {
    items,
    columns = 3,
    variant = 'default',
    align = 'left',
    style
  } = element.props;

  const itemsArray = items as Array<{
    icon?: string;
    title: string;
    description?: string;
  }>;

  const variantStyles = {
    default: '',
    card: 'bg-background border rounded-xl p-6 hover:shadow-md transition-shadow',
    filled: 'bg-muted rounded-xl p-6',
  };

  const alignStyles = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  return (
    <div
      className={cn('grid gap-8')}
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        ...(style as React.CSSProperties),
      }}
    >
      {itemsArray?.map((item, idx) => {
        const IconComponent = item.icon
          ? (LucideIcons as any)[item.icon] || (LucideIcons as any).Star
          : null;

        return (
          <div
            key={idx}
            className={cn(
              'flex flex-col gap-4',
              variantStyles[(variant as keyof typeof variantStyles) || 'default'],
              alignStyles[(align as keyof typeof alignStyles) || 'left']
            )}
          >
            {IconComponent && (
              <div className={cn(
                'inline-flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 text-primary',
                align === 'center' && 'mx-auto'
              )}>
                <IconComponent className="h-6 w-6" />
              </div>
            )}
            <h3 className="text-lg font-semibold">{item.title}</h3>
            {item.description && (
              <p className="text-sm text-muted-foreground">{item.description}</p>
            )}
          </div>
        );
      })}
    </div>
  );
};
