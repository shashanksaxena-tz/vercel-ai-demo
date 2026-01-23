import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Sidebar = ({ element, children }: ComponentRenderProps) => {
  const {
    width = 256,
    position = 'left',
    collapsed = false,
    variant = 'default',
    style
  } = element.props;

  const variantStyles = {
    default: 'bg-background border-r',
    filled: 'bg-muted',
    floating: 'bg-background shadow-lg m-2 rounded-lg border',
  };

  return (
    <aside
      className={cn(
        'h-full flex flex-col',
        position === 'right' ? 'border-l border-r-0' : '',
        variantStyles[(variant as keyof typeof variantStyles) || 'default']
      )}
      style={{
        width: collapsed ? 64 : (width as number),
        minWidth: collapsed ? 64 : (width as number),
        ...(style as React.CSSProperties),
      }}
    >
      <div className="flex-1 overflow-y-auto p-4">
        {children}
      </div>
    </aside>
  );
};
