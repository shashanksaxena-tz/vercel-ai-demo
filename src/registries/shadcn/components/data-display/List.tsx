'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Check, Circle, ChevronRight, Minus } from 'lucide-react';

export const List = ({ element, children }: ComponentRenderProps) => {
  const {
    items,
    variant = 'default',
    ordered = false,
    icon,
    spacing = 'default',
    dividers = false,
    style,
  } = element.props;

  const itemsArray = items as Array<{
    text: string;
    description?: string;
    icon?: string;
    disabled?: boolean;
  }>;

  const spacingStyles = {
    compact: 'space-y-1',
    default: 'space-y-2',
    relaxed: 'space-y-4',
  };

  const getIcon = (itemIcon?: string) => {
    const iconName = itemIcon || icon;
    switch (iconName) {
      case 'check':
        return <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />;
      case 'arrow':
        return <ChevronRight className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />;
      case 'dot':
        return <Circle className="h-2 w-2 fill-current text-muted-foreground mt-1.5 flex-shrink-0" />;
      case 'dash':
        return <Minus className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />;
      default:
        return null;
    }
  };

  const ListTag = ordered ? 'ol' : 'ul';

  if (itemsArray?.length) {
    return (
      <ListTag
        className={cn(
          !dividers && spacingStyles[(spacing as keyof typeof spacingStyles) || 'default'],
          ordered && !icon && 'list-decimal list-inside',
          dividers && 'divide-y'
        )}
        style={style as React.CSSProperties}
      >
        {itemsArray.map((item, idx) => (
          <li
            key={idx}
            className={cn(
              'flex gap-3',
              dividers && 'py-3 first:pt-0 last:pb-0',
              item.disabled && 'opacity-50'
            )}
          >
            {icon && getIcon(item.icon)}
            <div className="flex-1 min-w-0">
              <span
                className={cn(
                  variant === 'muted' && 'text-muted-foreground',
                  'block truncate'
                )}
              >
                {item.text}
              </span>
              {item.description && (
                <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
              )}
            </div>
          </li>
        ))}
      </ListTag>
    );
  }

  return (
    <ListTag
      className={cn(
        spacingStyles[(spacing as keyof typeof spacingStyles) || 'default'],
        ordered && 'list-decimal list-inside'
      )}
      style={style as React.CSSProperties}
    >
      {children}
    </ListTag>
  );
};
