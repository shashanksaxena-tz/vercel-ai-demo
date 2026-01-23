import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronRight } from 'lucide-react';

export const Menu = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    items,
    orientation = 'horizontal',
    variant = 'default',
    style
  } = element.props;

  const itemsArray = items as Array<{
    label: string;
    href?: string;
    action?: string;
    icon?: string;
    submenu?: Array<{
      label: string;
      href?: string;
      action?: string;
      description?: string;
    }>;
  }>;

  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);

  const variantStyles = {
    default: 'gap-1',
    pills: 'gap-1 bg-muted p-1 rounded-lg',
    underline: 'gap-4',
  };

  const itemStyles = {
    default: 'px-3 py-2 text-sm font-medium rounded-md hover:bg-muted transition-colors',
    pills: 'px-3 py-2 text-sm font-medium rounded-md data-[active=true]:bg-background data-[active=true]:shadow-sm transition-all',
    underline: 'pb-2 text-sm font-medium border-b-2 border-transparent hover:border-primary transition-colors',
  };

  if (!itemsArray?.length && children) {
    return (
      <nav
        className={cn(
          'flex',
          orientation === 'vertical' ? 'flex-col' : 'flex-row items-center',
          variantStyles[(variant as keyof typeof variantStyles) || 'default']
        )}
        style={style as React.CSSProperties}
      >
        {children}
      </nav>
    );
  }

  return (
    <nav
      className={cn(
        'flex',
        orientation === 'vertical' ? 'flex-col' : 'flex-row items-center',
        variantStyles[(variant as keyof typeof variantStyles) || 'default']
      )}
      style={style as React.CSSProperties}
    >
      {itemsArray?.map((item, idx) => (
        <div
          key={idx}
          className="relative"
          onMouseEnter={() => item.submenu && setOpenSubmenu(idx)}
          onMouseLeave={() => setOpenSubmenu(null)}
        >
          <a
            href={item.href || '#'}
            className={cn(
              'flex items-center gap-1',
              itemStyles[(variant as keyof typeof itemStyles) || 'default']
            )}
            onClick={(e) => {
              if (item.action) {
                e.preventDefault();
                onAction?.({ name: item.action });
              }
            }}
          >
            {item.label}
            {item.submenu && (
              <ChevronDown className="h-4 w-4" />
            )}
          </a>

          {item.submenu && openSubmenu === idx && (
            <div className="absolute top-full left-0 mt-1 min-w-[200px] bg-popover border rounded-lg shadow-lg p-2 z-50">
              {item.submenu.map((subitem, subidx) => (
                <a
                  key={subidx}
                  href={subitem.href || '#'}
                  className="block px-3 py-2 rounded-md hover:bg-muted transition-colors"
                  onClick={(e) => {
                    if (subitem.action) {
                      e.preventDefault();
                      onAction?.({ name: subitem.action });
                    }
                  }}
                >
                  <span className="text-sm font-medium">{subitem.label}</span>
                  {subitem.description && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {subitem.description}
                    </p>
                  )}
                </a>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};
