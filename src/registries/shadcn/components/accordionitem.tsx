'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export const AccordionItem = ({ element, children }: ComponentRenderProps) => {
  const {
    title,
    defaultOpen = false,
    style
  } = element.props;

  const [isOpen, setIsOpen] = useState(defaultOpen as boolean);

  return (
    <div style={style as React.CSSProperties}>
      <button
        className="flex w-full items-center justify-between py-4 px-4 text-left font-medium transition-all hover:bg-muted/50"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        {title as string}
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>
      <div
        className={cn(
          'overflow-hidden transition-all duration-200',
          isOpen ? 'max-h-96' : 'max-h-0'
        )}
      >
        <div className="px-4 pb-4 text-muted-foreground">
          {children}
        </div>
      </div>
    </div>
  );
};
