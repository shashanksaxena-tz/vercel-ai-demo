import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Check, Circle, ChevronRight } from 'lucide-react';

export const List = ({ element, children }: ComponentRenderProps) => {
  const {
    items,
    variant = 'default',
    ordered = false,
    icon,
    spacing = 'default',
    style
  } = element.props;

  const itemsArray = items as Array<{ text: string; description?: string; icon?: string }>;

  const spacingStyles = {
    compact: 'space-y-1',
    default: 'space-y-2',
    relaxed: 'space-y-4',
  };

  const getIcon = (itemIcon?: string) => {
    const iconName = itemIcon || icon;
    switch (iconName) {
      case 'check':
        return <Check className="h-4 w-4 text-green-500 mt-0.5" />;
      case 'arrow':
        return <ChevronRight className="h-4 w-4 text-muted-foreground mt-0.5" />;
      case 'dot':
        return <Circle className="h-2 w-2 fill-current text-muted-foreground mt-1.5" />;
      default:
        return null;
    }
  };

  const ListTag = ordered ? 'ol' : 'ul';

  if (itemsArray?.length) {
    return (
      <ListTag
        className={cn(
          spacingStyles[(spacing as keyof typeof spacingStyles) || 'default'],
          ordered ? 'list-decimal list-inside' : null
        )}
        style={style as React.CSSProperties}
      >
        {itemsArray.map((item, idx) => (
          <li key={idx} className="flex gap-3">
            {icon ? getIcon(item.icon) : null}
            <div className="flex-1">
              <span className={cn(variant === 'muted' ? 'text-muted-foreground' : null)}>
                {item.text}
              </span>
              {item.description ? (
                <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
              ) : null}
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
        ordered ? 'list-decimal list-inside' : null
      )}
      style={style as React.CSSProperties}
    >
      {children}
    </ListTag>
  );
};
