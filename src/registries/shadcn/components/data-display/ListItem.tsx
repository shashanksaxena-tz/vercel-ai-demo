'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Check, Circle, ChevronRight, Minus } from 'lucide-react';

export const ListItem = ({ element, children }: ComponentRenderProps) => {
  const {
    text,
    description,
    icon,
    avatar,
    actions,
    disabled = false,
    selected = false,
    interactive = false,
    style,
  } = element.props;

  const getIcon = () => {
    switch (icon) {
      case 'check':
        return <Check className="h-4 w-4 text-green-500 flex-shrink-0" />;
      case 'arrow':
        return <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />;
      case 'dot':
        return <Circle className="h-2 w-2 fill-current text-muted-foreground flex-shrink-0" />;
      case 'dash':
        return <Minus className="h-4 w-4 text-muted-foreground flex-shrink-0" />;
      default:
        return null;
    }
  };

  return (
    <li
      className={cn(
        'flex items-center gap-3 py-2',
        interactive && 'cursor-pointer hover:bg-muted/50 px-3 -mx-3 rounded-md',
        selected && 'bg-primary/10',
        disabled && 'opacity-50 pointer-events-none'
      )}
      style={style as React.CSSProperties}
    >
      {avatar && (
        <div className="flex-shrink-0">
          <img
            src={avatar as string}
            alt=""
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
      )}
      {icon && !avatar && <div className="flex items-center">{getIcon()}</div>}
      <div className="flex-1 min-w-0">
        {text ? (
          <>
            <span className="block truncate font-medium">{text as string}</span>
            {description && (
              <p className="text-sm text-muted-foreground truncate">{description as string}</p>
            )}
          </>
        ) : (
          children
        )}
      </div>
      {actions && (
        <div className="flex-shrink-0 flex items-center gap-2">
          {actions as React.ReactNode}
        </div>
      )}
    </li>
  );
};
