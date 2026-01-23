'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { ChevronDown, Plus, Minus } from 'lucide-react';

export const FAQAccordion = ({ element, onAction }: ComponentRenderProps) => {
  const {
    items,
    allowMultiple = false,
    variant = 'default',
    iconStyle = 'chevron',
    className,
    style
  } = element.props;

  const itemsArray = items as Array<{
    question: string;
    answer: string;
    defaultOpen?: boolean;
  }>;

  const [openIndexes, setOpenIndexes] = React.useState<number[]>(() => {
    const defaultOpen: number[] = [];
    itemsArray?.forEach((item, idx) => {
      if (item.defaultOpen) defaultOpen.push(idx);
    });
    return defaultOpen;
  });

  const variantStyles = {
    default: 'divide-y',
    card: 'space-y-3',
    bordered: 'border rounded-lg divide-y',
    separated: 'space-y-4',
  };

  const itemVariantStyles = {
    default: '',
    card: 'bg-background border rounded-lg',
    bordered: '',
    separated: 'bg-muted rounded-lg',
  };

  const handleToggle = (index: number) => {
    let newOpenIndexes: number[];

    if (allowMultiple) {
      newOpenIndexes = openIndexes.includes(index)
        ? openIndexes.filter((i) => i !== index)
        : [...openIndexes, index];
    } else {
      newOpenIndexes = openIndexes.includes(index) ? [] : [index];
    }

    setOpenIndexes(newOpenIndexes);
    onAction?.({ name: 'toggle', payload: { index, openIndexes: newOpenIndexes } } as never);
  };

  const renderIcon = (isOpen: boolean) => {
    if (iconStyle === 'plus') {
      return isOpen ? (
        <Minus className="h-5 w-5 text-muted-foreground flex-shrink-0" />
      ) : (
        <Plus className="h-5 w-5 text-muted-foreground flex-shrink-0" />
      );
    }
    return (
      <ChevronDown
        className={cn(
          'h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform duration-200',
          isOpen && 'rotate-180'
        )}
      />
    );
  };

  if (!itemsArray || itemsArray.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        variantStyles[variant as keyof typeof variantStyles] || variantStyles.default,
        className
      )}
      style={style as React.CSSProperties}
    >
      {itemsArray.map((item, idx) => {
        const isOpen = openIndexes.includes(idx);

        return (
          <div
            key={idx}
            className={cn(
              itemVariantStyles[variant as keyof typeof itemVariantStyles] || itemVariantStyles.default
            )}
          >
            <button
              onClick={() => handleToggle(idx)}
              className={cn(
                'flex items-center justify-between w-full text-left py-4 px-4',
                isOpen && 'text-primary'
              )}
              aria-expanded={isOpen}
            >
              <span className="font-medium text-foreground pr-4">{item.question}</span>
              {renderIcon(isOpen)}
            </button>
            <div
              className={cn(
                'overflow-hidden transition-all duration-200',
                isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
              )}
            >
              <p className="pb-4 px-4 text-muted-foreground">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
