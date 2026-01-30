'use client';

import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-collapsible';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

// Accordion Container
interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  allowMultiple?: boolean;
  defaultExpanded?: string[];
  children: React.ReactNode;
}

interface AccordionContextValue {
  expandedItems: string[];
  toggleItem: (value: string) => void;
  allowMultiple: boolean;
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null);

const useAccordion = () => {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error('AccordionItem must be used within an Accordion');
  }
  return context;
};

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ className, allowMultiple = false, defaultExpanded = [], children, ...props }, ref) => {
    const [expandedItems, setExpandedItems] = React.useState<string[]>(defaultExpanded);

    const toggleItem = React.useCallback((value: string) => {
      setExpandedItems((prev) => {
        const isExpanded = prev.includes(value);
        if (allowMultiple) {
          return isExpanded ? prev.filter((v) => v !== value) : [...prev, value];
        }
        return isExpanded ? [] : [value];
      });
    }, [allowMultiple]);

    return (
      <AccordionContext.Provider value={{ expandedItems, toggleItem, allowMultiple }}>
        <div
          ref={ref}
          className={cn('divide-y divide-border rounded-lg border', className)}
          {...props}
        >
          {children}
        </div>
      </AccordionContext.Provider>
    );
  }
);
Accordion.displayName = 'Accordion';

// Accordion Item
interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, value, title, icon, children, ...props }, ref) => {
    const { expandedItems, toggleItem } = useAccordion();
    const isExpanded = expandedItems.includes(value);

    return (
      <div ref={ref} className={cn(className)} {...props}>
        <button
          onClick={() => toggleItem(value)}
          className="flex w-full items-center justify-between px-4 py-3 text-left font-medium transition-all hover:bg-muted/50"
          aria-expanded={isExpanded}
        >
          <span className="flex items-center gap-2">
            {icon}
            {title}
          </span>
          <ChevronDown
            className={cn(
              'h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200',
              isExpanded && 'rotate-180'
            )}
          />
        </button>
        <div
          className={cn(
            'overflow-hidden transition-all duration-200',
            isExpanded ? 'max-h-96' : 'max-h-0'
          )}
        >
          <div className="px-4 pb-4 pt-0 text-sm text-muted-foreground">
            {children}
          </div>
        </div>
      </div>
    );
  }
);
AccordionItem.displayName = 'AccordionItem';

// Collapsible (Standalone)
interface CollapsibleProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  defaultOpen?: boolean;
}

const Collapsible = React.forwardRef<HTMLDivElement, CollapsibleProps>(
  ({ className, title, defaultOpen = false, children, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(defaultOpen);

    return (
      <AccordionPrimitive.Root open={isOpen} onOpenChange={setIsOpen} asChild>
        <div ref={ref} className={cn('rounded-lg border', className)} {...props}>
          <AccordionPrimitive.Trigger asChild>
            <button className="flex w-full items-center justify-between px-4 py-3 text-left font-medium transition-all hover:bg-muted/50">
              {title}
              <ChevronDown
                className={cn(
                  'h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200',
                  isOpen && 'rotate-180'
                )}
              />
            </button>
          </AccordionPrimitive.Trigger>
          <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
            <div className="px-4 pb-4 pt-0">
              {children}
            </div>
          </AccordionPrimitive.Content>
        </div>
      </AccordionPrimitive.Root>
    );
  }
);
Collapsible.displayName = 'Collapsible';

export { Accordion, AccordionItem, Collapsible };
