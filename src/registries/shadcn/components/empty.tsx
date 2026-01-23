import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import * as LucideIcons from 'lucide-react';

export const Empty = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    icon = 'Inbox',
    title,
    description,
    action,
    actionLabel,
    size = 'default',
    style
  } = element.props;

  const IconComponent = (LucideIcons as any)[icon as string] || LucideIcons.Inbox;

  const sizeStyles = {
    sm: {
      icon: 'h-8 w-8',
      title: 'text-base',
      description: 'text-sm',
      padding: 'py-6',
    },
    default: {
      icon: 'h-12 w-12',
      title: 'text-lg',
      description: 'text-sm',
      padding: 'py-12',
    },
    lg: {
      icon: 'h-16 w-16',
      title: 'text-xl',
      description: 'text-base',
      padding: 'py-16',
    },
  };

  const sizes = sizeStyles[(size as keyof typeof sizeStyles) || 'default'];

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center',
        sizes.padding
      )}
      style={style as React.CSSProperties}
    >
      <div className="inline-flex items-center justify-center rounded-full bg-muted p-4 mb-4">
        <IconComponent className={cn(sizes.icon, 'text-muted-foreground')} />
      </div>
      {title ? (
        <h3 className={cn('font-semibold mb-2', sizes.title)}>
          {title as string}
        </h3>
      ) : null}
      {description ? (
        <p className={cn('text-muted-foreground max-w-sm mb-4', sizes.description)}>
          {description as string}
        </p>
      ) : null}
      {children}
      {action && actionLabel ? (
        <button
          className="mt-4 px-4 py-2 text-sm font-medium text-primary hover:underline"
          onClick={() => onAction?.({ name: action as string })}
        >
          {actionLabel as string}
        </button>
      ) : null}
    </div>
  );
};
