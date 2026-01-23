import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export const Accordion = ({ element, children }: ComponentRenderProps) => {
  const {
    items,
    type = 'single',
    collapsible = true,
    defaultValue,
    style
  } = element.props;

  const [openItems, setOpenItems] = useState<string[]>(
    defaultValue ? [defaultValue as string] : []
  );

  const itemsArray = items as Array<{ id: string; title: string; content: string }>;

  const toggleItem = (id: string) => {
    if (type === 'single') {
      setOpenItems(openItems.includes(id) && collapsible ? [] : [id]);
    } else {
      setOpenItems(
        openItems.includes(id)
          ? openItems.filter((item) => item !== id)
          : [...openItems, id]
      );
    }
  };

  if (itemsArray?.length) {
    return (
      <div
        className="divide-y divide-border rounded-lg border"
        style={style as React.CSSProperties}
      >
        {itemsArray.map((item) => (
          <div key={item.id}>
            <button
              className="flex w-full items-center justify-between py-4 px-4 text-left font-medium transition-all hover:bg-muted/50"
              onClick={() => toggleItem(item.id)}
              aria-expanded={openItems.includes(item.id)}
            >
              {item.title}
              <ChevronDown
                className={cn(
                  'h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200',
                  openItems.includes(item.id) && 'rotate-180'
                )}
              />
            </button>
            <div
              className={cn(
                'overflow-hidden transition-all duration-200',
                openItems.includes(item.id) ? 'max-h-96' : 'max-h-0'
              )}
            >
              <div className="px-4 pb-4 text-muted-foreground">
                {item.content}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className="divide-y divide-border rounded-lg border"
      style={style as React.CSSProperties}
    >
      {children}
    </div>
  );
};
