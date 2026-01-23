import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Breadcrumb = ({ element, onAction }: ComponentRenderProps) => {
  const {
    items = [],
    separator = 'chevron',
    showHome = true,
    style
  } = element.props;

  const itemsArray = items as Array<{ label: string; href?: string; action?: string }>;

  const SeparatorIcon = separator === 'slash'
    ? () => <span className="mx-2 text-muted-foreground">/</span>
    : () => <ChevronRight className="mx-2 h-4 w-4 text-muted-foreground" />;

  return (
    <nav
      className="flex items-center text-sm"
      style={style as React.CSSProperties}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center">
        {showHome ? (
          <>
            <li>
              <button
                className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => onAction?.({ name: 'navigate_home' })}
              >
                <Home className="h-4 w-4" />
              </button>
            </li>
            {itemsArray.length > 0 ? <SeparatorIcon /> : null}
          </>
        ) : null}
        {itemsArray.map((item, index) => (
          <React.Fragment key={index}>
            <li>
              {index === itemsArray.length - 1 ? (
                <span className="font-medium text-foreground">{item.label}</span>
              ) : (
                <button
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => item.action && onAction?.({ name: item.action })}
                >
                  {item.label}
                </button>
              )}
            </li>
            {index < itemsArray.length - 1 ? <SeparatorIcon /> : null}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};
