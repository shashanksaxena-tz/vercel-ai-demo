'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export const FAQItem = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    question,
    answer,
    defaultOpen = false,
    variant = 'default',
    className,
    style
  } = element.props;

  const [isOpen, setIsOpen] = React.useState(defaultOpen as boolean);

  const variantStyles = {
    default: 'border-b',
    card: 'bg-background border rounded-lg mb-3',
    filled: 'bg-muted rounded-lg mb-3',
    minimal: 'border-b border-dashed',
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
    onAction?.({ name: 'toggle', payload: { open: !isOpen } } as never);
  };

  return (
    <div
      className={cn(
        variantStyles[variant as keyof typeof variantStyles] || variantStyles.default,
        className
      )}
      style={style as React.CSSProperties}
    >
      <button
        onClick={handleToggle}
        className={cn(
          'flex items-center justify-between w-full text-left py-4',
          variant === 'card' || variant === 'filled' ? 'px-4' : ''
        )}
        aria-expanded={isOpen}
      >
        <span className="font-medium text-foreground pr-4">{question as string}</span>
        <ChevronDown
          className={cn(
            'h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>
      <div
        className={cn(
          'overflow-hidden transition-all duration-200',
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div
          className={cn(
            'pb-4 text-muted-foreground',
            variant === 'card' || variant === 'filled' ? 'px-4' : ''
          )}
        >
          {answer && <p>{answer as string}</p>}
          {children}
        </div>
      </div>
    </div>
  );
};
