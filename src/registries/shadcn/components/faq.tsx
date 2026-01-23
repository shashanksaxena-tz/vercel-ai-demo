'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { ChevronDown, Plus, Minus } from 'lucide-react';

export const FAQ = ({ element }: ComponentRenderProps) => {
  const {
    items,
    variant = 'default',
    allowMultiple = false,
    iconStyle = 'chevron',
    style
  } = element.props;

  const [openItems, setOpenItems] = useState<number[]>([]);

  const itemsArray = items as Array<{
    question: string;
    answer: string;
  }>;

  const toggleItem = (index: number) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      );
    } else {
      setOpenItems((prev) =>
        prev.includes(index) ? [] : [index]
      );
    }
  };

  const variantStyles = {
    default: 'divide-y divide-border',
    card: 'space-y-4',
    minimal: 'space-y-2',
  };

  const itemVariantStyles = {
    default: '',
    card: 'bg-background border rounded-lg overflow-hidden',
    minimal: '',
  };

  const Icon = iconStyle === 'plus'
    ? ({ open }: { open: boolean }) =>
        open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />
    : ({ open }: { open: boolean }) => (
        <ChevronDown
          className={cn(
            'h-4 w-4 transition-transform duration-200',
            open && 'rotate-180'
          )}
        />
      );

  return (
    <div
      className={cn(
        variantStyles[(variant as keyof typeof variantStyles) || 'default']
      )}
      style={style as React.CSSProperties}
    >
      {itemsArray?.map((item, idx) => {
        const isOpen = openItems.includes(idx);
        return (
          <div
            key={idx}
            className={cn(
              itemVariantStyles[(variant as keyof typeof itemVariantStyles) || 'default']
            )}
          >
            <button
              className={cn(
                'flex w-full items-center justify-between py-4 text-left font-medium transition-colors hover:text-primary',
                variant === 'card' && 'px-4'
              )}
              onClick={() => toggleItem(idx)}
              aria-expanded={isOpen}
            >
              <span className="pr-4">{item.question}</span>
              <span className="flex-shrink-0 text-muted-foreground">
                <Icon open={isOpen} />
              </span>
            </button>
            <div
              className={cn(
                'overflow-hidden transition-all duration-200',
                isOpen ? 'max-h-96' : 'max-h-0'
              )}
            >
              <p
                className={cn(
                  'pb-4 text-muted-foreground',
                  variant === 'card' && 'px-4'
                )}
              >
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
