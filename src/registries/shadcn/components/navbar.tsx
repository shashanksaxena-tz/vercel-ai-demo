import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Navbar = ({ element, children }: ComponentRenderProps) => {
  const {
    brand,
    logo,
    sticky = true,
    variant = 'default',
    style
  } = element.props;

  const variantStyles = {
    default: 'bg-background border-b',
    transparent: 'bg-transparent',
    filled: 'bg-primary text-primary-foreground',
    glass: 'bg-background/80 backdrop-blur-md border-b',
  };

  return (
    <nav
      className={cn(
        'w-full px-4 py-3',
        sticky ? 'sticky top-0 z-50' : undefined,
        variantStyles[(variant as keyof typeof variantStyles) || 'default']
      )}
      style={style as React.CSSProperties}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          {logo ? (
            <img src={logo as string} alt="Logo" className="h-8 w-auto" />
          ) : null}
          {brand ? (
            <span className="text-xl font-bold">{brand as string}</span>
          ) : null}
        </div>
        <div className="flex items-center gap-4">
          {children}
        </div>
      </div>
    </nav>
  );
};
