import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const NavLink = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    href,
    label,
    children: propsChildren,
    active = false,
    variant = 'default',
    action,
    style
  } = element.props;

  const variantStyles = {
    default: cn(
      'text-sm font-medium transition-colors hover:text-primary',
      active ? 'text-primary' : 'text-muted-foreground'
    ),
    button: cn(
      'px-4 py-2 text-sm font-medium rounded-md transition-colors',
      active
        ? 'bg-primary text-primary-foreground'
        : 'text-muted-foreground hover:bg-muted'
    ),
    underline: cn(
      'text-sm font-medium transition-colors relative pb-1',
      active
        ? 'text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary'
        : 'text-muted-foreground hover:text-foreground'
    ),
  };

  const handleClick = (e: React.MouseEvent) => {
    if (action && onAction) {
      e.preventDefault();
      onAction({ name: action as string });
    }
  };

  const content = label || propsChildren || children;

  return (
    <a
      href={href as string || '#'}
      className={cn(
        variantStyles[(variant as keyof typeof variantStyles) || 'default']
      )}
      style={style as React.CSSProperties}
      onClick={handleClick}
    >
      {content as React.ReactNode}
    </a>
  );
};
